import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import rank from '@/pages/rank'
import plist from '@/pages/plist'
import singer from '@/pages/singer'
import search from '@/pages/search'
import rankInfo from '@/pages/rankInfo'
import plistInfo from '@/pages/plistInfo'
import singerList from '@/pages/singerList'
import singerInfo from '@/pages/singerInfo'
import login from '@/pages/login'


Vue.use(Router)


export default new Router({
	mode: 'hash',
  routes: [
    {
      path: '/',
      name: home,
		  component: home,
    },
    {
    	path: '/rank',
  		name: rank,
		  component: rank, 
    },
    {
    	path: '/plist',
    	name: plist,
		  component: plist,
    },
    {
    	path: '/singer',
    	name: 'singer',
    	component: singer
    },
    {
    	path: '/search',
    	name: 'search',
    	component: search
    },
    {
    	path: '/rank/info/:id',
    	name: 'rankInfo',
    	component: rankInfo
    },
    {
    	path: '/plist/info/:id',
    	name: 'plistInfo',
    	component: plistInfo
    },
    {
    	path: '/singer/list/:id',
    	name: 'singerList',
    	component: singerList
    },
    {
    	path: '/singer/info/:id',
    	name: 'singerInfo',
    	component: singerInfo
    },
    {
    	path: '/login',
    	name: 'login',
    	component: login
    }
  ]
})
