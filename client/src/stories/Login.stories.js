import Login from '../pages/Login.vue'

export default {
  title: 'Login',
  component: Login,
  argTypes: {}
}

const Template = (args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Login
  },
  template: '<login v-bind="$props" />',
});

export const loggedIn = Template.bind({});
loggedIn.args = {
  user: {
    name: 'erfan',
    password: '1234'
  },
};
