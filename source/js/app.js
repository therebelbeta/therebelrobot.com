var model = {
	initvue: function(){
		model.vue = new Vue({
		  el: '#v-app',
		  data: {
		    modalOpen:false,
		    modalType:false
		  }
		})
	}
}

$(document).ready(function(){
	model.initvue();
});