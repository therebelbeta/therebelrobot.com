var model = {
	initvue: function() {
		model.vue = new Vue({
			el: '#v-app',
			data: {
				modalOpen: false,
				modalType: false
			},
			methods: {
				openModal: function(which) {
					model.vue.modalOpen = true;
					model.vue.modalType = which;
				},
				openWindow: function(which) {
					var url;
					switch (which) {
						case 'grow':
							url = "http://grow.com";
							break;
						case 'maraca':
							url = "http://therebelrobot.github.com/maraca";
							break;
						case 'constella':
							url = "http://github.com/therebelrobot/octostar";
							break;
						case 'moki':
							url = "http://moki.com/";
							break;
						case 'trr':
							url = "http://github.com/therebelrobot/trr-mar14";
							break;
						case 'pnn':
							url = "http://provo-nodejs-ninjas.github.io/";
							break;
					}
					window.open(url);
				}
			}
		})
	}
}

$(document).ready(function() {
	model.initvue();
});