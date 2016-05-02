import _ from 'lodash';
import React from 'react';
//import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
const { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea } = FRC;
import SchemaTranslator from './schema-translator';

export default class QuickInput extends React.Component {
  submit() {
  }
  enableButton() {
  }
  disable() {
  }
  changeOnBlur(e) {
    return true;
  }
  canSubmit() {
    return true;
  }
  buildFormInputs() {
    return FormBuilder.buildFormInputs(this.props.schema);
  }
  buildFormButtons() {
    return (
      <button type="submit" disabled={!this.canSubmit()}>Submit</button>
    )
  }
  render() {
    //console.log('QuickInput, props', this.props);
    let field = this.props.field || this.props.key;
    if (!field) {
      //console.error('QuickInput, SKIPPING has no field/key', this.props);
      return '';
    }

    //console.log('QuickInput', field, 'schema input', this.props.schema);
    if (this.props.schema.type === Object) {
        //console.log("skip object / later could make fieldset?");
        return null
    }
    let schema = SchemaTranslator.forInput(this.props.schema, field);
    //console.log('QuickInput', field, 'schema after cleanup', schema);

    // TODO split on various input types
    // TODO translate schema fields into formsy-react-components properties
    // TODO implement autoform-like helpers for automatic label, etc
    // TODO implement autoform-like helpers for nested schemas
    return (
      <Input
        key={field}
        name={field}
        id={field}
        value={schema.defaultValue || ''}
        label={schema.label || ''}
        type={schema.type || 'text'}
        {...this.props}
        onBlur={this.changeOnBlur}
        required={!schema.optional}
      />
    );
  }
}
QuickInput.propTypes = {
  schema: React.PropTypes.object,
  field: React.PropTypes.string,
  options: React.PropTypes.object,
};

