(function(global) {

Idea = Ember.Application.create();

// ROUTING
Idea.Router.map(function() {
  // put your routes here
  this.route('login');
  this.route('register');
  this.route('home');
  this.route('logout');
});

// GLOBAL VARIABLES
Idea.Config = Ember.Object.create({
  baseUrl: 'http://localhost/idea/back/laravel'
});

Idea.CurrentUser = Ember.Object.create({
  username: '',
  password: '',
  name: '',

  isLoggedIn: false,

  reset: function() {
    this.set('username', '');
    this.set('password', '');
    this.set('name', '');
    this.set('isLoggedIn', false);
  }
});

// VIEWS
Idea.HeaderPublicView = Ember.View.extend({templateName: 'header-public'});
Idea.HeaderHomeView = Ember.View.extend({templateName: 'header-home'});
Idea.AlertView = Ember.View.extend({templateName: 'alert'});

// Route: Index
Idea.IndexRoute = Ember.Route.extend({
  redirect: function(model) {
    if (Idea.CurrentUser.isLoggedIn) {
      this.transitionTo('home');
    } else {
      this.transitionTo('login');
    }
  }
});

// Route: Logout
Idea.LogoutRoute = Ember.Route.extend({
  redirect: function(model) {
    $.get(Idea.Config.baseUrl + '/logout', function(data, status, xhr) {

    });
    Idea.CurrentUser.reset();
    this.transitionTo('login');
  }
});

// Page: Login
Idea.LoginRoute = Ember.Route.extend({
  redirect: function(model) {
    if (Idea.CurrentUser.isLoggedIn) {
      this.transitionTo('home');
    }
  }
});

Idea.LoginController = Ember.Controller.extend({
  user: Idea.CurrentUser,
  init: function(){console.log('init');},
  doLogin: function() {
    // debug
    this.user.set('isLoggedIn', true);
    this.transitionToRoute('home');

    $.post(Idea.Config.baseUrl + '/login', {
      username: this.user.get('username'),
      password: this.user.get('password')
    }, function(data, status, xhr) {

    });
  }
});

// Page: Register
Idea.RegisterRoute = Ember.Route.extend({
  redirect: function(model) {
    if (Idea.CurrentUser.isLoggedIn) {
      this.transitionTo('home');
    }
  }
});

Idea.RegisterController = Ember.Controller.extend({
  user: Idea.CurrentUser,

  doRegister: function() {
    $.post(Idea.Config.baseUrl + '/register', {
      username: this.user.get('username'),
      password: this.user.get('password'),
      name: this.user.get('name')
    }, function(data, status, xhr) {

    });
  }
});

// Page: Home
Idea.HomeRoute = Ember.Route.extend({
  redirect: function(model) {
    if (!Idea.CurrentUser.isLoggedIn) {
      this.transitionTo('login');
    }
  }
});

Idea.HomeController = Ember.Controller.extend({
  user: Idea.CurrentUser,
});

global.Idea = Idea;
}(this));