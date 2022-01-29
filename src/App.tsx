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
        <div className='tableContainer'>
          <CountriesTable/>
        </div>
        <div className='separator'></div>
        <div className='tableContainer'>
          <UnivertiesTable/> 
        </div>
        
      </Container>
    </div>
  );
}

export default App;
