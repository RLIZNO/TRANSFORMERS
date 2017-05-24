(function () {
    'use strict';

    angular
        .module('mantenimentModule')
        .controller('mantenimentController', mantenimentController);

    //Inyeccion de dependencias
    mantenimentController.$inject = [
        'sweet',
        '$state',
        '$rootScope',
        'modalFactory',
        'catalogService',
        'CATALOG',
        '$filter',
        '$timeout',
        'messages',
        'addTableService'
        ];

    function mantenimentController(
        sweet,
        $state,
        $rootScope,
        modalFactory,
        catalogService,
        CATALOG,
        $filter,
        $timeout,
        messages,
        addTableService
    ) {
        var vm = this;
        vm.viewModelManteniment = {};
        vm.tableSourceProdcut = [];
        vm.formCustomerProduct = false;
        vm.idSourceIncome = 0;
        vm.buttonEdit = false;
        vm.buttonActi = false;
        vm.labelstatus = '';
        vm.repeatFields= false;

        /*Metodos*/
        vm.addJobsData = addJobsData;
        vm.modalCancel = modalCancel;
        vm.viewJobsData = viewJobsData;
        vm.editJobsData = editJobsData;
        vm.statusButton = statusButton;
        vm.repeatProduct = repeatProduct;
vm.modalCancel = modalCancel;
        var modal = document.getElementById('myModal');

        catalogService.getCatalogURL(URL.STATUS).then(
            function(response){
                vm.optStatus = response.data.data;
        });

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
        function cargarProducto(){
            addTableService.allTable().then(function(responseValue) {
                var dataJson = {};
                dataJson = responseValue.productLimit;
                $rootScope.globalLimitData = dataJson[0];
                console.log($rootScope.globalLimitData);
            });
        }
        //cargarProducto();

        addTableService.allTable().then(
        function (response) {
            console.log(response);
            vm.tableSourceProdcut = response.productLimit;
        });

         /*
         Funcion que agrega valida que todos los campos esten llenos y agrega los productos de mantenimiento a la tabla
        */
         function addJobsData(){ 
             vm.submitted = false;
             if(vm.formProductManteniment.$valid){
                   $timeout(function () {
                    var json = {};
                    vm.viewModelManteniment.description = 'Siremas';
                    vm.viewModelManteniment.status = 'A';
                    vm.viewModelManteniment.createdBy = 'SERWEBDEV07';

                    json = vm.viewModelManteniment;

                    /*addTableService.allTable().then(function(responseValue) {
                        console.log(responseValue);
                    });*/
                    repeatProduct();
                    if (vm.repeatFields) {
                        modalRepeatFields();
                        vm.repeatFields = false;
                    } else {
                        addTableService.addManteniment(json);
                        addTableService.allTable();
                        /*addTableService.allTable().then(
                        function (response) {
                            console.log(response);
                            vm.tableSourceProdcut = response.productLimit;
                        });*/
                        
                        vm.viewModelManteniment = {};
                        /*Volvemos el formulario a estado inicial del touched */
                        vm.formProductManteniment.$setUntouched();
                        /*Volvemos el formulario a estado inicial del setPristine,
                         para validar que el usuario no halla interactuado con el formulario*/
                        vm.formProductManteniment.$setPristine();
                        /*Volvemos el boolean que valida si la fuente de ingreso se encuentra disponible para editar */
                        vm.buttonEdit = false; 
                    }
                    
                }, 0);
             }else{
                  //Chequea que todos los campos obligatorios esten llenos sean validos.
                 vm.submitted = true;
                 modalFieldsRequired();
             }
         }

        function repeatProduct(){
            /*addTableService.allTable().then(function(responseValue) {
                var dataJson = {};
                dataJson = responseValue.productLimit;

                angular.forEach(dataJson,function(value,index,key){
                    if (value.bin == vm.viewModelManteniment.bin || value.productCode == vm.viewModelManteniment.productCode) {
                        vm.repeatFields=true;
                        //return true;
                    }
                });
            });*/

            angular.forEach(vm.tableSourceProdcut,function(value,index,key){
                if (value.bin == vm.viewModelManteniment.bin || value.productCode == vm.viewModelManteniment.productCode) {
                    vm.repeatFields=true;
                    //return true;
                 }
            });
        }

        function modalCancel(){
            modalFactory.cancel();
        }

        function viewJobsData(index) {
            /*Validamos que el formulario no esté diligenciado */
            /*if (vm.formProductManteniment.$dirty) {
                modalFactory.warning(messages.modals.warning.modalCompeteFieldsOrClean);
            } else {*/

                vm.viewModelManteniment = angular.copy(vm.tableSourceProdcut[index]);
                /*habilitamos el boton de editar fuente de ingreso */
                vm.buttonEdit = true;
                vm.idSourceIncome = index;

           // }

        }

        function editJobsData(index) {
            if (vm.formProductManteniment.$valid) {
                $timeout(function () {

                    var json = {};
                    var jsonUpdate = {};
                    json = vm.viewModelManteniment;
                    vm.tableSourceProdcut.splice(index, 1, vm.viewModelManteniment);
                    jsonUpdate.bin = json.bin;
                    jsonUpdate.createdBy = json.createdBy;
                    jsonUpdate.description = json.description;
                    jsonUpdate.maximumLimitRD = json.maximumLimitRD;
                    jsonUpdate.maximumLimitUS = json.maximumLimitUS;
                    jsonUpdate.minimumLimitRD = json.minimumLimitRD;
                    jsonUpdate.minimumLimitUS = json.minimumLimitUS;
                    jsonUpdate.productCode = json.productCode;
                    jsonUpdate.status = json.status;

                    addTableService.updateManteniment(jsonUpdate);
                    vm.viewModelManteniment = {};
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

        /*Funcion para abrir el modal de campos repetidos*/
        function modalRepeatFields () {
            modalFactory.warning(messages.modals.error.modalRepeatFields);
        }

         /*Funcion para abrir el modal de campos obligatorios*/
        function modalFieldsRequired () {
            modalFactory.warning(messages.modals.error.completeRequiredFields);
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
                $timeout(function () {
                    vm.viewModelManteniment = angular.copy(vm.tableSourceProdcut[index]);
                        if (vm.viewModelManteniment.status === 'I') {
                        vm.viewModelManteniment.status = 'A';
                        var json = {};
                        var jsonUpdate = {};
                        json = vm.viewModelManteniment;
                        vm.tableSourceProdcut.splice(index, 1, vm.viewModelManteniment);
                        jsonUpdate.bin = json.bin;
                        jsonUpdate.createdBy = json.createdBy;
                        jsonUpdate.description = json.description;
                        jsonUpdate.maximumLimitRD = json.maximumLimitRD;
                        jsonUpdate.maximumLimitUS = json.maximumLimitUS;
                        jsonUpdate.minimumLimitRD = json.minimumLimitRD;
                        jsonUpdate.minimumLimitUS = json.minimumLimitUS;
                        jsonUpdate.productCode = json.productCode;
                        jsonUpdate.status = json.status;
                        addTableService.updateManteniment(jsonUpdate);
                        vm.viewModelManteniment = {};
                        vm.formProductManteniment.$setUntouched();
                        vm.formProductManteniment.$setUntouched();
                  } else {
                        vm.viewModelManteniment.status = 'I';
                        var json = {};
                        var jsonUpdate = {};
                        json = vm.viewModelManteniment;
                        vm.tableSourceProdcut.splice(index, 1, vm.viewModelManteniment);
                        jsonUpdate.bin = json.bin;
                        jsonUpdate.createdBy = json.createdBy;
                        jsonUpdate.description = json.description;
                        jsonUpdate.maximumLimitRD = json.maximumLimitRD;
                        jsonUpdate.maximumLimitUS = json.maximumLimitUS;
                        jsonUpdate.minimumLimitRD = json.minimumLimitRD;
                        jsonUpdate.minimumLimitUS = json.minimumLimitUS;
                        jsonUpdate.productCode = json.productCode;
                        jsonUpdate.status = json.status;
                        addTableService.updateManteniment(jsonUpdate); 
                        vm.viewModelManteniment = {};
                        vm.formProductManteniment.$setUntouched();
                        vm.formProductManteniment.$setUntouched();   
                  }
                }, 0);
            });

        }



    }
})();