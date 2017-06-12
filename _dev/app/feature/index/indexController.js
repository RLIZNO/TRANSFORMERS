(function () {
    'use strict';

    angular
        .module('indexModule')
        .controller('indexController', indexController);

    //Inyeccion de dependencias
    indexController.$inject = [
        '$location',
        '$interval',
        'validationUserService',
        '$timeout',
        'modalFactory',
        '$rootScope',
        '$cookies',
        '$state'
    ];

    function indexController(
        $location,
        $interval,
        validationUserService,
        $timeout,
        modalFactory,
        $rootScope,
        $cookies,
        $state
    ) {

        var vm = this;
        $rootScope.customerDataCredit = {};

        /*Capturamos la cookie que tiene el nombre del usuario*/
        vm.userName = localStorage.getItem("userName");

        vm.name = ''; /*Variable que almacena el nombre del usuario a mostrar */
        $rootScope.dataUser = {
            'userValid' : false,
            'userName' :  vm.userName
        };/*Variable global que almacena los datos del usuario */

        
        
        

         /**
         *  @ngdoc function
         *  @name $timeout
         *  @methodOf App.controller:indexController
         *
         *  @description
         *  Valida si el usuario tiene permisos para crear cliente y cuenta.
         */
        //$rootScope.dataUser.userValid = true;
        $timeout(function () {
            
            validationUserService.getValidationUser(vm.userName)
                .then(
                function (response) {
                    $rootScope.globalUserJSonPrinter = response.data.printer ;
                    $rootScope.dataUser.userValid = response.success;
                    $rootScope.dataUser.userNameDescription = response.data.userName;
                    $rootScope.dataUser.sucursalId = response.data.sucursalCode;
                    $rootScope.dataUser.sucursal = response.data.sucursalName;
                    $rootScope.dataUser.inventaryTDC = angular.isObject(response.data.inventary.Information[0].inventaryData[0]);
                    if(!response.success){
                        modalFactory.error(response.error.message);
                    }
                    vm.name=response.data.userName;
                    
                }
                );
        }, 0);

        var validclientTc = localStorage.getItem("validclientTc");
        if (validclientTc === 'validclientTc'){
            $state.go('moldedFormalization');
        } else {
            $state.go('validationAccount');
        }

   

    }
})();