
/**
 *  @ngdoc controller
 *  @name App.controller:customerForeignCurrencyController
 *
 *  @description
 *  Controlador para vista de inversion con moneda extranjera.
 */
(function () {
    
    'use strict';

    angular
        .module('customerForeignCurrencyModule')
        .controller('customerForeignCurrencyController', customerForeignCurrencyController);

    customerForeignCurrencyController.$inject = [
        'CATALOG', 
        'catalogService',
        'modalFactory',
        '$state',
        'messages',
        'YES_NO',
        '$rootScope',
        'updatePepDataService',
        'personCodeService',
        'assignmentCardService',
        'validationCardKeyService',
        'sweet',
        '$timeout',
        'cierreForzosoService'
    ];

    function customerForeignCurrencyController(
        CATALOG, 
        catalogService,
        modalFactory,
        $state,
        messages,
        YES_NO,
        $rootScope,
        updatePepDataService,
        personCodeService,
        assignmentCardService,
        validationCardKeyService,
        sweet,
        $timeout,
        cierreForzosoService
        ) {

        var vm = this;
        $rootScope.globalUserJSon;
      /*  $rootScope.dataFormCustomerForeignCurrency = {};
        $rootScope.since = {/*Definición de la variable global que indica de que vista origen viene el usuario */
        /*    'home' : false,
            'client' : false,
            'jobsData' : false,
            'foreignCurrency' : false
        }; */
        /**
         *  @ngdoc property
         *  @name kinships
         *  @propertyOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Valores posibles de respuesta para los desplegables de lazos con el gobierno
         */
        vm.kinships = [];
        var  proyect = 'CreationAccoun';
        localStorage.setItem("Proyecto", proyect); 
        /**
         *  @ngdoc property
         *  @name viewModelForeignCurrency
         *  @propertyOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Objeto para conocer las respuestas a las preguntas del formulario.
         */
        vm.viewModelForeignCurrency = {
            optionForeignCurrency : {     
                export : null,
                foreignExchange : null,
                import : null,
                investments : null,
                loans : null,
                others : null,
                othersDetail : '',
                remittances : null,
                services : null
            },
            tranInForeignCurrency : null
        };

        /**
         *  @ngdoc property
         *  @name optionsYesNo
         *  @propertyOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Valores de las respuestas posibles en los desplegables para moneda extranjera.
         */
        vm.optionsYesNo = [];

        /**
         *  @ngdoc property
         *  @name formCustomerForeignCurrency
         *  @propertyOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Formulario de el manejo de moneda extranjera.
         */
        vm.formCustomerForeignCurrency = false;
        /**
         *  @ngdoc property
         *  @name submitted
         *  @propertyOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Guarda el estado si el formulario ya ha sido ejecutado.
         */
        vm.submitted = false;
        /**
         *  @ngdoc property
         *  @name indicatorSiebel
         *  @propertyOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Variable que nos indica si la información se guardó correctamente en siebel, 
         *  de no ser así entonces vuelve a llamar al servicio.
         */
        vm.indicatorSiebel = "0";

        /* Metodos */
        vm.getRelationship = getRelationship;
        vm.validationData = validationData;

        /* Funciones */
        vm.modalCancel = modalCancel;
        vm.saveCustomerForeignCurrency = saveCustomerForeignCurrency;
        vm.generatePersonCode = generatePersonCode; 
        vm.assigmentCardKey = assigmentCardKey;
        vm.modalPrevious = modalPrevious;
        

        /**
         *  @ngdoc function
         *  @name getRelationship
         *  @methodOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Función que carga todos los parentescos desde el catalogo de servicios
         */
        function getRelationship() {
            catalogService.getCatalog(CATALOG.RELATIONSHIP_TYPE)
                .then(
                    function (response) {
                        vm.kinships = response.data;
                    }
                );
        }

        /**
         *  @ngdoc function
         *  @name getTaskYesNo
         *  @methodOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Cargamos los valores de los desplegables 
         *  Para cuando el cliente realiza movimientos con moneda extranjera.
         */
        function getTaskYesNo() {
            catalogService.getCatalog(CATALOG.TASK_YES_NO)
                .then(
                    function (response) {
                        if(response.success) {
                            vm.optionsYesNo = response.data;
                            vm.viewModelForeignCurrency.tranInForeignCurrency = vm.optionsYesNo[0].id;
                            vm.viewModelForeignCurrency.optionForeignCurrency.export = vm.optionsYesNo[0].id;
                            vm.viewModelForeignCurrency.optionForeignCurrency.foreignExchange = vm.optionsYesNo[0].id;
                            vm.viewModelForeignCurrency.optionForeignCurrency.import = vm.optionsYesNo[0].id;
                            vm.viewModelForeignCurrency.optionForeignCurrency.investments = vm.optionsYesNo[0].id;
                            vm.viewModelForeignCurrency.optionForeignCurrency.loans = vm.optionsYesNo[0].id;
                            vm.viewModelForeignCurrency.optionForeignCurrency.others = vm.optionsYesNo[0].id;
                            vm.viewModelForeignCurrency.optionForeignCurrency.othersDetail = '';
                            vm.viewModelForeignCurrency.optionForeignCurrency.remittances = vm.optionsYesNo[0].id;
                            vm.viewModelForeignCurrency.optionForeignCurrency.services = vm.optionsYesNo[0].id;
                        }
                    }
                );
        }

        /**
         *  @ngdoc method
         *  @name validationData
         *  @methodOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Valida el formulario antes de ir a la siguiente pantalla.
         */
        function validationData() {
            
            var areAllNot = true;
            vm.submitted = true;


            if(vm.formCustomerForeignCurrency.$valid) {
                if(vm.viewModelForeignCurrency.tranInForeignCurrency === vm.optionsYesNo[1].id) {
                    for (var item in vm.viewModelForeignCurrency.optionForeignCurrency) {
                        if(vm.viewModelForeignCurrency.optionForeignCurrency[item] === vm.optionsYesNo[1].id) {
                            areAllNot = false;
                        }
                    }
                    if(areAllNot) {
                        modalFactory.warning(messages.modals.error.questionPositive); 
                    } else {
                        saveCustomerForeignCurrency();
                        generatePersonCode();
                    }
                } else {
                    saveCustomerForeignCurrency();
                    generatePersonCode();
                }
            } else {
                modalFactory.warning(messages.modals.error.completeRequiredFields); 
            }
        }

        /**
         *  @ngdoc method
         *  @name saveCustomerForeignCurrency
         *  @methodOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Metodo para actualizar los datos de moneda extranjera y PEP del cliente.
         */
        function saveCustomerForeignCurrency() {
            var jsonForeignCurrency = {}; /*Objeto json donde se almacenana los datos de moneda extranjera y pep del cliente */
            
            jsonForeignCurrency.documentNumber = $rootScope.customerDataCredit.numberIdentification;
            /*-----¿Es o ha sido Funcionario del Gobierno (Políticamente Expuesto)?-----*/
            if(vm.viewModelForeignCurrency.interviewPEP===YES_NO.YES){
                jsonForeignCurrency.isGovOfficer = '1';
            }
            if(vm.viewModelForeignCurrency.interviewPEP===YES_NO.NO){
                jsonForeignCurrency.isGovOfficer = '0';
            }
            /*-----¿Tiene algún parentesco o relación con algún funcionario del Gobierno (Políticamente Expuesto)?-----*/
            if(vm.viewModelForeignCurrency.relationshipPEP===YES_NO.YES){
                jsonForeignCurrency.isRelacionatedGovOfficer = '1';
            }
            if(vm.viewModelForeignCurrency.relationshipPEP===YES_NO.NO){
                jsonForeignCurrency.isRelacionatedGovOfficer = '0';
            }
            /*-----¿Piensa realizar operaciones en moneda extranjera?-----*/
            if(vm.viewModelForeignCurrency.tranInForeignCurrency===YES_NO.YES){
                jsonForeignCurrency.hasOperationForeignCurrency = '1';
            }
            if(vm.viewModelForeignCurrency.tranInForeignCurrency===YES_NO.NO){
                jsonForeignCurrency.hasOperationForeignCurrency = '0';
            }
            /*-----Importaciones-----*/
            if(vm.viewModelForeignCurrency.optionForeignCurrency.import===YES_NO.YES){
                jsonForeignCurrency.hasImport = '1';
            }
            if(vm.viewModelForeignCurrency.optionForeignCurrency.import===YES_NO.NO){
                jsonForeignCurrency.hasImport = '0';
            }
            /*-----Exportaciones-----*/
            if(vm.viewModelForeignCurrency.optionForeignCurrency.export===YES_NO.YES){
                jsonForeignCurrency.hasExport = '1';
            }
            if(vm.viewModelForeignCurrency.optionForeignCurrency.export===YES_NO.NO){
                jsonForeignCurrency.hasExport = '0';
            }
            /*-----Inversiones-----*/
            if(vm.viewModelForeignCurrency.optionForeignCurrency.investments===YES_NO.YES){
                jsonForeignCurrency.hasInvesment = '1';
            }
            if(vm.viewModelForeignCurrency.optionForeignCurrency.investments===YES_NO.NO){
                jsonForeignCurrency.hasInvesment = '0';
            }
            /*-----Envío / Recepción de Remesas-----*/
            if(vm.viewModelForeignCurrency.optionForeignCurrency.remittances===YES_NO.YES){
                jsonForeignCurrency.hasConsingment = '1';
            }
            if(vm.viewModelForeignCurrency.optionForeignCurrency.remittances===YES_NO.NO){
                jsonForeignCurrency.hasConsingment = '0';
            }
            /*-----Pago de Servicios-----*/
            if(vm.viewModelForeignCurrency.optionForeignCurrency.services===YES_NO.YES){
                jsonForeignCurrency.hasServicePayment = '1';
            }
            if(vm.viewModelForeignCurrency.optionForeignCurrency.services===YES_NO.NO){
                jsonForeignCurrency.hasServicePayment = '0';
            }
            /*-----Pago de Préstamos-----*/
            if(vm.viewModelForeignCurrency.optionForeignCurrency.loans===YES_NO.YES){
                jsonForeignCurrency.hasLoanPayment = '1';
            }
            if(vm.viewModelForeignCurrency.optionForeignCurrency.loans===YES_NO.NO){
                jsonForeignCurrency.hasLoanPayment = '0';
            }
            /*-----Compra /Venta Divisas-----*/
            if(vm.viewModelForeignCurrency.optionForeignCurrency.foreignExchange===YES_NO.YES){
                jsonForeignCurrency.hasPurchaseSaleForeignExchange = '1';
            }
            if(vm.viewModelForeignCurrency.optionForeignCurrency.foreignExchange===YES_NO.NO){
                jsonForeignCurrency.hasPurchaseSaleForeignExchange = '0';
            }
            /*-----Otras-----*/
            if(vm.viewModelForeignCurrency.optionForeignCurrency.others===YES_NO.YES){
                jsonForeignCurrency.hasOtherForeignExchange = '1';
            }
            if(vm.viewModelForeignCurrency.optionForeignCurrency.others===YES_NO.NO){
                jsonForeignCurrency.hasOtherForeignExchange = '0';
            }

            jsonForeignCurrency.relationGovOfficer = vm.viewModelForeignCurrency.typeRelationship;
            jsonForeignCurrency.nameLastnamePEPOfficer = vm.viewModelForeignCurrency.namePEP;
            jsonForeignCurrency.positionPEPOfficer = vm.viewModelForeignCurrency.cargaPEP;
            jsonForeignCurrency.hasOtherOperationForeignCurrency = vm.viewModelForeignCurrency.optionForeignCurrency.othersDetail;
            
            /*Llamos al servicio que actualiza los datos basicos del cliente */
            updatePepDataService.putforeignCurrencyPepData(jsonForeignCurrency);

            /*GUARDAR DATOS EN EL OBJETO GLOBAL*/

            $rootScope.globalUserJSon.isGovOfficer = jsonForeignCurrency.isGovOfficer;
            $rootScope.globalUserJSon.isRelacionatedGovOfficer = jsonForeignCurrency.isRelacionatedGovOfficer;
            $rootScope.globalUserJSon.hasOperationForeignCurrency = jsonForeignCurrency.hasOperationForeignCurrency;
            $rootScope.globalUserJSon.hasImport = jsonForeignCurrency.hasImport;
            $rootScope.globalUserJSon.hasExport = jsonForeignCurrency.hasExport;
            $rootScope.globalUserJSon.hasInvesment = jsonForeignCurrency.hasInvesment;
            $rootScope.globalUserJSon.hasConsingment = jsonForeignCurrency.hasConsingment;
            $rootScope.globalUserJSon.hasServicePayment = jsonForeignCurrency.hasServicePayment;
            $rootScope.globalUserJSon.hasLoanPayment = jsonForeignCurrency.hasLoanPayment;
            $rootScope.globalUserJSon.hasPurchaseSaleForeignExchange = jsonForeignCurrency.hasPurchaseSaleForeignExchange;
            $rootScope.globalUserJSon.hasOtherForeignExchange = jsonForeignCurrency.hasOtherForeignExchange;
            $rootScope.globalUserJSon.relationGovOfficer = jsonForeignCurrency.relationGovOfficer;
            $rootScope.globalUserJSon.nameLastnamePEPOfficer = jsonForeignCurrency.nameLastnamePEPOfficer;
            $rootScope.globalUserJSon.positionPEPOfficer = jsonForeignCurrency.positionPEPOfficer;
            $rootScope.globalUserJSon.hasOtherOperationForeignCurrency = jsonForeignCurrency.hasOtherOperationForeignCurrency;
            
            /*localStorage.setItem("JSON", $rootScope.globalUserJSon);
            localStorage.setItem("JSON", JSON.stringify($rootScope.globalUserJSon));*/

            var data = JSON.stringify($rootScope.globalUserJSon);
            console.log(data);
            var JSonCierreForzoso = {
                "data": data,
                "documentNumber": $rootScope.globalUserJSon.documentNumber,
                "userName":"AM029969",
                "customerFlowType":"1"
            }

            cierreForzosoService.addCierreForzoso(JSonCierreForzoso);

            /***********************************/
        }

         /**
         *  @ngdoc method
         *  @name generatePersonCode
         *  @methodOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Metodo para generar el codigo de la persona en siebel
         */    
        function generatePersonCode() {
            var json = {};
            if ($rootScope.dataUser.typeDocument === undefined){ 
                var jsonData = {}; 
                var dataSiebel = localStorage.getItem("dataSiebel");
                if(dataSiebel === "true"){
                    jsonData = JSON.parse(localStorage.getItem("jsonDataClient"));
                    json.documentType = jsonData.typeDocument;
                }else {
                    jsonData = JSON.parse(localStorage.getItem("jsonData"));
                    json.documentType = jsonData.typeDocument;
                }
            }else {
                json.documentType = $rootScope.dataUser.typeDocument;
            }               
            json.documentNumber = $rootScope.customerDataCredit.numberIdentification;
            json.userName = $rootScope.dataUser.userName;

            personCodeService.generatePersonCode(json)
             .then(
                    function (response) {
                        if (response.success) {
                            $rootScope.dataFormCustomerForeignCurrency.customerNumber = response.data.customerNumber;
                            $rootScope.dataFormCustomerForeignCurrency.personNumber = response.data.personNumber;
                            assigmentCardKey();
                        }else{
                            var validclientTc = localStorage.getItem("validclientTc");
                            if (validclientTc === 'validclientTc'){
                                //window.location.href = "/wps/portal/ptd/secciontc/originaciontc";
                                window.location.href = "../../_dev/index.html";
                            }else{
                                modalFactory.error(response.error.message);
                            }
                             
                        }
                        
                    }
                );
            
        }

        /**
         *  @ngdoc method
         *  @name assigmentCardKey
         *  @methodOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Metodo para asiganar y activar tarjeta de clave al cliente
         */    
        function assigmentCardKey() {
             var json = {};
            if ($rootScope.dataUser.typeDocument === undefined){ 
                var jsonData = {}; 
                var dataSiebel = localStorage.getItem("dataSiebel");
                if(dataSiebel === "true"){
                    jsonData = JSON.parse(localStorage.getItem("jsonDataClient"));
                    json.documentType = jsonData.typeDocument;
                }else {
                    jsonData = JSON.parse(localStorage.getItem("jsonData"));
                    json.documentType = jsonData.typeDocument;
                }
            }else {
                json.documentType = $rootScope.dataUser.typeDocument;
            }  
             json.documentNumber = $rootScope.customerDataCredit.numberIdentification;
             json.userName = $rootScope.dataUser.userName;
             json.indicatorSiebel = vm.indicatorSiebel;

            assignmentCardService.getKeyCard(json)
             .then(
                    function (response) {
                        if (response.success) {
                            if(angular.isDefined(response.data.cardNumber)){
                                $rootScope.dataFormCustomerForeignCurrency.cardKey = response.data.cardNumber;
                            }
                            vm.indicatorSiebel = response.data.indicatorSiebel;
                            if (vm.indicatorSiebel === "1") {

                                sweet.show({
                                    title: messages.modals.warning.modeltitleError,
                                    text: messages.modals.error.errorCustomerSiebel,
                                    type: messages.modals.warning.modalTypeError,
                                    showCancelButton: true,
                                    cancelButtonText: messages.modals.warning.modalCancelButton,
                                    confirmButtonColor: messages.modals.warning.modalColorButton,
                                    confirmButtonText: messages.modals.warning.modalConfirText,
                                    closeOnConfirm: true
                                }, function () {
                                    $timeout(function () {
                                        //la funcion se llama a si misma para volver a enviar el servicio
                                        assigmentCardKey();
                                    }, 0);
                                });

                            } else {
                                $state.go('customerConfirmation');
                            }


                        } else {
                            modalFactory.error(response.error.message);


                            vm.indicatorSiebel = response.data.indicatorSiebel;
                            if (vm.indicatorSiebel === "1") {

                                sweet.show({
                                    title: messages.modals.warning.modeltitleError,
                                    text: messages.modals.error.errorCustomerSiebel,
                                    type: messages.modals.warning.modalTypeError,
                                    showCancelButton: true,
                                    cancelButtonText: messages.modals.warning.modalCancelButton,
                                    confirmButtonColor: messages.modals.warning.modalColorButton,
                                    confirmButtonText: messages.modals.warning.modalConfirText,
                                    closeOnConfirm: true
                                }, function () {
                                    $timeout(function () {
                                        //la funcion se llama a si misma para volver a enviar el servicio
                                        assigmentCardKey();
                                    }, 0);
                                });

                            } else {
                                $state.go('customerConfirmation');
                            }

                        }
                        
                    }
                );
            
        }



        /**
         *  @ngdoc method
         *  @name init
         *  @methodOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Iniciamos la carga de los datos para el formulario.
         */
        function init() {
            getRelationship();
            getTaskYesNo();
        }

        init();
        return vm;

        /**
         * Función para abrir el modal de cancelar
         */
        function modalCancel() {
           modalFactory.cancel();
        }

                /**
         *  @ngdoc function
         *  @name modalPrevious
         *  @methodOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Abre el modal que le pregunta al usuario si desea volver a la pantalla anterior
         */
        function modalPrevious(){
                sweet.show({
                title: messages.modals.warning.modaltitleWarning,
                text: messages.modals.warning.modalTextPrevious,
                type: messages.modals.warning.modalTypeWarning,
                showCancelButton: true,
                cancelButtonText: messages.modals.warning.modalCancelButton,
                confirmButtonColor: messages.modals.warning.modalColorButton,
                confirmButtonText: messages.modals.warning.modalConfirText,
                closeOnConfirm: true
            }, function () {
                $timeout(function () {
                    //Indicamos que se viene de la vista de foreignCurrency para cargar los datos basicos del cliente
                    $rootScope.since.foreignCurrency = true ;
                    //Redireccionamos a la vista de datos laborales del cliente 
                    $state.go('customerJobsData');
                }, 300);
            });
        }
    }
})();
