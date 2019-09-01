import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
 
Vue.use(Element)

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
