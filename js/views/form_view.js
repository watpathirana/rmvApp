var FormView = function(pController){
 
 
  	var controller = pController || new FormController();
	   
    function init(){
		
			//lnk Srilanka.lk Open
			$('#lnkSrilankalk').click(function(){ 
			  window.open("http://www.srilanka.lk", "_system");
			  UpdateLogFile('open: www.srilanka.lk \n'); //Log File Write
			});
			
			//lnk motortraffic.gov.lk Open
			$('#lnkDMT').click(function(){ 
			  window.open("http://www.motortraffic.gov.lk", "_system");
			    UpdateLogFile('open: www.motortraffic.gov.lk \n'); //Log File Write
			});
			
 
			//Vehicle Details Loding
			$('#btnVehicalDetailsEnqiry').click(function(){ 
			  $("#resultHeader").hide();
  			  $("#result").hide();
			  $('#txtVehicalDetailsVehicalNumber').val("");
			   UpdateLogFile('Loding : Vehicle Details  Screen \n'); //Log File Write
			});
			
			
			//Vehicle Status Loding
			$('#btnVehicalRevenueLicenseStatus').click(function(){ 
			  $("#resultRevenueLicenseStatusHeader").hide();
  			  $("#Statusresult").hide();
			  $('#txtLICStatusVehicalNumber').val("");
			     UpdateLogFile('Loding : Vehicle Status  Screen \n'); //Log File Write
			});
			
		 

			//Ongoing Vehicle No
        	$('.VehicalCategory').click(function(e){ 
			
					//Get Vehical type from button internalid
					var vehicalType = $(this).data('internalid');
					
					 //Loading status messange
					$.mobile.loading('show', {theme:"a", text:config.getValue("messages.WatingMessage"), 
							textonly:true, textVisible: true});
		 
				 	setTimeout(function(){ 
					
						UpdateLogFile('Service - Ongoing Vehicle No: START\n'); //Log File Write
							
						//Call Service
					 	var soapResponse  = controller.GetNextNumber(vehicalType); 
						 
					 	 //Check Any Error on Request
						 if($(soapResponse.toXML()).find("ErrorCode").text().trim().length >0){
						   	var $popup = $('#popupOnGoingError')
							$("#messageHeaherOnGoingErr").text(config.getValue("messages.Titel"));
							$("#messageLableOnGoingErr").text(config.getValue("messages.ServerNotConnect"));
							e.preventDefault();
							$popup.popup({ overlayTheme: 'a' });
							$popup.popup('open');
							
							 UpdateLogFile('Ongoing Vehicle No Service :  Error on Request \n'); //Log File Write
							 UpdateLogFile(soapResponse+ '\n');
						 }  
						 else
						 {
							 //Show Result
						  	var $popup = $('#popupOnGoing')
							$("#messageHeaherOnGoing").text(config.getValue("messages.Titel"));
							$("#messageLableOnGoing").text("Next Ongoing Number : " + $(soapResponse.toXML()).find("OngoingVehicleNo").text()+".");
							e.preventDefault();  
							$popup.popup({ overlayTheme: 'a' });
							$popup.popup('open');
							
						    UpdateLogFile('Service - Ongoing Vehicle No: succeed\n'); //Log File Write
						 }
						 
					    //Hide status messange	
						$.mobile.loading('hide');
				 	 }, 50);
				 
			});
			 
			 
			//Vehicle Status -----------------------------------------------------------------------------------------
		  
		  	// work With Submit button
			$('#btStatus').click(function(e){ 
			  	viewStatus(e);
			});
	 
		 
		 	// work With Native go button
			$("#Statusform").on( 'submit', function(e) {
			  	viewStatus(e);
			   	return false;
			});
		 
			// view Status function
			function viewStatus(e)
			{
				 
					$('#lbl_Status_Issued_Date').text("");
					$('#lbl_Status_Expiry_Date').text("");
					$('#lbl_Status_License_No').text("");
							
					//Get Vehical Number
				 	var vehicalNo = $('#txtLICStatusVehicalNumber').val();
					 
					//Validation Check For Vehical nnumber empty
					if(vehicalNo.toString().trim().length ==0){
						  
							var $popup = $('#popupStatus')
							$("#messageHeaherSts").text(config.getValue("messages.Titel"));
							$("#messageLableSts").text(config.getValue("formValidator.errors.mandatoryField"));
							e.preventDefault();
							$popup.popup({ overlayTheme: 'a' });
							$popup.popup('open');
							 
							 
						   return;
					 } 
 
 						//Loading status messange
					$.mobile.loading('show', {theme:"a", text:config.getValue("messages.WatingMessage"), 
							textonly:true, textVisible: true});
		 
				 	setTimeout(function(){ 
					
						 	UpdateLogFile('Service -  Vehical Status: Start\n'); //Log File Write
								//Call Service
						 	var  Response  =  controller.LicenseStatus(vehicalNo); 
					 
					 		//check Object Empty Or Not
					 		if(Object.getOwnPropertyNames(Response).length === 0){
  
						 
									var $popup = $('#popupStatus')
									$("#messageHeaherSts").text(config.getValue("messages.Titel"));
									$("#messageLableSts").text(config.getValue("formValidator.errors.UnabletoFindData"));
									e.preventDefault();
									$popup.popup({ overlayTheme: 'a' });
									$popup.popup('open');
									
								   	UpdateLogFile('view Status Service :  Error on Request \n'); //Log File Write
								 
							}
						    else
							{
									
								
									 
								  //Show Result
									$('#lbl_Status_Issued_Date').text(Response.License_Issued_Date);
									$('#lbl_Status_Expiry_Date').text(Response.License_Expiry_Date);
									$('#lbl_Status_License_No').text(Response.License_No);
								 
									 $('#resultRevenueLicenseStatusHeader').show();
									$('#Statusresult').show();
									
									 UpdateLogFile('Service -  Vehical Status: succeed\n'); //Log File Write
									 
							}
							
							
						  	//Hide status messange
						 $.mobile.loading('hide');
					
						 
 					}, 50);
			}
			
			//Vehicle Details ------------------------------------------------------------------------------------------
			 
		    // work With Submit button
			$('#btVDEnquiry').click(function(e){ 
 				viewDetails(e);
			});
			 
		 	// work With Native go button
			 $("#Detailsform").on( 'submit', function(e) {
			  viewDetails(e);
			   return false;
			});
		 
		 
		 	// view Details function
		 	function viewDetails(e)
			{
				 	 
			 			 
						 $('#lbl_dtl_rst_Owner').text("");
						 $('#lbl_dtl_rst_EngineNo').text("");
						 $('#lbl_dtl_rst_ClassOfVehicle').text("");
						 $('#lbl_dtl_rst_Make').text("");
						 $('#lbl_dtl_rst_Model').text("");
						 $('#lbl_dtl_rst_YearOfManufacture').text("");
						 
						 //Get Vehical Number
					var vehicalNo = $('#txtVehicalDetailsVehicalNumber').val();
					
					//Validation Check For Vehical nnumber empty
					 if(vehicalNo.toString().trim().length ==0){
					
						   	var $popup = $('#popupDetails')
							$("#messageHeaherDtl").text(config.getValue("messages.Titel"));
							$("#messageLableDtl").text(config.getValue("formValidator.errors.mandatoryField"));
							e.preventDefault();
							$popup.popup({ overlayTheme: 'a' });
							$popup.popup('open');
				
						   return;
					 }  
		 
		 			//Loading status messange
					$.mobile.loading('show', {theme:"a", text:config.getValue("messages.WatingMessage"), 
							textonly:true, textVisible: true});
		 
				 	setTimeout(function(){ 
				
					 	 UpdateLogFile('Service - Vehicle Details: Start\n'); //Log File Write
							
							//Call Service
						 var soapResponse  = controller.VehicleDetails(vehicalNo); 
					 
					 	 //Check Any Error on Request
						 if($(soapResponse.toXML()).find("ErrorCode").text().trim().length >0){
					
						   	var $popup = $('#popupDetails')
							$("#messageHeaherDtl").text(config.getValue("messages.Titel"));
							$("#messageLableDtl").text(config.getValue("formValidator.errors.UnabletoFindData"));
							e.preventDefault();
							$popup.popup({ overlayTheme: 'a' });
							$popup.popup('open');
				
						 	UpdateLogFile('Vehical Details Service :  Error on Request \n'); //Log File Write
							UpdateLogFile(soapResponse+ '\n');

						 }  
						 else
						 {
							  //Show Result
							 $('#lbl_dtl_rst_Owner').text($(soapResponse.toXML()).find("AbsoluteOwner").text());
							 $('#lbl_dtl_rst_EngineNo').text($(soapResponse.toXML()).find("EngineNo").text());
							 $('#lbl_dtl_rst_ClassOfVehicle').text($(soapResponse.toXML()).find("ClassOfVehicle").text());
							 $('#lbl_dtl_rst_Make').text($(soapResponse.toXML()).find("Make").text());
							 $('#lbl_dtl_rst_Model').text($(soapResponse.toXML()).find("Model").text());
							 $('#lbl_dtl_rst_YearOfManufacture').text($(soapResponse.toXML()).find("YearOfManufacture").text());
							 $('#resultHeader').show();
							 $('#result').show();
							 
							 UpdateLogFile('Service - Get Vehical Details: succeed\n'); //Log File Write
							  
						 }
					 
					 	//Hide status messange
						 $.mobile.loading('hide');
						 
 					}, 50);
			}
    }
 
    return {
        init: init,
        controller : controller
    };
};