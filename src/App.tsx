// Components
import * as React from 'react';
import Container from '@material-ui/core/Container';
import { CountriesTable } from './Components/CountriesTable';
import { UnivertiesTable } from './Components/UnivertiesTable';

// Styles
import './App.css';

function App() {

  return (
    <div className="App">
      <Container style={{ height: 750, width: "100%"}}>
          <CountriesTable/>
          <div className='separator'>This solution is in almost in 90%, the functionality for the universities table just select a country and reload the page, is using localstorage to avoid unnecesary calls to API</div>
          <UnivertiesTable/> 
        
      </Container>
    </div>
  );
}

export default App;
