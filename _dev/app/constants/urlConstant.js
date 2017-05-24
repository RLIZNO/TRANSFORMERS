/*
 *Constantes para las URL de los servicios a consumir
 */
(function () {
    
    'use strict';

    angular
        .module('app')
        .constant('URL', {
            CONTROL_LIST: '/BHDL_TDPD_Back_Customers/rest/validationControlList/validateControlList',
            VALIDATE_BUREAU : '/BHDL_TDPD_Back_Customers/rest/validationCreditBureau/validateCreditBureau',
            VALIDATE_CLIENT : '/BHDL_TDPD_Back_Customers/rest/validationClient/validateClient',
            PRELOADED_CATALOGS : '/BHDL_TDPD_Back_Utils/rest/catalogs/retrievePreloadedCatalogs',
            CATALOGS : '/BHDL_TDPD_Back_Utils/rest/catalogs/retrieveCatalogs',
            CATALOGS_COMPLEX : '/BHDL_TDPD_Back_Utils/rest/catalogs/retrieveComplexCatalogs',
            XML_BUREAU : '/BHDL_TDPD_Back_Customers/rest/validationCreditBureau/retrieveXMLCreditBureau',
            EXISTING_CLIENT : '/BHDL_TDPD_Back_Customers/rest/siebelClient/getSiebelClient',
            DELETE_XML_BUREAU : '/BHDL_TDPD_Back_Customers/rest/validationCreditBureau/deleteXMLCreditBureau',
            RETRIEVE_CIIU_LEVELS : '/BHDL_TDPD_Back_Utils/rest/catalogs/retrieveCiiuLevelsByOccupation',
            SAVE_IDENTIFICATION_DATA : '/BHDL_TDPD_Back_Customers/rest/clientPerson/identificationData',
            DELETE_CUSTOMER : '/BHDL_TDPD_Back_Customers/rest/clientPerson/deleteClientData',
            UPDATE_BASIC_DATA : '/BHDL_TDPD_Back_Customers/rest/clientPerson/basicData',
            UPDATE_LABOR_DATA : '/BHDL_TDPD_Back_Customers/rest/clientPerson/laborData',
            CATALOG_BY_CATALOG : '/BHDL_TDPD_Back_Utils/rest/catalogs/retrieveComplexCatalogsByCatalogs',
            UPDATE_FOREING_PEP_DATA : '/BHDL_TDPD_Back_Customers/rest/clientPerson/foreignCurrencyPEPData',
            VALIDATE_USER : '/BHDL_TDPD_Back_Customers/rest/userDataInformation/getUserDataInformation',
            SIEBEL_CLIENTE_SIB: '/BHDL_TDPD_Back_Utils/rest/catalogs/retrieveSiebelClientType',
			GENERATE_PERSON_CODE : '/BHDL_TDPD_Back_Customers/rest/clientPersonCreation/createClientPersonCore',
            KEY_CARD_ASSIGNMENT : '/BHDL_TDPD_Back_Customers/rest/keyCard/keyCardAssignment',
            POSITION_KEY_CARD : '/BHDL_TDPD_Back_Utils/rest/keyCard/retrieveKeyCard',
            VALIDATE_KEY_CARD : '/BHDL_TDPD_Back_Utils/rest/keyCard/validateKeyCard',
            ACHLBTR : '/BHDL_TDPD_Back_Customers/rest/transactionsACHLBTR/processFlag',
            DOCUMENT_CLIENT : '/BHDL_TDPD_Back_Customers/rest/prodoctivityDocuments/documentKnowYourClient',
            SEND_EMAIL : '/BHDL_TDPD_Back_Utils/rest/email/sendEmailNewClient',
            CREATE_INDEX_FILE : '/BHDL_TDPD_Back_Customers/rest/onbase/createIndexFile',
            UPLOAD_FILE : '/BHDL_TDPD_Back_Customers/rest/onbase/uploadFile',
            FINALIZE_INDEX_FILE : '/BHDL_TDPD_Back_Customers/rest/onbase/finalizeIndexFile',
            ACCOUNT_CREATION : '/BHDL_TDPD_Back_Customers/rest/customerAccount/create',
            COMPLETE_CLIENTE_DATA : '/BHDL_TDPD_Back_Customers/rest/clientPerson/completeClientData',
            PASSIVE_CONTRACT : '/BHDL_TDPD_Back_Customers/rest/prodoctivityDocuments/documentPassiveAccountContract',
            ACCOUNT_TARIFF : '/BHDL_TDPD_Back_Customers/rest/prodoctivityDocuments/documentAccountTariff',
            ASSIGN_DEBIT_CARD : '/BHDL_TDPD_Back_Customers/rest/customerAccount/assignDebitCard',
            SEND_EMAIL_ACCOUNT : '/BHDL_TDPD_Back_Utils/rest/email/sendEmailNewAccount',
            UPDATE_SIEBEL_DATA: '/BHDL_TDPD_Back_Customers/rest/siebelClient/updateSiebelData',
            DATE_QUILIFERS: '/BHDL_TDPD_Back_Customers/rest/customerAccount/getAccountInformation',
            ASSIGNMENT_CLAVES: '/BHDL_TDPD_Back_Customers/rest/keyCard/roster/assign',
            ASSIGNMENT_DEBIT: '/BHDL_TDPD_Back_Customers/rest/customerAccount/assignDebitCard',
            ASSIGNMENT_FORMALIZATION: '/BHDL_TDPD_Back_Customers/rest/customerAccount/formaliceCustomer',
            SAVE_DATA_BASIC_SIEBEL: '/BHDL_TDPD_Back_Customers/rest/clientPerson/updateBasicData',
            VALID_CLIENT_PORTAL : '/BHDL_TDPD_Back_Customers/rest/validationClient/validateClientPortal',
            UPDATE_LABOR_DATA_SIEBEL: '/BHDL_TDPD_Back_Customers/rest/clientPerson/updateLaborData',
            ADD_CIERRE_FORZOSO:  '/BHDL_TDPD_Back_Credit_Card/rest/customerSteps/add',
            GET_CIERRE_FORZOSO: '/BHDL_TDPD_Back_Credit_Card/rest/customerSteps/getByDocumentNumber',
            UPDATE_CIERRE_FORZOSO: '/BHDL_TDPD_Back_Credit_Card/rest/customerSteps/update',          
        });
})();
