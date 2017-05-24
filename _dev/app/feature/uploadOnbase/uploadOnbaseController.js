
/**
 *  @ngdoc controller
 *  @name App.controller:uploadOnbaseViewController
 *
 *  @description
 *  Controlador para vista de inversion con moneda extranjera.
 */
(function () {
    
    'use strict';

    angular
        .module('uploadOnbaseModule')
        .controller('uploadOnbaseViewController', uploadOnbaseViewController);

    //Inyeccion de dependencias
    uploadOnbaseViewController.$inject = [
        '$timeout',
        'catalogService',
        'CATALOG',
        'validationClientService',
        '$rootScope',
        'messages',
        'modalFactory',
        'creditListService',
        'creditBureauService',
        'SELECT_DEFAULT'
    ];

    function uploadOnbaseViewController(
        $timeout,
        catalogService,
        CATALOG,
        validationClientService,
        $rootScope,
        messages,
        modalFactory,
        creditListService,
        creditBureauService,
        SELECT_DEFAULT
        ) {
        
        var vm = this;

        vm.viewModeluploadOnbase = {
            typeIdentification : SELECT_DEFAULT.TYPE_DOCUMENTS
        };
        /**
         *  @ngdoc property
         *  @name documentIdType
         *  @propertyOf App.controller:uploadOnbaseViewController
         *
         *  @description
         *  Tipo de documento del cliente.
         */
        vm.documentIdType = null;

        /**
         *  @ngdoc property
         *  @name documentNumber
         *  @propertyOf App.controller:uploadOnbaseViewController
         *
         *  @description
         *  Número de documento del cliente.
         */
        vm.documentNumber = null;

        /**
         *  @ngdoc property
         *  @name clientNumber
         *  @propertyOf App.controller:uploadOnbaseViewController
         *
         *  @description
         *  Número de cliente.
         */
        vm.clientNumber = null;

        /**
         *  @ngdoc property
         *  @name accountNumber
         *  @propertyOf App.controller:uploadOnbaseViewController
         *
         *  @description
         *  Número de cuenta del cliente.
         */
        vm.accountNumber = null;
        vm.typeDocuments = [];
        

        /* Listado de metodos */

        /**
         *  @ngdoc method
         *  @name getTypeDocuments
         *  @methodOf App.controller:uploadOnbaseViewController
         *
         *  @description
         *  Carga de los tipos de documentos en el select
         */

        vm.getTypeDocuments = getTypeDocuments;
        vm.validateClient = validateClient;
        vm.modalCancel = modalCancel;
        vm.validateClientCanContinue = validateClientCanContinue;
        vm.modalError = modalError;
        vm.getCreditListService = getCreditListService;
        vm.getCreditBureau = getCreditBureau;

        /**
         *  @ngdoc function
         *  @name validateClientCanContinue
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Estudia todas las validaciones que el usuario tiene que pasar
         *  Determina si puede continuar o no.
         */ 
        function validateClientCanContinue() {
            if (vm.validationClient) {
                if (vm.findJudicialEvaluation && !vm.findPep && vm.findControlListReport && vm.isDominicanRepublic){
                    vm.clientCanContinue = true;
                    /*Validamos que el cliente tenga tarjeta de clave activa */
                    if (angular.isObject(vm.dataClientExit.keyCardNumber) || vm.dataClientExit.keyCardNumber === '') {
                        modalFactory.warning(messages.modals.warning.modalNoKeyCard);
                        vm.clientCanContinue = false;
                       // vm.contentDataCLient = false; 
                    } else {
                        vm.clientCanContinue = true;
                    }
                } else {
                    vm.clientCanContinue = false;
                    //vm.contentDataCLient = false;
                }
            } else {
                vm.clientCanContinue = false;
               // vm.contentDataCLient = false;
            }
        }

        /**
         *  @ngdoc function
         *  @name getCreditListService
         *  @methodOf App.controller:uploadOnbaseViewController
         *
         *  @description
         *  Valida si el cliente existe en lista de control
         */ 
        function getCreditListService() {

            var documentNumber = vm.viewModeluploadOnbase.numberIdentification;

            creditListService.getCreditListService(documentNumber, vm.viewModeluploadOnbase.typeIdentification, $rootScope.dataUser.userName).then(function(responseValue) {

                $timeout(function(){
                    vm.findPep = responseValue.pep;
                    vm.findControlListReport = responseValue.controlList;
                    vm.getControlList = true;

                    if (!vm.findControlListReport) {
                        modalFactory.error(messages.modals.error.badControlListCreationAccount);
                    }

                    if (vm.findPep) {
                        modalFactory.error(messages.modals.error.badPepListCreationAccount);
                    }

                    validateClientCanContinue();

                }, 0);

            }, modalError);

        }

 
        /**
         *  @ngdoc method
         *  @name getCreditBureau
         *  @methodOf App.controller:uploadOnbaseViewController
         *
         *  @description
         *  Valida al cliente en el buró
         *  Recupera los datos principales del cliente en el buró.
         */
        function getCreditBureau() {

            var documentNumber = vm.viewModeluploadOnbase.numberIdentification;

            creditBureauService.getValidCreditBureau(documentNumber, $rootScope.dataUser.userName).then(function (responseValue) {
            
                vm.findJudicialEvaluation = responseValue.validationBuroResult;

                if (!vm.findJudicialEvaluation) {
                    vm.getBureau = true;
                    modalFactory.error(messages.modals.error.badJudicialEvaluation);
                } else {

                    creditBureauService.getValidCientExisting(vm.viewModeluploadOnbase.typeIdentification ,documentNumber, $rootScope.dataUser.userName).
                        then(function   
                            (response) {

                            vm.dataClientExit = response;

                            /* Validamos si el pais de residencia es la republica dominicana */
                            if (vm.dataClientExit.nacionality !== messages.general.dominicanCountrySibel) {
                                modalFactory.error(messages.modals.error.notCountryAllowedAccount);
                            } else {
                                vm.isDominicanRepublic = true;
                            }

                            

                            

                            vm.viewModeluploadOnbase.clientNumber = vm.dataClientExit.clientNumber;
                            $rootScope.onbase.numberIdentification = vm.viewModeluploadOnbase.numberIdentification;
                            $rootScope.onbase.customerNumber = vm.viewModeluploadOnbase.clientNumber;
                            vm.getBureau = true;
                            validateClientCanContinue();
                      
                    }, modalError);
                }

                

            }, modalError);

        }       

        /**
         *  @ngdoc method
         *  @name validateClient
         *  @methodOf App.controller:uploadOnbaseViewController
         *
         *  @description
         *  Valida si el cliente existe o no.
         *  Consulta los datos básicos del cliente y los coloca en la vista.
         */
        function validateClient() {
            
            var documentNumber = vm.viewModeluploadOnbase.numberIdentification;

            validationClientService.getValidationClient(documentNumber, vm.viewModeluploadOnbase.typeIdentification, $rootScope.dataUser.userName).then(function (responseValue) {
               
                vm.validationClient = responseValue.validationClient;
                validateClientCanContinue();

                if(!vm.validationClient) {
                    modalFactory.error(messages.modals.error.errorClientNotExist);
                } else {
                    getCreditBureau();
                    getCreditListService();
                }

            }, modalError);
        }
        
        function getTypeDocuments() {
            catalogService.getCatalog(CATALOG.TYPE_DOCUMENTS)
                .then(
                function (response) {
                    vm.typeDocuments = response.data;
                }
            );
        }

        getTypeDocuments();

        function modalError(error) {
            if(error.message !== '') {
                modalFactory.error(error.message);
            } else {
                modalFactory.error(messages.modals.error.errorDefault);

            }
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
           modalFactory.cancel();
        }


    }

})();