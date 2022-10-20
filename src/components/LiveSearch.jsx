import React, {Component } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import axios from 'axios';
import Button from '@mui/material/Button';


class LiveSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonResults: null,
            message: null,
            buttonText: "Skip Guess"
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/v1/movieTitles")
            .then((res) => res.json())
            .then((json) => this.state.jsonResults = json);
        console.log(this.state.jsonResults);
    }

    guessMovie = (event, values) => {
        console.log(values);
        if (values) {
            axios.defaults.withCredentials = true;
            const header = {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*'
            }
            const data = {
                "movieTitle": values
            }
            axios.post("http://localhost:8080/api/v1/guess", data, {
                headers: header
            }).then((response) => {
                console.log(response.data);
                var retryLeft = response.data.retryLeft;
                if(retryLeft === -1){
                    retryLeft = 5;
                    this.setState({ message: " " });
                } else {
                    this.setState({ message: response.data.message });
                }
                this.props.reloadImage(retryLeft);
            }).catch((error) => {
                console.log(error);
            });
        }
        
    }

    render() {
        return (
            <Stack sx={{ width: 300, margin: "auto" }}>
                <p>{this.state.message}</p>
                <Autocomplete
                    id='combo-box-demo'
                    getOptionLabel={(jsonResults) => jsonResults}
                    options={this.state.jsonResults}
                    sx={{ width: 300 }}
                    isOptionEqualToValue={(option, value) => option === value}
                    noOptionsText="No results found"
                    renderOptions={(props, jsonResults) => (
                        <Box component="li" {...props} key={jsonResults}>
                            {jsonResults}
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label="Guess the movie" />}
                    onChange={this.guessMovie}
                />
                <Button variant="contained" onClick={(e, s) => this.guessMovie(e, "skip")}>{this.state.buttonText}</Button>
            </Stack>
        );
    }
}

export default LiveSearch;