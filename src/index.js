/**
 * Tools to use Meteor's
 * https://github.com/aldeed/meteor-simple-schema/
 * to
 * https://github.com/christianalfoni/formsy-react
 */
import React from 'react';
import QuickFormModule from './QuickForm';
import QuickInputModule from './QuickInput';

export const QuickForm = QuickFormModule;
export const QuickInput = QuickInputModule;

const ReactFormSimpleSchema = {
  QuickForm: QuickFormModule,
  QuickInput: QuickInputModule,
};
export default ReactFormSimpleSchema;

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
