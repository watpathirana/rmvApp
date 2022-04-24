var FormModel = function(){
 
 
  //Ongoing Vehicle No
    function GetNextNumber(value){
 				UpdateLogFile('Service - Ongoing Vehicle No: Calling\n');
				 
	 			var Url = config.getValue("serverDetails.DMTGetNextNumberURL"); // get Url from Config File

				var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://schemas.conversesolutions.com/xsd/dmticta/v1">'+ 	
									'<soapenv:Header/>'+ 		
										'<soapenv:Body>'+		  
											'<v1:GetOnGoingVehicleNo>'+			 
												'<v1:vehicleCategory>'+value+'</v1:vehicleCategory>'+		  
											'</v1:GetOnGoingVehicleNo>'+
										'</soapenv:Body>'+
									'</soapenv:Envelope>' ;

				//var soapRequest = new LoadTemplate().LoadXML("ongoing_number",value); // Load Soap Request
				var Bearer = config.getValue("serverDetails.bearer"); // get Bearer from Config File
			   	var jqXHR ;
			 
      			jQuery.support.cors = true;
			    $.mobile.allowCrossDomainPages = true;
			    $.support.cors = true;
				 
				 	// Soap Call
				   $.soap({
					url: Url,
					HTTPHeaders: { 'Authorization': 'Bearer '+ Bearer },	
					data:soapRequest,
					async: false,  
					success: function (soapResponse) {
					  
						  jqXHR=soapResponse;
			  
					},
					error: function (SOAPResponse) {
					 
						//If any error show this alert
					  ShowAlert(config.getValue("messages.ServerNotConnect"), 
								  config.getValue("messages.Titel"),"Close")
								  
						  UpdateLogFile('Service - Ongoing Vehicle No:Error\n');
					   	  UpdateLogFile(SOAPResponse);
 					}
				}).done(function(data, textStatus, jqXHR) {}); 
				
			   
				return jqXHR; // Return Soap Respond
    }

	function xml_to_string(xml_node)
    {
        if (xml_node.xml)
            return xml_node.xml;
        else if (XMLSerializer)
        {
            var xml_serializer = new XMLSerializer();
            return xml_serializer.serializeToString(xml_node);
        }
        else
        {
            alert("ERROR: Extremely old browser");
            return "";
        }
    }
	
	 
	   //Get Vehical Details 
	  function GetVehicalDetails(value){
  				
				UpdateLogFile('Service -  Vehicle Details: Calling\n'); //Log File Write
					
      			jQuery.support.cors = true;
			    $.mobile.allowCrossDomainPages = true;
				  $.support.cors = true;
				
				var Url = config.getValue("serverDetails.DMTGetVehicalDetails"); // get Url from Config File

				 var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://schemas.conversesolutions.com/xsd/dmticta/v1">'+
   									'<soapenv:Header/>'+
   										'<soapenv:Body>'+
      										'<v1:GetVehicleLimitedInfo>'+
         										'<v1:vehicleNo>'+value+'</v1:vehicleNo>'+
         										'<v1:phoneNo>94000000000</v1:phoneNo>'+
      										'</v1:GetVehicleLimitedInfo>'+
   										'</soapenv:Body>'+
									'</soapenv:Envelope>';

				//var soapRequest = new LoadTemplate().LoadXML("vehical_details",value.toUpperCase()); // Load Soap Request
				var Bearer = config.getValue("serverDetails.bearer"); // get Bearer from Config File
 				var jqXHR ;
					  
				 // Soap Call
				$.soap({
					url: Url,
					HTTPHeaders: { 'Authorization': 'Bearer '+ Bearer },	
					async: false,  
					data:soapRequest, 
				   
					success: function (soapResponse) {
							jqXHR=soapResponse;
					 
					},
					error: function (SOAPResponse) {
							//If any error show this alert
					 ShowAlert(config.getValue("messages.ServerNotConnect"), 
								   config.getValue("messages.Titel"),"Close")
								   
						  UpdateLogFile('Service -  Get Vehical Details :Error\n'); //Log File Write
					   	  UpdateLogFile(SOAPResponse);
						 
					}
				}).done(function(data, textStatus, jqXHR) {}); 
				
					return jqXHR; // Return Soap Respond
    }
	
	  //Revenue License Status
		  function LicenseStatus(value){
				
			 
				UpdateLogFile('Service - License Status : Calling \n'); //Log File Write
		 
					
      			 jQuery.support.cors = true;
			    $.mobile.allowCrossDomainPages = true;
				$.support.cors = true;
				var Url = $.trim(config.getValue("serverDetails.RevenueLicenseStatus")) +"?vRegNo="+ value; // get Url from Config File
				var Bearer = config.getValue("serverDetails.bearer"); // Load Soap Request
 				var jqXHR ;
				//Call Rest Service
				$.ajax({ 
						 type: "GET",
						 async:false,
						 dataType: "json",
						 timeout: 10000,
						 url: Url, 
						 headers: { 'Authorization': 'Bearer '+ Bearer },
						 success: function (data, status, req) {
								jqXHR=data;
					 
							}, 
						 error: function (request, status, error) {
							 		//If any error show this alert
								ShowAlert(config.getValue("messages.ServerNotConnect"), 
								config.getValue("messages.Titel"),"Close") 
							 	UpdateLogFile('Service - License Status : Error \n'); //Log File Write
								UpdateLogFile(error); //Log File Write
							}
					  });
		   
		    
					return jqXHR; // Return Soap Respond
    }					
 
    return {
        GetNextNumber : GetNextNumber,
		LicenseStatus : LicenseStatus,
      	GetVehicalDetails : GetVehicalDetails,
	 
    }
};