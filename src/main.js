// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import VueResource from 'vue-resource'
import 'vue-material/dist/vue-material.css'

/* 共通コンポーネント登録 */
import BeforeToAfterBox from './components/BeforeToAfterBox'
import FileOutputBox from './components/FileOutputBox'
Vue.component('before-after-box', BeforeToAfterBox)
Vue.component('file-output-box', FileOutputBox)

// リアクティブプロパティ定義
// 親<->子コンポーネントのイベント渡しをするためにVue.prototypeに伝播
const Bus = new Vue()
Object.defineProperty(Vue.prototype, '$bus', {
  get () {
    return Bus
  }
})

Vue.use(VueResource)
Vue.use(VueMaterial)
/* App Component 登録 */
let MainApp = Vue.component('app', App)

Vue.material.registerTheme({
  default: {
    primary: 'red',
    accent: 'blue'
  },
  green: {
    primary: 'green',
    accent: 'pink'
  },
  orange: {
    primary: 'orange',
    accent: 'green'
  }
})

Vue.config.productionTip = false

MainApp = new MainApp({
  el: '#app',
  router,
  template: '<App/>',
  components: { MainApp }
})

router.beforeEach((to, from, next) => {
  Vue.nextTick(() => {
    let mainContent = document.querySelector('.main-content')

    if (mainContent) {
      mainContent.scrollTop = 0
    }
    MainApp.closeSidenav()
    next()
  })
})
