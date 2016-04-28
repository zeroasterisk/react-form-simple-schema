import _ from 'lodash';
import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
const {Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea} = FRC;
import QuickInput from './QuickInput';

export default class QuickForm extends React.Component {
  submit() {
  }
  enableButton() {
  }
  disable() {
  }
  canSubmit() {
    return true;
  }
  buildFormInputs() {
    let schema = this.props.schema || false;
    if (!schema) return '';
    return Object.keys(schema).map((field) => {
      let options = _.result(this.props, 'options.' + field);
      return <QuickInput
        key={field}
        field={field}
        schema={schema[field]}
        options={options}
      />
    });
  }
  buildFormButtons() {
    return (
      <button type="submit" disabled={!this.canSubmit()}>Submit</button>
    )
  }
  render() {
    return (
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        {this.buildFormInputs()}
        {this.buildFormButtons()}
      </Formsy.Form>
    )
  }
}
