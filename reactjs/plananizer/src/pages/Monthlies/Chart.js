import React from 'react'
import './vars'
import Axios from 'axios'
import { HorizontalBar } from 'react-chartjs-2'
import Widget from "../../components/Widget"

export default class Chart extends React.Component{
    constructor(){
        super()
        this.state = {
            status: '',
            data: [],
            chartD: [],
            flag: false,
            loaded: false
        }
        this.storeData = this.storeData.bind(this)
    }

    componentWillMount(){
        this.fetchData()
    }

    componentDidMount(){
        this.setState({
            flag: global.flag
        })
        if(this.state.flag === true){
            this.storeData()
        }
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
        const labels = ["Total Salary","Grocery","Weekly EMI","Shopping","Personal","Extra Savings"]
        var len = Object.keys(x).length
            var ds = []
            var temp = global.fMonth
            console.log(temp)
            for(var i = 0; i < len ; i++){
            if(x[i].id === temp){
                global.flag=true
                ds[0] = x[i].amt
                ds[1] = x[i].grocery            
                ds[2] = x[i].emi
                ds[3] = x[i].shopping
                ds[4] = x[i].personal
                ds[5] = x[i].extraSavings
                break
            }else{
                global.flag=false
            }
        }
        this.setState({
            chartD: {
                labels: labels,
                datasets: [{
                    backgroundColor: ['#4C2A10','#008744','#3DD3E9','#FFA500','#F894B5','#1F1F83'],
                    data: ds
                }]
            }
        })
    } 

    okShoot(){
        return(
            <div>
                {global.flag ? (
                    <div style={{ position: 'absolute', left: '30%', top: '38%', right:'50%',width:'50%'}}>
                            <Widget>
                                <HorizontalBar
                                data={this.state.chartD}
                                options={{
                                legend:{
                                display: false,
                                position: 'top'
                                }
                                }}/>
                            </Widget>
                        </div>
                ) : (
                    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Widget>
                        No data to display
                    </Widget>
                    </div>
                )}
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