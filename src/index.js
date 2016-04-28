/**
 * Tools to use Meteor's
 * https://github.com/aldeed/meteor-simple-schema/
 * to
 * https://github.com/christianalfoni/formsy-react
 */
import React from 'react';
import * as FormBuilder from './form-builder';
import * as FormValidator from './form-validator';

export const FormSimpleSchema = {
  FormBuilder: FormBuilder,
  FormValidator: FormValidator,
};

/*
// automatic form for entire schema
const QuickForm = ({ children, onSubmit, style = {} }) => (
  <Formsy
    style={{ ...buttonStyles, ...style }}
    onClick={onClick}
  >
    {children}
  </QuickForm>
);

QuickForm.propTypes = {
  schema: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func,
  style: React.PropTypes.object,
};

export default QuickForm;
*/
