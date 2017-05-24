(function (){
	'use strict';
	angular
	.module('transactionModule')
	.controller('transactionController', transactionController);

	 //Inyeccion de dependencias
	transactionController.$inject = [
	 	'sweet',
	 	'$state',
	 	'URL',
    '$rootScope',
	 	'addCodeService',
    '$timeout',
	 	'messages',
	 	'modalFactory',
        'catalogService'
	];

	function transactionController(
		sweet,
		$state,
		URL,
    $rootScope,
		addCodeService,
    $timeout,
		messages,
		modalFactory,
        catalogService
	){
		var vm = this;	
		vm.viewModelTransaction = {};
		vm.tableSourceProdcut   = [];
		vm.repeatFields = false;
		vm.editButton   = false;
		vm.idSourceIncome = 0;
        vm.optionsTransType = [];
        vm.optCurrencyCode  = [];
        vm.optProductType   = [];
        vm.optStatus        = [];
		/*FUNCIONES*/
		vm.addProduct   = addProduct;
		vm.viewJobsData = viewJobsData;
		vm.editJobsData = editJobsData;
    vm.statusButton = statusButton;
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
                    
                    var transacion = false; 
                    localStorage.setItem("transacion", transacion);
                    window.location.href = "/wps/portal/ptd/gruporamos/gruporamos/";
                }, 0);
            });
        }

 
		addCodeService.allTable().then(
        function (response) {
            vm.tableSourceProdcut = response.data.transList;
        });


        catalogService.getCatalogURL(URL.TRANSACTION_TYPE).then(
        function (response) {
            vm.optionsTransType = response.data.data;
        });

        catalogService.getCatalogURL(URL.CURRENCY_CODE).then(
            function(response){
                vm.optCurrencyCode = response.data.data;
        });

        catalogService.getCatalogURL(URL.PRODUCT_TYPE).then(
            function(response){
                vm.optProductType = response.data.data;        
        });
        
        catalogService.getCatalogURL(URL.STATUS).then(
            function(response){
                vm.optStatus = response.data.data;
        });

        function addProduct(){ 
            vm.submitted = false;
            if(vm.formTransactionCode.$valid){ 
                   var json = {};
                   vm.viewModelTransaction.userCreated = 'cavs';
                   json = vm.viewModelTransaction;
                   repeatProduct();
                   // si no hay campos repetidos ejecuta la funcion
                   if (vm.repeatFields) {
                       modalFactory.warning(messages.modals.error.modalRepeatFields);
                       vm.repeatFields = false;
                   } else {
                       addCodeService.addManteniment(json);                
                       vm.viewModelTransaction = {};
                       /*Volvemos el formulario a estado inicial del touched */
                       vm.formTransactionCode.$setUntouched();
                       /*Volvemos el formulario a estado inicial del setPristine,
                        para validar que el usuario no halla interactuado con el formulario*/
                       vm.formTransactionCode.$setPristine();
                       /*Volvemos el boolean que valida si la fuente de ingreso se encuentra disponible para editar */
                       //vm.buttonEdit = false; 
                       modalFactory.success(messages.modals.success.productSuccess);
                   }   
           }else{
                 //Chequea que todos los campos obligatorios esten llenos sean validos.
                vm.submitted = true;
                modalFieldsRequired();
           }
           setTimeout(function updateTable(){
               addCodeService.allTable().then(
                   function (response) {
                       vm.tableSourceProdcut = response.data.transList;
                   });
           },1000);
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
            vm.viewModelTransaction = angular.copy(vm.tableSourceProdcut[index]);
            /*habilitamos el boton de editar fuente de ingreso */
            vm.editButton = true;
            vm.idSourceIncome = index;
        }

        function editJobsData(index) {
            if (vm.formTransactionCode.$valid) {
                    var json = {};
                    var jsonUpdate = {};
                    json = vm.viewModelTransaction;
                    vm.tableSourceProdcut.splice(index, 1, vm.viewModelTransaction);
                    jsonUpdate.originCode = json.originCode;
                    jsonUpdate.transactionCode = json.transactionCode;
                    jsonUpdate.description = json.description;
                    jsonUpdate.transactionType = json.transactionType;
                    jsonUpdate.currencyCode = json.currencyCode;
                    jsonUpdate.productType = json.productType;
                    jsonUpdate.status = json.status;
                    jsonUpdate.userCreated = "cavs";

                    addCodeService.updateManteniment(jsonUpdate);
                    vm.viewModelTransaction = {};
                    /*Volvemos el formulario a estado inicial del touched */
                    vm.formTransactionCode.$setUntouched();
                    /*Volvemos el formulario a estado inicial del setPristine,
                     para validar que el usuario no halla interactuado con el formulario*/
                    vm.formTransactionCode.$setPristine();
                    /*Volvemos el boolean que valida si la fuente de ingreso se encuentra disponible para editar */
                    vm.editButton = false;
                    vm.submitted = false;
                
            } else {
                //Chequea que todos los campos obligatorios esten llenos sean validos.
                vm.submitted = true;
                modalFieldsRequired();
            }
        }

        function statusButton(index){
                sweet.show({
                title: messages.modals.warning.modaltitleWarning,
                text: "¿Esta seguro que desea inactivar/activar este producto?",
                type: messages.modals.warning.modalTypeWarning,
                showCancelButton: true,
                cancelButtonText: messages.modals.warning.modalCancelButton,
                confirmButtonColor: messages.modals.warning.modalColorButton,
                confirmButtonText: messages.modals.warning.modalConfirText,
                closeOnConfirm: true
            }, function () {
                    vm.viewModelTransaction = angular.copy(vm.tableSourceProdcut[index]);
                        if (vm.viewModelTransaction.status === 'I') {
                        vm.viewModelTransaction.status = 'A';
                        var json = {};
                        var jsonUpdate = {};
                        json = vm.viewModelTransaction;
                        vm.tableSourceProdcut.splice(index, 1, vm.viewModelTransaction);
                        jsonUpdate.originCode = json.originCode;
                        jsonUpdate.transactionCode = json.transactionCode;
                        jsonUpdate.description = json.description;
                        jsonUpdate.transactionType = json.transactionType;
                        jsonUpdate.currencyCode = json.currencyCode;
                        jsonUpdate.productType = json.productType;
                        jsonUpdate.status = json.status;
                        addCodeService.updateManteniment(jsonUpdate);
                        vm.viewModelTransaction = {};
                        vm.formTransactionCode.$setUntouched();
                        vm.formTransactionCode.$setUntouched();
                  } else {
                        vm.viewModelTransaction.status = 'I';  
                        var json = {};
                        var jsonUpdate = {};
                        json = vm.viewModelTransaction;
                        vm.tableSourceProdcut.splice(index, 1, vm.viewModelTransaction);
                        jsonUpdate.originCode = json.originCode;
                        jsonUpdate.transactionCode = json.transactionCode;
                        jsonUpdate.description = json.description;
                        jsonUpdate.transactionType = json.transactionType;
                        jsonUpdate.currencyCode = json.currencyCode;
                        jsonUpdate.productType = json.productType;
                        jsonUpdate.status = json.status;
                        addCodeService.updateManteniment(jsonUpdate);
                        vm.viewModelTransaction = {};
                        vm.formTransactionCode.$setUntouched();
                        vm.formTransactionCode.$setUntouched();
                  }     
            });
        }
	}
})();