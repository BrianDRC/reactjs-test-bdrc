// Components
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

// Services
import { UniversitiesService } from '../Services/Universities.service';

// Types
import { University } from '../Types/University';

export function UnivertiesTable(){

    const _universitiesService = new UniversitiesService();

    const [universities, setUniversities] = useState<University[]>([]);
    
    const [sessionKeySelectedCountry, setSessionKeySelectedCountry] = useState('sessionKeySelectedCountry');

    const columns = [
        {
            headerName: 'ID',
            field: 'id',
            width: 100
        },
        {
            headerName: 'Name',
            field: 'name',
            width: 350
        },
        {
            headerName: 'Web Pages',
            field: 'webPages',
            width: 300
        },
        {
            headerName: 'State - Province',
            field: 'stateProvince',
            width: 250
        },
        {
            headerName: 'Domains',
            field: 'domains',
            width: 200
        }
      ];

    useEffect(() => {
        getUniversities();
    }, []);

    // call the service to get all countries
    const getUniversities = async () => {
        let countrySelected = JSON.parse(localStorage.getItem(sessionKeySelectedCountry) || "[]");

        let table = await _universitiesService.getUniversitiesByCountry(countrySelected);
        setUniversities(table)
    }

    return (
        <div className='tableContainer'>
            <DataGrid
                columns={columns} 
                rows={universities}
                rowsPerPageOptions={[10, 25, 50, 100, 200]}
                density='comfortable'
            />
        </div>
    );
}
