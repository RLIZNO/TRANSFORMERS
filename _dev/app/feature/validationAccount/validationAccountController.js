(function () {
    'use strict';

    angular
        .module('validationAccountModule')
        .controller('validationAccountController', validationAccountController);

    //Inyeccion de dependencias
    validationAccountController.$inject = [
        'sweet',
        '$state',
        'validationClientService',
        '$rootScope',
        'SELECT_DEFAULT', 
        '$filter',
        '$timeout',        
        'ngXml2json',
        'modalFactory',
        'utilFactory',
        'URL', 
        'creditBureauService',
        'creditListService',
        'catalogService',
        'CATALOG',
        'YES_NO',
        'saveIdentificationService',
        'messages',
        'addTableService'
        ];

    function validationAccountController(
        sweet,
        $state,
        validationClientService,
        $rootScope,
        SELECT_DEFAULT,  
        $filter,
        $timeout, 
        ngXml2json, 
        modalFactory,
        utilFactory,
        URL,    
        creditBureauService,
        creditListService,
        catalogService,
        CATALOG,
        YES_NO,
        saveIdentificationService,
        messages,
            addTableService
    ) {
        var vm = this;
         /**
         *  @ngdoc property
         *  @name validationAccount
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Objeto para conocer los datos del formulario.
         */
        vm.viewModelvalidationAccount = {
            typeIdentification : SELECT_DEFAULT.TYPE_DOCUMENTS,
            positionValue : '',
            transactionsAch : ''
        };
        vm.typeDocuments = '';
        vm.optionsYesNo = [];
        vm.productTyoe = [];
        vm.validDebitNo = '';
        vm.alert = false;
        vm.username = 'AM029969';
        vm.findJudicialEvaluation = false;
        vm.accountActive = false;
        vm.customerInvalid = false;
        //vm.preaprobado=false;
        vm.limitRD="";
        vm.limitUSD="";
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
         *  @propertyOf App.controller:validationAccountController
         *
         *  @description
         *  Almacena si la consulta del Buró finalizó.
         */
        vm.getBureau = false;

        /**
         *  @ngdoc property
         *  @name findJudicialEvaluation
         *  @propertyOf App.controller:validationAccountController
         *
         *  @description
         *  Almacena si el cliente fue encontrado en la ficha judicial.
         */
        vm.findJudicialEvaluation = false;

        /**
         *  @ngdoc property
         *  @name getControlList
         *  @propertyOf App.controller:validationAccountController
         *
         *  @description
         *  Permite almacenar si la consulta de listas de control finalizó.
         */
        vm.getControlList = false;
        /**
         *  @ngdoc property
         *  @name findControlListReport
         *  @propertyOf App.controller:validationAccountController
         *
         *  @description
         *  Almacena si el cliente fue encontrado en listas de control.
         */
        vm.findControlListReport = false;

        /**
         *  @ngdoc property
         *  @name findPep
         *  @propertyOf App.controller:validationAccountController
         *
         *  @description
         *  Almacena si el cliente se encuentra en listas PEP. 
         */
        vm.findPep = false;
        /**
         *  @ngdoc property
         *  @name ageAllowed
         *  @propertyOf App.controller:validationAccountController
         *
         *  @description
         *  Almacena la validacion de la edad del cliente.  
         */
        vm.ageAllowed = false;
        /**
         *  @ngdoc property
         *  @name validationClient
         *  @propertyOf App.controller:validationAccountController
         *
         *  @description
         *  Permite almacenar la validación del cliente.  
         */
        vm.validationClient = false;
        /**
         *  @ngdoc property
         *  @name urlXml
         *  @propertyOf App.controller:validationAccountController
         *
         *  @description
         *  Permite almacenar la url del xml de consulta del Buró.  
         */
        vm.urlXml = null;
        vm.cleintInvalid = true;
        vm.clientNo = true;
        vm.clientYes = false;
        /**
         *  @ngdoc property
         *  @name isDominicanRepublic
         *  @propertyOf App.controller:validationAccountController
         *
         *  @description
         *  Permite identificar si el cliente es de Republica Dominicana o no.  
         */
        vm.precarga = '';
        vm.decisionMessage = '';
        vm.isDominicanRepublic = false;
        vm.decisionMoti = '';
        vm.fichaBand = false;
        vm.dataClientExit = [];
        vm.keyCardNumber = false;
        vm.validpreAprobado = false;
        vm.deferred = '';
        vm.dopLimit = '';
        vm.usdLimit = '';
        vm.livingPlace = '';
        vm.limiteMaximoRd = '';
        vm.limiteMaximoUs = '';
        vm.jsonDataTc = {};
        vm.clientCanContinue = false;
        vm.clientAprobado = false;
        var jsonData = {};
        vm.viewModelvalidationAccount.basicData = {
                email : null,
                firstLastName : null,
                firstName : null,
                secondLastName : null,
                secondName : null
            };

        vm.popupDatePassport = { /*Boolean que abre y cierra el datepicker de fecha de pasaporte */
            opened: false
        };

        var documentNumber = vm.viewModelvalidationAccount.numberIdentification;
        /**
         *  @ngdoc property
         *  @name $rootScope.dataUser.typeDocument
         *  @propertyOf App.controller:validationAccountController
         *
         *  @description
         *  Variable global que guarda el tipo de documento seleccionado del cliente 
         */
        //$rootScope.dataUser.typeDocument = vm.viewModelvalidationAccount.typeIdentification;
        vm.espresion = false;
        vm.limitRDmayor = false;
        /*Funciones*/
        vm.getTypeDocuments = getTypeDocuments;
        vm.getTaskYesNo = getTaskYesNo;
        vm.getValidLiving = getValidLiving;
        vm.getCreditBureau = getCreditBureau;
        vm.getCreditListService = getCreditListService;
        vm.validNationality = validNationality;
        vm.modalCancel = modalCancel;
        vm.getCreditBureauNoCLient = getCreditBureauNoCLient;
        vm.modalError = modalError;
        vm.validationData = validationData;
        vm.validateClient = validateClient;
        vm.resetData = resetData;
        vm.getvalidateClientCreditCard = getvalidateClientCreditCard;
        vm.limite = limite;
        vm.monthyLimit = monthyLimit;
        vm.cleanLimit = cleanLimit;
        vm.limite2 = limite2;
        vm.limite3 = limite3
        vm.cleanLimit2 = cleanLimit2;
        vm.cleanLimit3 = cleanLimit3;
        vm.yearValid = yearValid;
        vm.openDatePassport  = openDatePassport;
        vm.validFico = validFico;
        vm.datePassport = "";
        //console.log($rootScope.globalLimitData);
        $rootScope.globalLimitData={};

        function loadCreditCardFirstData(){
           addTableService.allTable().then(function(responseValue) {
               //$rootScope.globalLimitData = responseValue.productLimit[0];
               angular.forEach(responseValue.productLimit, function (value, key) {
                   if (value.status == "A") {
                       throw $rootScope.globalLimitData = responseValue.productLimit[key];
                   }
               });
           });
        }
        loadCreditCardFirstData();
        /**
         * Función que abre el popup del datepicker para la fecha de expedicion del pasaporte
         */
        function openDatePassport() {
            vm.popupDatePassport.opened = true;
        }

        

        function yearValid(){
            if (vm.viewModelvalidationAccount.howYear){
                
                    replaceAll(vm.viewModelvalidationAccount.howYear , '.', "" );
                    function replaceAll( text, busca, reemplaza ){
                    while (text.toString().indexOf(busca) != -1) 
                            text = text.toString().replace(busca,reemplaza);
                            vm.viewModelvalidationAccount.howYear= text;
                            return text;
                    
                }
            }
        }

        var bin = localStorage.getItem("bin");
        if (bin === "true") {
            $state.go('transitionManteniment');
        }
        var transacion = localStorage.getItem("transacion");
        if (transacion === "true") {
            $state.go('transactionCode');
        }
        var afiliados = localStorage.getItem("afiliados");
        if (afiliados === "true") {
            $state.go('transactionAffiliate');
        }
        var comercio = localStorage.getItem("comercio");
        if (comercio === "true") {
            $state.go('transactionComerce');
        }
        var reglas = localStorage.getItem("reglas");
        if (reglas === "true") {
            $state.go('transactionRole');
        }
        var validclientTc = localStorage.getItem("validclientTc");
        if (validclientTc === 'validclientTc'){
            $state.go('moldedFormalization');
        } 

        var consultAff = localStorage.getItem("consultAff");
        if (consultAff === 'true'){
            $state.go('consultAff');
        } 

        var consultClient = localStorage.getItem("consultClient");
        if (consultClient === 'true'){
            $state.go('consultClient');
        } 

        function cleanLimit () {
            var limiteReplace;
            if (vm.viewModelvalidationAccount.limitRD){
                vm.espresion = false;
                    replaceAll(vm.viewModelvalidationAccount.limitRD , ".", "," );
                    function replaceAll( text, busca, reemplaza ){
                    while (text.toString().indexOf(busca) != -1) 
                            text = text.toString().replace(busca,reemplaza);
                            vm.viewModelvalidationAccount.limitRD = text;
                            return text;
                    
                }
            }
        }

        function monthyclean () {
            var limiteReplace;
            if (vm.viewModelvalidationAccount.monthyIncome){
                vm.monthyLimit = false;
                    replaceAll(vm.viewModelvalidationAccount.monthyIncome , ".", "," );
                    function replaceAll( text, busca, reemplaza ){
                    while (text.toString().indexOf(busca) != -1) 
                            text = text.toString().replace(busca,reemplaza);
                            vm.viewModelvalidationAccount.monthyIncome = text;
                            return text;
                    
                }
            }
        }

        function cleanLimit2(){
            if (vm.viewModelvalidationAccount.limitDiferidoRD){
                    vm.espresion2 = false;
                    replaceAll(vm.viewModelvalidationAccount.limitDiferidoRD , ".", "," );
                    function replaceAll( text, busca, reemplaza ){
                    while (text.toString().indexOf(busca) != -1) 
                            text = text.toString().replace(busca,reemplaza);
                            vm.viewModelvalidationAccount.limitDiferidoRD = text;
                            return text;
                    
                }
            }
        }

        function cleanLimit3(){
            if (vm.viewModelvalidationAccount.limitUSD){
                vm.espresion3 = false;
                    replaceAll(vm.viewModelvalidationAccount.limitUSD , ".", "," );
                    function replaceAll( text, busca, reemplaza ){
                    while (text.toString().indexOf(busca) != -1) 
                            text = text.toString().replace(busca,reemplaza);
                            vm.viewModelvalidationAccount.limitUSD = text;
                            return text;
                    
                }
            }
        }

        function limite(){
           
           if (vm.viewModelvalidationAccount.limitRD){
                
                var maxLimit = vm.viewModelvalidationAccount.limitRD;
                limitRD(maxLimit , ",", "" );
                function limitRD( text, busca, reemplaza ){
                while (text.toString().indexOf(busca) != -1) 
                        text = text.toString().replace(busca,reemplaza);
                        maxLimit = text;
                        return text;
                    
                }

               if (parseInt(maxLimit) > parseInt(vm.limiteMaximoRd)){
                   vm.valueLimit = true;
               }else {
                   vm.valueLimit = false;
               }

               if (!/^[0-9]+([,][0-9]+)?$/.test(vm.viewModelvalidationAccount.limitRD)) {
                   vm.espresion = true;
                }else {
                    vm.espresion = false;
                }
              /* if (vm.viewModelvalidationAccount.limitRD > vm.dopLimit) {
                   vm.limitRDmayor =  true;
               }else{
                   vm.limitRDmayor = false;
               }*/
           }else {
               vm.espresion = false;
           }
        
        } 

       function monthyLimit(){
           
            replaceAll(vm.viewModelvalidationAccount.monthyIncome , '.', "" );
                function replaceAll( text, busca, reemplaza ){
                while (text.toString().indexOf(busca) != -1) 
                        text = text.toString().replace(busca,reemplaza);
                        vm.viewModelvalidationAccount.monthyIncome= text;
                        return text;
                
            }
           if (vm.viewModelvalidationAccount.monthyIncome){
               
               if (!/^[0-9]+([,][0-9]+)?$/.test(vm.viewModelvalidationAccount.monthyIncome)) {
                   vm.monthyLimite = true;
                }else {
                    vm.monthyLimite = false;
                }
              /* if (vm.viewModelvalidationAccount.limitRD > vm.dopLimit) {
                   vm.limitRDmayor =  true;
               }else{
                   vm.limitRDmayor = false;
               }*/
           }else {
               vm.monthyLimite = false;
           }
        
        } 

        function limite2(){
           
           if (vm.viewModelvalidationAccount.limitDiferidoRD){
               
               if (!/^[0-9]+([,][0-9]+)?$/.test(vm.viewModelvalidationAccount.limitDiferidoRD)) {
                   vm.espresion2 = true;
                }else {
                    vm.espresion2 = false;
                }
           }else {
               vm.espresion2 = false;
           }
        
        } 

        function limite3(){
            vm.espresion3 = false;
           
           if (vm.viewModelvalidationAccount.limitUSD){

                var maxLimit = vm.viewModelvalidationAccount.limitUSD;
                limitRD(maxLimit , ",", "" );
                function limitRD( text, busca, reemplaza ){
                while (text.toString().indexOf(busca) != -1) 
                        text = text.toString().replace(busca,reemplaza);
                        maxLimit = text;
                        return text;
                    
                }

               if (parseInt(maxLimit) > parseInt(vm.limiteMaximoUs)){
                   vm.valueLimitUs = true;
               }else {
                   vm.valueLimitUs = false;
               }
               
               if (!/^[0-9]+([,][0-9]+)?$/.test(vm.viewModelvalidationAccount.limitUSD)) {
                   vm.espresion3 = true;
                }else {
                    vm.espresion3 = false;
                }
           }else {
               vm.espresion3 = false;
           }
        
        }


        vm.monthydetails = function () {
           vm.espresion = false;
            var LimitCam = vm.viewModelvalidationAccount.monthyIncome;
            clean(LimitCam , ",", "" );

            function clean( text, busca, reemplaza ){
                while (text.toString().indexOf(busca) != -1) 
                        text = text.toString().replace(busca,reemplaza);
                        LimitCam = text;
                        return text;  
                
            }

            var limite = parseInt(LimitCam);
            
            function replaceAll( text, busca, reemplaza ){
            while (text.toString().indexOf(busca) != -1) 
                    text = text.toString().replace(busca,reemplaza);
                    vm.viewModelvalidationAccount.monthyIncome = text;
                    return text;  
                    
          
                 }
            console.log(limite)
             function multiple(valor, multiple)
                {
                    var resto = valor % multiple;
                    if(resto==0)
                        return true;
                    else
                        return resto;
                }

            var i = multiple(limite,100);
            var x = 0;
            var z;
            if(i !== true){
            // se redondea hacia abajo
            if(i< 50) {
            x = limite - i
            }
            // se redondea hacia arriba
            else {
            z = 100 - i
            x = limite +z
            }
            }else {
                x = limite;
            }
            vm.viewModelvalidationAccount.monthyIncome = $filter('number')(x,0);
            replaceAll(vm.viewModelvalidationAccount.monthyIncome , ".", "," );
        }
        
         

        vm.getdetails = function () {
           getGlobalLimitRDData();
           vm.espresion = false;
            var LimitCam = vm.viewModelvalidationAccount.limitRD;
            clean(LimitCam , ",", "" );

            function clean( text, busca, reemplaza ){
                while (text.toString().indexOf(busca) != -1) 
                        text = text.toString().replace(busca,reemplaza);
                        LimitCam = text;
                        return text;  
                
            }

            var limite = parseInt(LimitCam);
            
            function replaceAll( text, busca, reemplaza ){
            while (text.toString().indexOf(busca) != -1) 
                    text = text.toString().replace(busca,reemplaza);
                    vm.viewModelvalidationAccount.limitRD = text;
                    return text;  
                    
          
                 }
            console.log(limite)
             function multiple(valor, multiple)
                {
                    var resto = valor % multiple;
                    if(resto==0)
                        return true;
                    else
                        return resto;
                }

            var i = multiple(limite,100);
            var x = 0;
            var z;
            if(i !== true){
            // se redondea hacia abajo
            if(i< 50) {
            x = limite - i
            }
            // se redondea hacia arriba
            else {
            z = 100 - i
            x = limite +z
            }
            }else {
                x = limite;
            }
            vm.viewModelvalidationAccount.limitRD = $filter('number')(x,0);
            replaceAll(vm.viewModelvalidationAccount.limitRD , ".", "," );
        }

        function getGlobalLimitRDData() {
            //loadCreditCardFirstData();
            if (vm.viewModelvalidationAccount.limitRD != "" ) {
                var viewMinLimitRD = parseInt((vm.viewModelvalidationAccount.limitRD).replace(/,/g,""));
                var scopeMinLimitRD = parseInt(($rootScope.globalLimitData.minimumLimitRD).replace(/,/g,""));
                var copyRootMinLimitRD = $rootScope.globalLimitData.minimumLimitRD;
                
                if( viewMinLimitRD < scopeMinLimitRD ){
                    copyRootMinLimitRD = $filter('number')(copyRootMinLimitRD,0);
                    //var copyRootMinLimitRD = $filter('number')($rootScope.globalLimitData.minimumLimitRD,0);
                    var replaceCopyRootMinLimitRD = copyRootMinLimitRD.replace(".",",");
                    modalFactory.warning(messages.modals.error.minLimitRD + replaceCopyRootMinLimitRD);
                    //modalFactory.warning(messages.modals.error.minLimitRD,$rootScope.globalLimitData.minimumLimitRD);
                    vm.minimumLimitRDtrue=true;
                    vm.minimumLimitRD=scopeMinLimitRD;
                    vm.viewModelvalidationAccount.limitRD="";
                } else {
                    vm.minimumLimitRDtrue=false;
                    var viewMaxLimitRD = parseInt((vm.viewModelvalidationAccount.limitRD).replace(/,/g,""));

                    if ( vm.validpreAprobado == false ) {
                        var scopeMaxLimitRD = vm.limiteMaximoRd;
                        var copyRootMaxLimitRD = vm.limiteMaximoRd;
                    } else {
                        var scopeMaxLimitRD = parseInt(($rootScope.globalLimitData.maximumLimitRD).replace(/,/g,""));
                        var copyRootMaxLimitRD = $rootScope.globalLimitData.maximumLimitRD;
                    }
                    //var copyRootMaxLimitRD = $rootScope.globalLimitData.maximumLimitRD;
                    if ( viewMaxLimitRD > scopeMaxLimitRD ) {
                        //copyRootMaxLimitRD = $filter('number')(copyRootMaxLimitRD,0);
                        var copyRootMaxLimitRD = $filter('number')(copyRootMaxLimitRD,0);
                        var replaceCopyRootMaxLimitRD = copyRootMaxLimitRD.replace(".",",");
                        //vm.viewModelvalidationAccount.limitRD="";
                        modalFactory.warning(messages.modals.error.maxLimitRD + replaceCopyRootMaxLimitRD);
                        vm.viewModelvalidationAccount.limitRD = ""; 
                        vm.maximumLimitRDtrue=true;
                        vm.maximumLimitRD=scopeMaxLimitRD;
                    }else{
                        vm.maximumLimitRDtrue=false;
                    }
                }           
            }  else {
                modalFactory.warning(messages.modals.warning.modalEmptyField);
            } 
        }

        function getGlobalLimitUSDData() {
            if (vm.viewModelvalidationAccount.limitUSD != "" ) {
                var viewMinLimitUSD = parseInt((vm.viewModelvalidationAccount.limitUSD).replace(/,/g,""));
                var scopeMinLimitUSD = parseInt(($rootScope.globalLimitData.minimumLimitUS).replace(/,/g,""));
                var copyRootMinLimitUSD = $rootScope.globalLimitData.minimumLimitUS;

                if(viewMinLimitUSD < scopeMinLimitUSD ){
                    copyRootMinLimitUSD = $filter('number')(copyRootMinLimitUSD,0);
                    var replaceCopyRootMinLimitUSD = copyRootMinLimitUSD.replace(".",",");
                    modalFactory.warning(messages.modals.error.minLimitUSD + replaceCopyRootMinLimitUSD );
                    vm.minimumLimitUStrue=true;
                    vm.minimumLimitUS=scopeMinLimitUSD;
                    vm.viewModelvalidationAccount.limitUSD="";
                } else {
                     vm.minimumLimitUStrue=false;
                    var viewMaxLimitUSD = parseInt((vm.viewModelvalidationAccount.limitUSD).replace(/,/g,""));

                    if ( vm.validpreAprobado == false ) {
                        var scopeMaxLimitUSD = vm.limiteMaximoUs;
                        var copyRootMaxLimitUSD = vm.limiteMaximoUs;
                    }else {
                        var scopeMaxLimitUSD = parseInt(($rootScope.globalLimitData.maximumLimitUS).replace(/,/g,""));
                        var copyRootMaxLimitUSD = $rootScope.globalLimitData.maximumLimitUS;
                    }
                    
                    if (viewMaxLimitUSD > scopeMaxLimitUSD) {
                        copyRootMaxLimitUSD = $filter('number')(copyRootMaxLimitUSD,0);
                        var replaceCopyRootMaxLimitUSD = copyRootMaxLimitUSD.replace(".",",");                      
                        modalFactory.warning(messages.modals.error.maxLimitUSD + replaceCopyRootMaxLimitUSD ); 
                        vm.viewModelvalidationAccount.limitUSD = ""; 
                        vm.maximumLimitUStrue=true;
                        vm.maximumLimitUS=scopeMaxLimitRD;
                    } else {
                        vm.maximumLimitUStrue=false;
                    }
                }           
            } else {
                modalFactory.warning(messages.modals.warning.modalEmptyField);
            }
        }

        /*Funcion para abrir el modal de excedente de limite*/
        function modalLimitFields () {
            modalFactory.warning(messages.modals.error.limitRD);
        }


        vm.getdetails3 = function () {
            getGlobalLimitUSDData();
           vm.espresion3 = false;
            var LimitCam = vm.viewModelvalidationAccount.limitUSD;
            cleanUS(LimitCam , ",", "" );

            function cleanUS( text, busca, reemplaza ){
                while (text.toString().indexOf(busca) != -1) 
                        text = text.toString().replace(busca,reemplaza);
                        LimitCam = text;
                        return text;  
                
            }

            var limite = parseInt(LimitCam);
            function replaceAll( text, busca, reemplaza ){
            while (text.toString().indexOf(busca) != -1) {
                    text = text.toString().replace(busca,reemplaza);
                    vm.viewModelvalidationAccount.limitUSD = text;
                    return text; 
            }
           
                 }
             function multiple(valor, multiple)
                {
                    var resto = valor % multiple;
                    if(resto==0)
                        return true;
                    else
                        return resto;
                }

            var i = multiple(limite,100);
            var x = 0;
            var z;
            if(i !== true){
            // se redondea hacia abajo
            if(i< 50) {
            x = limite - i
            }
            // se redondea hacia arriba
            else {
            z = 100 - i
            x = limite +z
            }
            }else {
                x = limite;
            }
            vm.viewModelvalidationAccount.limitUSD = $filter('number')(x,0 );
            replaceAll(vm.viewModelvalidationAccount.limitUSD , ".", "," );
        }   
        


        function validFico() {

        if(vm.formValidationAccountPre.$valid){
            var date = $filter('date')(vm.viewModelvalidationAccount.datePassport,'dd-MM-yyyy');
            var ducumenNumber = vm.viewModelvalidationAccount.numberIdentification;
            var typeDocumentValue = vm.viewModelvalidationAccount.typeIdentification;
            var typeHousing = vm.viewModelvalidationAccount.livingPlace;
            var housingTime = vm.viewModelvalidationAccount.howYear;
            var typeProducto = '';
            angular.forEach(vm.productTyoe, function (value, key) {
                if (value.id === vm.viewModelvalidationAccount.typeProduct) {
                     typeProducto = parseInt(value.value);
                }
            });
            
            
                var income = vm.viewModelvalidationAccount.monthyIncome;
                clean(income , ",", "" );

                function clean( text, busca, reemplaza ){
                    while (text.toString().indexOf(busca) != -1) 
                            text = text.toString().replace(busca,reemplaza);
                            income = text;
                            return text;  
                 }


            validationClientService.getValidaFico(date, ducumenNumber, typeDocumentValue, typeHousing, housingTime, vm.username, income, typeProducto).then(function (response) {
                        
                console.log(response);
                function limitUSD( text, busca, reemplaza ){
                            while (text.toString().indexOf(busca) != -1) {
                                    text = text.toString().replace(busca,reemplaza);
                                    vm.viewModelvalidationAccount.limitUSD = text;
                                    vm.limiteMaximoUs = text;
                                    return text; 
                            }
                    }

                    function limitRD( text, busca, reemplaza ){
                            while (text.toString().indexOf(busca) != -1) {
                                    text = text.toString().replace(busca,reemplaza);
                                    vm.viewModelvalidationAccount.limitRD = text;
                                    vm.limiteMaximoRd = text;
                                    return text; 
                            }
                    }

                    function limitDiferidoRD( text, busca, reemplaza ){
                            while (text.toString().indexOf(busca) != -1) {
                                    text = text.toString().replace(busca,reemplaza);
                                    vm.viewModelvalidationAccount.limitDiferidoRD = text;
                                    return text; 
                            }
                    }

                vm.viewModelvalidationAccount.limitDiferidoRD = response.deferred;
                vm.viewModelvalidationAccount.limitDiferidoRD = $filter('number')(response.deferred,0);
                limitDiferidoRD(vm.viewModelvalidationAccount.limitDiferidoRD , ".", "," );

                vm.viewModelvalidationAccount.limitRD = response.dopLimit;
                vm.viewModelvalidationAccount.limitRD = $filter('number')(response.dopLimit,0);
                limitRD(vm.viewModelvalidationAccount.limitRD , ".", "," );
                
                vm.viewModelvalidationAccount.limitUSD =  response.usdLimit;
                vm.viewModelvalidationAccount.limitUSD = $filter('number')(response.usdLimit,0);
                limitUSD(vm.viewModelvalidationAccount.limitUSD , ".", "," );
                vm.decisionMessage = response.decision;
                vm.decisionMoti = response.motive;
                vm.disablePre = false;

                if (response.decision === 'Rechazado') {
                    vm.clientCanContinue =  false;
                    modalFactory.error(response.motive);
                }

                if (response.decision === 'Aprobado') {
                    vm.clientCanContinue =  true;
                }
                
            }, modalError);
        }else {
            //Chequea que todos los campos obligatorios esten llenos sean validos.

             vm.submittedPre = true;
             vm.disablePre = true;
             vm.formNewInvalid =  true;
            modalFieldsRequired();
        }

        }

        var jsonData = {}
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
            vm.disablePre = true;
            vm.findControlListReport = false;
            vm.findJudicialEvaluation = false;
            vm.validpreAprobado = false;
            vm.isDominicanRepublic = false;
            vm.findPep = false;
            vm.getBureau = false;
            vm.clientUser = '';
            vm.viewModelvalidationAccount.limitDiferidoRD = '';
            vm.viewModelvalidationAccount.limitRD = '';
            vm.viewModelvalidationAccount.limitUSD = '';
            vm.viewModelvalidationAccount.livingPlace = '';
            vm.viewModelvalidationAccount.howYear = '';
            vm.viewModelvalidationAccount.datePassport = '';
            vm.viewModelvalidationAccount.monthyIncome = '';
            vm.decisionMoti = '';
            vm.decisionMessage = '';
            vm.limiteMaximoRd = '';
            vm.limiteMaximoUs = '';
            vm.urlXml = null;
            vm.fichaBand = false;
            vm.getControlList = false;
            vm.validationClient = false;
            vm.viewModelvalidationAccount.typeIdentification = 2;
            vm.datePassport = '';
        }

         resetData();


        /**
         *  @ngdoc method
         *  @name validateClient
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Valida si el cliente existe o no.
         *  Consulta los datos básicos del cliente y los coloca en la vista.
         */
        function validateClient() {
            
            var documentNumber = vm.viewModelvalidationAccount.numberIdentification;

            resetData();
            validationClientService.getValidationClient(documentNumber, vm.viewModelvalidationAccount.typeIdentification, vm.username).then(function (responseValue) {
               
                vm.validationClient = responseValue.validationClient;
                validateClientCanContinue();

               if(!vm.validationClient) {
                    getCreditBureauNoCLient();
                    getCreditListService();
                    vm.clientNo = false;
                }
                if (vm.validationClient){
                    getCreditBureau();
                    getCreditListService();
                    vm.clientYes = true;
                }

            }, modalError);


            addTableService.getcierreForzosoTC(documentNumber).then(
                function (response) {   
                    if(response.success == true ){
                        $rootScope.globalUserJSon = response.data;
                        window.location.href = "#/form";
                    }
            });  
        }

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

            if (vm.fichaBand){
                vm.clientCanContinue =  false;
            } else {
                vm.clientCanContinue =  true;
            }
        }

       function getCreditBureau () {
                var documentNumber = vm.viewModelvalidationAccount.numberIdentification,
                stringXml = '',
                urlBase = window.location.origin + URL.XML_BUREAU,
                oJson = {},
                clientCountry = '',
                clientAge;

            creditBureauService.getValidCreditBureau(documentNumber, vm.username).then(function (responseValue) {
               
                vm.findJudicialEvaluation = responseValue.validationBuroResult;
                if (!vm.findJudicialEvaluation) {
                    vm.getBureau = true;
                    vm.fichaBand = true;
                    vm.decisionMessage = 'RECHAZADO';
                    vm.decisionMoti = 'Cliente presenta Ficha Judicial';
                    modalFactory.error(messages.modals.error.badJudicialEvaluation);
                }else {
                        creditBureauService.getXmlCreditBureau(documentNumber, vm.username).then(function (responseXml) {
                            stringXml = responseXml;
                            
                            /* URL que almacena el llamado al archivo XML en el servidor */
                            vm.urlXml = urlBase + '?documentNumber=' + documentNumber + '&userName='+  vm.username;


                         validationClientService.getSiebelCustomer(vm.viewModelvalidationAccount.typeIdentification, documentNumber, vm.username).then(function(response){
                                
                                oJson = response;
                                if (response.codError === 'Error Inesperado Index: 1, Size: 1'){
                                    modalFactory.error('Siebel no devolvio resultados');
                                }else {
                                clientCountry = oJson.country.value;
                                jsonData.typeDocument = vm.viewModelvalidationAccount.typeIdentification;
                                jsonData.numberDocument =  vm.viewModelvalidationAccount.numberIdentification;
                                /*Si el segundo nombre viene indefinido colocarlo como vacio  */
                                if (angular.isObject(oJson.secondName)) {
                                    jsonData.secondName = '';
                                } else {
                                    jsonData.secondName = oJson.secondName;
                                }

                                /*Si el segundo apellido viene indefinido colocarlo como vacio  */
                                if (angular.isObject(oJson.secondLastName)) {
                                    jsonData.secondSurname = '';
                                } else {
                                    jsonData.secondSurname = oJson.secondLastName;
                                }

                                /*Si la segunda nacionalidad viene indefinido colocarlo como vacio  */
                                if (oJson.secondNationality === undefined) {
                                    jsonData.secondNacionality = '';
                                } else {
                                    jsonData.secondNacionality = parseInt(oJson.secondNationality.id);
                                }

                                /*Si la tercera nacionalidad viene indefinido colocarlo como vacio  */
                                if (oJson.thirNacionality === undefined) {
                                    jsonData.thirNacionality = '';
                                } else {
                                    jsonData.thirNacionality = parseInt(oJson.thirNacionality.id);
                                }

                                /*Si la prefesión viene indefinido colocarlo como vacio  */
                                if (oJson.profession === undefined) {
                                    jsonData.profession = '';
                                } else {
                                    jsonData.profession = parseInt(oJson.profession.id);
                                }

                                /*Si la prefesión viene indefinido colocarlo como vacio  */

                                if (oJson.incomes !== undefined) {
                                    jsonData.incomes = [];
                                    if(oJson.incomes.length){
                                        jsonData.incomes = oJson.incomes;
                                    } else {
                                        jsonData.incomes.push(oJson.incomes);
                                    }
                                }



                               
                                /*Si la el telefono de la casa viene indefinido colocarlo como vacio  */
                                if (angular.isObject(oJson.phone)) {
                                    jsonData.landLine = '';
                                } else {
                                    jsonData.landLine = parseInt(oJson.phone);
                                }

                                /*Si el nivel academino indefinido colocarlo como vacio  */
                                if (oJson.academicLevel === undefined) {
                                    jsonData.academicLevel = '';
                                } else {
                                    jsonData.academicLevel = oJson.academicLevel.value;
                                }

                                /*Si el email indefinido colocarlo como vacio  */
                                if (angular.isObject(oJson.email)) {
                                    jsonData.email = '';
                                } else {
                                    jsonData.email = oJson.email;
                                }

                                /*Si la el telefono móvil viene indefinido colocarlo como vacio  */
                                if (angular.isObject(oJson.cellphone)) {
                                    jsonData.mobilePhone = '';
                                } else {
                                    jsonData.mobilePhone = parseInt(oJson.cellphone);
                                }
                                if (oJson.addressList !== undefined) {
                                  jsonData.addressList = [];
                                    if(oJson.addressList.length){
                                        jsonData.addressList = oJson.addressList;
                                    } else {
                                        jsonData.addressList.push(oJson.addressList);
                                    }
                                }                                     
                               


                                /*Si el estado dl cliente viene indefinido colocarlo como vacio  */
                                if (oJson.civilState === undefined) {
                                    jsonData.civilStatus = '';
                                } else {
                                    jsonData.civilStatus = parseInt(oJson.civilState.id);
                                }

                                /*Guardamos el numero de identidad del cliente para poder borrarlo en el la fabrica del modal de cancelar*/
                                jsonData.numberIdentification = vm.viewModelvalidationAccount.numberIdentification;

                                /*Almacenar los datos extraidos del cliente desde siebel */
                                jsonData.firtsName = oJson.firstName;
                                jsonData.surname = oJson.firstLastName;
                                jsonData.birthDate = oJson.birthDate;
                                jsonData.sex = oJson.sex;
                                jsonData.countryBirth = parseInt(oJson.country.id);
                                jsonData.nationality = parseInt(oJson.nationality.id);

                                /*Si el estado dl cliente viene indefinido colocarlo como vacio  */
                                if (oJson.city === undefined) {
                                    jsonData.cityBirth = '';
                                } else {
                                    jsonData.cityBirth = parseInt(oJson.city.id);
                                }

                                /*Recoremos el tipo de documento para capturar el nombre del tipo de documento seleccionado*/
                                angular.forEach(vm.typeDocuments, function (value, key) {
                                    if (value.id === vm.viewModelvalidationAccount.typeIdentification) {
                                        jsonData.nameTypeIdentification = value.value;
                                    }
                                 });

                                vm.getBureau = true;
                                vm.clientUser = jsonData.firtsName + ' ' + jsonData.secondName + ' ' + jsonData.surname + ' ' + jsonData.secondSurname;  
                                localStorage.setItem("jsonDataClient", jsonData)
                                localStorage.setItem("jsonDataClient", JSON.stringify(jsonData))
                                jsonData = JSON.parse(localStorage.getItem("jsonDataClient"));
                                console.log(jsonData);
                                }
                                
                            

                            getvalidateClientCreditCard();
                            validateClientCanContinue();
                            }, modalError);
               
                
            }, modalError
            );
                }
             }, modalError
            );
        }
       

        function getCreditBureauNoCLient () {

            var documentNumber = vm.viewModelvalidationAccount.numberIdentification,
                stringXml = '',
                urlBase = window.location.origin + URL.XML_BUREAU,
                oJson = {},
                clientCountry = '',
                clientAge;

            creditBureauService.getValidCreditBureau(documentNumber, vm.username).then(function (responseValue) {

                vm.findJudicialEvaluation = responseValue.validationBuroResult;


                creditBureauService.getXmlCreditBureau(documentNumber, vm.username).then(function (responseXml) {
                    
                    stringXml = responseXml;
                    
                    oJson = ngXml2json.parser(stringXml);
                    console.log(oJson);
                    clientCountry = oJson.reportecu.reporte.informacionadicional.nacionalidad;
                    /* URL que almacena el llamado al archivo XML en el servidor */
                    vm.urlXml = urlBase + '?documentNumber=' + documentNumber + '&userName='+  vm.username;
                    /*Si el segundo nombre viene indefinido colocarlo como vacio  */
                    
                    jsonData.typeDocument = vm.viewModelvalidationAccount.typeIdentification;
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
                    jsonData.numberIdentification = vm.viewModelvalidationAccount.numberIdentification;
                    
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

                    clientAge = utilFactory.getAge(jsonData.birthDate);

                    if(clientAge < 18) {
                        modalFactory.error(messages.modals.error.notAllowedAge);
                    } else {
                        vm.ageAllowed = true;
                    }

                    /*Recoremos el tipo de documento para capturar el nombre del tipo de documento seleccionado*/

                    angular.forEach(vm.typeDocuments, function (value, key) {
                        if (value.id === vm.viewModelvalidationAccount.typeIdentification) {
                            jsonData.nameTypeIdentification = value.value;
                        }
                    });

                    vm.getBureau = true;
                    vm.clientUser = jsonData.firtsName + ' ' + jsonData.secondName + ' ' + jsonData.surname + ' ' + jsonData.secondSurname;  
                    localStorage.setItem("jsonData", jsonData)
                    localStorage.setItem("jsonData", JSON.stringify(jsonData))
                    jsonData = JSON.parse(localStorage.getItem("jsonData"));
                    var dataSiebel = false;
                    localStorage.setItem("dataSiebel", dataSiebel);
                    console.log(jsonData);
                    getvalidateClientCreditCard();
                    validateClientCanContinue();
                 }, modalError);

                if (!vm.findJudicialEvaluation) {
                    vm.fichaBand = true;
                    vm.decisionMessage = 'RECHAZADO';
                    vm.decisionMoti = 'Cliente presenta Ficha Judicial';
                    modalFactory.error(messages.modals.error.badJudicialEvaluation);
                }


            }, modalError);

        }


        function getCreditListService() {

            var documentNumber = vm.viewModelvalidationAccount.numberIdentification;

            creditListService.getCreditListService(documentNumber, vm.viewModelvalidationAccount.typeIdentification, vm.username).then(function(responseValue) {
                console.log(responseValue);
                $timeout(function(){
                    vm.finObs = responseValue.observed;
                    vm.findPep = responseValue.pep;
                    vm.findControlListReport = responseValue.controlList;
                    vm.getControlList = true;

                    if (vm.finObs){
                        vm.fichaBand = true;
                        vm.decisionMessage = 'PRE-APROBADO';
                        vm.decisionMoti = messages.modals.error.badOberved;
                        modalFactory.error(messages.modals.error.badOberved);
                    }

                    if (!vm.findControlListReport) {
                        vm.fichaBand = true;
                        vm.decisionMessage = 'RECHAZADO';
                        vm.decisionMoti = messages.modals.error.badControlListCreationAccount;
                        modalFactory.error(messages.modals.error.badControlListCreationAccount);
                    }

                    if (vm.findPep) {
                        vm.fichaBand = true;
                        vm.decisionMessage = 'RECHAZADO';
                        vm.decisionMoti = messages.modals.error.badPepListCreationAccount;
                        modalFactory.error(messages.modals.error.badPepListCreationAccount);
                    }
                    validateClientCanContinue();

                }, 0);

            }, modalError);

        }

        function getvalidateClientCreditCard(){
            var documentNumber = vm.viewModelvalidationAccount.numberIdentification;
            var typeIdentification = vm.viewModelvalidationAccount.typeIdentification;
            var typeProducto = '';
            angular.forEach(vm.productTyoe, function (value, key) {
                if (value.id === vm.viewModelvalidationAccount.typeProduct) {
                    typeProducto = parseInt(value.value);
                }
            });
                
            validationClientService.getvalidateClientCreditCard(documentNumber, vm.username, typeIdentification, typeProducto).then(
                    function (responseValue) {
                    console.log(responseValue);
                    if(vm.fichaBand){
                        vm.decisionMessage = 'RECHAZADO';
                    }
                    if(!vm.fichaBand){
                        vm.decisionMessage = responseValue.decisionMessage;
                    }
                    function limitUSD( text, busca, reemplaza ){
                            while (text.toString().indexOf(busca) != -1) {
                                    text = text.toString().replace(busca,reemplaza);
                                    vm.viewModelvalidationAccount.limitUSD = text;
                                    return text; 
                            }
                    }

                    function limitRD( text, busca, reemplaza ){
                            while (text.toString().indexOf(busca) != -1) {
                                    text = text.toString().replace(busca,reemplaza);
                                    vm.viewModelvalidationAccount.limitRD = text;
                                    return text; 
                            }
                    }

                    function limitDiferidoRD( text, busca, reemplaza ){
                            while (text.toString().indexOf(busca) != -1) {
                                    text = text.toString().replace(busca,reemplaza);
                                    vm.viewModelvalidationAccount.limitDiferidoRD = text;
                                    return text; 
                            }
                    }

                    function limitRDmaximo( text, busca, reemplaza ){
                            while (text.toString().indexOf(busca) != -1) {
                                    text = text.toString().replace(busca,reemplaza);
                                    vm.limiteMaximoRd = text;
                                    return text; 
                            }
                    }

                    function limitUSDmaximo( text, busca, reemplaza ){
                            while (text.toString().indexOf(busca) != -1) {
                                    text = text.toString().replace(busca,reemplaza);
                                    vm.limiteMaximoUs = text;
                                    return text; 
                            }
                    }

                    vm.viewModelvalidationAccount.limitDiferidoRD = responseValue.deferred;
                    vm.viewModelvalidationAccount.limitDiferidoRD = $filter('number')(responseValue.deferred,0);
                    limitDiferidoRD(vm.viewModelvalidationAccount.limitDiferidoRD , ".", "," );

                    vm.viewModelvalidationAccount.limitRD = responseValue.dopLimit;
                    vm.viewModelvalidationAccount.limitRD = $filter('number')(responseValue.dopLimit,0);
                    limitRD(vm.viewModelvalidationAccount.limitRD , ".", "," );
                    vm.limiteMaximoRd = $filter('number')(responseValue.dopLimit,0);
                    limitRDmaximo(vm.limiteMaximoRd , ".", "" );
                    
                    vm.viewModelvalidationAccount.limitUSD = responseValue.usdLimit;
                    vm.viewModelvalidationAccount.limitUSD = $filter('number')(responseValue.usdLimit,0);
                    limitUSD(vm.viewModelvalidationAccount.limitUSD , ".", "," );
                    vm.limiteMaximoUs = $filter('number')(responseValue.usdLimit,0);
                    limitUSDmaximo(vm.limiteMaximoUs , ".", "" );

                    vm.validationBuroResult = responseValue.validationBuroResult;
                    vm.validationResultProduct = responseValue.validationResultProduct;
                    vm.validationResultCustomerPreApproved = responseValue.validationResultCustomerPreApproved;
                    vm.validationResultMaxQuantityCards = responseValue.validationResultMaxQuantityCards;
                    vm.validpreAprobado = false;
                    vm.clientCanContinue = true;
                    vm.clientAprobado = true;
                    $rootScope.globalLimitData.decisionMessage = responseValue.decisionMessage;
                    $rootScope.globalLimitData.limDiferido = responseValue.deferred;
                    $rootScope.globalLimitData.limitRD = responseValue.dopLimit;
                    $rootScope.globalLimitData.limitUSD = responseValue.usdLimit;
                    //vm.preaprobado=true;
                    vm.limitRD=responseValue.dopLimit;   
                    vm.limitUSD=responseValue.usdLimit;
                    validateClientCanContinue();
                }, modalError

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


            if (!vm.clientNo){
                var jsonIdentification = {}; /*json donde vamos almacenar la información del cliente a guardar */
            
                jsonIdentification.documentType = vm.viewModelvalidationAccount.typeIdentification;
                jsonIdentification.documentNumber = vm.viewModelvalidationAccount.numberIdentification;
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
                var documentNumber = vm.viewModelvalidationAccount.numberIdentification;
                creditBureauService.deleteXmlCreditBureau(documentNumber, $rootScope.dataUser.userName).then(function () {});

                /*Llamos al servicio que guarda la identificación del cliente */
                saveIdentificationService.postSaveIdentification(jsonIdentification);

                /*Redireccionamos a la siguiente pantalla */
                sweet.show({
                title: messages.modals.warning.modaltitleWarning,
                text: 'Este cliente no se encuentra creado. Se redireccionará a la creación de cliente',
                type: messages.modals.warning.modalTypeError,
                confirmButtonColor: messages.modals.warning.modalColorButton,
                closeOnConfirm: true
                }, function () {
                    $timeout(function () {
                        var proyect = 'CreditCard';
                        localStorage.setItem("Proyecto", proyect);
                        var validclientTc = 'validclientTc';
                        var dataSiebel = false;
                        localStorage.setItem("dataSiebel", dataSiebel);
                        localStorage.setItem("validclientTc", validclientTc);
                        //window.location.href = "/wps/portal/ptd/inicio";
                        window.location.href = "../index.html";
                    }, 0);
                });
            }

            

            if (vm.clientYes){
                var documentNumber =  vm.viewModelvalidationAccount.numberIdentification;
                    var jsonIdentification = {}; /*json donde vamos almacenar la información del cliente a guardar */

                    /*Llamos al servicio que guarda la identificación del cliente */
                    jsonIdentification.documentType = vm.viewModelvalidationAccount.typeIdentification;
                    jsonIdentification.documentNumber = vm.viewModelvalidationAccount.numberIdentification;
                    /*Si la ficha judicial es correcta, enviar un 1 al servicio */
                    
                    jsonIdentification.isJudiciary = '1';       
                    jsonIdentification.isControlList = '1';

                    validationClientService.getValidaClientPortal(jsonIdentification.documentType, jsonIdentification.documentNumber, vm.username).then
                        (function (response) {
                            vm.validationClientPortal = response.data.existsClientPortal;
                                if (vm.validationClientPortal){
                                var clientPortal = true;
                                localStorage.setItem("clientPortal", clientPortal);
                            }else {
                                 var clientPortal = false;
                                 localStorage.setItem("clientPortal", clientPortal);
                                 saveIdentificationService.postSaveIdentification(jsonIdentification);
                            }
                        });

                    creditBureauService.getValidCientExisting(vm.viewModelvalidationAccount.typeIdentification ,documentNumber, vm.username).
                        then(function   
                            (response) {
                            console.log(response);
                            var proyect = 'CreditCard';
                            localStorage.setItem("Proyecto", proyect);
                            //window.location.href = "/wps/portal/ptd/inicio";
                            var dataSiebel = true;
                            localStorage.setItem("dataSiebel", dataSiebel);
                            var validclientTc = 'validclientTc';
                            localStorage.setItem("validclientTc", validclientTc);
                            //window.location.href = "/wps/portal/ptd/inicio";
                            window.location.href = "../index.html";
                        }, modalError); 

            }

            
        }

        /**
         *  @ngdoc method
         *  @name getTypeDocuments
         *  @methodOf App.controller:validationAccountController
         *
         *  @description
         *  Consulta los tipos de documentos que existen.
         */        
        function getTypeDocuments() {
            catalogService.getCatalog(CATALOG.TYPE_DOCUMENTS)
                .then(
                function (response) {
                    vm.typeDocuments = response.data;
                }
            );
        }

        getTypeDocuments();

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
         *  @ngdoc function
         *  @name getTaskYesNo
         *  @methodOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Cargamos los valores de los desplegables 
         *  Para cuando el cliente desea tarjeta de debito.
         */
        function getTypeProdcut() {
            catalogService.getCatalog(CATALOG.TASK_PRODUCT)
                .then(
                    function (response) {
                        vm.productTyoe = response.data;
                        console.log(vm.productTyoe);
                    }
                );
        }
        getTypeProdcut();

        /**
         *  @ngdoc function
         *  @name getTaskYesNo
         *  @methodOf App.controller:customerForeignCurrencyController
         *
         *  @description
         *  Cargamos los valores de los desplegables 
         *  Para cuando el cliente desea tarjeta de debito.
         */
        function getValidLiving() {
            catalogService.getCatalog(CATALOG.TYPE_LIVING)
                .then(
                    function (response) {
                        vm.livingPlace = response.data;
                    }
                );
        }
        getValidLiving();

        /**
         *  @ngdoc method
         *  @name getTypeDocuments
         *  @methodOf App.controller:validationAccountController
         *
         *  @description
         *  Funcion que permite hacer la condicin de la nacionalidad y mostrar alerta.
         */ 
        function validNationality() {
           vm.alert = false;
           vm.cleintInvalid = true;
           if (vm.viewModelvalidationAccount.doubleNationality == vm.optionsYesNo[1].id) {
                vm.alert = true;
                vm.cleintInvalid = false;
           }

           if ( vm.viewModelvalidationAccount.doubleNationality == undefined){
               vm.cleintInvalid = false;
           }
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
                var errortc = error.message;
                if(error.message === "Cliente no posee preaprobado." ){
                    vm.decisionMessage = '';
                    vm.clientCanContinue =  false;
                    vm.validpreAprobado = true;
                }
                if(error.message === "El cliente ya posee el producto." ){
                    vm.decisionMessage = 'RECHAZADO';
                    vm.clientCanContinue =  false;
                    vm.decisionMoti = "El cliente ya posee el producto.";
                }
                if(error.message === "Cliente posee tarjeta en proceso de originacion" ){
                    vm.decisionMessage = 'RECHAZADO';
                    vm.clientCanContinue =  false;
                    vm.decisionMoti = "Cliente posee tarjeta en proceso de originacion";
                }
                if(error.message === "El cliente posee la cantidad máxima de productos permitidos." ){
                    vm.decisionMessage = 'RECHAZADO';
                    vm.clientCanContinue =  true;
                    vm.decisionMoti = "El cliente posee la cantidad máxima de productos permitidos.";
                }
                if(error.message === "El cliente no tiene un número de tarjeta de clave activa."){
                    errortc = "Cliente debe pasar por la sucursal más cercana a recibir su tarjeta de claves para continuar.";
                    vm.clientCanContinue =  false;
                }
                modalFactory.error(errortc);
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

        /*Funcion para abrir el modal de campos obligatorios*/
        function modalFieldsRequired () {
            modalFactory.warning(messages.modals.error.completeRequiredFields);
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