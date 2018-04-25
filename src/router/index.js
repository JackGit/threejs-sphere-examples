import Vue from 'vue'
import Router from 'vue-router'
import Locations from '@/pages/Locations'
import Moon from '@/pages/Moon'
import Dome from '@/pages/Dome'
import TextureTransition from '@/pages/TextureTransition'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/locations',
    name: 'Locations',
    component: Locations
  }, {
    path: '/texture-transition',
    name: 'TextureTransition',
    component: TextureTransition
  }, {
    path: '/moon',
    name: 'Moon',
    component: Moon
  }, {
    path: '/dome',
    name: 'Dome',
    component: Dome
  }]
})
