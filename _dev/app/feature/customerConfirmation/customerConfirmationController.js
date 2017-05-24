(function () {
    'use strict';

    angular
            .module('customerConfirmationModule')
            .controller('customerConfirmationController', customerConfirmationController);

    //Inyeccion de dependencias
    customerConfirmationController.$inject = [
        '$state',
        '$rootScope',
        'validationCardKeyService',
        'modalFactory',
        'enableAchlbtrService',
        'validationClientService',
        'documentClientService',
        'completeClientService',
        'messages'
        ];

    function customerConfirmationController(
        $state,
        $rootScope,
        validationCardKeyService,
        modalFactory,
        enableAchlbtrService,
        validationClientService,
        documentClientService,
        completeClientService,
        messages
    ) {
        var vm = this;

        /*Variables*/
    /*    $rootScope.dataFormCustomerConfirmation = {};
        $rootScope.since = {/*Definición de la variable global que indica de que vista origen viene el usuario */
         /*   'home' : false,
            'client' : false,
            'jobsData' : false,
            'foreignCurrency' : false
        }; */
        vm.viewModelConfirmation = {}; /*Variable donde se almacenarán los campos del formulario  */
        vm.viewModelConfirmation.achlbtr = true;
        vm.viewModelConfirmation.customerNumber = $rootScope.dataFormCustomerForeignCurrency.customerNumber;
        vm.viewModelConfirmation.personNumber = $rootScope.dataFormCustomerForeignCurrency.personNumber;
        vm.viewModelConfirmation.cardKey = $rootScope.dataFormCustomerForeignCurrency.cardKey;
        vm.cardKeyValid = false; /*Boolean que verifica cuando el cliente ha insertado un codigo de tarjeta valido */
        vm.validButtons =  true;
        vm.dataEmailClient = '';
        vm.viewModelConfirmation.positionValue = '';
        vm.validSignature = false;
        vm.validclientTc = localStorage.getItem("validclientTc");


        /*Funciones*/
        vm.creationAccount = creationAccount;
        vm.positionCardKey = positionCardKey;
        vm.validationCardKey = validationCardKey;
        vm.enableAchlbtr = enableAchlbtr;
        vm.knowYourClient = knowYourClient;
        vm.sendMail = sendMail;
        vm.finish = finish;
        vm.completeDataClient = completeDataClient;


        if (vm.validclientTc === 'validclientTc'){
            vm.validButtons = false;
        } 
        if (vm.validclientTc === 'validclientTclean'){
            vm.validButtons = true;
        }
        /**
        *  @ngdoc method
        *  @name sendMail
        *  @methodOf App.controller:customerConfirmationController
        *
        *  @description
        *  función para enviar el coorreo electronico de bienvenida
        */
        var  proyect = 'CreationAccoun';
        localStorage.setItem("Proyecto", proyect); 
        function sendMail(){

            var documentNumber = $rootScope.customerDataCredit.numberIdentification;
            var emailid = $rootScope.dataFormCustomerBasicData.email;

            validationClientService.getValidationEmail(documentNumber, emailid);

        }



        /**
        *  @ngdoc method
        *  @name finish
        *  @methodOf App.controller:customerConfirmationController
        *
        *  @description
        *  función para ir al home de la aplicaciónn y finalizar el proceso de creación de cliente
        */
        function finish() {
            completeDataClient();
            $state.go('home');
        }


        function creationAccount() {
        if (vm.viewModelConfirmation.validclientTc === 'validclientTc'){
            //window.location.href = "/wps/portal/ptd/secciontc/originaciontc";
            window.location.href = "../../_dev/index.html";
        }
            if (vm.validSignature) {
                completeDataClient();
                $rootScope.since.client = true;
                $rootScope.since.home = false;
                $state.go('creationAccount');
            } else {
                modalFactory.warning(messages.modals.warning.validAsignature);
            }
        }


        /**
        *  @ngdoc method
        *  @name completeDataClient
        *  @methodOf App.controller:customerConfirmationController
        *
        *  @description
        *  Metodo para asiganar una posición aleatoria de la tarjeta de clave
        */
        function completeDataClient() {
            completeClientService.finalizeCreation($rootScope.customerDataCredit.numberIdentification);
        }

        /**
        *  @ngdoc method
        *  @name positionCardKey
        *  @methodOf App.controller:customerConfirmationController
        *
        *  @description
        *  Metodo para asiganar una posición aleatoria de la tarjeta de clave
        */
        function positionCardKey() {

            validationCardKeyService.getPositionKeyCard($rootScope.customerDataCredit.numberIdentification)
                .then(
                function (response) {
                    if (response.success) {
                        vm.viewModelConfirmation.positionCard = response.data.positionId;
                    } else {
                        modalFactory.error(response.error.message);
                    }

                }
                );

        }

        positionCardKey();


        /**
        *  @ngdoc method
        *  @name validationCardKey
        *  @methodOf App.controller:customerConfirmationController
        *
        *  @description
        *  Metodo para validar que la posicion de la tarjeta clave conincida con el numero aleatoria generado
        */
        function validationCardKey() {
            var json = {};
            json.positionId = vm.viewModelConfirmation.positionCard;
            json.documentNumber = $rootScope.customerDataCredit.numberIdentification;
            json.positionValue = vm.viewModelConfirmation.positionValue;
            validationCardKeyService.validationCardKey(json)
                .then(
                function (response) {
                    if (response.success) {
                        modalFactory.success('El código digitado es correcto');
                        /*Llamamos  la función que habilita el servicio de transferencias interbancarias */
                        enableAchlbtr();
                        knowYourClient();
                        vm.validSignature = true;
                    } else {
                        modalFactory.error(messages.modals.error.codeIncorrect);                        
                    }

                }
                );

        }

        /**
        *  @ngdoc method
        *  @name enableAchlbtr
        *  @methodOf App.controller:customerConfirmationController
        *
        *  @description
        *  Metodo que habilita el servicio de transferencias interbancarias 
        */
        function enableAchlbtr() {
            var json = {};
            if(vm.viewModelConfirmation.achlbtr){
                json.flag = '1';
                $rootScope.dataFormCustomerConfirmation.achlbtr = '1';
            }else{
                json.flag = '0';
                $rootScope.dataFormCustomerConfirmation.achlbtr = '0';
            }
            json.personCode = vm.viewModelConfirmation.personNumber;
            json.userName = $rootScope.dataUser.userName;
            enableAchlbtrService.enableAchlbtr(json)
                .then(
                function (response) {
                    if (response.success) {
                    } else {
                        modalFactory.error(messages.modals.error.interbankNoActivated);
                    }

                }
                );

        }

        /**
        *  @ngdoc method
        *  @name enableAchlbtr
        *  @methodOf App.controller:customerConfirmationController
        *
        *  @description
        *  Metodo que habilita el servicio de transferencias interbancarias 
        */
        function knowYourClient() {
            var json = {};
            json.userName = $rootScope.dataUser.userName;
            json.passwordCard = vm.viewModelConfirmation.cardKey;
            json.code = vm.viewModelConfirmation.positionCard;
            json.documentNumber = $rootScope.customerDataCredit.numberIdentification;

            documentClientService.knowYourClient(json)
                .then(
                function (response) {
                    if(response.success){
                        vm.urlKnowYourClient = response.data.documentURL;
                        vm.cardKeyValid = true; /*Habilitamos el boton que valida que todo codigo de tarjeta de clave ha sido validado correctamente */
                        if(!$rootScope.dataFormCustomerBasicData.noEmail){
                            sendMail();
                        }
                    }else{
                        modalFactory.error(response.error.message);
                    }
                    
                }
                );

        }



    }
})();