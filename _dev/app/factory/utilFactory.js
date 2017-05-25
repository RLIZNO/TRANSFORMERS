
/**
 *  @ngdoc service
 *  @name App.service:utilFactory
 *
 *  @description
 *  Metodo utilitarios transversales a toda la aplicación.
 */
(function () {
    
    'use strict';

    angular
        .module('app')
        .factory('utilFactory', utilFactory);

    utilFactory.$inject = [];

    function utilFactory() {
        
        var self = {
            getAge : getAge
        };

        /**
         *  @ngdoc function
         *  @name getAge
         *  @methodOf App.service:utilFactory
         *
         *  @description
         *  Devuelve la edad a partir de una fecha ingresada.
         *
         *	@param {String} dateValue fecha ingresada en el formato mm/dd/yyyy
         */
        function getAge(dateValue) {

    		var today = new Date(),
    			arrayDate = dateValue.split("/"),
    			year,
    			month,
    			day,
    			age;

		    if (arrayDate.length !== 3) {
		       	return false;
		    } else {
			    
			    year = parseInt(arrayDate[2]);
			    month = parseInt(arrayDate[0]);
			    day = parseInt(arrayDate[1]);

			    age = today.getFullYear() - year - 1;

			    if (today.getMonth() + 1 - month < 0) {
			       return age;
			    }
			    if (today.getMonth() + 1 - month > 0) {
			       return age + 1;
			    }

			    if (today.getUTCDate() - day >= 0) 
			       return age + 1;
			    }

    		return age; 
        }

        return self;

    }
})();
