import React from 'react';
import spinner from './download.png'

const Spinner = () => {
  return (
    <img src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='landing ...'
    />
  )
}

export default Spinner;