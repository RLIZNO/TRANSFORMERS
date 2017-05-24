(function () {
    'use strict';

    angular
        .module('app')
        .service('catalogService', catalogService);

    catalogService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function catalogService(
        $http,
        $q,
        PREFIX_URL,
        URL
        ) {
        var service = {
        getCatalog: getCatalog,
        getCatalogURL : getCatalogURL,
        getCatalogBin: getCatalogBin
    };

    return service;

    /**
     * Servicio para obtener los catalogos
     * 
     * @param {any} id
     * @returns
     */
    function getCatalog(id) {
        return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS+'?id='+id, {cache: true})
                .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            return $q.reject(errResponse);
                        }
                );
            }


    /**
     * Servicio para obtener los catalogos
     * 
     * @param {any} id
     * @returns
     */
    function getCatalogBin(url) {
        return $http.get(PREFIX_URL.SERVICES + url, {cache: true})
                .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            return $q.reject(errResponse);
                        }
                );
            }
            function getCatalogURL(url) {
                return $http.get(PREFIX_URL.SERVICES + url, {cache: true}).then(
                    function (response) {
                            return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse);
                    }
                );
            }
    }


})();

