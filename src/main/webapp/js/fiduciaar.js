var fiduciaar = angular.module("fiduciaar", []);

fiduciaar.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
}])

fiduciaar.config(['$qProvider', function($qProvider) {
	$qProvider.errorOnUnhandledRejections(false);
}]);

fiduciaar.controller("arctrlr", ["$scope", "$http", "$location", "$rootScope", function($scope, $http, $location, $rootScope) {

	$scope.welcome = "Welcome to Fiducia AR";
	var localUrl = $location.absUrl();
	var param = localUrl.split("?")[1];

	var siteURL = "https://devapi.fiduciaai.com/ce";
	var apiURL = "https://devapi.fiduciaai.com";

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

	var customerkey = getCookie("arkey");
	var request = { "customerkey": Number(atob(customerkey)) };
	postServerCall(request, apiURL + "/cebackendapi/getARConfig", function(response) {
		console.log(response);
		if (response.status) {
			$scope.iconList = response.model;
		} else {
			alert("Invalid QR Code!!");
		}
	})
	
	function getCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	/*if(param != undefined && param.includes("arkey")){
		var arkeyvalue = param.split("arkey")[1];
		var arkey = arkeyvalues.substring(1, arkeyvalue.length);
		var arvalues = arkey.split("#");
		var customerkey = atob(arvalues[0]);
		var brandid = atob(arvalues[1]);
		var batchid = atob(arvalues[2]);
		var request = { "customerkey": Number(customerkey) };
		postServerCall(request, apiURL + "/cebackendapi/getARConfig", function(response) {
			console.log(response);
			if (response.status) {
				$scope.iconList = response.model;
			}else{
				alert("Invalid QR Code!!");
			}
		})
	}*/

	$scope.openLink = function(link) {
		window.open(link, '_blank').focus();
	}

}]);