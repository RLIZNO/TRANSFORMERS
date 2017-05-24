/*Constantes para los paises incluidos en FATCA
  se guarda el id con el que son cargados los select de paises y nacionalidades para luego compararlo
*/
(function () {
    'use strict';

    angular
        .module('app')
        .constant('FATCA', {
            COUNTRIES: [30, 174, 6, 33, 245, 173, 113],
            NATIONALITIES: [20150, 20277, 20263, 20201, 20195, 20276, 20166]
        });
})();