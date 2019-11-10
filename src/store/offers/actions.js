export const OFFER_CONNECTION_CONNECTING = 'OFFER_CONNECTION_CONNECTING'
export const offerConnectionConnecting = () => ({
  type: OFFER_CONNECTION_CONNECTING,
})

export const OFFER_CONNECTION_OPEN = 'OFFER_CONNECTION_OPEN'
export const offerConnectionOpen = () => ({
  type: OFFER_CONNECTION_OPEN,
})

export const OFFER_CONNECTION_ERROR = 'OFFER_CONNECTION_ERROR'
export const offerConnectionError = (error) => ({
  type: OFFER_CONNECTION_ERROR,
  error: true,
  payload: error,
})

export const OFFER_CONNECTION_RETRY = 'OFFER_CONNECTION_RETRY'
export const offerConnectionRetry = (backoff) => ({
  type: OFFER_CONNECTION_RETRY,
  payload: backoff,
})

export const OFFER_RECEIVED = 'OFFER_RECEIVED'
export const offerReceived = (offer) => ({
  type: OFFER_RECEIVED,
  payload: offer,
})

export const REMOVE_OFFER = 'REMOVE_OFFER'
export const removeOffer = (offerId) => ({
  type: REMOVE_OFFER,
  payload: offerId,
})

export const BLACKLIST_SELLER = 'BLACKLIST_SELLER'
export const blacklistSeller = (accountName) => ({
  type: BLACKLIST_SELLER,
  payload: accountName,
})
