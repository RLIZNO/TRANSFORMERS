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
            getCatalogConsignmentMonthyCuantityPesos: getCatalogConsignmentMonthyCuantityPesos,
            getCatalogConsignmentMonthyCuantityUSD: getCatalogConsignmentMonthyCuantityUSD,
            getCatalogConsignmentMonthyCuantityEUR: getCatalogConsignmentMonthyCuantityEUR,
            getCatalogRetirementMonthyCuantityPesos: getCatalogRetirementMonthyCuantityPesos,
            getCatalogRetirementMonthyCuantityUSD: getCatalogRetirementMonthyCuantityUSD,
            getCatalogRetirementMonthyCuantityEUR: getCatalogRetirementMonthyCuantityEUR,
            getCatalogTransSendedMonthyCuantityPesos: getCatalogTransSendedMonthyCuantityPesos,
            getCatalogTransSendedMonthyCuantityUSD: getCatalogTransSendedMonthyCuantityUSD,
            getCatalogTransSendedMonthyCuantityEUR: getCatalogTransSendedMonthyCuantityEUR,
            getCatalogTransRecievedMonthyCuantityPesos: getCatalogTransRecievedMonthyCuantityPesos,
            getCatalogTransRecievedMonthyCuantityUSD: getCatalogTransRecievedMonthyCuantityUSD,
            getCatalogTransRecievedMonthyCuantityEUR: getCatalogTransRecievedMonthyCuantityEUR,
            getCatalogCheckDepositMonthyCuantityPesos: getCatalogCheckDepositMonthyCuantityPesos,
            getCatalogCheckDepositMonthyCuantityUSD: getCatalogCheckDepositMonthyCuantityUSD,
            getCatalogCheckDepositMonthyCuantityEUR: getCatalogCheckDepositMonthyCuantityEUR
    };

    return service;

        /**
         * Servicio para obtener el monto deposito en pesos
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogConsignmentMonthyCuantityPesos(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto deposito en dolares
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogConsignmentMonthyCuantityUSD(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto deposito en euros
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogConsignmentMonthyCuantityEUR(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto retiro en pesos
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogRetirementMonthyCuantityPesos(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto retiro en dolares
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogRetirementMonthyCuantityUSD(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto retiro en euros
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogRetirementMonthyCuantityEUR(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto transferencia internacional enviada en pesos
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogTransSendedMonthyCuantityPesos(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto transferencia internacional enviada en dolares
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogTransSendedMonthyCuantityUSD(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto transferencia internacional enviada en euros
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogTransSendedMonthyCuantityEUR(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto transferencia internacional recibida en pesos
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogTransRecievedMonthyCuantityPesos(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto transferencia internacional recibida en dolares
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogTransRecievedMonthyCuantityUSD(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto transferencia internacional recibida en euros
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogTransRecievedMonthyCuantityEUR(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto deposito en cheques en pesos
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogCheckDepositMonthyCuantityPesos(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto deposito en cheques en dolares
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogCheckDepositMonthyCuantityUSD(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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
         * Servicio para obtener el monto deposito en cheques en euros
         * 
         * @param {any} id
         * @returns
         */
        function getCatalogCheckDepositMonthyCuantityEUR(id) {
            return $http.get(PREFIX_URL.SERVICES + URL.CATALOGS + '?id=' + id, {
                    cache: true
                })
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