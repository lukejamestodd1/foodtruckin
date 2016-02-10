var HomeView = Backbone.View.extend({
	render: function(){
		this.$el.html('at home');
	}

});


var Router = Backbone.Router.extend({

	routes: {
		// "": "home" - alternate syntax
		"home": "home",
		"about": "about"
	},

	home: function(){
		console.log('home');
		$('div').html('at home');
		var view = new HomeView();
		view.render();
		$('div').html(view.el);
	},

	about: function(){
		console.log('about');
		$('div').html('about me');
	}

});

var router = new Router();
Backbone.history.start();