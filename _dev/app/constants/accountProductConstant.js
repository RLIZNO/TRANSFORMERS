/*Constantes para el bloqueo de tarjeta de débito y para el el Numero de tarjeta debito asignada '  tipo de tarjeta debito'
*/
(function () {
    'use strict';

    angular
        .module('app')
        .constant('ACCOUNT_PRODUCT', {
            ACCOUNTS: [26757, 26736, 26754, 26756, 26738, 26740, 26751, 26867, 26869],
            ID_CATALOG_PRODUCT: 29,
            ID_CATALOG_ACCOUNT: 31,
            PRODUCT_MONEY_PESOS : [26748, 26751, 26755, 26758, 26761, 26846, 26867, 26740, 26734, 26868, 26869], /** Constante que contiene las cuenta de ahorros con moneda Pesos */
            PRODUCT_MONEY_USD : [26754, 26756, 26736, 26738], /** Constante que contiene las cuenta de ahorros con moneda Dolares y euros*/
            PRODUCT_MONEY_EURO : [26757], /** COntante que contiene las cuentas de ahorros con moneda euro */
            ID_CANT0 : 26849, /** Id que contiene el valor 0 de la lista de cantidad mensual esperada */
            ID_CASHDEPOSIT_PESOS : 26876, /** Id qie cpmtoeme el valor 0 de la lista de deposito en efectivo en catalogo pesos  */
            ID_CASDEPOSIT_USD : 26884, /** Id qie cpmtoeme el valor 0 de la lista de deposito en efectivo en catalogo dolar */
            ID_CASHDEPOSIT_EUR : 26893, /** Id qie cpmtoeme el valor 0 de la lista de deposito en efectivo en catalogo euros */
            ID_WITHDRAWAL_PESOS : 26902, /** Id qie cpmtoeme el valor 0 de la lista de retiros en efectivo en catalogo pesos */
            ID_WITHDRAWAL_USD : 26911, /** Id qie cpmtoeme el valor 0 de la lista de retiros en efectivo en catalogo dolares */
            ID_WITHDRAWAL_EUR : 26920, /** Id qie cpmtoeme el valor 0 de la lista de retiros en efectivo en catalogo euros */
            ID_TRANSFERS_SENT_PESOS: 26929, /** Id qie cpmtoeme el valor 0 de la lista Transferencias Internacionales Enviadas en catalogo pesos */
            ID_TRANSFERS_SENT_USD: 26938, /** Id qie cpmtoeme el valor 0 de la lista Transferencias Internacionales Enviadas en catalogo dolares */
            ID_TRANSFERS_SENT_EUR: 26947, /** Id qie cpmtoeme el valor 0 de la lista Transferencias Internacionales Enviadas en catalogo euros */
            ID_TRANSFER_RECEIVED_PESOS: 26956,
            ID_TRANSFER_RECEIVED_USD: 26965,
            ID_TRANSFER_RECEIVED_EUR: 26974,
            ID_CHECK_PESOS: 26983,
            ID_CHECK_USD: 26992,
            ID_CHECK_EUR: 27001,
            ACCOUNT_NOMINAL_BUSINESS : 26761,
            CURRENCY_PRODUCT : {
                RD : 'RDP',
                USD : 'USD',
                EUR : 'EUR'
            },
            CURRENCY_SIEBEL : {
                RD : 'RD$',
                USD : 'US$',
                EUR : 'EU$'
            }

        });
})();