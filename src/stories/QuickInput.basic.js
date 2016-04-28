import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MyRequestOrgSchema } from '../_fixture-schema-request-form';
import Formsy from 'formsy-react';
import QuickInput from '../QuickInput';

require("!style!css!less!bootstrap/less/bootstrap.less");

storiesOf('QuickInput Basic', module)
  .add('Single Input - email', () => (
    <Formsy.Form>
      <QuickInput
        field="email"
        schema={MyRequestOrgSchema.email}
      />
    </Formsy.Form>
  ));


