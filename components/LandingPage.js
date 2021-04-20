import PropTypes from 'prop-types'
import React from 'react'
import RenderSections from './RenderSections'

function LandingPage ({ page = {} }) {
  const { content = [] } = page
  return <RenderSections sections={content} />
}

LandingPage.propTypes = {
  page: PropTypes.object
}

export default LandingPage
