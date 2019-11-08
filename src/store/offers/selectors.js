import { createSelector } from 'reselect'

// eslint-disable-next-line
const mockOffer = {"Stash":{"accountName":"Foo"},"Name":"Hate Gutter Butcher Knife","WhisperMessage":"@angma_blight_raider Hi, I would like to buy your `Hate Gutter Butcher Knife` for 3 chaos in Blight (stash tab \"~price 3 chaos\"; position: left 11, top 12)","PriceDifference":33.08,"PoeNinjaItem":{"id":14709,"levelRequired":82,"links":0,"corrupted":false,"name":"Butcher Knife","itemType":"Dagger","chaosValue":36.08,"exaltedValue":0.2,"count":3,"lowConfidenceSparkline":{"totalChange":419.88,"data":[0,15.27,15.27,4.9,80.98,80.98,419.88]},"sparkline":{"totalChange":4.9,"data":[0,15.27,15.27,4.9,0,0,0]},"variant":""},"OfferedItem":{"name":"Hate Gutter","typeLine":"Butcher Knife","properties":[{"name":"Rune Dagger","values":[],"displayMode":0},{"name":"Physical Damage","values":[["7-62",0]],"displayMode":0},{"name":"Critical Strike Chance","values":[["6.30%",0]],"displayMode":0},{"name":"Attacks per Second","values":[["1.40",0]],"displayMode":0},{"name":"Weapon Range","values":[["10",0]],"displayMode":0}],"requirements":[{"name":"Level","values":[["57",0]],"displayMode":0},{"name":"Dex","values":[["55",0]],"displayMode":1},{"name":"Int","values":[["79",0]],"displayMode":1}],"sockets":[{"group":0,"attr":"I"}],"explicitMods":["22% increased Spell Damage","+44% to Fire Resistance","+5 Life gained on Kill","32% increased Damage with Poison"],"implicitMods":["30% increased Global Critical Strike Chance"],"utilityMods":null,"enchantMods":null,"craftedMods":null,"cosmeticMods":null,"note":"","verified":false,"w":1,"h":3,"ilvl":82,"icon":"https://web.poecdn.com/image/Art/2DItems/Weapons/OneHandWeapons/Daggers/Dagger3.png?scale=1\u0026w=1\u0026h=3\u0026v=7a6e05042e237a2936a5f18421cb77bd","league":"Blight","id":"f2ec4192510dec0f95d668ccf4b85eccf9fc5e9f6939e6780a6306271c5aa0c5","identified":true,"corrupted":false,"elder":false,"shaper":false,"synthesised":false,"lockedToCharacter":false,"support":false,"descrText":"","secDescrText":"","flavourText":null,"artFilename":"","frameType":2,"stackSize":0,"maxStackSize":0,"x":11,"y":12,"inventoryId":"Stash105","socketedItems":[],"isRelic":false,"talismanTier":0,"prophecyText":"","prophecyDiffText":""}}

export const initialState = {
  error: null,
  connectionOpen: false,
  reconnecting: false,
  reconnectBackoff: 0,
  offers: [
    mockOffer,
    { ...mockOffer, OfferedItem: { ...mockOffer.OfferedItem, id: '1' } },
  ],
  sellerBlacklist: [],
}

export const selectError = (state = initialState) => state.offers.error
export const selectConnectionOpen = (state = initialState) => state.offers.connectionOpen
export const selectReconnecting = (state = initialState) => state.offers.reconnecting
export const selectReconnectBackoff = (state = initialState) => state.offers.reconnectBackoff
export const selectSellerBlacklist = (state = initialState) => state.offers.sellerBlacklist
export const selectAllOffers = (state = initialState) => state.offers.offers
export const selectOffers = createSelector(
  selectAllOffers,
  selectSellerBlacklist,
  (offers, blacklist) => offers.filter((offer) => blacklist.indexOf(offer.Stash.accountName) === -1)
)
