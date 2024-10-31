import React, { useState } from 'react'
import Button from './Button';
import Count from './Count';


const Counter = ({count, onIncrement, onDecrement}) => {

  //console.log(count, onIncrement, onDecrement);
  
  return (
    <div className="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-slate-200 rounded shadow">
      <Count  countValue = {count}/>
      <div className="flex space-x-3">
        <Button type = "danger" handler = {onDecrement}>
          Decrement
        </Button>
        <Button handler = {onIncrement}>
          Increment
        </Button>
      </div>
    </div>
  )
}

export default Counter