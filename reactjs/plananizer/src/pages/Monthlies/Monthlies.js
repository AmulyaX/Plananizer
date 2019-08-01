import React from 'react'
import Widget from "../../components/Widget"
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import { Typography } from "@material-ui/core";
import Chart from './Chart'
import './vars'

export default class Monthlies extends React.Component {

    constructor(){
        super()
        this.state = {
            month: new Date(),
            flag: false
        }
    }

    handleMonthChange = (date) => {
        var tmp = format(date, "MM/yyyy", { awareOfUnicodeTokens: true })
        this.setState({
            month: date
        })
        global.fMonth = tmp
        global.flag = true
      }

    render(){
        return(
            <React.Fragment>
                <div style={{ position: 'relative', left: '37%', width: '20%'}}>
                    <Widget>
                    <Typography variant="h5" component="h2" gutterBottom='true'><strong>Select Month</strong></Typography>
                        <DatePicker
                        selected={this.state.month}
                        onChange={this.handleMonthChange}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker />
                    </Widget>
                </div>
                {global.flag ? (<Chart />) : (
                    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                        <Widget>
                            No data to display
                        </Widget>
                    </div>)}
            </React.Fragment>
        )
    }
}