import React from 'react'
import Widget from "../../components/Widget"
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import { Typography } from "@material-ui/core";
import './vars'

export default class Weeklies extends React.Component {

    constructor(){
        super()
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            flag: false
        }
    }

    handleStartDateChange = (date) => {
        var tmp = format(date, "dd/MM/yyyy", { awareOfUnicodeTokens: true })
        this.setState({
            startDate: date
        })
        global.sDate = tmp
        global.flag = false
      }

    handleEndDateChange = (date) => {
        var tmp = format(date, "dd/MM/yyyy", { awareOfUnicodeTokens: true })
        this.setState({
          endDate: date
        })
        global.eDate = tmp
        global.flag = true
    }

    WeekStart(date){
        const day = getDay(date);
        return day === 0;
      };

    WeekEnd(date){
        const day = getDay(date);
        return day === 6;
      };

    render(){
        return(
            <React.Fragment>
                <div style={{ position: 'relative', width: '20%', left:'22%', display: 'flex', direction: 'row'}}>
                    <Widget>
                    <Typography variant="h5" component="h2" gutterBottom='true'><strong>Start</strong> Date</Typography>
                        <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="dd/MM/yyyy"
                        filterDate={this.WeekStart} />
                    </Widget>
                    <div style={{ position: 'relative', left: '70%', top: '50%'}}>
                    <Widget>
                    <Typography variant="h5" component="h2" gutterBottom='true'><strong>End</strong> Date</Typography>
                        <DatePicker 
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="dd/MM/yyyy"
                        filterDate={this.WeekEnd} />
                    </Widget>
                    </div>
                    </div>
                {global.flag ? ("Chart goes here") : (
                    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                        <Widget>
                            No data to display
                        </Widget>
                        </div>)}
            </React.Fragment>
        )
    }
}