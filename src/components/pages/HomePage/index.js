// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withState } from 'recompose'
import { Icon, Link } from 'components'

const copyMessageToClipboard = (textarea) => {
  textarea.select()
  document.execCommand('copy')
}

const StyledTextArea = styled.textarea`
  width: 100%;
  display: flex;
  align-items: center;
  resize: none;
`

const WhisperMessageText = ({ message }) => {
  return (
    <StyledTextArea
      rows={1}
      onClick={(ev) => copyMessageToClipboard(ev.currentTarget)}
      value={message}
      readOnly
    />
  )
}
WhisperMessageText.propTypes = {
  message: PropTypes.string,
}

const StyledOfferWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 5px;
`

const StyledNameColumn = styled.div`
  flex: 1;
`
const StyledPriceColumn = styled.div`
  width: 45px;
`
const StyledItemLevelColumn = styled.div`
  width: 45px;
`

const StyledMessageColumn = styled.div`
  flex: 8;
  padding: 15px;
`
const StyledCloseButtonColumn = styled.div`
  width: 120px;
  height: auto;
`
const StyledVariantColumn = styled.div``

const StyledBlacklistButtonColumn = styled.div``

const OfferDetailsWrapper = styled.div``

const StyledOfferDetails = ({ offer }) => (
  <OfferDetailsWrapper>
    {offer.Name}
    <pre>{JSON.stringify(offer, null, 4)}</pre>
  </OfferDetailsWrapper>
)

StyledOfferDetails.propTypes = {
  offer: PropTypes.object,
}

const OfferListEntry = ({
  detailsOpen,
  offer,
  removeOffer,
  blacklistSeller,
  setDetailsOpen,
}) => (
  <div>
    <StyledOfferWrapper onClick={() => setDetailsOpen(!detailsOpen)}>
      <StyledNameColumn>{offer.Name}</StyledNameColumn>
      <StyledPriceColumn>{offer.PriceDifference}</StyledPriceColumn>
      <StyledItemLevelColumn>{offer.OfferedItem.ilvl}</StyledItemLevelColumn>
      <StyledVariantColumn>{offer.PoeNinjaItem.variant}</StyledVariantColumn>
      <StyledMessageColumn><WhisperMessageText message={offer.WhisperMessage} /></StyledMessageColumn>
      <StyledCloseButtonColumn><Icon icon="close" onClick={() => removeOffer(offer.OfferedItem.id)} /></StyledCloseButtonColumn>
      <StyledBlacklistButtonColumn><Link href="#" onClick={() => blacklistSeller(offer.Stash.accountName)}>Blacklist</Link></StyledBlacklistButtonColumn>
    </StyledOfferWrapper>
    { detailsOpen ? <StyledOfferDetails offer={offer} /> : '' }
  </div>
)

const WrappedOfferListEntry = withState('detailsOpen', 'setDetailsOpen', false)(OfferListEntry)

OfferListEntry.propTypes = {
  detailsOpen: PropTypes.bool,
  setDetailsOpen: PropTypes.func,
  offer: PropTypes.object,
  removeOffer: PropTypes.func,
  blacklistSeller: PropTypes.func,
}

const OfferListWrapper = styled.div`
  width: 100%;
`

const OfferList = ({ offers, blacklistSeller, removeOffer }) => (
  <OfferListWrapper>
    {Boolean(offers.length) && offers.map(
      (offer) => (
        <WrappedOfferListEntry
          key={offer.OfferedItem.id}
          offer={offer}
          removeOffer={removeOffer}
          blacklistSeller={blacklistSeller}
        />
      )
    )}
    {Boolean(!offers.length) && (<h2>No offers available</h2>)}
  </OfferListWrapper>
)

OfferList.propTypes = {
  offers: PropTypes.array,
  removeOffer: PropTypes.func,
  blacklistSeller: PropTypes.func,
}

const ErrorSummary = ({ error }) => (
  <div>
    <p>An error occured!</p>
    <p>
      Code:
      {error.code}
    </p>
    <p>
      Message:
      {error.message}
    </p>
  </div>
)
ErrorSummary.propTypes = {
  error: PropTypes.any,
}

const HomePage = ({
  error,
  offers,
  connectionOpen,
  reconnecting,
  // reconnectBackoff,
  blacklistSeller,
  removeOffer,
}) => {
  return (
    <div>
      <h1>
        Connection is:
        { connectionOpen ? `open.${reconnecting ? ' Trying to reconnect...' : ''}` : 'closed' }
      </h1>
      {error ? <ErrorSummary error={error} /> : ''}
      <OfferList
        offers={offers}
        removeOffer={removeOffer}
        blacklistSeller={blacklistSeller}
      />
    </div>
  )
}

HomePage.propTypes = {
  error: PropTypes.any,
  offers: PropTypes.array,
  connectionOpen: PropTypes.bool,
  reconnecting: PropTypes.bool,
  // reconnectBackoff: PropTypes.number,
  removeOffer: PropTypes.func,
  blacklistSeller: PropTypes.func,
}

export default HomePage
