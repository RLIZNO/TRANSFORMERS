(function () {
    
    'use strict';

    angular
        .module('formalizationModule')
        .service('uploadFileService', uploadFileService);

    uploadFileService.$inject = [
        '$http', 
        '$q',
        'PREFIX_URL',
        'URL'
        ];

    function uploadFileService(
        $http, 
        $q,
        PREFIX_URL,
        URL
        ) {
        
        var service = {
            createIndexFile : createIndexFile,
            uploadFile : uploadFile,
            finalizeIndexFile : finalizeIndexFile
        };

        return service;


         /**
         *  @ngdoc method
         *  @name createIndexFile
         *  @description
         *  Metodo para crear el archivo de indice
         */
        function createIndexFile(json) {
           return $http.post(PREFIX_URL.SERVICES + URL.CREATE_INDEX_FILE, json)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse);
                    }
                );
        }


        /**
         *  @ngdoc method
         *  @name uploadFile
         *  @description
         *  Metodo para subir un archivo al servidor.
         */
        function uploadFile(name, file, idFileTypeTotal, fileDetailsData, indexFile) {
            var formData = new FormData();

            formData.append("name", name);
		    formData.append("file", file);
		    formData.append("fileDetailsData", fileDetailsData);
            formData.append("idFileType", idFileTypeTotal);
		    formData.append("indexFile", indexFile);	

            return $http.post(PREFIX_URL.SERVICES + URL.UPLOAD_FILE, formData, {
                headers : {
                    'Content-type' : undefined
                },
                transformRequest : angular.identity
            })
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    return $q.reject(errResponse);
                }
                );
        }



         /**
         *  @ngdoc method
         *  @name finalizeIndexFile
         *  @description
         *  Metodo para servicio de finalizar indice que renombra el archivo de indice con extensión DAT para ser procesado por Onbase.
         */
        function finalizeIndexFile(json) {
           return $http.put(PREFIX_URL.SERVICES + URL.FINALIZE_INDEX_FILE, json)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse);
                    }
                );
        }

    }

})();


