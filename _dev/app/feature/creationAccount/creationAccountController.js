
/**
 *  @ngdoc controller
 *  @name App.controller:creationAccountController
 *
 *  @description
 *  Controlador para vista de inversion con moneda extranjera.
 */
(function () {
    
    'use strict';

    angular
        .module('creationAccountModule')
        .controller('creationAccountController', creationAccountController);

    creationAccountController.$inject = [
        'validationClientService',
        'modalFactory',
        'catalogService',
        'CATALOG',
        'messages',
        'SELECT_DEFAULT',
        'ACCOUNT_PRODUCT',
        'creditBureauService',
        'creditListService',
        'catalogComplexService',
        '$timeout',
        '$rootScope',
        'validationCardKeyService',
        'accountCreationService',
        'passiveContractService',
        'PASSIVE',
        'YES_NO',
        '$filter',
        'documentAccountTariffService',
        'assignDebitCardService',
        'updateSiebelDataService'
    ];

    function creationAccountController(
        validationClientService,
        modalFactory,
        catalogService,
        CATALOG,
        messages,
        SELECT_DEFAULT,
        ACCOUNT_PRODUCT,
        creditBureauService,
        creditListService,
        catalogComplexService,
        $timeout,
        $rootScope,
        validationCardKeyService,
        accountCreationService,
        passiveContractService,
        PASSIVE,
        YES_NO,
        $filter,
        documentAccountTariffService,
        assignDebitCardService,
        updateSiebelDataService
        ) {
        
        var vm = this;

        /**
         *  @ngdoc property
         *  @name viewModelCreationAccount
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Objeto para conocer los datos del formulario.
         */
        vm.viewModelCreationAccount = {
            basicData : {
                email : null,
                firstLastName : null,
                firstName : null,
                secondLastName : null,
                secondName : null
            },
            typeIdentification : SELECT_DEFAULT.TYPE_DOCUMENTS,
            positionValue : '',
            transactionsAch : ''
        };
        var  proyect = 'CreationAccoun';
        localStorage.setItem("Proyecto", proyect); 
     /*   $rootScope.since = {/*Definición de la variable global que indica de que vista origen viene el usuario */
         /*   'home' : false,
            'client' : true,
            'jobsData' : false,
            'foreignCurrency' : false
        }; */
        /**
         *  @ngdoc property
         *  @name typeDocuments
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Tipos de documentos a seleccionar por el usuario.
         */
        vm.typeDocuments = [];

        /**
         *  @ngdoc property
         *  @name typeVinculation
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Tipos  de vinculación, al ser un cliente existente.
         */
        vm.typeVinculation = [];

        /**
         *  @ngdoc property
         *  @name product
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Tipos de productos para el cliente.
         */
        vm.products = [];

        /**
         *  @ngdoc property
         *  @name purposeAccount
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Tipos de propositos de la cuenta para el cliente.
         */
         vm.purposeAccount = [];


        /**
         *  @ngdoc property
         *  @name validationClient
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Se puede conocer si el cliente existe o no.
         */
        vm.validationClient = false;

        /**
         *  @ngdoc property
         *  @name clientCanContinue
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Se puede conocer si el cliente existe o no.
         */
        vm.clientCanContinue = false;

        /**
         *  @ngdoc property
         *  @name getBureau
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Valida si se finalizó la consulta al Buró
         */
        vm.getBureau = false;
        vm.clientNumber = '';
        vm.accountNumber = '';

        /**
         *  @ngdoc property
         *  @name findJudicialEvaluation
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite conocer si el cliente está en listas de control.
         */
        vm.findJudicialEvaluation = false;

        /**
         *  @ngdoc property
         *  @name getControlList
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite validar si finalizó la consulta a listas de control.
         */
        vm.getControlList = true;

        /**
         *  @ngdoc property
         *  @name findControlListReport
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite validar si el cliente está en listas de control.
         */
        vm.findControlListReport = false;

        /**
         *  @ngdoc property
         *  @name findPep
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite validar si el cliente se encuentra en listas Pep.
         */
        vm.findPep = false;

        /**
         *  @ngdoc property
         *  @name optionsYesNo
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Valores de las respuestas si o no.
         */
        vm.optionsYesNo = [];

        /**
         *  @ngdoc property
         *  @name quantityExpected
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Valores de que trae la cantidad mendual esperada.
         */
        vm.quantityExpected = [];

        /**
         *  @ngdoc ageAllowed
         *  @name findPep
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite validar si el cliente es mayor de edad o no.
         */
        vm.ageAllowed = false;
        /**
         *  @ngdoc idmoneyExt
         *  @name findPep
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite guardar el id de cuenta de ahorros extranjera.
         */
        vm.idmoneyExt = '';

        /**
         *  @ngdoc idmoneyRD
         *  @name findPep
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite guardar el id de cuenta de ahorros cuando son en pesos.
         */
        vm.idmoneyRD = '';

        /**
         *  @ngdoc property
         *  @name isDominicanRepublic
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite identificar si el cliente es de Republica Dominicana o no.  
         */
        vm.isDominicanRepublic = false;

        vm.accountsValue = '';
        /**
         *  @ngdoc property
         *  @name cashDepositCantData
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite autocompletar el monto mensual de acuerdo a la cantida mensual, para los depositos en efectivo.  
         */
        vm.cashDepositCantData = [];

        /**
         *  @ngdoc property
         *  @name validcashWithdrawalCantData
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite autocompletar los datos en el monto mensual de acuerdo a la cantida mensual, para los retiros en efectivo.  
         */
        vm.validcashWithdrawalCantData = [];

        /**
         *  @ngdoc property
         *  @name internacionaleTransferSentCantData
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite autocompletar los datos en el monto mensual de acuerdo a la cantida mensual, para Transferencias Internacionales Enviadas.  
         */
        vm.internacionaleTransferSentCantData = [];

        /**
         *  @ngdoc property
         *  @name internacionaleTransferReceivedData
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite autocompletar los datos en el monto mensual de acuerdo a la cantida mensual, para Transferencias Internacionales Recibidas.  
         */
        vm.internacionaleTransferReceivedData = [];

        /**
         *  @ngdoc property
         *  @name purchaseCheckRodeData
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite autocompletar los datos en el monto mensual de acuerdo a la cantida mensual, para Compra Cheques de Gerencia.  
         */
        vm.purchaseCheckRodeData = [];
        vm.purchaseCheckRodeExtData = [];

        /**
         *  @ngdoc property
         *  @name purchaseCheckRodeData
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Permite autocompletar los datos en el monto mensual de acuerdo a la cantida mensual, para Compra Cheques de Gerencia.  
         */
        vm.depositCheckCantData = [];
        vm.dataClientExit = [];
        vm.cashDepositMoneyPesos = [];
        vm.cashMoneyPesos = false;
        vm.cashMoneyUSD = false;
        vm.cashMoneyEUR = false;


        /**
         *  @ngdoc property
         *  @name goClient
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         * Variable que nos indica cuando viene desde la pantalla de cliente  
         */
        vm.goClient = $rootScope.since.client;

        /**
         *  @ngdoc property
         *  @name goClient
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Variable que nos indica cuando viene desde la pantalla de home    
         */
        vm.goAccount = $rootScope.since.home;

        /**
         *  @ngdoc property
         *  @name submitted
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Boolean que valida que todos los campos del formulario sean completados    
         */
        vm.submitted = false;
        /**
         *  @ngdoc property
         *  @name accountActive
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Boolean que valida que la cuenta haya sido creada satisfactoriamente y habilitar el botón de finalizar  
         */
        vm.accountActive = false;

        /**
         *  @ngdoc property
         *  @name cityName
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Variable donde se almacerá el nombre de la sucursal del usuario
         */
        vm.cityName = '';

        /**
         *  @ngdoc property
         *  @name currency
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Variable donde se almacerá el tipo de monera según el producto seleccionado
         */
        vm.currency = '';

        /**
         *  @ngdoc property
         *  @name nameTypeIdentification
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Variable donde se almacerá el nombre del documento del cliente
         */
        vm.nameTypeIdentification = '';

        /**
         *  @ngdoc property
         *  @name nacionality
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Variable donde se almacerá el la nacionalidad del cliente
         */
        vm.nacionality = '';


        /**
         *  @ngdoc property
         *  @name civilState
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Variable donde se almacerá el estado civil del cliente
         */
        vm.civilState = '';

        /**
         *  @ngdoc property
         *  @name email
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Variable donde se almacerá el email del cliente
         */
        vm.email = '';

        /**
         *  @ngdoc property
         *  @name fullAddress
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Variable donde se almacerá la direccion completa del cliente
         */
        vm.fullAddress = '';

        /**
         *  @ngdoc property
         *  @name cellPhone
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Variable donde se almacerá el numero de celular del cliente
         */
        vm.cellPhone = '';

        /**
         *  @ngdoc property
         *  @name idSucursal
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Variable donde se almacerá el numero de la sucursal del usuario
         */
        vm.idSucursal = '';

        /**
         *  @ngdoc property
         *  @name idSucursal
         *  @propertyOf App.controller:creationAccountController
         *
         *  @description
         *  Variable donde se almacerá el id de si desea tarjeta debito
         */
        vm.validDebitNo = '';


        /* Listado de metodos */
        vm.validateClient = validateClient;
        vm.modalCancel = modalCancel;
        vm.getTypeVinculation = getTypeVinculation;
        vm.getTypeProduct = getTypeProduct;
        vm.getProducts = getProducts;
        vm.getPurposeAccount = getPurposeAccount;
        vm.validCtaPremia = validCtaPremia;
        vm.validAccountProdyct = validAccountProdyct;
        vm.getRodeExpected = getRodeExpected;
        vm.validcashDepositCant = validcashDepositCant; /** Funcion para validar el tipo de deposito en efectivo */
        vm.validcashWithdrawalCant = validcashWithdrawalCant; /** Funcion para validar el tipo de retiros en efectivo */
        vm.validinternacionaleTransferSentCant = validinternacionaleTransferSentCant; /** Función para validar las transferencias internacionales enviadas */
        vm.validinternacionaleTransferReceivedCant = validinternacionaleTransferReceivedCant; /** Función para validar Transferencias Internacionales Recibidas */
        vm.validpurchaseCheckRode = validpurchaseCheckRode; /** Función para validar Compra Cheques de Gerencia  */
        vm.validdepositCheckCant = validdepositCheckCant; /** Función para validar Depósitos en Cheque Extranjeros */
        vm.validProductID = validProductID;
        vm.getValidCashPesos =getValidCashPesos;
        vm.getValidCashUSD = getValidCashUSD;
        vm.getValidCashEUR = getValidCashEUR;
        vm.getValidCheckPurchasePesos = getValidCheckPurchasePesos;
        vm.getValidCheckPurchaseUSD = getValidCheckPurchaseUSD;
        vm.getValidCheckPurchaseEUR = getValidCheckPurchaseEUR;
        vm.getValidTrnsRecievedPesos = getValidTrnsRecievedPesos;
        vm.getValidTrnsRecievedUSD = getValidTrnsRecievedUSD;
        vm.getValidTrnsRecievedEUR = getValidTrnsRecievedEUR;
        vm.getValidWithdrawalPesos = getValidWithdrawalPesos;
        vm.getValidWithdrawalUSD = getValidWithdrawalUSD;
        vm.getValidWithdrawalEUR = getValidWithdrawalEUR;
        vm.getValidTrnsSendPesos = getValidTrnsSendPesos;
        vm.getValidTrnsSendUSD = getValidTrnsSendUSD;
        vm.getValidTrnsSendEUR = getValidTrnsSendEUR;
        vm.positionCardKey = positionCardKey;
        vm.validationCardKey = validationCardKey;
        vm.accountNumber = accountNumber;
        vm.modalFieldsRequired = modalFieldsRequired;
        vm.getPassiveContract = getPassiveContract;
        vm.accountTariff = accountTariff;
        vm.assignDebit = assignDebit;
        vm.sendMail = sendMail; 
        vm.updateDataSiebel = updateDataSiebel;

        /**
        *  @ngdoc method
        *  @name sendMail
        *  @methodOf App.controller:customerConfirmationController
        *
        *  @description
        *  función para enviar el coorreo electronico de bienvenida
        */
        function sendMail(){
    
            var documentNumber = '';
            var emailid = '';

            if (vm.goClient) {
                documentNumber = $rootScope.customerDataCredit.numberIdentification;
                emailid = $rootScope.dataFormCustomerBasicData.email;
            }
            if (vm.goAccount) {
                documentNumber = vm.viewModelCreationAccount.numberIdentification;
                emailid = vm.viewModelCreationAccount.basicData.email;
            } 

            validationClientService.getValidationEmailAccount(documentNumber, emailid);

        }
         /**
         *  @ngdoc service
         *  @name getCatalog
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Consultamos las sucursales activas y la recorremos para obtener el nombre de la sucursal del usuario
         */
        catalogService.getCatalog(CATALOG.OFFICE_CODE_CITY)
            .then(
            function (response) {

                vm.idSucursal = $rootScope.dataUser.sucursalId;
                if($rootScope.dataUser.sucursalId.length === 3){
                    vm.idSucursal = '0'+ $rootScope.dataUser.sucursalId;
                }
                
                angular.forEach(response.data, function (value, key) {
                    if (value.value === vm.idSucursal) {
                        vm.cityName = value.extrafield1;
                    }
                });

            }
            );

        


        

        /**
        *  @ngdoc method
        *  @name sendMail
        *  @methodOf App.controller:customerBasicDataController
        *
        *  @description
        *  función para visualizar el tarifario
        */
        function accountTariff(){
            var json = {};
            var stringProduct = vm.viewModelCreationAccount.product;
            json.accountType = stringProduct.toString();             
            if (vm.goClient) {
                json.documentNumber = $rootScope.customerDataCredit.numberIdentification;
                json.accountNumber = vm.accountNumber;
                json.clientNumber = $rootScope.dataFormCustomerForeignCurrency.customerNumber;
            }
            if (vm.goAccount) {
                json.accountNumber = vm.accountNumber;
                json.clientNumber = vm.clientNumber;
                json.documentNumber = vm.viewModelCreationAccount.numberIdentification;
            }           
            /*Recoremos todos los productos para obtener el nombre del producto seleccionado */
            angular.forEach(vm.products, function (value, key) {
                if (value.id === vm.viewModelCreationAccount.product) {
                    json.accountDetails = value.value;
                }
            });

            documentAccountTariffService.accountTariff(json)
                .then(
                    function (response) {
                        if (response.success) {
                            vm.urlAccountTariff = response.data.documentURL;
                            vm.tariffValid = true; /*Habilitamos el boton que valida que todo codigo de tarjeta de clave ha sido validado correctamente */
                            
                            if((angular.isDefined(vm.viewModelCreationAccount.basicData.email) && vm.viewModelCreationAccount.basicData.email !== '' && vm.viewModelCreationAccount.basicData.email !== null) || (angular.isDefined($rootScope.dataFormCustomerBasicData.email) && $rootScope.dataFormCustomerBasicData.email !== '' && $rootScope.dataFormCustomerBasicData.email !== null)){
                                sendMail();
                            }
                            
                        } else {
                            modalFactory.error(response.error.message);
                        }

                    }

                );
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
            vm.isDominicanRepublic = false;
            vm.findPep = false;
            vm.getBureau = false;
            vm.getControlList = false;
            vm.validationClient = false;
            vm.viewModelCreationAccount.basicData = {
                email : null,
                firstLastName : null,
                firstName : null,
                secondLastName : null,
                secondName : null
            };
            vm.viewModelCreationAccount.typeIdentification = 2;
        }

         resetData();

        /**
        *  @ngdoc method
        *  @name positionCardKey
        *  @methodOf App.controller:creationAccountController
        *
        *  @description
        *  Metodo para asiganar una posición aleatoria de la tarjeta de clave para cliente existente
        */
        function positionCardKey() {

            var numberIdentification = '';

            if(vm.goClient){
                numberIdentification = $rootScope.customerDataCredit.numberIdentification;
            }
            if(vm.goAccount){
                numberIdentification = vm.viewModelCreationAccount.numberIdentification;
            }
            validationCardKeyService.getPositionKeyCard(numberIdentification)
                .then(
                function (response) {
                    if (response.success) {
                        vm.viewModelCreationAccount.positionCard = response.data.positionId;
                    } else {
                        modalFactory.error(response.error.message);
                    }

                }
                );

        }


        /**
         *  @ngdoc function
         *  @name getTaskYesNo
         *  @methodOf App.controller:customerForeignCurrencyController
         *-
         *  @description
         *  Cargamos los valores de los desplegables 
         *  Para cuando el cliente desea tarjeta de debito.
         */
        function getRodeExpected() {
            catalogService.getCatalog(CATALOG.RODE_EXPETED)
                .then(
                    function (response) {
                        vm.rodeExpected = response.data;
                    }
                );
        }
        getRodeExpected();

        /**
         *  @ngdoc function
         *  @name getTaskYesNo
         *  @methodOf App.controller:customerForeignCurrencyController
         *-
         *  @description
         *  Cargamos los valores de los desplegables 
         *  Para cuando el cliente desea tarjeta de debito.
         */
        function getQuantityExpected() {
            catalogService.getCatalog(CATALOG.QUANTITY_EXPETED)
                .then(
                    function (response) {
                        vm.quantityExpected = response.data;
                    }
                );
        }
        getQuantityExpected();

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
         *  @name validAccountProdyct
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que valida los campos - tarjeta debito - numero tarjeta debito asignada - tipo tarjeta debito
        */
        function validAccountProdyct() {
            validCtaPremia();
            vm.textInvalidinterviewDebit = false;
            vm.viewModelCreationAccount.interviewDebit = '';


            /** Validacion para autocompletar el si o no */
            angular.forEach(ACCOUNT_PRODUCT.ACCOUNTS, function (value, key) {
                if (value === vm.viewModelCreationAccount.product) {
                    vm.viewModelCreationAccount.interviewDebit = vm.optionsYesNo[0].id;
                    vm.textInvalidinterviewDebit = true;
                    vm.accountsValue = value;
                }
            });

            /*Validamos que al seleccionar el Producto Cuenta de ahorros nomina empresarial se autocomplete por defecto SI en desea tarjeta debito */
            if(vm.viewModelCreationAccount.product === ACCOUNT_PRODUCT.ACCOUNT_NOMINAL_BUSINESS){
                    vm.viewModelCreationAccount.interviewDebit = vm.optionsYesNo[1].id;
                    vm.textInvalidinterviewDebit = true;
            }

            /** Validaciones para el tipo de moneda extranjera, donde se ocultan los campos Compra cheques de gerencia */
            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_USD, function (value, key) {
                if (value === vm.viewModelCreationAccount.product) {
                    vm.idmoneyExt = value;
                }
            });

            /** Validaciones para el tipo de moneda extranjera, donde se ocultan los campos Compra cheques de gerencia */
            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_EURO, function (value, key) {
                if (value === vm.viewModelCreationAccount.product) {
                    vm.idmoneyExt = value;
                }
            });

            /** Validaciones para el tipo moneda pesosa, donde se ocultan los campos Compra cheques de cheque extranjeros */
            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_PESOS, function (value, key) {
                if (value === vm.viewModelCreationAccount.product) {
                    vm.idmoneyRD = value;
                }
            });

            /*Capturamos el tipo de moneda del producto seleccionado */
            angular.forEach(vm.products, function (value, key) {
                if (value.id === vm.viewModelCreationAccount.product) {
                    if(value.extrafield1 === ACCOUNT_PRODUCT.CURRENCY_PRODUCT.RD){
                        vm.currency = ACCOUNT_PRODUCT.CURRENCY_SIEBEL.RD;
                    }
                    if(value.extrafield1 === ACCOUNT_PRODUCT.CURRENCY_PRODUCT.USD){
                        vm.currency = ACCOUNT_PRODUCT.CURRENCY_SIEBEL.USD;
                    }
                    if(value.extrafield1 === ACCOUNT_PRODUCT.CURRENCY_PRODUCT.EUR){
                        vm.currency = ACCOUNT_PRODUCT.CURRENCY_SIEBEL.EUR;
                    }
                    
                }
            });

        }

        function validProductID(id){
            validcashDepositCant(id);
            validcashWithdrawalCant(id);
            validinternacionaleTransferSentCant(id);
            validinternacionaleTransferReceivedCant(id);
            validpurchaseCheckRode(id);
            validdepositCheckCant(id);
        }
        /**
         *  @ngdoc method
         *  @name validcashDepositCant
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Funcion para validar el tipo de deposito en efectivo
        */
        function validcashDepositCant(id){
            getValidCashPesos();
            getValidCashUSD();
            getValidCashEUR();
            vm.viewModelCreationAccount.cashDepositRode = '';
            vm.textInvalidcashDepositRode = false;

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_PESOS, function (value, key) {
                if (value === id) {
                    vm.cashMoneyPesos = true;
                    vm.cashMoneyUSD = false;
                    vm.cashMoneyEUR = false;
                }
            });
           
           if (vm.cashMoneyPesos){
                /** Validacion para los campos Retiros en efectivo en los datos de operaciones */
                if (vm.viewModelCreationAccount.cashDepositCant === ACCOUNT_PRODUCT.ID_CANT0) {
                    vm.validcashDepositMoney = vm.cashDepositMoneyPesos;
                    vm.viewModelCreationAccount.cashDepositRode = ACCOUNT_PRODUCT.ID_CASHDEPOSIT_PESOS;
                    vm.textInvalidcashDepositRode = true;
                } else {
                    vm.validcashDepositMoney = vm.cashDepositMoneyPesos;
                    angular.forEach(vm.validcashDepositMoney, function (value, key) {
                        if (value.id === ACCOUNT_PRODUCT.ID_CASHDEPOSIT_PESOS) {
                            vm.validcashDepositMoney.splice(key, 1);
                        }
                    });
                }
           }
            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_USD, function (value, key) {
                if (value === id) {
                    vm.cashMoneyUSD = true;
                    vm.cashMoneyPesos = false;
                    vm.cashMoneyEUR = false;
                }
            });

            if (vm.cashMoneyUSD){
                /** Validacion para los campos Retiros en efectivo en los datos de operaciones */
                if (vm.viewModelCreationAccount.cashDepositCant === ACCOUNT_PRODUCT.ID_CANT0) {
                    vm.validcashDepositMoney = vm.cashDepositMoneyUSD;
                    vm.viewModelCreationAccount.cashDepositRode = ACCOUNT_PRODUCT.ID_CASDEPOSIT_USD;
                    vm.textInvalidcashDepositRode = true;
                } else {
                    vm.validcashDepositMoney = vm.cashDepositMoneyUSD;
                    angular.forEach(vm.validcashDepositMoney, function (value, key) {
                        if (value.id === ACCOUNT_PRODUCT.ID_CASDEPOSIT_USD) {
                            vm.validcashDepositMoney.splice(key, 1);
                        }
                    });
                }
           }           

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_EURO, function (value, key) {
                if (value === id) {
                    vm.cashMoneyEUR = true;
                    vm.cashMoneyUSD = false;
                    vm.cashMoneyPesos = false;    
                }
            });

            if (vm.cashMoneyEUR){
                /** Validacion para los campos Retiros en efectivo en los datos de operaciones */
                if (vm.viewModelCreationAccount.cashDepositCant === ACCOUNT_PRODUCT.ID_CANT0) {
                    vm.validcashDepositMoney = vm.cashDepositMoneyEUR;
                    vm.viewModelCreationAccount.cashDepositRode = ACCOUNT_PRODUCT.ID_CASHDEPOSIT_EUR;
                    vm.textInvalidcashDepositRode = true;
                } else {
                    vm.validcashDepositMoney = vm.cashDepositMoneyEUR;
                    angular.forEach(vm.validcashDepositMoney, function (value, key) {
                        if (value.id === ACCOUNT_PRODUCT.ID_CASHDEPOSIT_EUR) {
                            vm.validcashDepositMoney.splice(key, 1);
                        }
                    });
                }
           }

        }

        /**
         *  @ngdoc method
         *  @name validcashWithdrawalRode
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función para validar las transferencias internacionales enviadas
        */

        function validcashWithdrawalCant(id){
            getValidWithdrawalPesos();
            getValidWithdrawalUSD();
            getValidWithdrawalEUR();
            vm.viewModelCreationAccount.cashWithdrawalRode = '';
            vm.textInvalidcashWithdrawalCant = false;

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_PESOS, function (value, key) {
                if (value === id) {
                    vm.cashMoneyPesos = true;
                    vm.cashMoneyUSD = false;
                    vm.cashMoneyEUR = false;
                }
            });

            if (vm.cashMoneyPesos) {
               /** Validacion para los campos Retiros en efectivo en los datos de operaciones */
               if (vm.viewModelCreationAccount.cashWithdrawalCant === ACCOUNT_PRODUCT.ID_CANT0){
                   vm.validcashWithdrawalCantData =  vm.withdrawalDepositMoneyPesos;
                   vm.viewModelCreationAccount.cashWithdrawalRode = ACCOUNT_PRODUCT.ID_WITHDRAWAL_PESOS;
                   vm.textInvalidcashWithdrawalCant = true;
               }else {  
                   vm.validcashWithdrawalCantData =  vm.withdrawalDepositMoneyPesos;
                        angular.forEach(vm.validcashWithdrawalCantData, function (value3, key3) {
                            if (value3.id === ACCOUNT_PRODUCT.ID_WITHDRAWAL_PESOS) {
                                vm.validcashWithdrawalCantData.splice(key3, 1);
                            }
                        });                         
               }
            }

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_USD, function (value, key) {
                if (value === id) {
                    vm.cashMoneyUSD = true;
                    vm.cashMoneyPesos = false;
                    vm.cashMoneyEUR = false;
                }
            });

            if (vm.cashMoneyUSD) {
               /** Validacion para los campos Retiros en efectivo en los datos de operaciones */
               if (vm.viewModelCreationAccount.cashWithdrawalCant === ACCOUNT_PRODUCT.ID_CANT0){
                   vm.validcashWithdrawalCantData =  vm.withdrawalDepositMoneyUSD;
                   vm.viewModelCreationAccount.cashWithdrawalRode = ACCOUNT_PRODUCT.ID_WITHDRAWAL_USD;
                   vm.textInvalidcashWithdrawalCant = true;
               }else {  
                   vm.validcashWithdrawalCantData =  vm.withdrawalDepositMoneyUSD;
                        angular.forEach(vm.validcashWithdrawalCantData, function (value3, key3) {
                            if (value3.id === ACCOUNT_PRODUCT.ID_WITHDRAWAL_USD) {
                                vm.validcashWithdrawalCantData.splice(key3, 1);
                            }
                        });                         
               }
            }

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_EURO, function (value, key) {
                if (value === id) {
                    vm.cashMoneyEUR = true;
                    vm.cashMoneyUSD = false;
                    vm.cashMoneyPesos = false;    
                }
            });

            if (vm.cashMoneyEUR) {
               /** Validacion para los campos Retiros en efectivo en los datos de operaciones */
               if (vm.viewModelCreationAccount.cashWithdrawalCant === ACCOUNT_PRODUCT.ID_CANT0){
                   vm.validcashWithdrawalCantData =  vm.withdrawalDepositMoneyEUR;
                   vm.viewModelCreationAccount.cashWithdrawalRode = ACCOUNT_PRODUCT.ID_WITHDRAWAL_EUR;
                   vm.textInvalidcashWithdrawalCant = true;
               }else {  
                   vm.validcashWithdrawalCantData =  vm.withdrawalDepositMoneyEUR;
                        angular.forEach(vm.validcashWithdrawalCantData, function (value3, key3) {
                            if (value3.id === ACCOUNT_PRODUCT.ID_WITHDRAWAL_EUR) {
                                vm.validcashWithdrawalCantData.splice(key3, 1);
                            }
                        });                         
               }
            }
        }
                
        /**
         *  @ngdoc method
         *  @name validinternacionaleTransferSentCant
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Funcion para validar Transferencias Internacionales Enviadas
        */
        function validinternacionaleTransferSentCant(id){
            getValidTrnsSendPesos();
            getValidTrnsSendUSD();
            getValidTrnsSendEUR();
            vm.viewModelCreationAccount.internacionaleTransferSentRode = '';
            vm.textInvalidSentRode = false;

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_PESOS, function (value, key) {
                if (value === id) {
                    vm.cashMoneyPesos = true;
                    vm.cashMoneyUSD = false;
                    vm.cashMoneyEUR = false;
                }
            });

            if(vm.cashMoneyPesos){
                /** Validacion para los campos Trasferencias Internacionales enviadas en los datos de operaciones */
               if (vm.viewModelCreationAccount.internacionaleTransferSentCant === ACCOUNT_PRODUCT.ID_CANT0){
                   vm.internacionaleTransferSentCantData =  vm.transferSendDepositMoneyPesos;
                   vm.viewModelCreationAccount.internacionaleTransferSentRode = ACCOUNT_PRODUCT.ID_TRANSFERS_SENT_PESOS;
                   vm.textInvalidSentRode = true;
               }else {  
                   vm.internacionaleTransferSentCantData =  vm.transferSendDepositMoneyPesos;
                        angular.forEach(vm.internacionaleTransferSentCantData, function (value3, key3) {
                            if (value3.id === ACCOUNT_PRODUCT.ID_TRANSFERS_SENT_PESOS) {
                                vm.internacionaleTransferSentCantData.splice(key3, 1);
                            }
                        });                         
               }
            }

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_USD, function (value, key) {
                if (value === id) {
                    vm.cashMoneyUSD = true;
                    vm.cashMoneyPesos = false;
                    vm.cashMoneyEUR = false;
                }
            });

            if(vm.cashMoneyUSD){
                /** Validacion para los campos Trasferencias Internacionales enviadas en los datos de operaciones */
               if (vm.viewModelCreationAccount.internacionaleTransferSentCant === ACCOUNT_PRODUCT.ID_CANT0){
                   vm.internacionaleTransferSentCantData =  vm.transferSendwithdrawalDepositMoneyUSD;
                   vm.viewModelCreationAccount.internacionaleTransferSentRode = ACCOUNT_PRODUCT.ID_TRANSFERS_SENT_USD;
                   vm.textInvalidSentRode = true;
               }else {  
                   vm.internacionaleTransferSentCantData =  vm.transferSendwithdrawalDepositMoneyUSD;
                        angular.forEach(vm.internacionaleTransferSentCantData, function (value3, key3) {
                            if (value3.id === ACCOUNT_PRODUCT.ID_TRANSFERS_SENT_USD) {
                                vm.internacionaleTransferSentCantData.splice(key3, 1);
                            }
                        });                         
               }
            }

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_EURO, function (value, key) {
                if (value === id) {
                    vm.cashMoneyEUR = true;
                    vm.cashMoneyUSD = false;
                    vm.cashMoneyPesos = false;    
                }
            });

            if(vm.cashMoneyEUR){
                /** Validacion para los campos Trasferencias Internacionales enviadas en los datos de operaciones */
               if (vm.viewModelCreationAccount.internacionaleTransferSentCant === ACCOUNT_PRODUCT.ID_CANT0){
                   vm.internacionaleTransferSentCantData =  vm.transferSendwithdrawalDepositMoneyEUR;
                   vm.viewModelCreationAccount.internacionaleTransferSentRode = ACCOUNT_PRODUCT.ID_TRANSFERS_SENT_EUR;
                   vm.textInvalidSentRode = true;
               }else {  
                   vm.internacionaleTransferSentCantData =  vm.transferSendwithdrawalDepositMoneyEUR;
                        angular.forEach(vm.internacionaleTransferSentCantData, function (value3, key3) {
                            if (value3.id === ACCOUNT_PRODUCT.ID_TRANSFERS_SENT_EUR) {
                                vm.internacionaleTransferSentCantData.splice(key3, 1);
                            }
                        });                         
               }
            }


        }
        /**
         *  @ngdoc method
         *  @name validinternacionaleTransferReceivedCant
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Funcion para validar Transferencias Internacionales Recibidas
        */
        function validinternacionaleTransferReceivedCant(id){
            getValidTrnsRecievedPesos();
            getValidTrnsRecievedUSD();
            getValidTrnsRecievedEUR();
            vm.viewModelCreationAccount.internacionaleTransferReceivedRode = '';
            vm.textInvalidReceivedRode = false;

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_PESOS, function (value, key) {
                if (value === id) {
                    vm.cashMoneyPesos = true;
                    vm.cashMoneyUSD = false;
                    vm.cashMoneyEUR = false;
                }
            });

            if (vm.cashMoneyPesos){
               /** Validacion para los campos Trasferencias Internacionales recibidas en los datos de operaciones */
               if (vm.viewModelCreationAccount.internacionaleTransferReceivedCant === ACCOUNT_PRODUCT.ID_CANT0){
                   vm.internacionaleTransferReceivedData =  vm.tranferRecievedPesos;
                   vm.viewModelCreationAccount.internacionaleTransferReceivedRode = ACCOUNT_PRODUCT.ID_TRANSFER_RECEIVED_PESOS;
                   vm.textInvalidReceivedRode = true;
               } else {  
                   vm.internacionaleTransferReceivedData =  vm.tranferRecievedPesos;
                        angular.forEach(vm.internacionaleTransferReceivedData, function (value3, key3) {
                            if (value3.id === ACCOUNT_PRODUCT.ID_TRANSFER_RECEIVED_PESOS) {
                                vm.internacionaleTransferReceivedData.splice(key3, 1);
                            }
                        });                         
               }    
            } 

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_USD, function (value, key) {
                if (value === id) {
                    vm.cashMoneyUSD = true;
                    vm.cashMoneyPesos = false;
                    vm.cashMoneyEUR = false;
                }
            });

            if (vm.cashMoneyUSD){
               /** Validacion para los campos Trasferencias Internacionales recibidas en los datos de operaciones */
               if (vm.viewModelCreationAccount.internacionaleTransferReceivedCant === ACCOUNT_PRODUCT.ID_CANT0){
                   vm.internacionaleTransferReceivedData =  vm.tranferRecievedUSD;
                   vm.viewModelCreationAccount.internacionaleTransferReceivedRode = ACCOUNT_PRODUCT.ID_TRANSFER_RECEIVED_USD;
                   vm.textInvalidReceivedRode = true;
               } else {  
                   vm.internacionaleTransferReceivedData =  vm.tranferRecievedUSD;
                        angular.forEach(vm.internacionaleTransferReceivedData, function (value3, key3) {
                            if (value3.id === ACCOUNT_PRODUCT.ID_TRANSFER_RECEIVED_USD) {
                                vm.internacionaleTransferReceivedData.splice(key3, 1);
                            }
                        });                         
               }    
            }

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_EURO, function (value, key) {
                if (value === id) {
                    vm.cashMoneyEUR = true;
                    vm.cashMoneyUSD = false;
                    vm.cashMoneyPesos = false;    
                }
            });

            if (vm.cashMoneyEUR){
               /** Validacion para los campos Trasferencias Internacionales recibidas en los datos de operaciones */
               if (vm.viewModelCreationAccount.internacionaleTransferReceivedCant === ACCOUNT_PRODUCT.ID_CANT0){
                   vm.internacionaleTransferReceivedData =  vm.tranferRecievedEUR;
                   vm.viewModelCreationAccount.internacionaleTransferReceivedRode = ACCOUNT_PRODUCT.ID_TRANSFER_RECEIVED_EUR;
                   vm.textInvalidReceivedRode = true;
               } else {  
                   vm.internacionaleTransferReceivedData =  vm.tranferRecievedEUR;
                        angular.forEach(vm.internacionaleTransferReceivedData, function (value3, key3) {
                            if (value3.id === ACCOUNT_PRODUCT.ID_TRANSFER_RECEIVED_EUR) {
                                vm.internacionaleTransferReceivedData.splice(key3, 1);
                            }
                        });                         
               }    
            }
           
        
        }

        /**
         *  @ngdoc method
         *  @name validpurchaseCheckRode
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Funcion para validar Compra Cheques de Gerencia
        */
        function validpurchaseCheckRode(id){
            getValidCheckPurchasePesos();
            vm.viewModelCreationAccount.purchaseCheckRode = '';
            vm.textInvalidCheckRode = false;

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_PESOS, function (value, key) {
                if (value === id) {
                    vm.cashMoneyPesos = true;
                    vm.cashMoneyUSD = false;
                    vm.cashMoneyEUR = false;
                }
            });

            if(vm.cashMoneyPesos){
                /** Validacion para los campos Compra Cheques de Gerencia en los datos de operaciones */ 
               if (vm.viewModelCreationAccount.purchaseCheckCant === ACCOUNT_PRODUCT.ID_CANT0){
                   vm.purchaseCheckRodeData = vm.checkPesos;
                   vm.viewModelCreationAccount.purchaseCheckRode = ACCOUNT_PRODUCT.ID_CHECK_PESOS;
                   vm.textInvalidCheckRode = true;
               } else {  
                   vm.purchaseCheckRodeData =  vm.checkPesos;
                        angular.forEach(vm.purchaseCheckRodeData, function (value3, key3) {
                            if (value3.id === ACCOUNT_PRODUCT.ID_CHECK_PESOS) {
                                vm.purchaseCheckRodeData.splice(key3, 1);
                            }
                        });                         
               } 
            }
        }

        /**
         *  @ngdoc method
         *  @name validdepositCheckCant
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Funcion para validar Depósitos en Cheque Extranjeros
        */        
        function validdepositCheckCant(id){
            getValidCheckPurchaseUSD();
            getValidCheckPurchaseEUR();               
            vm.viewModelCreationAccount.depositCheckRode = '';     
            vm.textInvaliddepositCheckCant = false;

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_USD, function (value, key) {
                if (value === id) {
                    vm.cashMoneyUSD = true;
                    vm.cashMoneyPesos = false;
                    vm.cashMoneyEUR = false;
                }
            });

            if(vm.cashMoneyUSD){
                /** Validacion para los campos Compra Cheques de Gerencia en los datos de operaciones */ 
               if (vm.viewModelCreationAccount.depositCheckCant === ACCOUNT_PRODUCT.ID_CANT0){
                   vm.purchaseCheckRodeExtData = vm.checkUSD;
                   vm.viewModelCreationAccount.depositCheckRode = ACCOUNT_PRODUCT.ID_CHECK_USD;
                   vm.textInvaliddepositCheckCant = true;
               } else {  
                   vm.purchaseCheckRodeExtData =  vm.checkUSD;
                        angular.forEach(vm.purchaseCheckRodeExtData, function (value3, key3) {
                            if (value3.id === ACCOUNT_PRODUCT.ID_CHECK_USD) {
                                vm.purchaseCheckRodeExtData.splice(key3, 1);
                            }
                        });                         
               } 
            }

            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_EURO, function (value, key) {
                if (value === id) {
                    vm.cashMoneyEUR = true;
                    vm.cashMoneyUSD = false;
                    vm.cashMoneyPesos = false;    
                }
            });

            if(vm.cashMoneyEUR){
                /** Validacion para los campos Compra Cheques de Gerencia en los datos de operaciones */ 
               if (vm.viewModelCreationAccount.depositCheckCant === ACCOUNT_PRODUCT.ID_CANT0){
                   vm.purchaseCheckRodeExtData = vm.checkEUR;
                   vm.viewModelCreationAccount.depositCheckRode = ACCOUNT_PRODUCT.ID_CHECK_EUR;
                   vm.textInvaliddepositCheckCant = true;
               } else {  
                   vm.purchaseCheckRodeExtData =  vm.checkEUR;
                        angular.forEach(vm.purchaseCheckRodeExtData, function (value3, key3) {
                            if (value3.id === ACCOUNT_PRODUCT.ID_CHECK_EUR) {
                                vm.purchaseCheckRodeExtData.splice(key3, 1);
                            }
                        });                         
               } 
            }     
        }

        /**
         *  @ngdoc method
         *  @name validCtaPremia
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función valida la cuenta de tipo premia
        */
        function validCtaPremia() {
                if (vm.viewModelCreationAccount.product === SELECT_DEFAULT.CTA_PREMIA) {
                    modalFactory.warning(messages.modals.error.CTApremia);
                }
        }

        /**
         *  @ngdoc method
         *  @name getTypeProduct
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que carga los  tipo de productos
         */
        function getTypeProduct() {
            catalogService.getCatalog(CATALOG.TYPE_PRODUCT)
                .then(
                    function (response) {
                        vm.typeProduct = response.data;
                    });
        }
        getTypeProduct();

        /**
         *  @ngdoc method
         *  @name getProducts
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que carga los productos
         */
        function getProducts(id) {
            catalogComplexService.getCatalogComplexByCatalog(id, ACCOUNT_PRODUCT.ID_CATALOG_PRODUCT)
                .then(
                    function (response) {
                        vm.products = response.data;
                    });
        }

        /**
         *  @ngdoc method
         *  @name getTypeVinculation
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que carga el tipo de vinvulación
         */
        function getPurposeAccount(id) {
            catalogComplexService.getCatalogComplexByCatalog(id, ACCOUNT_PRODUCT.ID_CATALOG_ACCOUNT)
                .then(
                    function (response) {
                        vm.purposeAccount = response.data;
                    });
        }

        /**
         *  @ngdoc method
         *  @name getTypeVinculation
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que carga los pesos en Transferencias Internacionales Recibidas pesos, usd, eur
         */
        function getValidTrnsRecievedPesos() {
            catalogService.getCatalog(CATALOG.TRANS_RECIEVED_PESOS)
                .then(
                    function (response) {
                        vm.tranferRecievedPesos = response.data;
                    }
                );
        }
        function getValidTrnsRecievedUSD() {
            catalogService.getCatalog(CATALOG.TRANS_RECIEVED_USD)
                .then(
                    function (response) {
                        vm.tranferRecievedUSD = response.data;
                    }
                );
        }
        function getValidTrnsRecievedEUR() {
            catalogService.getCatalog(CATALOG.TRANS_RECIEVED_EUR)
                .then(
                    function (response) {
                        vm.tranferRecievedEUR = response.data;
                    }
                );
        }

        /**
         *  @ngdoc method
         *  @name getTypeVinculation
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que carga los pesos en Compra Cheques de Gerencia pesos, usd, eur
         */
        function getValidCheckPurchasePesos() {
            catalogService.getCatalog(CATALOG.CHECK_PURCHASE_PESOS)
                .then(
                    function (response) {
                        vm.checkPesos = response.data;
                    }
                );
        }
        function getValidCheckPurchaseUSD() {
            catalogService.getCatalog(CATALOG.CHECK_PURCHASE_USD)
                .then(
                    function (response) {
                        vm.checkUSD = response.data;
                    }
                );
        }
        function getValidCheckPurchaseEUR() {
            catalogService.getCatalog(CATALOG.CHECK_PURCHASE_EUR)
                .then(
                    function (response) {
                        vm.checkEUR = response.data;
                    }
                );
        }


        /**
         *  @ngdoc method
         *  @name getTypeVinculation
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que carga el tipo de vinvulación
         */
        function getTypeVinculation() {
            catalogService.getCatalog(CATALOG.TYPE_VINCULATION)
                .then(
                    function (response) {
                        vm.typeVinculation = response.data;
                    });
        }
        getTypeVinculation();

        /**
         *  @ngdoc method
         *  @name getTypeVinculation
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que carga los pesos en depositos en efectivo pesos, usd, eur
         */
        function getValidCashPesos() {
            catalogService.getCatalog(CATALOG.CONSIGNMENT_PESOS)
                .then(
                    function (response) {
                        vm.cashDepositMoneyPesos = response.data;
                    }
                );
        }
        function getValidCashUSD() {
            catalogService.getCatalog(CATALOG.CONSIGNMENT_USD)
                .then(
                    function (response) {
                        vm.cashDepositMoneyUSD = response.data;
                    }
                );
        }
        function getValidCashEUR() {
            catalogService.getCatalog(CATALOG.CONSIGNMENT_EUR)
                .then(
                    function (response) {
                        vm.cashDepositMoneyEUR = response.data;
                    }
                );
        }

        /**
         *  @ngdoc method
         *  @name getTypeVinculation
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que carga los pesos en retiros en efectivo pesos, usd, eur
         */
        function getValidWithdrawalPesos() {
            catalogService.getCatalog(CATALOG.RETIREMENT_PESOS)
                .then(
                    function (response) {
                        vm.withdrawalDepositMoneyPesos = response.data;
                    }
                );
        }
        function getValidWithdrawalUSD() {
            catalogService.getCatalog(CATALOG.RETIREMENT_USD)
                .then(
                    function (response) {
                        vm.withdrawalDepositMoneyUSD = response.data;
                    }
                );
        }
        function getValidWithdrawalEUR() {
            catalogService.getCatalog(CATALOG.RETIREMENT_EUR)
                .then(
                    function (response) {
                        vm.withdrawalDepositMoneyEUR = response.data;
                    }
                );
        }

        /**
         *  @ngdoc method
         *  @name getTypeVinculation
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que carga los pesos en retiros en efectivo pesos, usd, eur
         */
        function getValidTrnsSendPesos() {
            catalogService.getCatalog(CATALOG.TRANS_SENDED_PESOS)
                .then(
                    function (response) {
                        vm.transferSendDepositMoneyPesos = response.data;
                    }
                );
        }
        function getValidTrnsSendUSD() {
            catalogService.getCatalog(CATALOG.TRANS_SENDED_USD)
                .then(
                    function (response) {
                        vm.transferSendwithdrawalDepositMoneyUSD = response.data;
                    }
                );
        }
        function getValidTrnsSendEUR() {
            catalogService.getCatalog(CATALOG.TRANS_SENDED_EUR)
                .then(
                    function (response) {
                        vm.transferSendwithdrawalDepositMoneyEUR = response.data;
                    }
                );
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
            
            var documentNumber = vm.viewModelCreationAccount.numberIdentification;

            resetData();
            validationClientService.getValidationClient(documentNumber, vm.viewModelCreationAccount.typeIdentification, $rootScope.dataUser.userName).then(function (responseValue) {
               
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

        /**
         *  @ngdoc method
         *  @name getCreditBureau
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Valida al cliente en el buró
         *  Recupera los datos principales del cliente en el buró.
         */
        function getCreditBureau () {

            var documentNumber = vm.viewModelCreationAccount.numberIdentification;

            creditBureauService.getValidCreditBureau(documentNumber, $rootScope.dataUser.userName).then(function (responseValue) {
            
                vm.findJudicialEvaluation = responseValue.validationBuroResult;
                if (!vm.findJudicialEvaluation) {
                    vm.getBureau = true;
                    modalFactory.error(messages.modals.error.badJudicialEvaluation);
                } else {

                    creditBureauService.getValidCientExisting(vm.viewModelCreationAccount.typeIdentification ,documentNumber, $rootScope.dataUser.userName).
                        then(function   
                            (response) {

                            vm.dataClientExit = response;

                            /* Si el segundo nombre viene indefinido colocarlo como vacio  */
                            if (angular.isObject(vm.dataClientExit.secondName)) {
                                vm.viewModelCreationAccount.basicData.secondName = '';
                            } else {
                                vm.viewModelCreationAccount.basicData.secondName = vm.dataClientExit.secondName;
                            }

                            /* Si el segundo apellido viene indefinido colocarlo como vacio  */
                            if (angular.isObject(vm.dataClientExit.secondLastname)) {
                                vm.viewModelCreationAccount.basicData.secondLastName = '';
                            } else {
                                vm.viewModelCreationAccount.basicData.secondLastName = vm.dataClientExit.secondLastname;
                            }

                            /* Validamos si el pais de residencia es la republica dominicana */
                            if (vm.dataClientExit.nacionality !== messages.general.dominicanCountrySibel) {
                                modalFactory.error(messages.modals.error.notCountryAllowedAccount);
                            } else {
                                vm.isDominicanRepublic = true;
                            }

                            /* Si la tarjeta clave viene vacia o indefinida colocarla como vacio  */
                            if (angular.isObject(vm.dataClientExit.keyCardNumber) || vm.dataClientExit.keyCardNumber==='') {
                                vm.viewModelCreationAccount.keyCardNumber = '';
                            } else {
                                 vm.viewModelCreationAccount.keyCardNumber = vm.dataClientExit.keyCardNumber;
                            }
                            

                            

                            vm.viewModelCreationAccount.basicData.firstName = vm.dataClientExit.firstName;
                            vm.viewModelCreationAccount.basicData.firstLastName = vm.dataClientExit.firstLastname;
                            vm.viewModelCreationAccount.basicData.email = vm.dataClientExit.email;
                            vm.viewModelCreationAccount.transactionsAch = vm.dataClientExit.transferBetweenBanks;
                            vm.nacionality = vm.dataClientExit.nacionality;
                            vm.civilState = vm.dataClientExit.civilState;
                            vm.fullAddress = vm.dataClientExit.address;
                            vm.cellPhone = vm.dataClientExit.cellPhone;
                            vm.clientNumber = vm.dataClientExit.clientNumber;
                            vm.getBureau = true;
                            validateClientCanContinue();
                      
                    }, modalError);
                }

                

            }, modalError);

        }

        /**
         *  @ngdoc function
         *  @name getCreditListService
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Valida si el cliente existe en lista de control
         */ 
        function getCreditListService() {

            var documentNumber = vm.viewModelCreationAccount.numberIdentification;

            creditListService.getCreditListService(documentNumber, vm.viewModelCreationAccount.typeIdentification, $rootScope.dataUser.userName).then(function(responseValue) {

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
                    vm.viewModelCreationAccount.typeVinculation = SELECT_DEFAULT.TYPE_VINCULATION;
                    vm.viewModelCreationAccount.typeProduct = SELECT_DEFAULT.TYPE_PRODUCT;

                    /*Recoremos el tipo de documento para capturar el nombre del tipo de documento seleccionado*/
                    angular.forEach(vm.typeDocuments, function (value, key) {
                        if (value.id === vm.viewModelCreationAccount.typeIdentification) {
                            vm.nameTypeIdentification = value.value;
                        }
                    });

                    getProducts(vm.viewModelCreationAccount.typeProduct);
                    getPurposeAccount(vm.viewModelCreationAccount.typeProduct);
                    /*Validamos que el cliente tenga tarjeta de clave activa */
                    if (angular.isObject(vm.dataClientExit.keyCardNumber) || vm.dataClientExit.keyCardNumber === '') {
                        modalFactory.warning(messages.modals.error.clientCardNew);
                        vm.clientCanContinue = false;
                       // vm.contentDataCLient = false; 
                    } else {
                        vm.clientCanContinue = true;
                         /*Llamamos a la función que genera una posición aleatoria de la tarjeta de clave */
                        positionCardKey();
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
         *  @name condición 
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  autocompleta el tipo de vinculación cuando el cliente viene del proceso de creación de cliente
         */
        if (vm.goClient){
            vm.clientCanContinue = true;
            vm.viewModelCreationAccount.typeVinculation = SELECT_DEFAULT.TYPE_VINCULATION;
            vm.viewModelCreationAccount.typeProduct = SELECT_DEFAULT.TYPE_PRODUCT;
            getProducts(vm.viewModelCreationAccount.typeProduct);
            getPurposeAccount(vm.viewModelCreationAccount.typeProduct);
            /*Llamamos a la función que genera la posición de la tarjeta de clave de manera aleatoria */
            positionCardKey();
            /*Asignamos la misma tarjeta de clave que se asignó al cliente nuevo */
            vm.viewModelCreationAccount.keyCardNumber  = $rootScope.dataFormCustomerForeignCurrency.cardKey;
            vm.viewModelCreationAccount.transactionsAch = $rootScope.dataFormCustomerConfirmation.achlbtr;
            vm.nameTypeIdentification = $rootScope.customerDataCredit.nameTypeIdentification;
            vm.nacionality = $rootScope.customerDataCredit.nationality;
            vm.civilState = $rootScope.dataFormCustomerBasicData.civilStatusNew;
            vm.email = $rootScope.dataFormCustomerBasicData.email;
            vm.fullAddress = $rootScope.dataFormCustomerBasicData.fullAddress;
            vm.cellPhone =  $rootScope.dataFormCustomerBasicData.mobilePhone.toString();
            vm.clientNumber = $rootScope.dataFormCustomerForeignCurrency.customerNumber;
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

        /**
         *  @ngdoc method
         *  @name getTypeDocuments
         *  @methodOf App.controller:creationAccountController
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
        *  @ngdoc method
        *  @name validationCardKey
        *  @methodOf App.controller:creationAccountController
        *
        *  @description
        *  Metodo para validar que la posicion de la tarjeta clave conincida con el numero aleatoria generado
        */
        function validationCardKey() {
            var json = {};
            json.positionId = vm.viewModelCreationAccount.positionCard;
            if (vm.goClient) {
                json.documentNumber = $rootScope.customerDataCredit.numberIdentification;
            }
            if (vm.goAccount) {
                json.documentNumber = vm.viewModelCreationAccount.numberIdentification;
                vm.email = vm.viewModelCreationAccount.basicData.email;
            }
            json.positionValue = vm.viewModelCreationAccount.positionValue;
            if (vm.formCreationAccount.$valid) {
                validationCardKeyService.validationCardKey(json)
                    .then(
                    function (response) {
                        if (response.success) {
                            modalFactory.success(messages.modals.success.codeCorrect);
                            /*Llamamos a la función que genere el numero de cuenta */
                            accountNumber();

                            if ((angular.isDefined(vm.viewModelCreationAccount.basicData.email) && vm.viewModelCreationAccount.basicData.email !== '' && vm.viewModelCreationAccount.basicData.email !== null) || (angular.isDefined($rootScope.dataFormCustomerBasicData.email) && $rootScope.dataFormCustomerBasicData.email !== '' && $rootScope.dataFormCustomerBasicData.email !== null)) {
                                /*Llamamos a la función que actualiza el correo electronico en siebel */
                                updateDataSiebel();
                            }
                            
                            vm.clientCanContinue = false;
                        } else {
                            modalFactory.error(messages.modals.error.codeIncorrect);
                        }

                    }
                    );
            } else {
                //Chequea que todos los campos obligatorios esten llenos y validos.
                vm.submitted = true;
                modalFieldsRequired();
            }

        }

         /**
         *  @ngdoc method
         *  @name accountNumber
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Consulta que crea y genera el numero de cuenta del cliente
         */        
        function accountNumber() {
            var json = {};
            var numberIdentification = '';
            var customerName = '';
            var clientNumber = '';
            if (vm.goClient) {
                numberIdentification = $rootScope.customerDataCredit.numberIdentification;
                 customerName = $rootScope.customerDataCredit.firtsName + ' ' + $rootScope.customerDataCredit.surname;
                 clientNumber = $rootScope.dataFormCustomerForeignCurrency.customerNumber;
            }
            if (vm.goAccount) {
                numberIdentification = vm.viewModelCreationAccount.numberIdentification;
                customerName = vm.viewModelCreationAccount.basicData.firstName + ' ' + vm.viewModelCreationAccount.basicData.secondName;
                clientNumber = vm.dataClientExit.clientNumber;
            }
            json.documentType = vm.viewModelCreationAccount.typeIdentification;
            json.documentNumber = numberIdentification;
            json.productId = vm.viewModelCreationAccount.product;
            json.purposeId = vm.viewModelCreationAccount.purposeAcc;
            json.customerName = customerName;
            json.customerNumber = clientNumber;
            json.userName = $rootScope.dataUser.userName;
            json.idAmountCashDeposit = vm.viewModelCreationAccount.cashDepositRode;
            json.idQuantityCashDeposit = vm.viewModelCreationAccount.cashDepositCant;
            json.idAmountCashWithDraw = vm.viewModelCreationAccount.cashWithdrawalRode;
            json.idQuantityCashWithDraw = vm.viewModelCreationAccount.cashWithdrawalCant;
            json.idAmountInternacionalTranferRecieved = vm.viewModelCreationAccount.internacionaleTransferReceivedRode;
            json.idQuantityInternacionalTranferRecieved = vm.viewModelCreationAccount.internacionaleTransferReceivedCant;
            json.idAmountInternacionalTranferSent = vm.viewModelCreationAccount.internacionaleTransferSentRode;
            json.idQuantityInternacionalTranferSent = vm.viewModelCreationAccount.internacionaleTransferSentCant;
            /** Validaciones para el tipo moneda sea pesos, donde se ocultan los campos Compra cheques de cheque extranjeros */
            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_PESOS, function (value, key) {
                if (value === vm.viewModelCreationAccount.product) {
                    json.idAmountMangagementCheck = vm.viewModelCreationAccount.purchaseCheckRode;
                    json.idQuantityManagementCheck = vm.viewModelCreationAccount.purchaseCheckCant;
                    json.idAmountForeignCheck = ACCOUNT_PRODUCT.ID_CHECK_USD;
                    json.idQuantityForeignCheck = ACCOUNT_PRODUCT.ID_CANT0;
                }
            });

            /** Validaciones para el tipo de moneda en dolares, donde se ocultan los campos Compra cheques de gerencia */
            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_USD, function (value, key) {
                if (value === vm.viewModelCreationAccount.product) {
                    json.idAmountMangagementCheck = ACCOUNT_PRODUCT.ID_CHECK_PESOS;
                    json.idQuantityManagementCheck = ACCOUNT_PRODUCT.ID_CANT0;
                    json.idAmountForeignCheck = vm.viewModelCreationAccount.depositCheckRode;
                    json.idQuantityForeignCheck = vm.viewModelCreationAccount.depositCheckCant;
                }
            });

            /** Validaciones para el tipo de moneda en euros, donde se ocultan los campos Compra cheques de gerencia */
            angular.forEach(ACCOUNT_PRODUCT.PRODUCT_MONEY_EURO, function (value, key) {
                if (value === vm.viewModelCreationAccount.product) {
                    json.idAmountMangagementCheck = ACCOUNT_PRODUCT.ID_CHECK_PESOS;
                    json.idQuantityManagementCheck = ACCOUNT_PRODUCT.ID_CANT0;
                    json.idAmountForeignCheck = vm.viewModelCreationAccount.depositCheckRode;
                    json.idQuantityForeignCheck = vm.viewModelCreationAccount.depositCheckCant;
                }
            });
           


            accountCreationService.getAccountNumber(json)
                .then(
                function (response) {
                    if (response.success) {
                        vm.viewModelCreationAccount.numberAccount = response.data.accountNumber;
                        vm.accountNumber = response.data.accountNumber;
                        vm.accountActive = true;
                        /*Validamos si el cliente quiere tarjeta de credito o no */
                        if (vm.viewModelCreationAccount.interviewDebit === YES_NO.YES) {
                            /*Llamamos al servicio que se encarga de asignar la tarjeta de debito */
                            assignDebit();
                        }
                        /*Llamamos al servicio que general el contrato de tarifario */
                        accountTariff();
                        /*Llamamos al servicio que general el contrato de cuenta pasiva */
                        getPassiveContract();
                    } else {
                        modalFactory.error(response.error.message);
                    }

                }
                );
        }



         /**
         *  @ngdoc method
         *  @name accountNumber
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que obtiene la URL del contrato de cuentas pasivas en version PDF firmado digitalmente
         */        
        function getPassiveContract() {
            var json = {};
            var date = new Date();
            json.userName = $rootScope.dataUser.userName;
            json.userNameDescription = $rootScope.dataUser.userNameDescription;
            json.keyCard = vm.viewModelCreationAccount.keyCardNumber;
            json.key = vm.viewModelCreationAccount.positionCard;
            /*Validamos si el cliente quiere tarjeta de credito o no */
            if(vm.viewModelCreationAccount.interviewDebit === YES_NO.YES){
                json.savingAccountTypeAccessories = PASSIVE.CREDIT_CARD.USE;
            }
            if(vm.viewModelCreationAccount.interviewDebit === YES_NO.NO){
                 json.savingAccountTypeAccessories = PASSIVE.CREDIT_CARD.NO_USE;
            }
            /*Validamos que el tipo de producto elegido sea nominal o personal */
            if(vm.viewModelCreationAccount.product === ACCOUNT_PRODUCT.ACCOUNT_NOMINAL_BUSINESS){
                json.savingAccountType = PASSIVE.PRODUCT.NOMINA;
            }else{
                 json.savingAccountType = PASSIVE.PRODUCT.PERSONAL;
            }
            /*Validamos que el cliente tenga la trasnferencias interbancarias activa */
            if(vm.viewModelCreationAccount.transactionsAch === '1'){
                json.savingAccountTypeOtherServices = PASSIVE.ACH_LBTR;
            }
            if(vm.viewModelCreationAccount.transactionsAch === '0'){
                json.savingAccountTypeOtherServices = '';
            }
            
            json.cityName = vm.cityName;
            json.date = $filter('date')(date, 'yyyy-MM-dd');
            json.hour  =  new Date().getHours() + ':' + new Date().getMinutes();
            json.currency = vm.currency;
            json.documentType = vm.nameTypeIdentification;

            /*Obtenemos el numero de documento dependiendo si es cliente nuevo o existente */
            if (vm.goClient) {
                json.documentNumber = $rootScope.customerDataCredit.numberIdentification;
            }
            if (vm.goAccount) {
                json.documentNumber = vm.viewModelCreationAccount.numberIdentification;
            }

            /*Obtenemos el nombre del cliente dependiendo si es cliente nuevo o existente*/
            if (vm.goClient) {
                json.name  = $rootScope.customerDataCredit.firtsName + ' ' + $rootScope.customerDataCredit.secondName + ' ' +  $rootScope.customerDataCredit.surname + ' ' + $rootScope.customerDataCredit.secondSurname;
            }
            if (vm.goAccount) {
                json.name  = vm.viewModelCreationAccount.basicData.firstName + ' ' + vm.viewModelCreationAccount.basicData.secondName + ' ' + vm.viewModelCreationAccount.basicData.firstLastName + ' ' + vm.viewModelCreationAccount.basicData.secondLastName;
            }
             /*Verificamos si la nacionalidad del cliente nuevo es DOMINICANA para convertirlo a REPUBLICA DOMINICANA */
            if(vm.nacionality === messages.general.dominicanCountry){
                json.nacionality = messages.general.dominicanCountrySibel;
            }else{
                json.nacionality = vm.nacionality;
            }

            json.civilState = vm.civilState;
            
            json.email = vm.email;

            json.address = vm.fullAddress;

            json.cellPhone = vm.cellPhone;

            json.clientNumber = vm.clientNumber;
              
            json.accountNumber  = vm.accountNumber;
            
            

            passiveContractService.getContractPassive(json)
                .then(
                function (response) {
                    if (response.success) {
                        vm.urlAccountPassive = response.data.documentURL;
                        vm.passiveValid = true; /*Habilitamos el boton que valida que todo codigo de tarjeta de clave ha sido validado correctamente */
                    } else {
                        modalFactory.error(response.error.message);
                    }

                }
                );
        }


         /**
         *  @ngdoc method
         *  @name assignDebit
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que asigna tarjeta el numero y el tipo de tarjeta de debito al cliente
         */        
        function assignDebit() {
            var json = {};  
            if (vm.goClient) {
                json.documentNumber = $rootScope.customerDataCredit.numberIdentification;
                json.documentType = $rootScope.dataUser.typeDocument.toString();
            }
            if (vm.goAccount) {
                json.documentNumber = vm.viewModelCreationAccount.numberIdentification;
                json.documentType = vm.viewModelCreationAccount.typeIdentification.toString();
            }
            json.accountnumber = vm.accountNumber;
            json.office = vm.idSucursal;
            json.userName = $rootScope.dataUser.userName;

              assignDebitCardService.debitCardAssign(json)
                .then(
                function (response) {
                    if (response.success) {
                        vm.viewModelCreationAccount.cardDebitNumber = response.data.assignedCardNumber;
                        vm.viewModelCreationAccount.cardDebitType = response.data.cardType;
                    } else {
                        modalFactory.error(response.error.message);
                    }

                }
                );
        }


         /**
         *  @ngdoc method
         *  @name updateDataSiebel
         *  @methodOf App.controller:creationAccountController
         *
         *  @description
         *  Función que actualiza los datos del cliente en siebel, en este caso solo se actualiza el correo electronico.
         */   
        function updateDataSiebel() {
            var json = {};
            if (vm.goClient) {
                json.documentNumber = $rootScope.customerDataCredit.numberIdentification;
                json.documentType = $rootScope.dataUser.typeDocument.toString();
                json.email = $rootScope.dataFormCustomerBasicData.email;
            }
            if (vm.goAccount) {
                json.documentNumber = vm.viewModelCreationAccount.numberIdentification;
                json.documentType = vm.viewModelCreationAccount.typeIdentification.toString();
                json.email = vm.viewModelCreationAccount.basicData.email;
            }
            json.userName = $rootScope.dataUser.userName;


            /*Llamamos al servicio que actualiza el correo */
            updateSiebelDataService.putSiebelData(json);
        }




        /**
         * Función para abrir el modal de campos obligatorios
         */
        function modalFieldsRequired() {
            modalFactory.warning(messages.modals.error.completeRequiredFields);
        }


    }
})();
