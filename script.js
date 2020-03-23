
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

function showValue1(newValue) { 
	document.getElementById("monday").innerHTML= newValue;
}

function changeRangeValue(val){
	document.getElementById("range").value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10);
	showValue1(val);
}

function changeInputValue(val){
	document.getElementById("number").value = isNaN(parseInt(val, 0)) ? 0 : parseInt(val, 0);
	showValue1(val*10);
}

$('.radio').change(function() {
  $('#custom_amount').prop('disabled', !$(this).is('.other'));
});

$(document).ready(function() {
	$(".text").hide();
	$("#r1").click(function() {
		$(".text").show();
	});
	$("#r2").click(function() {
		$(".text").hide();
	});
});

$("input[name=chk]").change(function(){
	var max= 3;
	if( $("input[name=chk]:checked").length == max ){
			$("input[name=chk]").attr('disabled', 'disabled');
			$("input[name=chk]:checked").removeAttr('disabled');
	}else{
			 $("input[name=chk]").removeAttr('disabled');
	}
})

function myFunction() {
  document.getElementById("myForm").submit();
}