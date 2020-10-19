import React from 'react'
import './App.css'
import {Header} from './Components'
import { Main, Card } from './page/'
import { Switch, Route } from 'react-router-dom'


function App() {
    return (
        <div className='wrapper'>
            <Header/>
            <div className='content'>
            <Switch>
                <Route exact path={'/'} render={() => <Main/>}/>
                <Route exact path={'/basket'} render={() => <Card/>}/>
            </Switch>
            </div>
        </div>
    )
}

export default App
