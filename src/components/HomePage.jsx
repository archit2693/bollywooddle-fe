import React, { Component } from 'react';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import LiveSearch from './LiveSearch';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            retryLeft: 5
        };
    }



    async getImage() {
        console.log("getImage called...");
        axios.defaults.withCredentials = true;
        const res = await (await axios.get("http://localhost:8080/api/v1/nextImage", {
            responseType: 'blob',
            // headers: [{"Access-Control-Allow-Credentials": "true"}, {"Access-Control-Allow-Origin": "*"}]
        })).data;
        const imageObjectURL = URL.createObjectURL(res);
        this.setState({ image: imageObjectURL });
        console.log("retryLeft...", this.state.retryLeft);
    }

    componentDidMount() {
        this.getImage();
    }

    test = (retryLeft) => {
        console.log("test", retryLeft);
        this.setState({ retryLeft: retryLeft });
        this.getImage()
    }

    render() {
        return (
            <Grid
                container spacing={2}
                justifyContent="center"
                alignItems="center">
                <Grid item xs={8}>
                    <Stack sx={{ width: 300, margin: "auto" }}>
                        <img src={this.state.image} alt='text' className="photo" ></img>
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    <Stack sx={{ width: 300, margin: "auto" }}>
                        <Fab color="primary" aria-label="add">
                            <p>{this.state.retryLeft}</p>
                        </Fab>
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    <LiveSearch reloadImage={this.test}></LiveSearch>
                </Grid>
            </Grid>
        );
    }
}

export default HomePage;