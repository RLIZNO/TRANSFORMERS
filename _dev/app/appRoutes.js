(function () {
    'use strict';

    angular
        .module('app')
        .config(routes);

    routes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    function routes($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('validationAccount', {
                url: "/",
                templateUrl: "app/feature/validationAccount/validationAccountView.html",
                controller: "validationAccountController as validationAccount"
            })
            .state('moldedFormalization', {
                url: "/form",
                templateUrl: "app/feature/moldedFormalization/formalizationView.html",
                controller: "formalizationController as moldedFormalization"
            })
            .state('productManteniment', {
                url: "/prod",
                templateUrl: "app/feature/productManteniment/mantenimentView.html",
                controller: "mantenimentController as productManteniment"
            })
            .state('transitionManteniment', {
                url: "/trans",
                templateUrl: "app/feature/transitionManteniment/transitionView.html",
                controller: "transitionController as transitionManteniment"
            })
             .state('transactionCode',{
                url: "/transCode",
                templateUrl: "app/feature/transactionCodeParameterization/transactionView.html",
                controller: "transactionController as transactionCode"
            })
            .state('transactionAffiliate',{
                url: "/transAff",
                templateUrl: "app/feature/transactionAffiliate/transactionAffiliateView.html",
                controller: "transactionAffiliateController as transactionAffiliate"
            })
            .state('transactionComerce',{
                url: "/transCom",
                templateUrl: "app/feature/transactionComerce/transactionComerceView.html",
                controller: "transactionComerceController as transactionComerce"
            })
            .state('transactionRole',{
                url: "/transRole",
                templateUrl: "app/feature/transactionRole/transactionRoleView.html",
                controller: "transactionRoleController as transactionRole"
            })
            .state('formalizationResult',{
                url: "/result",
                templateUrl: "app/feature/formalizationResult/formalizationResultView.html",
                controller: "formalizationResultController as formalizationResult"
            })
            .state('consultAff',{
                url: "/aff",
                templateUrl: "app/feature/consultAff/parameConsultAffView.html",
                controller: "parameConsultAffController as consultAff"
            })
            .state('consultClient',{
                url: "/client",
                templateUrl: "app/feature/consultClient/parameConsultClientView.html",
                controller: "parameConsultClientController as consultClient"
            });



        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';




    }
})();