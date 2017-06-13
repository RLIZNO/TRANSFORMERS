(function () {
    'use strict';

    angular
        .module('formalizationModule')
        .controller('formalizationController', formalizationController);

    //Inyeccion de dependencias
    formalizationController.$inject = [
        'sweet',
        '$state',
        '$rootScope',
        'validationClientService',
        'modalFactory',
        'SELECT_DEFAULT',
        'ngXml2json',
        'catalogService',
        'URL',
        'catalogComplexService',
        'CATALOG',
        'messages',
        '$scope',
        'creditBureauService',
        'creditListService',
        'validationCardKeyServ',
        'validationUserService',
        'printCardService',
        '$filter',
        '$timeout',
        '$interval',
        'addTableService'
    ];

    function formalizationController(
        sweet,
        $state,
        $rootScope,
        validationClientService,
        modalFactory,
        SELECT_DEFAULT,
        ngXml2json,
        catalogService,
        URL,
        catalogComplexService,
        CATALOG,
        messages,
        $scope,
        creditBureauService,
        creditListService,
        validationCardKeyServ,
        validationUserService,
        printCardService,
        $filter,
        $timeout,
        $interval,
        addTableService
    ) {
        var vm = this;
        //variables
        vm.pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+";
        vm.popupDatePassport = { /*Boolean que abre y cierra el datepicker de fecha de pasaporte */
            opened: false
        };
        var JSONCF = {};
        vm.viewModelmoldedFormalization = {
            typeIdentification: SELECT_DEFAULT.TYPE_DOCUMENTS,
            positionValue: '',
            transactionsAch: ''
        };
        vm.countryRd = '';
        vm.countries = []; /*Array con toda la lista de paises */
        vm.optionsYesNo = [];
        // variable de username quemado
        vm.username = $rootScope.dataUser.userName;
        vm.specialCharacterError = "Este campo no permite caracteres especiales"; 

        //funciones
        vm.modalCancel = modalCancel;
        vm.validAcen = validAcen;
        vm.getTypeDStatus = getTypeDStatus;
        vm.openDatePassport  = openDatePassport;
        vm.validAcen2 = validAcen2;
        vm.getValidPlace = getValidPlace;
        vm.getCountries = getCountries;
        vm.getCitiesResidences = getCitiesResidences;
        vm.getMunicipalities = getMunicipalities;
        vm.getSectors = getSectors;
        vm.getPlaces = getPlaces;
        vm.validServiMega = vm.validServiMega;
        vm.viewModelmoldedFormalization.basicData = {
            cedula: null,
            firstLastName: null
        };

        /* NUEVAS FUNCIONES */
        
        vm.validateClient = validateClient;
        vm.resetData = resetData;
        vm.modalError = modalError;
        vm.clientCanContinue = false;
        vm.nameUser="";
        vm.loadSelect=loadSelect;
        //vm.getvalidateClientCreditCard = getvalidateClientCreditCard;
        vm.validAdi = validAdi;
        
        vm.nameUser="";
        vm.namePlastic2 = "";
        vm.landLine = "";
        vm.sex = "";
        vm.BornCity = "";
        vm.nationality = "";
        vm.datePassport = "";
        vm.email = "";
        vm.myDate = "";
        vm.cellphone= "";
        vm.nacionalidad= document.getElementById("nacionalidad");
        vm.genderSelect = document.getElementById("gender");
        vm.validAditional = validAditional;
        vm.aggAditional = false;
        vm.dataEmbozado = {};
        vm.megaService = true;
        vm.functionAditional = true;
        vm.typeProducCinco = typeProducCinco;
        vm.validDataAdicional = validDataAdicional;
        
        vm.positionCard="";
        $rootScope.globalUserJSon = [];
         var JSONCF = [];
    
        var cierreForzosoIdCA = localStorage.getItem('cierreForzosoIdCA');

        addTableService.getcierreForzosoTC(cierreForzosoIdCA).then(      
                function(response){
                    $rootScope.globalUserJSon = response.data;
                    JSONCF = JSON.parse($rootScope.globalUserJSon.json);
                    console.log(JSONCF);
                    loadSelect();
                    vm.viewModelmoldedFormalization.namePlastic = JSONCF.firstName + " " + JSONCF.firstLasname;
                        // Servicio para numero tarjeta de credito
                        creditBureauService.getValidCientExisting(2 , JSONCF.documentNumber, vm.username).then(
                            function(response){
                                JSONCF.keyCardNumber = response.keyCardNumber;
                                vm.viewModelmoldedFormalization.keyCardNumber = response.keyCardNumber;
                            }
                        );
                }
        );

        catalogService.getCatalogBin(URL.CATALOG_BIN).then(
        function (response) {
            vm.productTyoe = response.data.List;
        });


        vm.validateKeyCard = validateKeyCard;
        vm.validImpre = validImpre;
        vm.printCard = vm.printCard;




        function validImpre(){
            resetData();
            validationCardKeyServ.getPositionKeyCard(JSONCF.documentNumber).then(
                function(response){
                    vm.positionCard = response.data.positionId;
                }
            );
            
            //window.location.href = "#/result";
            var modal = document.getElementById('myModal');
            var btnClose = document.getElementById('formPrint');
            var loading = document.getElementById("loader");
            
            var span = document.getElementsByClassName("close")[0];

            modal.style.display = "block";

            span.onclick = function() {
                modal.style.display = "none";
                vm.submitted = false;
                vm.formNewInvalid =  false;
            }

            btnClose.onclick = function() {
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

        function typeProducCinco(){
            /*Recoremos todos las profesiones para capturar el id de la profesion seleccionada */
            angular.forEach(vm.productTyoe, function (value, key) {
                if (value.productCode === vm.viewModelmoldedFormalization.typeProduct) {
                    vm.typeDocumentSiebel = value.description;
                }
            });
        }

        function validateKeyCard(){
            resetData();
            var jsonValKeyCard = {
                "documentNumber": JSONCF.documentNumber,
                "positionId":vm.positionCard, 
                "positionValue": vm.viewModelmoldedFormalization.positionValueInput
            };

            validationCardKeyServ.validationCardKey(jsonValKeyCard).then(
                function(response){
                    var count = 0;
                    if (response.success == true && count < 3) {
                            sweet.show({
                            title: 'Exito',
                            text: messages.modals.success.codeCorrect,
                            type: 'success',
                            confirmButtonText: 'Ok',
                            closeOnConfirm: true
                        }, function () {
                            $timeout(function () {
                                var modal = document.getElementById('myModal');
                                modal.style.display = "none";
                                printCard();  
                            }, 0);
                        });     
                    } else {
                        modalFactory.error(messages.modals.error.codeIncorrect);
                        count++;
                    }
                }
            );
        }


        function printCard(){
            
            vm.printCardValid =  false;
            var contador = 0;
            var jsonPrint = {
              "flowStepId": $rootScope.globalUserJSon.id,
              "printer": $rootScope.globalUserJSonPrinter, //JSON.parse($rootScope.globalUserJSon.json).printer,
              "productCode": vm.viewModelmoldedFormalization.typeProduct,
              "cardHolderName": vm.viewModelmoldedFormalization.namePlastic,
              "documentNumber": JSONCF.documentNumber,
              "additional": "N",
              "createdBy": vm.username
            }

            printCardService.printCard(jsonPrint).then( 
                function(response){
                   $timeout(function(){
                    if (response.success == true){
                    var modalStatic = document.getElementById('myModalStatic');
                    var loading = document.getElementById("loader");
                    var loadingBody = document.getElementById("loadingBody");
                    modalStatic.style.display = "block";
                            var idPrint = response.data.id;                            
                            if (contador < 14) {
                                if (!vm.printCardValid && vm.functionAditional){
                                  vm.peticion = function(){
                                        printCardService.validPrintExit(idPrint).then(function(response) {
                                        $timeout(function(){
                                                loading.style.display = "block"; 
                                                loadingBody.style.display = "block"; 
                                                var requestCode = response.responseCode;
                                                $rootScope.globalUserJSon.cardHolderName = response.cardHolderName;
                                                $rootScope.globalUserJSon.creditCardNumber = response.creditCardNumber;
                                                $rootScope.globalUserJSon.productCode = response.productCode;
                                                contador ++;
                                                console.log('respuesta de la impre-------');
                                                console.log(response);
                                                if (requestCode !== ""){
                                                if(requestCode === "000"){  
                                                    vm.printCardValid =  true;
                                                    vm.functionAditional = false;
                                                    loading.style.display = "none";
                                                    loadingBody.style.display = "none"; 
                                                    modalStatic.style.display = "none"; 
                                                    $interval.cancel(increaseCounter);
                                                    if (vm.megaService) {
                                                        if (vm.viewModelmoldedFormalization.aditional === "S"){                                                                                        
                                                                sweet.show({
                                                                    title: '',
                                                                    text: "La tarjeta principal fue impresa correctamente. Ahora procederemos a imprimir la tarjeta adicional.",
                                                                    type: 'success',
                                                                    confirmButtonText: 'Ok',
                                                                    closeOnConfirm: true
                                                                }, function () {
                                                                    $timeout(function () {
                                                                        validAdi(); 
                                                                    }, 0);
                                                                });    
                                                            
                                                        }else {
                                                                sweet.show({
                                                                    title: '',
                                                                    text: "La tarjeta fue impresa correctamente. Ahora procederemos a validar los contratos.",
                                                                    type: 'success',
                                                                    confirmButtonText: 'Ok',
                                                                    closeOnConfirm: true
                                                                }, function () {
                                                                    $timeout(function () {
                                                                        validServiMega();
                                                                        validDataAdicional(); 
                                                                    }, 0);
                                                                });
                                                            vm.megaService = false;
                                                            contador = 15;
                                                        }
                                                    }
                                                                                                         
                                                }
                                                else 
                                                    if (requestCode !== "000"){
                                                        loading.style.display = "none"; 
                                                        loadingBody.style.display = "none"; 
                                                        modalStatic.style.display = "none";
                                                        modalFactory.error(response.responseDescription);
                                                        contador = 15;
                                                        vm.megaService = false;
                                                   }
                                                }
                                        }, 0);
                                        
                                    }, modalError);    
                                  };                                 
                                }
                            }   else {
                                vm.printCardValid =  true;
                                $interval.cancel(increaseCounter);
                                loading.style.display = "none"; 
                                loadingBody.style.display = "none"; 
                                modalStatic.style.display = "none";
                            }       
                         loading.style.display = "none"; 
                         loadingBody.style.display = "none"; 
                            var increaseCounter = $interval(function() {  
                                if(contador < 14){
                                    vm.peticion();
                                }                         
                            },20000); 
                    }else {
                        modalFactory.error(response.error.message);
                    } 
                   }, 0);   
           
                                 
                }
            );
        }
        
        function validDataAdicional(){
            vm.viewModelmoldedFormalization.typeProduct
        }

        function validAdi(){
            
            vm.printCardValid =  false;
            vm.functionAditional = false;
            var contador = 0;
            var jsonPrint = {
              "flowStepId": $rootScope.globalUserJSon.id,
              "printer": $rootScope.globalUserJSonPrinter, //JSON.parse($rootScope.globalUserJSon.json).printer,
              "productCode": vm.viewModelmoldedFormalization.typeProduct,
              "cardHolderName": vm.viewModelmoldedFormalization.namePlastic2,
              "documentNumber": JSONCF.documentNumber,
              "additional": "S",
              "createdBy": vm.username
            }

            printCardService.printCard(jsonPrint).then( 
                function(response){
                   $timeout(function(){
                    if (response.success == true){
                        var loading = document.getElementById("loader");
                        var loadingBody = document.getElementById("loadingBody");
                        if (response.success == true) {
                            loading.style.display = "block"; 
                            loadingBody.style.display = "block"; 
                            var promise; 
                            var myVar;
                            var increaseCounter = function () {
                            myVar = setTimeout(showPage, 20000);
                            
                            function showPage() {
                                loading.style.display = "block";
                                loadingBody.style.display = "block";  
                                console.log('Loading...')
                                var idPrintAdi = response.data.id;
                                
                                if (contador < 14) {
                                    if (!vm.printCardValid){
                                        printCardService.validPrintExit(idPrintAdi).then(function(response) {
                                            $timeout(function(){
                                                    var requestCode = response.responseCode;
                                                    $rootScope.globalUserJSon.cardHolderNameAdi = response.cardHolderName;
                                                    $rootScope.globalUserJSon.creditCardNumberAditional = response.creditCardNumber;
                                                    $rootScope.globalUserJSon.productCodeAdi = response.productCode;
                                                    $rootScope.globalUserJSon.nameAdicional = vm.viewModelmoldedFormalization.namePlastic2;
                                                    contador ++;
                                                    console.log('respuesta de la impre-------');
                                                    console.log(response);
                                                    if(requestCode !== ""){  
                                                        vm.printCardValid =  true;
                                                        loading.style.display = "none";
                                                        loadingBody.style.display = "none";  
                                                    /* $rootScope.globalUserJSon.idRf = response.data.flowStepId;
                                                        $rootScope.globalUserJSon.additional = response.data.additional;
                                                        $rootScope.globalUserJSon.nrTa = response.data.creditCardNumber;*/
                                                        $interval.cancel(promise);
                                                        if (vm.megaService) {
                                                            sweet.show({
                                                                title: '',
                                                                text: "La tarjeta adicional fue impresa correctamente. Ahora procederemos a validar los contratos.",
                                                                type: 'success',
                                                                confirmButtonText: 'Ok',
                                                                closeOnConfirm: true
                                                            }, function () {
                                                                $timeout(function () {
                                                                    validServiMega(); 
                                                                }, 0);
                                                            });
                                                            contador = 15;                                                        
                                                        }
                                                                                                            
                                                    }
                                                    else {

                                                    }
                                            }, 0);
                                            
                                        }, modalError);                                    
                                    }
                                }   else {
                                    vm.printCardValid =  true;
                                    $interval.cancel(promise);
                                    //modalFactory.success(messages.modals.error.printError);
                                    loading.style.display = "none"; 
                                    loadingBody.style.display = "none"; 
                                }       
                            }
                            loading.style.display = "none"; 
                            loadingBody.style.display = "none"; 
                            }
                            promise =  $interval(increaseCounter, 20000);     
                        }else {
                            modalFactory.success(messages.modals.error.printError);
                            loading.style.display = "none"; 
                            loadingBody.style.display = "none"; 
                        }    
                    }else {
                        modalFactory.error(response.error.message);
                    }                    
                   }, 0);           
                }
            );
        }
        
        


        function validServiMega() {
            var jsonMega = {
                "idCustomerStepFlow":$rootScope.globalUserJSon.id,
                "DAC": {
                    "idCustomerFlowStep" : $rootScope.globalUserJSon.id,
                    "campaignId":JSONCF.idCampaign, 
                    "userName": vm.username,
                    "contactId": JSONCF.idClientSiebel, // consulta de siebel
                    "creditCardNumber":$rootScope.globalUserJSon.creditCardNumber, // tarjeta de credito
                    "customerName": JSONCF.firstName + " " +  JSONCF.firstLasname,
                    "documentNumber": JSONCF.documentNumber,
                    "productType":"Tarjetas de Credito",
                    "limitRD":JSONCF.dopLimit,
                    "limitUSD":JSONCF.usdLimit,
                    "agency":$rootScope.dataUser.sucursal, // sucursal user
                    "productName":vm.typeDocumentSiebel, // gn - gr
                    "deferred":JSONCF.deferred,
                    "nationality":JSONCF.addressList[0].country.value,                    
                    "birthDate": $filter('date')(JSONCF.birthDate, 'yyyy-MM-dd'),
                    "civilStatus": JSONCF.civilState,
                    "sex": JSONCF.sex,
                    "profession": "EMPLEADO",
                    "academicLevel": "UNIVERSITARIO", // Observar
                    "decisionCredit":JSONCF.decisionMessage, // decision pre
                    "isFico":false, // pasa por fico
                    "incomes":"", // reporte
                    "houseType":"", // campo fico
                    "houseTime":"", // campo fico
                    "contractDate":"" // fecha fico
                },
                "AcknowledgmentReceipt":{
                    "idCustomerFlowStep" : $rootScope.globalUserJSon.id,
                    "userName":vm.username,
                    "productType":"Tarjetas de Credito",
                    "phone":JSONCF.cellPhone, // tel user
                    "address":JSONCF.addressList[0].street, // dire
                    "principalCardNumber":$rootScope.globalUserJSon.creditCardNumber,
                    "additionalCardNumber":"N", // # campo adit
                    "office": $rootScope.dataUser.sucursal, //sucursalcode username
                    "billingCycle":"MENSUAL",
                    "receptorName":JSONCF.firstName + " " +  JSONCF.firstLasname,
                    "documentNumber":JSONCF.documentNumber,
                    "bankAssesor":$rootScope.dataUser.userNameDescription, // userName
                    "customerName":JSONCF.firstName + " " +  JSONCF.firstLasname,
                    "customerBeneficiary": "",// nombre adit,
                    "receptorFirm":vm.viewModelmoldedFormalization.keyCardNumber +"-"+vm.positionCard /// numero tarjeta de clave - cordenada
                },
                "TARIFF": {
                    "billfoldType": "Tarjetas de Credito",
                    "accountNumber": $rootScope.globalUserJSon.creditCardNumber, // numero tarjeta de credito
                    "customerNumber": JSONCF.clientNumber, // dato siebel
                    "documentNumber": JSONCF.documentNumber, // dato de siebel
                    "userCreatorName": $rootScope.dataUser.userNameDescription,
                    "agreement": "OK",
                    "customerName": JSONCF.firstName + " " +  JSONCF.firstLasname,
                    "userName": vm.username,
                    "idCustomerFlowStep": $rootScope.globalUserJSon.id
                },
                "CONTRACT_TC": {
                    "selectedProduct": "Tarjetas de Credito",
                    "cityName": JSONCF.idBirthCity,
                    "creatorName": $rootScope.dataUser.userNameDescription,
                    "userName": vm.username,
                    "customerName": JSONCF.firstName + " " +  JSONCF.firstLasname,
                    "documentType": "CEDULA NUEVA",//JSONCF.documentType, // agregar al json
                    "documentNumber": JSONCF.documentNumber,
                    "nationality": JSONCF.nacionality,
                    "civilStatus": JSONCF.civilState,
                    "residenceAddress": JSONCF.addressList[0].street,
                    "email": JSONCF.email,
                    "phone": JSONCF.cellPhone,
                    "authenticationCode": vm.positionCard,
                    "keyCardNumber": JSONCF.keyCardNumber,
                    "idCustomerFlowStep":  $rootScope.globalUserJSon.id
                },
                "VNCAS400": {
                    "CodigoPersona": JSONCF.personNumber,
                    "CodigoPersonaAdicional": "",
                    "TipoDocumento": "CEDULA NUEVA",
                    "NumeroDocumento": JSONCF.documentNumber,
                    "NumeroTarjeta": JSONCF.keyCardNumber,
                    "Sucursal": $rootScope.dataUser.sucursalId,
                    "TipoTarjeta":vm.typeDocumentSiebel,//gn - gr
                    "MarcaTarjeta": "",//
                    "Adicional": "N",
                    "TarjetaAmparadora": "",
                    "TipoDocumentoAdicional": "2",
                    "NumeroDocumentoAdicional": "",
                    "userName": vm.username,
                    "idCustomerFlowStep": $rootScope.globalUserJSon.id
                },
                "VNCAS400_ADDITIONAL": {
                    "CodigoPersona": "",
                    "CodigoPersonaAdicional": JSONCF.personNumber,
                    "TipoDocumento": "CEDULA NUEVA",
                    "NumeroDocumento": JSONCF.documentNumber,
                    "NumeroTarjeta": JSONCF.keyCardNumber,
                    "Sucursal": $rootScope.dataUser.sucursalId,
                    "TipoTarjeta": vm.typeDocumentSiebel,
                    "MarcaTarjeta": "",
                    "Adicional": "S",
                    "TarjetaAmparadora": $rootScope.globalUserJSon.creditCardNumberAditional, // numero tarjeta de credito
                    "TipoDocumentoAdicional": "CEDULA NUEVA",
                    "NumeroDocumentoAdicional": "00101044261",
                    "userName": vm.username,
                    "idCustomerFlowStep ": $rootScope.globalUserJSon.id
                },
                "ADDITIONAL_CONTACT": {
                    "IdType": "CEDULA NUEVA",
                    "IdNumber": "03103162188",
                    "firstName": "CORA",
                    "lastName": "GONZALES",
                    "birthDate": "07/29/1979",
                    "sex": "FEMENINO",
                    "maritalStatus": "SOLTERO/A",
                    "cardNumber": "4540080512264946",
                    "userName": vm.username,
                    "ProductName": " EMPLEADO VCI ",
                    " idCustomerFlowStep ": "42"
                },
                "ADDITIONAL_CONVERTION": {
                    "userName": vm.username,
                    "tarjetaPrincipal": $rootScope.globalUserJSon.creditCardNumber,
                    "tarjetaAdicional": $rootScope.globalUserJSon.creditCardNumberAditional,
                    "idCustomerFlowStep": $rootScope.globalUserJSon.id
                },
                "PERSONALIZATION_CREDIT_CARD": {
                    "cardData": [
                        {
                            "principal": true,
                            "userName": vm.username,
                            "documentType": "CEDULA NUEVA",
                            "documentNumber": JSONCF.documentNumber,
                            "customerName": JSONCF.clientNumber,
                            "firstLatName": JSONCF.firstName,
                            "secondLastName": JSONCF.secondName,
                            "brithDate": $filter('date')(JSONCF.birthDate, 'yyyy-MM-dd'),
                            "sex": JSONCF.sex,
                            "proffesion": "EMPLEADO",
                            "civilStatus": JSONCF.civilState,
                            "passport": "",
                            "monthlyIncome": JSONCF.monthlyIncomeRD,
                            "salary": JSONCF.monthlyIncomeRD,
                            "creditLimitRD": JSONCF.dopLimit,
                            "creditLimitUSD": JSONCF.usdLimit,
                            "creditLimitDeferred": JSONCF.deferred,
                            "workAddress": JSONCF.addressList[0].street,
                            "workPhone": JSONCF.companyPhone,
                            "workExtension": "",
                            "homeAddress": JSONCF.addressList[0].street,
                            "homePhone": JSONCF.cellPhone,
                            "homeExtension": "",
                            "cardNumber": vm.viewModelmoldedFormalization.keyCardNumber,
                            "idCustomerFlowStep":$rootScope.globalUserJSon.id
                        },
                        {
                            "principal": false,
                            "userName": "AM029969",
                            "documentType": "C",
                            "documentNumber": "05800243668",
                            "customerName": "Ramon",
                            "firstLatName": "Ramoncito",
                            "secondLastName": "Ramo",
                            "brithDate": "1970/03/05",
                            "sex": "MASCULINO",
                            "proffesion": "EMPLEADO",
                            "civilStatus": "Soltero",
                            "passport": "",
                            "monthlyIncome": "50000",
                            "salary": "50000",
                            "creditLimitRD": "20000",
                            "creditLimitUSD": "2000",
                            "creditLimitDeferred": "25000",
                            "workAddress": "calle falsa 123",
                            "workPhone": "1234567",
                            "workExtension": "",
                            "homeAddress": "calle falsa 123",
                            "homePhone": "1234567",
                            "homeExtension": "",
                            "cardNumber": "05800243668",
                            "idCustomerFlowStep":"42"
                        }
                ]
    }

            }  

            printCardService.servicesMega(jsonMega).then( 
                function(response){ 
                    if (response.success === true) {
                            $state.go('formalizationResult');
                        }
                }
            );
            

        }


        /**
         *  @ngdoc method
         *  @name getTypeDocuments
         *  @methodOf App.controller:validationAccountController
         *
         *  @description
         *  Funcion que permite hacer la condicin de la nacionalidad y mostrar alerta.
         */ 
        function validAditional() {
           vm.aggAditional = false;
           if (vm.viewModelmoldedFormalization.aditional == "S") {
                vm.aggAditional = true;
                vm.bornDay = document.getElementById("fechaNacimiento");
           }else {
                vm.aggAditional = false;
           }

           if ( vm.viewModelmoldedFormalization.aditional == undefined){
               vm.aggAditional = false;
           }
        }

        //var dataSiebel = localStorage.getItem("dataSiebel");   
        JSONCF = JSON.parse(localStorage.getItem("JSONCFClient"));


        function loadSelect() {
            if (JSONCF.email == undefined ){
                vm.placeSendingSlect = [
                    { value:"Casa" },
                    { value:"Trabajo" }
                ];
            }else{
                vm.placeSendingSlect = [
                    { value:"Correo" },
                    { value:"Casa" },
                    { value:"Trabajo" }
                ];
            }
        }         
        
        function getValidPlace(){

            if (vm.viewModelmoldedFormalization.palceSending.value === 'Correo') {
                vm.validCorreo = true;
                vm.viewModelmoldedFormalization.correo = JSONCF.email;
            }

            if (vm.viewModelmoldedFormalization.palceSending.value === 'Casa') {
                vm.validCorreo = false;
                vm.disableSelect = true;
                if (JSONCF.addressList[0].street === undefined) {
                    vm.viewModelmoldedFormalization.calle = '';
                } else {
                    vm.viewModelmoldedFormalization.calle = JSONCF.addressList[0].street;
                }
                
                if (JSONCF.addressList[0].number === undefined) {
                    vm.viewModelmoldedFormalization.number = '';
                } else {
                    vm.viewModelmoldedFormalization.number = parseInt(JSONCF.addressList[0].number);
                }

                if (JSONCF.addressList[0].apartmentNumber === undefined) {
                    vm.viewModelmoldedFormalization.apartament = '';
                } else {
                    vm.viewModelmoldedFormalization.apartament = JSONCF.addressList[0].apartmentNumber;
                }

                vm.viewModelmoldedFormalization.residenceCountry = parseInt(JSONCF.addressList[0].country.id);
                vm.viewModelmoldedFormalization.residenceProvince = parseInt(JSONCF.addressList[0].province.id);
                vm.viewModelmoldedFormalization.residenceMunicipality = parseInt(JSONCF.addressList[0].municipality.id);
                vm.viewModelmoldedFormalization.section = parseInt(JSONCF.addressList[0].section.id);
                vm.viewModelmoldedFormalization.place = parseInt(JSONCF.addressList[0].place.id);
                if (JSONCF.email === undefined){
                    vm.viewModelmoldedFormalization.correoCasa = '';
                }else {
                    vm.viewModelmoldedFormalization.correoCasa = JSONCF.email;
                }

                getCitiesResidences(vm.viewModelmoldedFormalization.residenceCountry);
                getMunicipalities(vm.viewModelmoldedFormalization.residenceProvince);
                getSectors(vm.viewModelmoldedFormalization.residenceMunicipality);
                getPlaces(vm.viewModelmoldedFormalization.section);  
            }

            if (vm.viewModelmoldedFormalization.palceSending.value === 'Trabajo') {
                vm.validCorreo = false;
                vm.disableSelect = true;
                if (JSONCF.street === undefined) {
                    vm.viewModelmoldedFormalization.calle = '';
                } else {
                    vm.viewModelmoldedFormalization.calle = JSONCF.street   ;
                }

                if (JSONCF.numbers === undefined) {
                    vm.viewModelmoldedFormalization.number = '';
                } else {
                    vm.viewModelmoldedFormalization.number = parseInt(JSONCF.numbers);
                }

                /*if (JSONCF.apartmentNumber === undefined) {
                    vm.viewModelmoldedFormalization.apartament = '';
                } else {
                    vm.viewModelmoldedFormalization.apartament = JSONCF.apartmentNumber;
                }*/

                vm.viewModelmoldedFormalization.residenceCountry = parseInt(JSONCF.idCountry);
                vm.viewModelmoldedFormalization.residenceProvince = parseInt(JSONCF.idProvince);
                vm.viewModelmoldedFormalization.residenceMunicipality = parseInt(JSONCF.idMunicipality);
                vm.viewModelmoldedFormalization.section = parseInt(JSONCF.idSection);
                vm.viewModelmoldedFormalization.place = parseInt(JSONCF.idPlace);  
                if (JSONCF.email === undefined){
                    vm.viewModelmoldedFormalization.correoCasa = '';
                }else {
                    vm.viewModelmoldedFormalization.correoCasa = JSONCF.email;
                }

                getCitiesResidences(vm.viewModelmoldedFormalization.residenceCountry);
                getMunicipalities(vm.viewModelmoldedFormalization.residenceProvince);
                getSectors(vm.viewModelmoldedFormalization.residenceMunicipality);
                getPlaces(vm.viewModelmoldedFormalization.section);  
            }

            if (vm.viewModelmoldedFormalization.palceSending.value === 'Otro') {
                vm.disableSelect = false;
                vm.viewModelmoldedFormalization.calle = '';
                vm.viewModelmoldedFormalization.number = '';
                vm.viewModelmoldedFormalization.apartament = '';
                vm.viewModelmoldedFormalization.residenceCountry = '';
                vm.viewModelmoldedFormalization.residenceProvince = '';
                vm.viewModelmoldedFormalization.residenceMunicipality = '';
                vm.viewModelmoldedFormalization.section = '';
                vm.viewModelmoldedFormalization.place = '';
                vm.viewModelmoldedFormalization.correoCasa = '';
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

        function validateClient()  {
            /*var keyCode = event.which || event.keyCode;
            if (keyCode === 13) {*/

          /*  var documentNumber = vm.viewModelmoldedFormalization.identificationName;
            resetData();
            validationClientService.getValidationClient(documentNumber, vm.viewModelmoldedFormalization.typeIdentification, vm.username).then(function(responseValue) {
                        $timeout(function(){
                            vm.validationClient = responseValue.validationClient;
                            validateClientCanContinue();

                            if (!vm.validationClient) {
                                getCreditBureauNoCLient();
                                getCreditListService();
                                vm.clientNo = false;
                            }
                            if (vm.validationClient) {
                                getCreditBureau();
                                getCreditListService();
                                vm.clientYes = true;
                            }
                            }, 0);
                }, modalError);

            //}*/

            var documentNumber = vm.viewModelmoldedFormalization.identificationName,
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
                    console.log(oJson);
                    clientCountry = oJson.reportecu.reporte.informacionadicional.nacionalidad;
                    /* URL que almacena el llamado al archivo XML en el servidor */

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
                    $rootScope.customerDataCredit.numberIdentification =  vm.viewModelmoldedFormalization.identificationName;
                    
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
 
                    vm.bornDay = document.getElementById("fechaNacimiento");
                    vm.datePassport = $rootScope.customerDataCredit.birthDate;
                    var convertDate = new Date(vm.datePassport); //aaaa/mm/dd
                    //var a  = $filter('date')(Date.parse(vm.dataClientExit.birthDate),'yyyy-MM-dd');
                    vm.viewModelmoldedFormalization.namePlastic2 =  $rootScope.customerDataCredit.firtsName + ' ' + $rootScope.customerDataCredit.surname;
                    vm.nameUser = $rootScope.customerDataCredit.firtsName + ' ' + $rootScope.customerDataCredit.secondName + ' ' + oJson.reportecu.clienteunico.primerapellido + ' ' + oJson.reportecu.clienteunico.segundoapellido;
                    vm.cellphoneNumb = parseInt($rootScope.customerDataCredit.mobilePhone);
                    vm.datePassport = convertDate;
                    vm.viewModelmoldedFormalization.BornCity = $rootScope.customerDataCredit.countryBirth;
                    vm.landLine = parseInt($rootScope.customerDataCredit.landLine);
                    vm.cellphoneNumb = parseInt($rootScope.customerDataCredit.mobilePhone);
                    //vm.email NO HAY EMAIL PARA EL ADICIONAL
                    /** Validaciones para el tipo de moneda en dolares, donde se ocultan los campos Compra cheques de gerencia */
                    angular.forEach(vm.typeSex, function (value, key) {
                        if (value.value === $rootScope.customerDataCredit.sex) {
                            vm.viewModelmoldedFormalization.sex = value.id;
                        }
                    });

                    /** Validaciones para el tipo de moneda en dolares, donde se ocultan los campos Compra cheques de gerencia */
                    angular.forEach(vm.nationalities, function (value, key) {
                        if (value.value === $rootScope.customerDataCredit.residenceCountry  ) {
                            vm.viewModelmoldedFormalization.nacionalidad = value.id;
                        }
                    });

                    /** Validaciones para el tipo de moneda en dolares, donde se ocultan los campos Compra cheques de gerencia */
                    angular.forEach(vm.typeStatus, function (value, key) {
                        if (value.value === $rootScope.customerDataCredit.civilStatus) {
                            vm.viewModelmoldedFormalization.status = value.id;
                        }
                    });
                }, getErrorDefault);

                if (!vm.findJudicialEvaluation) {
                    modalFactory.error(messages.modals.error.badJudicialEvaluation);
                }

            }, getErrorDefault);

        };


        /**
         *
         *
         **/

        /**
         *  @ngdoc function
         *  @name resetData
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Reinicia los valores de los datos de la pantalla
         */
        function resetData() {
            vm.viewModelmoldedFormalization.positionValueInput = "";
            vm.positionCard = "";
            vm.ageAllowed = false;
            vm.clientCanContinue = false;
            vm.findControlListReport = false;
            vm.findJudicialEvaluation = false;
            vm.validpreAprobado = false;
            vm.isDominicanRepublic = false;
            vm.findPep = false;
            vm.getBureau = false;
            vm.datePassport = '';
            vm.email = '';
            vm.myDate = '';
            vm.viewModelmoldedFormalization.status = '';
            vm.viewModelmoldedFormalization.nacionalidad = '';
            vm.viewModelmoldedFormalization.sex = '';
            vm.namePlastic2 = '';
            vm.landLine = '';
            vm.urlXml = null;
            vm.fichaBand = false;
            vm.getControlList = false;
            vm.validationClient = false;
            vm.viewModelmoldedFormalization.typeIdentification = 2;
            vm.bornDay = '';
            vm.datePassport = '';
            vm.limiteMaximoRd = '';
            vm.limiteMaximoUs = '';
            vm.clientUser = '';
            vm.decisionMoti = '';
            vm.decisionMessage = '';
        }

        resetData();


        /**
        * Función que carga todos las nacionalidades desde el catalogo de servicios
        */
       function getNationalities() {
           catalogService.getCatalog(CATALOG.NATIONALITIES)
               .then(
               function (response) {
                   vm.nationalities = response.data;
               });
       }

       /*Llamado de la función para obtener los la lista de paises*/
       getNationalities();




         function modalError(error) {
            if(error.message !== '') {
               modalFactory.error(error.message);
            } else {
               modalFactory.error(messages.modals.error.errorDefault);

            }
        }


        /**
         * 
         * Función que carga la lista de paraje, dependiendo de la sección seleccionada
         * @param {any} id
         */
        function getPlaces(id) {
            catalogComplexService.getCatalogComplex(id)
                .then(
                function (response) {
                    vm.places = response.data;
                });
        }

        /**
         * Función para cargar la lista de sectores, depeniendo del municipio seleccionado
         * @param {any} id
         */
        function getSectors(id) {
            catalogComplexService.getCatalogComplex(id)
                .then(
                function (response) {
                    vm.sectors = response.data;
                });
        }

         function getCountries(){
            catalogService.getCatalog(CATALOG.COUNTRIES)
                .then(
                function (response) {
                    vm.countries = response.data;
                    vm.countryRd = SELECT_DEFAULT.COUNTRY_RD;
                });
        }
        
        /*Llamado de la función para obtener los la lista de paises*/
        getCountries();


        /**
         * Función para cargar la lista de municipios, dependiendo de la provincia seleccionada
         * @param {any} id
         */
        function getMunicipalities(id) {
            catalogComplexService.getCatalogComplex(id)
                .then(
                function (response) {
                    vm.municipalities = response.data;
                });
        }
        /**
         * Función que carga la lista de ciudades de residencia, dependiendo del pais seleccionado
         * @param {any} id
         */
        function getCitiesResidences(id) {
            catalogComplexService.getCatalogComplex(id)
                .then(
                function (response) {
                    vm.citiesResidences = response.data;
                });
        }
        
        /**
         * Función que abre el popup del datepicker para la fecha de expedicion del pasaporte
         */
        function openDatePassport() {
            vm.popupDatePassport.opened = true;
        }


        function validAcen(){
           
           if (vm.viewModelmoldedFormalization.namePlastic){
               var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,."; 
                    replaceAll(vm.viewModelmoldedFormalization.namePlastic , 'ñ', "" );
                    replaceAll(vm.viewModelmoldedFormalization.namePlastic , 'á', "" );
                    replaceAll(vm.viewModelmoldedFormalization.namePlastic , 'é', "" );
                    replaceAll(vm.viewModelmoldedFormalization.namePlastic , 'í', "" );
                    replaceAll(vm.viewModelmoldedFormalization.namePlastic , 'ó', "" );
                    replaceAll(vm.viewModelmoldedFormalization.namePlastic , 'ú', "" );
                    function replaceAll( text, busca, reemplaza ){
                    while (text.toString().indexOf(busca) != -1) 
                            text = text.toString().replace(busca,reemplaza);
                            vm.viewModelmoldedFormalization.namePlastic= text;
                            return text;
                    
                }
                if (!/^[a-zA-Z\s]*$/.test(vm.viewModelmoldedFormalization.namePlastic)) {
                   vm.espresion = true;
                }else {
                    vm.espresion = false;
                }
           }else {
               vm.espresion = false;
           }
        
        } 

        function validAcen2(){
           
           if (vm.viewModelmoldedFormalization.namePlastic2){
               var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,."; 
                    replaceAll(vm.viewModelmoldedFormalization.namePlastic2 , 'ñ', "" );
                    replaceAll(vm.viewModelmoldedFormalization.namePlastic2 , 'á', "" );
                    replaceAll(vm.viewModelmoldedFormalization.namePlastic2 , 'é', "" );
                    replaceAll(vm.viewModelmoldedFormalization.namePlastic2 , 'í', "" );
                    replaceAll(vm.viewModelmoldedFormalization.namePlastic2 , 'ó', "" );
                    replaceAll(vm.viewModelmoldedFormalization.namePlastic2 , 'ú', "" );
                    function replaceAll( text, busca, reemplaza ){
                    while (text.toString().indexOf(busca) != -1) 
                            text = text.toString().replace(busca,reemplaza);
                            vm.viewModelmoldedFormalization.namePlastic2= text;
                            return text;
                    
                }
                if (!/^[a-zA-Z\s]*$/.test(vm.viewModelmoldedFormalization.namePlastic2)) {
                   vm.espresion2 = true;
                }else {
                    vm.espresion2 = false;
                }
           }else {
               vm.espresion2 = false;
           }
        
        } 

                /**
         *  @ngdoc function
         *  @name getTaskYesNo
         *  @methodOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Cargamos los valores de los desplegables 
         *  Para cuando el cliente desea tarjeta de debito.
         */
        function getTaskYesNo() {
            catalogService.getCatalog(CATALOG.TASK_YES_NO)
                .then(
                    function (response) {
                        vm.optionsYesNo = response.data;
                        vm.validDebitNo = vm.optionsYesNo[0].id;
                    }
                );
        }
        getTaskYesNo();

        /**
         *  @ngdoc method
         *  @name getTypeDocuments
         *  @methodOf App.controller:validationAccountController
         *
         *  @description
         *  Consulta los tipos de documentos que existen.
         */        
        function getTypeSex() {
            catalogService.getCatalog(CATALOG.SEX)
                .then(
                function (response) {
                    vm.typeSex = response.data;
                }
            );
        }

        getTypeSex();

        /**
         *  @ngdoc method
         *  @name getTypeDocuments
         *  @methodOf App.controller:validationAccountController
         *
         *  @description
         *  Consulta los tipos de documentos que existen.
         */        
        function getTypeDStatus() {
            catalogService.getCatalog(CATALOG.CIVIL_STATUS)
                .then(
                function (response) {
                    vm.typeStatus = response.data;
                }
            );
        }

        getTypeDStatus();

        function modalCancel(){
            modalFactory.cancel();
        }

  


    }
})();