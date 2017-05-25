(function(){
	'use strict';
	angular
		.module('app')
		.service('transactionCodeParamService',transactionCodeParamService);

	transactionCodeParamService.$inject = [
		'$http'
	];

	function transactionCodeParamService(
		$http
	)
	{
		function addProduct(){
			
		}

	}

})();