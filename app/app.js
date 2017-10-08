;(function () {
  'use strict';

  angular
    .module('app', ['env',
                    'ngSanitize',
                    'toastr',
                    'ngMaterial'])

    .config(function($mdThemingProvider) {
	    $mdThemingProvider.theme('default')
	      .primaryPalette('light-blue');
	  })

    .config(function($mdDateLocaleProvider) {
      $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD/MM/YYYY');
      };
    });
    
})();
