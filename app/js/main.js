(function () {

  'use strict';

  require('angular');
  require('angular-route');
  require('angular-animate');
  var mainCtrl = require('./controllers/mainctrl');
  var loginCtrl = require('./controllers/login_ctrl');
  var authSrvc = require('./services/auth_srvc');

  angular.module('SampleApp', ['ngRoute', 'ngAnimate'])

  .config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
      //$locationProvider.hashPrefix('!');
      $locationProvider.html5Mode(true);
      // routes
      $routeProvider
        .when("/", {
          templateUrl: "./partials/partial1.html",
          controller: "LoginController",
          controllerAs: "LoginController"
        })
        .otherwise({
           redirectTo: '/'
        });
    }
  ])

  .run(['$rootScope', '$window', 'AuthService', 
    function($rootScope, $window, AuthService) {
      $rootScope.user = {};
      $window.fbAsyncInit = function() {
        FB.init({ 

          /* 
          The app id of the web app;
          To register a new app visit Facebook App Dashboard
          ( https://developers.facebook.com/apps/ ) 
          */

          appId: '1540568226241773', 

          /* 
          Adding a Channel File improves the performance 
          of the javascript SDK, by addressing issues 
          with cross-domain communication in certain browsers. 
          */

          channelUrl: 'app/channel.html', 

          /* 
          Set if you want to check the authentication status
          at the start up of the app 
          */

          status: true, 

          /* 
          Enable cookies to allow the server to access 
          the session 
          */

          cookie: true, 

          /* Parse XFBML */

          xfbml: true,
          version: 'v2.5'
        });

        AuthService.watchLoginChange();

      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

    }
  ])

  //Load controller
  //.controller('MainController', ['$scope', mainCtrl]);

  .controller('LoginController', ['$scope', loginCtrl])
  .factory('AuthService', [authSrvc]);

}());
