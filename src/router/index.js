import Vue from 'vue'
import Router from 'vue-router'
import Locations from '@/pages/Locations'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/locations',
    name: 'Locations',
    component: Locations
  }]
})
