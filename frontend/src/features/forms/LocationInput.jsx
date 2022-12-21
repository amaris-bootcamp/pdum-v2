import React, {Component} from "react";
import AsyncSelect from 'react-select/async'
import _ from "lodash"

class LocationInput extends Component {

    state = {
        inputValue: null,
        selectedOption: null,
        isClearable: true,
        isLoading: false,
        isSearchable: true,
        gps: [],
    }

    handleChange = selectedOption => {
        const {onChange} = this.props;

        onChange({name: selectedOption.label, gps: selectedOption.gps, iata: selectedOption.value})
        this.setState({gps: selectedOption.gps})
    }

    searchLocation = (place, callback) => {
        this.setState({isLoading: true})
        fetch(`https://hotels4.p.rapidapi.com/locations/v2/search?query=${encodeURI(place)}&locale=en_US&currency=USD`, {
            "method": "GET", "headers": {
                "x-rapidapi-host": "hotels4.p.rapidapi.com",
                "x-rapidapi-key": "a9ea2fe698msh7ba4bd6765f16b1p1f0769jsnf3e17c8b5ba0"
            }
        })
            .then(response => response.json())
            .then((response) => {
                let airports = response.suggestions.pop()
                console.log(airports)
                airports = airports.entities.filter(a => a.type === "AIRPORT")
                callback(airports.map(airport => {
                    return {
                        label: airport.name,
                        // find IATA code using a regular expression
                        value: airport.name.match('[A-Z]{3}').shift(),
                        gps: [airport.latitude, airport.longitude]
                    }
                }))
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                this.setState({isLoading: false})
            })

    }

    getAsyncOptions = _.debounce(this.searchLocation, 500)

    render() {
        const {name, latlong} = this.props;
        const {isLoading, gps} = this.state;

        const handleInputChange = (newValue) => {
            this.setState({inputValue: newValue});
            return newValue;
        };

        return (<>
            <AsyncSelect
                cacheOptions
                loadOptions={this.getAsyncOptions}
                onInputChange={handleInputChange}
                onChange={this.handleChange}
                isLoading={isLoading}
                isClearable={false}
                isSearchable={true}
                name={name}
            />
            <>
                {latlong && <input name="latitude" value={gps[0]} style={{display: "none"}}/>}
                {latlong && <input name="longitude" value={gps[1]} style={{display: "none"}}/>}
            </>
        </>);
    }

}

export default LocationInput
