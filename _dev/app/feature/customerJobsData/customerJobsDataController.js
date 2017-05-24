(function () {
    'use strict';

    angular
            .module('customerJobsDataModule')
            .controller('customerJobsDataController', customerJobsDataController);

    //Inyeccion de dependencias
    customerJobsDataController.$inject = [
        'sweet',
        '$state',
        'CATALOG',
        'catalogService',
        'PROFESSION',
        'modalFactory',
        'SELECT_DEFAULT',
        'catalogComplexService',
        '$rootScope',
        '$timeout',
        'ciiuLevelsByOccupation',
        'URL',
        '$filter',
        'updateLaborDataService',
        'messages'
        ];

    function customerJobsDataController(
        sweet,
        $state,
        CATALOG,
        catalogService,
        PROFESSION,
        modalFactory,
        SELECT_DEFAULT,
        catalogComplexService,
        $rootScope,
        $timeout,
        ciiuLevelsByOccupation,
        URL,
        $filter,
        updateLaborDataService,
        messages
        ) {
        var vm = this;

        var  proyect = 'CreationAccoun';
        localStorage.setItem("Proyecto", proyect); 
        /*Variables*/
      /*  $rootScope.dataFormCustomerJobsData = [];
        $rootScope.validInputJobsData = [];
        $rootScope.since = {/*Definición de la variable global que indica de que vista origen viene el usuario */
         /*   'home' : false,
            'client' : false,
            'jobsData' : false,
            'foreignCurrency' : true
        }; */
        vm.viewModelJobsData = {};
        vm.validJobsData = {};
        vm.dateOptions = {};
        vm.popupDateHired = {
            opened: false
        };
        vm.submitted = false;
        vm.formCustomerJobsData = false;
        vm.activitiesValue = [];
        vm.textInvalidCompanyName = false;
        vm.textInvalidCarga = false;
        vm.textInvalidClientSib = false;
        vm.countries = [];
        vm.income = [];
        vm.business = [];
        vm.citiesJob = []; /*Array que carga todas las ciudades de lugar de trabajo, dependiendo del pais seleccionado */
        vm.municipalitiesJob = []; /*Array que carga los municipios de lugar de trabajo, dependiendo de la provincia seleccionada */ 
        vm.sectorsJob = []; /*Array que carga los sectores de lugar de trabajo, dependiendo del municipio seleccionado */
        vm.placesJob = []; /*Array que carga los parajes del lugar de trabajo, dependiendo del sector seleccionado  */
        vm.sectors = []; /* Array que contiene todos los sectores economicos */
        vm.industries = []; /* Array que contiene el tipo de industria */
        vm.activitiesNiv1 = []; /* Array que contien el tipo de economia nivel 1 */
        vm.activitiesNiv2 = []; /* Array que contiene la lista de actividades economicas nivel 2, y contiene el valor del CIUU */
        vm.typeSib = []; /* Array que carga los tipos de sib dependiendo la ocupación que corresponda */
        vm.dataLandLine = $rootScope.dataFormCustomerBasicData.landLine; /* Variable que contiene el numero de telefono casa */
        vm.dataMobilePhone = $rootScope.dataFormCustomerBasicData.mobilePhone; /* variable que contiene el numero celular */
        vm.dataStreet = $rootScope.dataFormCustomerBasicData.street; /* Variable que contiene la calle del cliente */
        vm.dataNumber = $rootScope.dataFormCustomerBasicData.residenceNumber; /* Variable que contien el numero de calle del cliente */
        vm.dataCountry = $rootScope.dataFormCustomerBasicData.residenceCountry; /* Variable que contiene el pais del cliente */
        vm.dataProvince = $rootScope.dataFormCustomerBasicData.residenceProvince; /* Variable que contiene la provincia del cliente */
        vm.dataSection = $rootScope.dataFormCustomerBasicData.section; /* Variable que contiene la sección del cliente */
        vm.dataMunicipality = $rootScope.dataFormCustomerBasicData.residenceMunicipality; /* Variable que contiene el municipio del cliente */
        vm.dataPlace = $rootScope.dataFormCustomerBasicData.place; /* Variable que contiene el paraje del cliente */
        vm.tableSourceIncome = []; /*Array que contiene la fuentes de ingreso agregadas a la tabla */
        vm.tableValidIncome = []; /*Array que guarda la información de las validaciones de los campos según la ocupación seleccionada */
        vm.buttonEdit = false; /*Boolean que indica cuando el usuario a seleccionado editar fuente de ingreso */
        vm.idSourceIncome = 0; /*Id de la fuente de ingreso a modificar */
        vm.codeCiiu = ''; /* Id del codigo del CIIU dependiendo del tipo de ocupación seleccionado */
        vm.validJobsData.ciuuAutocomplete = true; /*Boolean que valida que el CIUU venga autocompletado */
        vm.dataSib = []; /** COntiene los datos para la validacion del tipo de SIB */
        vm.idAcademicLevel =  0;
        vm.calenderWork = 'Holaaa';
        vm.dEnterpriseType = 0;
        vm.idOccupation = 0;
        vm.validJobsData.textInvalidCompanyName = true;
        vm.validJobsData.textInvalidCarga = true;
        vm.validJobsData.textInvalidIncome = true;
        vm.validJobsData.textInvalidlandline = true;
        vm.validJobsData.textInvalidstreet = true;
        vm.validJobsData.textInvalidClientSib = true;
        vm.validJobsData.textInvalidincomeRD = true;
        vm.validJobsData.textInvalidnumber = true;
        vm.validJobsData.textInvalidcountry = true;
        vm.validJobsData.textInvalidprovince = true;
        vm.validJobsData.textInvalidcalenderWork = true;
        vm.validJobsData.textInvalidmunicipality = true;
        vm.validJobsData.textInvalidsection = true;
        vm.validJobsData.textInvalidplace = true;
        vm.viewModelJobsData.clientSib = '';
        $rootScope.globalUserJSon;

        var dataSiebel = localStorage.getItem("dataSiebel");
        if (proyect === 'CreditCard'){  
            if(dataSiebel === "true"){
                $rootScope.customerDataCredit = JSON.parse(localStorage.getItem("jsonDataClient"));
            }else {
                $rootScope.customerDataCredit = JSON.parse(localStorage.getItem("jsonData"));
            }
        }
        /*Formato en el que se mostrara la fecha seleccionada*/
        vm.format = 'dd-MMMM-yyyy';

        /*Configuracion basica para el datepicker*/
        vm.dateOptions = {
            formatYear: 'yyyy',
            maxDate: addSubtractDay(new Date(), -1),
            /*minDate: new Date(),*/
            startingDay: 1,
            showWeeks: false
        };

        /*Funcion que me permite sumar o restar los dias de una fecha */
        function addSubtractDay(date, dias) {
            date.setDate(date.getDate() + dias);
            return date;
        }

        /*Funciones*/
        vm.getPlacesJob = getPlacesJob;
        vm.getSectorsJob = getSectorsJob;
        vm.getMunicipalitiesJob = getMunicipalitiesJob; 
        vm.getCitiesJob = getCitiesJob;
        vm.openDateHired  = openDateHired;
        vm.modalCancel = modalCancel;
        vm.saveJobsData = saveJobsData;
        vm.addJobsData = addJobsData;
        vm.getOcupation = getOcupation;
        vm.getJob = getJob; 
        vm.getCountries = getCountries; 
        vm.getIncome = getIncome;
        vm.getSectorEconomic = getSectorEconomic;
        vm.getIndustry = getIndustry;
        vm.getActivityNiv1 = getActivityNiv1;
        vm.getActivityNiv2 = getActivityNiv2;
        vm.getCodeCiiu = getCodeCiiu;
        vm.modalCleanForm = modalCleanForm;
        vm.getSib = getSib;
        vm.validCompanyDeleteSelect = validCompanyDeleteSelect;
        vm.validOcupation = validOcupation;
        vm.dataAutoComplete = dataAutoComplete;
        vm.nameIncomeType = nameIncomeType;
        vm.viewJobsData = viewJobsData;
        vm.deleteJobsData = deleteJobsData;
        vm.editJobsData = editJobsData;
        vm.autocompleteCIIU = autocompleteCIIU;
        vm.ocupationTypeSib = ocupationTypeSib;
        vm.validations = validations;
        vm.validCompanyTypeSib = validCompanyTypeSib;
        vm.getTypeSIB = getTypeSIB;
        vm.modalPrevious = modalPrevious;



       

        if ($rootScope.since.foreignCurrency) {
            if(angular.isDefined($rootScope.dataFormCustomerJobsData[1])){
                vm.tableSourceIncome = angular.copy($rootScope.dataFormCustomerJobsData);
                vm.tableValidIncome = angular.copy($rootScope.validInputJobsData);
            }else{
            /*Cargamos los datos guardados en la variable global al modelo de la vista */
            vm.viewModelJobsData = angular.copy($rootScope.dataFormCustomerJobsData[0]);
            vm.validJobsData = angular.copy($rootScope.validInputJobsData[0]);
            /*Llamado de la funcion que carga el select de industrias, dependiendo del sector economio seleccionado*/
                getIndustry(vm.viewModelJobsData.economicSector);
                /*Llamado de la funcion que carga el select de actividad economica 1, dependiendo de la industria seleccionada*/
                getActivityNiv1(vm.viewModelJobsData.industry);
                /*Llamado de la funcion que carga el select de actividad economica 2, dependiendo de la actividad economica 1 */
                getActivityNiv2(vm.viewModelJobsData.activityLevel1);
                /*Llamado de la funcion que carga el select de provincia, dependiendo de el pais seleccionado*/
                getCitiesJob(vm.viewModelJobsData.country);
                /*Llamado de la funcion que carga el select de municipio, dependiendo de la ciudad seleccionada */
                getMunicipalitiesJob(vm.viewModelJobsData.province);
                /*Llamado de la funcion que carga el select de sección, dependiendo del municipio seleccionado */
                getSectorsJob(vm.viewModelJobsData.municipality);
                /*Llamado de la funcion que carga el select de paraje, dependiendo de la sección seleccionada */
                getPlacesJob(vm.viewModelJobsData.section);
                /*Llamado de la funcion que carga el select del CIIU, dependiendo de la actividad economica nivel 2 seleccionada */
                getCodeCiiu(vm.viewModelJobsData.activityLevel2);
            }
            
        }


        /**
         * 
         * Funcion que permite autocompletar los datos del CIIU dependiendo de la ocupacion que se eliga.
         * @param {any} id
         */
        function autocompleteCIIU() {

            
            if (vm.viewModelJobsData.ocupation === undefined) {

                $timeout(function () {
                    vm.viewModelJobsData = {};
                    vm.formCustomerJobsData.$setUntouched();
                    vm.formCustomerJobsData.$setPristine();
                    vm.validJobsData.textInvalidCompanyName = true;
                    vm.validJobsData.textInvalidCarga = true;
                    vm.validJobsData.textInvalidIncome = true;
                    vm.validJobsData.textInvalidlandline = true;
                    vm.validJobsData.textInvalidcalenderWork = true;
                    vm.validJobsData.textInvalidincomeRD = true;
                    vm.validJobsData.textInvalidstreet = true;
                    vm.validJobsData.textInvalidnumber = true;
                    vm.validJobsData.textInvalidcountry = true;
                    vm.validJobsData.textInvalidprovince = true;
                    vm.validJobsData.textInvalidmunicipality = true;
                    vm.validJobsData.textInvalidsection = true;
                    vm.validJobsData.textInvalidplace = true;
                    vm.validJobsData.ciuuAutocomplete = true;
                    vm.validJobsData.textInvalidClientSib = true; 
                }, 0);   
            }else {


            /*Validamos que se eliga una ocupación correcta para autocompletar*/
            if (vm.viewModelJobsData.ocupation === SELECT_DEFAULT.COMPANY_BUSINESSMAN  || vm.viewModelJobsData.ocupation === SELECT_DEFAULT.OCUPATION_INDEPENDENT) {
                vm.viewModelJobsData.economicSector = undefined;
                vm.viewModelJobsData.industry = undefined;
                vm.viewModelJobsData.activityLevel1 = undefined;
                vm.viewModelJobsData.activityLevel2 = undefined;
                vm.viewModelJobsData.mainActivityCIIU = undefined;
                vm.validJobsData.ciuuAutocomplete = false;
            } else {
                angular.forEach(vm.activitiesValue, function (value, key) {
                    if (value.id === vm.viewModelJobsData.ocupation) {
                        /* recorriendo los datos del codigo ciiu 950004 */
                        angular.forEach(PROFESSION.CIIU_OCUPATION_950004, function (value2, key2) {
                            if (value2 === vm.viewModelJobsData.ocupation) {
                                vm.codeCiiu = value.extrafield1;
                            }
                        });

                        /* recorriendo los datos del codigo ciiu 930992 */
                        angular.forEach(PROFESSION.CIIU_OCUPATION_930992, function (value2, key2) {
                            if (value2 === vm.viewModelJobsData.ocupation) {
                                vm.codeCiiu = value.extrafield1;
                            }
                        });


                    }

                });

                ciiuLevelsByOccupation.getCiiuLevelsByOccupation(vm.codeCiiu)
                    .then(
                        function (response) {
                            
                            /*Llamado de la funcion que carga el select de industrias, dependiendo del sector economio seleccionado*/
                            getIndustry(response.data[4].sector.id);
                            /*Llamado de la funcion que carga el select de actividad economica 1, dependiendo de la industria seleccionada*/
                            getActivityNiv1(response.data[3].industry.id);
                            /*Llamado de la funcion que carga el select de actividad economica 2, dependiendo de la actividad economica 1 */
                            getActivityNiv2(response.data[1].activitylvl1.id);

                            getCodeCiiu(response.data[2].activitylvl2.id);

                            /*Escogemos la opción pre-cargada para cada uno de los select */
                            /*Llenamos el select de secotr Económico */
                            vm.viewModelJobsData.economicSector = response.data[4].sector.id;
                            vm.viewModelJobsData.industry = response.data[3].industry.id;
                            vm.viewModelJobsData.activityLevel1 = response.data[1].activitylvl1.id;
                            vm.viewModelJobsData.activityLevel2 = response.data[2].activitylvl2.id;
                            vm.viewModelJobsData.mainActivityCIIU = response.data[0].ciiu.id;
                            vm.validJobsData.ciuuAutocomplete = true;
                        });
            }
           }

        }


        function editJobsData(index) {
            if (vm.formCustomerJobsData.$valid && vm.viewModelJobsData.incomeRD>messages.views.customerJobsData.minIncomeRD) {
                $timeout(function () {
                    vm.tableSourceIncome.splice(index, 1, vm.viewModelJobsData);
                    vm.tableValidIncome.splice(index, 1, vm.validJobsData);
                    vm.viewModelJobsData = {};
                    vm.validJobsData = {};
                    /*Volvemos el formulario a estado inicial del touched */
                    vm.formCustomerJobsData.$setUntouched();
                    /*Volvemos el formulario a estado inicial del setPristine,
                     para validar que el usuario no halla interactuado con el formulario*/
                    vm.formCustomerJobsData.$setPristine();
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


        /**
         * 
         * Funcion para eliminar de la tabla una fuente de ingreso 
         * @param {any} index
         */
        function deleteJobsData(index) {
            sweet.show({
                title: messages.modals.warning.modaltitleWarning,
                text: messages.modals.warning.modalDeleteOcupation,
                type: messages.modals.warning.modalTypeWarning,
                showCancelButton: true,
                cancelButtonText: messages.modals.warning.modalCancelButton,
                confirmButtonColor: messages.modals.warning.modalColorButton,
                confirmButtonText: messages.modals.warning.modalConfirText,
                closeOnConfirm: true
            }, function () {
                $timeout(function () {
                    /*Eliminamos de la tabla la ocupación seleccionada */
                     vm.tableSourceIncome.splice(index, 1);
                     vm.tableValidIncome.splice(index, 1);
                }, 0);
            });
           
        }



        /**
         * 
         * Funcion que permite visualizar para editar los campos de la fuente de ingreso
         * @param {any} id
         */
        function viewJobsData(index) {
            /*Validamos que el formulario no esté diligenciado */
            if (vm.formCustomerJobsData.$dirty) {
                modalFactory.warning(messages.modals.warning.modalCompeteFieldsOrClean);
            } else {

                vm.viewModelJobsData = angular.copy(vm.tableSourceIncome[index]);
                vm.validJobsData = angular.copy(vm.tableValidIncome[index]);
                /*habilitamos el boton de editar fuente de ingreso */
                vm.buttonEdit = true;
                vm.idSourceIncome = index;
                /*Llamado de la funcion que carga el select de industrias, dependiendo del sector economio seleccionado*/
                getIndustry(vm.viewModelJobsData.economicSector);
                /*Llamado de la funcion que carga el select de actividad economica 1, dependiendo de la industria seleccionada*/
                getActivityNiv1(vm.viewModelJobsData.industry);
                /*Llamado de la funcion que carga el select de actividad economica 2, dependiendo de la actividad economica 1 */
                getActivityNiv2(vm.viewModelJobsData.activityLevel1);
                /*Llamado de la funcion que carga el select de provincia, dependiendo de el pais seleccionado*/
                getCitiesJob(vm.viewModelJobsData.country);
                /*Llamado de la funcion que carga el select de municipio, dependiendo de la ciudad seleccionada */
                getMunicipalitiesJob(vm.viewModelJobsData.province);
                /*Llamado de la funcion que carga el select de sección, dependiendo del municipio seleccionado */
                getSectorsJob(vm.viewModelJobsData.municipality);
                /*Llamado de la funcion que carga el select de paraje, dependiendo de la sección seleccionada */
                getPlacesJob(vm.viewModelJobsData.section);
                /*Llamado de la funcion que carga el select del CIIU, dependiendo de la actividad economica nivel 2 seleccionada */
                getCodeCiiu(vm.viewModelJobsData.activityLevel2);

            }

        }



        /**
         * 
         * Función para obtener el nombre del tipo de ingreso, dependiendo la opción seleccionada en tipo de ingreso.
         * @param {any} id
         */
        function nameIncomeType(id){
            angular.forEach(vm.income, function (value, key){
                if (value.id === id) {
                    vm.viewModelJobsData.nameIncomeType = value.value;
                }
            });
        }



        /**
         * 
         * Función que carga la lista de paraje de trabajo, dependiendo de la sección seleccionada
         * @param {any} id
         */
        function getPlacesJob(id) {
            catalogComplexService.getCatalogComplex(id)
                .then(
                function (response) {
                    vm.placesJob = response.data;
                });
        }



        /**
         * Función para cargar la lista de sectores de trabajo, depeniendo del municipio seleccionado
         * @param {any} id
         */
        function getSectorsJob(id) {
            catalogComplexService.getCatalogComplex(id)
                .then(
                    function (response) {
                        vm.sectorsJob = response.data;
                    });
        }


         /**
          * Función para cargar la lista de municipios de trabajo, dependiendo de la provincia seleccionada
          * @param {any} id
          */
         function getMunicipalitiesJob(id) {
             catalogComplexService.getCatalogComplex(id)
                 .then(
                     function (response) {
                         vm.municipalitiesJob = response.data;
                     });
         }


         /**
          * Función que carga todas la lista de ciudadesdes de trabajo, dependiendo del pais seleccionado
          * @param {any} id
          */
         function getCitiesJob(id) {
             catalogComplexService.getCatalogComplex(id)
                 .then(
                     function (response) {
                         vm.citiesJob = response.data;
                     });
         }


        function openDateHired() {
            vm.popupDateHired.opened = true;
        } 

        /*
         Funcion que agrega valida que todos los campos esten llenos y agrega la fuente de ingreso a la tabla
        */
         function addJobsData(){
             vm.submitted = false;
             if(vm.formCustomerJobsData.$valid && vm.viewModelJobsData.incomeRD>messages.views.customerJobsData.minIncomeRD){
                   $timeout(function () {
                    vm.tableSourceIncome.push(vm.viewModelJobsData);
                    vm.tableValidIncome.push(vm.validJobsData);
                    vm.viewModelJobsData = {};
                    vm.validJobsData = {};
                    /*Volvemos el formulario a estado inicial del touched */
                    vm.formCustomerJobsData.$setUntouched();
                    /*Volvemos el formulario a estado inicial del setPristine,
                     para validar que el usuario no halla interactuado con el formulario*/
                    vm.formCustomerJobsData.$setPristine();
                    /*Volvemos el boolean que valida si la fuente de ingreso se encuentra disponible para editar */
                    vm.buttonEdit = false;
                }, 0);
             }else{
                  //Chequea que todos los campos obligatorios esten llenos sean validos.
                 vm.submitted = true;
                 modalFieldsRequired();
             }
         }

         function validations(){
             validOcupation();
             ocupationTypeSib();
             validCompanyDeleteSelect();
             getTypeSIB();
             autocompleteCIIU();
         }

        /**
         * Funcion para validar el campo de ocupacion, determinar el estado de la empresa y tipo de ingresos
         */  
        function validOcupation() {

            vm.validJobsData.textInvalidcalenderWork = false;
            vm.validJobsData.textInvalidincomeRD = false;
            vm.validJobsData.textInvalidCompanyName = false;
            vm.validJobsData.textInvalidCarga = false;
            vm.validJobsData.textInvalidIncome = false;
            vm.validJobsData.textInvalidlandline = false;
            vm.validJobsData.textInvalidstreet = false;
            vm.validJobsData.textInvalidnumber = false;
            vm.validJobsData.textInvalidcountry = false;
            vm.validJobsData.textInvalidprovince = false;
            vm.validJobsData.textInvalidmunicipality = false;
            vm.validJobsData.textInvalidsection = false;
            vm.validJobsData.textInvalidplace = false;
            vm.viewModelJobsData.companyName = '';
            vm.viewModelJobsData.carga = '';
            vm.viewModelJobsData.incomeType = '';
            vm.viewModelJobsData.clientSib = '';
            vm.viewModelJobsData.businessPhone = '';
            vm.viewModelJobsData.street = '';
            vm.viewModelJobsData.numberJob = '';
            vm.viewModelJobsData.country = '';
            vm.viewModelJobsData.province = '';
            vm.viewModelJobsData.municipality = '';
            vm.viewModelJobsData.section = '';
            vm.viewModelJobsData.place = '';    

                        var dataSiebel = localStorage.getItem("dataSiebel");
                        console.log(dataSiebel);
                        if(dataSiebel  === "true"){
                            var jsonData = {};
                            jsonData = JSON.parse(localStorage.getItem("jsonDataClient")); 

                            vm.viewModelJobsData.companyName = jsonData.incomes[0].companyName;
                            vm.viewModelJobsData.carga = parseInt(jsonData.incomes[0].position.id);
                            vm.viewModelJobsData.incomeRD = parseInt(jsonData.incomes[0].monthlyIncome);
                            vm.viewModelJobsData.businessPhone = parseInt(jsonData.incomes[0].companyPhone);
                            vm.viewModelJobsData.street = jsonData.incomes[0].address.street;
                            vm.viewModelJobsData.calenderWork = $filter('date')(jsonData.incomes[0].contractDate,'dd-MM-yyyy');
                            vm.viewModelJobsData.numberJob = parseInt(jsonData.incomes[0].address.number);
                            vm.viewModelJobsData.country = parseInt(jsonData.incomes[0].address.country.id);
                            vm.viewModelJobsData.province = parseInt(jsonData.incomes[0].address.province.id);
                            vm.viewModelJobsData.municipality = parseInt(jsonData.incomes[0].address.municipality.id);
                            vm.viewModelJobsData.section = parseInt(jsonData.incomes[0].address.section.id);
                            vm.viewModelJobsData.place = parseInt(jsonData.incomes[0].address.place.id);  
                            getCitiesJob(vm.viewModelJobsData.country);
                            getMunicipalitiesJob(vm.viewModelJobsData.province);
                            getSectorsJob(vm.viewModelJobsData.municipality);
                            getPlacesJob(vm.viewModelJobsData.section);
                        }
   
        
           /**
             *  @description
             *  Permite llenar el campo tipo de empresa con el valor N/A dependiendo de ocupacion
            */

            if (vm.viewModelJobsData.ocupation !== SELECT_DEFAULT.OCUPATION_INDEPENDENT && vm.viewModelJobsData.ocupation !== SELECT_DEFAULT.COMPANY_BUSINESSMAN){
                vm.viewModelJobsData.typeCompany = SELECT_DEFAULT.COMPANY_NA;
            }
            /**
             *  @ngdoc method
             *  @name validOcupation
             *  @methodOf App.controller:customerJobsDataController
             *
             *  @description
             * Autocompleta los datos de de nombre empresa con el valor N/A al seleccionar dicho campo de ocupación
             */
            angular.forEach(PROFESSION.COMPANYNAME, function (value, key){
                if (value === vm.viewModelJobsData.ocupation) {
                    vm.viewModelJobsData.companyName = 'N/A';
                    vm.validJobsData.textInvalidCompanyName = true;
                }
            });
            
             /**
             *  @ngdoc method
             *  @name validOcupation
             *  @methodOf App.controller:customerJobsDataController
             *
             *  @description
             * Autocompleta los datos de carga con el valor N/A al seleccionar dicho campo de ocupación
             */
            angular.forEach(PROFESSION.CARGA, function (value, key){
                if (value === vm.viewModelJobsData.ocupation) {                    
                    vm.viewModelJobsData.carga = SELECT_DEFAULT.VALUE_NA;
                    vm.validJobsData.textInvalidCarga = true;
                }
            });

            /**
             *  @ngdoc method
             *  @name validOcupation
             *  @methodOf App.controller:customerJobsDataController
             *
             *  @description
             * llenado automatico del select tipo de ingreso, con el valor ingresos salariales para dichos campos
             * selecciodos en ocupación 
             */

            angular.forEach(PROFESSION.WAGEINCOME, function (value, key) {
                if (value === vm.viewModelJobsData.ocupation) {
                    getIncome();
                    vm.viewModelJobsData.incomeType = SELECT_DEFAULT.INCOME_SALARY;
                    vm.validJobsData.textInvalidIncome = true;
                    vm.nameIncomeType(vm.viewModelJobsData.incomeType);
                }
            });

            /**
             *  @ngdoc method
             *  @name validOcupation
             *  @methodOf App.controller:customerJobsDataController
             *
             *  @description
             * llenado automatico del select tipo de ingreso, con el valor ingresos familiares para dichos campos
             * seleccionados en ocupación
             */

            angular.forEach(PROFESSION.FAMILYINCOME, function (value, key) {
                if (value === vm.viewModelJobsData.ocupation) {
                    getIncome();
                    vm.viewModelJobsData.incomeType = SELECT_DEFAULT.INCOME_FAMILY;
                    vm.validJobsData.textInvalidIncome = true;
                    vm.nameIncomeType(vm.viewModelJobsData.incomeType);
            
                }
            });

            /* Validacion del numero de telefono por la ocupación del cliente */
            angular.forEach(PROFESSION.NUMBER_PHONE, function (value, key) {
                $timeout(function(){
                    if (value === vm.viewModelJobsData.ocupation){
                            vm.viewModelJobsData.businessPhone = vm.dataLandLine;       
                    }
                }, 0);
            });
        }
        /**
         * Función que nos trae los datos del cliente, para autocompletar dependiendo del tipo de ocupación
         */
        function dataAutoComplete(){

            vm.viewModelJobsData.street = vm.dataStreet;
            vm.viewModelJobsData.numberJob = vm.dataNumber;
            vm.viewModelJobsData.country = vm.dataCountry;
            vm.viewModelJobsData.businessPhone = vm.dataLandLine;
            vm.viewModelJobsData.province = vm.dataProvince;
            vm.viewModelJobsData.municipality = vm.dataMunicipality;
            vm.viewModelJobsData.section = vm.dataSection;
            vm.viewModelJobsData.place = vm.dataPlace;
            vm.validJobsData.textInvalidplace = true;
            vm.validJobsData.textInvalidsection = true;
            vm.validJobsData.textInvalidmunicipality = true;
            vm.validJobsData.textInvalidprovince = true;
            vm.validJobsData.textInvalidcountry = true;
            vm.validJobsData.textInvalidnumber = true;
            vm.validJobsData.textInvalidstreet = true;

            getCitiesJob(vm.viewModelJobsData.country);
            getMunicipalitiesJob(vm.viewModelJobsData.province);
            getSectorsJob(vm.viewModelJobsData.municipality);
            getPlacesJob(vm.viewModelJobsData.section);

        }

        /**
         * 
         * Funcion que trae los tipos de sib.
         * @param {any} id
         */
        function ocupationTypeSib(){
            getIncome();
            vm.viewModelJobsData.clientSib = '';
            
            if (vm.viewModelJobsData.ocupation === SELECT_DEFAULT.OCUPATION_EMPLOYEE_PUBLIC || vm.viewModelJobsData.ocupation === SELECT_DEFAULT.OCUPATION_PENSIONER_PUBLIC) {
                 vm.idOccupation = vm.viewModelJobsData.ocupation;
                 vm.idAcademicLevel = 0;
                 vm.dEnterpriseType = 0;
            }
            if (vm.viewModelJobsData.ocupation === SELECT_DEFAULT.OCUPATION_EMPLOYEE_PRIVATE || vm.viewModelJobsData.ocupation === SELECT_DEFAULT.OCUPATION_PENSIONER_PRIVATE) {
                 vm.idOccupation = vm.viewModelJobsData.ocupation;
                 vm.idAcademicLevel = 0;
                 vm.dEnterpriseType = 0;
            }

            if (vm.viewModelJobsData.ocupation === SELECT_DEFAULT.OCUPATION_STUDENT || vm.viewModelJobsData.ocupation === SELECT_DEFAULT.OCUPATION_HOUSEWIFI){
                 dataAutoComplete();
                 vm.idOccupation = vm.viewModelJobsData.ocupation;
                 vm.idAcademicLevel = 0;
                 vm.dEnterpriseType = 0;
            }

            if (vm.viewModelJobsData.ocupation === SELECT_DEFAULT.OCUPATION_NOTBUSY) {
                dataAutoComplete();
                vm.idOccupation = vm.viewModelJobsData.ocupation;
                vm.idAcademicLevel = 0;
                vm.dEnterpriseType = 0;
                catalogService.getCatalog(CATALOG.TYPEINCOME)
                    .then(
                        function (response) {
                            vm.income = response.data;
                            angular.forEach(vm.income, function (value2, key2) {
                                if (value2.id === SELECT_DEFAULT.INCOME_SALARY) {
                                    vm.income.splice(key2, 1);
                                }
                            });
                        });
            }
        }

        function validCompanyDeleteSelect() {
            vm.viewModelJobsData.clientSib = '';

            if (vm.viewModelJobsData.ocupation === SELECT_DEFAULT.OCUPATION_INDEPENDENT) {
                vm.idOccupation = vm.viewModelJobsData.ocupation;
                vm.idAcademicLevel = $rootScope.dataFormCustomerBasicData.idAcademicLevel;
                catalogService.getCatalog(CATALOG.TYPE_BUSINESS)
                    .then(
                        function (response) {
                            vm.companyValue = response.data;
                            angular.forEach(vm.companyValue, function (value, key) {
                                if (value.id === SELECT_DEFAULT.COMPANY_COORPORATIVA) {
                                    vm.companyValue.splice(key, 1);
                                }
                                if (value.id === SELECT_DEFAULT.COMPANY_PYME) {
                                    vm.companyValue.splice(key, 1);
                                }

                            });
                        });

            }

            if (vm.viewModelJobsData.ocupation === SELECT_DEFAULT.COMPANY_BUSINESSMAN) {

                vm.idOccupation = vm.viewModelJobsData.ocupation;
                vm.idAcademicLevel = $rootScope.dataFormCustomerBasicData.idAcademicLevel;

                catalogService.getCatalog(CATALOG.TYPE_BUSINESS)
                    .then(
                        function (response) {
                            vm.companyValue = response.data;
                            angular.forEach(vm.companyValue, function (value3, key3) {
                                if (value3.id === SELECT_DEFAULT.COMPANY_NA) {
                                    vm.companyValue.splice(key3, 1);
                                }
                            });
                        });
                catalogService.getCatalog(CATALOG.TYPEINCOME)
                    .then(
                        function (response) {
                            vm.income = response.data;
                            angular.forEach(vm.income, function (value, key) {
                                if (value.id === SELECT_DEFAULT.INCOME_FAMILY) {
                                    vm.income.splice(key, 1);
                                }
                            });
                        });
            }
        }

        function validCompanyTypeSib() {

            vm.viewModelJobsData.clientSib = '';

            if (vm.viewModelJobsData.ocupation === SELECT_DEFAULT.OCUPATION_INDEPENDENT){
                if (vm.viewModelJobsData.typeCompany === SELECT_DEFAULT.COMPANY_MICRCOMPANY){
                    vm.dEnterpriseType = vm.viewModelJobsData.typeCompany;
                }
                if (vm.viewModelJobsData.typeCompany === SELECT_DEFAULT.COMPANY_NA){
                    vm.dEnterpriseType = vm.viewModelJobsData.typeCompany;
                }
            }

            if (vm.viewModelJobsData.ocupation === SELECT_DEFAULT.COMPANY_BUSINESSMAN) {   
                if (vm.viewModelJobsData.typeCompany === SELECT_DEFAULT.COMPANY_MICRCOMPANY){
                    vm.dEnterpriseType = vm.viewModelJobsData.typeCompany;
                }
                if (vm.viewModelJobsData.typeCompany === SELECT_DEFAULT.COMPANY_NA){
                    vm.dEnterpriseType = vm.viewModelJobsData.typeCompany;
                }
                if (vm.viewModelJobsData.typeCompany === SELECT_DEFAULT.COMPANY_COORPORATIVA){
                    vm.dEnterpriseType = vm.viewModelJobsData.typeCompany;
                }
                if (vm.viewModelJobsData.typeCompany === SELECT_DEFAULT.COMPANY_PYME){
                    vm.dEnterpriseType = vm.viewModelJobsData.typeCompany;
            }
          }

          getTypeSIB();
        }

        function getTypeSIB() {
            catalogComplexService.getSiebelTYpeSib(vm.dEnterpriseType, vm.idAcademicLevel, vm.idOccupation)
                .then(
                    function (response) {
                        vm.viewModelJobsData.clientSib = '';
                        vm.viewModelJobsData.idClientSib = '';
                        vm.dataSib = response.data;
                        vm.viewModelJobsData.clientSib = response.data.value;
                        vm.viewModelJobsData.idClientSib = response.data.id;
                    });
        }




        /**
         * Función que carga todos los tipos de SIB desde el catalago de servicios
         */
        function getSib() {
            catalogService.getCatalog(CATALOG.TYPE_SIB)
                .then(
                function (response) {
                    vm.typeSib = response.data;
                });
        }
        getSib();       


        /**
         * Función que carga todos los cargos desde el catalago de servicios
         */
        function getJob() {
            catalogService.getCatalog(CATALOG.JOB_FUNCTION)
                .then(
                function (response) {
                    vm.jobValue = response.data;
                });
        }

        getJob();


        /**
         * Función que carga las ocupasiones desde el catalago de servicios
         */
        function getOcupation() {
            catalogService.getCatalog(CATALOG.OCUPATION)
                .then(
                function (response) {
                    vm.activitiesValue = response.data;
                        var dataSiebel = localStorage.getItem("dataSiebel");
                        console.log(dataSiebel);
                        if(dataSiebel  === "true"){
                            var jsonData = {};
                            jsonData = JSON.parse(localStorage.getItem("jsonDataClient"));

                            vm.viewModelJobsData.ocupation = parseInt(jsonData.incomes[0].occupation.id);
                            validations();
                        }
                });
        }

        getOcupation();


        /**
         * Función que carga todos los paises desde el catalogo de servicios
         */
        function getCountries(){
            catalogService.getCatalog(CATALOG.COUNTRIES)
                .then(
                function (response) {
                    vm.countries = response.data;
                });
        }
        
        /*Llamado de la función para obtener los la lista de paises*/
        getCountries();


        /**
         * Función que carga todos los tipos de ingresos desde el catalogo de servicios
         */
        function getIncome(){
            catalogService.getCatalog(CATALOG.TYPEINCOME)
                .then(
                function (response) {
                    vm.income = response.data;
                });
        }
        
        /*Llamado de la función para obtener los tipos de ingresos*/
        getIncome();


        function getCodeCiiu(id) {
            catalogComplexService.getCatalogComplex(id)
                .then(
                function (response) {
                    vm.listCodeCiiu = response.data;
                });
        }


        /**
         * Función que carga las actividades economicas en nivel 2, y tambien trae el valor del CIUU
         */

        function getActivityNiv2(id) {
            catalogComplexService.getCatalogComplex(id)
                .then(
                function (response) {
                    vm.activitiesNiv2 = response.data;
                });
        }

        /**
         * Función que carga la lista de actividades economicas nivel 1, dependiente de la industria
         */

        function getActivityNiv1(id) {
            catalogComplexService.getCatalogComplex(id)
                .then(
                function (response) {
                    vm.activitiesNiv1 = response.data;
                });
        }

        /**
         * Función que carga la lista de industria, dependiendo del sector economicos
         */
        function getIndustry(id) {
            catalogComplexService.getCatalogComplex(id)
                .then(
                function (response) {
                    vm.industries = response.data;
                });
        }



        /**
         * Función que carga todos los sectores economicos 
         */
        function getSectorEconomic() {
            catalogService.getCatalog(CATALOG.SECTORE_ECONOMI)
                .then(
                function (response) {
                    vm.sectors = response.data;
                });
        }

        getSectorEconomic();

        /*Funcion para abrir el modal de cancelar*/
        function modalCancel() {
            modalFactory.cancel();
        }

        /**
         *  @ngdoc function
         *  @name modalPrevious
         *  @methodOf App.controller:customerJobsDataController
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
                    //Indicamos que se viene de la vista de jobsData para cargar los datos basicos del cliente
                    $rootScope.since.jobsData = true ;
                    //Redireccionamos a la vista de datos basicos del cliente 
                    $state.go('customerBasicData');
                }, 300);
            });
        }

        /**
         * función que valida y guarda los datos del cliente
        */
        function saveJobsData() {
            var arrayJobsData = []; /*Array donde se almacerá los json con los datos laborales del lciente a enviar al servicio */
            var jsonJobsData = {}; /*Json que contendrá la estructura y los datos enviados al Array arrayJobsData */
            var PrincipalActivity = 0; /*Variable que nos indica cual es la actividad economica principal */
            
            if (angular.isDefined(vm.tableSourceIncome[0])) {
                if (vm.formCustomerJobsData.$dirty) {
                    modalFactory.warning(messages.views.customerJobsData.modalFormCompleteOrClean);
                } else {
                    angular.forEach(vm.tableSourceIncome, function(value, key){
                        /*Agregamos la actividad economica principal con el valor char 1 */
                        if(key===0){
                            PrincipalActivity = '1';
                        }else{
                            PrincipalActivity = '0';
                        }

                        jsonJobsData.documentNumber = $rootScope.customerDataCredit.numberIdentification;
                        jsonJobsData.idOcupation = value.ocupation;
                        jsonJobsData.companyName  = value.companyName;
                        jsonJobsData.idPosition = value.carga;
                        jsonJobsData.contratacionDate = $filter('date')(value.calenderWork,'yyyy-MM-dd');
                        jsonJobsData.companyPhone = value.businessPhone;
                        jsonJobsData.idIncomeType = value.incomeType;
                        jsonJobsData.monthlyIncome = value.incomeRD;
                        jsonJobsData.idSibCustomerType = value.idClientSib;
                        jsonJobsData.empIdCompanyType = value.typeCompany;
                        jsonJobsData.empTotalEmployee = value.totalEmployees;
                        jsonJobsData.empTotalActive = value.totalAssets;
                        jsonJobsData.empTotalEntry = value.totalIncome;
                        jsonJobsData.idCiiuCode = value.mainActivityCIIU;
                        jsonJobsData.isPrincipalActivity = PrincipalActivity;
                        jsonJobsData.street = value.street;
                        jsonJobsData.numbers = value.numberJob;
                        jsonJobsData.idCountry = value.country;
                        jsonJobsData.idProvince = value.province;
                        jsonJobsData.idMunicipality = value.municipality;
                        jsonJobsData.idSection = value.section;
                        jsonJobsData.idPlace = value.place;

                        arrayJobsData.push(jsonJobsData);
                        jsonJobsData = {};

                        $rootScope.dataFormCustomerJobsData = angular.copy(vm.tableSourceIncome);
                        $rootScope.validInputJobsData = angular.copy(vm.tableValidIncome);
                    });

                    if(dataSiebel === "true"){

                            var jsonJobsDataSiebel = {};
                            angular.forEach(vm.tableSourceIncome, function(value, key){
                                /*Agregamos la actividad economica principal con el valor char 1 */
                                if(key===0){
                                    PrincipalActivity = '1';
                                }else{
                                    PrincipalActivity = '0';
                                }

                                jsonJobsDataSiebel.documentNumber = $rootScope.customerDataCredit.numberIdentification;
                                jsonJobsDataSiebel.idOcupation = value.ocupation;
                                jsonJobsDataSiebel.companyName  = value.companyName;
                                jsonJobsDataSiebel.idPosition = value.carga;
                                jsonJobsDataSiebel.contratacionDate = $filter('date')(value.calenderWork,'yyyy-MM-dd');
                                jsonJobsDataSiebel.companyPhone = value.businessPhone;
                                jsonJobsDataSiebel.idIncomeType = value.incomeType;
                                jsonJobsDataSiebel.monthlyIncome = value.incomeRD;
                                jsonJobsDataSiebel.idSibCustomerType = value.idClientSib;
                                /*jsonJobsDataSiebel.empIdCompanyType = value.typeCompany;
                                jsonJobsDataSiebel.empTotalEmployee = value.totalEmployees;
                                jsonJobsDataSiebel.empTotalActive = value.totalAssets;
                                jsonJobsDataSiebel.empTotalEntry = value.totalIncome;*/
                                jsonJobsDataSiebel.idCiiuCode = value.mainActivityCIIU;
                                jsonJobsDataSiebel.isPrincipalActivity = PrincipalActivity;
                                jsonJobsDataSiebel.street = value.street;
                                jsonJobsDataSiebel.numbers = value.numberJob;
                                jsonJobsDataSiebel.idCountry = value.country;
                                jsonJobsDataSiebel.idProvince = value.province;
                                jsonJobsDataSiebel.idMunicipality = value.municipality;
                                jsonJobsDataSiebel.idSection = value.section;
                                jsonJobsDataSiebel.idPlace = value.place;

                                arrayJobsData.push(jsonJobsDataSiebel);
                                jsonJobsDataSiebel = {};

                                $rootScope.dataFormCustomerJobsData = angular.copy(vm.tableSourceIncome);
                                $rootScope.validInputJobsData = angular.copy(vm.tableValidIncome);
                            });
                        var clientPortal = JSON.parse(localStorage.getItem("clientPortal"));

                        if (clientPortal) {
                                updateLaborDataService.putLaborDataSiebel(jsonJobsDataSiebel);
                                $state.go('customerForeignCurrency');
                        }else {
                                updateLaborDataService.putLaborData(jsonJobsDataSiebel);
                                /*Redireccionamos a la vista de datos laborales */
                                $state.go('customerForeignCurrency');
                        }
                    }else {
                        /*Llamos al servicio que actualiza los datos laborales del cliente */
                        updateLaborDataService.putLaborData(arrayJobsData);
                        $state.go('customerForeignCurrency');
                    }
                }
            } else {
                if (vm.formCustomerJobsData.$valid && vm.viewModelJobsData.incomeRD>messages.views.customerJobsData.minIncomeRD) {
                     /*Guardamos todo lo que está en el formualrio y lo hacemos global */
                    $rootScope.dataFormCustomerJobsData[0] = angular.copy(vm.viewModelJobsData);
                    $rootScope.validInputJobsData[0] = angular.copy(vm.validJobsData);

                    jsonJobsData.documentNumber = $rootScope.customerDataCredit.numberIdentification;
                    jsonJobsData.idOcupation = vm.viewModelJobsData.ocupation;
                    jsonJobsData.companyName = vm.viewModelJobsData.companyName;
                    jsonJobsData.idPosition = vm.viewModelJobsData.carga;
                    jsonJobsData.contratacionDate = $filter('date')(vm.viewModelJobsData.calenderWork, 'yyyy-MM-dd');
                    jsonJobsData.companyPhone = vm.viewModelJobsData.businessPhone;
                    jsonJobsData.idIncomeType = vm.viewModelJobsData.incomeType;
                    jsonJobsData.monthlyIncome = vm.viewModelJobsData.incomeRD;
                    jsonJobsData.idSibCustomerType = vm.viewModelJobsData.idClientSib;
                    jsonJobsData.empIdCompanyType = vm.viewModelJobsData.typeCompany;
                    jsonJobsData.empTotalEmployee = vm.viewModelJobsData.totalEmployees;
                    jsonJobsData.empTotalActive = vm.viewModelJobsData.totalAssets;
                    jsonJobsData.empTotalEntry = vm.viewModelJobsData.totalIncome;
                    jsonJobsData.idCiiuCode = vm.viewModelJobsData.mainActivityCIIU;
                    jsonJobsData.isPrincipalActivity = '1';
                    jsonJobsData.street = vm.viewModelJobsData.street;
                    jsonJobsData.numbers = vm.viewModelJobsData.numberJob;
                    jsonJobsData.idCountry = vm.viewModelJobsData.country;
                    jsonJobsData.idProvince = vm.viewModelJobsData.province;
                    jsonJobsData.idMunicipality = vm.viewModelJobsData.municipality;
                    jsonJobsData.idSection = vm.viewModelJobsData.section;
                    jsonJobsData.idPlace = vm.viewModelJobsData.place;

                    arrayJobsData.push(jsonJobsData);

                    if(dataSiebel === "true"){

                        var jsonJobsDataSiebel = {};
                        jsonJobsDataSiebel.documentNumber = $rootScope.customerDataCredit.numberIdentification;
                        jsonJobsDataSiebel.idOcupation = vm.viewModelJobsData.ocupation;
                        jsonJobsDataSiebel.companyName = vm.viewModelJobsData.companyName;
                        jsonJobsDataSiebel.idPosition = vm.viewModelJobsData.carga;
                        jsonJobsDataSiebel.contratacionDate = $filter('date')(vm.viewModelJobsData.calenderWork, 'yyyy-MM-dd');
                        jsonJobsDataSiebel.companyPhone = vm.viewModelJobsData.businessPhone;
                        jsonJobsDataSiebel.idIncomeType = vm.viewModelJobsData.incomeType;
                        jsonJobsDataSiebel.monthlyIncome = vm.viewModelJobsData.incomeRD;
                        jsonJobsDataSiebel.idSibCustomerType = vm.viewModelJobsData.idClientSib;
                        jsonJobsDataSiebel.empIdCompanyType = vm.viewModelJobsData.typeCompany;
                        jsonJobsDataSiebel.empTotalEmployee = vm.viewModelJobsData.totalEmployees;
                        jsonJobsDataSiebel.empTotalActive = vm.viewModelJobsData.totalAssets;
                        jsonJobsDataSiebel.empTotalEntry = vm.viewModelJobsData.totalIncome;
                        jsonJobsDataSiebel.idCiiuCode = vm.viewModelJobsData.mainActivityCIIU;
                        jsonJobsDataSiebel.isPrincipalActivity = '1';
                        jsonJobsDataSiebel.street = vm.viewModelJobsData.street;
                        jsonJobsDataSiebel.numbers = vm.viewModelJobsData.numberJob;
                        jsonJobsDataSiebel.idCountry = vm.viewModelJobsData.country;
                        jsonJobsDataSiebel.idProvince = vm.viewModelJobsData.province;
                        jsonJobsDataSiebel.idMunicipality = vm.viewModelJobsData.municipality;
                        jsonJobsDataSiebel.idSection = vm.viewModelJobsData.section;
                        jsonJobsDataSiebel.idPlace = vm.viewModelJobsData.place;

                        $rootScope.globalUserJSon.documentNumber = jsonJobsDataSiebel.documentNumber;
                        $rootScope.globalUserJSon.idOcupation = jsonJobsDataSiebel.idOcupation;
                        $rootScope.globalUserJSon.companyName = jsonJobsDataSiebel.companyName;
                        $rootScope.globalUserJSon.idPosition = jsonJobsDataSiebel.idPosition;
                        $rootScope.globalUserJSon.contratacionDate = jsonJobsDataSiebel.contratacionDate;
                        $rootScope.globalUserJSon.companyPhone = jsonJobsDataSiebel.companyPhone;
                        $rootScope.globalUserJSon.idIncomeType = jsonJobsDataSiebel.idIncomeType;
                        $rootScope.globalUserJSon.monthlyIncome = jsonJobsDataSiebel.monthlyIncome;
                        $rootScope.globalUserJSon.idSibCustomerType = jsonJobsDataSiebel.idSibCustomerType;
                        $rootScope.globalUserJSon.empIdCompanyType = jsonJobsDataSiebel.empIdCompanyType;
                        $rootScope.globalUserJSon.empTotalEmployee = jsonJobsDataSiebel.empTotalEmployee;
                        $rootScope.globalUserJSon.empTotalActive = jsonJobsDataSiebel.empTotalActive;
                        $rootScope.globalUserJSon.empTotalEntry = jsonJobsDataSiebel.empTotalEntry;
                        $rootScope.globalUserJSon.idCiiuCode = jsonJobsDataSiebel.idCiiuCode;
                        $rootScope.globalUserJSon.isPrincipalActivity = jsonJobsDataSiebel.isPrincipalActivity;
                        $rootScope.globalUserJSon.street = jsonJobsDataSiebel.street;
                        $rootScope.globalUserJSon.numbers = jsonJobsDataSiebel.numbers;
                        $rootScope.globalUserJSon.idCountry = jsonJobsDataSiebel.idCountry;
                        $rootScope.globalUserJSon.idProvince = jsonJobsDataSiebel.idProvince;
                        $rootScope.globalUserJSon.idMunicipality = jsonJobsDataSiebel.idMunicipality;
                        $rootScope.globalUserJSon.idSection = jsonJobsDataSiebel.idSection;
                        $rootScope.globalUserJSon.idPlace = jsonJobsDataSiebel.idPlace;

                        var clientPortal = JSON.parse(localStorage.getItem("clientPortal"));

                        if (clientPortal) {
                                updateLaborDataService.putLaborDataSiebel(jsonJobsDataSiebel);
                                $state.go('customerForeignCurrency');
                        }else {
                                updateLaborDataService.putLaborData(jsonJobsDataSiebel);
                                /*Redireccionamos a la vista de datos laborales */
                                $state.go('customerForeignCurrency');
                        }
                    }else {
                        arrayJobsData.push(jsonJobsData);
                        
                        /*Llamos al servicio que actualiza los datos laborales del cliente */
                        updateLaborDataService.putLaborData(arrayJobsData);
                        $state.go('customerForeignCurrency');
                    }
                    
                } else {
                    //Chequea que todos los campos obligatorios esten llenos sean validos.
                    vm.submitted = true;
                    modalFieldsRequired();
                }


            }

        }

        /*Funcion para abrir el modal de limpiar formulario*/
        function modalCleanForm() {
            sweet.show({
                title: messages.modals.warning.modaltitleWarning,
                text: messages.views.customerJobsData.modalCleanForm,
                type: messages.modals.warning.modalTypeWarning,
                showCancelButton: true,
                cancelButtonText: messages.modals.warning.modalCancelButton,
                confirmButtonColor: messages.modals.warning.modalColorButton,
                confirmButtonText: messages.modals.warning.modalConfirText,
                closeOnConfirm: true
            }, function () {
                $timeout(function () {
                    vm.viewModelJobsData = {};
                    vm.validJobsData.textInvalidCompanyName = true;
                    vm.validJobsData.textInvalidCarga = true;
                    vm.validJobsData.textInvalidIncome = true;
                    vm.validJobsData.textInvalidlandline = true;
                    vm.validJobsData.textInvalidstreet = true;
                    vm.validJobsData.textInvalidincomeRD = true;
                    vm.validJobsData.textInvalidnumber = true;
                    vm.validJobsData.textInvalidcountry = true;
                    vm.validJobsData.textInvalidprovince = true;
                    vm.validJobsData.textInvalidcalenderWork = true;
                    vm.validJobsData.textInvalidmunicipality = true;
                    vm.validJobsData.textInvalidsection = true;
                    vm.validJobsData.textInvalidplace = true;
                    vm.validJobsData.ciuuAutocomplete = true;
                    /*Volvemos el formulario a estado inicial del touched */
                    vm.formCustomerJobsData.$setUntouched();
                    vm.formCustomerJobsData.$setPristine();
                    /*Volvemos el boolean que valida si la fuente de ingreso se encuentra disponible para editar */
                    vm.buttonEdit = false;
                    vm.submitted = false;
                }, 0);
            });
        }


        /*Funcion para abrir el modal de campos obligatorios*/
         function modalFieldsRequired () {
             modalFactory.warning(messages.modals.error.completeRequiredFields);
         }        
           
    }
})();