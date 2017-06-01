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

		vm.viewModelMantResult = {};
		vm.validImpre = validImpre;
		vm.actCredCard = actCredCard;
		vm.status="I";
		vm.userName = 'AM029969';

		function validImpre() {
			window.location.href = "/wps/portal/ptd/inicio";
		}

		function actCredCard(status) {
			if (status == false ) {
				var jsonAct = {
				"idRf":"000",
				"nrTa":"451700051001838305",
				"bkId":"P",	
				"userName": vm.userName
				};

				actCardService.activateCredCard(jsonAct).then(
					function(response){
						if (condition) {
							vm.status="A";
						} else {
							vm.status="I";
						}

					}
				);

				vm.status="A";
			} else {
				alert("e");
			}
		}
 
		
	}
})();