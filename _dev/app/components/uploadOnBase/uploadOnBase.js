(function () {

    'use strict';

    angular
        .module('uploadOnBaseModule', [])
        .component('uploadOnBase', {
            templateUrl: 'app/components/uploadOnBase/uploadOnBase.html',
            bindings: {
                tableOrientation: '=',
                i18n: '='
            },
            controller: UploadOnBaseController
        });

    UploadOnBaseController.$inject = [
        'messages',
        '$timeout',
        'sweet',
        'modalFactory',
        'catalogService',
        'CATALOG',
        'uploadFileService',
        '$rootScope',
        '$filter',
        '$controller'
    ];

    function UploadOnBaseController(
        messages,
        $timeout,
        sweet,
        modalFactory,
        catalogService,
        CATALOG,
        uploadFileService,
        $rootScope,
        $filter,
        $controller
    ) {

        var vm = this;

        /**
         *  @ngdoc property
         *  @name documentTypes
         *  @propertyOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Opciones de los tipos de documentos que puede seleccionar el usuario para subir.
         */
        vm.documentTypes = [];

        /**
         *  @ngdoc property
         *  @name selectedDocumentType
         *  @propertyOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Tipo de documento a subir seleccionado por el usuario.
         */
        vm.selectedDocumentType = messages.components.uploadOnBase.documenTypeDefault;

        /**
         *  @ngdoc property
         *  @name isDisableButton
         *  @propertyOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Para activar y desactivar el boton de adjuntar.
         */
        vm.isDisableButton = true;
        vm.disableCargaOnbase = false;

        /**
         *  @ngdoc property
         *  @name documents
         *  @propertyOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Documentos añadidos por el usuario.
         */
        vm.documents = [];

        /**
         *  @ngdoc property
         *  @name documentExtensions
         *  @propertyOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Almacena las extensiones permitidas para la carga OnBase
         */
        vm.documentExtensions = messages.components.uploadOnBase.documentExtensions;

        /* Listado de metodos */
        vm.resetData = resetData;
        vm.appendDocument = appendDocument;
        vm.deleteDocument = deleteDocument;
        vm.openDocument = openDocument;
        vm.changeDocumentType = changeDocumentType;
        vm.createIndexFile = createIndexFile;
        vm.uploadFile = uploadFile;
        vm.finalizeIndexFile = finalizeIndexFile;

        /**
         *  @ngdoc method
         *  @name appendDocument
         *  @methodOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Adjuntar un archivo al listado a subir.
         */
        function appendDocument(fileValue) {
            $timeout(function () {
                if (isValidExtension(fileValue.name)) {
                    vm.documents.push({
                        idFileType: vm.documentTypes[vm.selectedDocumentType].id,
                        type: vm.documentTypes[vm.selectedDocumentType].extrafield2,
                        name: fileValue.name,
                        file: fileValue
                    });
                    vm.selectedDocumentType = messages.components.uploadOnBase.documenTypeDefault;
                    vm.isDisableButton = true;
                    vm.disableCargaOnbase = false;
                } else {
                    modalFactory.error(messages.modals.error.errorExtensionDocumentType);
                }
            }, 0);
        }

        /**
         *  @ngdoc method
         *  @name isValidExtension
         *  @methodOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Valida si la extension del archivo a subir es válida
         */
        function isValidExtension(documentValue) {
            var isValidExt = false,
                extensions = documentValue.split('.'),
                ext = extensions[extensions.length - 1].toLowerCase();

            vm.documentExtensions.forEach(function (extValue) {
                if (extValue === ext) {
                    isValidExt = true;
                }
            });

            return isValidExt;
        }

        /**
         *  @ngdoc method
         *  @name deleteDocument
         *  @methodOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Eliminar un item del listado de archivo.
         */
        function deleteDocument(itemValue) {
            sweet.show({
                title: messages.modals.warning.modaltitleWarning,
                text: messages.modals.warning.modalUploadOnbseContent,
                type: messages.modals.warning.modalTypeWarning,
                showCancelButton: true,
                cancelButtonText: messages.modals.warning.modalCancelButton,
                confirmButtonColor: messages.modals.warning.modalColorButton,
                confirmButtonText: messages.modals.warning.modalConfirText,
                closeOnConfirm: true
            }, function () {
                $timeout(function () {
                    vm.documents.splice(itemValue, 1);
                }, 0);
            });
        }

        /**
         *  @ngdoc method
         *  @name openDocument
         *  @methodOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Abrir un documento.
         */
        function openDocument(itemValue) {
            var url = URL.createObjectURL(vm.documents[itemValue].file);
            window.open(url, '_blank');
        }

        /**
         *  @ngdoc method
         *  @name resetData
         *  @methodOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Inicia todos los atributos del componente.
         */
        function resetData() {
            vm.documentExtensions = messages.components.uploadOnBase.documentExtensions;
            vm.selectedDocumentType = messages.components.uploadOnBase.documenTypeDefault;
            vm.documents = [];
        }

        /**
         *  @ngdoc method
         *  @name getDocumentTypes
         *  @methodOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Obtiene los tipos de documentos disponibles para subir por el usuario.
         */
        function getDocumentTypes() {
            catalogService.getCatalog(CATALOG.TYPE_DOCUMENTS_ONBASE).then(
                function (response) {
                    $timeout(function () {
                        vm.documentTypes = response.data;
                    }, 0);
                }
            );
        }

        /**
         *  @ngdoc method
         *  @name changeDocumentType
         *  @methodOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Cuando hay un cambio en el tipo de documento se valida si se activa el boton o no.
         */
        function changeDocumentType() {
            if (vm.selectedDocumentType === messages.components.uploadOnBase.documenTypeDefault) {
                vm.isDisableButton = true;               
            } else {
                vm.isDisableButton = false;
            }
        }

        /**
         *  @ngdoc method
         *  @name createIndexFile
         *  @methodOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Función que crea el archivo indice para subir a OnBase
         */
        function createIndexFile() {
            var json = {};
            if ($rootScope.since.home) {
                json.documentNumber = $rootScope.onbase.numberIdentification;
            } else {
                json.documentNumber = $rootScope.customerDataCredit.numberIdentification;
            }


            uploadFileService.createIndexFile(json)
                .then(
                    function (response) {
                        if (response.success) {
                            var fileIndex = response.data.fileIndex;
                            uploadFile(fileIndex); /*Llamamos al servicio que sube los archivos al servidor */
                        }

                    }
                );
        }

        /**
         *  @ngdoc method
         *  @name uploadFile
         *  @methodOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Función que se encarga de enviar los archivos al servidor
         */
        function uploadFile(fileIndex) {
            var today = new Date();
            var name = '';
            var file = '';
            var details = '';
            var idFileType = '';
            var index = fileIndex;
            var loaded = false;
            var fail = false;
            var contador = 0;
            var idFileTypeTotal = '';
            var documentNumber = '';
            var customerNumber = '';
            if ($rootScope.since.home) {
                documentNumber = $rootScope.onbase.numberIdentification;
                customerNumber = $rootScope.onbase.customerNumber;
            } else {
                documentNumber = $rootScope.customerDataCredit.numberIdentification;
                customerNumber = $rootScope.dataFormCustomerForeignCurrency.customerNumber;
            }

            /*Recorremos todos los archivos preparados para subir a OnBase y enviamos uno por uno al servidor */
            angular.forEach(vm.documents, function (value, key) {
                name = value.name;
                file = value.file;
                idFileType = value.idFileType.toString();
                if (contador < 100) {
                    contador++;
                }
                contador.toString();
                idFileTypeTotal = idFileType+'.'+contador;
                details = "*" + value.type + "*,*" + documentNumber + "*,*" + customerNumber + "*,**,*" + $filter('date')(today, 'MM/dd/yyyy' + "*");
                /*Consumimos el servicio que carga el archivo al servidor */
                uploadFileService.uploadFile(name, file, idFileTypeTotal, details, index).then(
                    function (response) {
                        if (response.success) {
                            loaded = true;
                        } else {
                            fail = true;
                        }
                        if (vm.documents.length === key + 1) {
                            if (loaded && !fail) {
                                vm.disableCargaOnbase = true;
                                modalFactory.success(messages.components.uploadOnBase.successUploadFile);
                                /*Llamamos  la función que agrega la extension .dat al indice */
                                finalizeIndexFile(fileIndex);
                            } else {
                                modalFactory.error(messages.components.uploadOnBase.errorUploadFile);
                            }
                        }
                    }
                );

            });



        }

        /**
         *  @ngdoc method
         *  @name finalizeIndexFile
         *  @methodOf App.controller:UploadOnBaseController
         *
         *  @description
         * Función que se encargar de renombra el archivo de indice con extensión DAT para ser procesado por Onbase.que se encarga de enviar los archivos al servidor
         */
        function finalizeIndexFile(indexFile) {
            var json = {};
            json.fileIndex = indexFile;
            uploadFileService.finalizeIndexFile(json).then(
                function (response) {
                    if (!response.success) {
                        modalFactory.error(response.error.message);
                    }

                }
            );
        }




        /**
         *  @ngdoc method
         *  @name init
         *  @methodOf App.controller:UploadOnBaseController
         *
         *  @description
         *  Inicia todo lo necesario del componente.
         */
        function init() {
            resetData();
            getDocumentTypes();
        }

        init();
        return vm;
    }

})();