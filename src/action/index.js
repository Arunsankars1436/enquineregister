import React from 'react';
import { testData } from './migrated';
import moment from 'moment';
import { filter, get } from 'lodash';
import { DATE_FORMAT } from '../common/constant';

export const getFilteredData = (ueln, date_from, date_to) => {
    const filteredData = filter(get(testData, 'equines'), (each) => {
        if (
            ueln === get(each, 'ueln')
            && moment(get(each, 'date_from'), DATE_FORMAT).isSameOrAfter(date_from)
            && moment(get(each, 'date_to'), DATE_FORMAT).isSameOrBefore(date_to)
        ) {
            return each;
        }
        return null;
    })
    return filteredData;
}

export const getAllData = () => {
    return testData;
}