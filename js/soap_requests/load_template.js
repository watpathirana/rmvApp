var LoadTemplate = function(){
   	
	//Load Soap Request
    function LoadXML(FileName,value){
	  
			   var jqXHR =  $.ajax({
						type: "GET",
						dataType: "xml",
						async:false,
						url: "js/soap_requests/"+FileName+".xml" ,
						success: function (data, status, req) {

						 },
						error: function (request, status, error)  {
								 alert(error);
								}
						}
				);
		  		return FillTemplate(jqXHR,value,FileName);
    }
	
	//Fill Soap Request with Values
	function FillTemplate(data,value,FileName)
	{
		
		switch (FileName)
		{
			
			 case "ongoing_number":
			 		var jqXHR = data;
					var xmlDoc = jQuery.parseXML(jqXHR.responseText);
					jqXHR = $(xmlDoc).find("vehicleCategory").text(value);
					return xmlDoc;
				  break;
			 case "vehical_details":
			 		var jqXHR = data;
					var xmlDoc = jQuery.parseXML(jqXHR.responseText);
					jqXHR = $(xmlDoc).find("vehicleNo").text(value);
					return xmlDoc;
				  break;
		}
		 
	
	}
	
	 return {
           LoadXML : LoadXML
    		};
   
  };