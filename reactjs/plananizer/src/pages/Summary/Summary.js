import React from 'react'
import Axios from 'axios'
import Widget from "../../components/Widget"
import { Line } from 'react-chartjs-2'
import { Typography } from '@material-ui/core';

export default class Summary extends React.Component {

    constructor(){
        super()
        this.state = {
            loaded: false,
            chartD: []
        }
    }

    componentWillMount(){
        this.fetchData()
    }

    async fetchData(){
        await Axios.get('http://localhost:8080').then(res => {
            this.storeData(res.data)
            this.setState({
                data: res.data
            })

        })
        this.setState({
            loaded: true
        })
        console.log(this.state.chartD)
    }

    storeData(x){
        console.log(x)
        var labels = []
        var len = Object.keys(x).length
        var amt = []
        var grocery = []
        var emi = []
        var shopping = []
        var personal = []
        var extraSavings = []
        for(var i = 0; i < len ; i++){
            console.log(x)
            labels[i] = x[i].id
            amt[i] = x[i].amt
            grocery[i] = x[i].grocery
            emi[i] = x[i].emi
            shopping[i] = x[i].shopping
            personal[i] = x[i].personal
            extraSavings[i] = x[i].extraSavings
        }
        this.setState({
            chartD: {
                labels: labels,
                datasets: [
                {
                    label: "Grocery",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#008744',
                            borderColor: '#008744',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: grocery
                },
                {
                    label: "Weekly EMI",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#3DD3E9',
                            borderColor: '#3DD3E9',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: emi
                },
                {
                    label: "Shopping",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#FFA500',
                            borderColor: '#FFA500',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: shopping
                },
                {
                    label: "Personal",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#F894B5',
                            borderColor: '#F894B5',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: personal
                },
                {
                    label: "Extra Savings",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: '#1F1F83',
                            borderColor: '#1F1F83',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: extraSavings
                }
            ]
            }
        })
        console.log(this.state.chartD)
    }

    okShoot(){
        return(
            <div style={{ position: 'center',width:'70%'}}>
                <Widget title={<Typography variant="h4"><i>Summarizing your Expenses</i></Typography>}>
                    <Line
                        data={this.state.chartD}
                        options={{
                            legend:{
                                display: false,
                                position: 'top'
                            }
                        }}/>
                </Widget>
            </div>
        )
    }

    render(){
        return(
            <div>
                {this.state.loaded ? this.okShoot() : null}
            </div>
        )
    }
}