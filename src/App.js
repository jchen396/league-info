import React from 'react';
import './css/style.scss'
import NavBar from './components/NavBar'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Input from './components/Input'
import About from './components/about'
import Players from './components/players'
import Post from './components/Post'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar />
            <Switch>
              <Route exact path='/' component={Input} />
              <Route path='/about' component={About}/>
              <Route path='/players' component={Players}/>
              <Route path="/:post_id" component={Post}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
