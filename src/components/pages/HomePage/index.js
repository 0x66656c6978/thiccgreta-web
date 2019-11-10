// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import PropTypes from 'prop-types'

const renderError = (error) => {
  if (typeof error.code !== 'undefined' && typeof error.message !== 'undefined') {
    return (
      <div>
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
  }
  return (<pre>{JSON.stringify(error)}</pre>)
}

const ErrorSummary = ({ error }) => (
  <div>
    <p>An error occured!</p>
    {renderError(error)}
  </div>
)
ErrorSummary.propTypes = {
  error: PropTypes.any,
}

const HomePage = ({
  error,
  offers,
  connectionOpen,
  connecting,
  reconnecting,
  reconnectBackoff,
}) => {
  return (
    <div>
      <div>
        Connection is:
        { connectionOpen ? `open.${reconnecting ? ` Trying to reconnect in ${Math.round(reconnectBackoff).toFixed(2)} seconds...` : ''}` : 'closed' }
        { connecting ? 'connecting...' : ''}
      </div>
      {offers.length ? `Stream size: ${offers.length}` : 'No items received'}
      {error ? <ErrorSummary error={error} /> : ''}
    </div>
  )
}

HomePage.propTypes = {
  error: PropTypes.any,
  offers: PropTypes.array,
  connectionOpen: PropTypes.bool,
  connecting: PropTypes.bool,
  reconnecting: PropTypes.bool,
  reconnectBackoff: PropTypes.number,
}

export default HomePage
