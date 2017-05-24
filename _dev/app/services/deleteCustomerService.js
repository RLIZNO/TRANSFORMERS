(function () {

    'use strict';

    angular
        .module('app')
        .service('deleteCustomerService', deleteCustomerService);

    deleteCustomerService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function deleteCustomerService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            deleteCustomer: deleteCustomer
        };

        return service;

        /**
         *	@ngdoc method
         *	@description
         *	Elimina el cliente cuando el proceso es cancelado
         * 
         *	@param {string} documentNumber número de indentificacion del cliente. 
         * 
         *
         *	@return {Object} La respuesta del servicio.
         */
        function deleteCustomer(documentNumber) {
            $http.delete(PREFIX_URL.SERVICES + URL.DELETE_CUSTOMER + '?documentNumber=' + documentNumber)
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
