import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            thursdayShifts: [],
            fridayShifts: [],
            assignmentsForShift: [],
            showAssignmentsForShift: false,
            shiftDetail: {},
            totalShiftsNeeded: 0,
            totalShifts: 0,
        }
    }

    componentDidMount() {
        this.fetchShifts()
    }

    render() {
        const {thursdayShifts, fridayShifts, showAssignmentsForShift, shiftDetail, totalShiftsNeeded, totalShifts} = this.state

        return (
            <div className="page">
                <h2 className="tagline">Admin View</h2>
                <h1>Dvlp Dnvr 2019: volunteer</h1>
                <h3>{totalShifts} total shifts >>> {totalShiftsNeeded} available shifts</h3>
                {showAssignmentsForShift ? <React.Fragment>
                        <button onClick={this.closeDetail}>back</button>
                        <h2>{`${shiftDetail.shift.day}: ${App.formatTime(shiftDetail.shift.hourStart)}`}</h2>
                        <table>
                            <tbody>
                            {this.getAssignmentRows()}
                            </tbody>
                        </table>
                    </React.Fragment> : <React.Fragment>
                        <h2>Thursday August 15th</h2>
                        <table>
                            <tbody>
                            {this.getRows(thursdayShifts)}
                            </tbody>
                        </table>

                        <h2>Friday August 16th</h2>
                        <table>
                            <tbody>
                            {this.getRows(fridayShifts)}
                            </tbody>
                        </table>
                    </React.Fragment>
                }
            </div>
        )
    }

    getRows(shifts) {
        return shifts.map((shift, i) => {
            return (
                <tr className={(shift.available === 0 ? 'full' : null)} key={i} onClick={() => this.expandWithAssignments(shift)}>
                    <td>{App.formatTime(shift.shift.hourStart)}</td>
                    <td>{shift.available} needed</td>
                    <td>{shift.shift.totalSlots - shift.available} filled</td>
                </tr>
            )
        })
    }

    fetchShifts = async () => {
        const response = await fetch("https://volunteer.apps.pcfone.io/api/shifts")
        const shifts = await response.json()
        let totalAvailable = 0
        let totalShifts = 0

        shifts.forEach(shift => {
            totalAvailable += shift.available
            totalShifts += shift.shift.totalSlots
        })
        this.setState({
            thursdayShifts: shifts.filter(shift => shift.shift.day === "Thursday"),
            fridayShifts: shifts.filter(shift => shift.shift.day === "Friday"),
            totalShiftsNeeded: totalAvailable,
            totalShifts: totalShifts
        })

    }

    expandWithAssignments = async(shift) => {
        const response = await fetch(`https://volunteer.apps.pcfone.io/api/assignment?shiftId=${shift.shift.primaryId}`)
        const assignments = await response.json()
        this.setState({
            assignmentsForShift: assignments,
            showAssignmentsForShift: true,
            shiftDetail: shift
        })
    }

    static formatTime(hourStart) {
        let hourEnd = hourStart + 1

        if (hourStart > 12) {
            hourStart = hourStart - 12
        }
        if (hourEnd > 12) {
            hourEnd = hourEnd - 12
        }

        return `${hourStart}:00 - ${hourEnd}:00`
    }

    getAssignmentRows() {
        const { assignmentsForShift } = this.state
        return assignmentsForShift.map((shift, i) => {
            return (
                <tr key={i}>
                    <td>{shift.volunteer.firstName}</td>
                    <td>{shift.volunteer.lastName}</td>
                    <td>{shift.assignment.email}</td>
                </tr>
            )
        })
    }

    closeDetail = () => {
        this.setState({
            assignmentsForShift: [],
            showAssignmentsForShift: false,
            shiftDetail: {}
        })
    }
}

export default App;
