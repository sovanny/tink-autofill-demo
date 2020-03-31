import React from 'react';
import { Route } from 'react-router-dom';
import Form from './components/Form';
import ChooseAccount from './components/ChooseAccount';
import AutofillContextProvider from './Context/AutofillContext';
import './global.css';

function App() {
  return (
    <div className="App">
      <div className="app-content">
        <AutofillContextProvider>
          <Route exact path="/" component={Form} />
          <Route path="/callback" component={ChooseAccount} />
        </AutofillContextProvider>
      </div>
    </div>
  );
}

export default App;
