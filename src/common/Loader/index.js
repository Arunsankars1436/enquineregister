import React from 'react';
import ReactLoading from 'react-loading';
import { Grid } from '@material-ui/core';
 
const Loader = ({ type, color="rgb(34,139,34)" }) => (
    <Grid container justify="center">
        <Grid item xs={2}>
            <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
        </Grid>
    </Grid>
);
 
export default Loader;