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
		toggle: function() {
			this.active = !this.active;
		},
		set: function(title, data, name) {
			this.title = "Test";
			this.data = data;
			this.component = data;
		}
	}
});

Vue.component("someExample", {
	name: "SomeExample",
	template: "#someExample"
});

var modalTester = new Vue({
	el: "#modalTester",
	name: "ModalTester",
	data: function() {
		return {
			title: "Hi from component"
		}
	},
	methods: {
		open: function() {
			Hub.$emit("open-modal");
			Hub.$emit("set-modal-data", this.data, "someExample");
		}
	}
});