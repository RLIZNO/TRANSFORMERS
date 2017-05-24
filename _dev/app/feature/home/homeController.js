(function () {
    'use strict';

    angular
        .module('homeModule')
        .controller('homeController', homeController);

    //Inyeccion de dependencias
    homeController.$inject = [
        '$state',
        '$rootScope',
        'modalFactory',
        'messages'
        ];

    function homeController(
        $state,
        $rootScope,
        modalFactory,
        messages
    ) {
        var vm = this;


        /*Variables globales*/
        var proyect = localStorage.getItem("Proyecto");
        if (proyect === 'CreditCard'){
            $rootScope.customerDataCredit = JSON.parse(localStorage.getItem("jsonData"));
            $rootScope.dataFormCustomerBasicData = {}; /*Definición de la variable global que guarda todo el formulario de los datos basicos del cliente */
            $rootScope.dataFormCustomerJobsData = []; /*Definición de la variable global que guarda todo el formulario de los datos laborales del cliente */
            $rootScope.dataFormCustomerForeignCurrency = {}; /*Definición de la variable global que guarda todo el formulario de los datos de moneda extranjera y PEP del cliente */
            $rootScope.dataFormCustomerConfirmation = {}; /*Definición de la variable global que guarda todo el formulario de los datos al genrar un cliente nuevo */
            $rootScope.onbase = {}; /*Definición de la variable global que guarda la información necesaria para el funcionamiento del componente de carga a onBase */
            $rootScope.since = {/*Definición de la variable global que indica de que vista origen viene el usuario */
                'home' : false,
                'client' : false,
                'jobsData' : false,
                'foreignCurrency' : false
            }; 
            $state.go('customerBasicData');
        }     
        $rootScope.customerDataCredit = {}; /*Definición de la variable global que guarda la información personal del cliente proveniente de el buró de credito */
        $rootScope.dataFormCustomerBasicData = {}; /*Definición de la variable global que guarda todo el formulario de los datos basicos del cliente */
        $rootScope.dataFormCustomerJobsData = []; /*Definición de la variable global que guarda todo el formulario de los datos laborales del cliente */
        $rootScope.dataFormCustomerForeignCurrency = {}; /*Definición de la variable global que guarda todo el formulario de los datos de moneda extranjera y PEP del cliente */
        $rootScope.dataFormCustomerConfirmation = {}; /*Definición de la variable global que guarda todo el formulario de los datos al genrar un cliente nuevo */
        $rootScope.onbase = {}; /*Definición de la variable global que guarda la información necesaria para el funcionamiento del componente de carga a onBase */
        $rootScope.since = {/*Definición de la variable global que indica de que vista origen viene el usuario */
            'home' : false,
            'client' : false,
            'jobsData' : false,
            'foreignCurrency' : false
        }; 
        $rootScope.validInputJobsData = [];/*Definición de la variable global que guarda el estado de los inputs en la vista de datos laborales*/

        /*Funciones*/
        vm.accountCreation = accountCreation;
        vm.onBase = onBase;
        vm.clientCreation = clientCreation;
        vm.creditCard = creditCard;
        vm.enabling = enabling;


        function accountCreation(){
            $rootScope.since.home = true;
            $rootScope.since.client =  false;
            $state.go('creationAccount');
        }



        function onBase() {
            $rootScope.since.home = true; 
            $state.go('uploadOnbase');
        }


        function clientCreation(){
            if($rootScope.dataUser.inventaryTDC){
                $state.go('validationDocument');
                var validclientTc = 'validclientTclean';
                localStorage.setItem("validclientTc", validclientTc);
                var dataSiebel = false;
                localStorage.setItem("dataSiebel", dataSiebel);
            }else{
                modalFactory.warning(messages.modals.warning.nokeycardAvailable);
            }
        }

        function creditCard(){
            var proyect = 'CreationAccoun';
            localStorage.setItem("Proyecto", proyect);
            window.location.href = "/wps/portal/ptd/secciontc/originaciontc";
            var validclientTc = 'validclientTclean';
            localStorage.setItem("validclientTc", validclientTc);
            //window.location.href = "/wps/portal/ptd/secciontc/originaciontc";
            window.location.href = "../../_dev/index.html";
        }

        function enabling(){
            $rootScope.since.home = true; 
            $state.go('assignmentQualifiers');
        }
    }
})();