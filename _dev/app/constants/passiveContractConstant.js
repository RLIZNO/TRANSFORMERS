/*Constantes que establece las reglas de necesarias para el servicio de passoveContractService.js
*/
(function () {
    'use strict';

    angular
        .module('app')
        .constant('PASSIVE', {
            CREDIT_CARD: {
                USE : 'USO DE TARJETA DE DEBITO',
                NO_USE : 'USO DE LIBRETA DE AHORROS'
            },
            PRODUCT: {
                PERSONAL : 'PERSONAL',
                NOMINA : 'NOMINA'
            },
            ACH_LBTR : 'Transacciones ACH + Pagos al Instante'
        });
})();