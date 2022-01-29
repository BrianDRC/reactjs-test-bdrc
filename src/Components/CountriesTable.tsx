// Components
import { useState, useEffect } from 'react';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Services
import { UniversitiesService } from '../Services/Universities.service';

// Types
import { Country } from '../Types/Country';

export function CountriesTable(){

    const _universitiesService = new UniversitiesService();

    const [countries, setCountries] = useState<Country[]>([]);

    const [sessionKeyCountriesTable, setSessionKeyCountriesTable] = useState('sessionKeyCountriesTable');
    const [sessionKeySelectedCountry, setSessionKeySelectedCountry] = useState('sessionKeySelectedCountry');

    const [txtcountryName, setTxtCountryName] = useState("");

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
        renderCell: (params: any) => <img src={params.value} />
        }
    ];

    useEffect(() => {
        defineBaseData();
        }, []);

    // save the textbox value in real time
    const handleTxtChange = (e: { target: { value: any; }; }) => {
        setTxtCountryName(e.target.value);
    }

    // get the data from row selected in datagrid
    const handleRowSelectionData = (selectedRow : any) => {
        localStorage.setItem(sessionKeySelectedCountry, JSON.stringify(selectedRow.row));
    };

    // save the table recover from API in LocalStorage
    function setCountriesTable(table: Country[]){
        localStorage.setItem(sessionKeyCountriesTable, JSON.stringify(table));
    }

    // call the service to get all countries
    const getCountries = async () => {
        let table = await _universitiesService.getCountries();
        setCountriesTable(table);
        setCountries(table)
    }

    // define country data in LocalStorage to use data in memory and avoid unnecessary API calls when filtering
    const defineBaseData = async () => {
        let countriesTable = JSON.parse(localStorage.getItem(sessionKeyCountriesTable) || "[]");
        getCountries();
        setCountries(countriesTable);
    }

    // search countries based on textbox data in LocalStorage table
    async function searchCountry(){
        let countriesTable = JSON.parse(localStorage.getItem(sessionKeyCountriesTable) || "[]");
        const countriesFiltered: Country[] = [];
        await countriesTable.forEach((country: Country) => {
        if(country.name.toLowerCase().includes(txtcountryName.toLowerCase())){
            countriesFiltered.push(country);
        }
        });
        setCountries(countriesFiltered);
    }

    return (
        <div className='tableContainer'>
            <div style={{margin:10}}>
                <TextField id="countryName" label="Country Name" variant="outlined"
                style={{margin: 10, width: '40%'}} 
                value={txtcountryName}
                onChange={handleTxtChange}/>

                <Button style={{margin: 13, width: '20%', height: 50}} variant="outlined" onClick={() => { searchCountry(); }}>Search</Button>
            </div>

            <DataGrid
                columns={columns} 
                rows={countries}
                rowsPerPageOptions={[10, 25, 50, 100]}
                density='comfortable'
                onRowClick={handleRowSelectionData}
            />
        </div>
    );
}