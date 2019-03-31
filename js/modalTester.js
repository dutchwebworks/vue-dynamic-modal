var Hub = new Vue();

Vue.component("modal", {
	name: "Modal",
	template: "#modal",
	data: function() {
		return {
			active: false,
			data: {},
			title: null
		}
	},
	mounted: function() {
		this.$nextTick(function(){
			Hub.$on("set-modal-data", this.set);
			Hub.$on("open-modal", this.open);
		}.bind(this));
	},
	destroyed: function() {
		Hub.$off("set-modal-data", this.set);
		Hub.$off("open-modal", this.open);
	},
	methods: {
		open: function() {
			this.active = true;
		},
		close: function() {
			this.active = false;
		},
		set: function(title, data, name) {
			this.title = title;
			this.data = data;
			this.component = data;
		}
	}
});

Vue.component("someExample", {
	name: "SomeExample",
	template: "#someExample",
	data: function() {
		return {
			title: "Example title",
			data: {}
		}
	}
});

Vue.component("someInfo", {
	name: "SomeInfo",
	template: "#someInfo",
	data: function() {
		return {
			title: "Some information",
			data: {}
		}
	}
});

var modalTester = new Vue({
	el: "#modalTester",
	name: "ModalTester",
	data: {
		title: "Hi from main instance"
	},
	// data: function() {
	// 	return {
	// 		title: "Hi from main instance"
	// 	}
	// },
	methods: {
		openExample: function() {
			Hub.$emit("open-modal");
			Hub.$emit("set-modal-data", this.data, "someExample");
		},
		openInfo: function() {
			Hub.$emit("open-modal");
			Hub.$emit("set-modal-data", this.data, "someInfo");
		}
	}
});