(function () {

    'use strict';

    angular
        .module('app')
        .service('filesGRService', filesGRService);

    filesGRService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function filesGRService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            getFilesGR: getFilesGR
        };

        return service;

        /*SELECT CIERRE FORZOSO*/

        function getFilesGR(initDate,finalDate){

            var deferred = $q.defer(); 
            
            $http.get(PREFIX_URL.SERVICES + URL.GET_FILES_GR + '?inicialDate=' + initDate + '&finalDate='+ finalDate + '&fileType=P' )
              .then(
                  function (response){
                      deferred.resolve(response.data);
                  },
                  function (errResponse){
                      deferred.reject(errResponse);
                  }
              );
            return deferred.promise;
            /*return $http.get(PREFIX_URL.SERVICES + URL.GET_FILES_GR + '?inicialDate=' + initDate + '&finalDate='+ finalDate + '&fileType=P' )
              .then(
                  function (response){
                      response.data;
                  },
                  function (errResponse){
                      return $q.reject(errResponse);
                  }
              );*/
        }
    }

})();
