'use strict';

const http = require('http');
const https = require('https');

let data;

https.get('https://api.ons.gov.uk/dataset/EMP/timeseries/KAC4/data', (res) => {
  let chunk = '';

  res.on('data', (resPart) => {
    chunk += resPart;
  });

  res.on('end', () => {
    data = JSON.parse(chunk);

    const avgYearlySal = data.months[data.months.length-1].value * 52

    console.log(`Average yearly salary (GBP): ${avgYearlySal}`)

    const inputSalary = process.argv[2];

    if (inputSalary) {
      if (inputSalary > avgYearlySal) {
        console.log('Your salary is above average')
      } else if (inputSalary < avgYearlySal) {
        console.log('Your salary is below average')
      } else {
        console.log('Your salary is exactly average')
      }
    }
  });
});
