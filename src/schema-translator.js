/**
 * Tools to translate schema Component
 * from
 * https://github.com/aldeed/meteor-simple-schema/
 * to
 * https://github.com/christianalfoni/formsy-react
 */
import _ from 'lodash';
const humanize = require('underscore.string/humanize');

  // TODO allow merging in options into schema (easy runtime over-rides)
  // TODO cleanup schema (WIP)
  // TODO translate schema fields into formsy-react-components properties


// resolve values for all properties, recursively
export function resolve(schemaInput) {
  const schema = _.clone(schemaInput);
  Object.keys(schema).forEach(field => {
    schema[field] = _.result(schema, field);
    if (_.isObject(schema[field])) {
      // recursion
      schema[field] = resolve(schema[field]);
    }
  });
  return schema;
}
// merge in any autoform values, nested children, recursively
export function mergeInAutoform(schemaInput) {
  let schema = _.clone(schemaInput);
  Object.keys(schema).forEach(field => {
    if (!_.isObject(schema[field])) return false;
    if (field === 'autoform' || field === 'afFieldInput') {
      // recursion
      schema = _.extend(schema, mergeInAutoform(schema[field]));
      delete schema[field];
    }
    return true;
  });
  return schema;
}

// --------------------------------------------
// TRANSLATE SCHEMA - here's the real work
// --------------------------------------------

// translate type (String, Number, etc) into string type
export function translateType(schemaInput) {
  if (!_.has(schemaInput, 'type')) return schemaInput;
  const schema = _.clone(schemaInput);
  if (!schema.type) {
    delete schema.type;
    return schema;
  }
  if (_.isNative(schema.type)) {
    if (schema.type === String) {
      schema.type = 'text';
    }
    if (schema.type === Number) {
      schema.type = 'number';
    }
    if (schema.type === Boolean) {
      // TODO, need to switch input element types for render
      schema.type = 'checkbox';
    }
    if (schema.type === Object || schema.type === Array) {
      // TODO - special handling required here... probably before here
      schema.schemaGroupType = schema.type;
      schema.type = 'text';
    }
  }
  if (_.isString(schema.type) && schema.type.length === 0) {
    delete schema.type;
    return schema;
  }
  const allowed = [
    'color', 'date', 'datetime', 'datetime-local', 'email', 'hidden',
    'month', 'number', 'password', 'range', 'search', 'tel', 'text',
    'time', 'url', 'week',
  ];
  if (_.isString(schema.type) && _.indexOf(allowed, schema.type) !== -1) {
    return schema;
  }
  console.log('translateType, bad Schema.type!!!', schema);
  delete schema.type;
  return schema;
}
// translate optional into !required
export function translateRequired(schemaInput) {
  const schema = _.clone(schemaInput);
  if (_.has(schema, 'optional')) {
    schema.required = !schema.optional;
    return schema;
  }
  if (_.has(schema, 'required')) {
    schema.required = !!schema.required;
    return schema;
  }
  schema.required = true;
  return schema;
}
// translate "default" label
export function translateLabel(schemaInput) {
  if (_.has(schemaInput, 'label')) return schemaInput;
  if (!_.has(schemaInput, 'field')) {
    console.error('translateLabel can not get label, missing field', schemaInput);
    return schemaInput;
  }
  const schema = _.clone(schemaInput);
  schema.label = humanize(schema.field);
  return schema;
}
// translate all fields
export function translate(schemaInput) {
  return translateLabel(
    translateRequired(
      translateType(
        schemaInput
      )
    )
  );
}

/**
 * Get the schema for just 1 field, and "cleans" it
 *
 * SchemaTranslator.forInput(this.props.schema, 'email') ==> {type:'emai',...}
 *
 * @param object schemaInput (full object or schema)
 * @param string field is the name of the schema field (key)
 * @param object options optional "merge into schema" helper
 */
export function forInput(schemaInput, field, options) {
  const schema = _.clone(schemaInput);
  schema.field = field;
  return translate(
    _.extend(
      mergeInAutoform(
        resolve(schema)
      ),
      options || {}
    )
  );
}

/**
 * Get the schema for an entire form (all fields & validator functions)
 *
 * SchemaTranslator.forForm(this.props.schema) => {
 *   schema: {}, validateOne: Function, validate; Function
 * }
 *
 * @param object schemaInput (full object or schema)
 * @return object schemaBundle properties schema, validate, validateOne
 */
export function forForm(schemaInput) {
  console.log('forForm', schemaInput);
  let schema = {};
  let context = {};
  let validate = () => { console.log('forInput validate function not supported'); };
  let validateOne = () => { console.log('forInput validateOne function not supported'); };
  if (schemaInput._schema) {
    // passed in a whole SimpleSchema document (recommended)
    schema = schemaInput._schema;
    context = schemaInput.newContext();
    validate = context.validate; // validate(obj, options) --> boolean isValid
    validateOne = context.validateOne; // validateOne(obj, key, options) --> boolean isValid
  } else if (_.isObject(schemaInput)) {
    // passed in only a schema object (sorta supported)
    schema = schemaInput;
    // TODO link to formsy validation
  }
  return {
    schema: schema,
    context: context,
    validate: validate,
    validateOne: validateOne,
  };
}

/**
 * Get any value (or resolve a function value)
 *
 * SchemaTranslator.get(schema, 'email.type', 'email') === 'email'
 * SchemaTranslator.get(schema, 'email.placeholder') === 'Enter your email'
 * SchemaTranslator.get(schema, 'email.non_specified', 'default') === 'default'
 * SchemaTranslator.get(schema, 'email.non_specified') === undefined
 *
 * @param object schema (full object or schema)
 * @param string path path within object to return
 * @param any defaultValue used for anything resulting in undefined
 */
export function get(schema, path, defaultValue) {
  return _.result(schema, path, defaultValue);
}

let SchemaTranslator = {
  forInput: forInput,
  forForm: forForm,
  mergeInAutoform: mergeInAutoform,
  // resolve functions to values
  resolve: resolve,
  // easy access to the resolved values for an path in the schema
  get: get,
  /**
   * Get all basic attributes for a textarea
   * extra fields
   *
   * (this is just an idea... probably a bad one)
   */
  defaults: {
    'textarea': {
      type: 'textarea',
      rows: 1,
      cols: undefined
    }
  }

};



export default SchemaTranslator;
