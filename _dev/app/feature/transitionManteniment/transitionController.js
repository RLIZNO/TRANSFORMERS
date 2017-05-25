(function () {
    'use strict';

    angular
        .module('transitionModule')
        .controller('transitionController', transitionController);

    //Inyeccion de dependencias
    transitionController.$inject = [
        'sweet',
        '$state',
        '$rootScope',
        'modalFactory',
        'catalogService',
        'validTransitionBinService',
        'addTableBinService',
        'CATALOG',
        '$filter',
        '$timeout',
        'messages',
        'addTableService'
        ];

    function transitionController(
        sweet,
        $state,
        $rootScope,
        modalFactory,
        catalogService,
        validTransitionBinService,
        addTableBinService,
        CATALOG,
        $filter,
        $timeout,
        messages,
        addTableService
    ) {

        var vm = this;
        vm.viewModelTransition = {};
        vm.viewModelTransitionNew = {};
        vm.buttonEdit = false;

        vm.typeTransation = [
            { value:"Consumo" },
            { value:"Reservo" }
        ];
        vm.formNewInvalid = false;


        // FUNCIONES

        vm.seachJobsData = seachJobsData;
        vm.modalError = modalError;
        vm.viewJobsData = viewJobsData;
        vm.editJobsData = editJobsData;
        vm.addJobsData = addJobsData;
        vm.deleteJobsData = deleteJobsData;
        vm.tablaBin = tablaBin;
        vm.addNewBin = addNewBin;
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
                    
                    var bin = false;
                    localStorage.setItem("bin", bin);
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
       

        /*Funcion para abrir el modal de campos obligatorios*/
        function modalFieldsRequired () {
            modalFactory.warning(messages.modals.error.completeRequiredFields);
        }

        /**
         * 
         * Funcion para eliminar de la tabla una fuente de ingreso 
         * @param {any} index
         */
        function deleteJobsData(index) {
            sweet.show({
                title: messages.modals.warning.modaltitleWarning,
                text: '¿Está seguro que desea cancelar este producto?',
                type: messages.modals.warning.modalTypeWarning,
                showCancelButton: true,
                cancelButtonText: messages.modals.warning.modalCancelButton,
                confirmButtonColor: messages.modals.warning.modalColorButton,
                confirmButtonText: messages.modals.warning.modalConfirText,
                closeOnConfirm: true
            }, function () {
                $timeout(function () {
                    /*Eliminamos de la tabla la ocupación seleccionada */
                     vm.tableSourceProdcut.splice(index, 1);
                }, 0);
            });
           
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

                    json = vm.viewModelTransitionNew;                    

                    jsonUpdate.bin = json.binNew;
                    jsonUpdate.productCode = json.productCodeNew;
                    jsonUpdate.productName = json.productNameNew;
                    jsonUpdate.productType = json.productTypeNew;
                    jsonUpdate.status = "Activo";
                    jsonUpdate.id = 0;
                    jsonUpdate.userName = 'AM029969';
                    
                    addTableBinService.InsertBin(jsonUpdate);
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


         function tablaBin() {
            validTransitionBinService.getvalidaTransition('', '', '').then(                
                function (response) {
                    vm.tableSourceProdcut = '';
                    $timeout(function(){
                        if (response.success) {
                            console.log(response);
                            vm.tableSourceProdcut = response.data.binList;
                            console.log(vm.tableSourceProdcut); 
                        } else {
                            modalFactory.error(response.error.message);
                        }
                          
                        }, 0);
                    }


                );   
         }

         tablaBin();

   

        /*
         Funcion que agrega valida que todos los campos esten llenos y busc el producto del BIN 
        */
         function seachJobsData(){ 
             vm.submitted = false;
             if(vm.formProductManteniment.$valid){
                   $timeout(function () {
                    var json = {};
                    if (vm.viewModelTransition.bin === undefined){
                        vm.viewModelTransition.bin = '';
                    }
                    if (vm.viewModelTransition.productCode === undefined){
                        vm.viewModelTransition.productCode = '';
                    }
                    if (vm.viewModelTransition.productName === undefined) {
                        vm.viewModelTransition.productName = '';
                    }

                    validTransitionBinService.getvalidaTransition(vm.viewModelTransition.bin, vm.viewModelTransition.productCode, vm.viewModelTransition.productName).then(
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
                    
                    
                    vm.viewModelTransition = {};
                    /*Volvemos el formulario a estado inicial del touched */
                    vm.formProductManteniment.$setUntouched();
                    /*Volvemos el formulario a estado inicial del setPristine,
                     para validar que el usuario no halla interactuado con el formulario*/
                    vm.formProductManteniment.$setPristine();
                    /*Volvemos el boolean que valida si la fuente de ingreso se encuentra disponible para editar */
                    vm.buttonEdit = false;
                }, 0);
             }else{
                  //Chequea que todos los campos obligatorios esten llenos sean validos.
                 vm.submitted = true;
                 modalFieldsRequired();
             }
         }

        function viewJobsData(index) {
            /*Validamos que el formulario no esté diligenciado */
            if (vm.formProductManteniment.$dirty) {
                modalFactory.warning(messages.modals.warning.modalCompeteFieldsOrClean);
            } else {

                vm.viewModelTransition = angular.copy(vm.tableSourceProdcut[index]);
                /*habilitamos el boton de editar fuente de ingreso */
                vm.buttonEdit = true;
                vm.idSourceIncome = index;

            }

        }

        function editJobsData(index) {
            if (vm.formProductManteniment.$valid) {
                $timeout(function () {

                    var json = {};
                    var jsonUpdate = {};
                    json = vm.viewModelTransition;
                    vm.tableSourceProdcut.splice(index, 1, vm.viewModelTransition);
                    jsonUpdate.bin = json.bin;
                    jsonUpdate.productCode = json.productCode;
                    jsonUpdate.productName = json.productName;
                    jsonUpdate.productType = json.productType;
                    jsonUpdate.status = json.status;
                    jsonUpdate.id = json.id;
                    jsonUpdate.userName = 'AM029969';

                    addTableBinService.updateMantenimentBin(jsonUpdate);
                    vm.viewModelTransition = {};
                    /*Volvemos el formulario a estado inicial del touched */
                    vm.formProductManteniment.$setUntouched();
                    /*Volvemos el formulario a estado inicial del setPristine,
                     para validar que el usuario no halla interactuado con el formulario*/
                    vm.formProductManteniment.$setPristine();
                    /*Volvemos el boolean que valida si la fuente de ingreso se encuentra disponible para editar */
                    vm.buttonEdit = false;
                    vm.submitted = false;
                }, 0);
            } else {
                //Chequea que todos los campos obligatorios esten llenos sean validos.
                vm.submitted = true;
                modalFieldsRequired();
            }
        }

          function modalError(error) {
           if(error.message !== '') {
               modalFactory.error(error.message);
           } else {
               modalFactory.error(messages.modals.error.errorDefault);

           }
       }

    }
})();