import React from 'react';
import './App.css';
import About from './components/about.jsx';
import Interests from './components/interests.jsx';
import SocialLink from './components/socialLinks.jsx';
import Info from './components/info.jsx';

function App() {

  return (
    <>
      <Info/>
      <About/>
      <Interests/>
      <SocialLink/>
    </>
  )
}

export default App
