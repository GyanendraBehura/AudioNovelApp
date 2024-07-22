import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AudiobookList from './components/AudiobookList';
import AudiobookDetails from './components/AudiobookDetails';
import AppBar from './components/AppBar';
import { AudiobookProvider } from './context/AudiobookContext';
// AudiobookList
function App() {
  return (
    <div className="App">
      <AppBar/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Router>
        <AudiobookProvider>
          <Routes>
            <Route path="/" element={<AudiobookList />} />
            <Route path="/audiobooks/:id" element={<AudiobookDetails />} />
          </Routes>
        </AudiobookProvider>
      </Router>
      {/* <AudiobookList/> */}
    </div>
  );
}

export default App;
