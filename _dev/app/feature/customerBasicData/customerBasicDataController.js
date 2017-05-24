(function () {
    'use strict';

    angular
        .module('customerBasicDataModule')
        .controller('customerBasicDataController', customerBasicDataController);

    //Inyeccion de dependencias
    customerBasicDataController.$inject = [
        '$state',
        'validationClientService',
        'CATALOG',
        'catalogService',
        'FATCA',
        'catalogComplexService',
        '$rootScope',
        'modalFactory',
        '$filter',
        'SELECT_DEFAULT',
        'messages',
        'catalogPreloadedService',
        'updateBasicDataService',
    ];

    function customerBasicDataController(
        $state,
        validationClientService,
        CATALOG,
        catalogService,
        FATCA,
        catalogComplexService,
        $rootScope,
        modalFactory,
        $filter,
        SELECT_DEFAULT,
        messages,
        catalogPreloadedService,
        updateBasicDataService
        ) {

       

        var vm = this;
        var proyect = localStorage.getItem("Proyecto");
        var dataSiebel = localStorage.getItem("dataSiebel");
        if (proyect === 'CreditCard'){  
            if(dataSiebel === "true"){
                $rootScope.customerDataCredit = JSON.parse(localStorage.getItem("jsonDataClient"));
            }else {
                $rootScope.customerDataCredit = JSON.parse(localStorage.getItem("jsonData"));
            }
        }       
        vm.viewModelBasicData = {
            street : '',
            residenceNumber : '',
            building : '',
            apartament : ''
        };/*Modelo de los campos del formulario */
        vm.dateOptions = {}; /*Opciones generales del datepicker */
        vm.popupDatePassport = { /*Boolean que abre y cierra el datepicker de fecha de pasaporte */
            opened: false
        };
        vm.submitted = false; /*Boolen que valida que todos los campos del formulario sean completados */
        vm.formCustomerBasicData = false; /*boolena que valida que el formulario sea valido*/
        vm.format = 'dd-MMMM-yyyy'; /*Formato en el que se mostrara la fecha seleccionada*/
        vm.countries = []; /*Array con toda la lista de paises */
        vm.nationalities = []; /*Array con toda la lista de nacionalidades disponibles */
        vm.customerInvalid = false; /*Boolena que valida que el cliente no pertenezca a fatca y sea un cliente valido */
        vm.invalidCountryPassport = false; /*Boolean  que valida que el pasaporte y la segunda o tercera nacionalidad coincidan */
        vm.professions = []; /*Array con toda la lista de profesiones */
        vm.genders = []; /*Array con la lista de los sexos */
        vm.maritalStatus = []; /*Array con la lista de estados civiles */
        vm.cities = []; /*Array que carga la lista de ciudades, dependiendo del paies seleccionado */
        vm.citiesResidences = []; /*Array que carga la lista de ciudades de residencia, dependiendo del paies seleccionado */
        vm.municipalities = []; /*Array que carga la lista de minicipios, dependiendo de la provincia seleccionada */
        vm.sectors = []; /*Array que carga la lista de sectores, dependiendo del municipio seleccionado */
        vm.places = []; /*Array que carga la lista de paraje, dependiendo del sector seleccionado */
        vm.cityBirthUndefined = false;
        vm.idAcademicLevel = '';
        vm.countryRd = '';
        vm.numberDocument = '';
        vm.typeDocument = '';
        var jsonBasicDataSiebel = {};
        $rootScope.globalUserJSon = [];
        $rootScope.globalUserJSonPrinter;
        //$rootScope.globalUserJSon;

        validatePhoneNumber();

        /*Configuracion basica para el datepicker*/
        vm.dateOptions = {
            formatYear: 'yyyy',
            /*maxDate: new Date(),*/
            /*minDate: new Date(),*/
            startingDay: 1,
            showWeeks: false
        };


        /*--Funciones--*/
       
        vm.getPlaces = getPlaces;
        vm.getSectors = getSectors;
        vm.getMunicipalities = getMunicipalities;
        vm.getCitiesResidences = getCitiesResidences;
        vm.getCitiesBirth = getCitiesBirth; 
        vm.getCivilStatus = getCivilStatus; 
        vm.getSex = getSex;
        vm.getProfession = getProfession;
        vm.completeAcademicLevel = completeAcademicLevel;
        vm.matchCountryPassport = matchCountryPassport; 
        vm.getNationalities = getNationalities;
        vm.validFatca = validFatca;  
        vm.getCountries = getCountries; 
        vm.saveBasicData = saveBasicData;
        vm.openDatePassport  = openDatePassport;
        vm.modalCancel = modalCancel;
        vm.modalFieldsRequired = modalFieldsRequired;
        vm.validatePhoneNumber = validatePhoneNumber;  
        /**
         * Función que pre-carga los select de la informacíon basica del cliente traida del buró de credito
         */
        var dataSiebel = localStorage.getItem("dataSiebel");
        console.log(dataSiebel);
        if(dataSiebel === "true"){
            var jsonData = {};
            console.log($rootScope.customerDataCredit);
            jsonData = JSON.parse(localStorage.getItem("jsonDataClient"));

            console.log(jsonData);
                jsonBasicDataSiebel = jsonData;
                vm.numberDocument = jsonData.numberDocument;
                vm.typeDocument = jsonData.typeDocument;
                vm.viewModelBasicData.firtsName =  jsonData.firtsName;
                vm.viewModelBasicData.secondName = jsonData.secondName;
                vm.viewModelBasicData.surname = jsonData.surname;
                vm.viewModelBasicData.secondSurname = jsonData.secondSurname;
                vm.viewModelBasicData.sex =jsonData.sex;
                vm.viewModelBasicData.birthDate = $filter('date')(jsonData.birthDate,'dd-MM-yyyy');
                vm.viewModelBasicData.countryResidence = parseInt(jsonData.addressList[0].country.id);
                vm.viewModelBasicData.countryBirth = jsonData.countryBirth;
                vm.viewModelBasicData.cityBirth = jsonData.cityBirth;
                vm.viewModelBasicData.nationality = jsonData.nationality;
                vm.viewModelBasicData.secondNationality = jsonData.secondNacionality;
                vm.viewModelBasicData.thirdNationality = jsonData.thirNacionality;
                vm.viewModelBasicData.countryPassport;
                vm.viewModelBasicData.passport;
                vm.viewModelBasicData.profession = jsonData.profession;
                vm.viewModelBasicData.academicLevel = jsonData.academicLevel;
                vm.viewModelBasicData.civilStatus = jsonData.civilStatus;
                vm.viewModelBasicData.landLine = jsonData.landLine;
                vm.viewModelBasicData.mobilePhone = jsonData.mobilePhone;
                vm.viewModelBasicData.email = jsonData.email;
                vm.viewModelBasicData.street = jsonData.addressList[0].street;
                vm.viewModelBasicData.residenceNumber = parseInt(jsonData.addressList[0].number);
                vm.viewModelBasicData.residenceCountry = parseInt(jsonData.addressList[0].country.id);
                vm.viewModelBasicData.residenceProvince = parseInt(jsonData.addressList[0].province.id);
                vm.viewModelBasicData.residenceMunicipality = parseInt(jsonData.addressList[0].municipality.id);
                vm.viewModelBasicData.section = parseInt(jsonData.addressList[0].section.id);
                vm.viewModelBasicData.place = parseInt(jsonData.addressList[0].place.id);
                vm.viewModelBasicData.building = parseInt(jsonData.addressList[0].building);
                vm.viewModelBasicData.apartament = jsonData.addressList[0].apartmentNumber;

                /*LLamado de la función que trae las ciudades de nacimiento dependiendo del país de nacimiento */
                        getCitiesBirth(vm.viewModelBasicData.countryBirth);

                        /*Llamado de la función que trae las provincias de residencia dependiendo del país de residencia */
                        getCitiesResidences(vm.viewModelBasicData.residenceCountry);

                        /*Llamado de la función que trae los municipios de residencia dependiendo de la provincia de residencia */
                        getMunicipalities(vm.viewModelBasicData.residenceProvince);

                        /*Llamado de la función que trae las secciones de residencia dependiendo del municipio de residencia */
                        getSectors(vm.viewModelBasicData.residenceMunicipality); 
                        getPlaces(vm.viewModelBasicData.section); 

                        /*Llamamos a la función que autocompleta el nivel academico */
                        getProfession(vm.viewModelBasicData.profession);
                        getCivilStatus(vm.viewModelBasicData.civilStatus);
                                     /*Cargamos en el modelo local los datos globales digitados anteriormente por el usuario */
                


        } else {
            console.log($rootScope.customerDataCredit);

            /*Carga automatica de datos personales extraidos de data credito*/
            vm.viewModelBasicData.firtsName=$rootScope.customerDataCredit.firtsName;
            vm.viewModelBasicData.secondName=$rootScope.customerDataCredit.secondName;
            vm.viewModelBasicData.surname=$rootScope.customerDataCredit.surname;
            vm.viewModelBasicData.secondSurname=$rootScope.customerDataCredit.secondSurname;
            vm.viewModelBasicData.sex=$rootScope.customerDataCredit.sex;
            vm.viewModelBasicData.birthDate=$rootScope.customerDataCredit.birthDate;
            vm.viewModelBasicData.street = $rootScope.customerDataCredit.street;
            vm.viewModelBasicData.residenceNumber =  $rootScope.customerDataCredit.residenceNumber;
            vm.viewModelBasicData.landLine=$rootScope.customerDataCredit.landLine;
            vm.viewModelBasicData.mobilePhone=$rootScope.customerDataCredit.mobilePhone

            var birthCountry = $rootScope.customerDataCredit.countryBirth;
            var birthCity = $rootScope.customerDataCredit.cityBirth;
            var nacionality = $rootScope.customerDataCredit.nationality;
            var profession = $rootScope.customerDataCredit.profession;
            var civilStatus = $rootScope.customerDataCredit.civilStatus;
            var countryResidence = $rootScope.customerDataCredit.residenceCountry;
            var province = $rootScope.customerDataCredit.residenceProvince;
            var town = $rootScope.customerDataCredit.residenceMunicipality;
            catalogPreloadedService.getIdSelect(birthCountry, birthCity, nacionality, profession, civilStatus, countryResidence, province, town)
                .then(
                    function (response) {
                        vm.viewModelBasicData.nationality = response.data.nacionality;
                        vm.viewModelBasicData.countryBirth = response.data.birthCountry;
                        vm.viewModelBasicData.civilStatus = response.data.civilStatus;
                        if(response.data.profession === 'NA'){
                            vm.viewModelBasicData.profession = undefined;
                        }else{
                            vm.viewModelBasicData.profession = response.data.profession;
                        }
                        
                        vm.viewModelBasicData.residenceCountry = response.data.countryResidence;
                        vm.viewModelBasicData.residenceProvince = response.data.province;
                        vm.viewModelBasicData.residenceMunicipality =response.data.town;
                        if (response.data.birthCity === 'NA') {
                            vm.viewModelBasicData.cityBirth = undefined;
                        } else {
                            vm.viewModelBasicData.cityBirth = response.data.birthCity;
                        }

                        /*LLamado de la función que trae las ciudades de nacimiento dependiendo del país de nacimiento */
                        getCitiesBirth(vm.viewModelBasicData.countryBirth);

                        /*Llamado de la función que trae las provincias de residencia dependiendo del país de residencia */
                        getCitiesResidences(vm.viewModelBasicData.residenceCountry);

                        /*Llamado de la función que trae los municipios de residencia dependiendo de la provincia de residencia */
                        getMunicipalities(vm.viewModelBasicData.residenceProvince);

                        /*Llamado de la función que trae las secciones de residencia dependiendo del municipio de residencia */
                        getSectors(vm.viewModelBasicData.residenceMunicipality);

                        /*Llamamos a la función que autocompleta el nivel academico */
                        completeAcademicLevel();

                        /* */
                        if(response.data.birthCity==='NA'){
                            vm.cityBirthUndefined = true;
                        }
                    });

        }
        
        /*Verificamos de que parte de la vista, viene el usuario si viene de datos laborales, entonces cargar la informacíon digitada por el usuario */
        if ($rootScope.since.jobsData){
             /*Cargamos en el modelo local los datos globales digitados anteriormente por el usuario */
            vm.viewModelBasicData = angular.copy($rootScope.dataFormCustomerBasicData);
            /*LLamado de la función que trae las ciudades de nacimiento dependiendo del país de nacimiento */
            getCitiesBirth(vm.viewModelBasicData.countryBirth);

            /*Llamado de la función que trae las provincias de residencia dependiendo del país de residencia */
            getCitiesResidences(vm.viewModelBasicData.residenceCountry);

            /*Llamado de la función que trae los municipios de residencia dependiendo de la provincia de residencia */
            getMunicipalities(vm.viewModelBasicData.residenceProvince);

            /*Llamado de la función que trae las secciones de residencia dependiendo del municipio de residencia */
            getSectors(vm.viewModelBasicData.residenceMunicipality);

            /*Llamado de la función que trae las secciones de residencia dependiendo del municipio de residencia */
            getPlaces(vm.viewModelBasicData.section);

           
        }else{
            /*LLamado de la función que pre-carga los select de la informacíon basica del cliente traida del buró de credito  */
            //getIdSelet();
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
         * Función que carga todas la lista de ciudadesdes, dependiendo del pais seleccionado
         * @param {any} id
         */
        function getCitiesBirth(id) {
            catalogComplexService.getCatalogComplex(id)
                .then(
                function (response) {
                    vm.citiesBirth = response.data;
                });
        }

        

        


        /**
         * Función que carga los estados civiles en el select
         */
        function getCivilStatus() {
            catalogService.getCatalog(CATALOG.CIVIL_STATUS)
                .then(
                function (response) {
                    vm.maritalStatus = response.data;
                });
        }

        /*Llamado de la función para obtener la lista de estados civiles*/
        getCivilStatus();


        /**
         * Función que carga los sexos en el select
         */
        function getSex() {
            catalogService.getCatalog(CATALOG.SEX)
                .then(
                function (response) {
                    vm.genders = response.data;
                });
        }

        /*Llamado de la función para obtener los la lista de sexos*/
        getSex();



        /**
         * Función que carga todas las profesiones y el nivel academico
         */
        function getProfession(){
            catalogService.getCatalog(CATALOG.PROFESSION)
                .then(
                function (response) {
                    vm.professions = response.data;
                    /*Llamamos a la función que autocompleta el nivel academico */
                    completeAcademicLevel();
                });
        }

        /*Llamado de la función para obtener los la lista de prefesiones*/
        getProfession();



        /**
         * Función que autocompleta el nivel academico dependiendo de la profesion seleccionada
         */
        function completeAcademicLevel(){
            /*Recoremos todos las profesiones para capturar el id de la profesion seleccionada */
            angular.forEach(vm.professions, function (value, key) {
                if (value.id === vm.viewModelBasicData.profession) {
                    vm.viewModelBasicData.academicLevel = value.extrafield1;
                    vm.idAcademicLevel = value.extrafield2;
                }
            });
        }




        /**
         * Función que valida que el país de pasaporte corresponda a la segunda o tercera nacionalidad
         */
        function matchCountryPassport(){
            var contryPassport = '';
            var secondNationality = '';
            var thirdNationality = '';
            vm.invalidCountryPassport = false;
            
            /*Recoremos todos los paises para capturar el nombre del pais de pasaporte seleccionado */
            angular.forEach(vm.countries, function (value, key) {
                if (value.id === vm.viewModelBasicData.countryPassport) {
                    contryPassport = value.value;
                }
            });

            /*Recoremos todos las nacionalidades para capturarel nombre de la segunda nacionalidad seleccionada */
            angular.forEach(vm.nationalities, function (value, key) {
                if (value.id === vm.viewModelBasicData.secondNationality) {
                    secondNationality = value.value;
                }
            });

            /*Recoremos todos las nacionalidades para capturar el nombre de la tercera nacionalidad seleccionada */
            angular.forEach(vm.nationalities, function (value, key) {
                if (value.id === vm.viewModelBasicData.thirdNationality) {
                    thirdNationality = value.value;
                }
            });

            /*Valida si los datos capturados tienen conincidencias entre ellos */
            if((contryPassport!==secondNationality && contryPassport!=='' )&&(contryPassport!==thirdNationality && contryPassport!=='')){
                modalNationalityPassport();
                vm.invalidCountryPassport = true;
            }


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
         * Función que valida si el cliente tiene indicios de persona FATCA
         */
        function validFatca() {
            vm.customerInvalid = false;

            /*Valida que el pais de nacimiento seleccionado no pertenezca a la lista FATCA */
            angular.forEach(FATCA.COUNTRIES, function (value, key) {
                if (value === vm.viewModelBasicData.countryBirth) {
                    modalFatca();
                    vm.customerInvalid = true;
                }
            });


            /*Valida que la nacionalidad seleccionada no pertenezca a la lista FATCA */
            angular.forEach(FATCA.NATIONALITIES, function (value, key) {
                if (value === vm.viewModelBasicData.nationality) {
                    modalFatca();
                    vm.customerInvalid = true;
                }
            });


            /*Valida que la segunda nacionalidad seleccionada no pertenezca a la lista FATCA */
            angular.forEach(FATCA.NATIONALITIES, function (value, key) {
                if (value === vm.viewModelBasicData.secondNationality) {
                    modalFatca();
                    vm.customerInvalid = true;
                }
            });


            /*Valida que la tercera nacionalidad seleccionada no pertenezca a la lista FATCA */
            angular.forEach(FATCA.NATIONALITIES, function (value, key) {
                if (value === vm.viewModelBasicData.thirdNationality) {
                    modalFatca();
                    vm.customerInvalid = true;
                }
            });


            /*Valida que el pais de residencia seleccionado no pertenezca a la lista FATCA */
            angular.forEach(FATCA.COUNTRIES, function (value, key) {
                if (value === vm.viewModelBasicData.country) {
                    modalFatca();
                    vm.customerInvalid = true;
                }
            });

            /*Valida que el pais de residencia seleccionado no pertenezca a la lista FATCA */
            angular.forEach(FATCA.COUNTRIES, function (value, key) {
                if (value === vm.viewModelBasicData.countryResidence) {
                    modalFatca();
                    vm.customerInvalid = true;
                }
            });
               
        }



        /**
         * Función que carga todos los paises desde el catalogo de servicios
         */
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
         * Función que valida y guarda los datos basicos del cliente
         */
        function saveBasicData() {
            /* Verificamos que la casilla de noEmail vaya en falso cuando se escriba un correo electronico valido */
            if(angular.isDefined(vm.viewModelBasicData.email) && vm.viewModelBasicData.email!==''){
                vm.viewModelBasicData.noEmail = false;
            }

            /*Guardamos todo lo que está en el formualrio y lo hacemos global */
            $rootScope.dataFormCustomerBasicData = angular.copy(vm.viewModelBasicData);
            var jsonBasicData = {}; /*Json donde se almacerá los datos a enviar al servicio */
            var address = {}; /*Json donde almacenaremos los nombre de los select de dirección */
            var noEmailCheck = ""; /*Variable que nos indica el si el cliente posee correo electronico o no */ 

            if (vm.formCustomerBasicData.$valid) {
                /*Recoremos el select de estado civil para obtener el nombre del estado seleccionado por cliente */

                angular.forEach(vm.maritalStatus, function (value, key) {
                    if (value.id === vm.viewModelBasicData.civilStatus) {
                        /*Guardamos de manera global el estado civil del cliente ya que este puede ser diferente al existente en datacredito */
                        $rootScope.dataFormCustomerBasicData.civilStatusNew = value.value;
                    }
                });

                /*Guardamos el email de forma global */
                if (angular.isDefined(vm.viewModelBasicData.email)) {
                    $rootScope.dataFormCustomerBasicData.email = vm.viewModelBasicData.email;
                }else{
                    $rootScope.dataFormCustomerBasicData.email = '';
                }
                

                /*Recoremos todos los paraje para capturar el nombre del paraje seleccionado */
                angular.forEach(vm.places, function (value, key) {
                    if (value.id === vm.viewModelBasicData.place) {
                        address.place = value.value;
                    }
                });

                /*Recoremos todos las secciones para capturar el nombre de la seleccion seleccionada */
                angular.forEach(vm.sectors, function (value, key) {
                    if (value.id === vm.viewModelBasicData.section) {
                        address.section = value.value;
                    }
                });

                /*Recoremos todos los municipios para capturar el nombre del municipio seleccionada */
                angular.forEach(vm.municipalities, function (value, key) {
                    if (value.id === vm.viewModelBasicData.residenceMunicipality) {
                        address.municipality = value.value;
                    }
                });

                /*Recoremos todos las provincias para capturar el nombre de la provincia seleccionada */
                angular.forEach(vm.citiesResidences, function (value, key) {
                    if (value.id === vm.viewModelBasicData.residenceProvince) {
                        address.province = value.value;
                    }
                });

                /*Recoremos todos los paises para capturar el nombre del pais seleccionado */
                angular.forEach(vm.countries, function (value, key) {
                    if (value.id === vm.viewModelBasicData.residenceCountry) {
                        address.country = value.value;
                    }
                });

                if(angular.isUndefined(vm.viewModelBasicData.secondNationality) || vm.viewModelBasicData.secondNationality===null){
                    vm.viewModelBasicData.thirdNationality = null;
                    vm.viewModelBasicData.countryPassport = null;
                    vm.viewModelBasicData.passport = null;
                    vm.viewModelBasicData.datePassport = null;
                }

                /*Varificamos si el usuario seleccionó el check indicando que el cliente no posee correo electronico */
                if(vm.viewModelBasicData.noEmail){
                    noEmailCheck = "1";
                }else{
                    noEmailCheck = "0";
                }


                /* Concatenamos y guardamos de forma global la direccion completa del cliente */
                $rootScope.dataFormCustomerBasicData.fullAddress = vm.viewModelBasicData.street + ' ' + vm.viewModelBasicData.residenceNumber + ', ' + vm.viewModelBasicData.building + ' ' + vm.viewModelBasicData.apartament + ', ' + address.place + ', ' + address.section + ', ' + address.municipality + ', ' + address.province + ', ' + address.country;

                /*Construimos el Json según lo espera el servicio REST */
                jsonBasicData.documentNumber = $rootScope.customerDataCredit.numberIdentification;
                jsonBasicData.firstName = vm.viewModelBasicData.firtsName;
                jsonBasicData.secondName = vm.viewModelBasicData.secondName;
                jsonBasicData.firstLasname = vm.viewModelBasicData.surname;
                jsonBasicData.secondLasname = vm.viewModelBasicData.secondSurname;
                jsonBasicData.sex = vm.viewModelBasicData.sex;
                jsonBasicData.birthDate = vm.viewModelBasicData.birthDate;
                jsonBasicData.idResidenceCountry = vm.viewModelBasicData.countryResidence;
                jsonBasicData.idBirthCountry = vm.viewModelBasicData.countryBirth;
                jsonBasicData.idBirthCity = vm.viewModelBasicData.cityBirth;
                jsonBasicData.idNacionality = vm.viewModelBasicData.nationality;
                jsonBasicData.idSecondNacionality = vm.viewModelBasicData.secondNationality;
                jsonBasicData.idThirdNacionality = vm.viewModelBasicData.thirdNationality;
                jsonBasicData.idPassportCountry = vm.viewModelBasicData.countryPassport;
                jsonBasicData.passportNumber = vm.viewModelBasicData.passport;
                jsonBasicData.expeditionDatePassport = $filter('date')(vm.viewModelBasicData.datePassport,'yyyy-MM-dd');
                jsonBasicData.idProfession = vm.viewModelBasicData.profession;
                jsonBasicData.academicLevel = vm.viewModelBasicData.academicLevel;
                jsonBasicData.idCivilState = vm.viewModelBasicData.civilStatus;
                jsonBasicData.phone = vm.viewModelBasicData.landLine;
                jsonBasicData.cellPhone = vm.viewModelBasicData.mobilePhone;
                jsonBasicData.email = vm.viewModelBasicData.email;
                jsonBasicData.emailCheck = noEmailCheck;
                jsonBasicData.street = vm.viewModelBasicData.street;
                jsonBasicData.numbers = vm.viewModelBasicData.residenceNumber;
                jsonBasicData.idCountry = vm.viewModelBasicData.residenceCountry;
                jsonBasicData.idProvince = vm.viewModelBasicData.residenceProvince;
                jsonBasicData.idMunicipality = vm.viewModelBasicData.residenceMunicipality;
                jsonBasicData.idSection = vm.viewModelBasicData.section;
                jsonBasicData.idPlace = vm.viewModelBasicData.place;
                jsonBasicData.building = vm.viewModelBasicData.building;
                jsonBasicData.apartmentNumber = vm.viewModelBasicData.apartament;

                if(dataSiebel === "true"){

                var jsonAdress = {};
                jsonBasicDataSiebel.documentNumber = vm.numberDocument;
                jsonBasicDataSiebel.documentType = vm.typeDocument;
                jsonBasicDataSiebel.userName = $rootScope.dataUser.userNameDescription;
                jsonBasicDataSiebel.addressList[0].street = vm.viewModelBasicData.street;
                jsonBasicDataSiebel.addressList[0].number = vm.viewModelBasicData.residenceNumber;
                jsonBasicDataSiebel.addressList[0].country.id = vm.viewModelBasicData.residenceCountry;
                jsonBasicDataSiebel.addressList[0].province.id = vm.viewModelBasicData.residenceProvince;
                jsonBasicDataSiebel.addressList[0].municipality.id = vm.viewModelBasicData.residenceMunicipality;
                jsonBasicDataSiebel.addressList[0].section.id = vm.viewModelBasicData.section;
                jsonBasicDataSiebel.addressList[0].place.id = vm.viewModelBasicData.place;
                jsonBasicDataSiebel.phone = vm.viewModelBasicData.landLine;
                jsonBasicDataSiebel.cellPhone = vm.viewModelBasicData.mobilePhone;
                jsonBasicDataSiebel.idProfession = vm.viewModelBasicData.profession;
                jsonBasicDataSiebel.academicLevel = vm.viewModelBasicData.academicLevel;
                jsonBasicDataSiebel.idCivilState = vm.viewModelBasicData.civilStatus;

                jsonAdress.documentNumber = vm.numberDocument;
                jsonAdress.documentType = vm.typeDocument;
                jsonAdress.userName = $rootScope.dataUser.userNameDescription;
                jsonAdress.addressList = jsonBasicDataSiebel.addressList;
                jsonAdress.addressList[0].street = vm.viewModelBasicData.street;
                jsonAdress.addressList[0].number = vm.viewModelBasicData.residenceNumber;
                jsonAdress.addressList[0].country.id = vm.viewModelBasicData.residenceCountry;
                jsonAdress.addressList[0].province.id = vm.viewModelBasicData.residenceProvince;
                jsonAdress.addressList[0].municipality.id = vm.viewModelBasicData.residenceMunicipality;
                jsonAdress.addressList[0].section.id = vm.viewModelBasicData.section;
                jsonAdress.addressList[0].place.id = vm.viewModelBasicData.place;
                jsonAdress.phone = vm.viewModelBasicData.landLine;
                jsonAdress.cellPhone = vm.viewModelBasicData.mobilePhone;
                jsonAdress.idProfession = vm.viewModelBasicData.profession;
                jsonAdress.academicLevel = vm.viewModelBasicData.academicLevel;
                jsonAdress.idCivilState = vm.viewModelBasicData.civilStatus;



                var jsonUpdateBasic = {};
                /*Construimos el Json según lo espera el servicio REST */
                jsonUpdateBasic.documentNumber = $rootScope.customerDataCredit.numberIdentification;
                jsonUpdateBasic.firstName = vm.viewModelBasicData.firtsName;
                jsonUpdateBasic.secondName = vm.viewModelBasicData.secondName;
                jsonUpdateBasic.firstLasname = vm.viewModelBasicData.surname;
                jsonUpdateBasic.addressList = jsonBasicDataSiebel.addressList;
                jsonUpdateBasic.secondLasname = vm.viewModelBasicData.secondSurname;
                jsonUpdateBasic.sex = vm.viewModelBasicData.sex;
                jsonUpdateBasic.birthDate = vm.viewModelBasicData.birthDate;
                jsonUpdateBasic.addressList[0].country.id = vm.viewModelBasicData.countryResidence;
                jsonUpdateBasic.idBirthCountry = vm.viewModelBasicData.countryBirth;
                jsonUpdateBasic.idBirthCity = vm.viewModelBasicData.cityBirth;
                jsonUpdateBasic.idNacionality = vm.viewModelBasicData.nationality;
                jsonUpdateBasic.idSecondNacionality = vm.viewModelBasicData.secondNationality;
                jsonUpdateBasic.idThirdNacionality = vm.viewModelBasicData.thirdNationality;
                jsonUpdateBasic.idPassportCountry = vm.viewModelBasicData.countryPassport;
                jsonUpdateBasic.passportNumber = vm.viewModelBasicData.passport;
                jsonUpdateBasic.expeditionDatePassport = $filter('date')(vm.viewModelBasicData.datePassport,'yyyy-MM-dd');
                jsonUpdateBasic.idProfession = vm.viewModelBasicData.profession;
                jsonUpdateBasic.academicLevel = vm.viewModelBasicData.academicLevel;
                jsonUpdateBasic.idCivilState = vm.viewModelBasicData.civilStatus;
                jsonUpdateBasic.phone = vm.viewModelBasicData.landLine;
                jsonUpdateBasic.cellPhone = vm.viewModelBasicData.mobilePhone;
                jsonUpdateBasic.email = vm.viewModelBasicData.email;
                jsonUpdateBasic.emailCheck = noEmailCheck;
                jsonUpdateBasic.addressList[0].street = vm.viewModelBasicData.street;
                jsonUpdateBasic.addressList[0].number = vm.viewModelBasicData.residenceNumber;
                jsonUpdateBasic.addressList[0].country.i = vm.viewModelBasicData.residenceCountry;
                jsonUpdateBasic.addressList[0].province.id = vm.viewModelBasicData.residenceProvince;
                jsonUpdateBasic.addressList[0].municipality.id = vm.viewModelBasicData.residenceMunicipality;
                jsonUpdateBasic.addressList[0].section.id = vm.viewModelBasicData.section;
                jsonUpdateBasic.addressList[0].place.id = vm.viewModelBasicData.place;
                jsonUpdateBasic.building = vm.viewModelBasicData.building;
                jsonUpdateBasic.addressList[0].apartmentNumber = vm.viewModelBasicData.apartament;
                
                $rootScope.globalUserJSon = jsonUpdateBasic;
                $rootScope.globalUserJSon.printer = $rootScope.globalUserJSonPrinter;


                        var clientPortal = JSON.parse(localStorage.getItem("clientPortal"));

                        if (clientPortal) {
                                updateBasicDataService.putBasicDataSiebel(jsonAdress);
                                $rootScope.dataFormCustomerBasicData.idAcademicLevel = vm.idAcademicLevel;
                                $state.go('customerJobsData');
                        }else {
                                updateBasicDataService.putBasicData(jsonUpdateBasic);
                                $rootScope.dataFormCustomerBasicData.idAcademicLevel = vm.idAcademicLevel;
                                /*Redireccionamos a la vista de datos laborales */
                                $state.go('customerJobsData');
                        }
                    
                }else {
                    /*Llamos al servicio que actualiza los datos basicos del cliente */
                    updateBasicDataService.putBasicData(jsonBasicData);
                    $rootScope.dataFormCustomerBasicData.idAcademicLevel = vm.idAcademicLevel;
                    /*Redireccionamos a la vista de datos laborales */
                    $state.go('customerJobsData');
                }

            } else {
                //Chequea que todos los campos obligatorios esten llenos y validos.
                vm.submitted = true;
                modalFieldsRequired();

            }
        }

        
        /**
         * Función que abre el popup del datepicker para la fecha de expedicion del pasaporte
         */
        function openDatePassport() {
            vm.popupDatePassport.opened = true;
        }

        
        /**
         * Función para abrir el modal de cancelar
         */
        function modalCancel() {
           modalFactory.cancel();
        }


        /**
         * Función para abrir el modal de campos obligatorios
         */
        function modalFieldsRequired() {
            modalFactory.warning(messages.modals.error.completeRequiredFields);
        }

        /**
         * Función para abrir el modal de persona FATCA
         */
        function modalFatca() {
            modalFactory.warning(messages.modals.error.modalFatca);
        }

        /**
         * Función para abrir el modal que indica que el pais del pasaporte debe pertenecer a segunda o tercera nacionalidad
         */
        function modalNationalityPassport() {
            modalFactory.warning(messages.views.customerBasic.modalNationalities);
        }

        /**
         *  @ngdoc method
         *  @name validatePhoneNumber
         *  @methodOf App.controller:customerBasicDataController
         *
         *  @description
         *  Valida si al menos un numero de telefono fue escrito.
         */
        function validatePhoneNumber() {
            
            if(typeof vm.viewModelBasicData.landLine === 'undefined') {
                vm.viewModelBasicData.landLine = '';
            }

            if(typeof vm.viewModelBasicData.mobilePhone === 'undefined') {
                vm.viewModelBasicData.mobilePhone = '';
            }
        }

    }
})();