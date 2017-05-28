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
        var jsonData = {};
        vm.viewModelmoldedFormalization = {
            typeIdentification: SELECT_DEFAULT.TYPE_DOCUMENTS,
            positionValue: '',
            transactionsAch: ''
        };
        vm.countryRd = '';
        vm.countries = []; /*Array con toda la lista de paises */
        vm.optionsYesNo = [];
        // variable de username quemado
        vm.username = 'AM029969';

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
        vm.viewModelmoldedFormalization.basicData = {
            cedula: null,
            firstLastName: null
        };

        /* NUEVAS FUNCIONES */
        vm.printCard = vm.printCard;
        vm.validateClient = validateClient;
        vm.resetData = resetData;
        vm.modalError = modalError;
        vm.clientCanContinue = false;
        vm.nameUser="";
        vm.getCreditBureau = getCreditBureau;
        vm.getCreditBureauNoCLient = getCreditBureauNoCLient;
        vm.getCreditListService = getCreditListService;
        vm.getvalidateClientCreditCard = getvalidateClientCreditCard;
        vm.validateKeyCard = validateKeyCard;
        vm.nameUser="";
        vm.namePlastic2 = "";
        vm.landLine = "";
        vm.sex = "";
        vm.nationality = "";
        vm.datePassport = "";
        vm.email = "";
        vm.myDate = "";
        vm.cellphone="";
        vm.nacionalidad= document.getElementById("nacionalidad");
        vm.genderSelect = document.getElementById("gender");
        vm.validAditional = validAditional;
        vm.aggAditional = false;
        vm.validImpre = validImpre;
        vm.positionCard="";
        $rootScope.globalUserJSon;

        jsonData = JSON.parse(localStorage.getItem("jsonDataClient"));

        addTableService.getcierreForzosoTC(jsonData.numberDocument).then(
            function(response){
                $rootScope.globalUserJSon = response.data;
            }
        );

        catalogService.getCatalogBin(URL.CATALOG_BIN).then(
        function (response) {
            vm.typeProduct = response.data.List;
        });

        creditBureauService.getValidCientExisting(2 , "00100038397", vm.username).then(
            function(response){
                $rootScope.globalUserJSon.keyCardNumber = response.keyCardNumber;
                vm.viewModelmoldedFormalization.keyCardNumber = response.keyCardNumber;
            }
        );


        function validImpre(){

            validationCardKeyServ.getPositionKeyCard($rootScope.globalUserJSon.documentNumber).then(
                function(response){
                    vm.positionCard = response.data.positionId;
                }
            );
            
            //window.location.href = "#/result";
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

        function validateKeyCard(){
            var jsonValKeyCard = {
                "documentNumber": "00100038397",
                "positionId":"40", 
                "positionValue": vm.viewModelmoldedFormalization.positionValueInput
            };

            validationCardKeyServ.validationCardKey(jsonValKeyCard).then(
                function(response){
                    if (response.success == true) {
                            sweet.show({
                            title: 'Exito',
                            text: messages.modals.success.codeCorrect,
                            type: 'success',
                            confirmButtonText: 'Ok',
                            closeOnConfirm: true
                        }, function () {
                            $timeout(function () {

                            }, 0);
                        });
                                var increaseCounter = function () {
                                var idPrint = 170;
                                printCardService.validPrintExit(idPrint).then(function(response) {
                                    var requestCode = response.requestCode;
                                    if(requestCode === undefined){
                                        
                                        $interval(increaseCounter, 20000); 
                                    }
                                    else {
                                        $interval.cancel(promise);
                                        printCard();
                                    }
                                }, modalError);
                            }
                            var promise = $interval(increaseCounter, 1000); 
                        
                    } else {
                        modalFactory.error(messages.modals.error.codeIncorrect);
                    }
                }
            );
        }

        function printCard(){

            var jsonPrint = {
              "flowStepId":"2",
              "printer": "CINCO",
              "productCode": vm.viewModelmoldedFormalization.typeProduct,
              "cardHolderName": "FABER",
              "documentNumber": "00100038397",
              "additional":  vm.viewModelmoldedFormalization.aditional,
              "createdBy": vm.username
            }

            printCardService.printCard(jsonPrint).then( 
                function(response){
                    if (response.success == true) {                      
                        

                    } else {
                        modalFactory.success(messages.modals.error.printError);
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
           if (vm.viewModelmoldedFormalization.aditional == vm.optionsYesNo[1].id) {
                vm.aggAditional = true;
                vm.bornDay = document.getElementById("fechaNacimiento");
           }else {
                vm.aggAditional = false;
           }

           if ( vm.viewModelmoldedFormalization.aditional == undefined){
               vm.aggAditional = false;
           }
        }

        var dataSiebel = localStorage.getItem("dataSiebel");
           if (dataSiebel === null) {

           } else {
            if(dataSiebel === "true"){
                jsonData = JSON.parse(localStorage.getItem("jsonDataClient"));
                vm.viewModelmoldedFormalization.namePlastic =  jsonData.firtsName + ' ' + jsonData.surname;
                if (jsonData.email === undefined){
                    vm.placeSendingSlect = [
                        { value:"Casa" },
                        { value:"Trabajo" },
                        { value:"Otro" }
                    ];
                }else {
                    vm.placeSendingSlect = [
                        { value:"Correo" },
                        { value:"Casa" },
                        { value:"Trabajo" },
                        { value:"Otro" }
                    ];
                    vm.viewModelmoldedFormalization.correo = jsonData.email;
                }
            }else {
                jsonData = JSON.parse(localStorage.getItem("jsonData"));
                if (jsonData === '') {
                    vm.viewModelmoldedFormalization.namePlastic =  jsonData.firtsName + ' ' + jsonData.surname;
                    if (jsonData.email === undefined){
                        vm.placeSendingSlect = [
                            { value:"Casa" },
                            { value:"Trabajo" },
                            { value:"Otro" }
                        ];
                    }else {
                        vm.placeSendingSlect = [
                            { value:"Correo" },
                            { value:"Casa" },
                            { value:"Trabajo" },
                            { value:"Otro" }
                        ];
                        vm.viewModelmoldedFormalization.correo = jsonData.email;
                    }
                }

            }

           }
            
        
        function getValidPlace(){

            if (vm.viewModelmoldedFormalization.palceSending.value === 'Correo') {
                vm.validCorreo = true;
            }

            if (vm.viewModelmoldedFormalization.palceSending.value === 'Casa') {
                vm.validCorreo = false;
                vm.disableSelect = true;
                if (jsonData.addressList[0].street === undefined) {
                    vm.viewModelmoldedFormalization.calle = '';
                } else {
                    vm.viewModelmoldedFormalization.calle = jsonData.addressList[0].street;
                }

                if (jsonData.addressList[0].number === undefined) {
                    vm.viewModelmoldedFormalization.number = '';
                } else {
                    vm.viewModelmoldedFormalization.number = parseInt(jsonData.addressList[0].number);
                }

                if (jsonData.addressList[0].apartmentNumber === undefined) {
                    vm.viewModelmoldedFormalization.apartament = '';
                } else {
                    vm.viewModelmoldedFormalization.apartament = jsonData.addressList[0].apartmentNumber;
                }

                vm.viewModelmoldedFormalization.residenceCountry = parseInt(jsonData.addressList[0].country.id);
                vm.viewModelmoldedFormalization.residenceProvince = parseInt(jsonData.addressList[0].province.id);
                vm.viewModelmoldedFormalization.residenceMunicipality = parseInt(jsonData.addressList[0].municipality.id);
                vm.viewModelmoldedFormalization.section = parseInt(jsonData.addressList[0].section.id);
                vm.viewModelmoldedFormalization.place = parseInt(jsonData.addressList[0].place.id);
                if (jsonData.email === undefined){
                    vm.viewModelmoldedFormalization.correoCasa = '';
                }else {
                    vm.viewModelmoldedFormalization.correoCasa = jsonData.email;
                }

                getCitiesResidences(vm.viewModelmoldedFormalization.residenceCountry);
                getMunicipalities(vm.viewModelmoldedFormalization.residenceProvince);
                getSectors(vm.viewModelmoldedFormalization.residenceMunicipality);
                getPlaces(vm.viewModelmoldedFormalization.section);  
            }

            if (vm.viewModelmoldedFormalization.palceSending.value === 'Trabajo') {
                vm.validCorreo = false;
                vm.disableSelect = true;
                if (jsonData.incomes[0].address.street === undefined) {
                    vm.viewModelmoldedFormalization.calle = '';
                } else {
                    vm.viewModelmoldedFormalization.calle = jsonData.incomes[0].address.street;
                }

                if (jsonData.incomes[0].address.number === undefined) {
                    vm.viewModelmoldedFormalization.number = '';
                } else {
                    vm.viewModelmoldedFormalization.number = parseInt(jsonData.incomes[0].address.number);
                }

                if (jsonData.apartmentNumber === undefined) {
                    vm.viewModelmoldedFormalization.apartament = '';
                } else {
                    vm.viewModelmoldedFormalization.apartament = jsonData.apartmentNumber;
                }

                vm.viewModelmoldedFormalization.residenceCountry = parseInt(jsonData.incomes[0].address.country.id);
                vm.viewModelmoldedFormalization.residenceProvince = parseInt(jsonData.incomes[0].address.province.id);
                vm.viewModelmoldedFormalization.residenceMunicipality = parseInt(jsonData.incomes[0].address.municipality.id);
                vm.viewModelmoldedFormalization.section = parseInt(jsonData.incomes[0].address.section.id);
                vm.viewModelmoldedFormalization.place = parseInt(jsonData.incomes[0].address.place.id);  
                if (jsonData.email === undefined){
                    vm.viewModelmoldedFormalization.correoCasa = '';
                }else {
                    vm.viewModelmoldedFormalization.correoCasa = jsonData.email;
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
         *  @name validateClient
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Valida si el cliente existe o no.
         *  Consulta los datos básicos del cliente y los coloca en la vista.
         */


        function validateClient()  {
            /*var keyCode = event.which || event.keyCode;
            if (keyCode === 13) {*/

            var documentNumber = vm.viewModelmoldedFormalization.identificationName;
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

            //}

        };


        /**
         *
         *
         **/

        function getCreditBureauNoCLient() {

            var documentNumber = vm.viewModelmoldedFormalization.identificationName,
                stringXml = '',
                urlBase = window.location.origin + URL.XML_BUREAU,
                oJson = {},
                clientCountry = '',
                clientAge;


            creditBureauService.getValidCreditBureau(documentNumber, vm.username).then(function(responseValue) {

                vm.findJudicialEvaluation = responseValue.validationBuroResult;


                creditBureauService.getXmlCreditBureau(documentNumber, vm.username).then(function(responseXml) {

                    stringXml = responseXml;

                    oJson = ngXml2json.parser(stringXml);
                    console.log(oJson);
                    clientCountry = oJson.reportecu.reporte.informacionadicional.nacionalidad;
                    /* URL que almacena el llamado al archivo XML en el servidor */
                    vm.urlXml = urlBase + '?documentNumber=' + documentNumber + '&userName=' + vm.username;
                    /*Si el segundo nombre viene indefinido colocarlo como vacio  */

                    jsonData.typeDocument = vm.viewModelmoldedFormalization.typeIdentification;
                    if (angular.isObject(oJson.reportecu.clienteunico.segundonombre)) {
                        jsonData.secondName = '';
                    } else {
                        jsonData.secondName = oJson.reportecu.clienteunico.segundonombre;
                    }

                    /*Si el segundo apellido viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.clienteunico.segundoapellido)) {
                        jsonData.secondSurname = '';
                    } else {
                        jsonData.secondSurname = oJson.reportecu.clienteunico.segundoapellido;
                    }

                    /*Si la ocupación viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.reporte.datosgenerales.ocupacion)) {
                        jsonData.profession = '';
                    } else {
                        jsonData.profession = oJson.reportecu.reporte.datosgenerales.ocupacion;
                    }

                    /*Si la el telefono de la casa viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.reporte.datoslocalizacion.telefonoresidencia)) {
                        jsonData.landLine = '';
                    } else {
                        jsonData.landLine = oJson.reportecu.reporte.datoslocalizacion.telefonoresidencia;
                    }

                    /*Si la el telefono móvil viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.reporte.datoslocalizacion.telefonocelular)) {
                        jsonData.mobilePhone = '';
                    } else {
                        jsonData.mobilePhone = oJson.reportecu.reporte.datoslocalizacion.telefonocelular;
                    }

                    /*Si la calle de residencia viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.reporte.datoslocalizacion.calleresidencia)) {
                        jsonData.street = '';
                    } else {
                        jsonData.street = oJson.reportecu.reporte.datoslocalizacion.calleresidencia;
                    }

                    /*Si el numero de residencia viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.reporte.datoslocalizacion.direccionnumero)) {
                        jsonData.residenceNumber = '';
                    } else {
                        jsonData.residenceNumber = oJson.reportecu.reporte.datoslocalizacion.direccionnumero;
                    }

                    /* Validamos si el pais de residencia es la republica dominicana */
                    if (clientCountry !== messages.general.dominicanCountry) {
                        modalFactory.error(messages.modals.error.notCountryAllowedClient);
                    } else {
                        vm.isDominicanRepublic = true;
                    }

                    /*Si el numero de residencia viene indefinido colocarlo como vacio  */
                    if (angular.isObject(oJson.reportecu.clienteunico.estadocivil)) {
                        jsonData.civilStatus = '';
                    } else {
                        jsonData.civilStatus = oJson.reportecu.clienteunico.estadocivil;
                    }

                    /*Guardamos el numero de identidad del cliente para poder borrarlo en el la fabrica del modal de cancelar*/
                    jsonData.numberIdentification = vm.viewModelmoldedFormalization.numberIdentification;

                    /*Almacenar los datos extraidos del cliente desde data credito */
                    jsonData.firtsName = oJson.reportecu.clienteunico.primernombre;
                    jsonData.surname = oJson.reportecu.clienteunico.primerapellido;
                    jsonData.birthDate = oJson.reportecu.clienteunico.fechanacimiento;
                    jsonData.sex = oJson.reportecu.clienteunico.sexo;
                    jsonData.countryBirth = oJson.reportecu.clienteunico.paisnacimiento;
                    jsonData.cityBirth = oJson.reportecu.clienteunico.lugarnacimiento;
                    jsonData.nationality = oJson.reportecu.clienteunico.nacionalidad;
                    jsonData.residenceCountry = oJson.reportecu.reporte.datoslocalizacion.paisresidencia;
                    jsonData.residenceProvince = oJson.reportecu.reporte.datoslocalizacion.cod_provincia_nombre;
                    jsonData.residenceMunicipality = oJson.reportecu.reporte.datoslocalizacion.ciudadresidencia;


                     /*Verificamos si la nacionalidad del cliente nuevo es DOMINICANA para convertirlo a REPUBLICA DOMINICANA */
                    if(jsonData.nationality === messages.general.dominicanCountry){
                        jsonData.nationality = messages.general.dominicanCountrySibel;
                    }else{
                        jsonData.nationality = jsonData.nationality;
                    }

                    vm.bornDay = document.getElementById("fechaNacimiento");
                    vm.getBureau = true;
                    vm.datePassport = jsonData.birthDate;
                    vm.email = jsonData.email;
                    vm.myDate = jsonData.birthDate;
                    vm.bornDay.setRangeText(vm.datePassport.substring(0, 10));

                    vm.namePlastic2 = jsonData.firtsName + ' ' + jsonData.surname;
                    vm.landLine = parseInt(jsonData.landLine);

                    /** Validaciones para el tipo de moneda en dolares, donde se ocultan los campos Compra cheques de gerencia */
                    angular.forEach(vm.typeSex, function (value, key) {
                        if (value.value === jsonData.sex) {
                            vm.viewModelmoldedFormalization.sex = value.id;
                        }
                    });

                    /** Validaciones para el tipo de moneda en dolares, donde se ocultan los campos Compra cheques de gerencia */
                    angular.forEach(vm.nationalities, function (value, key) {
                        if (value.value === jsonData.nationality) {
                            vm.viewModelmoldedFormalization.nacionalidad = value.id;
                        }
                    });

                    /** Validaciones para el tipo de moneda en dolares, donde se ocultan los campos Compra cheques de gerencia */
                    angular.forEach(vm.typeStatus, function (value, key) {
                        if (value.value === jsonData.civilStatus) {
                            vm.viewModelmoldedFormalization.status = value.id;
                        }
                    });

                }, modalError);

                if (!vm.findJudicialEvaluation) {
                    vm.fichaBand = true;
                    vm.decisionMessage = 'RECHAZADO';
                    vm.decisionMoti = 'Cliente presenta Ficha Judicial';
                    modalFactory.error(messages.modals.error.badJudicialEvaluation);
                }


            }, modalError);




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
         *  @ngdoc function
         *  @name validateClientCanContinue
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Estudia todas las validaciones que el usuario tiene que pasar
         *  Determina si puede continuar o no.
         */
        function validateClientCanContinue() {

            if (vm.fichaBand) {
                vm.clientCanContinue = false;
            } else {
                vm.clientCanContinue = true;
            }
        }

        /**
         *
         *
         **/

        function getCreditListService() {

            var documentNumber = vm.viewModelmoldedFormalization.identificationName;

            creditListService.getCreditListService(documentNumber, vm.viewModelmoldedFormalization.typeIdentification, vm.username).then(function(responseValue) {
                console.log(responseValue);
                $timeout(function() {
                    vm.finObs = responseValue.observed;
                    vm.findPep = responseValue.pep;
                    vm.findControlListReport = responseValue.controlList;
                    vm.getControlList = true;

                    if (vm.finObs) {
                        vm.fichaBand = true;
                        vm.decisionMoti = messages.modals.error.badOberved;
                        modalFactory.error(messages.modals.error.badOberved);
                    }

                    if (!vm.findControlListReport) {
                        vm.fichaBand = true;
                        modalFactory.error(messages.modals.error.badControlListCreationAccount);
                    }

                    if (vm.findPep) {
                        vm.fichaBand = true;
                        modalFactory.error(messages.modals.error.badPepListCreationAccount);
                    }
                    validateClientCanContinue();

                }, 0);

            }, modalError);

        }

        /**
         *
         *
         *
         **/



        function getCreditBureau() {
            var documentNumber = vm.viewModelmoldedFormalization.identificationName,
                stringXml = '',
                urlBase = window.location.origin + URL.XML_BUREAU,
                oJson = {},
                clientCountry = '',
                clientAge;

            resetData();
            creditBureauService.getValidCreditBureau(documentNumber, vm.username).then(function (responseValue) {
            
                vm.findJudicialEvaluation = responseValue.validationBuroResult;
                if (!vm.findJudicialEvaluation) {
                    vm.getBureau = true;
                    modalFactory.error(messages.modals.error.badJudicialEvaluation);
                } else {

                    creditBureauService.getValidCientExisting(vm.viewModelmoldedFormalization.typeIdentification ,documentNumber, vm.username).
                        then(function   
                            (response) {

                            vm.dataClientExit = response;
                            oJson =  response;

                    /* Validamos si el pais de residencia es la republica dominicana */
                    if (vm.dataClientExit.nacionality !== messages.general.dominicanCountrySibel) {
                        modalFactory.error(messages.modals.error.notCountryAllowedAccount);
                    } else {
                        vm.isDominicanRepublic = true;
                    }
                            
                    vm.namePlastic2 = vm.dataClientExit.firstName + ' ' + vm.dataClientExit.firstLastname;
                    vm.nameUser = vm.dataClientExit.firstName + ' ' + vm.dataClientExit.secondName + ' ' + vm.dataClientExit.firstLastname + ' ' + vm.dataClientExit.secondLastname;

                    vm.landLine = parseInt(vm.dataClientExit.cellPhone);

                    /** Validaciones para el tipo de moneda en dolares, donde se ocultan los campos Compra cheques de gerencia */
                    angular.forEach(vm.typeSex, function (value, key) {
                        if (value.value === vm.dataClientExit.sex) {
                            vm.viewModelmoldedFormalization.sex = value.id;
                        }
                    });

                    /** Validaciones para el tipo de moneda en dolares, donde se ocultan los campos Compra cheques de gerencia */
                    angular.forEach(vm.nationalities, function (value, key) {
                        if (value.value === vm.dataClientExit.nacionality) {
                            vm.viewModelmoldedFormalization.nacionalidad = value.id;
                        }
                    });

                    /** Validaciones para el tipo de moneda en dolares, donde se ocultan los campos Compra cheques de gerencia */
                    angular.forEach(vm.typeStatus, function (value, key) {
                        if (value.value === vm.dataClientExit.civilState) {
                            vm.viewModelmoldedFormalization.status = value.id;
                        }
                    });
                    vm.bornDay = document.getElementById("fechaNacimiento");
                    vm.datePassport = vm.dataClientExit.birthDate;
                    vm.email = vm.dataClientExit.email;
                    vm.myDate = vm.dataClientExit.birthDate;
                    vm.bornDay.setRangeText(vm.datePassport.substring(0, 10));

                    /*var year = vm.datePassport.substring(6,10);
                    var month = vm.datePassport.substring(3,5);
                    var day = vm.datePassport.substring(0,2);
                    var completeDate =  year  + "-" + month   + "-" + day  ;
                    var today = new Date(completeDate);
                    var today1 = new Date(completeDate);
                    vm.myDate = today1;
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //
                    var yyyy = today.getFullYear();
                    today = yyyy +'-'+mm +'-'+dd; 
                    vm.email = vm.dataClientExit.email;
                    /*var dateTest =  new Date(completeDate);
                    var dateTest2 = new Date(completeDate);*/
                    //var dataTest = today;
                    
                    //vm.myDate = "2016-07-05";
                    //vm.bornDay.setRangeText(dataTest.substring(0, 10));    
                    }, modalError);
                }

                

            }, modalError);
        }

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

        /**
         *
         *
         **/


        function getvalidateClientCreditCard() {
            var documentNumber = vm.viewModelmoldedFormalization.numberIdentification;
            var typeIdentification = vm.viewModelmoldedFormalization.typeIdentification;

            validationClientService.getvalidateClientCreditCard(documentNumber, vm.username, typeIdentification).then(
                function(responseValue) {
                    console.log(responseValue);
                    if (vm.fichaBand) {
                        vm.decisionMessage = 'RECHAZADO';
                    }
                    if (!vm.fichaBand) {
                        vm.decisionMessage = responseValue.decisionMessage;
                    }

                    function limitUSD(text, busca, reemplaza) {
                        while (text.toString().indexOf(busca) != -1) {
                            text = text.toString().replace(busca, reemplaza);
                            vm.viewModelmoldedFormalization.limitUSD = text;
                            return text;
                        }
                    }

                    function limitRD(text, busca, reemplaza) {
                        while (text.toString().indexOf(busca) != -1) {
                            text = text.toString().replace(busca, reemplaza);
                            vm.viewModelmoldedFormalization.limitRD = text;
                            return text;
                        }
                    }

                    function limitDiferidoRD(text, busca, reemplaza) {
                        while (text.toString().indexOf(busca) != -1) {
                            text = text.toString().replace(busca, reemplaza);
                            vm.viewModelmoldedFormalization.limitDiferidoRD = text;
                            return text;
                        }
                    }

                    function limitRDmaximo(text, busca, reemplaza) {
                        while (text.toString().indexOf(busca) != -1) {
                            text = text.toString().replace(busca, reemplaza);
                            vm.limiteMaximoRd = text;
                            return text;
                        }
                    }

                    function limitUSDmaximo(text, busca, reemplaza) {
                        while (text.toString().indexOf(busca) != -1) {
                            text = text.toString().replace(busca, reemplaza);
                            vm.limiteMaximoUs = text;
                            return text;
                        }
                    }

                    vm.viewModelmoldedFormalization.limitDiferidoRD = responseValue.deferred;
                    vm.viewModelmoldedFormalization.limitDiferidoRD = $filter('number')(responseValue.deferred, 0);
                    limitDiferidoRD(vm.viewModelmoldedFormalization.limitDiferidoRD, ".", ",");

                    vm.viewModelmoldedFormalization.limitRD = responseValue.dopLimit;
                    vm.viewModelmoldedFormalization.limitRD = $filter('number')(responseValue.dopLimit, 0);
                    limitRD(vm.viewModelmoldedFormalization.limitRD, ".", ",");
                    vm.limiteMaximoRd = $filter('number')(responseValue.dopLimit, 0);
                    limitRDmaximo(vm.limiteMaximoRd, ".", "");

                    vm.viewModelmoldedFormalization.limitUSD = responseValue.usdLimit;
                    vm.viewModelmoldedFormalization.limitUSD = $filter('number')(responseValue.usdLimit, 0);
                    limitUSD(vm.viewModelmoldedFormalization.limitUSD, ".", ",");
                    vm.limiteMaximoUs = $filter('number')(responseValue.usdLimit, 0);
                    limitUSDmaximo(vm.limiteMaximoUs, ".", "");

                    vm.validationBuroResult = responseValue.validationBuroResult;
                    vm.validationResultProduct = responseValue.validationResultProduct;
                    vm.validationResultCustomerPreApproved = responseValue.validationResultCustomerPreApproved;
                    vm.validationResultMaxQuantityCards = responseValue.validationResultMaxQuantityCards;
                    vm.validpreAprobado = false;
                    vm.clientCanContinue = true;
                    vm.clientAprobado = true;
                    validateClientCanContinue();
                }, modalError

            );
        }

        /**
         *  @ngdoc function
         *  @name getTypeDocuments
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Valida que se tenga una estructura de error definida
         *  Si esta definida lo muestra
         *  En caso contrario muestra un error por defecto.
         */

         function modalError(error) {
            if(error.message !== '') {
               modalFactory.error(error.message);
            } else {
               modalFactory.error(messages.modals.error.errorDefault);

            }
        }

        /*function modalError(error) {
            if (error.message !== '') {
                var errortc = error.message;
                if (error.message === "Cliente no posee preaprobado.") {
                    vm.decisionMessage = 'PRE-APROBADO';
                    vm.clientCanContinue = true;
                    vm.validpreAprobado = true;
                }
                if (error.message === "El cliente ya posee el producto.") {
                    vm.decisionMessage = 'RECHAZADO';
                    vm.clientCanContinue = false;
                    vm.decisionMoti = "El cliente ya posee el producto.";
                }
                if (error.message === "Cliente posee tarjeta en proceso de originacion") {
                    vm.decisionMessage = 'RECHAZADO';
                    vm.clientCanContinue = false;
                    vm.decisionMoti = "Cliente posee tarjeta en proceso de originacion";
                }
                if (error.message === "El cliente posee la cantidad máxima de productos permitidos.") {
                    vm.decisionMessage = 'RECHAZADO';
                    vm.clientCanContinue = true;
                    vm.decisionMoti = "El cliente posee la cantidad máxima de productos permitidos.";
                }
                if (error.message === "El cliente no tiene un número de tarjeta de clave activa.") {
                    errortc = "Cliente debe pasar por la sucursal más cercana a recibir su tarjeta de claves para continuar.";
                    vm.clientCanContinue = false;
                }
                modalFactory.error(errortc);
            } else {
                modalFactory.error(messages.modals.error.errorDefault);

            }
        }*/


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