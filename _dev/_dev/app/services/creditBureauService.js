
(function () {
    
    'use strict';

    angular
        .module('app')
        .service('creditBureauService', creditBureauService);

    creditBureauService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function creditBureauService(
        $http, 
        $q,
        PREFIX_URL,
        URL
        ) {
        
        var self = {
            getValidCreditBureau : getValidCreditBureau,
            getXmlCreditBureau : getXmlCreditBureau,
            getValidCientExisting : getValidCientExisting,
            deleteXmlCreditBureau : deleteXmlCreditBureau
        };

        /**
         * Servicio para obtener la validación del buró de credito y toda la información del clientes desde data credito
         * 
         * @param {any} idValue
         * @returns
         */
        function getValidCreditBureau(idValue, userName) {

            var deferred = $q.defer();

            $http.get(PREFIX_URL.SERVICES + URL.VALIDATE_BUREAU + '?documentNumber=' + idValue + '&userName=' + userName)
                .then(
                    function (response) {
                        if(response.data.success){
                            deferred.resolve(response.data.data);
                        } else {
                            deferred.reject(response.data.error);
                        }
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }

        /**
         * Servicio para obtener el xml del buró de credito
         * 
         * @param {any} idValue
         * @returns
         */
        function getXmlCreditBureau(idValue, userName) {

            var deferred = $q.defer();

            $http.get(PREFIX_URL.SERVICES + URL.XML_BUREAU + '?documentNumber=' + idValue + '&userName=' + userName)
                .then(
                    function (response) {
                            deferred.resolve(response.data);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }

        /**
         * Servicio para obtener la validación del buró de credito y toda la información del clientes desde data credito
         * 
         * @param {any} idValue
         * @returns
         */
        function getValidCientExisting(documentType, idValue, userName) {

            var deferred = $q.defer();

            $http.get(PREFIX_URL.SERVICES + URL.EXISTING_CLIENT +'?documentType=' + documentType + '&documentNumber=' + idValue + '&userName=' + userName)
                .then(
                    function (response) {
                        if(response.data.success){
                            deferred.resolve(response.data.data);
                        } else {
                            deferred.reject(response.data.error);
                        }
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }



        /**
         * Servicio para eliminar el xml del buró de credito
         * 
         * @param {any} idValue
         * @returns
         */
        function deleteXmlCreditBureau(idValue, userName) {

            var deferred = $q.defer();

            $http.delete(PREFIX_URL.SERVICES + URL.DELETE_XML_BUREAU + '?documentNumber=' + idValue + '&userName=' + userName)
                .then(
                    function (response) {
                            deferred.resolve(response.data);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }

        return self;
        
    }

})();
