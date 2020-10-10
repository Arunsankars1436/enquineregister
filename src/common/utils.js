import React from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { get } from 'lodash';


export const InputField = ({
    id,
    placeholder,
    onChange,
    value,
    error = '',
    noTextError = false
}) => (
    <TextField
        id={id}
        type="number"
        variant="outlined"
        placeholder={placeholder}
        fullWidth
        onChange={onChange}
        className="textbox"
        value={value}
        error={error === '' ? false : true}
        helperText={noTextError ? '' : error}
    />
);

export const CommonButton = ({
    text,
    onClick
}) => (
    <Button style={{ padding: "12px 120px" }} size="large" variant="contained" className="button" onClick={onClick}>{text}</Button>
);

export const LabelField = ({
    label,
    value,
    varaint="h6"
}) => (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="subtitle1">{label}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={varaint} style={{
                        wordBreak: "break-all"
                }}>{value}</Typography>
            </Grid>
        </Grid>
);
export const DateField = ({
    onChange,
    value,
    error
}) => (
    <Grid container>
        <Grid item xs={12}>
            <Typography variant="h6">From date</Typography>
        </Grid>
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6">Day</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <InputField
                                id="dd"
                                placeholder="DD"
                                onChange={onChange}
                                value={get(value, 'dd', '')}
                                noTextError
                                error={error}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={12}><Typography variant="h6">Month</Typography></Grid>
                        <Grid item xs={12}>
                            <InputField
                                id="mm"
                                placeholder="MM"
                                onChange={onChange}
                                value={get(value, 'mm', '')}
                                noTextError
                                error={error}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={12}><Typography variant="h6">Year</Typography></Grid>
                        <Grid item xs={12}>
                            <InputField
                                id="yy"
                                placeholder="YYYY"
                                onChange={onChange}
                                value={get(value, 'yy', '')}
                                noTextError
                                error={error}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Typography varaint="caption" color="secondary">{error}</Typography>
        </Grid>
    </Grid>
);