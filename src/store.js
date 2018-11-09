import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		  dataCover: {
		    title: '主标题',
        count: '00',
        content: '',
        bg: ''
      },
	    dataLog: '',
	    pages: [],
	  	dataEnd: '',
      title: '主标题',

  },
  mutations: {
		saveCover(state, data){
			state.dataCover = data;
		},
	  saveLogue(state, data){
		  state.dataLog = data;
	  },
    savePage(state, data){
		  state.pages[data.id] = data.page;
	  },
	  saveEnd(state, data){
		  state.dataEnd = data;
	  },
    saveTitle(state, data){
      state.title = data;
    }

  },
  actions: {
  	saveCover(context, data){
		context.commit('saveCover', data)
    },
	saveLogue(context, data){
		context.commit('saveLogue', data)
	},
	  savePage(context, data){
		  context.commit('savePage', data)
	  },
	  saveEnd(context, data){
		  context.commit('saveEnd', data)
	  },
    saveTitle(context, data){
      context.commit('saveTitle', data)
    }
  }
})
