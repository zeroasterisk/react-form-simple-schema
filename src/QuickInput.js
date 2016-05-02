import _ from 'lodash';
import React from 'react';
//import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
const { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea } = FRC;
import SchemaTranslator from './schema-translator';

export default class QuickInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field: props.field || props.key || null,
      schema: {},
      errors: [],
      isValid: props.isValid || true,
      isDisabled: props.isDisabled || false,
      isInitialValue: props.isInitialValue || true,
      valueInitial: props.value || '',
      value: props.value || '',
    };
    if (!this.state.field) {
      console.error('QuickInput, SKIPPING has no field/key', props);
      return '';
    }

    this.state.schema = _.extend(
      this.state.schema,
      SchemaTranslator.forInput(props.schema || null, this.state.field) || {}
    );
    console.log('constructor props', props, this.state);
  }
  submit() {
  }
  enable() {
  }
  disable() {
  }
  isInitialValue() {

  }
  handleOnChange(e) {
    console.log('handleOnChange', e, this);
    return true;
  }
  handleOnInput(e) {
    return true;
  }
  handleOnBlur(e) {
    return true;
  }
  render() {
    // console.log('QuickInput, props', this.props);
    let field = this.state.field || this.state.key;
    if (!field) {
      //console.error('QuickInput, SKIPPING has no field/key', this.props);
      return '';
    }

    // TODO split on various input types
    // TODO translate schema fields into formsy-react-components properties
    // TODO implement autoform-like helpers for automatic label, etc
    // TODO implement autoform-like helpers for nested schemas
    return (
      <Input
        name={field}
        id={field}
        value={this.state.schema.defaultValue || ''}
        label={this.state.schema.label || ''}
        type={this.state.schema.type || 'text'}
        {...this.props}
        onInput={this.handleOnInput}
        onChange={this.handleOnChange.bind(this)}
        onBlur={this.handleOnBlur}
        required={this.state.schema.required}
        disabled={this.state.isDisabled}
      />
    );
  }
}
QuickInput.propTypes = {
  schema: React.PropTypes.object,
  field: React.PropTypes.string,
  key: React.PropTypes.string,
  isValid: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool,
  isInitialValue: React.PropTypes.bool,
  value: React.PropTypes.string,
  options: React.PropTypes.object,
};

