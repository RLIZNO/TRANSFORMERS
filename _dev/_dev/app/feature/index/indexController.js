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

        /*Capturamos la cookie que tiene el nombre del usuario*/
        vm.userName = localStorage.getItem("userName");
        vm.meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        vm.fecha = new Date();
        vm.init = $interval(function () {
            var date = new Date();
            vm.dates = [{
                "date1": date
            }];
        }, 100);

        vm.theTime = new Date().toLocaleTimeString();
        $interval(function () {
            vm.theTime = new Date().toLocaleTimeString();
        }, 1000);
        vm.name = ''; /*Variable que almacena el nombre del usuario a mostrar */
        $rootScope.dataUser = {
            'userValid' : false,
            'userName' :  vm.userName
        };/*Variable global que almacena los datos del usuario */

        
        
        


        /*Funciones*/



         /**
         *  @ngdoc function
         *  @name $timeout
         *  @methodOf App.controller:indexController
         *
         *  @description
         *  Valida si el usuario tiene permisos para crear cliente y cuenta.
         */

       /* $timeout(function () {
            
            validationUserService.getValidationUser(vm.userName)
                .then(
                function (response) {
                    $rootScope.dataUser.userValid = response.success;
                    $rootScope.dataUser.userNameDescription = response.data.userName;
                    $rootScope.dataUser.sucursalId = response.data.sucursalCode;
                    $rootScope.dataUser.inventaryTDC = angular.isObject(response.data.inventary.Information[0].inventaryData[0]);
                    if(!response.success){
                        modalFactory.error(response.error.message);
                    }
                    vm.name=response.data.userName;
                    
                }
                );
        }, 0); */

            var validclientTc = localStorage.getItem("validclientTc");
            if (validclientTc === 'validclientTc'){
                $state.go('moldedFormalization');
            } else {
                $state.go('validationAccount');
            }

   

    }
})();