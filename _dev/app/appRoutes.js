(function () {
    'use strict';

    angular
        .module('app')
        .config(routes);

    routes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    function routes($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "app/feature/home/homeView.html",
                controller: "homeController as home"
            })
            .state('validationDocument', {
                templateUrl: "app/feature/validationDocument/validationDocumentView.html",
                controller: "validationDocumentController as validationDocument"
            })
            .state('customerBasicData', {
                templateUrl: "app/feature/customerBasicData/customerBasicDataView.html",
                controller: "customerBasicDataController as customerBasicData"
            })
            .state('customerJobsData', {
                templateUrl: "app/feature/customerJobsData/customerJobsDataView.html",
                controller: "customerJobsDataController as customerJobsData"
            })
            .state('customerForeignCurrency', {
                templateUrl: "app/feature/customerForeignCurrency/customerForeignCurrencyView.html",
                controller: "customerForeignCurrencyController as customerForeignCurrency"
            })
            .state('customerConfirmation', {
                url: "/con",
                templateUrl: "app/feature/customerConfirmation/customerConfirmationView.html",
                controller: "customerConfirmationController as customerConfirmation"
            })
            .state('creationAccount', {                
                templateUrl: "app/feature/creationAccount/creationAccountView.html",
                controller: "creationAccountController as creationAccount"
            })
            .state('assignmentQualifiers', {
                templateUrl: "app/feature/assignmentQualifiers/assignmentQualifiersView.html",
                controller: "qualifiersController as assignmentQualifiers"
            })
            .state('uploadOnbase', {
                templateUrl: "app/feature/uploadOnbase/uploadOnbaseView.html",
                controller: "uploadOnbaseViewController as uploadOnbase"
            });


        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';




    }
})();