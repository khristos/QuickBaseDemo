var FieldService =  {
	getField: function(id) {
		return {
		  "label": "Sales region",
		  "required": false,
		  "choices": [
				"Asia",
				"Australia",
				"Western Europe",
				"North America",
				"Eastern Europe",
				"Latin America",
				"Middle East and Africa"
		  ],
		  "displayAlpha": true,
		  "default": "North America"
		}
	},
	saveField: function (fieldJson) {
		// Add the code here to call the API (or temporarily, just log fieldJson to the console) - http://www.mocky.io/v2/566061f21200008e3aabd919
		event.preventDefault();
		console.log(fieldJson);

		minAjax({
	    url: "http://www.mocky.io/v2/566061f21200008e3aabd919",//request URL
	    type: "POST",//Request type GET/POST
	    //Send Data in form of GET/POST
	    data: fieldJson,
	    debugLog:"true",
	    //CALLBACK FUNCTION with RESPONSE as argument
	    success: function(data){
	      console.log(data);
	    }
	  });

	  /*postAjax('http://www.mocky.io/v2/566061f21200008e3aabd919', fieldJson, function(data){ console.log(data); });*/
	}
}