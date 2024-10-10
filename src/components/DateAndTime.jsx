function DateAndTime() {
    return (
        <div id="container3">
            <h3>Choose a date and time for ur booking of a table</h3>
            <label for="date">Date</label>
            <input type="date" id="date" />
            <label for="time">Time</label>
            <input type="datetime-local" id="time" />
            <label for="timeEnd">Time End</label>
            <input type="datetime-local" id="timeEnd" />
        </div>
    )
}

export default DateAndTime;