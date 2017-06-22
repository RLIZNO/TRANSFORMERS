(function () {

    'use strict';

    angular
        .module('app')
        .service('sendEmaildService', sendEmaildService);

    sendEmaildService.$inject = [
        '$http',
        '$q',
        'PREFIX_URL',
        'URL'
    ];

    function sendEmaildService(
        $http,
        $q,
        PREFIX_URL,
        URL
    ) {

        var service = {
            sendDocsEmail: sendDocsEmail
        };

        return service;

        
        function sendDocsEmail(documentNumber,email,clientName,card,limitRd,limitUs) {

            var deferred = $q.defer( );

            $http.get(PREFIX_URL.SERVICES + URL.SEND_DOCS_EMAIL + '?documentNumber=' + documentNumber + '&email=' + email + '&clientName=' + clientName + '&card=' + card + '&limitRd=' + limitRd + '&limitUs=' + limitUs )
                .then(
                    function (response) {
                            deferred.resolve(response.data);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }
    }

})();
