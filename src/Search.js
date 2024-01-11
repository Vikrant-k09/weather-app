import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GeoAPIoptions, Geo_api_url } from "./Api";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const handleOnChange = (value) => {
        setSearch(value);
        onSearchChange(value);
    };

    const loadOptions = async (inputvalue) => {
        // API call to fetch city data based on the input value
        return fetch(
            `${Geo_api_url}/cities?namePrefix=${inputvalue}`,
            GeoAPIoptions
        )
        .then((response) => response.json())
        .then((response) =>{
            return {
                options: response.data.map((city) =>{
                    return {
                        value : `${city.latitude} ${city.longitude}`,
                        label : `${city.city}, ${city.country}`
                    };
                } ) ,
            };
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    };
    

    return (
        <AsyncPaginate
            placeholder="Search city"
            debounceTimeout={600} // for the API call so that it doesn't fire on every keystroke
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions} // for the cities options it is a function that returns a promise
        />
    );
};

export default Search;
