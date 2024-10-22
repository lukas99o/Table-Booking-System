import { useState } from 'react';
import './App.css';
import DateAndTime from './components/DateAndTime';

function App() {
  const [table, setTable] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [people, setPeople] = useState(null);
  const [chosenTime, setChosenTime] = useState('');
  const [chosenTimeEnd, setChosenTimeEnd] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tablesFetched, setTablesFetched] = useState(false); 

  const handleSubmit = async () => {
    const bookingData = {
      tableID: table,
      customerID: customer,
      amountOfPeople: people,
      time: chosenTime,
      timeEnd: chosenTimeEnd
    };

    try {
      const response = await fetch('https://localhost:7157/api/Bookings/CreateBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setSuccessMessage('Booking successful!');
        setErrorMessage('');
      } else {
        throw new Error('Failed to book table');
      }
    } catch (error) {
      setErrorMessage('There was an error submitting your booking. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div id="container">
      <h1>Restaurant Kifo</h1>
      <h2>You're very welcome to book a table here!</h2>
      <div id="container2">
        <DateAndTime
          setChosenTime={setChosenTime}
          setChosenTimeEnd={setChosenTimeEnd}
          setSuccessMessage={setSuccessMessage}
          setTable={setTable}
          setCustomer={setCustomer}
          setPeople={setPeople}
          setTablesFetched={setTablesFetched} 
        />
      </div>

      {tablesFetched && (
        <button id="submit-button" onClick={handleSubmit}>Submit Booking</button>
      )}

      <p>{successMessage}</p>
      <p>{errorMessage}</p>
    </div>
  );
}

export default App;
