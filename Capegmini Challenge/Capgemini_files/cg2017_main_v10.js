

/***
 * This script is intended to provide all client side functionality 
 * required for CG Project
 * 
 * Author   : Sebin Baby
 * Created  : 5 Feb, 2017
 */
Cg_CommonFunction = new function () {
    var $instance = this;
    $instance.init = function () {
        
        var loc = window.location.href.split('/');
        var page = loc[loc.length - 1];
        $('#sub-header nav ul li').each(function (i) {
            var href = $(this).attr('id');
            if (href.indexOf(page) !== - 1) {
                $('#sub-header nav ul li.active').removeClass('active');
                    $(this).addClass('active');
                    return false;
                }
        });
		
		$("#search-form .category-lists .dropdown-menu li a").click(function(){
            $('#search-form .category-lists .dropdown-menu li').removeClass('active');
            $(this).parent().addClass('active');
			var menuIcon = $(this).find('span').html();
			var category_name = $(this).data('category');
			var category_full_name = $(this).text();
			$('#search_team').attr('placeholder', 'Search by '+category_full_name.toLowerCase());
			$("#category_name").val(category_name)
			$("#search-form .category-menu .icons").html(menuIcon);
			
		});
        
		$(".landing-page #header").addClass("landing-header");			
		
		$(".smooth-scroll").click(function() {
            var href = $(this).attr('href');
            $(href).addClass("active");
			
			if ($(window).width() < 767) {
				$('html, body').animate({
					scrollTop: $(href).offset().top - 45
				}, 1000);
			}else{
				$('html, body').animate({
					scrollTop: $(href).offset().top - 65
				}, 1000);
			}
        });
		
		$(".form1 .select select").each(function(){
			if($(this).find("option").hasClass("selected-option")){
				$(this).css('color','#555555');
			}
		});
		
		$(document).on("click", "#review-form .nicEdit-main", function() {
			
			var blogTest = "Enter description";
			var getBlock = $(this).html();
			var getBlock = getBlock.replace("<br>", "");
			if(getBlock == blogTest) {
				$(this).html("");		
			}else if(getBlock != ''){
				$(this).addClass("active")
			}else{
				$(this).html("Enter description");
				$(this).removeClass("active")
			}
			
		});
		
		$('.form1 .select select').change(function() {
			 var current = $(this).val();
			 
			  if (current != "") {
				  $(this).css('color','#555555');
			  } else {
				  $(this).css('color','#999999');
			  }
		});
		
		$(document).on("click",".section1 .checkboxes .checkbox label", function(){ 
			$(this).parent().toggleClass("active");
		});
		
		$(document).on('click','#main-navigations .menu-btn',function(){
			if ($(window).width() < 767) {
				$("#main-navigations > ul").height($(window).height()-45)
			}
        });
		
		$(document).on('click','#editor-box .expand-collapse-btn',function(){

			if($('#full-screen-question').hasClass('expanded')){
				$("body").css("overflow", "hidden");
				
			}else{  
				$("body").css("overflow", "visible");
	
			}
			
		});	
		
		$(document).on("click", ".show-hide-lnk", function() {
			var moretext = "Read More";
			var lesstext = "Show Less";	
			
			if($(this).hasClass("less")) {
				$(this).removeClass("less");
				$(this).html(moretext);
			} else {
				$(this).addClass("less");
				$(this).html(lesstext);
			}
			$(this).prev('.hidden-txt').toggle();
			return false;
		});
		
		$(document).on("click", ".show-hide-lnk1", function() {
			var moretext = "View All";
			var lesstext = "View Less";	
			
			if($(this).hasClass("less")) {
				$(this).removeClass("less");
				$(this).html(moretext);
			} else {
				$(this).addClass("less");
				$(this).html(lesstext);
			}
			$(this).prev('ol').find('.hidden-txt').toggle();
			return false;
		});
		
		$(document).on('click','#sub-header .invite-section > p .btn',function(){
			$(this).addClass("active");
			$("#cg-invite, .page-overlay2").show();
        });
		
		var windowHeight = window.innerHeight;
		$("#page-overlay2").height(windowHeight);
		$("#content").css("min-height",windowHeight - ($("#header").innerHeight() + $("#footer").innerHeight() + $("#coding-platform-head").innerHeight()));
		$("#coding-content-area .inner-coding-area, #online-submission-form").css("min-height",windowHeight - ($("#header").innerHeight() + $(".coding-footer").innerHeight()));
		
		$(window).resize(function() {
			var windowHeight = window.innerHeight;
			$("#content").css("min-height",windowHeight - ($("#header").innerHeight() + $("#footer").innerHeight()));	
			$("#coding-content-area .inner-coding-area, #online-submission-form").css("min-height",windowHeight - ($("#header").innerHeight() + $(".coding-footer").innerHeight()));
		});
		
		var topUrl = (window.location).href;
		var koopId = topUrl.split('#');

        setTimeout(function(){
			if(koopId[1] != 'undefined' || koopId[1] != ''){
			$('a[href*='+koopId[1]+']').each(function() {	
				$(this).trigger('click');
				return false;
			});
			}
        }, 500);
		
		$(document).on('click','#cg-invite .close',function(){
			$("#sub-header .invite-section > p .btn").removeClass("active");
        });
		
		$(document).on('click','#forgot-password-lnk',function(){
			$("#forgot-password, .page-overlay2").show();
        });
		
		$(document).on('click','.popover .close',function(){
			$(".page-overlay2").hide();
			$(this).parent().hide();
        });
		
		if ($(window).width() < 767) {
			var totalWidthCount2 = GetWidths('.domain-tab .nav-tabs > li');
			
			function GetWidths(id) {
				var i = 0;

				$(id).each(function (index) {
					i += parseInt($(this).innerWidth() + 12);
				});

				return i;
			}
			
			$(".domain-tab .nav-tabs").width(totalWidthCount2);
			
			$(".domain-tab .nav-tabs-wrap").width($(window).width() - 20);

			$(window).resize(function() {
				$(".domain-tab .nav-tabs-wrap").width($(window).width() - 20);
			});
		}
		
		$(window).scroll(function() {
			var windowScroll = $(window).scrollTop();
			var topScroll = $("#header").innerHeight();
			
			if (windowScroll > topScroll) {
				$(".landing-page #header").removeClass('landing-header');

			} else {
				$(".landing-page #header").addClass('landing-header');
			}
			
			if ($(window).width() > 767) {
				if (windowScroll > topScroll) {
					$(".question-page").addClass('fixed-contents');

				} else {
					$(".question-page").removeClass('fixed-contents');
				}
			}
			
			if (windowScroll > 0) {
				$("#sub-header .countdown h5").hide();

			} else {
				$("#sub-header .countdown h5").show();
			}
			
			if(windowScroll > 300){
				 $("#side-social").fadeIn();	  
			} else {
				$("#side-social").fadeOut();
			}

		});
        $('#forgot-password-lnk').on('click', function(){
            $('#activity_email_forget').show();
            $('.success-msg').text('').show(); 
        })
		
		
		// External User PopUp Import Uncheck action
		$('.checkbox-input #usemy-external_data').click(function () {
			if (!$(this).is(':checked')) {
				Cg_CommonFunction.saveResponseNRefreshCookiesForEXTERNALPopUP();
				$("#external-data-register-popup").modal('hide');
			}
		});
		
		// Take External User password and process
		$(document).on('click','#open-external_data-password',function(){
            var password = $.trim($("#external_data_user_pwd").val());
			password = (typeof password === "undefined") ? "" : password;
			
			if(password==''){
				$('#err_external_data_user_pwd').show().html('Please provide your password first!');
				return false;
			}
			
            $.ajax({
				type: "POST",
				url: base_url + "/general_ajax_task.php",
				data: { 'action': 'VERIFY_EXTERNAL_DATA_user_password', 'password' : password,'src_type' : 'CG'},
				success: function(data) {
					var tmp_data = data.split('||##||');
					
					if($.trim((tmp_data[0])) == 'success') {
						window.location.href=tmp_data[1];
					} else {
						$('#err_external_data_user_pwd').show().html(tmp_data[1]);
					}
				}
				});
        });
		// External User PopUp

	}
	
	$instance.saveResponseNRefreshCookiesForEXTERNALPopUP = function() {
        var url = base_url + '/general_ajax_task.php?action=save_external_popup_response';
        $.post(url, null, function(data) {
            data = $.trim(data);
            if (data == 'Y') {
                //
            }
        });
        return false;
    };
	
	$instance.reSetPassword = function(source_input, url_val) { 
        $('.error_msg').text('').hide(); 
			var err = false;
			var user_email = $.trim($('#reset_email').val());
			var companyName = $.trim($('#companyName').val());
			companyName = (typeof companyName === "undefined") ? "" : companyName;
			var ajax_url = base_url+"/general_ajax_task.php?action=reset_ajax_password&companyName="+companyName;
			
			var login_source_input = source_input;
			var red_url_val = url_val;
			
			login_source_input = (typeof login_source_input === "undefined") ? "CW" : login_source_input;
			red_url_val = (typeof red_url_val === "undefined") ? "codewizards" : red_url_val;
			
			var source_type = login_source_input;
			var companyUrl = $.trim($('#company_page_url').val());
			$("#tmp_msg").css('display','none');
			
			if(!user_email) {
                $('.error_msg').text('Please enter valid email ID!').show();
				$('#err_reset_email').show();	
				err = true;
			} 
			
			if(!err){
				$.post(ajax_url, {user_email:user_email,source_type:source_type, companyUrl:companyUrl, url_val:url_val}, function(data){
					data = $.trim(data);
					$instance.clearMessage();
					if(data == 'Y') {
                        $('.success-msg').text('Password reset mail has been sent!').show(); 
                        $('#activity_email_forget').hide();
                        $('#reset_email').val('');
						setTimeout(function(){$(".popover .close").trigger( "click" );}, 2000);
					} else if(data == 'INVEMAIL') {
						$('.error_msg').text('Please provide valid email ID!').show(); 
						$('#err_reset_email').show();					
						return false;
					} else if(data == 'E') {
                        $('.error_msg').text('You have exceeded the maximum mail sending limit for a day!').show(); 
						return false;
					} else if(data == 'N') {
                        $('.error_msg').text('Please provide valid email ID!').show(); 
						$('#err_reset_email').show();
						return false;
					} else {
						//
					}
				});

			}
			return false;
			
		};
	$instance._custom_poplayer2 = function () {
		$("#page-overlay1").css("display","table");
	};
    
    //google share
	$instance.google_share = function (link_url) {
		var url = 'https://plus.google.com/share?url='+link_url;
		window.open(url, 'sharer', 'toolbar=0,status=0,width=548,height=425');
		return true;
	};

	$instance.twitter_share = function(title, link_url) {
		if((title == '') && ($('#share_title').val() != '')) {
				title = $('#share_title').val();
		}
		var url = 'http://twitter.com/home/?status='+title+' '+link_url;
		window.open(url, 'sharer', 'toolbar=0,status=0,width=548,height=425');
		return true;
	};
	
	$instance.generic_social_share = function(e) {
        return window.open(e, "sharer", "toolbar=0,status=0,width=548,height=425"), !0
    };

	$instance.linkedin_share = function(title, link_url, summary) {
		if((title == '') && ($('#share_title').val() != '')) {
				title = $('#share_title').val();
		}
		var url = 'http://www.linkedin.com/shareArticle?mini=true&url='+link_url+'&title='+title+'&summary='+summary+'&source='+link_url;
		window.open(url, 'sharer', 'toolbar=0,status=0,width=548,height=425');
		return true;
	};

	$instance.cgInvite = function(){
		$.getScript(base_url+"/Themes/Release/javascript/multiple-emails.js")
			.done(function () {
				$('#invite_email_id').multiple_emails({position: "top"});
				
				//Shows the value of the input device, which is in JSON format
				$('#current_emailsBS').text($('#invite_email_id').val());
				$('#invite_email_id').change( function(){
					$('#current_emailsBS').text($(this).val());
				});
				
			})
			.fail(function () {
				console.log('multiple-emails not loaded');
			});
	};
	
	$instance.cgLeaderInvite = function(){
        
      $.getScript(base_url+"/Themes/Release/javascript/multiple-emails.js")
			.done(function () {
				$('#invite_email_ids').multiple_emails({position: "top"});
				
				//Shows the value of the input device, which is in JSON format
				$('#current_emailsBS').text($('#invite_email_id').val());
				$('#invite_email_id').change( function(){
					$('#current_emailsBS').text($(this).val());
				});
				
			})
			.fail(function () {
				console.log('multiple-emails not loaded');
			});
        
        
		
	};
	
	
	 $instance.winnerOnepage = function() {
        $.getScript(base_url + "/Themes/Release/javascript/onepagenav.js")
            .done(function() {
				$('#semifinal-nav ul').onePageNav({
						currentClass: 'active',
						scrollOffset:160,
						scrollThreshold: 0.01,
						changeHash: false,
						filter: ':not(.external)'
					});
				
            })
            .fail(function() {
                console.log('OnePageNav not loaded');
            });
    };

	
	$instance.cg_activity_invite_mail=function() {
			var user_email = $('#invite_email_id').val();
			var share_type = $.trim($('#share_type').val());
			var custom_title = $.trim($('#custom_title').val());
			var custom_value = $.trim($('#custom_value').val());
			var captcha_check = $.trim($('#captcha_check').val());
			var event_id = $.trim($('#event_id').val());
			event_id = (typeof event_id === "undefined") ? false : event_id;
			
			var _inv_ajax_url = base_url+'/ajax_files/send_activity_invitation.php?action=send_external_mail';
			$.post(_inv_ajax_url, {'_mail_id':user_email,'share_type':share_type, 'custom_title':custom_title, 'custom_value':custom_value, 'captcha_check':captcha_check, 'event_id':event_id, 'input_type':'json'}, function(data){
				console.log('data => '+data);
				if(data == 1) {
					$('.success-msg').text('Invitation successfully sent!').show(); 
                    $('#activity_email_invite').hide();
                    $('.multiple_emails-ul li').remove();
                    $('#current_emailsBS').text('');
					setTimeout(function(){$(".popover .close").trigger( "click" );}, 1000);
					
				} else if(data == 2) {
					$('.error_msg').text('Email id can not be empty!').show(); 
				} else if(data == 3) {
					$('.error_msg').text('You have reached your referral limit!').show();
				} else if(data == 4) {
					$('.error_msg').text('You have reached your daily mail sending limit!').show();
				} else if(data == 5) {
					$('.error_msg').text('Please provide valid email ids!').show();
				} else if(data == 6) {
					$('.error_msg').text('You already sent invitation!').show();
				} else {
					$('.error_msg').text('Error while sending invitation!').show();
				}
				Tg_CommonFunction.clearMessage();
				
			}); 
		}
	
	$instance.countDown = function(){
		$.getScript(base_url+"/Themes/Release/javascript/cg2016_jquery.countdown")
			.done(function () {
				$('.countdown .alt-1').countDown({
					css_class: 'countdown-alt-2'
				});
			})
			.fail(function () {
				console.log('countDown not loaded');
			});
	};
	
	$instance.clearMessage = function () {     
		setTimeout(function(){ 
			$('.message-box').css('right',-390); 
			$('.message-box').removeClass('success-msg').removeClass('warning-msg').removeClass('error-msg').removeClass('info-msg');
		}, 10000);
	};
	
	$instance.validateNeedHelp = function() {
		
	var category = $('#category :selected').val();
	var fullname = $('#fullname').val();
	var email = $('#email').val();
	var mobile = $('#mobile').val();
	var message = $('#message').val();
	var txtCaptcha = $('#txtCaptcha').val();
	var event_id = $('#event_id').val();
	var user_id = $('#user_id').val();
	$("#error_msg").hide();
	$('#category').parent().removeClass("has-error");
	$('#fullname').parent().removeClass("has-error");
	$('#email').parent().removeClass("has-error");
	$('#mobile').parent().removeClass("has-error");
	$('#message').parent().removeClass("has-error");
	$('#txtCaptcha').parent().removeClass("has-error");
	$('#category').parent().find(".error_msg").hide();
	$('#fullname').parent().find(".error_msg").hide();
	$('#email').parent().find(".error_msg").hide();
	$('#mobile').parent().find(".error_msg").hide();
	$('#message').parent().find(".error_msg").hide();
	$('#txtCaptcha').parent().find(".error_msg").hide();
	
	if(category==''){
		$('#category').parent().addClass("has-error");
		$('#category').parent().parent().find(".error_msg").show().html("Please select category.");
		return false;
	}
	if(fullname==''){
		$('#fullname').parent().addClass("has-error");
		$('#fullname').parent().find(".error_msg").show().html("Please enter your name.");
		return false;
	}
	if(email==''){
		$('#email').parent().addClass("has-error");
		$('#email').parent().find(".error_msg").show().html("Please enter your email id.");
		return false;
	}
	
	if(mobile==''){
		$('#mobile').parent().addClass("has-error");
		$('#mobile').parent().find(".error_msg").show().html("Please enter your contact No.");
		return false;
	}
	if(message==''){
		$('#message').parent().addClass("has-error");
		$('#message').parent().find(".error_msg").show().html("Please enter your message.");
		return false;
	}
	
	if(txtCaptcha==''){
		$('#txtCaptcha').parent().addClass("has-error");
		$('#txtCaptcha').parent().find(".error_msg").show().html("Please enter captcha.");
		return false;
	}
	
	var ajax_url = base_url+"/ajax_files/event_dashboard.php?category="+category+"&fullname="+fullname+"&email="+email+"&mobile="+mobile+"&message="+message+"&txtCaptcha="+txtCaptcha+"&user_id="+user_id+"&event_id="+event_id;
	var formData = new FormData();
	formData.append('action', 'needhelp');
		$.ajax({
		url: ajax_url, // Url to which the request is send
		type: "POST",             // Type of request to be send, called as method
		data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
		contentType: false,       // The content type used when sending data to the server.
		cache: false,             // To unable request pages to be cached
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		success: function(data)   // A function to be called if request succeeds
		{		
			var myArray  = jQuery.parseJSON(data);
			if(myArray.status=='Failure'){
				$('.msgErrortop .message-box').addClass('error-msg').find('p').text(myArray.msg); 
			} else {
				$("#error_msg").hide();
				$('#category').val('');
				$('#message').val('');
				$('#txtCaptcha').val('');
				$('.msgErrortop .message-box').addClass('success-msg').find('p').text('Your need help query posted successfully!!'); 
			}
						return false;
			
			}
		});
	 
	};
	
	$instance.landingPageNav = function() {
        $.getScript(base_url + "/Themes/Release/javascript/onepagenav.js")
            .done(function() {
				
				if ($(window).width() < 767) {
					$('.landing-page #main-navigations ul').onePageNav({
						currentClass: 'active',
						scrollOffset:45,
						scrollThreshold: 0.01,
						changeHash: false,
						filter: ':not(.external)'
					});
				}else{
					$('.landing-page #main-navigations ul').onePageNav({
						currentClass: 'active',
						scrollOffset:65,
						scrollThreshold: 0.01,
						changeHash: false,
						filter: ':not(.external)'
					});
				}
            })
            .fail(function() {
                console.log('landingPageNav not loaded');
            });
    };
	
	$instance.prettyPhoto = function() {
		 $.getStylesheet(base_url + "/Themes/Release/prettyPhoto.css")
		 $.getScript(base_url + "/Themes/Release/javascript/jquery.prettyPhoto.js")
            .done(function() {
                $("a[rel^='prettyPhoto']").prettyPhoto();
            })
            .fail(function() {
                console.log('prettyPhoto not loaded');
            })
        
    };
	
	$instance.BootstrapSwitch = function(name) {
        $.getStylesheet(base_url + "/Themes/Release/bootstrap-switch.min.css")
        $.getScript(base_url + "/Themes/Release/javascript/bootstrap-switch.min.js")
            .done(function() {				
				 $(name).bootstrapSwitch();
            })
            .fail(function() {
                console.log('bootstrapSwitch not loaded');
            })
    };
	
}; 

