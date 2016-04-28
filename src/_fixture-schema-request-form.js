
// Schema.MyRequestOrgSchema = new SimpleSchema({
// access by
export let MyRequestOrgSchema = {
  userId: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'hidden',
        required: true,
      },
    },
  },
  email: {
    type: String,
    // regEx: SimpleSchema.RegEx.Email,
    regEx: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    label: 'E-mail address',
    autoform: {
      afFieldInput: {
        type: 'email',
        required: true,
      },
    },
  },
  name: {
    type: String,
    label: 'Your name',
    max: 50,
    index: 1,
    unique: true,
    autoform: {
      afFieldInput: {
        required: true,
      },
    },
  },
  firstName: {
    type: String,
    index: 1,
    unique: true,
  },
  lastName: {
    type: String,
    optional: true,
  },
  age: {
    type: Number,
    optional: true,
  },
  tags: {
    type: String,
    optional: true,
  },
  favoriteYear: {
    type: Number,
  },
  favoriteYears: {
    type: [Number],
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
    optional: true,
  },
  address: {
    type: Object,
  },
  'address.street': {
    type: String,
  },
  'address.street2': {
    type: String,
    optional: true,
  },
  'address.city': {
    type: String,
  },
  'address.state': {
    type: String,
    allowedValues: [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
      'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
      'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
      'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
      'WI', 'WY',
    ],
    autoform: {
      afFieldInput: {
        firstOption: '(Select a State)',
      },
    },
  },
  'address.postalCode': {
    type: String,
    label: 'ZIP',
  },
  contacts: {
    type: Array,
    optional: true,
  },
  'contacts.$': {
    type: Object,
  },
  'contacts.$.name': {
    type: String,
  },
  'contacts.$.phone': {
    type: String,
  },
  message: {
    type: String,
    label: 'Message',
    max: 1000,
    optional: true,
  },
};
