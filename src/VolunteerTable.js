import React from 'react';
import './App.css';

class ShiftTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            volunteersWithAssignments: [],
        }
    }

    componentDidMount() {
        this.fetchVolunteerShifts()
    }

    render() {
        return (
            <div className="page">
                <h2>Volunteer Shift Sign ups</h2>
                <table>
                    <tbody>
                    {this.getRows()}
                    </tbody>
                </table>
            </div>
        )
    }

    getRows() {
        const {volunteersWithAssignments} = this.state

        const rows = volunteersWithAssignments.map((volunteer, i) => {
        let className = ""
            if (volunteer.assignments.length === 0) {className = "noShifts"}
            if (volunteer.assignments.length > 3) {className = "fullShifts"}

            return (
                <tr key={i} className={(className != "" ? className : null)} >
                    <td>{volunteer.volunteer.firstName}</td>
                    <td>{volunteer.volunteer.lastName}</td>
                    <td>{volunteer.assignments.length || 0}</td>
                </tr>
            )
        })
        console.log(typeof rows)

        return rows
    }

    fetchVolunteerShifts = async () => {
        const response = await fetch("https://volunteer.apps.pcfone.io/api/volunteerAssignments")
        const volunteersWithAssignments = await response.json()

        this.setState({
            volunteersWithAssignments: volunteersWithAssignments
        })

    }

}

export default ShiftTable;
