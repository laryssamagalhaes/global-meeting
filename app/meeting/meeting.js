(function(){
  'use strict';

  angular
    .module('app')
    .component('meeting', {
      templateUrl: 'meeting/template.html',
      controller: 'meetingController',
      transclude: true
    });
})();