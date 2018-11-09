import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Paper from './views/Paper.vue'
import List from './views/List.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/createPaper',
      name: 'paper',
      component: Paper,
      redirect: {
        name: 'cover'
      },
	    children: [
		    {
		    	path: '/cover',
			    name: 'cover',
			    component: () => import('./components/cover.vue')
		    },
		    {
			    path: '/catalogue',
			    name: 'catalogue',
			    component: () => import('./components/catalogue.vue')
		    },
		    {
			    path: '/titles/:pageId',
			    name: 'titles',
			    component: () => import('./components/titles.vue')
		    },
		    {
			    path: '/end',
			    name: 'end',
			    component: () => import('./components/end.vue')
		    },
		    {
		    	path: '/preview',
			    name: 'preview',
			    component: ()=> import('./views/preview.vue')
		    }
	    ]
    },
    {
      path: '/list',
      name: 'list',
      component: List
    }
  ]
})
