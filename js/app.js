//making a javascript class with backbone
console.log('Foodtrucking')
//for syntax. JS istead of ruby
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

//========FOR MAKING VIEWS ON SAME PAGE WITH #s
//========template is optional

var SomeView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
	},

	render: function(){
		var template = $('#details-template').html();
		var html = Mustache.render(
			template, 
			this.model.toJSON()
			);

		this.$el.html(html);
		return this;
	}

});

//wrap the index page into a view so can press back

var Router = Backbone.Router.extend({
	routes: {
		// "": ""
		"trucks/:id" : "showFoodTruck"
	},

	showFoodTruck: function(id) {
		var dish = new Dish({ id: id});
		dish.fetch();
		var view = new SomeView({ model: dish });
		$('.container').html(view.render().el);
	}

});


var router = new Router();
Backbone.history.start();

//.html("you clicked on " + name)
// var view = new View();
		// view.render();
		// $('div').html(view.el);


var map = new google.maps.Map(
	document.querySelector('.map'), {
		zoom: 14,
		center: { lat: -37.813155, lng: 144.964078}
	}
);

//BACKBONE MODELS METHOD FOR MAKING TRUCKS
var dishes = new Dishes();

dishes.fetch().done(function(trucks) {
	_.each(trucks, function(truck) {
		var view = new TruckItemView({model: truck});
		// view.render();
		
		//add each to list class on index page
		// $('.list').append(view.el);
		$('.list').append(view.render().el);

		//put marker on map
		var marker = new google.maps.Marker({
			position: {lat: -37.82, lng: 144.96},
			map: map,
			title: truck.name
		});
	});

var offset = 0;

	$('.load-more').on('click', function(){

		offset += 2;

		var options = {
			url: 'http://localhost:3000/api/dishes',
			dataType: 'json',
			method: 'get',
			data: {offset: offset}
		};

		$.ajax(options).done(function(trucks){
			
			_.each(trucks, function(truck){
				var view = new TruckItemView({ model: truck })
				$('.list').append(view.render().el);

			});

		});

	});
});



//AJAX METHOD

//---------------TO LOAD DATABASE from back end
// //1 - declare options to get data
// var options = {
// 	url: 'http://localhost:3000/api/dishes',
// 	dataType: 'json',
// 	method: 'get'
// }

// //2 - make a new truckitemview for each object returned from API
// $.ajax(options).done(function(trucks) {
// 	_.each(trucks, function(truck) {
// 		var view = new TruckItemView({model: truck});
// 		// view.render();
		
// 		//add each to list class on index page
// 		// $('.list').append(view.el);
// 		$('.list').append(view.render().el);

// 		//put marker on map
// 		var marker = new google.maps.Marker({
// 			position: {lat: -37.82, lng: 144.96},
// 			map: map,
// 			title: truck.name
// 		});



// 	});
// });



// var foodTrucks = ['taco shark', 'mr burger', 'banh mi boys', 'massive wieners'];


//LIKE BUTTON TEMPLATE
// var LikeButtonView = Backbone.View.extend({
// 	events: {
// 		'click .like': 'incrementLikeCounter'
// 	},
// 	render: function() {
// 		this.$el.html('<div class="like">like</div><div class="count">0</div>');
// 	},
// 	incrementLikeCounter: function(){
// 		console.log('incrementing')
// 	}
// });


//$('.trucks').append(view.el); - command

/*


LIKE BUTTON TEMPLATE
//must tell function how to render. always need
//this is an object with render as a key, renders value is a function
var LikeButtonView = Backbone.View.extend({

	events: {
		'click .like': 'incrementLikeCounter'
	},

	render: function() {
		this.$el.html('<div class="like">like</div><div class="count">0</div>');
	},

	incrementLikeCounter: function(){
		console.log('incrementing')
	}

	showFoodTruck: function(id) {
		console.log('showing the truck' + id);
		console.log(dishes)

		var trucks = new Dishes();

		trucks.fetch();

		// var dish = dishes.get(id);

		var view = new SomeView({model: truck});
		$('.container').html( view.render().el);
	}

});

});

=========================LIKES BELOW 
*/

//TO CHANGE NUMBER OF LIKES
$('.list').on ('click', '.like', function(){
	console.log('hello');
	console.log($(this).parent());
	// console.log($(this).closest('.ui-card').data('dish_id'));
	// console.log($(this).counter)

	//NOT GETTING DISH ID to change no of likes. css heart working and liked/unliked classes
	var dishId = $(this).closest('.ui-card').data('id')

	var options = {
		url: 'http://localhost:3000/api/dishes/'+ dishId +'/likes',
		method: 'post',
		dataType: 'json'
	};

	var $counter = $(this).closest('.ui-card').find('.counter');
	
	//NEW LIKE CREATED
	$.ajax(options).done(function(data){
		$counter.html(data.count)
	});

	var $heart = $(this).closest('.ui-card').find('.like');
	if ($heart.hasClass('liked')){
		$heart.removeClass('liked');
	}
	else {
		$heart.addClass('liked');
	}

});






