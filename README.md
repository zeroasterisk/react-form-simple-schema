# ABANDONED

I highly recommend you try out [uniforms](https://github.com/vazco/uniforms).

* **Automatic forms generation**
* **Fields capable of rendering every schema**
* **Helper for creating custom fields with one line**
* **Inline and asynchronous form validation**
* **Integrations with various schemas:**
    * **[GraphQL](https://github.com/graphql/graphql-js)**
    * **[SimpleSchema](https://github.com/aldeed/meteor-simple-schema)**
    * **[SimpleSchema@2](https://github.com/aldeed/node-simple-schema)**
    * **And any other - only [a small wrapper](https://github.com/vazco/uniforms/blob/master/INTRODUCTION.md#schemas) is needed!**
* **Wide range of themes:**
    * **[AntD](https://ant.design/) theme**
    * **[Bootstrap3](http://getbootstrap.com/) theme**
    * **[Bootstrap4](http://v4-alpha.getbootstrap.com/) theme**
    * **[Material UI](http://www.material-ui.com/) theme**
    * **[Semantic UI](http://semantic-ui.com/) theme**
    * **plain HTML theme**

-------

# React Form Simple Schema Component (LEGACY)

This is a *(DEPRECATED EXPERIMENT)* Form Builder and Validator package for
[React](https://facebook.github.io/react/)
using
[formsy](https://github.com/christianalfoni/formsy-react) &
[formsy-react-components](https://github.com/twisty/formsy-react-components)
*(bootstrap)*.

This should be a bridge for
[Meteor](https://meteor.com)
developers who use
[Simple Schema](https://atmospherejs.com/aldeed/simple-schema).

The package should *optionally* build a form *optionally* and validate a form
similar to *(a subset of)*
[Autoform](https://github.com/aldeed/meteor-autoform)
(built on top of Simple Schema)

### Demo / Example

You can view the results thanks to
[React Storybook](https://github.com/kadirahq/react-storybook)
here:

https://github.com/zeroasterisk/react-form-simple-schema

### Install

```
npm install --save react-form-simple-schema
```

### Usage From Meteor v1.3+

See more in [stories](./src/stories).

----

You must pass down the `simple-schema` schema `object` to the
React Component in the
[container](http://guide.meteor.com/react.html#using-createContainer)

```js
import { Meteor } from 'meteor/meteor';
import { Lists } from '../../api/lists/lists.js';
import { createContainer } from 'meteor/react-meteor-data';
import ListPage from '../pages/ListPage.js';

export default createContainer(({ params }) => {
  const { id } = params;
  const todosHandle = Meteor.subscribe('todos.inList', id);
  const loading = !todosHandle.ready();
  const list = Lists.findOne(id);
  const listExists = !loading && !!list;
  const listSchema = Lists.schema();
  return {
    loading,
    list,
    listExists,
    todos: listExists ? list.todos().fetch() : [],
    listSchema
  };
```

Then you can use the schema object in your Component.

```js
    <QuickForm
      schema={this.props.listSchema}
      onValidSubmit={action('onValidSubmit')}
      onValid={action('onValid')}
      onInvalid={action('onInvalid')}
      fields="name,email"
    />
```

*NOTE:* you can also pass in just a object which simulates the properties of
a `simple-schema` schema, or the properties of
[formsy-react-components](https://github.com/twisty/formsy-react-components)
*(which is what we translate simple schema into)*

### Contribute

**PLEASE** do contribute.

Send me **pull requests** with fixes, features, stories, etc.

You can also send issues, etc.  *(Ideally, communicate with a story in storybook and PR)*

see [CONTRIBUTING.md](./CONTRIBUTING.md)

### TODO / Roadmap

- [x] setup package
- [x] proof of concept
- [x] build the basics of a form, with `simple-schema`
- [ ] validate the form
- [ ] build complex forms, nested Array
- [ ] build complex forms, nested Object
- [ ] support some of the common options for AutoForm
 - [x] support `omitFields` && `fields`

#### Consider

- [ ] replicate/use alternate form components: unstyled, custom, material-ui, etc.

### Thanks

Thanks to [react-cdk](https://github.com/kadirahq/react-cdk) for a great
boilerplate for a React component.
