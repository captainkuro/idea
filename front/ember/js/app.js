(function(global) {

var Idea = Ember.Application.create(),
  $ = Ember.$;

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
  baseUrl: 'http://localhost/idea/back/laravel/public'
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

Idea.ParentController = Ember.Controller.extend({
  user: Idea.CurrentUser,

  handleResponse: function(data, success, error) {
    switch (data.status) {
      case 'Ok':
        success();
        break;
      case 'Error':
        error();
        break;
      default:
      case 'Logout':
        this.transitionToRoute('logout');
        break;
    }
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
    var route = this;
    $.get(Idea.Config.baseUrl + '/logout', function(data, status, xhr) {
      Idea.CurrentUser.reset();
      route.transitionTo('login');
    });
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

Idea.LoginController = Idea.ParentController.extend({
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

Idea.RegisterController = Idea.ParentController.extend({
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

Idea.HomeController = Idea.ParentController.extend({
  
});

global.Idea = Idea;
}(this));