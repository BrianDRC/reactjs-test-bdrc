// Components
import { useState, useEffect } from 'react';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@material-ui/core/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


// Services
import { UniversitiesService } from './Services/Universities.service';

// Styles
import './App.css';

// Types
import { University } from './Types/University';
import { Country } from './Types/Country';

function App() {

  const _universitiesService = new UniversitiesService();

  const [countries, setCountries] = useState<Country[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);

  const [sessionKeyCountriesTable, setSessionKeyCountriesTable] = useState('sessionKeyCountriesTable');
  const [sessionKeyUniversitiesTable, setSessionKeyUniversitiesTable] = useState('sessionKeyUniversitiesTable');

  const columns = [
    {
      headerName: 'ID',
      field: 'id',
      width: 100
    },
    {
      headerName: 'Name',
      field: 'name',
      width: 500
    },
    {
      headerName: 'Alpha Two Code',
      field: 'alphaTwocode',
      width: 200
    },
    {
      headerName: 'Flag',
      field: 'flag',
      width: 400,
      editable: false,
      sortable: false,
      renderCell: (params: any) => <img src={params.value} />, // renderCell will render the component
    }
  ];

  useEffect(() => {
    defineBaseData();
      //getData();
    }, []);

  const defineBaseData = async () => {
      let countriesTable = JSON.parse(localStorage.getItem(sessionKeyCountriesTable) || "[]");
      let universitiesTable = localStorage.getItem(sessionKeyUniversitiesTable);
      localStorage.setItem(sessionKeyCountriesTable, JSON.stringify([]));
      getCountries();
      setCountries(countriesTable);
      
  }

  function setCountriesTable(table: Country[]){
    localStorage.setItem(sessionKeyCountriesTable, JSON.stringify(table));
  }

  const getData = async () => {
    setUniversities(await _universitiesService.getData());
  }

  const getCountries = async () => {
    let table = await _universitiesService.getCountries();
    setCountriesTable(table);
    setCountries(table)
  }

  return (
    <div className="App">
      <Container style={{ height: 750, width: "100%"}}>

        <div style={{justifyContent: 'center', alignContent: 'center', margin:10}}>
          <TextField id="outlined-basic" label="Outlined" variant="outlined"
            style={{margin: 10, width: '40%'}} />

          <Button variant="outlined">Search</Button>


        </div>

        <DataGrid style={{textAlign: 'center'}}
          columns={columns} 
          rows={countries}
          rowsPerPageOptions={[10, 25, 50, 100, 200]}
          disableSelectionOnClick
        />
      </Container>
    </div>
  );
}

export default App;
