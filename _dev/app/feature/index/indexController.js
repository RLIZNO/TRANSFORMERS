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
        '$cookies'
    ];

    function indexController(
        $location,
        $interval,
        validationUserService,
        $timeout,
        modalFactory,
        $rootScope,
        $cookies
    ) {
        $rootScope.globalUserJSonPrinter = "";
        var vm = this;
        var userNamelocal = '';

        /*Variables*/
        /*Si el usuario entra por primera vez entonces creamos la cookie */
        if(angular.isUndefined($cookies.get('userName'))){
            /*Guardamos el nombre de usuario del en una cookie para mantener la session */
            $cookies.put('userName', $location.search().USRLOGIN);
            userNamelocal = $cookies.get('userName');
            localStorage.setItem("userName", userNamelocal)
        }

        /*Capturamos la cookie que tiene el nombre del usuario*/
        vm.userName = $cookies.get('userName');
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
        //$rootScope.dataUser.userValid = true;
        $timeout(function () {
            
            validationUserService.getValidationUser(vm.userName)
                .then(
                function (response) {
                    $rootScope.globalUserJSonPrinter = response.data.printer ;
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
        }, 0);

   

    }
})();