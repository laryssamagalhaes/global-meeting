(function(){
  'use strict';

  angular
    .module('app')
    .factory('meetingFactory', meetingFactory);

    /*@ngInject*/
    function meetingFactory($http, API_URL, KEY) {

      return {
    	  initAutoComplete: initAutoComplete,
    	  getTimeZoneData: getTimeZoneData,
    	  getBetterMeetingHour: getBetterMeetingHour
      };

      function initAutoComplete(id) {
      	var autoComplete = new google.maps.places.Autocomplete(
      	  (document.getElementById(id))
      	);

      	return autoComplete;
      }

      function getTimeZoneData(location, timestamp) {
      	return $http.get(
      		API_URL + '?key=' + KEY + '&location=' + location + '&timestamp=' + timestamp
      	);
      }

      function getBetterMeetingHour(places) {
      	var hometown = places[0];
      	var destination = places[1];

      	var hometown_UTC = getHours(hometown.rawOffset);
      	var destination_UTC = getHours(destination.rawOffset);

      	var hometown_DST = getHours(hometown.dstOffset);
      	var destination_DST = getHours(destination.dstOffset);

      	hometown_UTC = getUTCWithDST(hometown_DST, hometown_UTC);
      	destination_UTC = getUTCWithDST(destination_DST, destination_UTC);
      	
      	if(!VerifyIfMeetingIsPossible(hometown_UTC, destination_UTC)) {
      		return false;
      	} 
    		
    		var diffHour = getDiffBetweenHours(hometown_UTC, destination_UTC);

    		if(firstHourIsLessThanSecond(hometown_UTC, destination_UTC)){
  			  return {
  				  hometown: getAmPm(9),
  				  destination: getAmPm(9 + diffHour)
  			  }
			  } 

				return {
    			destination: getAmPm(9),
    			hometown: getAmPm(9 + diffHour)
    		}
      }

      function getHours(seconds) {
      	return seconds / 3600;
      }

      function getUTCWithDST(DST, UTC) {
      	return DST + UTC;
      }

      function VerifyIfMeetingIsPossible(firtsUTC, secondUTC) {
      	return getDiffBetweenHours(firtsUTC ,   secondUTC) <= 9;
      }

      function getDiffBetweenHours(firstHour, secondHour) {
      	var diffHour = firstHour - secondHour;
      	if(Math.sign(diffHour) === -1) {
      		return diffHour * (-1);
      	}

      	return diffHour;
      }

      function firstHourIsLessThanSecond(firstHour, secondHour) {
      	return firstHour < secondHour;
      }

      function getAmPm(hour) {
       	var hours_map = {
	      	'13': 1,
	      	'14': 2,
	      	'15': 3,
	      	'16': 4,
	      	'17': 5,
	      	'18': 6,
	      	'19': 7,
	      	'20': 8,
	      	'21': 9,
	      	'22': 10,
	      	'23': 11,
	      	'24': 12
      	}; 

        var ceilHour = Math.ceil(hour);

      	return ceilHour > 12 ? 
      		hours_map[ceilHour] + 'PM' : 
      		ceilHour + 'AM';
      }
    }
})();