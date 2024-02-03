var wallet_address='';

function connect_status(){
  EL.connect()
  .then(function (result) {
      console.log(result);
    wallet_address=result[0];
    document.getElementById("connect_button").innerHTML=wallet_address.slice(0,10)+'****'+wallet_address.slice(-4);
    check_status(wallet_address);
    
    
  }).catch((err) => {
    console.log(err);
    if(err.message == 'PleaseChangeNetwork'){
      alert("Please connect to the Mumbai Network in Metamask."+web3js.currentProvider.chainId);
      $("#txStatus").text("error: "+err);
    }else if(err.message == 'NotFoundMatamask'){
      alert("Not found matamask, please visit: \rhttps://metamask.io/download");
      $("#txStatus").text("error: "+err);
    }else if(err.code==4001)
      alert("Please allow user connect");
      $("#txStatus").text("error: "+err.message);
  });
}
    


function ready(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}


 function check_status(address){
 
    document.getElementById("spin").style.display = "";
    
    var formData = new FormData();
    var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    
    formData.append('wallet_address', wallet_address);
    formData.append('csrfmiddlewaretoken', csrftoken);
    
    fetch('check_status', {
      mSOLod: 'POST',
      headers: {'X-CSRFToken': csrftoken},
      body: formData
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        document.getElementById("spin").style.display = "none";
        if (result['code']==200){        	
        	if(result['data']['status']=="approved"){
        		document.getElementById("status").innerHTML = "Congratulations, your application was successful!<br/><br/>You are now a "+result['data']['user_category']+".";
    		}else if(result['data']['status']=="pending"){
    			document.getElementById("status").innerHTML = "Pending";
    		}else if(result['data']['status']=="rejected"){
    			document.getElementById("status").innerHTML = "We regret to inform your application has been unsuccessful.<br/><br/>Please do not be disheartened as there are several opportunities on Twitter/ Discord to become a "+result['data']['user_category']+".";
    		}
	    	document.getElementById("status").style.display = "block";
        }else if(result['code']==404){
        	document.getElementById("status").innerHTML = "Application not found, please check your wallet address or submit again.";
        	document.getElementById("status").style.display = "block";
        }else{
    	 document.getElementById("status").innerHTML=result['message'];
		 document.getElementById("status").style.display = "block";
        }
    })
    .catch((error) => {
    	 document.getElementById("status").innerHTML=result['message'];
		 document.getElementById("status").style.display = "block";
      console.error('Error:', error);
    });
    
}

ready(function(){

});

