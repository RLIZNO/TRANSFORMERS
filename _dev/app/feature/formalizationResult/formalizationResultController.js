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
		'actCardService',
		'validationCardKeyServ',
		'addTableService',
		'sendEmaildService'
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
		actCardService,
		validationCardKeyServ,
		addTableService,
		sendEmaildService
	){
		var vm = this;	

		vm.viewModelMantResult = {};
		vm.validImpre = validImpre;
		vm.actCredCard = actCredCard;
		vm.validCard = validCard;
		vm.validateKeyCard = validateKeyCard;
		vm.status="I";
		vm.userName = $rootScope.dataUser.userName;
		vm.positionCard="";
		vm.desBtn = false;
		vm.noTCAdicional = "";
		vm.dataResult = $rootScope.globalUserJSon;
        $rootScope.globalUserJSon = [];
         var JSONCF = [];
         var JSONINT = {};

        var cierreForzosoIdCA = localStorage.getItem('cierreForzosoIdCA');

        addTableService.getcierreForzosoTC(cierreForzosoIdCA).then(      
                function(response){
                    $rootScope.globalUserJSon = response.data;
                    JSONCF = JSON.parse($rootScope.globalUserJSon.json);
						vm.namePrinc = JSONCF.cardHolderName;
						vm.numberTarje = JSONCF.creditCardNumber;
						vm.typeTc = JSONCF.productCode;
						vm.nameAdicional = JSONCF.cardHolderNameAdi;
						vm.noTCAdicional = JSONCF.creditCardNumberAditional;
                }
        );

		function validImpre() {
			window.location.href = "/wps/portal/ptd/inicio";
		}

		function validCard(){
            //resetData();
            validationCardKeyServ.getPositionKeyCard(JSONCF.documentNumber).then(
                function(response){
                    vm.positionCard = response.data.positionId;
                }
            );
            
            //window.location.href = "#/result";
            var modal = document.getElementById('myModal');
            var btnClose = document.getElementById('formPrint');
            var loading = document.getElementById("loader");
            
            var span = document.getElementsByClassName("close")[0];

            modal.style.display = "block";

            span.onclick = function() {
                modal.style.display = "none";
                vm.submitted = false;
                vm.formNewInvalid =  false;
            }

            btnClose.onclick = function() {
                modal.style.display = "none";
                vm.submitted = false;
                vm.formNewInvalid =  false;
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    vm.submitted = false;
                    vm.formNewInvalid =  false;
                }
            }
        }

		function validateKeyCard(){
            var jsonValKeyCard = {
                "documentNumber": JSONCF.documentNumber,
                "positionId": vm.positionCard, 
                "positionValue": vm.viewModelMantResult.positionValueInput
            };

            validationCardKeyServ.validationCardKey(jsonValKeyCard).then(
                function(response){
                    var count = 0;
                    if (response.success == true && count < 3) {
                            sweet.show({
                            title: 'Exito',
                            text: messages.modals.success.codeCorrect,
                            type: 'success',
							confirmButtonColor: messages.modals.warning.modalColorButton,
							confirmButtonText: "Ok",
                            closeOnConfirm: true
                        }, function () {
                            $timeout(function () {
                                var modal = document.getElementById('myModal');
                                modal.style.display = "none";
                                actCredCard();  
                            }, 0);
                        });     
                    } else {
                        modalFactory.error(messages.modals.error.codeIncorrect);
                        count++;
                    }
                }
            );
        }

		function actCredCard() {

			if(vm.noTCAdicional === undefined){
				vm.noTCAdicional = "";
			}
				var jsonAct = {
				"cardNumber":JSONCF.creditCardNumber,
				"additionalCardNumber": vm.noTCAdicional,
				"userName": vm.userName
				};


				actCardService.activateCredCard(jsonAct).then(
					function(response){
						if (response.success == true || response.error.message == "Tarjeta ya tiene bloqueo provisional") {
							vm.status="A";
							vm.desBtn = true;
						} else {
							vm.status="I";
							vm.desBtn = false;
						}

					}
				);
		}


		
		function getDocumentContrac() {
			var contador = 0;
			var loading = document.getElementById("loader");
			var loadingBody = document.getElementById("loadingBody");
				loading.style.display = "block"; 
				loadingBody.style.display = "block"; 
				var promise; 
				var myVar;
				var increaseCounter = function () {
				myVar = setTimeout(showPage, 10000);
				
				function showPage() {
					
					if (contador < 30) {
							validationCardKeyServ.getCreditReques($rootScope.globalUserJSon.id).then(function(response) {
								$timeout(function(){
										if (response.success == true) {
											vm.tariff = "TARIFF_TC";
											vm.acuse = "ACKNOWLEDGEMENT_RECEIPT";
											vm.contrato = "CONTRACT_TC";
											vm.dac = "DAC – TC";
												var request = response.data;
												if (request.tariffDocumentState === 'Y' ){
													validationCardKeyServ.gettariff(vm.tariff, JSONCF.documentNumber).then(function(response) {
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
													validationCardKeyServ.gettariff(vm.dac, JSONCF.documentNumber).then(function(response) {
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
													validationCardKeyServ.gettariff(vm.contrato, JSONCF.documentNumber).then(function(response) {
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
													validationCardKeyServ.gettariff(vm.acuse, JSONCF.documentNumber).then(function(response) {
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
												if(vm.validacuse & vm.validContra & vm.tariffValid){
													contador = 31;
													sendEmaildService.sendDocsEmail(JSONCF.documentNumber,JSONCF.email,JSONCF.cardHolderName,JSONCF.productCode,JSONCF.dopLimit,JSONCF.usdLimit);
												}											
												contador ++;
										} else {
											contador = 31;
										}
										
								}, 0);
								
							}, modalError);                                    
						
					}   else {
						$interval.cancel(promise);
						contador = 31;
						//modalFactory.success(messages.modals.error.printError);
						loading.style.display = "none"; 
						loadingBody.style.display = "none"; 
					}       
				}
					loading.style.display = "none"; 
					loadingBody.style.display = "none"; 
				}
				promise =  $interval(increaseCounter, 10000); 
		}

		getDocumentContrac();



        function modalError(error) {
            if(error.message !== '') {
                modalFactory.error(error.message);
            } else {
                modalFactory.error(messages.modals.error.errorDefault);

            }
        }

	}
})();