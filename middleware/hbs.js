'use strict';

const moment = require('moment');

exports.timeFormatted = val => moment(val).format('LLL');
