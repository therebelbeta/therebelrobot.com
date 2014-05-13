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
		  	},
		  	openWindow: function(which){
		  		var url;
		  		switch (which){
		  			case 'ngless':
		  				url = "http://github.com/therebelrobot/generator-ngless";
		  				break;
		  			case 'maraca':
		  				url = "http://therebelrobot.github.com/maraca";
		  				break;
		  			case 'octostar':
		  				url = "http://github.com/therebelrobot/octostar";
		  				break;
		  			case 'peel':
		  				url = "http://github.com/therebelrobot/peel";
		  				break;
		  			case 'trr':
		  				url = "http://github.com/therebelrobot/trr-mar14";
		  				break;
		  		}
		  		window.open(url);
		  	}
		  }
		})
	}
}

$(document).ready(function(){
	model.initvue();
});