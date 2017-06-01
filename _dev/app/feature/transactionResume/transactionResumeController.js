(function (){
	'use strict';
	angular
	.module('transactionResModule')
	.controller('transactionResumeController', transactionResumeController);

	 //Inyeccion de dependencias
	transactionResumeController.$inject = [
	 'sweet',
	 	'$state',
	 	'URL',
	 	'addCodeService',
	 	'messages',
	 	'modalFactory',
        'catalogService'
	];

	function transactionResumeController(
		sweet,
		$state,
		URL,
		addCodeService,
		messages,
		modalFactory,
        catalogService
	){
		var vm = this;	
	}
})();