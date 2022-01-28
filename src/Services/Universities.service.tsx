import axios from "axios";
import { University } from "../Types/University";
import { Country } from "../Types/Country";

export class UniversitiesService{

    private url: string;
    private pic_url: string;
    private sessionKeyCountriesTable: string;
    private sessionKeyUniversitiesTable: string;

    public constructor() {
        this.url = "http://universities.hipolabs.com/search";
        this.pic_url = "https://flagcdn.com/56x42/";
        this.sessionKeyCountriesTable = 'sessionKeyCountriesTable';
        this.sessionKeyUniversitiesTable = 'sessionKeyUniversitiesTable';
    }
   
    public async getData(): Promise<University[]> {
        const response = await axios.get(this.url);
        return await response.data;
    }

    public async getCountries(): Promise<Country[]> {
        const response = await axios.get(this.url);
        let universities: any[] = [];
        const countries: Country[] = [];
        universities = response.data;
        await universities.forEach((university => {
            if(countries.find(c => c.alphaTwocode == university.alpha_two_code) == null){
                let flagUrl = this.pic_url + university.alpha_two_code.toLowerCase() + ".png";
                let oCountry: Country = { id: this.getCountriesLatestID(countries), name: university.country, alphaTwocode: university.alpha_two_code, flag: flagUrl }
                countries.push(oCountry)
            }
        }));
        return await countries;
    }

    public getCountriesLatestID(list: Country[]) {
        return list.length + 1;
    }
}