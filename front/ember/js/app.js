Idea = Ember.Application.create();

Idea.Router.map(function() {
  // put your routes here
  this.route('login');
  this.route('home');
  this.route('logout');
});

Idea.IndexRoute = Ember.Route.extend({
  redirect: function(router) {
    if (Idea.currentUser.isLoggedIn) {
      this.transitionTo('home');
    } else {
      this.transitionTo('login');
    }
  }
});

Idea.User = Ember.Object.extend({
  username: '',
  password: '',
  name: '',

  isLoggedIn: false
});

Idea.currentUser = Idea.User.create();

Idea.LoginRoute = Ember.Route.extend({
  user: Idea.currentUser,

  enter: function() {
    this.user.set('isLoggedIn', true);
  }
});

Idea.HomeRoute = Ember.Route.extend({
  user: Idea.currentUser
});

Idea.LogoutRoute = Ember.Route.extend({
  enter: function() {
    Idea.currentUser.set('isLoggedIn', false);
    this.transitionTo('login');
  }
});