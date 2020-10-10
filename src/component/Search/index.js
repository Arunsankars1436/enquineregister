import React, { useState } from 'react';
import moment from 'moment';
import { Grid, Typography, Paper, Tabs, Tab } from '@material-ui/core';
import logo from '../../assets/logo.png';
import { CommonButton, InputField, DateField, LabelField } from '../../common/utils';
import { get, isEmpty, find } from 'lodash'; 
import { DATE_FORMAT } from '../../common/constant';
import { getFilteredData, getAllData } from '../../action/index';
import {
    LocationOnOutlined,
    LocationOn,
    ArrowRight
} from '@material-ui/icons';

const allJSONData = getAllData();


function App({
    selectPosition,
    isResult,
    setResult,
    position
}) {
    const [ueln_id, setUELN] = useState("");
    const [fromDate, setFromDate] = useState({});
    const [toDate, setToDate] = useState({});
    const [errors, setErrors] = useState({});
    const [cTab, setTab] = useState(0);

    const handleFromChange = (e) => {
        const { value, id } = e.target;
        setErrors(prevState => ({
            ...prevState,
            'from': '',
            'api': '',
        }));
        setFromDate(prevState => ({
          ...prevState,
          [id]: value
        }));
    }

    const handleToChange = (e) => {
        const { value, id } = e.target;
        setErrors(prevState => ({
            ...prevState,
            'to': '',
            'api': '',
        }));
        setToDate(prevState => ({
          ...prevState,
          [id]: value,
          'api': '',
        }));
    }

    const errorAction = (id, error) => {
        setErrors(prevState => ({
            ...prevState,
            [id]: error
          }));
    }

    const buttonClick = (e) => {
        setErrors({});
        const fromD = moment(`${get(fromDate, 'yy')}/${get(fromDate, 'mm')}/${get(fromDate, 'dd')}`, DATE_FORMAT, true);
        const toD = moment(`${get(toDate, 'yy')}/${get(toDate, 'mm')}/${get(toDate, 'dd')}`, DATE_FORMAT, true);
        if (
            ueln_id === ''
            || isEmpty(fromDate)
            || isEmpty(toDate)
            || !toD.isValid()
            || !fromD.isValid()
            || !!find(get(allJSONData, 'equines'), { ueln: ueln_id })
        ) {
            if (!toD.isValid()) {
                errorAction('from', '*Invalid, enter day: DD, month: MM Year: YYYY format'); 
            }
            if (!fromD.isValid()) {
                errorAction('to', '*Invalid,  enter day: DD, month: MM Year: YYYY format');
            }
            if (!find(get(allJSONData, 'equines'), { ueln: ueln_id })) {
                errorAction('ueln_id', '*Required/Invalid UELN');
            }
            return;
        }
        const filteredData = getFilteredData(ueln_id, fromD, toD);
        if (!get(filteredData, 'length')) {
            errorAction('api', 'No Result Found');
            return;
        }
        setResult(get(allJSONData, 'equines'));
    }

  return (
    <Grid container justify="center" spacing={2} className="container">
        <Grid item xs={9}>
            <Grid container>
                <Grid item xs={12}>
                    <img src={logo} className="logo_style" alt="logo" />
                </Grid>
                <Grid item xs={12}>
                {Boolean(isResult) ? (
                    <Grid container>
                        <Grid item xs={6} className="w3-margin-bottom">
                            <Paper square style={{
                                    border: '1px solid black',
                                    borderRadius: '28px',
                            }}>
                                <Tabs
                                    value={cTab}
                                    indicatorColor="secondary"
                                    textColor="primary"
                                    onChange={(e, v) => setTab(v)}
                                >
                                    <Tab className={cTab === 0 ? "selectL" : null} label="Locations" />
                                    <Tab className={cTab === 1 ? "selectR" : null} label="Heat Maps" />
                                </Tabs>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} className="w3-margin-top">
                            <LabelField
                                label='Movement Location for UELN:'
                                value={ueln_id}
                                varaint="h4"
                            />
                        </Grid>
                        <Grid item xs={12} className="w3-margin-top">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <LabelField
                                        label='From Date:'
                                        value={`${get(fromDate, 'yy')}-${get(fromDate, 'mm')}-${get(fromDate, 'dd')}`}
                                        varaint="h5"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <LabelField
                                        label='To Date:'
                                        value={`${get(toDate, 'yy')}-${get(toDate, 'mm')}-${get(toDate, 'dd')}`}
                                        varaint="h5"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className="w3-margin-top">
                            {get(isResult, 'length') ? isResult.map((each) => {
                                const address = `${get(each, 'location.city')}, ${get(each, 'location.county')}`;
                                let isSelected = false;
                                if (get(position, '[0]') === get(each, 'location.lat') && get(position, '[1]') === get(each, 'location.long')) {
                                    isSelected = true;
                                  }
                                return (
                                    <Grid container className="container-top w3-margin-top">
                                        <Grid item xs={12} onClick={() => {
                                            selectPosition([get(each, 'location.lat'), get(each, 'location.long')])
                                        }} style={{
                                            background: isSelected ? 'lightgray' : 'white'
                                        }}>
                                            <Grid container>
                                                <Grid item xs={1} className="w3-padding">
                                                    {isSelected ? <LocationOn color="secondary" /> : <LocationOnOutlined />}
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Grid contaier>
                                                        <Grid item xs={12}>
                                                            <LabelField
                                                                label={`${get(each, 'date_from')} to ${get(each, 'date_to')}`}
                                                                value={address}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={1} className="w3-padding">
                                                    <ArrowRight />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            }) : (
                                <Grid container justify="center">
                                    <Typography varaint="h6">No Data Found</Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6">Enter UELN, Passport or Microchip Number</Typography>
                        </Grid>
                        <Grid item xs={12} className="w3-margin-bottom">
                            <InputField
                                id="ueln_id"
                                onChange={(e) => {
                                    const { id, value } = e.target;
                                    setErrors(prevState => ({
                                        ...prevState,
                                        [id]: ''
                                    }));
                                    setUELN(value);
                                }}
                                placeholder="here"
                                value={ueln_id}
                                error={get(errors, 'ueln_id')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" className="w3-margin-top">Enter search Date Range</Typography>
                            <Typography variant="caption">Enter the date range to search between</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3} className="w3-margin-top">
                                <Grid item xs={5}>
                                    <DateField value={fromDate} id="from" onChange={handleFromChange} error={get(errors, 'from')} />
                                </Grid>
                                <Grid item xs={2} className="w3-center"><Typography variant="subtitle2" className="w3-padding-64">to</Typography></Grid>
                                <Grid item xs={5}>
                                    <DateField value={toDate} id="to" onChange={handleToChange} error={get(errors, 'to')} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography varaint="h6" color="secondary">{get(errors, 'api', '')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CommonButton text="Search Now >" onClick={buttonClick} />
                        </Grid>
                    </Grid>
                )}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  );
}

export default App;
