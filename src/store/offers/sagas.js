import {
  call,
  delay,
  fork,
  take,
  put,
} from 'redux-saga/effects'

import {
  eventChannel,
  END,
} from 'redux-saga'

import {
  offerReceived,
  offerConnectionConnecting,
  offerConnectionOpen,
  offerConnectionError,
  offerConnectionRetry,
} from './actions'

export function createWebSocketConnection(webSocketConstructor, addr) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(addr)
    socket.addEventListener('error', reject)
    socket.addEventListener('open', () => {
      socket.removeEventListener('error', reject)
      resolve(socket)
    })
  })
}

export function getSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.addEventListener('message', (ev) => ev.data.toString().split('\n').forEach((chunk) => emit(JSON.parse(chunk))))
    socket.addEventListener('close', () => emit(END))
    socket.addEventListener('error', (err) => emit(new Error(err)))
    return () => socket.close()
  })
}

export function* watchWebsocketConnection(webSocketConstructor) {
  let channel
  let backoff = 0.5
  while (true) {
    try {
      yield put(offerConnectionConnecting())
      const connection = yield call(createWebSocketConnection, webSocketConstructor, 'ws://localhost:8080')
      channel = yield call(getSocketChannel, connection)
      yield put(offerConnectionOpen())
      while (true) {
        const message = yield take(channel)
        yield put(offerReceived(message))
      }
    } catch (e) {
      if (channel) channel.close()
      yield put(offerConnectionError(e))
      yield put(offerConnectionRetry(backoff))
      delay(backoff * 1000)
      backoff *= 1.05
    }
  }
}

export default function* (webSocketConstructor) {
  yield fork(watchWebsocketConnection, webSocketConstructor)
}
