var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    }, 
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		  new FormView().init();
		 
    },
	
    // deviceready Event Handler
      onDeviceReady: function() {

	  
		document.addEventListener("backbutton", onBackbutton, false);
 
 			//Check Internet Avaliable Or Not
	   		if(navigator.connection.type==0 || navigator.connection.type=='none')
			{
				ShowAlert('This application requires internet. Please connect to the internet.',
							"DMT","Ok")
			}
		 
			
       // app.receivedEvent('deviceready');
    },
	 
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};
 
 
// Show Dialog Alerts
	function ShowAlert(message,  title,ButtonText) {
	
		   	$("#messageHeaher").text(title);
			$("#messageLable").text(message);
	    	$.mobile.changePage( "#dialog", { role: "dialog" } );
			 
	}
	 
	//Event of back Button
 	function onBackbutton() {
	
		if($.mobile.activePage.is('#main')){
			 	$("#messageHeaher-comfirm").text(config.getValue("messages.Titel"));
				$("#messageLable-comfirm").text("Do you want to exit ?");
				$.mobile.changePage( "#dialog-comfirm", { role: "dialog" } );
       }
       else {
           navigator.app.backHistory()
       }
		 
    }
	
	// Answer of Dialog Alerts
	function alertexit(button){
 
        if(button=="1" || button==1)
        {
			if(navigator.app){
					navigator.app.exitApp();
			}else if(navigator.device){
					navigator.device.exitApp();
			}
        }
		 
	}
	

	 //Log File Update
	function UpdateLogFile(Message)
	{
  		 
		var LogFileOn = config.getValue("setting.LogFileOn").toUpperCase();
		var Value = "TRUE";
		
  		if(LogFileOn.trim()=="TRUE")
		{
			 
				setTimeout(function () {
						saveText(Message, "DMTLog.txt", function(){
								alert(Message);
								 
						});
				}, 2500);
		}
		  
	}
	 
	  // Fail to Update Log
	var  failCB = function (msg) {
			return function () {
				alert('Failed: ' + msg);
			};
		},
		deviceReady=false;
	
		document.addEventListener("deviceready", function(){
		deviceReady=true;
	}, false);
	
		  // saveText
	function saveText(text, filePath, doneCB) {
		var fail=failCB("Getting file system.");
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS_Save, fail);
		function gotFS_Save(fs) {
			var fail = failCB('Getting file');
			fs.root.getFile(filePath, {create: true, exclusive: false},
							gotFileEntry, fail);
		}
		function gotFileEntry(fileEntry) {
			var fail = failCB('Creating writer');
			fileEntry.createWriter(gotFileWriter, fail);
		}
		function gotFileWriter(fileWriter) {
			fileWriter.onwriteend = function (evt) {
				doneCB();
			};
			fileWriter.seek(fileWriter.length); // Start write position at EOF.
			fileWriter.write(text);
		}
		return false;
	}
	//read Text
	function readText(filePath, finishCB) {	
		var fileEntry,
			fail= failCB("Requesting file system.");
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS_Read, fail);
		function gotFS_Read(fs) { 
			var fail = failCB('Getting File');
			fs.root.getFile(filePath, {create: true, exclusive: false},
							gotFileEntry, fail);
		}
		function gotFileEntry(FE) {
			fileEntry=FE;
			fileEntry.file(function (file) {
				var reader = new FileReader();
				reader.onloadend = function (evt) { /*asyncronous event*/
					finishCB(evt.target.result);
				};
				reader.readAsText(file);
			}, failCB("Reading file"));
		}
	}