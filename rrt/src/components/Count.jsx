import React from 'react'

const Count = ({ countValue }) => {
  return (
    <div>
      <div className="flex items-center justify-center w-10 h-10 bg-violet-400 text-white font-bold rounded-full">
        {countValue}
      </div>
    </div>
  )
}

export default Count