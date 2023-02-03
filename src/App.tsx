import React from 'react';
import './App.css';
import Main from './components/main/Main';
import { LocationStateProvider } from './lib/useLocation';

function App() {
  return (
    <div className='App'>
      <LocationStateProvider>
        <Main />
      </LocationStateProvider>
    </div>
  );
}

export default App;
