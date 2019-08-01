import React from 'react'

import Widget from '../../components/Widget'

import Daily from './components/Daily'
import Weekly from './components/Weekly'
import Monthly from './components/Monthly'

export default class StorageArea extends React.Component {
    render(){
        return(
            <React.Fragment>
                <div style={{ position: 'relative', width: '40%',height: '30%', left:'15%', display: 'flex', direction: 'row'}}>
                    <Widget>
                        <Daily/>
                    </Widget>
                    <div style={{ position: 'relative', left: '20%'}}>
                        <Widget>
                            <Weekly/>
                        </Widget>
                    </div>
                    <div style={{ position: 'relative', left: '50%'}}>
                            <Widget>
                                <Monthly/>
                            </Widget>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}