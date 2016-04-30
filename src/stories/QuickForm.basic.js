import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MyRequestOrgSchema } from '../_fixture-schema-request-form';
import QuickForm from '../QuickForm';

require("!style!css!less!bootstrap/less/bootstrap.less");

storiesOf('QuickForm Basic', module)
  .add('just 2 parts of an object', () => (
    <QuickForm
      schema={MyRequestOrgSchema}
      onValidSubmit={action('onValidSubmit')}
      onValid={action('onValid')}
      onInvalid={action('onInvalid')}
      canSubmit={ true }
      fields={['address.street','address.postalCode']}
    />
  ))
  .add('fields as string: only name and email', () => (
    <QuickForm
      schema={MyRequestOrgSchema}
      onValidSubmit={action('onValidSubmit')}
      onValid={action('onValid')}
      onInvalid={action('onInvalid')}
      fields="name,email"
    />
  ))
  .add('fields as array: only name and email', () => (
    <QuickForm
      schema={MyRequestOrgSchema}
      onValidSubmit={action('onValidSubmit')}
      onValid={action('onValid')}
      onInvalid={action('onInvalid')}
      fields={['name', 'email']}
    />
  ))
  .add('omitFields: only first, last, and age', () => (
    <QuickForm
      schema={MyRequestOrgSchema}
      onValidSubmit={action('onValidSubmit')}
      onValid={action('onValid')}
      onInvalid={action('onInvalid')}
      omitFields={[
        'userId', 'email', 'name', 'tags',
        'favoriteYear', 'favoriteYears', 'phone', 'address', 'address.street',
        'address.street2', 'address.city', 'address.state', 'address.postalCode',
        'contacts', 'contacts.$', 'contacts.$.name', 'contacts.$.phone', 'message',
      ]}
    />
  ))
  .add('whole schema', () => (
    <QuickForm
      schema={MyRequestOrgSchema}
      onValidSubmit={action('onValidSubmit')}
      onValid={action('onValid')}
      onInvalid={action('onInvalid')}
    />
  ));

