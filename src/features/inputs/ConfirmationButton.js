import React from 'react'

const ConfirmationButton = ( {name, onClick} ) => {
  return (
    <div>
        <button className='bg-teal-300 border border-gray-900 py-3 w-full sm:w-auto my-3 sm:m-0 sm:p-3 hover:bg-teal-600 active:bg-teal-700' onClick={onClick}>{name}</button>
    </div>
  )
}

export default ConfirmationButton