'use strict';

angular.module('myApp.view2', [])

.controller('View2Ctrl', ['$http', 'APP_CONFIG', '$scope', function($http, config, $scope) {
    $scope.player = {};
	$scope.player.playlistId = "123213DEPR",
	$scope.player.queue = [];
    $scope.rfid = "";

    this.init = function () {
        if (typeof (EventSource) !== "undefined") {
            var source = new EventSource(config.urlMpdWs + '/update-stream');
            source.addEventListener('rfidRead', function (e) {
                $scope.rfid = JSON.parse(event.data);
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
            source.addEventListener('error', function (e) {
                console.log("EventSource Error: " + event);
            });
        } else {
            // Sorry! No server-sent events support..
            console.log('SSE not supported by browser.');
        }
    };

	$scope.player.get = function(item) {
        var uri = config.urlMpdWs + "/player/get-" + item;
        $http.get(uri).then(function (response) {
            $scope.player[item] = response.data;
        });
    };

	$scope.player.action = function(action) {
		var uri = config.urlMpdWs + "/player/" + action;
        $http.get(uri);
	};

	$scope.player.loadPlaylist = function() {
		var uri = config.urlMpdWs + "/player/load-playlist/" + $scope.player.playlistId;
        $http.get(uri);
	};

	$scope.player.clearQueue = function() {
		var uri = config.urlMpdWs + "/player/clear-queue";
        $http.get(uri);
		$scope.player.queue = [];
		//$scope.player.get('queue');
	};


    this.init();

}]);