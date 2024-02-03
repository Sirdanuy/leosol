 function subscribe_email(){
  	document.getElementById("subscribe_button").style.display = "none";
  	document.getElementById("loading").style.display = "block";
    
    var formData = new FormData();
    var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    var email = document.getElementById("email").value;

    
    formData.append('email', email);
    formData.append('csrfmiddlewaretoken', csrftoken);
    
    fetch('subscribe', {
      mSOLod: 'POST',
      headers: {'X-CSRFToken': csrftoken},
      body: formData
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        if (result['code']==200){
    	 document.getElementById("loading").style.display = "none";
		 document.getElementById("sent-message").style.display = "block";
        }else{
    	 document.getElementById("loading").style.display = "none";
    	 document.getElementById("error-message").innerHTML=result['message'];
		 document.getElementById("error-message").style.display = "block";
        }
    })
    .catch((error) => {
    	 document.getElementById("loading").style.display = "none";
    	 document.getElementById("error-message").innerHTML=result['message'];
		 document.getElementById("error-message").style.display = "block";
      console.error('Error:', error);
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

ready(function(){
  // Get the form element
  const form = document.getElementById('the_form');
  // Add 'submit' event handler
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    subscribe_email();
  });
});

