import React, { useState, useEffect } from 'react';

function Tables() {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await fetch('https://localhost:7157/api/Tables/AvailableTables');
                const data = await response.json();
                console.log(data);
                setTables(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch tables');
                setLoading(false);
            }
        }

        fetchTables();
    }, []);

    if (loading) {
        return <div>Loading tables...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {tables.length > 0 ? (
            tables.map((table) => (
                <div key={table.TableID} className="table-item">
                <p>Table ID: {table.TableID}</p>
                <p>Seats: {table.TableSeats}</p>
                </div>
            ))
            ) : (
            <div>No tables available</div>
            )}
        </div>
    );
}

export default Tables;