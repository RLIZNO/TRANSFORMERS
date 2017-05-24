
/**
 *  @ngdoc controller
 *  @name App.controller:creationAccountController
 *
 *  @description
 *  Controlador para vista de inversion con moneda extranjera.
 */
(function () {
    
    'use strict';

    angular
        .module('assignmentQualifiersModule')
        .controller('qualifiersController', qualifiersController);

    qualifiersController.$inject = [
        '$rootScope',
        '$filter',
        'modalFactory',
        'validQualifersService'
    ];

    function qualifiersController(
        $rootScope,
        $filter,
        modalFactory,
        validQualifersService
        ) {
        
        var vm = this;
        vm.firstName = ''; // Nombre que traemos del servicio para asignar hablitantes
        vm.numberProduct = ''; // tipo de producto para asignar habilitantes
        vm.accountActiveTDC = true;
        vm.accountActiveFormalizationTC = true;
        vm.accountActiveFormalizationTD = true;
        vm.assigClave = '';
        vm.assigDebit = '';
        vm.accountProduct = [];
        vm.fullProduct = '';


        //Funciones
        vm.validDate = validDate;       
        vm.validAssignClave = validAssignClave;
        vm.validAssignDebit = validAssignDebit;
        vm.validAssignFormalization = validAssignFormalization;
        vm.validProduct = validProduct;


        function validProduct(){
            var type = vm.viewModelAssignmentQualifiers.numberProduct;
            vm.fullProduct = type.substr(5);
            console.log(vm.fullProduct);
            vm.assigDebit = '';
            vm.assigClave = '';
            vm.accountActiveDebit = false;
            vm.accountActiveFormalizationTC = false;
            vm.accountActiveFormalizationTD = false;
            vm.accountActiveTDC = false;
            
        }

        function validAssignFormalization() {
            var jsonForm = {};
            jsonForm.accountNumber = vm.fullProduct;
            console.log(vm.fullProduct);
            jsonForm.userName = $rootScope.dataUser.userName;
            

            validQualifersService.assignmentFormalization(jsonForm)
                    .then(
                    function (response) {
                        if (response.success) {
                            console.log(response); 
                            modalFactory.success(response.error.message);                                         
                        } else {
                            modalFactory.error(response.error.message);
                            vm.accountActiveFormalizationTC = true;
                            vm.accountActiveFormalizationTD = true;
                        }
                        }
                    );          
        }


         /**
         *  @ngdoc method
         *  @name assignDebit
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que trae los datos del cliente para asisgnar hablitantes
         */        
        function validAssignClave() {
            var jsonClave = {};
            jsonClave.documentNumber = vm.viewModelAssignmentQualifiers.numberIdentification;
            jsonClave.documentType = 2;
            jsonClave.userName = $rootScope.dataUser.userName;
            

            validQualifersService.assignmentTarClave(jsonClave)
                    .then(
                    function (response) {
                        if (response.success) {
                            console.log(response);                            
                            vm.assigClave = response.data.cardNumber;
                            vm.accountActiveTDC = true;
                            vm.accountActiveFormalizationTC = false;                            
                        } else {
                            modalFactory.error(response.error.message);
                            vm.accountActiveTDC = true;
                        }
                        }
                    );
        }

         /**
         *  @ngdoc method
         *  @name assignDebit
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que trae los datos del cliente para asisgnar hablitantes
         */        
        function validAssignDebit() {

            var jsonDebit = {};
            jsonDebit.documentType = 2;
            jsonDebit.documentNumber = vm.viewModelAssignmentQualifiers.numberIdentification;                            
            jsonDebit.accountnumber = vm.fullProduct;
            console.log(vm.fullProduct);
            jsonDebit.office = $rootScope.dataUser.sucursalId;
            jsonDebit.userName = $rootScope.dataUser.userName;
            console.log(jsonDebit)
            

            validQualifersService.assignmentTarDebito(jsonDebit)
                    .then(
                    function (response) {
                        if (response.success) {
                            vm.assigDebit = response.data.assignedCardNumber;
                            vm.accountActiveDebit = true;  
                            vm.accountActiveFormalizationTD = false;                         
                        } else {
                            modalFactory.error(response.error.message);
                            vm.accountActiveDebit = true;
                        }
                        }
                    );
        }

         /**
         *  @ngdoc method
         *  @name assignDebit
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que trae los datos del cliente para asisgnar hablitantes
         */        
        function validDate() {
            var keyCode = event.which || event.keyCode;
            if (keyCode === 13) {
                resetData();
                var json = {}; 

                json.documentNumber = vm.viewModelAssignmentQualifiers.numberIdentification;
                json.documentType = 2;
                json.userName = $rootScope.dataUser.userName;

                validQualifersService.dataQuilifers(json)
                    .then(
                    function (response) {
                        if (response.success) {
                            if (response.data.firstName === undefined || response.data.firstName === null){
                                vm.firns = '';
                            }else {
                                 vm.firns = response.data.firstName;
                                    var found = [];
                                        for(var i=0; i<response.data.accountsData.length; i++){
                                                if (response.data.accountsData[i].productFullName != -1){
                                                    found.push(response.data.accountsData[i].productFullName);
                                                }
                                            }
                                    vm.accountProduct = found;
                                 
                            }
                            if (response.data.firstLastname === undefined || response.data.firstLastname === null){
                                vm.last = '';
                            }else {
                                vm.last = response.data.firstLastname;
                            }
                            vm.firstName = vm.firns +' '+ vm.last;

                        } else {
                        modalFactory.error(response.error.message);
                     }
                    }
                    );

            }
        }


        /**
         *  @ngdoc function
         *  @name resetData
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Reinicia los valores de los datos de la pantalla
         */
        function resetData() {
             vm.accountActiveDebit = true;
             vm.accountProduct = '';
             vm.fullProduct = '';
             vm.assigClave = '';
             vm.assigDebit = '';
             vm.numberProduct = '';
             vm.accountActiveTDC = true;
             vm.firstName = '';
             vm.accountActiveFormalizationTD = true;
             vm.accountActiveFormalizationTC = true;
        }

         resetData();


    }
})();