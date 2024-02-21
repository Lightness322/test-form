import Vue from "vue"
import App from "./App.vue"

import "./assets/main.sass"

import Vuelidate from "vuelidate"

Vue.config.devtools = true
Vue.config.publicPath = /form-test/

Vue.use(Vuelidate)

new Vue({
  render: (h) => h(App),
}).$mount("#app")
