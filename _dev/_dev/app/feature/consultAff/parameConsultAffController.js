(function (){
	'use strict';
	angular
	.module('parameConsultAffModule')
	.controller('parameConsultAffController', parameConsultAffController);

	 //Inyeccion de dependencias
	parameConsultAffController.$inject = [
	 	'sweet',
	 	'$state',
	 	'URL',
        'validTransactionAffiliate',
        'addTableAffliateService',
        '$timeout',
	 	'addCodeService',
	 	'messages',
        '$rootScope',
	 	'modalFactory',
        'catalogService'
	];

	function parameConsultAffController(
		sweet,
		$state,
		URL,
        validTransactionAffiliate,
        addTableAffliateService,
        $timeout,
		addCodeService,
		messages,
        $rootScope,
		modalFactory,
        catalogService
	){
		var vm = this;	
        vm.viewModelTransitionAffiliate = {};
        vm.tableSourceProdcut   = [];



        vm.seachJobsData = seachJobsData;
        vm.modalCancel = modalCancel;

         function tablaBin() {

            var codeOrigin = '';
            validTransactionAffiliate.getConsultAffiliate(codeOrigin).then(                
                function (response) {
                    $timeout(function(){
                        vm.tableSourceProdcut = response.commercesAffiliateReport;
                        console.log(vm.tableSourceProdcut); 
                        }, 0);
                    }


                );   
         }

         tablaBin();

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
                    var consultAff = false;
                    localStorage.setItem("consultAff", consultAff);
                    window.location.href = "/wps/portal/ptd/gruporamos/gruporamos/";
                }, 0);
            });
        }
        /*
         Funcion que agrega valida que todos los campos esten llenos y busc el producto del BIN 
        */
         function seachJobsData(){ 
             vm.submitted = false;
             if(vm.formProductMantenimentAffiliate.$valid){
                   $timeout(function () {
                    var json = {};
                    if (vm.viewModelTransitionAffiliate.description === undefined){
                        vm.viewModelTransitionAffiliate.description = '';
                    }

                    validTransactionAffiliate.getSearchConsultAff(vm.viewModelTransitionAffiliate.description).then(
                    function (response) {
                            vm.tableSourceProdcut = response;                          
                        }
                    );
                       // vm.tableSourceProdcut = response.productLimit;
                    
                    
                    vm.viewModelTransitionAffiliate = {};
                    /*Volvemos el formulario a estado inicial del touched */
                    vm.formProductMantenimentAffiliate.$setUntouched();
                    /*Volvemos el formulario a estado inicial del setPristine,
                     para validar que el usuario no halla interactuado con el formulario*/
                    vm.formProductMantenimentAffiliate.$setPristine();
                }, 0);
             }else{
                  //Chequea que todos los campos obligatorios esten llenos sean validos.
                 vm.submitted = true;
                 modalFieldsRequired();
             }
         }


	}
})();