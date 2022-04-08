import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateLoad, updateGraphData, updateError } from '../graph/graphSlice'
import ConfirmationButton from './ConfirmationButton'

const isNumber = (n) => {
  return typeof n == 'number' && !isNaN(n) && isFinite(n);
}

const Inputs = () => {
  const [error, setError] = useState("")
  const [initialInvestmentState, setInitialInvestmentState] = useState()
  const [monthlyInvestmentState, setMonthlyInvestmentState] = useState()
  const dispatch = useDispatch()

  const fetchProjectionData = async () => {
    const APIURL = "http://www.mocky.io/v2/5e69de892d00007a005f9e29?mocky-delay=2000ms"
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        initialInvestment: initialInvestmentState,
        monthlyInvestment: monthlyInvestmentState
      })
    }

    const response = await fetch(APIURL, params)
    const data = await response.json()
    return data
  }

  const handleSubmission = () => {
    // Handle user errors
    if (initialInvestmentState === "" || monthlyInvestmentState === "") {
      dispatch(updateError(true)) // Prevent graph from showing
      setError("Invalid inputs, please try again!")
    }
    else if (!isNumber(Number(initialInvestmentState)) || !isNumber(Number(monthlyInvestmentState))) {
      dispatch(updateError(true)) // Prevent graph from showing
      setError("Invalid inputs, please try again!")
    } else {
      // Fetch projection and send to store if no errors
      setError("")
      dispatch(updateError(false)) // Reset error in state to allow graph to show
      dispatch(updateLoad(true)) // Update loading status in state

      fetchProjectionData().then((data) => {
        dispatch(updateGraphData(data))
        dispatch(updateLoad(false)) // Update loading status in state
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  return (
    <div>
      <div className='my-3 sm:flex'>
        <div className='m-3 sm:m-0 sm:mx-3'>
            <p>Initial Investment</p>
            <input type="text" className='border border-gray-900 px-3 w-full sm:w-auto' onChange={(e) => {setInitialInvestmentState(e.target.value)}}></input>
        </div>
  
        <div className='m-3 sm:m-0 sm:mr-3'>
            <p>Monthly Investment</p>
            <input type="text" className='border border-gray-900 px-3 w-full sm:w-auto' onChange={(e) => {setMonthlyInvestmentState(e.target.value)}}></input>
        </div>
        <div className='m-3 sm:m-0 sm:mr-3'>
          <ConfirmationButton name={"Get outlook!"} onClick={handleSubmission}></ConfirmationButton>
        </div>
        
      </div>
      {error !== "" ?
        <div className='m-3'>
          <p className='bg-red-400 p-3'>{error}</p>
        </div> : null
        }
    </div>
  )
}

export default Inputs