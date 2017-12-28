'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp').
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        
        // use the HTML5 History API
        //$locationProvider.html5Mode({ enabled: true, requireBase: false });
        
        $routeProvider
            .when('/recorder', {
                templateUrl: 'views/recorder/recorder.html',
                controller: 'RecorderCtrl as ctrl'
                })
            .when('/player', {
                templateUrl: 'views/player/player.html',
                controller: 'PlayerCtrl'
                })
        //    .when('/', {
        //    templateUrl : 'partials/home.html',
        //    controller : mainController
        //})
            .otherwise({ redirectTo: '/recorder' });
    }])
.constant('APP_CONFIG', {
    urlMpdWs: '', 
    dbName: 'ascrum' 
    
});
