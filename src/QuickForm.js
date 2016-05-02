import _ from 'lodash';
import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
const {Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea} = FRC;
import QuickInput from './QuickInput';
import SchemaTranslator from './schema-translator';

const csvToArray = (input) => {

  if (_.isString(input)) {
    return _.trim(input).split(',').map(_.trim);
  }

  if (_.isArray(input)) {
    return input.map(_.trim);
  }

  return [];
};

export default class QuickForm extends React.Component {
  constructor(props) {
    super(props);

    this.onValidSubmit = this.onValidSubmit.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onInvalid = this.onInvalid.bind(this);

    this.state = { canSubmit: (props.canSubmit || true) }; //defaulting to true
  }

  onValidSubmit(model) {
    this.props.onValidSubmit(model);
  }

  onValid() {
    let { onValid } = this.props;

    onValid
      ? this.props.onValid()
      : this.enableButton();
  }

  onInvalid() {
    let { onInvalid } = this.props;

    onInvalid
      ? this.props.onInvalid()
      : this.disableButton();
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false })
  }

  buildFormInputs() {
    const schema = this.props.schema || false;
    if (!schema) return '';
    const omitFields = csvToArray(this.props.omitFields);
    const fields = csvToArray(this.props.fields);
    return Object.keys(schema).map((field, i) => {
      if (omitFields.length > 0 && _.indexOf(omitFields, field) !== -1) return '';
      if (fields.length > 0 && _.indexOf(fields, field) === -1) return '';
      const optionsPath = ['options', field].join('.');
      const options = _.result(this.props, optionsPath);
      return (
        <QuickInput
          key={i}
          field={field}
          schema={schema[field]}
          options={options}
        />
      );
    });
  }
  buildFormButtons() {
    let { canSubmit } = this.state;

    return (
      <button type="submit" disabled={ !canSubmit }>Submit</button>
    );
  }
  render() {
    return (
      <Formsy.Form
        onValidSubmit={this.onValidSubmit}
        onValid={this.onValid}
        onInvalid={this.onInvalid}
      >
        {this.buildFormInputs()}
        {this.buildFormButtons()}
      </Formsy.Form>
    );
  }
}

QuickForm.propTypes = {
  schema: React.PropTypes.object,
  fields: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
  ]),
  omitFields: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
  ]),
  onValidSubmit: React.PropTypes.func,
  onValid: React.PropTypes.func,
  onInvalid: React.PropTypes.func,
  canSubmit: React.PropTypes.bool
};
