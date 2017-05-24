
/**
 *	@ngdoc interface
 *	@name App.value:messages
 *
 *	@description
 *	En este provider se almacenaran todos los mensajes de la aplicación.
 */
 (function() {
    
    'use strict';
	
	angular
		.module('app')
	    .value('messages', {
	    	actions : {
	    		append : 'Adjuntar',
	    		cancel : 'Cancelar',
	    		finish : 'Finalizar',
	    		next : 'Siguiente',
	    		select : 'Seleccione',
	    		send : 'Enviar',
				previous : 'Anterior'
	    	},
	    	components : {
	    		uploadOnBase : {
	    			buttonUploadOnBase : 'Cargar a OnBase',
	    			documentExtensions : [
	    				'tif'
	    			],
	    			documenTypeDefault : '-1',
	    			labelActions : 'Acciones',
	    			labelDocumentName : 'Nombre de documento',
	    			labelProductResume : 'Resumen de documentos',
	    			labelTypeDocument : 'Tipo de Documento a Adjuntar',
					successUploadFile : 'Los documentos fueron cargados satisfactoriamente',
					errorUploadFile : 'El sistema no puede ejecutar esta acción en este momento. Intente nuevamente en unos minutos'
	    		}
	    	},
	    	general : {
	    		maxLength : 'Ha superado la longitud máxima',
	    		requiredField : 'Este campo es obligatorio',
	    		dominicanCountry : 'DOMINICANA',
				dominicanCountrySibel : 'REPUBLICA DOMINICANA',
				errorValidNumeros : 'Debe contener solo números',
				errorValid10Digi : 'Debe contener como mínimo 10 dígitos',
				ingresoMAyor : 'El ingreso mensual debe ser mayor a RD$1,500.00',
				errorEmail : 'Debe contener un correo valido'
	    	},
	    	modals : {
	    		error : {
	    			badControlList : 'Este cliente se encuentra en lista interna de control',
	    			badControlListCreationAccount : 'Este cliente se encuentra en lista interna de control requiere diligencia adicional. No puede continuar con el proceso digital',
	    			badJudicialEvaluation : 'Este cliente posee ficha judicial, debe realizar solicitud de investigación a Cumplimiento FO',
	    			badPepList : 'Este cliente es una persona políticamente expuesta (PEP), por lo que requiere diligencia forzada',
	    			badPepListCreationAccount : 'Este cliente es una persona políticamente expuesta (PEP), por lo que requiere diligencia reforzada. No puede continuar con el proceso digital',
	    			completeRequiredFields : 'Debe completar todos los campos obligatorios',
	    			errorExtensionDocumentType : 'La extensión del archivo no coincide con el tipo seleccionado, por favor verifique',
	    			errorConsultJudicialEvaluation : 'En estos momentos no se puede realizar consulta de ficha judicial en data crédito. Inténtelo nuevamente más tarde',
	    			errorDefault : 'Ha ocurrido un error en la consulta. Intenta más tarde',
	    			errorClientNotExist : 'Este cliente no se encuentra creado. No es posible continuar el proceso',
	    			notAllowedAge : 'El cliente no posee la mayoría de edad',
	    			questionPositive : 'Al menos una de las preguntas de manejo con moneda extranjera debe ser contestada de manera afirmativa',
	    			validationClient : 'El contacto ya existe como cliente',
	    			notCountryAllowedAccount : 'Para la creación de cuentas a clientes extranjeros debe llevar a cabo el proceso desde Siebel 8',
					notCountryAllowedClient : 'Para la creación de clientes extranjeros debe llevar a cabo el proceso desde Siebel 8',
					CTApremia : 'Recuerda que esta cuenta solo aplica si  el cliente ya tiene la tarjeta de crédito Premia BHD Leon',
					clientCardNew : 'Este cliente no posee tarjeta de claves, no es posible continuar con el proceso DIGITAL',
					codeIncorrect : 'El código digitado no es correcto. Digite nuevamente el código',
					interbankNoActivated : 'El servicio de Transferencias Interbancarias no pudo ser activado',
					modalFatca : 'Este cliente tiene indicios fuertes de persona FATCA, debe ser vinculado por el proceso regular a través de Siebel',
					errorCustomerSiebel : 'Ha ocurrido un error en proceso de creación del cliente en Siebel. ¿Desea reintentarlo?'					
	    		},
	    		warning : {
					modalCompeteFieldsOrClean : 'Debe completar los campos requeridos antes de visualizar el detalle esta ocupación, o limpiar la información en pantalla',
					modalCancelprocess : '¿Está seguro de que desea cancelar este proceso?',
					modalDeleteOcupation : '¿Está seguro que desea eliminar esta ocupación?',
					modalUploadOnbseContent : '¿Está seguro de que desea eliminar este documento?',
					modaltitleWarning : 'Advertencia',
					modeltitleError : 'Error',
					modalTypeWarning : 'warning',
					modalTypeError : 'error',
					modalCancelButton : 'No',
					modalColorButton : '#24407B',
					modalConfirText : 'Si',
					modalTextPrevious : 'Al regresar a la pantalla anterior perderá la información registrada, ¿está seguro que desea continuar?',
					modalNoKeyCard : 'Este cliente no posee tarjeta de claves, no es posible continuar con el proceso DIGITAL',
					validAsignature : 'Debe concluir con el proceso de formalización y validar la firma solicitada antes de continuar',
					nokeycardAvailable : 'No tiene disponibilidad de tarjeta de claves en su inventario para continuar con este proceso'
	    		},
				success : {
					codeCorrect : 'El código digitado es correcto'
				}
	    	},
	    	steps : {
	    		one : '1',
	    		three : '3',
	    		two : '2'
	    	},
	    	views : {
				validationDocument : {
					title: 'Creación de Cliente',
					titleValidClient : 'Validación documento',
					titleDebugChecklists : 'Depuración en listas de control',
					labelTypeDocument : 'Tipo Documento Identidad',
					labelNumberIdentification : 'Número Documento Identidad',
					labelViewBureau : 'Ver Reporte Buró de Crédito',
					labelEvaluationControl : 'Evaluación Listas de Control',
					labelEvaluationJudicial : 'Evaluación Judicial'
				},
	    		creationAccount : {
	    			buttonContractAccount : 'Contrato Cuenta Ahorros',
	    			buttonTarrif : 'Tarifario de Producto',
	    			buttonValidate : 'Validar',
	    			labelAboutAccount : 'Propósito de la Cuenta',
	    			labelAccountNumber : 'Número de cuenta',
	    			labelBuyGerencialCheck : 'Compra Cheques de Gerencia',
	    			labelCardDebitType : 'Tipo Tarjeta Débito',
	    			labelCashWithdrawals : 'Retiros en Efectivo',
	    			labelCashDeposits : 'Depósitos en Efectivo',
	    			labelControlList : 'Depuración en Listas de Control',
	    			labelDepositGerencialCheck : 'Depósitos en Cheque Extranjeros',
	    			labelDocumentNumber : 'Número Documento Identidad',
	    			labelDocumentType : 'Tipo Documento Identidad',
	    			labelElectronicSignature : 'Firma Electrónica',
	    			labelEmail : 'Correo Electrónico',
	    			labelFirstName : 'Primer Nombre',
	    			labelFirstLastName : 'Primer Apellido',
	    			labelInterTransfersSended : 'Transferencias Internacionales Enviadas',
	    			labelInterTransfersRecived : 'Transferencias Internacionales Recibidas',
	    			labelJudicialEvaluation : 'Evaluación Judicial',
	    			labelKeyCardNumber : 'Número Tarjeta de Claves Vigente',
	    			labelOperationsData : 'Datos de Operaciones',
	    			labelNumberCode : 'Digite la clave solicitada de la tarjeta de claves',
	    			labelNumberDebitCard : 'Número Tarjeta Débito Asignada',
	    			labelProduct : 'Producto',
	    			labelProductType : 'Tipo Producto',
	    			labelQuantityMonth : 'Cantidad Mensual Esperada',
	    			labelSecondName : 'Segundo Nombre',
	    			labelSecondLastName : 'Segundo Apellido',
	    			labelVinculationType : 'Tipo Vinculación',
	    			labelWaitAmountMonth : 'Monto Mensual Esperado',
	    			labelWantDebitCard : '¿Desea Tarjeta Débito?',
	    			title : 'Creación de Cuenta Financiera',
	    			titleClientEvaluation : 'Evaluación del Cliente',
	    			titleDataBasic : 'Datos Básicos',
	    			titleSelectProduct : 'Selección Producto y Habilitantes'
	    		},
	    		customerForeignCurrency : {
	    			completeName : 'Nombre y Apellido del PEP',
	    			positionPEP : 'Cargo del PEP',
	    			exports : 'Exportaciones',
	    			firstQuestion : '¿Es o ha sido Funcionario del Gobierno (Políticamente Expuesto)?',
	    			foreignExchange : 'Compra /Venta Divisas',
	    			imports : 'Importaciones',
	    			investments : 'Inversiones',
	    			others : 'Otras',
	    			payServices : 'Pago de Servicios',
	    			payLoan : 'Pago de Préstamos',
	    			relationshipType : 'Tipo de Parentesco',
	    			remittances : 'Envío / Recepción de Remesas',
	    			secondQuestion : '¿Tiene algún parentesco o relación con <br/> algún funcionario del Gobierno (Políticamente <br/> Expuesto)?',
	    			thirdQuestion : '¿Piensa realizar operaciones en moneda extranjera?',
	    			title : 'Creación de cliente',
	    			titleForeignCurrency : 'Información de operaciones en moneda extranjera',
	    			titlePEP : 'Entrevista PEP',
	    			what : '¿Cuál?'
	    		},
				customerJobsData : {
					theadNameCompany : 'NOMBRE EMPRESA',
					theadIncomeType : 'TIPO INGRESOS',
					theadIncomeRD : 'INGRESO MENSUAL RD$',
					theadAction : 'ACCIONES',
					minIncomeRD : 1500,
					title : 'Creación de cliente',
					dataJobs : 'Datos Laborales',
					labelOcupation : 'Ocupación',
					labelCompanyName : 'Nombre Empresa',
					labelCarga : 'Cargo',
					labelCalenderWork : 'Fecha Contratación / Ingreso',
					labelstreet : 'Calle',
					labelNumberjob : 'Número',
					labelCountry : 'País',
					labelprovince : 'Provincia',
					labelMunicipality : 'Municipio',
					labelSection : 'Sección',
					labelPlace : 'Paraje',
					labelbusinessPhone : 'Teléfono Empresa',
					labelIncomeType : 'Tipo Ingresos',
					labelIncomRD : 'Ingreso Mensual RD$',
					labelTypeSIb : 'Tipo de Cliente SIB',
					labelTypeCompany : 'Tipo Empresa',
					labeltotalEmployes : 'Total Empleados',
					labelTotalAssets : 'Total Activos',
					labeltotalIncome : 'Total Ingresos',
					labelmainActivityCIIU : 'Actividad Económica Principal (CIIU)',
					labelsectorEconomic : 'Sector Económico',
					labelindustry : 'Industria',
					labelactivityLevel1 : 'Actividad Económica Nivel 1',
					labelactivityLevel2 : 'Actividad Económica Nivel 2',
					botonAggIngresos : 'Agregar otra fuente de ingresos',
					botonmodifiIngresos : 'Modificar esta fuente de ingresos',
					botonClean : 'Limpiar',
					modalCleanForm : '¿Está seguro de que desea eliminar la información registrada?',
					modalFormCompleteOrClean : 'Debe completar los campos requeridos, o limpiar la información en pantalla'
				},
				customerBasic : {
					title : 'Creación de cliente',
					titleDataBasic : 'Datos Básicos',
					labelFirtsName : 'Primer Nombre',
					labelSecundName : 'Segundo Nombre',
					labelSurName : 'Primer Apellido',
					labelSecundSurName : 'Segundo Apellido',
					labelSex : 'Sexo',
					labelBirthDate : 'Fecha Nacimiento',
					labelCountryBirth : 'País Nacimiento',
					labelBirthCity : 'Ciudad Nacimiento',
					labelCountryOfResidence : 'País de residencia',
					labelNationality : 'Nacionalidad',
					labelNationalitySecund : 'Segunda Nacionalidad',
					labelThirNationality : 'Tercera Nacionalidad',
					labelCountryOfPassport : 'País del Pasaporte',
					labelNumeroPassport : 'Nº Pasaporte',
					labelExpirationDatePassport : 'Fecha de Expiración Pasaporte',
					labelProfetion : 'Profesión',
					labelAcademicLevel : 'Nivel Académico',
					labelCivilStatus : 'Estado Civil',
					titleContac : 'Datos de Contacto',
					labelTelHouse : 'Teléfono Casa',
					labelTelMovil : 'Teléfono Móvil',
					labelEmail : 'Correo Electrónico',
					labelStreet : 'Calle',
					labelresidenceNumber : 'Número',
					labelCountry : 'País',
					labelProvincia : 'Provincia',
					labelMunicipality : 'Municipio',
					labelSection : 'Sección',
					labelSpot : 'Paraje',
					labelBuilding : 'Edificio',
					labelApartament : 'Nº Apartamento',
					modalNationalities : 'El país del pasaporte debe corresponder a uno de los valores seleccionados en Segunda o Tercera Nacionalidad',
					labelNoEmail : 'Cliente no posee correo'
				},
				customerConfirmation : {
					title : 'Creación de Cliente',
					titleConfirmation : 'Confirmación y formalización',
					codePerson : 'Código de Persona',
					customerNumber : 'Número de Cliente',
					cardKey : 'Número Tarjeta de Claves',
					enabling : 'Habilitantes',
					achlbtr : 'Servicio Transferencias Interbancarias',
					acceptance : 'Aceptación',
					codeNumber : 'Digite la clave solicitada de la tarjeta de claves',
					validationNumber : 'Validar',
					knowCustomer : 'Conozca Su Cliente',
					cargaOnbseExp : 'Carga de Documentos a Expediente OnBase',
					finalize : 'Finalizar',
					createSavings : 'Crear Cuenta de Ahorros'
				},
				home : {
					title : 'Bienvenido al Portal Digital'
				},
				uploadOnBase : {
					title : 'Carga de Documentos a Expediente OnBase',
					typeDocument : 'Tipo Documento Identidad',
					numberIdentification : 'Documento de Identidad',
					botonSearch : 'Buscar',
					clientNumber : 'Número de Cliente'
				}
	    	}
	    });

})();
