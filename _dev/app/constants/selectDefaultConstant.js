/*Constantes para los select que viene con valores por default */
(function () {
    'use strict';

    angular
        .module('app')
        .constant('SELECT_DEFAULT', {
            TYPE_DOCUMENTS: 2,
            TYPE_VINCULATION: 26722, /** Id que contiene el tipo de vinculacion Unipersonal */
            TYPE_PRODUCT: 26724, /**Id que selecciona el tipo de producto Cuentas de ahorro */
            CTA_PREMIA: 26846, /** Id que selecciona el producto cuenta de ahorros personal RD$ */
            VALUE_NA : 362, /** Id que contiene el valor N/A para autocompletar los datos dependiendo el tipo de ocupación */
            INCOME_SALARY : 26875, /** Id que contiene el tipo de INGRESOS SALARIALES para cada tipo de ocupación */
            INCOME_FAMILY : 415, /** Id que contiene el tipo de INGRESOS SALARIALES para cada tipo de ocupación */
            OCUPATION_EMPLOYEE_PUBLIC : 434, /** Id que contiene el tipo de ocupación EMPLEADO PUBLICO */
            OCUPATION_PENSIONER_PUBLIC : 439, /** Id que contiene el tipo de ocupación PENSIONADO PUBLICO, para la validación del tipo SIB */
            OCUPATION_EMPLOYEE_PRIVATE : 433, /** Id que contiene el tipo de ocupación EMPLEADO PRIVADIDO, para la validación del tipo SIB */
            OCUPATION_PENSIONER_PRIVATE : 438, /** Id que contiene el tipo de ocuapcion PENSIONADO RPIVADO, para la validación del tipo SIB */
            OCUPATION_INDEPENDENT : 437, /** Id que contiene el tipo de ocuapcion INDEPENDIENTE, para la validacion del tipo SIB */
            OCUPATION_STUDENT : 436, /** ID que contiene el tipo de ocuapcion ESTUDIANTE, para la validacion del tipo SIB */
            OCUPATION_HOUSEWIFI : 431, /** ID que contiene el tipo de ocuapcion AMA DE CASA, para la validacion del tipo SIB */
            OCUPATION_NOTBUSY : 432, /** ID que contiene el tipo de ocupacion DESOCUPADO, para la validacion del tipo SIB */
            COMPANY_MICRCOMPANY : 403, /** ID que contien el tipo de empresa MICROEMPRESA, para la validacion del SIB */
            COMPANY_NA : 404, /** ID que contiene el tipo de empresa N/A, para la validacion del SIB */
            COMPANY_BUSINESSMAN : 435, /** ID que contien el tipo de ocupacion EMPRESARIO O PROPIETARIO, para validacion del SIB */
            COMPANY_COORPORATIVA : 402, /** Id que contiene el tipo de empresa COORPORATIVA, para validacion SIB */
            COMPANY_PYME : 405, /** ID que contiene el tipo de e,presa PYME, para validar el SIB */
            COUNTRY_RD : 5 /** Id que contiene el pais republica dominica */

        });
})();