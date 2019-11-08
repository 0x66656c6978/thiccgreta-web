import {
  fork,
  call,
  delay,
  put,
} from 'redux-saga/effects'

import {
  offerReceived,
  offerConnectionCreated,
  offerConnectionOpened,
  offerConnectionError,
  offerConnectionRetry,
} from './actions'

const promiseHandlerQueue = []
const consumePromiseHandlerQueue = (shouldResolve, value) => {
  let [resolve, reject] = promiseHandlerQueue.pop()
  while (resolve && reject) {
    if (shouldResolve) {
      resolve(value)
    } else {
      reject(value)
    }
    const [nextResolve, nextReject] = promiseHandlerQueue.pop()
    resolve = nextResolve
    reject = nextReject
  }
}

let messageQueue = []
const updateMessageQueue = (newMessageQueue) => {
  messageQueue = newMessageQueue
}

let webSocket = null
let connectionErrorHandlerRef = null

const handleWebsocketMessage = (ev) => {
  const messageChunks = ev.data.toString().split('\n')
  const newMessages = messageChunks.map((chunk) => JSON.parse(chunk))
  const newMessageQueue = messageQueue.concat(newMessages)
  updateMessageQueue(newMessageQueue)
  if (promiseHandlerQueue.length && messageQueue.length) {
    consumePromiseHandlerQueue(true, messageQueue.pop())
  }
}

const createWebSocket = (url) => new Promise((resolve, reject) => {
  try {
    webSocket = new WebSocket(url)
  } catch (e) {
    reject(e)
    return
  }
  webSocket.addEventListener('open', resolve)
  webSocket.addEventListener('error', (connectionErrorHandlerRef = reject))
  webSocket.addEventListener('message', handleWebsocketMessage)
})

const handleWebsocketCreated = () => {
  webSocket.removeEventListener('error', connectionErrorHandlerRef)
  webSocket.addEventListener('error', (reason) => consumePromiseHandlerQueue(false, reason))
}

export const promises = {
  initialize: (url) => new Promise(
    (resolve, reject) => createWebSocket(url)
      .catch(reject)
      .then(handleWebsocketCreated)
      .then(resolve)
  ),
  getNextMessage: () => new Promise(
    (resolve, reject) => messageQueue.length
      ? resolve(messageQueue.pop()) // resolve with buffered message
      : promiseHandlerQueue.push([resolve, reject]) // delay resolve / reject until we have a message
  ),
}

export function* watchOffers() {
  let backoff = 0.5
  while (true) {
    let ws
    const url = 'ws://localhost:8080'
    try {
      yield put(offerConnectionCreated())
      ws = yield call(promises.initialize, url)
      yield put(offerConnectionOpened())
      while (true) {
        const offer = yield call(promises.getNextMessage, ws)
        yield put(offerReceived(offer))
      }
    } catch (e) {
      yield put(offerConnectionError(e))
      yield put(offerConnectionRetry(backoff))
      yield delay(1000 * backoff)
      backoff *= 1.25
    }
  }
}

export default function* () {
  yield fork(watchOffers)
}
