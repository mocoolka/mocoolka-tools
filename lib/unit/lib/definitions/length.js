var metric
  , imperial;

metric = {
  'length-micrometer': {
    name: {
      singular: 'Millimeter'
    , plural: 'Millimeters'
    }
  , to_anchor: 1/1000
  }
, 'length-centimeter': {
    name: {
      singular: 'Centimeter'
    , plural: 'Centimeters'
    }
  , to_anchor: 1/100
  }
, 'length-meter': {
    name: {
      singular: 'Meter'
    , plural: 'Meters'
    }
  , to_anchor: 1
  }
, 'length-kilometer': {
    name: {
      singular: 'Kilometer'
    , plural: 'Kilometers'
    }
  , to_anchor: 1000
  },


};

imperial = {
  'length-inch': {
    name: {
      singular: 'Inch'
    , plural: 'Inches'
    }
  , to_anchor: 1/12
  }
, 'length-yard': {
    name: {
      singular: 'Yard'
    , plural: 'Yards'  
    }
  , to_anchor: 3
  }
, 'length-foot': {
    name: {
      singular: 'Foot'
    , plural: 'Feet'
    }
  , to_anchor: 1
  },
  'length-mile': {
    name: {
      singular: 'Mile'
    , plural: 'Miles'
    }
  , to_anchor: 5280
  },
  'length-nanometer':{
    name: {
      singular: 'Mautical mile '
      , plural: 'Mautical miles'
    }
    , to_anchor: 1852
  },
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'm'
    , ratio: 3.281
    }
  , imperial: {
      unit: 'ft'
    , ratio: 1/3.281
    }
  }
};
