import PropTypes from 'prop-types'
import React from 'react'
import styles from './IframePreview.css'

export default function ProductsOverviewPreview (props) {
  const url =
    process.env.NODE_ENV === 'production'
      ? '/products?preview'
      : 'http://localhost:3000/products?preview'
  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} frameBorder={'0'} />
      </div>
    </div>
  )
}

ProductsOverviewPreview.propTypes = {
  displayed: PropTypes.any
}
