
(function(){

    angular
        .module('uploadOnBaseModule')
        .directive('inputUploadFile', inputUploadFile);

    inputUploadFile.$inject = [
    	'$parse'
    ];

    function inputUploadFile($parse){
        return  {
            restrict: 'A',
            link : function(scope, element, attrs) {
            	element.on('change', function(e){
            		scope.$ctrl.appendDocument(element[0].files[0]);
            	});
            }
        };
    }

})();