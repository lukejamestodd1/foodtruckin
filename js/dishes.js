//--------container FOR backbone models
var Dishes = Backbone.Collection.extend({
	model: Dish,
	url: 'http://localhost:3000/api/dishes'
});