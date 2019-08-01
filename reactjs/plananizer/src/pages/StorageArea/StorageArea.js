import React from 'react'

import Widget from '../../components/Widget'

import Daily from './components/Daily'

export default class StorageArea extends React.Component {
    render(){
        return(
            <React.Fragment>
                <div style={{ position: 'relative', width: '40%',height: '30%', left:'15%', display: 'flex', direction: 'row'}}>
                    <Widget>
                        <Daily/>
                    </Widget>
                </div>
            </React.Fragment>
        )
    }
}