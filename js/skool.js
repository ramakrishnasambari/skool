var skool = angular.module("skool", []);

skool.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
}])

skool.config(['$qProvider', function($qProvider) {
	$qProvider.errorOnUnhandledRejections(false);
}]);

skool.controller("basectrl", ["$scope", "$http", "$location", "$rootScope", function($scope, $http, $location, $rootScope) {

	$scope.welcome = "Welcome to school";
	
	//GET Server Call
	var getServerCall = function(url, callback) {
		$http.get(url, { withCredentials: false, headers: $rootScope.header }).then(function(response) {
			callback && callback(response.data);
		});
	}

	//POST Server Call
	var postServerCall = function(inputdata, url, callback) {
		$http.post(url, inputdata).then(function(response) {
			callback && callback(response.data);
		});
	}
	
	var localUrl = $location.absUrl()
	var param = localUrl.split("?")[1];
	if (param != undefined && param.includes("scan=")) {
		$scope.studentcard = true;
	}
	
	$scope.selectedMenu = "menu-home";
	$scope.selectMenu = function(menu){
		$(".menu").removeClass("active-menu");
		$("."+menu).addClass("active-menu");
		$scope.selectedMenu = menu;
	}

}]);
