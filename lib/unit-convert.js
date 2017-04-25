// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT
/** @module mocoolka-tools-unit-convert */
const convertUnit = require('./unit/lib/index.js');
const errorTools = require('./error-tools.js');
const directions = [
  {
    name: 'NE',
    min: 22.5,
    max: 67.5,
  },
  {
    name: 'E',
    min: 67.5,
    max: 112.5,
  },
  {
    name: 'SE',
    min: 112.5,
    max: 157.5,
  },
  {
    name: 'S',
    min: 157.5,
    max: 202.5,
  },
  {
    name: 'SW',
    min: 202.5,
    max: 247.5,
  },
  {
    name: 'W',
    min: 247.5,
    max: 292.5,
  },
  {
    name: 'NW',
    min: 292.5,
    max: 337.5,
  },
  {
    name: 'N',
    min: 337.5,
    max: 360,
  },
  {
    name: 'N',
    min: 0,
    max: 22.5,
  },
];
const windLevel = [
  {
    name: 0,
    min: 0,
    max: 0.2,
  },
  {
    name: 1,
    min: 0.2,
    max: 1.5,
  },
  {
    name: 2,
    min: 1.5,
    max: 3.3,
  },
  {
    name: 3,
    min: 3.3,
    max: 5.4,
  },
  {
    name: 4,
    min: 5.4,
    max: 7.9,
  },
  {
    name: 5,
    min: 7.9,
    max: 10.7,
  },
  {
    name: 6,
    min: 10.7,
    max: 13.8,
  },
  {
    name: 7,
    min: 13.8,
    max: 17.1,
  },
  {
    name: 8,
    min: 17.1,
    max: 20.8,
  },
  {
    name: 9,
    min: 20.8,
    max: 24.5,
  },
  {
    name: 10,
    min: 24.5,
    max: 28.4,
  },
  {
    name: 11,
    min: 28.4,
    max: 32.6,
  },
  {
    name: 12,
    min: 32.6,
    max: 100000000,
  },
];

const covertToWindLevel = (value)=> {

  for (let [index, elem] of windLevel.entries()) {
    if (value >= elem.min && value < elem.max) {
      return elem.name;
    }
  }
};

const convertAngleToDirection = (value)=> {
  if (value < 0 || value > 360)
  errorTools.throwError('convertUnit.E-MISS-DIRECTION', { value: value });

  for (let [index, elem] of directions.entries()) {

    if (value >= elem.min && value < elem.max) {

      return elem.name;

    }

  }

};
/**
 * convert value from a unit to a unit
 * @param {string|number} convert value
 * @param {string} from - convert from the unit
 * @param {string} to - convert to the unit
 * @return {string|number} convert result
 * @example
 * const { unitConvertTools } = require('../src/index.js');

 let result = unitConvertTools.convert(7, 'speed-meter-per-second', 'wind-level');
 console.log(result);
 result = unitConvertTools.convert(260, 'angle', 'direction');
 console.log(result);
 */
const convert = (value, from, to)=> {
  if (from === 'angle' && to === 'direction') {
    return convertAngleToDirection(value);
  } else if (to === 'wind-level') {

    value = convert(value, from, 'speed-meter-per-second');
    return covertToWindLevel(value);
  } else
    return convertUnit(value).from(from).to(to);
};

module.exports = {
  convert,
};
