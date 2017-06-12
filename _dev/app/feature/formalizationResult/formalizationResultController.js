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
		'$rootScope',
	 	'modalFactory',
		'$timeout',
		'$interval',
        'catalogService',
		'validationCardKeyServ'
	];

	function formalizationResultController(
		sweet,
		$state,
		URL,
		addCodeService,
		messages,
		$rootScope,
		modalFactory,
		$timeout,
		$interval,
        catalogService,
		validationCardKeyServ
	){
		var vm = this;	

		vm.viewModelMantResult = {};
		vm.validImpre = validImpre;
		vm.actCredCard = actCredCard;
		vm.status="I";
		vm.userName = 'AM029969';
		vm.dataResult = $rootScope.globalUserJSon;
		console.log(vm.dataResult);
		function validImpre() {
			window.location.href = "/wps/portal/ptd/inicio";
		}

		console.log($rootScope.globalUserJSon);
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

		vm.viewModelMantResult.namePrinc = $rootScope.globalUserJSon.cardHolderName;
		vm.viewModelMantResult.numberTarje = $rootScope.globalUserJSon.creditCardNumber;
		vm.viewModelMantResult.typeTc = $rootScope.globalUserJSon.productCode;
		
		var contador = 0;
		var loading = document.getElementById("loader");
		var loadingBody = document.getElementById("loadingBody");
			loading.style.display = "block"; 
			loadingBody.style.display = "block"; 
			var promise; 
			var myVar;
			var increaseCounter = function () {
			myVar = setTimeout(showPage, 20000);
			
			function showPage() {
				loading.style.display = "block";
				loadingBody.style.display = "block"; 
				
				if (contador < 5) {
						validationCardKeyServ.getCreditReques($rootScope.globalUserJSon.id).then(function(response) {
							$timeout(function(){
									if (response.success == true) {
										vm.tariff = "TARIFF_TC";
										vm.acuse = "ACKNOWLEDGEMENT_RECEIPT";
										vm.contrato = "CONTRACT_TC";
										vm.dac = "DAC – TC";
											var request = response.data;
											if (request.tariffDocumentState === 'Y' ){
												validationCardKeyServ.gettariff(vm.tariff, JSON.parse($rootScope.globalUserJSon.json).documentNumber).then(function(response) {
													$timeout(function(){
													  if (response.success == true){
														vm.urlAccountTariff = response.data.url;
														vm.tariffValid = true;
													  }else {
														  vm.tariffValid = false;
													  }

												}, 0);
												});
											}
											if (request.dacDocumentState === 'Y' ){
												validationCardKeyServ.gettariff(vm.dac, JSON.parse($rootScope.globalUserJSon.json).documentNumber).then(function(response) {
													$timeout(function(){
													if (response.success == true){
														vm.urlAccounDac = response.data.url;
														vm.validDac = true;
													  }else {
														  vm.validDac = false;
													  }
												}, 0);
												});
											}
											if (request.contractDocumentState === 'Y' ){
												validationCardKeyServ.gettariff(vm.contrato, JSON.parse($rootScope.globalUserJSon.json).documentNumber).then(function(response) {
													$timeout(function(){
													if (response.success == true){
														vm.urlAccountContrac = response.data.url;
														vm.validContra = true;
													  }else {
														  vm.validContra = false;
													  }
												}, 0);
												});
											}
											if (request.receiptDocumentState === 'Y' ){
												validationCardKeyServ.gettariff(vm.acuse, JSON.parse($rootScope.globalUserJSon.json).documentNumber).then(function(response) {
													$timeout(function(){
													if (response.success == true){
														vm.urlAccountAcuse = response.data.url;
														vm.validacuse = true;
													  }else {
														  vm.validacuse = false;
													  }
												}, 0);
												});
											}											
											contador ++;
									} else {

									}
									
							}, 0);
							
						}, modalError);                                    
					
				}   else {
					$interval.cancel(promise);
					//modalFactory.success(messages.modals.error.printError);
					loading.style.display = "none"; 
					loadingBody.style.display = "none"; 
				}       
			}
				loading.style.display = "none"; 
				loadingBody.style.display = "none"; 
			}
			promise =  $interval(increaseCounter, 10000); 


        function modalError(error) {
            if(error.message !== '') {
                modalFactory.error(error.message);
            } else {
                modalFactory.error(messages.modals.error.errorDefault);

            }
        }

	}
})();