 (function (){
	'use strict';
	angular
	.module('transactionRoleModule')
	.controller('transactionRoleController', transactionRoleController);

	 //Inyeccion de dependencias
	transactionRoleController.$inject = [
	 	'sweet',
	 	'$state',
	 	'URL',
	 	'addCodeService',
	 	'addTableBinService',
	 	'validTransitionRuleService',
	 	'$timeout',
	 	'$filter',
        '$rootScope',
	 	'messages',
	 	'modalFactory',
        'catalogService'
	];

	function transactionRoleController(
		sweet,
		$state,
		URL,
		addCodeService,
		addTableBinService,
		validTransitionRuleService,
		$timeout,
		$filter,
        $rootScope,
		messages,
		modalFactory,
        catalogService
	){
		var vm = this;	
		vm.viewModelTransitionRole = {};
		vm.tableSourceProdcut   = [];
		vm.repeatFields = false;
		vm.editButton   = false;
		vm.idSourceIncome = 0;
        vm.optionsTransType = [];
        vm.optCurrencyCode  = [];
        vm.optProductType   = [];
        vm.optStatus        = [];
		/*FUNCIONES*/
		vm.viewJobsData = viewJobsData;
		vm.editJobsData = editJobsData;
        vm.tablaBin = tablaBin;
        vm.seachJobsData = seachJobsData;
        vm.addNewBin = addNewBin;
        vm.addJobsData = addJobsData;
vm.modalCancel = modalCancel;

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
                    
                    var reglas = false;
                    localStorage.setItem("reglas", reglas);
                    window.location.href = "/wps/portal/ptd/gruporamos/gruporamos/";
                }, 0);
            });
        }
        var modal = document.getElementById('myModal');
        
        function addNewBin() {
 
            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";

            span.onclick = function() {
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
 


        catalogService.getCatalogURL(URL.TYPE_ROLE).then(
        function (response) {
            vm.optionsTypeRole = response.data.data;
        });

        catalogService.getCatalogURL(URL.CURRENCY_CODE).then(
            function(response){
                vm.optCurrencyCode = response.data.data;
                console.log(vm.optCurrencyCode);
        });

        catalogService.getCatalogURL(URL.PRODUCT_TYPE).then(
            function(response){
                vm.optProductType = response.data.data;        
        });
        
        catalogService.getCatalogURL(URL.STATUS).then(
            function(response){
                vm.optStatus = response.data.data;
        });


		function tablaBin() {
		 validTransitionRuleService.getTableRole('', '', '').then(                
		    function (response) {
		        vm.tableSourceProdcut = '';
		        $timeout(function(){
		            if (response.success) {
		                vm.tableSourceProdcut = response.data.ruleList;
		            } else {
		                modalFactory.error(response.error.message);
		            }
		              
		            }, 0);
		        }


		    );   
		}

         tablaBin();


         function addJobsData(){ 
             vm.submitted = false;
             if(vm.formProductMantenimentNew.$valid){
                   $timeout(function () {
                    var json = {};
                    var jsonUpdate = {};

                    json = vm.viewModelTransitionNew;                    

                    jsonUpdate.description = json.description2;
                    jsonUpdate.ruleType = json.ruleType2;
                    jsonUpdate.factor = json.factor2;
                    jsonUpdate.points = json.points2;
                    jsonUpdate.currencyCode = json.currencyCode2;
                    jsonUpdate.productType = json.productType2;
                    jsonUpdate.status = json.status2;
                    jsonUpdate.userName = "AM029969";
                    
                    addTableBinService.insertRole(jsonUpdate);
                    tablaBin()
                    vm.viewModelTransitionNew = {};
                    /*Volvemos el formulario a estado inicial del touched */
                    vm.formProductMantenimentNew.$setUntouched();
                    /*Volvemos el formulario a estado inicial del setPristine,
                     para validar que el usuario no halla interactuado con el formulario*/
                    vm.formProductMantenimentNew.$setPristine();
                    /*Volvemos el boolean que valida si la fuente de ingreso se encuentra disponible para editar */
                    vm.buttonEdit = false;
                    modal.style.display = "none";
                }, 0);
             }else{
                  //Chequea que todos los campos obligatorios esten llenos sean validos.
                 vm.submitted = true;
                 vm.formNewInvalid =  true;
             }
         } 
       /*
         Funcion que agrega valida que todos los campos esten llenos y busc el producto del BIN 
        */
         function seachJobsData(){ 
                   $timeout(function () {
                    var json = {};
                    var typeRule = '';
                    var productType = '';
                    var satatus = '';
                    if (vm.viewModelTransitionRole.ruleType === undefined){
                        vm.viewModelTransitionRole.ruleType = '';
                    }else {
                    	if (vm.viewModelTransitionRole.ruleType == vm.optionsTypeRole[0].valValue) {
                    		typeRule = 'P';
                    	}
                    	if (vm.viewModelTransitionRole.ruleType == vm.optionsTypeRole[1].valValue) {
                    		typeRule = 'G';
                    	}
                    }
                    if (vm.viewModelTransitionRole.productType === undefined){
                        vm.viewModelTransitionRole.productType = '';
                    }else {
                    	if (vm.viewModelTransitionRole.productType == vm.optProductType[0].valValue) {
                    		productType = 'TC';
                    	}
                    	if (vm.viewModelTransitionRole.productType == vm.optProductType[1].valValue) {
                    		productType = 'LC';
                    	}
                    }
                    if (vm.viewModelTransitionRole.status === undefined) {
                        vm.viewModelTransitionRole.status = '';
                    }else {
                    	if (vm.viewModelTransitionRole.status == vm.optStatus[0].valValue) {
                    		satatus = 'A';
                    	}
                    	if (vm.viewModelTransitionRole.status == vm.optStatus[1].valValue) {
                    		satatus = 'I';
                    	}
                    }

                    validTransitionRuleService.getTableRole(typeRule, productType, satatus).then(
						    function (response) {
						        $timeout(function(){
						            if (response.success) {
						                vm.tableSourceProdcut = response.data.ruleList;
						            } else {
						                modalFactory.error(response.error.message);
						            }
						              
						            }, 0);
						        }
                    );
                       // vm.tableSourceProdcut = response.productLimit;
                    
                    
                    vm.viewModelTransitionRole = {};
                    /*Volvemos el formulario a estado inicial del touched */
                    vm.formProductRole.$setUntouched();
                    /*Volvemos el formulario a estado inicial del setPristine,
                     para validar que el usuario no halla interactuado con el formulario*/
                    vm.formProductRole.$setPristine();
                    /*Volvemos el boolean que valida si la fuente de ingreso se encuentra disponible para editar */
                    vm.buttonEdit = false;
                }, 0);
         }

        /**
        *
        FUNCION DE QUE VERIFICA QUE NO SE AGREGUE UN PRODUCTO REPETIDO POR CODIGO 
        DE ORIGEN O CODIGO DE TRANSACCION
        *
        */

        function repeatProduct(){
            angular.forEach(vm.tableSourceProdcut,function(value,index,key){
                if (value.originCode == vm.viewModelTransaction.originCode || value.transactionCode == vm.viewModelTransaction.transCode) {
                    vm.repeatFields=true;
                 }
            });
        }

        function viewJobsData(index) {
            vm.viewModelTransitionRole = angular.copy(vm.tableSourceProdcut[index]);
            /*habilitamos el boton de editar fuente de ingreso */
            vm.editButton = true;
            vm.idSourceIncome = index;
        }

        function editJobsData(index) {
        	$timeout(function () {
            if (vm.formProductRole.$valid) {
                    var json = {};
                    var jsonUpdate = {};
                    json = vm.viewModelTransitionRole;
                    vm.tableSourceProdcut.splice(index, 1, vm.viewModelTransitionRole);
                    jsonUpdate.description = json.description;
                    jsonUpdate.ruleType = json.ruleType;
                    jsonUpdate.factor = json.factor;
                    jsonUpdate.points = json.points;
                    jsonUpdate.currencyCode = json.currencyCode;
                    jsonUpdate.productType = json.productType;
                    jsonUpdate.status = json.status;
                    jsonUpdate.userName = "AM029969";

                    addCodeService.updateRole(jsonUpdate);
                    vm.viewModelTransitionRole = {};
                    /*Volvemos el formulario a estado inicial del touched */
                    vm.formProductRole.$setUntouched();
                    /*Volvemos el formulario a estado inicial del setPristine,
                     para validar que el usuario no halla interactuado con el formulario*/
                    vm.formProductRole.$setPristine();
                    /*Volvemos el boolean que valida si la fuente de ingreso se encuentra disponible para editar */
                    vm.editButton = false;
                    vm.submitted = false;
                
            } else {
                //Chequea que todos los campos obligatorios esten llenos sean validos.
                vm.submitted = true;
                modalFieldsRequired();
            }
            }, 0);
        }

                /*Funcion para abrir el modal de campos obligatorios*/
        function modalFieldsRequired () {
            modalFactory.warning(messages.modals.error.completeRequiredFields);
        }

	}
})();