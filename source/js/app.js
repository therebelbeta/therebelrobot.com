var model = {
	initvue: function(){
		model.vue = new Vue({
		  el: '#v-app',
		  data: {
		    modalOpen:false,
		    modalType:false
		  },
		  methods:{
		  	openModal: function(which){
		  		model.vue.modalOpen = true;
		  		model.vue.modalType = which;
		  	}
		  }
		})
	}
}

$(document).ready(function(){
	model.initvue();
});