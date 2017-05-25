/*
 *Constantes paracolocar como prefijo antes de la URL de los servicios a consumir desde desarrollo y desde el portal.
 */
(function () {
    
    'use strict';

    angular
        .module('app')
        .constant('PREFIX_URL', {
            SERVICES: ''
            //SERVICES : '/wps/services/'
        });
})();
