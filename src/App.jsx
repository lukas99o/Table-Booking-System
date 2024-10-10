import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DateAndTime from './components/DateAndTime'
import Tables from './components/Tables'

function App() {
  return (
    <>
      <div id="container">
        <h1>Restaurant Kifo</h1>
        <h2>Ur very welcome to book a table here!</h2>
        <div id="container2">
          <Tables />
          <DateAndTime />
        </div>
      </div>
    </>
  )
}

export default App
