import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'
import './theme/default.css'
 
Vue.use(ElementUI);

Vue.config.productionTip = false

// Vue.mixin({
//   methods: {
//     getRandom: function (min, max) {
//       return Math.floor(Math.random() * (max - min) + min);
//     }
//   }
// })

new Vue({
  render: h => h(App),
}).$mount('#app')
