import { useState } from "react";
import FetchingTablesData from "./Tables";

function DateAndTime({ setChosenTime, setChosenTimeEnd, setTable, setCustomer, setPeople, setTablesFetched, setSuccessMessage }) {
    const [time, setTime] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tablesFetched, setTablesFetchedState] = useState(false);

    const currentDateTime = new Date().toISOString().slice(0, 16);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://localhost:7157/api/Tables/AvailableTables?time=${time}&timeEnd=${timeEnd}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setData(result);
            setTablesFetched(true); // Set parent state
            setTablesFetchedState(true); // Set local state
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFetchTables = () => {
        if (time && timeEnd) {
            setChosenTime(time);
            setChosenTimeEnd(timeEnd);
            setSuccessMessage(''); // Clear the previous success message
            fetchData();
        } else {
            alert("Please select both time and timeEnd.");
        }
    };

    return (
        <div>
            <h3 id="date-container-h3">Choose a time for your booking of a table</h3>
            <div id="date-container">
                <label htmlFor="time">Select Time:</label>
                <input
                    type="datetime-local"
                    id="time"
                    onChange={(e) => setTime(e.target.value)}
                    required
                    min={currentDateTime}
                />
                <label htmlFor="timeEnd">Select Time End:</label>
                <input
                    type="datetime-local"
                    id="timeEnd"
                    onChange={(e) => setTimeEnd(e.target.value)}
                    required
                    min={currentDateTime}
                />
                <button id="submit-button" onClick={handleFetchTables}>
                    Fetch Tables
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {tablesFetched && <FetchingTablesData data={data} />}

            {tablesFetched && (
                <div id="choosetable-container">
                    <h3>Please choose a table above!</h3>
                    <div id="tablenumber-container">
                        <label htmlFor="choosetable-input" id="choosetable-label">Input table number: </label>
                        <input type="number" id="choosetable-input" onChange={(e) => setTable(e.target.value)} />
                    </div>
                    <div id="customerid-container">
                        <label htmlFor="customerid" id="customerid-label">Your CustomerID: </label>
                        <input type="number" id="customerid" onChange={(e) => setCustomer(e.target.value)} />
                    </div>
                    <div id="amountofpeople-container">
                        <label htmlFor="amountofpeople" id="amountofpeople-label">How many people are you booking for: </label>
                        <input type="number" id="amountofpeople" onChange={(e) => setPeople(e.target.value)} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DateAndTime;
