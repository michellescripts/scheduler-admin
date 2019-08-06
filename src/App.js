import React from 'react';
import './App.css';
import ShiftTable from "./ShiftTable"
import VolunteerTable from "./VolunteerTable"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {currentTab: "menu"}
    }
    render() {

        return (
            <div className="page">
                <h2 className="tagline">Admin View</h2>
                <h1>Dvlp Dnvr 2019: volunteer</h1>
                    {this.state.currentTab !== "shiftTable" ? <button onClick={() => this.setState({currentTab: "shiftTable"})}>shifts</button> : null }
                {this.state.currentTab !== "volunteerTable" ? <button onClick={() => this.setState({currentTab: "volunteerTable"})}>volunteers</button> : null }
                {this.state.currentTab === "shiftTable" ? <ShiftTable />: null }
                {this.state.currentTab === "volunteerTable" ? <VolunteerTable />: null }
            </div>
        )
    }
}

export default App;
