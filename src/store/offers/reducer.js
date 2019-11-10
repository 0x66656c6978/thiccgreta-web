import { initialState } from './selectors'
import {
  OFFER_CONNECTION_CONNECTING,
  OFFER_CONNECTION_OPEN,
  OFFER_CONNECTION_RETRY,
  OFFER_CONNECTION_ERROR,
  OFFER_RECEIVED,
  REMOVE_OFFER,
  BLACKLIST_SELLER,
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case OFFER_CONNECTION_CONNECTING:
      return {
        ...state,
        connectionOpen: false,
        connecting: true,
      }
    case OFFER_CONNECTION_OPEN:
      return {
        ...state,
        connectionOpen: true,
        connecting: false,
        error: null,
      }
    case OFFER_CONNECTION_RETRY:
      return {
        ...state,
        reconnecting: true,
        reconnectBackoff: payload,
      }
    case OFFER_CONNECTION_ERROR:
      return {
        ...state,
        connectionOpen: false,
        connecting: false,
        reconnecting: false,
        error: payload,
      }
    case OFFER_RECEIVED: {
      const {
        PoeNinjaItem: poeNinjaItem,
        ...newOffer
      } = payload
      newOffer.poeNinjaItemId = poeNinjaItem.id
      return {
        ...state,
        offers: [...state.offers, newOffer],
        poeNinjaItems: {
          ...state.poeNinjaItems,
          [poeNinjaItem.id]: poeNinjaItem,
        },
      }
    }
    case REMOVE_OFFER:
      return {
        ...state,
        offers: state.offers.filter((offer) => offer.OfferedItem.id !== payload),
      }
    case BLACKLIST_SELLER:
      return {
        ...state,
        sellerBlacklist: {
          ...state.sellerBlacklist,
          [payload]: true,
        },
      }
    default:
      return state
  }
}
