
/**
 *  @ngdoc controller
 *  @name App.controller:validationDocumentController
 *
 *  @description
 *  Vista de validación de cliente.
 */
 (function () {
    
    'use strict';

    angular
        .module('validationDocumentModule')
        .controller('validationDocumentController', validationDocumentController);

    validationDocumentController.$inject = [ 
        '$state',
        'CATALOG',
        'catalogService',
        'creditBureauService',
        'creditListService',
        '$timeout',
        'ngXml2json',
        '$rootScope',
        'modalFactory',
        'utilFactory',
        'messages',
        'validationClientService',
        'URL',
        'saveIdentificationService',
        'SELECT_DEFAULT'
    ];

    function validationDocumentController( 
        $state,
        CATALOG,
        catalogService,
        creditBureauService,
        creditListService,
        $timeout,
        ngXml2json,
        $rootScope,
        modalFactory,
        utilFactory,
        messages,
        validationClientService,
        URL,
        saveIdentificationService,
        SELECT_DEFAULT
        ) {
        
        var vm = this;

        /**
         *  @ngdoc property
         *  @name typeDocuments
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Almacena los tipos de documentos a seleccionar por el usuario.
         */
        vm.typeDocuments = [];

        /**
         *  @ngdoc property
         *  @name typeIdentification
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Almacena el valor del tipo de indentificación por defecto o seleccionado por el usuario
         */
        vm.typeIdentification = 2;

        /**
         *  @ngdoc property
         *  @name viewModelvalidationDocument
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Permite almacenar todo el modelo de la vista.
         */
        vm.viewModelvalidationDocument = {
            typeIdentification : SELECT_DEFAULT.TYPE_DOCUMENTS
        };

        /**
         *  @ngdoc property
         *  @name submitted
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Permite almacenar el formulario de la vista.
         */
        vm.submitted = false;

        /**
         *  @ngdoc property
         *  @name formValidationDocument
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Permite almacenar el formulario de la vista.
         */
        vm.formValidationDocument = false;

        /**
         *  @ngdoc property
         *  @name getBureau
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Almacena si la consulta del Buró finalizó.
         */
        vm.getBureau = false;

        /**
         *  @ngdoc property
         *  @name findJudicialEvaluation
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Almacena si el cliente fue encontrado en la ficha judicial.
         */
        vm.findJudicialEvaluation = false;

        /**
         *  @ngdoc property
         *  @name getControlList
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Permite almacenar si la consulta de listas de control finalizó.
         */
        vm.getControlList = false;

        /**
         *  @ngdoc property
         *  @name findControlListReport
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Almacena si el cliente fue encontrado en listas de control.
         */
        vm.findControlListReport = false;

        /**
         *  @ngdoc property
         *  @name findPep
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Almacena si el cliente se encuentra en listas PEP. 
         */
        vm.findPep = false;

        /**
         *  @ngdoc property
         *  @name ageAllowed
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Almacena la validacion de la edad del cliente.  
         */
        vm.ageAllowed = false;

        /**
         *  @ngdoc property
         *  @name validationClient
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Permite almacenar la validación del cliente.  
         */
        vm.validationClient = false;

        /**
         *  @ngdoc property
         *  @name urlXml
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Permite almacenar la url del xml de consulta del Buró.  
         */
        vm.urlXml = null;

        /**
         *  @ngdoc property
         *  @name isDominicanRepublic
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Permite identificar si el cliente es de Republica Dominicana o no.  
         */
        vm.isDominicanRepublic = false;

        /**
         *  @ngdoc property
         *  @name clientCanContinue
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Permite identificar si el usuario ha pasado todas las validaciones necesarias
         *  Para continuar con el flujo de creación de cliente.  
         */
        vm.clientCanContinue = false;

        /**
         *  @ngdoc property
         *  @name $rootScope.dataUser.typeDocument
         *  @propertyOf App.controller:validationDocumentController
         *
         *  @description
         *  Variable global que guarda el tipo de documento seleccionado del cliente 
         */
        $rootScope.dataUser.typeDocument = vm.viewModelvalidationDocument.typeIdentification;

        
        


        /* Listado de metodos */
        vm.modalCancel = modalCancel;
        vm.getTypeDocuments = getTypeDocuments;
        vm.validationData = validationData;
        vm.getValidation = getValidation;

        /**
         *  @ngdoc function
         *  @name getErrorDefault
         *  @methodOf App.controller:validationDocumentController
         *
         *  @description
         *  Consulta con el usuario si esta seguro de cancelar el proceso.
         */
        function modalCancel() {
           modalFactory.cancel();
        }

        /**
         *  @ngdoc function
         *  @name getErrorDefault
         *  @methodOf App.controller:validationDocumentController
         *
         *  @description
         *  Consulta los tipos de documentos a un servicio
         */
        function getTypeDocuments() {
            catalogService.getCatalog(CATALOG.TYPE_DOCUMENTS).then(
                function (response) {
                    vm.typeDocuments = response.data;
                }
            );
        }

        /**
         *  @ngdoc method
         *  @name getErrorDefault
         *  @methodOf App.controller:validationDocumentController
         *
         *  @description
         *  Valida si el formulario de la pantalla esta correctamente completado para continuar.
         */
        function validationData(){
            var jsonIdentification = {}; /*json donde vamos almacenar la información del cliente a guardar */
            if (vm.formValidationDocument.$valid) {
                jsonIdentification.documentType = vm.viewModelvalidationDocument.typeIdentification;
                jsonIdentification.documentNumber = vm.viewModelvalidationDocument.numberIdentification;
                /*Si la ficha judicial es correcta, enviar un 1 al servicio */
                if(vm.getBureau){
                    jsonIdentification.isJudiciary = '1';
                }else{
                    jsonIdentification.isJudiciary = '0';
                }
                /*Si la lista interna de control es correcta, enviar un 1 al servicio */
                if(vm.getControlList){
                    jsonIdentification.isControlList = '1';
                }else{
                    jsonIdentification.isControlList = '0';
                }

                /*Llamamos al servicio que elimina el xml del buró de credito obtenido */
                var documentNumber = vm.viewModelvalidationDocument.numberIdentification;
                creditBureauService.deleteXmlCreditBureau(documentNumber, $rootScope.dataUser.userName).then(function () {});

                /*Llamos al servicio que guarda la identificación del cliente */
                /*    validationClientService.getValidaClientPortal(vm.typeDocument, vm.numberDocument, $rootScope.dataUser.userName).then
                        (function (response) {
            
                        vm.validationClientPortal = response.data.existsClientPortal;

                        if (vm.validationClientPortal){
                            /*Llamos al servicio que actualiza los datos basicos del cliente en siebel*/
                      /*      updateBasicDataService.putBasicDataSiebel(jsonBasicDataSiebel);
                            $rootScope.dataFormCustomerBasicData.idAcademicLevel = vm.idAcademicLevel;
                            $state.go('customerJobsData');
                        }else {
                            updateBasicDataService.putBasicData(jsonBasicData);
                            $rootScope.dataFormCustomerBasicData.idAcademicLevel = vm.idAcademicLevel;
                            /*Redireccionamos a la vista de datos laborales */
                   /*         $state.go('customerJobsData');
                        }

                    });*/
                saveIdentificationService.postSaveIdentification(jsonIdentification);

                /*Redireccionamos a la siguiente pantalla */
                $state.go('customerBasicData');
            } else {

                vm.submitted = true;
                modalFactory.warning(messages.modals.error.completeRequiredFields);
            }
        }

        /**
         *  @ngdoc method
         *  @name getErrorDefault
         *  @methodOf App.controller:validationDocumentController
         *
         *  @description
         *  Realiza una validación acerca de la estructura de error enviada por el servicio.
         *  Enseña un modal por defecto cuando el mensaje de error del servicio viene vacío.
         */
        function getErrorDefault(error) {
            if(error.message !== '') {
                modalFactory.error(error.message);
            } else {
                modalFactory.error(messages.modals.error.errorDefault);

            }
        }

        /**
         *  @ngdoc method
         *  @name getValidation
         *  @methodOf App.controller:validationDocumentController
         *
         *  @description
         *  Reinicia los atributos del controlador.
         *  Llama al servicio de validación de cliente.
         */
        function getValidation () {
            if (resetData()) {
                getValidationClient();
            }
        }

        /**
         *  @ngdoc method
         *  @name getValidationClient
         *  @methodOf App.controller:validationDocumentController
         *
         *  @description
         *  Valida si el numero de identificacion ya existe como cliente.
         *  En caso de que exista envía mensaje de error.
         *  En caso contario continua con las siguientes validaciones correspondientes.
         */
        function getValidationClient() {

            var documentNumber = vm.viewModelvalidationDocument.numberIdentification,
                typeIdentification = vm.viewModelvalidationDocument.typeIdentification;

            validationClientService.getValidationClient(documentNumber, typeIdentification, $rootScope.dataUser.userName).then(
                function (responseValue) {
                    vm.validationClient = responseValue.validationClient;
                    if(vm.validationClient) {
                        modalFactory.error(messages.modals.error.validationClient);
                    } else {
                        getCreditBureau();
                        getCreditListService();
                    }
                }, getErrorDefault
            );
        }

        /**
         *  @ngdoc method
         *  @name getCreditBureau
         *  @methodOf App.controller:validationDocumentController
         *
         *  @description
         *  Realiza validaciones en el Buró del cliente y ficha judicial
         *  Si el cliente esta reportado en ficha judicial envía mensaje de error  
         */
        function getCreditBureau () {

            var documentNumber = vm.viewModelvalidationDocument.numberIdentification,
                stringXml = '',
                urlBase = window.location.origin + URL.XML_BUREAU,
                oJson = {},
                clientCountry = '',
                clientAge;

            creditBureauService.getValidCreditBureau(documentNumber, $rootScope.dataUser.userName).then(function (responseValue) {
            
                vm.findJudicialEvaluation = responseValue.validationBuroResult;

                /*GUARDADO DE DATOS PERSONALES, TRANSVERSALES EN TODA LA APLICACIÓN*/

                /*Operación con el XML del buró de credito*/
                creditBureauService.getXmlCreditBureau(documentNumber, $rootScope.dataUser.userName).then(function (responseXml) {
                    
                    stringXml = responseXml;
                    oJson = ngXml2json.parser(stringXml);
                    clientCountry = oJson.reportecu.reporte.informacionadicional.nacionalidad;
                    /* URL que almacena el llamado al archivo XML en el servidor */
                    vm.urlXml = urlBase + '?documentNumber=' + documentNumber + '&userName='+ $rootScope.dataUser.userName ;

                    /*Si el segundo nombre viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.clienteunico.segundonombre)) {
                        $rootScope.customerDataCredit.secondName = '';
                    } else {
                        $rootScope.customerDataCredit.secondName = oJson.reportecu.clienteunico.segundonombre;
                    }

                    /*Si el segundo apellido viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.clienteunico.segundoapellido)) {
                        $rootScope.customerDataCredit.secondSurname = '';
                    } else {
                        $rootScope.customerDataCredit.secondSurname = oJson.reportecu.clienteunico.segundoapellido;
                    }

                    /*Si la ocupación viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.reporte.datosgenerales.ocupacion)) {
                        $rootScope.customerDataCredit.profession = '';
                    } else {
                        $rootScope.customerDataCredit.profession = oJson.reportecu.reporte.datosgenerales.ocupacion;
                    }

                     /*Si la el telefono de la casa viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.reporte.datoslocalizacion.telefonoresidencia)) {
                        $rootScope.customerDataCredit.landLine = '';
                    } else {
                        $rootScope.customerDataCredit.landLine = oJson.reportecu.reporte.datoslocalizacion.telefonoresidencia;
                    }

                     /*Si la el telefono móvil viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.reporte.datoslocalizacion.telefonocelular)) {
                        $rootScope.customerDataCredit.mobilePhone = '';
                    } else {
                        $rootScope.customerDataCredit.mobilePhone = oJson.reportecu.reporte.datoslocalizacion.telefonocelular;
                    }

                     /*Si la calle de residencia viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.reporte.datoslocalizacion.calleresidencia)) {
                        $rootScope.customerDataCredit.street = '';
                    } else {
                        $rootScope.customerDataCredit.street = oJson.reportecu.reporte.datoslocalizacion.calleresidencia;
                    }

                     /*Si el numero de residencia viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.reporte.datoslocalizacion.direccionnumero)) {
                        $rootScope.customerDataCredit.residenceNumber = '';
                    } else {
                        $rootScope.customerDataCredit.residenceNumber = oJson.reportecu.reporte.datoslocalizacion.direccionnumero;
                    }

                    /* Validamos si el pais de residencia es la republica dominicana */
                    if (clientCountry !== messages.general.dominicanCountry) {
                        modalFactory.error(messages.modals.error.notCountryAllowedClient);
                    } else {
                        vm.isDominicanRepublic = true;
                    }

                     /*Si el numero de residencia viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.clienteunico.estadocivil)) {
                        $rootScope.customerDataCredit.civilStatus = '';
                    } else {
                        $rootScope.customerDataCredit.civilStatus = oJson.reportecu.clienteunico.estadocivil;
                    }

                    /*Guardamos el numero de identidad del cliente para poder borrarlo en el la fabrica del modal de cancelar*/
                    $rootScope.customerDataCredit.numberIdentification = vm.viewModelvalidationDocument.numberIdentification;
                    
                    /*Almacenar los datos extraidos del cliente desde data credito */
                    $rootScope.customerDataCredit.firtsName = oJson.reportecu.clienteunico.primernombre;
                    $rootScope.customerDataCredit.surname = oJson.reportecu.clienteunico.primerapellido;
                    $rootScope.customerDataCredit.birthDate = oJson.reportecu.clienteunico.fechanacimiento;
                    $rootScope.customerDataCredit.sex = oJson.reportecu.clienteunico.sexo;
                    $rootScope.customerDataCredit.countryBirth = oJson.reportecu.clienteunico.paisnacimiento;
                    $rootScope.customerDataCredit.cityBirth = oJson.reportecu.clienteunico.lugarnacimiento;
                    $rootScope.customerDataCredit.nationality = oJson.reportecu.clienteunico.nacionalidad;
                    $rootScope.customerDataCredit.residenceCountry = oJson.reportecu.reporte.datoslocalizacion.paisresidencia;
                    $rootScope.customerDataCredit.residenceProvince = oJson.reportecu.reporte.datoslocalizacion.cod_provincia_nombre;
                    $rootScope.customerDataCredit.residenceMunicipality = oJson.reportecu.reporte.datoslocalizacion.ciudadresidencia;

                    clientAge = utilFactory.getAge($rootScope.customerDataCredit.birthDate);
                    
                    if(clientAge < 18) {
                        modalFactory.error(messages.modals.error.notAllowedAge);
                    } else {
                        vm.ageAllowed = true;
                    }

                    /*Recoremos el tipo de documento para capturar el nombre del tipo de documento seleccionado*/

                    angular.forEach(vm.typeDocuments, function (value, key) {
                        if (value.id === vm.viewModelvalidationDocument.typeIdentification) {
                            $rootScope.customerDataCredit.nameTypeIdentification = value.value;
                        }
                    });

                    vm.getBureau = true;
                    validateClientInfo();

                }, getErrorDefault);

                if (!vm.findJudicialEvaluation) {
                    modalFactory.error(messages.modals.error.badJudicialEvaluation);
                }

            }, getErrorDefault);

        }

        /**
         *  @ngdoc method
         *  @name getCreditListService
         *  @methodOf App.controller:validationDocumentController
         *
         *  @description
         *  Valida al cliente en listas de control.
         *  Valida al cliente en listas PEP
         */
        function getCreditListService () {

            var documentNumber = vm.viewModelvalidationDocument.numberIdentification,
                typeIdentification = vm.viewModelvalidationDocument.typeIdentification;

            creditListService.getCreditListService(documentNumber, typeIdentification, $rootScope.dataUser.userName).then(
                function(responseValue) {
                    $timeout(function(){
                        vm.findPep = responseValue.pep;
                        vm.findControlListReport = responseValue.controlList;
                        vm.getControlList = true;
                        if (!vm.findControlListReport) {
                            modalFactory.error(messages.modals.error.badControlList);
                        }
                        if (vm.findPep) {
                            modalFactory.error(messages.modals.error.badPepList);
                        }
                        validateClientInfo();
                    }, 0);
                }, getErrorDefault
            );
        }

        /**
         *  @ngdoc method
         *  @name resetData
         *  @methodOf App.controller:validationDocumentController
         *
         *  @description
         *  Inicializa todos los atributos y variables de la vista.
         */
        function resetData() {
            vm.submitted = false;
            vm.getBureau = false;
            vm.findJudicialEvaluation = false;
            vm.getControlList = false;
            vm.findControlListReport = false;
            vm.findPep = false;
            vm.ageAllowed = false;
            vm.validationClient = false;
            vm.urlXml = null;
            vm.clientCanContinue = false;
            vm.isDominicanRepublic = false;
            return true;
        }

        /**
         *  @ngdoc method
         *  @name validateClientInfo
         *  @methodOf App.controller:validationDocumentController
         *
         *  @description
         *  Realiza todas las validaciones necesarias del caso e indica si el cliente 
         *  puede continuar con el flujo de creación de cliente.
         */
        function validateClientInfo() {

            var isClient = vm.validationClient,
                isInControlList = vm.findControlListReport,
                isInJudicialList = vm.findJudicialEvaluation,
                isInPepList = vm.findPep,
                isAgeAllowed = vm.ageAllowed,
                isDominican = vm.isDominicanRepublic;

            if (!isClient) {
                if (isInControlList && isInJudicialList && !isInPepList && isAgeAllowed && isDominican) {
                    vm.clientCanContinue = true;
                } else {
                    vm.clientCanContinue = false;
                }
            }
        }

        /**
         *  @ngdoc method
         *  @name init
         *  @methodOf App.controller:validationDocumentController
         *
         *  @description
         *  Se ejecuta cuando se ingresa en la vista
         *  Inicializa los atributos del controlador.
         *  Consulta los tipos de documentos.
         */
        function init() {
            resetData();
            getTypeDocuments();
        }

        init();
        
    }
})();
