import { createSelector } from 'reselect'

export const initialState = {
  error: null,
  connectionOpen: false,
  connecting: false,
  reconnecting: false,
  reconnectBackoff: 0,
  offers: [],
  poeNinjaItems: {},
  sellerBlacklist: {},
}

export const selectError = (state = initialState) => state.offers.error
export const selectConnectionOpen = (state = initialState) => state.offers.connectionOpen
export const selectConnecting = (state = initialState) => state.offers.connecting
export const selectReconnecting = (state = initialState) => state.offers.reconnecting
export const selectReconnectBackoff = (state = initialState) => state.offers.reconnectBackoff
export const selectSellerBlacklist = (state = initialState) => state.offers.sellerBlacklist
export const selectPoeNinjaItems = (state = initialState) => state.offers.poeNinjaItems
export const selectAllOffers = (state = initialState) => state.offers.offers
export const selectOffers = createSelector(
  selectAllOffers,
  selectSellerBlacklist,
  selectPoeNinjaItems,
  (offers, blacklist, poeNinjaItems) => (
    offers
      .filter((offer) => !(offer.Stash.accountName in blacklist))
      .map((offer) => {
        const {
          poeNinjaItemId,
          ...offerRest
        } = offer
        return {
          ...offerRest,
          poeNinjaItem: poeNinjaItems[poeNinjaItemId],
        }
      })
  )
)
