import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MyRequestOrgSchema } from '../_fixture-schema-request-form';
import QuickForm from '../QuickForm';

require("!style!css!less!bootstrap/less/bootstrap.less");

storiesOf('QuickForm Basic', module)
  .add('whole schema', () => (
    <QuickForm
      schema={MyRequestOrgSchema}
      onValidSubmit={action('onValidSubmit')}
      onValid={action('onValid')}
      onInvalid={action('onInvalid')}
    >
    </QuickForm>
  ));

