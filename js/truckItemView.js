//code for each truck object or "ui card"

var TruckItemView = Backbone.View.extend({

	tagName: 'div',
	className: 'ui-card',
	//this is the script from index.html.
	template: $('#truck-item-template').html(),

	events: {
		'click img': 'slide'
	},

	slide: function(){
		console.log('you clicked on ' + this.model.name);
		var $wrapper = this.$el.find('.slider-wrapper');

		if ($wrapper.css('left') === '0px'){
			$wrapper.css('left', '-100%');
		}
		else {
			$wrapper.css('left', '0px');
		}
	},

	//template function for each ui card
	render: function() {
		// //1 - get html template from index
		// var template = $('#truck-item-template').html();

		// //2 - make underscore function to ...
		// var templateFunction = _.template(template);

		// //3 - ?
		// var html = templateFunction({name: this.model.name, image_url: this.model.image_url, likes: this.model.counter});

		//CAN DEFINE TEMPLATE in beginning (Line 5) INSTEAD of above long away. using mustache.. 

		var html = Mustache.render(this.template, this.model);
		this.$el.html(html);
		return this;
	}
});