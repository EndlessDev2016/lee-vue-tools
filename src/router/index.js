import Vue from 'vue'
import Router from 'vue-router'

import HomeView from '../components/HomeView'
import FeatureZipsView from '../components/FeatureZipsView'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/FeatureZipsView',
      name: 'FeatureZipsView',
      component: FeatureZipsView
    },
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    }
  ]
})
