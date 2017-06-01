(function (){
	'use strict';
	angular
	.module('consultArchModule')
	.controller('consultArchController', consultArchController);

	 //Inyeccion de dependencias
	consultArchController.$inject = [
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
        'addTableService',
        'filesGRService'
	];

	function consultArchController(
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
        addTableService,
        filesGRService
	){
		var vm = this;	
        vm.tableArch = [];
        vm.viewModelClient = {};

		vm.openDatePassportInt = openDatePassportInt;
		vm.openDatePassportFin = openDatePassportFin;
        vm.selectFilesGR       = selectFilesGR
		vm.modalCancel = modalCancel;

        vm.popupDatePassportInt = { /*Boolean que abre y cierra el datepicker de fecha de pasaporte */
            opened: false
        };

        vm.popupDatePassportFin = { /*Boolean que abre y cierra el datepicker de fecha de pasaporte */
            opened: false
        };

        var date1 = new Date("2017/05/15");
            var date2 = new Date("2017/05/25");
            var year1  = date1.getFullYear();
            var month1 = date1.getMonth()+1;
            var day1   = date1.getDate();
            date1 = day1 + '/' + month1 + '/' + year1;
            var year2  = date2.getFullYear();
            var month2 = date2.getMonth()+1;
            var day2   = date2.getDate();
            date2 = day2 + '/' + month2 + '/' + year2;

        /*filesGRService.getFilesGR(date1,date2).then(
                function(response){
                    if (response.success == true ) {
                        vm.tableArch = response.data.List;
                    }
                }
            );*/

        /* Invertir Cadena */

        function reverseWord(text){
            if (text.length == 1){
                return text;
            }
            return reverseWord(text.substring(1)) + text.charAt(0);
        }

        /** SERVICIO PARA CARGAR LOS DATOS DE LOS ARCHIVOS EN UN OBJETO **/

        function selectFilesGR() {
            var date1 = new Date();
            var date2 = new Date();
            var year1  = vm.viewModelClient.datePassportInt.getFullYear();
            var month1 = vm.viewModelClient.datePassportInt.getMonth()+1;
            var day1   = vm.viewModelClient.datePassportInt.getDate();
            date1 = day1 + '/' + month1 + '/' + year1;
            var year2  = vm.viewModelClient.datePassportFin.getFullYear();
            var month2 = vm.viewModelClient.datePassportFin.getMonth()+1;
            var day2   = vm.viewModelClient.datePassportFin.getDate();
            date2 = day2 + '/' + month2 + '/' + year2;

            filesGRService.getFilesGR(date1,date2).then(
                function(response){
                    if (response.success == true ) {
                        vm.tableArch = response.data.List;
                    }
                }
            );
        }

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