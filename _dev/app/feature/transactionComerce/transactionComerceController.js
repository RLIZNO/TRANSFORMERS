 (function (){
	'use strict';
	angular
	.module('transactionComerceModule')
	.controller('transactionComerceController', transactionComerceController);

	 //Inyeccion de dependencias
	transactionComerceController.$inject = [
	 	'sweet',
	 	'$state',
	 	'URL',
    '$rootScope',
        'validTransactionAffiliate',
        'addTableAffliateService',
        '$timeout',
	 	'addCodeService',
	 	'messages',
	 	'modalFactory',
        'catalogService'
	];

	function transactionComerceController(
		sweet,
		$state,
		URL,
    $rootScope,
        validTransactionAffiliate,
        addTableAffliateService,
        $timeout,
		addCodeService,
		messages,
		modalFactory,
        catalogService
	){
		var vm = this;	
        vm.viewModelTransitionAffiliate = {};
        vm.viewModelTransitionNew = {};
        vm.tableSourceProdcut   = [];
        vm.optStatus        = [];

        vm.seachJobsData = seachJobsData;
        vm.tablaBin = tablaBin;
        vm.addJobsData = addJobsData;
        vm.addNewBin = addNewBin;
        vm.viewJobsData = viewJobsData;
        vm.editJobsData = editJobsData;
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
                    
                    var comercio = false;
                    localStorage.setItem("comercio", comercio);
                    window.location.href = "/wps/portal/ptd/gruporamos/gruporamos/";
                }, 0);
            });
        }
        var modal = document.getElementById('myModal');

        catalogService.getCatalogURL(URL.STATUS).then(
            function(response){
                vm.optStatus = response.data.data;
        });


        function viewJobsData(index) {
            /*Validamos que el formulario no esté diligenciado */
            if (vm.formProductMantenimentAffiliate.$dirty) {
                modalFactory.warning(messages.modals.warning.modalCompeteFieldsOrClean);
            } else {

                vm.viewModelTransitionAffiliate = angular.copy(vm.tableSourceProdcut[index]);
                /*habilitamos el boton de editar fuente de ingreso */
                vm.buttonEdit = true;
                vm.idSourceIncome = index;

            }

        }
        /*
         Funcion que agrega valida que todos los campos esten llenos y agrega los productos de mantenimiento a la tabla
        */
         function addJobsData(){ 
             vm.submitted = false;
             if(vm.formProductMantenimentNew.$valid){
                   $timeout(function () {
                    var json = {};
                    var jsonUpdate = {};
                    var description = '';

                    json = vm.viewModelTransaction;                    

                   if (vm.viewModelTransaction.status == vm.optStatus[0].valValue) {
                        var description = 'A';
                   }
                   if (vm.viewModelTransaction.status == vm.optStatus[1].valValue) {
                        var description = 'I';
                   }

                    jsonUpdate.createdBy = 'AM029969';
                    jsonUpdate.description = json.binNew;
                    jsonUpdate.status = description;
                    
                    addTableAffliateService.insertComerce(jsonUpdate);
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

                    validTransactionAffiliate.getvalidaTransitionAffiliate(vm.viewModelTransitionAffiliate.description).then(
                    function (response) {
                        if (response.success) {
                            console.log(response);
                            vm.tableSourceProdcut = response.data.binList;
                        } else {
                            modalFactory.error(response.error.message);
                        }
                          
                        }
                    );
                       // vm.tableSourceProdcut = response.productLimit;
                    
                    
                    vm.viewModelTransitionAffiliate = {};
                    /*Volvemos el formulario a estado inicial del touched */
                    vm.formProductMantenimentAffiliate.$setUntouched();
                    /*Volvemos el formulario a estado inicial del setPristine,
                     para validar que el usuario no halla interactuado con el formulario*/
                    vm.formProductMantenimentAffiliate.$setPristine();
                    /*Volvemos el boolean que valida si la fuente de ingreso se encuentra disponible para editar */
                    vm.buttonEdit = false;
                }, 0);
             }else{
                  //Chequea que todos los campos obligatorios esten llenos sean validos.
                 vm.submitted = true;
                 modalFieldsRequired();
             }
         }

         function editJobsData(index) {
            if (vm.formProductMantenimentAffiliate.$valid) {
                    var json = {};
                    var jsonUpdate = {};
                    json = vm.viewModelTransitionAffiliate;
                    vm.tableSourceProdcut.splice(index, 1, vm.viewModelTransitionAffiliate);
                    jsonUpdate.originCode = json.description;
                    jsonUpdate.status = json.status;

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
 
         function tablaBin() {
            validTransactionAffiliate.getValidComerce().then(                
                function (response) {
                    $timeout(function(){
                        vm.tableSourceProdcut = response.commerceEntity;
                        console.log(vm.tableSourceProdcut); 
                        }, 0);
                    }


                );   
         }

         tablaBin();


       

	}
})();