const FetchingTablesData = ({ data }) => {
    return (
        <div id="tables-container">
            <ul>
                {data.map((table) => (
                    <li key={table.tableID} className="table-item">
                        <div className='table-left'>
                            <strong>Table Number: {table.tableID}</strong>
                        </div> 
                        <div className='table-right'>
                            <strong>Table Seats: {table.tableSeats}</strong>
                        </div> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FetchingTablesData;
