import _ from 'lodash';
import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
const {Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea} = FRC;
import QuickInput from './QuickInput';

const csvToArray = (input) => {
  if (_.isString(input)) {
    return _.trim(input).split(',').map(_.trim);
  }
  if (_.isArray(input)) {
    return input.map(_.trim);
  }
  // console.error('QuickForm.csvToArray invalid input', input);
  // throw new Error('QuickForm.csvToArray invalid input');
  return [];
};

export default class QuickForm extends React.Component {
  submit() {
    console.log('submit');
  }
  enableButton() {
    console.log('enableButton');
  }
  disableButton() {
    console.log('disableButton');
  }
  canSubmit() {
    return true;
  }
  buildFormInputs() {
    const schema = this.props.schema || false;
    if (!schema) return '';
    const omitFields = csvToArray(this.props.omitFields);
    const fields = csvToArray(this.props.fields);
    return Object.keys(schema).map((field) => {
      if (omitFields.length > 0 && _.indexOf(omitFields, field) !== -1) return '';
      if (fields.length > 0 && _.indexOf(fields, field) === -1) return '';
      const optionsPath = ['options', field].join('.');
      const options = _.result(this.props, optionsPath);
      return (
        <QuickInput
          key={field}
          field={field}
          schema={schema[field]}
          options={options}
        />
      );
    });
  }
  buildFormButtons() {
    return (
      <button type="submit" disabled={!this.canSubmit()}>Submit</button>
    );
  }
  render() {
    return (
      <Formsy.Form
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        {this.buildFormInputs()}
        {this.buildFormButtons()}
      </Formsy.Form>
    );
  }
}

QuickForm.propTypes = {
  schema: React.PropTypes.object,
  fields: React.PropTypes.oneOfType(
    React.PropTypes.array,
    React.PropTypes.string,
  ),
  omitFields: React.PropTypes.oneOfType(
    React.PropTypes.array,
    React.PropTypes.string,
  ),
};
