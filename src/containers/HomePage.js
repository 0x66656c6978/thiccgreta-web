import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { HomePage } from 'components'

import {
  selectOffers,
  selectConnectionOpen,
  selectConnecting,
  selectReconnecting,
  selectReconnectBackoff,
  selectError,
} from 'store/offers/selectors'
import {
  removeOffer,
  blacklistSeller,
} from 'store/offers/actions'

const HomePageContainer = ({
  error,
  offers,
  connectionOpen,
  connecting,
  reconnecting,
  reconnectBackoff,
  blacklistSeller,
  removeOffer,
}) => (
  <HomePage
    error={error}
    offers={offers}
    connectionOpen={connectionOpen}
    removeOffer={removeOffer}
    blacklistSeller={blacklistSeller}
    connecting={connecting}
    reconnecting={reconnecting}
    reconnectBackoff={reconnectBackoff}
  />
)

const mapStateToProps = (state) => ({
  error: selectError(state),
  offers: selectOffers(state),
  connectionOpen: selectConnectionOpen(state),
  reconnecting: selectReconnecting(state),
  connecting: selectConnecting(state),
  reconnectBackoff: selectReconnectBackoff(state),
})

const mapDispatchToProps = (dispatch) => ({
  removeOffer: (id) => dispatch(removeOffer(id)),
  blacklistSeller: (accountName) => dispatch(blacklistSeller(accountName)),
})

HomePageContainer.propTypes = {
  error: PropTypes.any,
  offers: PropTypes.array,
  connectionOpen: PropTypes.bool,
  connecting: PropTypes.bool,
  reconnecting: PropTypes.bool,
  reconnectBackoff: PropTypes.number,
  removeOffer: PropTypes.func,
  blacklistSeller: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  HomePageContainer
)
