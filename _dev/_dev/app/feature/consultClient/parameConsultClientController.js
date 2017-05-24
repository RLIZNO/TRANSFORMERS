(function (){
	'use strict';
	angular
	.module('parameConsultClientModule')
	.controller('parameConsultClientController', parameConsultClientController);

	 //Inyeccion de dependencias
	parameConsultClientController.$inject = [
        'sweet',
        '$state',
        'validationClientService',
        '$rootScope',
        'SELECT_DEFAULT', 
        '$filter',
        '$timeout',        
        'ngXml2json',
        'modalFactory',
        'utilFactory',
        'URL', 
        'creditBureauService',
        'creditListService',
        'catalogService',
        'CATALOG',
        'YES_NO',
        'saveIdentificationService',
        'messages',
        'addTableService'
	];

	function parameConsultClientController(
        sweet,
        $state,
        validationClientService,
        $rootScope,
        SELECT_DEFAULT,  
        $filter,
        $timeout, 
        ngXml2json, 
        modalFactory,
        utilFactory,
        URL,    
        creditBureauService,
        creditListService,
        catalogService,
        CATALOG,
        YES_NO,
        saveIdentificationService,
        messages,
            addTableService
	){
		var vm = this;	
        vm.viewModelClient = {};

		vm.openDatePassportInt  = openDatePassportInt;
		vm.openDatePassportFin = openDatePassportFin;
		vm.modalCancel = modalCancel;

        vm.popupDatePassportInt = { /*Boolean que abre y cierra el datepicker de fecha de pasaporte */
            opened: false
        };

        vm.popupDatePassportFin = { /*Boolean que abre y cierra el datepicker de fecha de pasaporte */
            opened: false
        };
        function openDatePassportInt() {
            vm.popupDatePassportInt.opened = true;
        }

        function openDatePassportFin() {
            vm.popupDatePassportFin.opened = true;
        }

        /**
         *  @ngdoc method
         *  @name modalCancel
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que abre el modal para cancelar la operación en proceso y te redirecciona al home
         */
        function modalCancel() {
            sweet.show({
                title: messages.modals.warning.modaltitleWarning,
                text: messages.modals.warning.modalCancelprocessGR,
                type: messages.modals.warning.modalTypeWarning,
                showCancelButton: true,
                cancelButtonText: messages.modals.warning.modalCancelButton,
                confirmButtonColor: messages.modals.warning.modalColorButton,
                confirmButtonText: messages.modals.warning.modalConfirText,
                closeOnConfirm: true
            }, function () {
                $timeout(function () {
                    if(angular.isDefined($rootScope.customerDataCredit) && angular.isDefined($rootScope.customerDataCredit.numberIdentification)){
                        deleteCustomerService.deleteCustomer($rootScope.customerDataCredit.numberIdentification);
                    }
                    var consultClient = false;
                    localStorage.setItem("consultClient", consultClient);
                    window.location.href = "/wps/portal/ptd/gruporamos/gruporamos/";
                }, 0);
            });
        }
	}
})();