import { initialState } from './selectors'
import {
  OFFER_CONNECTION_OPENED,
  OFFER_CONNECTION_RETRY,
  OFFER_CONNECTION_ERROR,
  OFFER_RECEIVED,
  REMOVE_OFFER,
  BLACKLIST_SELLER,
} from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case OFFER_CONNECTION_OPENED:
      return {
        ...state,
        connectionOpen: true,
        reconnecting: false,
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
        reconnecting: false,
        error: payload,
      }
    case OFFER_RECEIVED:
      return {
        ...state,
        offers: [...state.offers, payload],
      }
    case REMOVE_OFFER:
      return {
        ...state,
        offers: state.offers.filter((offer) => offer.OfferedItem.id !== payload),
      }
    case BLACKLIST_SELLER:
      return {
        ...state,
        sellerBlacklist: [...state.sellerBlacklist, payload],
      }
    default:
      return state
  }
}
