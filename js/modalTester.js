var Hub = new Vue();

Vue.component("modal", {
	name: "Modal",
	template: "#modal",
	data: function() {
		return {
			active: false,
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
		open: function(payload) {
			this.active = true;
			this.title = payload.title;
			this.component = payload.componentName;
		},
		close: function() {
			this.active = false;
		}
	}
});

Vue.component("brochureModalContent", {
	name: "Brochure",
	template: "#brochureModalContent",
	data: function() {
		return {
			title: "Example"
		}
	}
});

Vue.component("informationModalContent", {
	name: "Information",
	template: "#informationModalContent",
	data: function() {
		return {
			title: "Information",
			awake: false
		}
	},
	methods: {
		toggleAwake: function() {
			this.awake = !this.awake;
		}
	}
});

var modalTester = new Vue({
	el: "#modalTester",
	name: "ModalTester",
	methods: {
		openBrochureModal: function() {
			Hub.$emit("open-modal", {
				componentName: "brochureModalContent",			
				title: "Whould you like to receive our brochure?"
			});
		},
		openInformationModal: function() {
			Hub.$emit("open-modal", {
				componentName: "informationModalContent",
				title: "This information is classified!"
			});
		}
	}
});