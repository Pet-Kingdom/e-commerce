import PropTypes from 'prop-types'
import React from 'react'
import { DiffFromTo } from '@sanity/field/diff'

export function ColorFieldDiff ({ diff, schemaType }) {
  return (
    <DiffFromTo
      diff={diff}
      schemaType={schemaType}
      previewComponent={ColorPreviewComponent}
    />
  )
}

ColorFieldDiff.propTypes = {
  diff: PropTypes.any,
  schemaType: PropTypes.any
}

function ColorPreviewComponent ({ value }) {
  const { hex } = value
  return (
    <div
      style={{
        background: hex,
        height: '180px',
        minWidth: '180px',
        maxWidth: '180px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: getContrast50(hex)
      }}
    >
      <div>{hex}</div>
    </div>
  )
}

ColorPreviewComponent.propTypes = {
  value: PropTypes.shape({
    hex: PropTypes.any
  })
}
function getContrast50 (hexcolor) {
  return parseInt(hexcolor.replace('#', '0x'), 16) > 0xffffff / 2
    ? '#000'
    : '#FFF'
}
