/*Constantes para los paises incluidos en FATCA
  se guarda el id con el que son cargados los select de paises y nacionalidades para luego compararlo
*/
(function () {
    'use strict';

    angular
        .module('app')
        .constant('PROFESSION', {
            COMPANYNAME: [431, 432, 436],
            CARGA: [432, 436, 431, 437, 439, 438],
            WAGEINCOME: [438, 439, 434, 433],
            FAMILYINCOME: [436, 431],
            CIIU_OCUPATION_950004: [433, 434],
            CIIU_OCUPATION_930992: [431, 432, 436, 438, 439],
            NUMBER_PHONE : [431, 432]
        });
})();