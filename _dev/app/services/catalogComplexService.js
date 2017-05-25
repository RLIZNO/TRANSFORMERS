(function () {
    'use strict';

    angular
        .module('app')
        .service('catalogComplexService', catalogComplexService);

    catalogComplexService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
        ];

    function catalogComplexService(
        $http,
        $q,
        PREFIX_URL,
        URL
        ) {
        var service = {
            getCatalogComplex: getCatalogComplex,
            getCatalogComplexByCatalog: getCatalogComplexByCatalog,
            getSiebelTYpeSib: getSiebelTYpeSib
        };

        return service;


        /**
         * servicio para obtener los catalogos complejos
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogComplex(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS_COMPLEX +'?id=' + id, { cache: true })
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
         * servicio para obtener los catalogos complejos filtrando dentro desde los catalogos inferiores
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogComplexByCatalog(id, idCatalog) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOG_BY_CATALOG +'?id=' + id + '&idCatalog='+ idCatalog, { cache: true })
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
         * servicio para obtener los catalogos complejos filtrados por varios ID
         * 
         * @param {any} id
         * @returns
         */
        function getSiebelTYpeSib(idEnterpriseType, idAcademicLvl, idOccupation) {
            return $http.get(PREFIX_URL.SERVICES + URL.SIEBEL_CLIENTE_SIB +'?idEnterpriseType=' + idEnterpriseType + '&idAcademicLvl='+ idAcademicLvl + '&idOccupation=' + idOccupation, { cache: true })
                .then(
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


