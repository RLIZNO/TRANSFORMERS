(function () {
    'use strict';

    angular.module('app', [
        //module core
        'ui.router', //Directiva para redireccionar las views con sus respectivos controladores
        'ngAnimate', //Directiva que proporciona soporte para animaciones basadas en CSS
        'ngSanitize',
        'blockUI', /*Directiva para colocar un loading al consumir servicios REST */
        //module feature
        'mantenimentModule',
        'formalizationModule',
        'validationAccountModule',
        'indexModule',
        'transactionModule',
        'transitionModule',
        'transactionAffiliateModule',
        'transactionComerceModule',
        'transactionRoleModule',
        'formalizationResultModule',
        'parameConsultAffModule',
        'parameConsultClientModule',



        //module components
        'uploadOnBaseModule'

    ]).run([
        'messages',
        '$rootScope',
        'SELECT_DEFAULT',
        bootstrap
    ]);

    function bootstrap(messages, $rootScope, SELECT_DEFAULT) {
        $rootScope.i18n = messages;
        $rootScope.default = SELECT_DEFAULT;
    }

    /*Inicializamos el ng-app='app' desde el module principal de angular para que sea el Javascript el que lo inicialice y no el html */
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });

})();