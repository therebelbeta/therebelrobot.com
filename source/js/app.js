var app = angular.module('plan', ['ngRoute','templates']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {  templateUrl: 'states/main.html', controller: 'UserCtrl'  })
  .otherwise({
    redirectTo: '/'
  });
});
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
