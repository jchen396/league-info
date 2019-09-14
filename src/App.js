import React from 'react';
import SearchBar from './components/SearchBar'
import { GlobalStyles } from './global';
import Post from './components/Post'

function App() {
  return (
      <div className="App">
        <SearchBar />
        <GlobalStyles />
        <Post/>
      </div>
  );
}

export default App;
