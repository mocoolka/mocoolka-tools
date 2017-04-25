// © Copyright Mocoolka Corporation 2015,2017.
// Node module: mocoolka-tools
// LICENSE: MIT
const { validationTools, iteratorTools, transformTools } = require('../src/index.js');
let assert = require('chai').assert;
let should = require('chai').should();
let expect = require('chai').expect;

const schemaTestCase = {
  number_type: {
    schema: {
      properties: {
        value: {
          type: 'number',
        },
      },
    },
    values: [{
      data: { value: 12 },
      expected: true,
    }, {
      data: { value: '12' },
      expected: false,
    },
      {
        data: { value: 13.123 },
        expected: true,
      },
      {
        data: { value: null },
        expected: false,
      },
      {
        data: { value: new Date() },
        expected: false,
      },
      {
        data: { value: [12, 13] },
        expected: false,
      },
      {
        data: { value: false },
        expected: false,
      },
      {
        data: { value: { key: 12 } },
        expected: false,
      },
    ],

  },
  string_type: {
    schema: {
      properties: {
        value: {
          type: 'string',
        },
      },
    },
    values: [{
      data: { value: 12 },
      expected: false,
    }, {
      data: { value: '12' },
      expected: true,
    },
      {
        data: { value: 13.123 },
        expected: false,
      },
      {
        data: { value: null },
        expected: false,
      },
      {
        data: { value: new Date() },
        expected: false,
      },
      {
        data: { value: [12, 13] },
        expected: false,
      },
      {
        data: { value: false },
        expected: false,
      },
      {
        data: { value: { key: 12 } },
        expected: false,
      },
    ],

  },
  boolean_type: {
    schema: {
      properties: {
        value: {
          type: 'boolean',
        },
      },
    },
    values: [{
      data: { value: 12 },
      expected: false,
    }, {
      data: { value: '12' },
      expected: false,
    },
      {
        data: { value: 13.123 },
        expected: false,
      },
      {
        data: { value: null },
        expected: false,
      },
      {
        data: { value: new Date() },
        expected: false,
      },
      {
        data: { value: [12, 13] },
        expected: false,
      },
      {
        data: { value: false },
        expected: true,
      },
      {
        data: { value: { key: 12 } },
        expected: false,
      },
    ],

  },
  null_type: {
    schema: {
      properties: {
        value: {
          type: 'null',
        },
      },
    },
    values: [{
      data: { value: 12 },
      expected: false,
    }, {
      data: { value: '12' },
      expected: false,
    },
      {
        data: { value: 13.123 },
        expected: false,
      },
      {
        data: { value: null },
        expected: true,
      },
      {
        data: { value: new Date() },
        expected: false,
      },
      {
        data: { value: [12, 13] },
        expected: false,
      },
      {
        data: { value: false },
        expected: false,
      },
      {
        data: { value: { key: 12 } },
        expected: false,
      },
    ],

  },
  integer_type: {
    schema: {
      properties: {
        value: {
          type: 'integer',
        },
      },
    },
    values: [{
      data: { value: 12 },
      expected: true,
    }, {
      data: { value: '12' },
      expected: false,
    },
      {
        data: { value: 13.123 },
        expected: false,
      },
      {
        data: { value: null },
        expected: false,
      },
      {
        data: { value: new Date() },
        expected: false,
      },
      {
        data: { value: [12, 13] },
        expected: false,
      },
      {
        data: { value: false },
        expected: false,
      },
      {
        data: { value: { key: 12 } },
        expected: false,
      },
    ],

  },
  object_type: {
    schema: {
      properties: {
        value: {
          type: 'object',
        },
      },
    },
    values: [{
      data: { value: 12 },
      expected: false,
    }, {
      data: { value: '12' },
      expected: false,
    },
      {
        data: { value: 13.123 },
        expected: false,
      },
      {
        data: { value: null },
        expected: false,
      },
      {
        data: { value: new Date() },
        expected: true,
      },
      {
        data: { value: [12, 13] },
        expected: false,
      },
      {
        data: { value: false },
        expected: false,
      },
      {
        data: { value: { key: 12 } },
        expected: true,
      },
    ],

  },
  array_type: {
    schema: {
      properties: {
        value: {
          type: 'array',
        },
      },
    },
    values: [{
      data: { value: 12 },
      expected: false,
    }, {
      data: { value: '12' },
      expected: false,
    },
      {
        data: { value: 13.123 },
        expected: false,
      },
      {
        data: { value: null },
        expected: false,
      },
      {
        data: { value: new Date() },
        expected: false,
      },
      {
        data: { value: [12, 13] },
        expected: true,
      },
      {
        data: { value: false },
        expected: false,
      },
      {
        data: { value: { key: 12 } },
        expected: false,
      },
    ],

  },
  number_maximum: {
    schema: {
      properties: {
        value: {
          type: 'number',
          maximum: 6,
        },
      },
    },
    values: [{
      data: { value: 12 },
      expected: false,
    }, {
      data: { value: -56 },
      expected: true,
    },
      {
        data: { value: 3 },
        expected: true,
      },
      {
        data: { value: 6 },
        expected: true,
      },
    ],

  },
  number_exclusiveMaximum: {
    schema: {
      properties: {
        value: {
          type: 'number',
          exclusiveMaximum: 6,
        },
      },
    },
    values: [{
        data: { value: 6 },
        expected: false,
      },
    ],

  },
  number_minimum: {
    schema: {
      properties: {
        value: {
          type: 'number',
          minimum: 6,
        },
      },
    },
    values: [{
      data: { value: 12 },
      expected: true,
    }, {
      data: { value: -56 },
      expected: false,
    },
      {
        data: { value: 3 },
        expected: false,
      },
      {
        data: { value: 6 },
        expected: true,
      },
    ],

  },
  number_exclusiveMinimum: {
    schema: {
      properties: {
        value: {
          type: 'number',
          exclusiveMinimum: 6,
        },
      },
    },
    values: [
      {
        data: { value: 6 },
        expected: false,
      },
    ],
  },
  number_multipleOf: {
    schema: {
      properties: {
        value: {
          type: 'number',
          multipleOf: 6,
        },
      },
    },
    values: [{
      data: { value: 12 },
      expected: true,
    }, {
      data: { value: -56 },
      expected: false,
    },
      {
        data: { value: 6 },
        expected: true,
      },
      {
        data: { value: -12 },
        expected: true,
      },
    ],

  },
  string_maxLength: {
    schema: {
      properties: {
        value: {
          type: 'string',
          maxLength: 6,
        },
      },
    },
    values: [{
      data: { value: 'test' },
      expected: true,
    }, {
      data: { value: 'test12' },
      expected: true,
    },
      {
        data: { value: 'test123' },
        expected: false,
      },
    ],

  },
  string_minLength: {
    schema: {
      properties: {
        value: {
          type: 'string',
          minLength: 6,
        },
      },
    },
    values: [{
      data: { value: 'test' },
      expected: false,
    }, {
      data: { value: 'test12' },
      expected: true,
    },
      {
        data: { value: 'test123' },
        expected: true,
      },
    ],

  },
  string_pattern: {
    schema: {
      properties: {
        value: {
          type: 'string',
          pattern: '[abc]+',
        },
      },
    },
    values: [{
      data: { value: 'g1' },
      expected: false,
    }, {
      data: { value: 'aer' },
      expected: true,
    },
      {
        data: { value: 'ca1' },
        expected: true,
      },
    ],

  },
  string_format_uri: {
    schema: {
      properties: {
        value: {
          type: 'string',
          format: 'url',
        },
      },
    },
    values: [{
      data: { value: 'http://mocoolka.com' },
      expected: true,
    }, {
      data: { value: 'ftp://ftp.is.co.za/rfc/rfc1808.txt' },
      expected: true,
    },
      {
        data: { value: 'ldap://[2001:db8::7]/c=GB?objectClass?one' },
        expected: false,
      },
      {
        data: { value: 'mailto:John.Doe@example.com' },
        expected: false,
      },
      {
        data: { value: 'news:comp.infosystems.www.servers.unix' },
        expected: false,
      },
      {
        data: { value: 'tel:+1-816-555-1212' },
        expected: false,
      },
      {
        data: { value: 'telnet://192.0.2.16:80/' },
        expected: false,
      },
      {
        data: { value: 'urn:oasis:names:specification:docbook:dtd:xml:4.1.2' },
        expected: false,
      },
      {
      data: { value: 'mocoolka.com' },
      expected: false,
    },
      {
        data: { value: 'ca1' },
        expected: false,
      },
    ],

  },
  string_format_email: {
    schema: {
      properties: {
        value: {
          type: 'string',
          format: 'email',
        },
      },
    },
    values: [{
      data: { value: 'admin@mocoolka.com' },
      expected: true,
    }, {
      data: { value: 'mocoolka.com' },
      expected: false,
    },
      {
        data: { value: 'ca1' },
        expected: false,
      },
    ],

  },
  string_format_hostname: {
    schema: {
      properties: {
        value: {
          type: 'string',
          format: 'hostname',
        },
      },
    },
    values: [{
      data: { value: 'admin@mocoolka.com' },
      expected: false,
    }, {
      data: { value: 'mocoolka.com' },
      expected: true,
    },
      {
        data: { value: 'ca1' },
        expected: true,
      },
    ],

  },
  string_format_ipv4: {
    schema: {
      properties: {
        value: {
          type: 'string',
          format: 'ipv4',
        },
      },
    },
    values: [{
      data: { value: 'admin@mocoolka.com' },
      expected: false,
    }, {
      data: { value: '10.21.1.1' },
      expected: true,
    },
      {
        data: { value: 'ca1' },
        expected: false,
      },
    ],

  },
  string_format_ipv6: {
    schema: {
      properties: {
        value: {
          type: 'string',
          format: 'ipv6',
        },
      },
    },
    values: [{
      data: { value: 'admin@mocoolka.com' },
      expected: false,
    }, {
      data: { value: '10.21.1.1' },
      expected: false,
    },
      {
        data: { value: '1080:0:0:0:8:800:200C:417A' },
        expected: true,
      },
    ],

  },
  string_format_datetime: {
    schema: {
      properties: {
        value: {
          type: 'string',
          format: 'date-time',
        },
      },
    },
    values: [{
      data: { value: 'admin@mocoolka.com' },
      expected: false,
    }, {
      data: { value: '10.21.1.1' },
      expected: false,
    },
      {
        data: { value: '1985-04-12T23:20:50.52Z' },
        expected: true,
      },
    ],

  },
  string_format_date: {
    schema: {
      properties: {
        value: {
          type: 'string',
          format: 'date',
        },
      },
    },
    values: [{
      data: { value: 'admin@mocoolka.com' },
      expected: false,
    }, {
      data: { value: '10.21.1.1' },
      expected: false,
    },
      {
        data: { value: '1985-04-12T23:20:50.52Z' },
        expected: false,
      },
      {
        data: { value: '1985-04-12' },
        expected: true,
      },
      {
        data: { value: '1985-04-12Z' },
        expected: false,
      },
    ],

  },
  string_format_time: {
    schema: {
      properties: {
        value: {
          type: 'string',
          format: 'time',
        },
      },
    },
    values: [{
      data: { value: 'admin@mocoolka.com' },
      expected: false,
    }, {
      data: { value: '10.21.1.1' },
      expected: false,
    },
      {
        data: { value: '1985-04-12T23:20:50.52Z' },
        expected: false,
      },
      {
        data: { value: '23:20:50.52' },
        expected: true,
      },
      {
        data: { value: '23:20:50.52Z' },
        expected: true,
      },
    ],

  },
  string_format_formatMaximum: {
    schema: {
      properties: {
        value: {
          type: 'string',
          format: 'date',
          formatMaximum: '2016-12-01',
        },
      },
    },
    values: [
      {
        data: { value: '1985-04-12' },
        expected: true,
      },
      {
        data: { value: '2016-12-01' },
        expected: true,
      },
      {
        data: { value: '2017-04-12' },
        expected: false,
      },
    ],

  },
  string_format_formatExclusiveMaximum: {
    schema: {
      properties: {
        value: {
          type: 'string',
          format: 'date',
          formatMaximum: '2016-12-01',
          formatExclusiveMaximum: true,
        },
      },
    },
    values: [
      {
        data: { value: '1985-04-12' },
        expected: true,
      },
      {
        data: { value: '2016-12-01' },
        expected: false,
      },
      {
        data: { value: '2017-04-12' },
        expected: false,
      },
    ],

  },
  array_maxItems: {
    schema: {
      properties: {
        value: {
          type: 'array',
          maxItems: 3,
        },
      },
    },
    values: [
      {
        data: { value: [12, 1] },
        expected: true,
      },
      {
        data: { value: [12, 1, 4] },
        expected: true,
      },
      {
        data: { value: [12, 1, 4, 5] },
        expected: false,
      },
    ],

  },
  array_minItems: {
    schema: {
      properties: {
        value: {
          type: 'array',
          minItems: 3,
        },
      },
    },
    values: [
      {
        data: { value: [12, 1] },
        expected: false,
      },
      {
        data: { value: [12, 1, 4] },
        expected: true,
      },
      {
        data: { value: [12, 1, 4, 5] },
        expected: true,
      },
    ],

  },
  array_uniqueItems: {
    schema: {
      properties: {
        value: {
          type: 'array',
          uniqueItems: true,
        },
      },
    },
    values: [
      {
        data: { value: [12, 1, 1] },
        expected: false,
      },
      {
        data: { value: [{ a: 1, b: 1 }, { a: 1, b: 1 }] },
        expected: false,
      },
      {
        data: { value: [{ a: 1, b: 1 }, { a: 1, b: 2 }] },
        expected: true,
      },
    ],

  },
  array_items: {
    schema: {
      properties: {
        value: {
          type: 'array',
          items: {
            type: 'integer',
          },
        },
      },
    },
    values: [
      {
        data: { value: [12, 1, 1] },
        expected: true,
      },
      {
        data: { value: [{ a: 1, b: 1 }, { a: 1, b: 1 }] },
        expected: false,
      },
      {
        data: { value: ['12', 1, 1] },
        expected: false,
      },
    ],

  },
  array_items_array: {
    schema: {
      properties: {
        value: {
          type: 'array',
          items: [{
            type: 'integer',
          }, {
              type: 'string',
            },
          ],
        },
      },
    },
    values: [
      {
        data: { value: [12, 'a', 1] },
        expected: true,
      },
      {
        data: { value: [12, 1, 1] },
        expected: false,
      },
      {
        data: { value: [12] },
        expected: true,
      },
    ],

  },
  array_items_additionalItems: {
    schema: {
      properties: {
        value: {
          type: 'array',
          items: [{
            type: 'integer',
          }, {
            type: 'string',
          },
          ],
          additionalItems: true,
        },
      },
    },
    values: [
      {
        data: { value: [12, 'a', 1] },
        expected: true,
      },
      {
        data: { value: [12, 1, 1] },
        expected: false,
      },
      {
        data: { value: [12] },
        expected: true,
      },
    ],

  },
  object_required: {
    schema: {
      required: ['value1'],
      properties: {
        value1: {
          type: 'string',
        },
        value2: {
          type: 'string',
        },
      },
    },
    values: [
      {
        data: { value1: '12', value2: '2' },
        expected: true,
      },
      {
        data: { value2: '2' },
        expected: false,
      },
    ],

  },
  object_additionalProperties: {
    schema: {
      additionalProperties: false,
      properties: {
        value1: {
          type: 'string',
        },
        value2: {
          type: 'string',
        },
      },
    },
    values: [
      {
        data: { value1: '12', value2: '2' },
        expected: true,
      },
      {
        data: { value2: '2' },
        expected: true,
      },
      {
        data: { value2: '2', v: 4 },
        expected: false,
      },
    ],

  },
  object_dependencies: {
    schema: {
      dependencies: {
        value1: ['value2'],
      },
      properties: {
        value1: {
          type: 'string',
        },
        value2: {
          type: 'string',
        },
      },
    },
    values: [
      {
        data: { value1: '12', value2: '2' },
        expected: true,
      },
      {
        data: { value2: '2' },
        expected: true,
      },
      {
        data: { value1: '12', v: 4 },
        expected: false,
      },
    ],

  },
  object_enum: {
    schema: {
      properties: {
        value1: {
          type: 'string',
          enum: ['a', 'b', 'c'],
        },
      },
    },
    values: [
      {
        data: { value1: 'a', value2: '2' },
        expected: true,
      },
      {
        data: { value1: 'b' },
        expected: true,
      },
      {
        data: { value1: 'd', v: 4 },
        expected: false,
      },
    ],

  },
  object_const: {
    schema: {
      properties: {
        value1: {
          type: 'string',
        },
        value2: {
          // const:  { '$data': '0' },
        },
      },
    },
    values: [
      {
        data: { value1: 'a', value2: 'a' },
        expected: true,
      },
      {
        data: { value1: 'b' },
        expected: true,
      },
      {
        data: { value1: 'd', value2: 'b' },
        expected: true,
      },
    ],

  },
  object_not: {
    schema: {
      properties: {
        value1: {
          not: { type: 'string' },
        },
      },
    },
    values: [
      {
        data: { value1: 'a' },
        expected: false,
      },
      {
        data: { value1: 1 },
        expected: true,
      },
      {
        data: { value1: new Date() },
        expected: true,
      },
    ],

  },
  object_oneOf: {
    schema: {
      properties: {
        value1: {
          oneOf: [{
            type: 'integer',
          },
            {
              type: 'number',
              maximum: 3,
            },
            ],
        },
      },
    },
    values: [
      {
        data: { value1: 4 },
        expected: true,
      },
      {
        data: { value1: 1.2 },
        expected: true,
      },
      {
        data: { value1: 2 },
        expected: false,
      },
      {
        data: { value1: 'a' },
        expected: false,
      },
    ],

  },
  object_anyOf: {
    schema: {
      properties: {
        value1: {
          anyOf: [{
            type: 'integer',
          },
            {
              type: 'number',
              maximum: 3,
            },
          ],
        },
      },
    },
    values: [
      {
        data: { value1: 4 },
        expected: true,
      },
      {
        data: { value1: 1.2 },
        expected: true,
      },
      {
        data: { value1: 2 },
        expected: true,
      },
      {
        data: { value1: 'a' },
        expected: false,
      },
    ],

  },
  object_allOf: {
    schema: {
      properties: {
        value1: {
          allOf: [{
            type: 'integer',
          },
            {
              type: 'number',
              maximum: 3,
            },
          ],
        },
      },
    },
    values: [
      {
        data: { value1: 4 },
        expected: false,
      },
      {
        data: { value1: 1.2 },
        expected: false,
      },
      {
        data: { value1: 2 },
        expected: true,
      },
      {
        data: { value1: 'a' },
        expected: false,
      },
    ],

  },
};

describe('validationTools module', function () {
  describe('validationJsonSchema module', function () {
    iteratorTools.iterator(schemaTestCase, (value)=> {
        const item = value.value;
        let schema = item.schema;
        iteratorTools.iterator(item.values, (caseValue)=> {
          it(`validate ${value.key} schema:${transformTools.objectToString(schema)} 
          value:${transformTools.objectToString(caseValue.data)}
           expected:${caseValue.expected}`, () => {
            validationTools.validateJsonSchema({ schema, data: caseValue.data },
              (error, result)=> {
              expect(result).to.be.equal(caseValue.expected);
            });
          });
        });

      });
  }

  );

});
