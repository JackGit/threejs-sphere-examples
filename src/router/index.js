import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Locations from '@/pages/Locations'
import Moon from '@/pages/Moon'
import Dome from '@/pages/Dome'
import TextureTransition from '@/pages/TextureTransition'
import Entering from '@/pages/Entering'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
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
  }, {
    path: '/entering',
    name: 'Entering',
    component: Entering
  }]
})
