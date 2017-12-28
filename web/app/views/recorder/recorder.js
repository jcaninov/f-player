'use strict';

angular.module('myApp.recorder',[])

.controller('RecorderCtrl', ['$http', 'APP_CONFIG', '$scope', function($http, config, $scope) {
    $scope.datos = [],
	$scope.playlist = [],
	$scope.grid = {},
	$scope.grid.selectAll = false,
	$scope.rfid = "",
	$scope.tags = [],
    $scope.tagValue = "",
    $scope.tag = 'artist',
	$scope.player = {};
        
    this.init = function() {
        if (typeof (EventSource) !== "undefined") {
            var source = new EventSource(config.urlMpdWs + '/update-stream');
            source.addEventListener('message', function (e) {
                $scope.datos = JSON.parse(e.data);
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
            source.addEventListener('error', function (e) {
                console.log("EventSource Error: " + e);
            });
        } else {
            // Sorry! No server-sent events support..
            console.log('SSE not supported by browser.');
        }
        this.getItem('tags');
		this.getItem('rfid');
		addEvents();
    };

	this.getItem = function(item) {
        var uri = config.urlMpdWs + "/get-" + item;
        $http.get(uri).then(function (response) {
            $scope[item] = response.data;
        });
    };
	$scope.player.get = this.getItem;
        
    $scope.search = function() {
        var uri = config.urlMpdWs + "/search/" + $scope.tag + "/" + $scope.tagValue;
        $http.get(uri).then(function (response) {
        });
    };

    $scope.savePlaylistToCard = function(){
		if ($scope.datos.length <= 0 || $scope.rfid == "") return;
        var postData = {
			id: $scope.rfid,
			items: getDataToSave($scope.datos)
			};
		var uri = config.urlMpdWs + "/save-playlist";
        $http.post(uri, postData).then(function (response) {
        });
    };

    $scope.emptyPlaylist = function(){
		$scope.playlist = [];
    };

    $scope.addSelectedItemsToPlaylist = function(){
		$scope.playlist = getDataToSave($scope.datos);
	};
        

    $scope.onKeyEnter = function(e){
        if (e.charCode == 13) {
            this.search();   
        }
    };

	$scope.onSelectAll = function(state) {
		$scope.datos.forEach(function (item) {
			item.selected = state;
		});
	};

	$scope.deleteFomPlaylist = function(id) {
		console.log(id);
	};
		
	var getDataToSave = function(datos) {
		var response = [];
		datos.forEach(function (item) {
			if (item.selected) {
				response.push(item);
			}
		});
		return response;
	};

	var addEvents = function() {
		//http://api.jqueryui.com/sortable/
	    $("#tablePlaylist tbody")
			.sortable({
			    helper: fixHelper, 
				update: onTableUpdate
		    })
			//.on( "sortupdate", function( event, ui ) {} );  
	};

	var onTableUpdate= function( event, ui ) {
		console.log(ui);
	};

	var fixHelper = function(e, ui) {  
	  ui.children().each(function() {  
		$(this).width($(this).width());  
	  });  
	  return ui;  
	};

    this.init();

}]);