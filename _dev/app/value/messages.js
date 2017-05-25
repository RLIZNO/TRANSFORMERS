
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
				errorEmail : 'Debe contener un correo valido',
				errorLimitMayor: 'El monto editado debe ser menor o igual al aprobado por la preaprobación'
	    	},
	    	modals : {
	    		error : {
	    			badControlList : 'Este cliente se encuentra en lista interna de control',
	    			badControlListCreationAccount : 'Este cliente se encuentra en lista interna de control requiere diligencia adicional. No puede continuar con el proceso digital',
					badOberved: 'Este cliente está clasificado como “Observado”, puede continuar con el proceso digital',
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
					errorCustomerSiebel : 'Ha ocurrido un error en proceso de creación del cliente en Siebel. ¿Desea reintentarlo?',
					errorNocredit: 'Cliente debe pasar por la sucursal más cercana a recibir su tarjeta de clave para continuar	',
					modalRepeatFields : 'El BIN o Codigo de Producto digitado ya existe',
					minLimitRD: "Por favor editar el campo Límite RD, no cumple con el valor mínimo del producto. El valor mínimo es RD$",
					maxLimitRD: "Por favor editar el campo Límite RD, no cumple con el valor máximo del producto. El valor máximo es RD$",
					minLimitUSD: "Por favor editar el campo Límite USD, no cumple con el valor mínimo del producto. El valor mínimo es USD$",
					maxLimitUSD: "Por favor editar el campo Límite USD, no cumple con el valor máximo del producto. El valor máximo es USD$",
					printError:    'El producto no se envío a imprimir'			
	    		},
	    		warning : {
					modalCompeteFieldsOrClean : 'Debe completar los campos requeridos antes de visualizar el detalle esta ocupación, o limpiar la información en pantalla',
					modalCancelprocess : '¿Está seguro de que desea cancelar este proceso?',
					modalCancelprocessGR : '¿Está seguro de que desea volver al menu de Grupo Ramos?',
					modalDeleteOcupation : '¿Está seguro que desea eliminar esta ocupación?',
					modalUploadOnbseContent : '¿Está seguro de que desea eliminar este documento?',
					modaltitleWarning : 'Advertencia',
					modeltitleError : 'Alerta',
					modalTypeWarning : 'warning',
					modalTypeError : 'error',
					modalCancelButton : 'No',
					modalColorButton : '#24407B',
					modalConfirText : 'Si',
					modalTextPrevious : 'Al regresar a la pantalla anterior perderá la información registrada, ¿está seguro que desea continuar?',
					modalNoKeyCard : 'Este cliente no posee tarjeta de claves, no es posible continuar con el proceso DIGITAL',
					validAsignature : 'Debe concluir con el proceso de formalización y validar la firma solicitada antes de continuar',
					nokeycardAvailable : 'No tiene disponibilidad de tarjeta de claves en su inventario para continuar con este proceso',
					modalEmptyField    : 'Este campo es obligatorio'
	    		},
				success : {
					codeCorrect : 'El código digitado es correcto',
					productSuccess: 'El producto se inserto correctamente',
					printSuccess:    'El producto se envío a imprimir, por favor espere'
				}
	    	},
	    	steps : {
	    		one : '1',
	    		three : '3',
	    		two : '2'
	    	},
	    	views : {
				validationAccount : {
					title: 'Validación del cliente',
					labeltypeDocument : 'Tipo de documento',
					titleDebugChecklists : 'Depuración en listas de control',
					labelTypeDocument : 'Tipo Documento Identidad',
					labelNumberIdentification : 'Número Documento Identidad',
					labelViewBureau : 'Ver Reporte Buró de Crédito',
					labelEvaluationControl : 'Evaluación Listas de Control',
					labelEvaluationJudicial : 'Evaluación Judicial'
				}
	    	}
	    });

})();
