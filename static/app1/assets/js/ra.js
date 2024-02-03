var wallet_address='';
var user_type='';
var user_expertise='';
var twitter_url='';
var twitter_name='';
var twitter_name1='';
var discord_name1='';
var a1='';
var a2='';
var a3='';


function connect(){
  EL.connect()
  .then(function (result) {
      console.log(result);
    $("#wallet-address").text(result[0]);
    wallet_address=result[0];
    document.getElementById("connect_button").style.display = "none";
    $("#connect_done").css({ 'display' : ''});
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
    
function nextQ(num){
    
    if (num==2){
    	a1 = document.getElementById('question1').value;
    	a1 = a1.trim();
    	console.log(a1);
    	if (a1==''){
    		return false;
    	}else{
	        document.getElementById("q1").style.display = "none";
	        document.getElementById("q2").style.display = "block";
	        document.getElementById("q3").style.display = "none"; 
    	}       
    }else if(num==3){    
    	a2 = document.getElementById('question2').value;
    	a2 = a2.trim();
    	if (a2==''){
    		return false;
    	}else{
	        document.getElementById("q1").style.display = "none";
	        document.getElementById("q2").style.display = "none";
	        document.getElementById("q3").style.display = "block";  
    	}  
    }
}

function userType(t){
    user_type = t;
    document.getElementById("Application").style.display = "block";    
    if (user_type=="Advisory"){
        document.getElementById("group1").style.display = "block";
    } else if (user_type=="Reimaginer"){
        document.getElementById("question2_q").innerHTML="2. Tell us about your greatest achievement in the NFT space (this could be anything from a viral or creative post, NFT or art collection, a positive investment, a marketing or brand strategy, a song, a time you helped out in the community or anything in between). P.s. it helps if you provide evidence for verification e.g. a link to a tweet etc.";
        document.getElementById("question3_q").innerHTML="3. Where do you see the NFT space in 12 months time?";
        document.getElementById("group2").style.display = "block";
    }
    
    console.log('usertype: '+user_type);
    location.hash = "#Application";
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

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function twitter_url_validator(url){
//url = 'https://twitter.com/yvinceo/status/1566742496096358401?s=20&t=40XcMvQ3uLsfQkyC1SBfAQ';
	url=url.trim()
	if (!isValidHttpUrl(url)){
		return false;
	}else{
	
		let start = url.indexOf("twitter.com/")
		let end = url.indexOf("/status/");
		twitter_name = url.substring(start+12,end)
		if (twitter_name != '' && start > -1){
			twitter_url = url;
			return true;
		}
	}
	return false;
}

 function submit_anwser(){
 
    $("#spin").css({ 'display' : ''});
  	document.getElementById("q3_submit").style.display = "none";
    
    var formData = new FormData();
    var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    
    formData.append('wallet_address', wallet_address);
    formData.append('twitter_username', '_');
    formData.append('twitter_name', twitter_name1);
    formData.append('discord_name', discord_name1);
    formData.append('twitter_url', 'https://');
    formData.append('user_category', user_type);
    formData.append('user_expertise', user_expertise);
    formData.append('anwser1', a1);
    formData.append('anwser2', a2);
    formData.append('anwser3', a3);
    formData.append('csrfmiddlewaretoken', csrftoken);
    
    fetch('apply', {
      mSOLod: 'POST',
      headers: {'X-CSRFToken': csrftoken},
      body: formData
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        if (result['code']==200){
        	document.getElementById("thankyou").innerHTML = "Thank you<br/>@"+twitter_name1;
	    	 $("#spin").css({ 'display' : 'none'});
		     $("#call-to-action2").css({ 'display' : ''});
		    document.getElementById("call-to-action1").style.display = "none";
		    document.getElementById("Application").style.display = "none";
        }else{
    	 $("#spin").css({ 'display' : 'none'});
    	 document.getElementById("error-message").innerHTML=result['message'];
		 document.getElementById("error-message").style.display = "block";
        }
    })
    .catch((error) => {
    	 $("#spin").css({ 'display' : 'none'});
    	 document.getElementById("error-message").innerHTML=result['message'];
		 document.getElementById("error-message").style.display = "block";
      console.error('Error:', error);
    });
    
}

ready(function(){
var current_fs, next_fs, previous_fs; //fieldsets
var opacity;

$(".next").click(function(){
    if(this.id=="twitter_done"){
//    	let url = document.getElementById('twitter_url_input').value;
//    	let url_ok = twitter_url_validator(url);
//    	if (!url_ok){
//    		document.getElementById('twitter_url_input').value = "Please check your twitter url and try again.";
//    		return false;
//    	}
		twitter_name1 = document.getElementById('twitter_name_input').value;
		discord_name1 = document.getElementById('discord_name_input').value;
		if(twitter_name1 == '' || discord_name1==''){
			return false;
		}

    }else if (this.id=="expertise_next"){
    	if (user_expertise==''){
    		return false;
    	}
    }
    
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    
    //Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
    //show the next fieldset
    next_fs.show(); 
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            next_fs.css({'opacity': opacity});
        }, 
        duration: 600
    });
});

$(".previous").click(function(){
    
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            previous_fs.css({'opacity': opacity});
        }, 
        duration: 600
    });
});

$('.radio-group .radio').click(function(){
    $(this).parent().find('.radio').removeClass('selected');
    $(this).addClass('selected');
    console.log($(this).data('value'));
    user_expertise = $(this).data('value');
    document.getElementById("question1_q").innerHTML="1. With only a limited number of Advisory spots available, tell us what you bring to the table as a "+user_expertise+" and your experience.";
});

$(".submit").click(function(){
	a3 = document.getElementById('question3').value;
	a3 = a3.trim();
	if (a3==''){
		return false;
	}
    	
    submit_anwser();

});

});

