import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Dialog,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Card,
  Table,
  TableColumn,
  Col,
  Form,
  FormItem,
  Select,
  Input,
  Option,
  Pagination
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {Message} from 'element-ui'
import {MessageBox} from 'element-ui'
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

import router from '../src/router'
import store from '../src/store'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Input)
Vue.use(Option)
Vue.use(Pagination)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