/***
 * This script is intended to provide all client side functionality 
 * required for CG Project
 * 
 * Author   : Sebin Baby
 * Created  : 16 Feb, 2017
 */
Cg_Team = new function () {
    var $instance = this;
    $instance.init = function () {
		
		$(document).on('click','#team-header .team-info .textbox .edit-name, #team-header .team-info .choose-team-name',function(){
			$("#team-header .team-info .textbox .form-control").removeAttr("readonly").focus();
			$("#team-header .team-info .choose-team-name").hide();
			$("#team-header .team-info input[type='button']").show();
        });
		
	
	$(document).on("click",".manage_request", function(){ 
		
		var id = $(this).data('id');
		var status = $(this).data('status');
		var team_id = $('#team-manage-receive-requests #team_id').val();

		var action_url = base_url+'/ajax_files/saas_candidate_function.php?action=update_invite_receive_flag';
		
		$.post(action_url,{'id':id, 'status':status, 'team_id':team_id}, function(response) {
				var msg = $.parseJSON(response); 
				if(msg.status == 'success') {
					if(status == 1) {
						$('#invite_receive_user_reject_' +id ).remove();
						$('#invite_receive_user_accept_' +id ).removeClass('manage_request button1');
						$('#invite_receive_user_accept_' +id ).addClass('request-sent');
						$('#invite_receive_user_accept_' +id ).text('Accepted');
                        window.location.reload();
					} else {
						$('#invite_receive_user_accept_' +id ).remove();
						$('#invite_receive_user_reject_' +id ).removeClass('manage_request button3');
						$('#invite_receive_user_reject_' +id ).addClass('request-sent');
						$('#invite_receive_user_reject_' +id ).text('Rejected');
					}
				} 
		});
	});
	
	$(document).on("click",".manage_request_receive", function(){ 
		
		var id = $(this).data('id');
		var status = $(this).data('status');

		var action_url = base_url+'/ajax_files/saas_candidate_function.php?action=update_invite_receive_request_flag';
		
		$.post(action_url,{'id':id, 'status':status}, function(response) {
				var msg = $.parseJSON(response); 
				if(msg.status == 'success') {
					if(status == 1) {
						$('#team-manage-user_receive-requests  #invite_receive_user_reject_' +id ).remove();
						$('#team-manage-user_receive-requests  #invite_receive_user_accept_' +id ).removeClass('manage_request_receive button1');
						$('#team-manage-user_receive-requests  #invite_receive_user_accept_' +id ).addClass('request-sent');
						$('#team-manage-user_receive-requests  #invite_receive_user_accept_' +id ).text('Accepted');
                        window.location.reload();
					} else {
						$('#team-manage-user_receive-requests  #invite_receive_user_accept_' +id ).remove();
						$('#team-manage-user_receive-requests  #invite_receive_user_reject_' +id ).removeClass('manage_request_receive button3');
						$('#team-manage-user_receive-requests  #invite_receive_user_reject_' +id ).addClass('request-sent');
						$('#team-manage-user_receive-requests  #invite_receive_user_reject_' +id ).text('Rejected');
					}
				} 
		});
	});
	
	$('#save_team').click (function () {
		
		$( "#team-header .team-info .success_msg").remove();
		$( "#team-header .team-info .error_msg").remove();
		
		var team_name = $('input[name=team_name]').val();
		var team_for = $('input[name=team_for]').val();
		var season_id = $('input[name=season_id]').val();
		var team_id = $(this).data('team_id');
		var action_url = base_url+'/ajax_files/saas_candidate_function.php?action=save_team_name';
		
		$.post(action_url,{'team_name':team_name, 'team_id':team_id, 'team_for':team_for, 'season_id':season_id}, function(response) {
			var msg = $.parseJSON(response); 
				if(msg.status == 'success') {
					$( "<span class='success_msg'> "+msg.msg+" </span>" ).insertAfter("#team-header .team-info input[type='button']");
                    window.location.reload();
				} else {
					$( "<span class='error_msg'> "+msg.msg+" </span>" ).insertAfter("#team-header .team-info input[type='button']");
				}
		});
	});
	
	$("[name='looking-for-request']").on('change', function() {
		
		var team_id = $(this).data('team_id');
		var flag = $(this).is(":checked");

		var action_url = base_url+'/ajax_files/saas_candidate_function.php?action=save_membership_flag';
		
		$.post(action_url,{'flag':flag, 'team_id':team_id}, function(response) {
			var msg = $.parseJSON(response); 
				if(msg.status == 'success') {
					//$( "<span class='success_msg'> "+msg.msg+" </span>" ).insertAfter("#team-header .team-info input[type='button']");
				} else {
					//$( "<span class='error_msg'> "+msg.msg+" </span>" ).insertAfter("#team-header .team-info input[type='button']");
				}
		});
		
	}); 
	
	$('#include_personal_message').click (function () {
			if($(this).is(":checked")) {
				$("#invite-to-join textarea").show();
				$("#invite-to-join label").text('Personalized message (upto 100 words)');
			} else {
				$("#invite-to-join textarea").hide();
				$("#invite-to-join label").text('Include personal message');
			}
	});
	
	
	$('#send_personal_invitation').click (function () {
		
		$( "#invite-to-join .success_msg").remove();
		$( "#invite-to-join .error_msg").remove();
		var team_id = $(this).data('team_id');
		$('#send_personal_invitation').addClass('disabled');
		
		var email_ids = $('#invite_email_ids').val();
		var message = $('#invite_personal_message').val();
		var action_url = base_url+'/ajax_files/saas_candidate_function.php?action=send_personal_invitation';
		
		$.post(action_url,{'message':message, 'email_ids':email_ids, 'team_id':team_id}, function(response) {
			var msg = $.parseJSON(response); 
				if(msg.status == 'success') {
					$( "<span class='success_msg'> "+msg.msg+" </span>" ).insertAfter("#invite-to-join .multiple_emails-container");
					$('#invite_email_ids').val('');
                    $('#invite_personal_message').val('');
                    $('.multiple_emails-ul li').remove();
                    $('#current_emailsBS').text('');
				} else {
					$( "<span class='error_msg'> "+msg.msg+" </span>" ).insertAfter("#invite-to-join .multiple_emails-container");
				}
				$('#send_personal_invitation').removeClass('disabled');
		});
	});
	
	$('#invite-team-members #search_team').keydown(function(event){ 
        var keyCode = (event.keyCode ? event.keyCode : event.which);   
        if (keyCode == 13) {
            $('#search-team-val').trigger('click');
        }
    });
    
	$('#invite-team-members #search-team-val').click (function () {
				//var page = $('#invite-team-members #page_number').val();
				var page = 1;
				var team_id = $('#invite-team-members #team_id').val();
				var season_id = $('#invite-team-members #season_id').val();
                
                 var key_val  = $("#search-form .category-lists .dropdown-menu li.active a").text();
                                
                var keyword = $('#invite-team-members #search_team').val();
                var action_file_url = base_url + '/ajax_files/invite_other_members.php?team_id='+team_id+'&season_id='+season_id+'&page_no=' + page + '&keyword=' + keyword+ '&key_val=' + key_val.toLowerCase() ;
                
				$('#invite-team-members #search-form .error_msg').remove();
				
				$('#invite-team-members .table7 tr.ajax_loading_data').remove();
				$('#invite-team-members #no_more_user .no-more-contents').remove();
				
				$('#invite-team-members #ViewMore').hide();
				$('#invite-team-members #ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();

                
                
                
				$.ajax({
					type: "POST",
					url: action_file_url,
					data: ({}),
					success: function(data) {
						data = $.trim(data);
						if (data == 'no_record') {
							$('#invite-team-members #no_more_user').html('<p class="no-more-contents">No users to display.</p>');
							$('#invite-team-members #search-form .error_msg').remove();
							$('#invite-team-members #ViewMore').hide();
							$('#invite-team-members #ajax_previous_contest').html('');
						} else {
                           
                            $('#invite-team-members .table7 tr.ajax_loading_data').remove();
                            $('#invite-team-members #no_more_user .no-more-contents').remove();
                            $('#invite-team-members .ajax_previous_contest').html('');
                            $(data).insertBefore('#invite-team-members .ajax_previous_contest');
							page++;
							$('#invite-team-members #page_number').val(page);
							$('#invite-team-members #ajax_previous_contest').hide();
							$('#invite-team-members #ViewMore').show();
						}
					}
				});
				
			
			
	});
	
    
    $('#join-team #search_team').keydown(function(event){ 
        var keyCode = (event.keyCode ? event.keyCode : event.which);   
        if (keyCode == 13) {
            $('#search-team-val').trigger('click');
        }
    });
	
	$('#join-team #search-team-val').click (function () {
		
				var page = 1;
				var keyword = $('#join-team #search_team').val();
            
                var key_val  = $("#search-form .category-lists .dropdown-menu li.active a").text();
                
				$('#join-team #search-form .error_msg').remove();
				var season_id = $('#season_id').val();
				$('#join-team .box-default').remove();
				$('#join-team #no_more_user .no-more-contents').remove();
				
				$('#join-team #ViewMore').hide();
                $('#competitive-teams #ViewMore').hide();
				$('#join-team #ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
				
                var action_file_url = base_url + '/ajax_files/team_join_teams.php?page_no=' + page + '&keyword=' + keyword+ '&key_val=' + key_val.toLowerCase() ;
				$.ajax({
					type: "POST",
					url: action_file_url,
					data: ({season_id:season_id}),
					success: function(data) {
						data = $.trim(data);
						if (data == 'no_record') {
							$('#join-team #no_more_user').html('<p class="no-more-contents">No teams to display.</p>');
							$('#join-team #search-form .error_msg').remove();
							//$( "<span class='error_msg'> Name not found. Try another? </span>" ).insertAfter("#join-team #search-form div");
							$('#join-team #ViewMore').hide();
                            $('#competitive-teams #ViewMore').hide();
							$('#join-team #ajax_previous_contest').html('');
						} else {
                            $('#join-team .box-default').remove();
                            $('#join-team #no_more_user .no-more-contents').remove();
							$(data).insertBefore('#join-team .ajax_previous_contest');
							page++;
							$('#join-team #page_number').val(page);
							$('#join-team #ajax_previous_contest').hide();
							$('#join-team #ViewMore').show();
                            $('#competitive-teams #ViewMore').show();
						}
					}
				});
				
			
	});
	
    $('#competitive-teams #search_team').keydown(function(event){ 
        var keyCode = (event.keyCode ? event.keyCode : event.which);   
        if (keyCode == 13) {
            $('#competitive-teams #search-team-val').trigger('click');
        }
    });
	
	$('#competitive-teams #search-team-val').click (function () { 
			var page = 1;
			var keyword = $('#competitive-teams #search_team').val();
			var team_id = $('#competitive-teams #team_id').val();
			var season_id = $('#competitive-teams #season_id').val(); 
            var key_val  = $("#search-form .category-lists .dropdown-menu li.active a").text()
			$('#competitive-teams #search-form .error_msg').remove();
			
				$('#competitive-teams .box-default').remove();
				$('#competitive-teams #no_more_user .no-more-contents').remove();
				
				$('#competitive-teams #ViewMore').hide();
				$('#competitive-teams #ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
				var action_file_url = base_url + '/ajax_files/team_join_teams.php?type=competetive&page_no=' + page + '&team_id=' + team_id + '&keyword=' + keyword+'&key_val='+key_val.toLowerCase();
				$.ajax({
					type: "POST",
					url: action_file_url,
					data: ({season_id:season_id}),
					success: function(data) {
						data = $.trim(data);
						if (data == 'no_record') {
                            $('#competitive-teams .box-default').hide();
							//$('#competitive-teams #no_more_user').html('<p class="no-more-contents">No teams to display.</p>');
							$('#competitive-teams #search-form .error_msg').remove();
							$( "<span class='error_msg'> Name not found. Try another? </span>" ).insertAfter("#competitive-teams #search-form > div");
							$('#competitive-teams #ViewMore').hide();
                            $('#competitive-teams #ajax_previous_contest').hide();
							
						} else {
                            $('#competitive-teams .box-default').remove();
                           // $('#competitive-teams #no_more_user .no-more-contents').remove();
							$(data).insertBefore('#competitive-teams .ajax_previous_contest');
							page++;
							$('#competitive-teams #page_number').val(page);
							$('#competitive-teams #ajax_previous_contest').hide();
							$('#competitive-teams #ViewMore').show();
						}
					}
				});
			
	});
	
	
	
		$(document).on('click','#invite-team-members .invite_recommended_member',function(){
				
				var team_id = $('#invite-team-members #team_id').val();
				var season_id = $('#invite-team-members #season_id').val();
				$(this).addClass('disabled');
				var user_id = $(this).data('user_id');
				var action_url = base_url+'/ajax_files/saas_candidate_function.php?action=invite_sent_recommended_members';
				$.ajax({
					type: "POST",
					url: action_url,
					data: ({'season_id':season_id, 'to_user_id':user_id, 'team_id':team_id}),
					success: function(response) {
						var msg = $.parseJSON(response); 
						if(msg.status == 'success') {
							$('#invite-team-members #recommended_member_'+user_id).html('<button type="button" class="btn button2 request-sent">Invited</button>');
                            window.location.reload();
						}
					}
				});				
				
        });
		
		
		$(document).on('click','#join-team .join_send_request',function(){
				
				var team_id = $(this).data('team_id');
                                var season_id = $(this).data('season_id');
				$(this).addClass('disabled');
				var action_url = base_url+'/ajax_files/saas_candidate_function.php?action=invite_join_team_request';
				$.ajax({
					type: "POST",
					url: action_url,
					data: ({'team_id':team_id, 'season_id':season_id}),
					success: function(response) {
						var msg = $.parseJSON(response); 
						if(msg.status == 'success') {
							$('#join-team #join_team_'+team_id).html('<button type="button" class="btn request-sent">Team Joined</button>');
                                                       window.location.reload();
						}
					}
				});				
				
        });
		
		
	
	
		
	}
	
	
	 $instance.LoadInvitedMember = function() {

        var page = $('#members-status #page_number').val();
        var team_id = $('#members-status #team_id').val();
        var season_id = $('#members-status #season_id').val();
        $('#members-status #ViewMore').hide();
        $('#members-status #ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/team_invite_members.php?page_no=' + page + '&team_id=' + team_id;
        $.ajax({
            type: "GET",
            url: action_file_url,
            data: ({season_id:season_id}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#members-status #no_more_user').html('<p class="no-more-contents">No more users to display.</p>');
                    $('#members-status #ViewMore').hide();
					$('#members-status #ajax_previous_contest').html('');
                } else {
                    $(data).insertBefore('#members-status .ajax_previous_contest');
                    page++;
                    $('#members-status #page_number').val(page);
                    $('#members-status #ajax_previous_contest').hide();
                    $('#members-status #ViewMore').show();
                }
            }
        });

    };
	
	$instance.LoadInvitedOtherTeamMember = function() {  
		var page = $('#invite-team-members #page_number').val();
        var team_id = $('#invite-team-members #team_id').val();
        var season_id = $('#invite-team-members #season_id').val();
        var key_val  = $("#search-form .category-lists .dropdown-menu li.active a").text();
                                
        var keyword = $('#invite-team-members #search_team').val();
        var action_file_url = base_url + '/ajax_files/invite_other_members.php?team_id='+team_id+'&season_id='+season_id+'&page_no=' + page + '&keyword=' + keyword+ '&key_val=' + key_val.toLowerCase() ;
        $('#invite-team-members #ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();

        $.ajax({
            type: "GET",
            url: action_file_url,
            data: ({keyword:keyword}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#invite-team-members #no_more_user').html('<p class="no-more-contents">No users to display.</p>');
                    $('#invite-team-members #ViewMore').hide();
					$('#invite-team-members #ajax_previous_contest').html('');
                } else {
                     $('#invite-team-members .ajax_previous_contest').html('');
                     $(data).insertBefore('#invite-team-members .ajax_previous_contest');
                    page++;
                    $('#invite-team-members #page_number').val(page);
                    $('#invite-team-members #ajax_previous_contest').hide();

                }
            }
        });
	};
	
	
	 $instance.LoadInvitedReceiveMember = function() { 

        var page = $('#team-manage-receive-requests #page_number').val();
        var team_id = $('#team-manage-receive-requests #team_id').val();
        var season_id = $('#team-manage-receive-requests #season_id').val();
        $('#team-manage-receive-requests #ViewMore').hide();
        $('#team-manage-receive-requests #ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/team_invite_receive_members.php?page_no=' + page + '&team_id=' + team_id + '&season_id='+season_id;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#team-manage-receive-requests #no_more_user').html('<p class="no-more-contents">No users to display.</p>');
                    $('#team-manage-receive-requests #ViewMore').hide();
                    $('#team-manage-receive-requests #ajax_previous_contest').html('');
                } else {
                    $(data).insertBefore('#team-manage-receive-requests .ajax_previous_contest');
                    page++;
                    $('#team-manage-receive-requests #page_number').val(page);
                    $('#team-manage-receive-requests #ajax_previous_contest').hide();
                    $('#team-manage-receive-requests #ViewMore').show();
                }
            }
        });

    };
	
	
	 $instance.LoadInvitedReceiveRequestMember = function() {

		var page = $('#team-manage-user_receive-requests #page_number').val();
        var season_id = $('#team-manage-user_receive-requests #season_id').val();
        $('#team-manage-user_receive-requests #ViewMore').hide();
        $('#team-manage-user_receive-requests #ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/team_invite_receive_request_members.php?page_no=' + page ;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({season_id:season_id}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#team-manage-user_receive-requests #no_more_user').html('<p class="no-more-contents">No users to display.</p>');
                    $('#team-manage-user_receive-requests #ViewMore').hide();
					$('#team-manage-user_receive-requests #ajax_previous_contest').html('');
                } else {
                    $(data).insertBefore('#team-manage-user_receive-requests .ajax_previous_contest');
                    page++;
                    $('#team-manage-user_receive-requests #page_number').val(page);
                    $('#team-manage-user_receive-requests #ajax_previous_contest').hide();
                    $('#team-manage-user_receive-requests #ViewMore').show();
                }
            }
        });

    };
	
	
	 $instance.LoadExistingTeams = function() {

        var page = $('#existing-teams #page_number').val();
		var season_id = $('#existing-teams #season_id').val();
		
        $('#existing-teams #ViewMore').hide();
        $('#existing-teams #ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/team_existing_teams.php?page_no=' + page;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({season_id:season_id}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#existing-teams #no_more_user').html('<p class="no-more-contents">No teams to display.</p>');
                    $('#existing-teams #ViewMore').hide();
					$('#existing-teams #ajax_previous_contest').html('');
                } else {
                    $(data).insertBefore('#existing-teams .ajax_previous_contest');
                    page++;
                    $('#existing-teams #page_number').val(page);
                    $('#existing-teams #ajax_previous_contest').hide();
                    $('#existing-teams #ViewMore').show();
                }
            }
        });

    };
	
	
	 $instance.LoadJoinTeams = function() {

		var page = $('#join-team #page_number').val();
		var season_id = $('#join-team #season_id').val();
		var user_id = $('#join-team #user_id').val();
        var key_val  = $("#search-form .category-lists .dropdown-menu li.active a").text();
		var keyword = $('#join-team #search_team').val();
        
        $('#join-team #ViewMore').hide();
			$('#join-team #ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
			var action_file_url = base_url + '/ajax_files/team_join_teams.php?page_no=' + page + '&keyword=' + keyword+ '&key_val=' + key_val.toLowerCase() ;
			$.ajax({
				type: "POST",
				url: action_file_url,
				data: ({season_id:season_id,user_id:user_id,key_val:key_val.toLowerCase()}),
				success: function(data) {
					data = $.trim(data);
					if (data == 'no_record') {
						$('#join-team #no_more_user').html('<p class="no-more-contents">No more teams to display.</p>');
						$('#join-team #ViewMore').hide();
						$('#join-team #ajax_previous_contest').html('');
					} else {
						$(data).insertBefore('#join-team .ajax_previous_contest');
						page++;
						$('#join-team #page_number').val(page);
						$('#join-team #ajax_previous_contest').hide();
						$('#join-team #ViewMore').show();
					}
				}
			});

    };
	
	 $instance.LoadCompetetiveTeams = function() {

			var page = $('#competitive-teams #page_number').val();
			var team_id = $('#competitive-teams #team_id').val();
			var season_id = $('#competitive-teams #season_id').val();
            var key_val  = $("#search-form .category-lists .dropdown-menu li.active a").text();
            var keyword = $('#competitive-teams #search_team').val();
			$('#competitive-teams #ViewMore').hide();
			$('#competitive-teams #ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
			//var action_file_url = base_url + '/ajax_files/team_join_teams.php?type=competetive&page_no=' + page + '&team_id=' + team_id;
            var action_file_url = base_url + '/ajax_files/team_join_teams.php?type=competetive&team_id=' + team_id+'&page_no=' + page + '&keyword=' + keyword+ '&key_val=' + key_val.toLowerCase() ;
			$.ajax({
				type: "POST",
				url: action_file_url,
				data: ({season_id:season_id,key_val:key_val.toLowerCase()}),
				success: function(data) {
					data = $.trim(data);
					if (data == 'no_record') {
						$('#competitive-teams #no_more_user').html('<p class="no-more-contents">No more teams to display.</p>');
						$('#competitive-teams #ViewMore').hide();
						$('#competitive-teams #ajax_previous_contest').html('');
					} else {
						$(data).insertBefore('#competitive-teams .ajax_previous_contest');
						page++;
						$('#competitive-teams #page_number').val(page);
						$('#competitive-teams #ajax_previous_contest').hide();
						$('#competitive-teams #ViewMore').show();
					}
				}
			});

    };
	
	
	
}; 

/***
 * This script is intended to provide all client side functionality 
 * required for CG Project
 * 
 * Author   : Sebin Baby
 * Created  : 16 Feb, 2017
 */
Cg_DashboardFunction = new function () {
    var $instance = this;
    $instance.init = function () {
		
	}
	
    $instance.checkUserParticipation = function(previous_season_id, parent_season_id, season_id) {

        $("div[id^='contestMsg_']").html('');
        var action_file_url = base_url + '/ajax_files/assessment_check_participation.php?previous_season_id=' + previous_season_id + '&parent_season_id=' + parent_season_id + '&season_id=' + season_id+'&event_name=' + event_url; 
        $.get(action_file_url, function(data) {
            data = $.trim(data);
            var msg = $.parseJSON(data);
            if (msg.status == 'success') {
                window.location.href = msg.url;
            } else {
				 $('.msgErrortop .message-box').addClass('warning-msg').find('p').html(msg.message); 
				 Tg_CommonFunction.clearMessage();
            }
        });
    };
	
	$instance.showTopRanker = function(season_id) {

        $("div[id^='topranker_']").html('');
		var event_page_url = $("#event_page_url").val();
        var action_file_url = base_url + '/ajax_files/event_dashboard.php?action=showTopRanker&season_id=' + season_id+"&event_page_url="+event_page_url;
        $.get(action_file_url, function(data) {
            $("div[id^='topranker_']").html(data);
            
        });
    };
	
	$instance.viewAllContest = function(event_id,user_id,activeNav) {

        $("div[id^='view_all_contest']").html('');
		var all_season_id = $("#all_season_id").val();

        var action_file_url = base_url + '/ajax_files/event_dashboard.php?action=viewAllContest&event_id='+event_id+'&user_id='+user_id+"&all_season_id="+all_season_id+"&activeNav="+activeNav;
        $.get(action_file_url, function(data) {
			$("div[id^='view_all_contest']").show();
			$("#viewothercontest").hide();
            $("div[id^='view_all_contest']").html(data);
            
        });
    };
	
	$instance.showOtherTopRanker = function(season_id) {

        $("div[id^='showothertopranker_']").html('');
		var event_page_url = $("#event_page_url").val();
        var action_file_url = base_url + '/ajax_files/event_dashboard.php?action=showTopRanker&season_id=' + season_id+"&event_page_url="+event_page_url;
        $.get(action_file_url, function(data) {
            $("div[id^='showothertopranker_']").html(data);
            
        });
    };

}; 


/***
 * EventRegisterFunction 
 * required for CG Project
 * 
 * Author   : Sebin Baby
 * Created  : 16 Feb, 2017
 */
Cg_EventRegisterFunction = new function () {

    var $instance = this;
    $instance.init = function () {
        $('.joint-theme-event').on('click',function(){
            var company_page_url = $(this).data('company_type');
            var event_name = $(this).data('event_name');
            var source = $(this).data('source');
            var casetype = $(this).data('casetype');
            var action_url = base_url + '/' + event_name + '/joinevent';
            $.post(action_url,{company_page_url: company_page_url, event_name: event_name, source:source, casetype:casetype},function(data) {
					var response = $.trim(data);
                    var response = $.parseJSON(response);
					window.location.href = response.url_path;
                    
				})
            
            
        });
        
	}
	
}

/***
 * EventRegisterFunction 
 * required for CG Project
 * 
 * Author   : Sebin Baby
 * Created  : 16 Feb, 2017
 */
Cg_TopRankersFunction = new function () {

    var $instance = this;
    $instance.init = function () {
        $instance.calculateLIsInRow();  
		
		$(document).on('click','.sub-navigation .dropdown-menu li a',function(){
			$(this).parent().remove();
			$(".sub-navigation > ul > li").removeClass("active");
			$(".sub-navigation > ul").prepend('<li class="active menu-item">' + $(this).parent().html() + '</li>');
			$(".sub-navigation .dropdown-menu").prepend('<li>' + $(".sub-navigation > ul > li.more-links").prev("li").html() + '</li>');
			$(".sub-navigation > ul > li.more-links").prev("li").remove();		
        });
		
		$(document).on('click','.sub-navigation > ul > li.menu-item a, .sub-navigation .dropdown-menu li a',function(){
			$("#table-rank").removeAttr('class').addClass('table3 ' + $(this).attr('class'));	
        });
		
	}
	
	$instance.calculateLIsInRow = function() {
        var lisInRow = 0;
        var maxInRow = 5;
		
		if ($(window).width() < 600) {
			maxInRow = 2;
		}else if ($(window).width() < 992) {
			maxInRow = 3;
		}else if ($(window).width() < 1200) {
			maxInRow = 4;
		}
		
        var total_li_count = $('.sub-navigation ul li').length;
        $('.sub-navigation > ul > li').each(function() {  
			if(lisInRow >= maxInRow && lisInRow < (total_li_count-1)) {
				$('.sub-navigation .dropdown-menu').append('<li>' + $(this).html() + '</li>');
				$(this).remove();
			}
			lisInRow++;

        });

        if((total_li_count-1) > maxInRow) {
            $('.sub-navigation ul li.more-links').show();
        }/*else if ((total_li_count-1) == maxInRow) {
            $('#other-contest .sub-navigation ul li.more-links').hide();
        }*/else{
			$('.sub-navigation ul li.more-links').hide();
		}
		
		$('.sub-navigation').css('overflow','visible');
    };
	
}


function getBestSubmission(){
	    var season_id = $("#season_id").val();
	    var event_id = $("#event_id").val();
		var action_file_url = base_url + '/ajax_files/event_dashboard.php?action=BestSubmission&season_id='+season_id+'&event_id='+event_id;
        $.get(action_file_url, function(data) {
			$("#best-submission").html(data);
            var BestSubmissionList = $('#BestSubmissionList option:selected').val();
			getleaderboarddetails(BestSubmissionList,event_id,season_id);
		});
	
}
function getleaderboarddetails(leader_id,event_id,season_id){
	   var event_id = $("#event_id").val();
       if(!$.trim(season_id)){
           var season_id = $("#season_id").val();
       }
       
	    var action_file_url = base_url + '/ajax_files/event_dashboard.php?action=showBestSubmission&leader_id='+leader_id+'&event_id='+event_id+'&season_id='+season_id;
        $.get(action_file_url, function(data) {
			$("#user_details").html('');
			$("#user_details").html(data);
            
        });
	
}

function getmcqleaderboarddetails(season_id,event_id){
	   
	    var action_file_url = base_url + '/ajax_files/event_dashboard.php?action=showmcqBestSubmission&season_id='+season_id+'&event_id='+event_id;
        $.get(action_file_url, function(data) {
			$("#best_submission_div, #best_submission_div1").html('');
			$("#best_submission_div, #best_submission_div1").html(data);
            
        });
	
}


Cg_HacakthonFunction = new function () {

    var $instance = this;
    $instance.init = function () {
        
    $(document).on('click', '#save-file-question-cg', function(){
        
        $('.clear_error').hide();
        $('.data-science-load').css('display','block');
        var question_id = $(this).data('question_id'); 
        var invitation_id = $(this).data('invitation_id');
        
        var platform_type = $('#platform_type').val(); 	
        var chapter_ppt_file = $('#chapter_ppt_fileddd').prop('files')[0];  
        
        var chapter_source_file = $('#chapter_source_file').prop('files')[0];  
        var exist_file_chapter_source_file = $('#exist_file_chapter_source_file').val();
        var exist_file_chapter_ppt_file = $('#exist_file_chapter_ppt_file').val();
        var project_title = $('#project_title').val();  
        var project_description = $('#project_description').val();
        var build_with = $('#build_with').val();
        var webcam_val = $('#webcam_enable').val(); 
        var team_name = $('#team_name').val();
        var team_id = $('#team_id').val();
        
        var chapter_predict_file_exists = $('#chapter_predict_file_exists').val();

        if(chapter_predict_file_exists != 'undefined' && chapter_predict_file_exists == 1){
                var chapter_predict_file = $('#chapter_predict_file').prop('files')[0];
                var exist_file_chapter_predict_file = $('#exist_file_chapter_predict_file').val();
        }
        
        var form_data = new FormData();                  
        form_data.append('chapter_ppt_file', chapter_ppt_file);     
        form_data.append('chapter_source_file', chapter_source_file); 
        form_data.append('question_id', question_id);   
        form_data.append('platform_type', platform_type);   
        form_data.append('invitation_id', invitation_id);   
        form_data.append('exist_file_chapter_source_file', exist_file_chapter_source_file);   
        form_data.append('exist_file_chapter_ppt_file', exist_file_chapter_ppt_file);   
        form_data.append('project_title', project_title);
        form_data.append('project_description', project_description);
        form_data.append('build_with', build_with);
        form_data.append('team_name', team_name);
        form_data.append('team_id', team_id);

        if(chapter_predict_file_exists == 1){
            form_data.append('chapter_predict_file', chapter_predict_file);
            form_data.append('exist_file_chapter_predict_file', exist_file_chapter_predict_file);
        }
        
        
        var page_number = $('#next_page_count').val(); 
        $("#save-file-question-cg").addClass( "disabled" );
        $("#save-file-question-cg").val("Submitting...");
        
        var contest_redirect_url = $('#test_action_url').val();
        
        try{
        
                $.ajax({
                    
                        url: base_url+'/ajax_files/event_dashboard.php?action=onlineHackathonSubmission', 
                        dataType: 'text',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form_data,                         
                        type: 'post',
                        success: function(data){
                            $('.data-science-load').css('display','none');
                                data = $.trim(data);
                                var msg = $.parseJSON(data); 
                                $("#save-file-question-cg").val( "Done, redirecting..." );
                                if(msg.status == 'error') {
                                    $.each(msg, function(key,value){
                                       if(key != 'status'){
                                           $('.error_msg_'+ key).html(value);
                                           $('.error_msg_'+ key).css('display','block');
                                       }
                                    });
                               $("#save-file-question-cg").removeClass( "disabled" );
                                } else if(msg.status == 'timeout') {
                                    alert('Contest Time is over. Click OK to see the result');
                                    $('#codejudge_requirement').submit();
                                } else if(webcam_val == 1) { 
                                    if(page_number != 'none') {
                                            var action_url = contest_redirect_url+'/ajax/'+invitation_id+'/'+page_number;
                                            $('.append-question-detail-ajax').load(action_url, function(responseTxt, statusTxt, xhr){
                                            });	
                                    } else {
                                            $("#save-file-question-cg").removeClass( "disabled" );
                                            $("#save-file-question-cg").val("Submit answer");
                                    }
                                } else if(msg.status == 'success' && page_number == 'none') {
                                    window.location.href = contest_redirect_url+'/'+invitation_id+'/1#submission';
                                } else if(msg.status == 'success') { 
                                    window.location.href = contest_redirect_url+'/'+invitation_id+'/'+page_number;
                                                            } 	
                        }
            });
        }catch(e){
            //alert(e.description);
        }
    });
}
    
}


Cg_SendCongratsFunction = new function () {

    var $instance = this;
    $instance.init = function () {
       
        $(document).on('click','.send-congrats-mailer', function(){
            var obj= $(this).data('val'); 
            var user_id= $(this).data('userid'); 
            var _name= $(this).data('name'); 
            var contest= $(this).data('season'); 
            var event_name= $(this).data('entityevent'); 
            var event_rule_name = $(this).data('eventpageurl'); 
            
            _sending_mail_congrts(_name, user_id, obj, contest, event_name, event_rule_name);
        })
        
	}
    
}

	
function _sending_mail_congrts(name, user_id, obj, contest, event_name, event_rule_name){
		if(user_id){
			var _inv_ajax_url = base_url+'/ajax_files/send_invitation.php?action=send_congrts_mail';
			$.post(_inv_ajax_url, {'name':name,'user_id':user_id,'contest':contest,'obj':obj,'event':event_name,'event_rule_name':event_rule_name}, function(data) {

                var tmp_arr = data.split('###');
                var status = tmp_arr[0];
                var obj = tmp_arr[1];
				if(status==2) {
					$('#congrt-'+contest+'-'+obj).html('<span class="btn">Already Sent!</span>');
				} else if(status==3) {
					$('#congrt-'+contest+'-'+obj).html('<span class="btn">Limit exceeded!</span>');
				} else {
					$('#congrt-'+contest+'-'+obj).html('<span class="btn">Message Sent!</span>');
				}
				//console.log('data => '+data);
			}); 
		}
	}

	
	
//Cookie handling for Codegladiators 2017
$(document).ready(function(){

    $(document).on('click', '.click-register-home', function(){ 
       var email = $('#register_email').val(); 
       var return_url = $(this).data('return_url');
       var page_val = $(this).data('page_val');
       var company_id = $(this).data('company_id');
      var companyDomainName =  $(this).data('company_domain');
       
       var action_url = base_url + '/ajax_files/geek_review.php'
        $.ajax({
                type: "POST",
                url: action_url,
                data: ({'raction':'redirectCookie','email':email, 'return_url':return_url,'event_name':event_url,'page_val':page_val,'company_id' : company_id, companyDomainName:companyDomainName}),
                success: function(response) {
                        var response = $.parseJSON(response); 
                        switch(response.redirect){
                            case 'landing' :
                                $('.msgErrortop .message-box').addClass('info-msg').find('p').html(response.msg); 
                                break;
                            case 'signupcompany': 
                                var path_url = response.path +'?msg_id='+response.msg_id+"&msg_type="+response.msg_type;
                                window.location.href = path_url;
                                break;
                            case 'signupopen': 
                                var path_url = response.path;
                                window.location.href = path_url;
                                break;
                            case 'signuptheme': 
                                var path_url = response.path;
                                window.location.href = path_url;
                                break;
                            case 'logintheme': 
                                 var path_url = response.path +'?msg_id='+response.msg_id+"&msg_type="+response.msg_type;
                                window.location.href = path_url;
                                break;
                            default:
                                $('.msgErrortop .message-box').addClass('info-msg').find('p').html(response.msg); 
                            
                        }
                        Tg_CommonFunction.clearMessage();
					}
					
				});	
    });
    
    $('#register_email').keydown(function(event){ 
        var keyCode = (event.keyCode ? event.keyCode : event.which);   
        if (keyCode == 13) {
            $('.click-register-home').trigger('click');
        }
    });
    
    $(document).on('click', '.custom-class-click', function(){
             var redirectContent = $(this).data('redirect_type'); 
             var seasonContent = $(this).data('redirect_season');
            
             $.removeCookie("redirect_user_on_click",{ path: '/' });
             $.removeCookie("redirect_user_season",{ path: '/' });
             
             $.cookie("redirect_user_on_click", redirectContent, {expires : 1,   path    : '/'});
             $.cookie("redirect_user_season", seasonContent, {expires : 1,   path    : '/'});
    })

    $(document).on('click', '.practice-event-click', function(){
             var practiceSeason = $(this).data('practice_content');
             
             $.removeCookie("practice_event_click_cookie",{ path: '/' });
             $.cookie("practice_event_click_cookie", practiceSeason, {expires : 1,   path    : '/'});
    })
    
	 $(document).on('click', '.view-custom-click-button', function(){
             var season = $('.value-clicked-event').val();
             $.removeCookie("view_event_click",{ path: '/' });
              $.removeCookie("view_event_click_other",{ path: '/' });
             $.cookie("view_event_click", season, {expires : 1,   path    : '/'});
    })
     
     $(document).on('click', '.value-clicked-event-other', function(){
             var season = $('.value-clicked-event').val();
             $.removeCookie("view_event_click",{ path: '/' });
             $.removeCookie("view_event_click_other",{ path: '/' });
             $.cookie("view_event_click_other", season, {expires : 1,   path    : '/'});
    })
     
    $(document).on('click', '.clear-class-cookies' , function(){
          $.removeCookie("redirect_user_on_click",{ path: '/' });
          $.removeCookie("redirect_user_season",{ path: '/' });
          $.removeCookie("practice_event_click_cookie",{ path: '/' });
    });
});
