import React from 'react';
import './style.scss'
import NavBar from './components/NavBar'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Input from './components/Input'
import About from './components/about'
import Contact from './components/contact'
import Post from './components/Post'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar />
            <Switch>
              <Route exact path='/' component={Input} />
              <Route path='/about' component={About}/>
              <Route path='/contact' component={Contact}/>
              <Route path="/:post_id" component={Post}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
