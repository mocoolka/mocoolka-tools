var metric
  , imperial;

metric = {
  'angle-degree': {
    name: {
      singular: 'Metre per second'
      , plural: 'Metres per second'
    }
    , to_anchor: 3.6
  }
  , 'east-direct': {
    name: {
      singular: 'Kilometre per hour'
      , plural: 'Kilometres per hour'
    }
    , to_anchor: 1
  }
}

imperial = {
  'm/h': {
    name: {
      singular: 'Mile per hour'
      , plural: 'Miles per hour'
    }
    , to_anchor: 1
  }
  , 'speed-knot': {
    name: {
      singular: 'Knot'
      , plural: 'Knots'
    }
    , to_anchor: 1.150779
  }
  , 'ft/s': {
    name: {
      singular: 'Foot per second'
      , plural: 'Feet per second'
    }
    , to_anchor: 0.681818
  }
};

module.exports = {
  metric: metric
  , imperial: imperial
  , _anchors: {
    metric: {
      unit: 'km/h'
      , ratio: 1/1.609344
    }
    , imperial: {
      unit: 'm/h'
      , ratio: 1.609344
    }
  }
};