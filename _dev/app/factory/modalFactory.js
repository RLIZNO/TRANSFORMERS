(function () {
    'use strict';

    angular
        .module('app')
        .factory('modalFactory', modalFactory);

    modalFactory.$inject = [
        'sweet',
        '$state',
        '$timeout',
        '$rootScope',
        'messages'
        ];

    function modalFactory(
        sweet,
        $state,
        $timeout,
        $rootScope,
        messages
        ) {
        var factory = {
            error : error,
            cancel : cancel,
            cancelform: cancelform,
            warning : warning,
            success : success
        };

        return factory;


        /**
         * Función global que abre el modal de error
         * recibe como parametro el mensaje del error
         * @param {any} message
         */
        function error(message) {
            sweet.show({
                title: messages.modals.warning.modeltitleError,
                text: message,
                type: messages.modals.warning.modalTypeError,
                confirmButtonColor: messages.modals.warning.modalColorButton
            });
        }

        /**
         * Función global que abre el modal de error
         * recibe como parametro el mensaje del error
         * @param {any} message
         */
        function alert(message) {
            sweet.show({
                title: "",
                text: message,
                type: messages.modals.warning.modalTypeError,
                confirmButtonColor: messages.modals.warning.modalColorButton
            });
        }


        /**
         * Función global que abre el modal de warning
         * recibe como parametro el mensaje del warning
         * @param {any} message
         */
        function warning(message,msj) {
            if(msj != undefined){
                sweet.show({
                title: messages.modals.warning.modaltitleWarning,
                text: message+msj,
                type: messages.modals.warning.modalTypeWarning,
                confirmButtonColor: messages.modals.warning.modalColorButton
                });
            } else {
                sweet.show({
                title: messages.modals.warning.modaltitleWarning,
                text: message,
                type: messages.modals.warning.modalTypeWarning,
                confirmButtonColor: messages.modals.warning.modalColorButton
                });
            }       
        }

        /**
         * Función global que abre el modal de cancelar el proceso
         */
        function cancelform() {
            sweet.show({
                title: messages.modals.warning.modaltitleWarning,
                text: messages.modals.warning.modalCancelprocess,
                type: messages.modals.warning.modalTypeWarning,
                showCancelButton: true,
                cancelButtonText: messages.modals.warning.modalCancelButton,
                confirmButtonColor: messages.modals.warning.modalColorButton,
                confirmButtonText: messages.modals.warning.modalConfirText,
                closeOnConfirm: true
            }, function () {
                $timeout(function () {
                    if(angular.isDefined($rootScope.customerDataCredit) && angular.isDefined($rootScope.customerDataCredit.numberIdentification)){
                        deleteCustomerService.deleteCustomer($rootScope.customerDataCredit.numberIdentification);
                    }
                    var proyect = 'CreationAccoun';
                    localStorage.setItem("Proyecto", proyect);
                    
                    var validclientTc = 'validclientTclean';
                    localStorage.setItem("validclientTc", validclientTc);
                    window.location.href = "/wps/portal/ptd/inicio";
                    //window.location.href = "/#/";
                }, 0);
            });

        }

        /**
         * Función global que abre el modal de cancelar el proceso
         */
        function cancel() {
            sweet.show({
                title: messages.modals.warning.modaltitleWarning,
                text: messages.modals.warning.modalCancelprocess,
                type: messages.modals.warning.modalTypeWarning,
                showCancelButton: true,
                cancelButtonText: messages.modals.warning.modalCancelButton,
                confirmButtonColor: messages.modals.warning.modalColorButton,
                confirmButtonText: messages.modals.warning.modalConfirText,
                closeOnConfirm: true
            }, function () {
                $timeout(function () {
                    var validclientTc = 'validclientTclean';
                    localStorage.setItem("validclientTc", validclientTc);
                    if (validclientTc === 'validclientTclean'){
                        $state.go('validationAccount');
                    }
                }, 0);
            });

        }

         /**
         * Función global que abre el modal de success
         * recibe como parametro el mensaje del success
         * @param {any} message
         */
        function success(message){
            sweet.show('Exito', message, 'success');
        }

    }
})();