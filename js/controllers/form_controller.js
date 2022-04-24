var FormController = function(pModel){
  
 	// Int Modules
    var model = pModel || new FormModel();
	  function init(){
	
    }
	
 	// Service of GetNextNumber
    function GetNextNumber(internalid){
       return  model.GetNextNumber(internalid);
    }
	
	// Service of LicenseStatus
	function LicenseStatus(VehicalNumber){
		   return  model.LicenseStatus(VehicalNumber);
    }
	
	// Service of VehicleDetails
	function VehicleDetails(VehicalNumber){
      return  model.GetVehicalDetails(VehicalNumber);
    }
   
    return {
        init: init,
        model : model,
		GetNextNumber : GetNextNumber,
		LicenseStatus : LicenseStatus,
		VehicleDetails : VehicleDetails
    };
};