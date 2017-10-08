(function(){
  'use strict';

  angular
  .module('app')
  .controller('meetingController', meetingController);

  /*@ngInject*/  
  function meetingController(meetingFactory) {
    /* jshint ignore:start */
    var vm = this;
    /* jshint ignore:end*/

    var places = [];
    vm.hours = '';

    vm.currentDay = new Date(); 
    vm.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));  

    vm.onlyWeekdays = function(date) {
      var day = date.getDay();
      return day === 1 || day === 2 || day === 3 || day === 4 || day === 5;
    };

    function getPlace(param, placeId, model) {
      var place = param.getPlace();
      vm[model] = place.formatted_address;

      var lat = place.geometry.location.lat();
      var long = place.geometry.location.lng();

      var location = lat + ',' + long;
      var timeStamp = moment(moment(vm.date).format('YYYY-MM-DD')).unix();

      meetingFactory.getTimeZoneData(location, timeStamp)
      .then(function(result){     
        places[placeId] = result.data;

        if(places.length == 2 && vm.date) {
          vm.hours = meetingFactory.getBetterMeetingHour(places);
        }
      });
    }

    vm.getData = function() {
      if(places.length == 2) {
        getPlace(hometown, 0, 'hometown');
        getPlace(destination, 1, 'destination');
      }
    };

    var hometown = meetingFactory.initAutoComplete('hometown');

    hometown.addListener('place_changed', function() {
      getPlace(hometown, 0, 'hometown');
    });

    var destination = meetingFactory.initAutoComplete('destination');

    destination.addListener('place_changed', function(){ 
      getPlace(destination, 1, 'destination');
    });
  } 
})();