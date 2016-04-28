/**
 * Tools to translate form data into a data object (before Validation && submit)
 */
import _ from 'lodash';

export function getOptions(options) {
  return _.extend(
    {
      fields: [],
      omitFields: []
    },
    options || {}
  );
}

export function filterElements(elements, options) {
  return _.filter(elements, filterElement.bind(this, options));
}

export function filterElement(options, el) {
  if (options.fields.length > 0) {
    if (_.indexOf(options.fields, el.name) === -1) {
      return false;
    }
  }
  if (options.omitFields.length > 0) {
    if (_.indexOf(options.omitFields, el.name) !== -1) {
      return false;
    }
  }
  return true;
}

export function getDataFromElements(elements, options) {
  options = getOptions(options);
  return _.fromPairs(
    _.map(
      filterElements(elements, options),
      (el) => { return [el.name, el.value]; }
    )
  );
}

export default function getDataFromEvent(event, options) {
  options = getOptions(options);
  event.preventDefault();
  return getDataFromElements(event.target.elements, options);
}


