  (function () {
      'use strict';

      angular
          .module('app')
          .run(headers);

      angular
          .module('app')
          .config(blockUI);

      headers.$inject = ['$rootScope', '$http'];
      blockUI.$inject = ['blockUIConfig'];


       /**
        *  @ngdoc function
        *  @name headers
        *  @methodOf App.run:appConfig
        *
        *  @description
        *  Función para inicializar los headers que se van a utilizar en los servicios REST 
        */
      function headers($rootScope, $http) {
           $http.defaults.headers.get=[];
           $http.defaults.headers.post=[];
          $rootScope.$on('$locationChangeSuccess', function (event, next, current) {
              $http.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
              $http.defaults.headers.post['Content-Type'] = 'application/json';

          });

      }

        /**
        *  @ngdoc function
        *  @name blockUI
        *  @methodOf App.config:appConfig
        *
        *  @description
        *  Función para cargar el loading cuando los servicios rest, tiene a demorar. 
        */
      function blockUI(blockUIConfig) {
        /*Template donde está ubicado el loading */
         blockUIConfig.templateUrl = 'app/components/loading/loading.html';
    }


  })();

