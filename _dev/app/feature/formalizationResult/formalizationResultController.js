 (function (){
	'use strict';
	angular
	.module('formalizationResultModule')
	.controller('formalizationResultController', formalizationResultController);

	 //Inyeccion de dependencias
	formalizationResultController.$inject = [
	 	'sweet',
	 	'$state',
	 	'URL',
	 	'addCodeService',
	 	'messages',
	 	'modalFactory',
        'catalogService'
	];

	function formalizationResultController(
		sweet,
		$state,
		URL,
		addCodeService,
		messages,
		modalFactory,
        catalogService
	){
		var vm = this;	

		vm.validImpre = validImpre;

		function validImpre() {
			window.location.href = "/wps/portal/ptd/inicio";
		}
 
		
	}
})();