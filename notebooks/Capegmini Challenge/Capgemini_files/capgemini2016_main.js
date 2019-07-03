/***
 * Javascript For All Capgemini Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Capgemini Project
 * 
 * Author   : Sebin Baby
 * Created  : 02 August, 2016
 */
 
$.getStylesheet = function(href) {
    var $d = $.Deferred();
    var $link = $('<link/>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: href
    }).appendTo('head');
    $d.resolve($link);
    return $d.promise(); 
};

Capgemini_CommonFunction = new function(isLoggedIn) {
    var $instance = this;

    $instance.init = function() {
		
    $(document).on("click", "#challenge_edit_profile", function() {
			$("#challenge_edit_profile").hide();
			$("#challenge_save_change").show();
			$("#challenge_profile_view").hide();
			$("#challenge_profile_edit").show();
	});
    
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
                                $('.error_msg_mail').text(response.msg);
                                $('.error_msg_mail').removeClass('hide'); 
                                
                                setTimeout(function(){
                                    $('.error_msg_mail').addClass('hide'); 
                                }, 1500);
                                
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
                                $('.error_msg_mail').text(response.msg);
                                $('.error_msg_mail').removeClass('hide');
                                 setTimeout(function(){
                                    $('.error_msg_mail').addClass('hide'); 
                                }, 1500);
                            
                        }
                        //Tg_CommonFunction.clearMessage();
					}
					
				});	
    });
        
        
		$(".smooth-scroll").click(function() {
            var href = $(this).attr('href');
            $('html, body').animate({
                    scrollTop: $(href).offset().top - 160
            }, 1000);
        });
		
		if(isLoggedIn){
			$('html').addClass('page-scrolling');
		}
		
		$("#main-navigation .menu-button").click(function() {
            $('body').toggleClass("slideingMenu"); 
			$("#main-navigation .btn-group > ul").innerHeight($(window).innerHeight() - 35)
            //$('#page-overlay').fadeIn("slow"); 
        });
		
		$("#page-overlay").click(function() {
            $('body').removeClass("slideingMenu");
			//$('#page-overlay').fadeOut("slow"); 
        });
	
		$(document).on("click", "#signup-form .btn-group .select-option, #work_experiance .btn-group .select-option", function() {
			
			$(this).parent().find(".select-option").removeClass("active");
			
			if($(this).hasClass("active")) {
				$(this).removeClass("active");
			} else {
				$(this).addClass("active");
			}
		});
		
		$(document).on("click", ".terms-page #secondary-navigation ul li a", function() {
			$(".terms-page #secondary-navigation ul li").removeClass("active");
			
			if($(this).parent().hasClass("active")) {
				$(this).parent().removeClass("active");
			} else {
				$(this).parent().addClass("active");
			}
		});
		
			
		/*$('#main-navigation .menu-button').click( function(){
			$(this).toggleClass('active');
			$("#main-navigation").toggleClass('activeMenu');
		});*/
		
		
		$("#main-navigation .parent > a").click(function() {
		  $(this).parent().find("ul").slideToggle('slow');
		});

		$('.back-top').click( function(){
			$("html, body").animate({ scrollTop: 0 }, "slow");
		});
		
		var headerWidth = ($(window).width() - $(".inner-header .container").innerWidth()) / 2 + 10;
		$('head style').first().html('#header:before{width:'+headerWidth+'px !important;}');
		
		$('#secondary-navigation').innerHeight($(window).height() - 150);
		
		$("#sidebar #sidebar-navigation .scroll").innerHeight($("#user-panel").innerHeight()-($("#sidebar-navigation li.questions-status > a").innerHeight() + $("#sidebar-navigation li.all-questions > a").innerHeight() + 8));
			
		if ($(window).scrollTop() > 0) {
			$('body').addClass('page-scrolling');
		}
		
        $(window).scroll(function() {    
			var windowScroll = $(window).scrollTop();
			var topScroll = 0;
			
			if(!isLoggedIn){
				if (windowScroll > topScroll) {
					$('body').addClass('page-scrolling');
				}
				else{
					$('body').removeClass('page-scrolling');
				}
			}
			
			if (windowScroll > $("#banner").height() / 2) {
				$('.back-top').fadeIn();
			}
			else{
				$('.back-top').fadeOut();
			}
			
			if (windowScroll > 100) {
				$('#secondary-navigation').addClass('fixed').innerHeight($(window).height() - 180);
			}
			else{
				$('#secondary-navigation').removeClass('fixed');
			}
		

			if ((windowScroll + $("#footer").height()) > ($('.auto-height').height())) {
				
				$('#secondary-navigation.fixed').css('top', (0 - (( windowScroll + $("#footer").height() - 140) - $('.auto-height').height())));
			}
			else{
				$('#secondary-navigation.fixed').css('top', 140);
			}
			
			if (windowScroll > ($("#page-header").innerHeight()) / 2) {
				$('.scroll-header').fadeIn();
			}
			else{
				$('.scroll-header').fadeOut();
			}
			
		});
		
		$(document).on("click", ".msgErrortop .close", function() {
			$(this).parents('.msgErrortop').slideUp();
		});

		setTimeout(function(){$('.msgErrortop').slideUp();}, 15000);
		
		$(window).resize(function() {
			var headerWidth = ($(window).width() - $(".inner-header .container").innerWidth()) / 2 + 10;
			$('head style').first().html('#header:before{width:'+headerWidth+'px !important;}');
			
			$("#sidebar #sidebar-navigation .scroll").innerHeight($("#user-panel").innerHeight()-($("#sidebar-navigation li.questions-status > a").innerHeight() + $("#sidebar-navigation li.all-questions > a").innerHeight() + 8));
			
		});
		
		$('#contest_details .contest-boxes .checkbox label').click(function(){
			$(this).parent().toggleClass("active");
		});
    }
    
    $instance.chosenDefault = function() {
        $.getStylesheet(base_url + "/Themes/Release/chosen_min.css")
		$.getScript(base_url + "/Themes/Release/javascript/chosen_jquery.min.js")
				.done(function() {
					$('.chosen-select').chosen();
				})
				.fail(function() {
					console.log('chosen not loaded');
				});
	};
	
	$instance.open_url_modal = function(title, url, height, width) {
        $('#TechGigbootStrapModal .modal-dialog').removeClass('modal-lg');
        if (typeof url === 'undefined' || url == '') {
            return false;
        }
        if (typeof title === 'undefined') {
            title = '';
        }
        if (typeof height === 'undefined') {
            height = '100%';
        }
        if (typeof width === 'undefined') {
            width = '100%';
        }
		
		/*
        $('#TechGigbootStrapModal .modal-body').load(url, function(e){
        	if(title == '') {
        		$('#TechGigbootStrapModal .modal-header').hide(); //hiding title header
        	} else {
        		$('#TechGigbootStrapModal .modal-title').html(title);
        	}
        	$('#TechGigbootStrapModal').modal('show');
        });
        */

        if (title == '') {
            $('#TechGigbootStrapModal .modal-header').hide(); //hiding title header
        } else {
            $('#TechGigbootStrapModal .modal-title').html(title);
        }

        // $('#TechGigbootStrapModal').removeClass('fade');
        $('#TechGigbootStrapModal').modal('show');
        setTimeout(function() {
    		$("#TechGigbootStrapModal .modal-body").html('<iframe width="' + width + '" height="' + height + '" frameborder="0" scrolling="yes" allowtransparency="true" src="' + url + '" onload="Tg_CommonFunction.resizeIframe(this)"></iframe>');
        }, 150);
        // $('#TechGigbootStrapModal').addClass('fade');
        return false;
    }
	
	$instance.loadReauthenticateUrl = function(goto_action_url, skip_authentication, parent_flag, scrolling_flag, popup_title) {
        if (typeof skip_authentication == 'undefined') {
            skip_authentication = 'N';
        }
        if (typeof parent_flag == 'undefined') {
            parent_flag = 'N';
        }
        if (typeof scrolling_flag == 'undefined') {
            scrolling_flag = false;
        } else {
            scrolling_flag = true;
        }
        if (typeof popup_title == 'undefined') {
            popup_title = '';
        }

        try {
                var title = popup_title;
                if (skip_authentication == 'N') {
                    Capgemini_CommonFunction.open_url_modal(title, base_url + '/validate_user.php?goto_action_url=' + goto_action_url, 400);
                } else {
                    var matchFound = goto_action_url.indexOf("ajax_login_register.php");
                    if (matchFound != '-1') {
                        title = 'Register/ Login';
                    }

                    Capgemini_CommonFunction.open_url_modal(title, goto_action_url, 400);
                }
        } catch (e) {}
    }
	
	$instance.checkUserParticipation = function(previous_season_id, parent_season_id, season_id) {

		$("div[id^='contestMsg_']").html(''); 
		$('.msgErrortop').hide();
		var action_file_url = base_url+'/ajax_files/assessment_check_participation.php?previous_season_id='+previous_season_id+'&parent_season_id='+parent_season_id+'&season_id='+season_id; 
		$.get(action_file_url, function(data) {
					data = $.trim(data);
					var msg = $.parseJSON(data);
					if(msg.status == 'success') {
						window.location.href = msg.url;
					} else {
						$('.error_msg_'+msg.season_id).show().html(msg.message);
						setTimeout(function(){
							$('.error_msg_'+msg.season_id).hide().html("");
						}, 5000);
					}
		});
		
	}
	
	
	$instance.generic_social_share = function(e) {
        return window.open(e, "sharer", "toolbar=0,status=0,width=548,height=425"), !0
    };
	
	
    $instance.SlidingTestimonials = function() {
        $.getScript(base_url + "/Themes/Release/javascript/jquery.cycle.all.js")
            .done(function() {
                $('#sliding-testimonials .slides').cycle({
                    slideExpr: '.slide',
                    cleartypeNoBg: ' true',
                    fx: 'fade',
                    timeout: 8000,
                    speed: 500,
                    fit: 1,
                    slideResize: 0,
                    containerResize: 0,
                    height: 'auto',
                    width: null,
                    pager: '.controls'
                });

                $("#sliding-testimonials .slides").height($("#sliding-testimonials .slide").height());
            })
            .fail(function() {
                console.log('SlidingTestimonials not loaded');
            })
    };

	
	
	$instance.badgesCertificates = function() {
		 $.getScript(base_url + "/Themes/Release/javascript/jquery.carouFredSel-6.0.5-packed.js")
            .done(function() {
                $('.tabs4 .tab-strips1').carouFredSel({
					responsive: true,
					width: '100%',
					circular: false,
					infinite:false,
					auto : false,
					scroll: 1,
					prev : ".tabs4 .previous-btn",
					next : ".tabs4 .next-btn",
					items: {
						width: 400,
						height: 'variable',
						visible: {
							min: 1,
							max: 3
						}
					}
				});

            })
            .fail(function() {
                console.log('badgesCertificates not loaded');
            })
        
    };


	//google share
	$instance.google_share = function(link_url){
		var url = 'https://plus.google.com/share?url='+link_url;
		window.open(url, 'sharer', 'toolbar=0,status=0,width=548,height=425');
		return true;
	}

	$instance.twitter_share = function(title, link_url){
		if((title == '') && ($('#share_title').val() != '')) {
				title = $('#share_title').val();
		}
		var url = 'http://twitter.com/home/?status='+title+' '+link_url;
		window.open(url, 'sharer', 'toolbar=0,status=0,width=548,height=425');
		return true;
	}

	$instance.linkedin_share = function(title, link_url, summary){
		if((title == '') && ($('#share_title').val() != '')) {
				title = $('#share_title').val();
		}
		var url = 'http://www.linkedin.com/shareArticle?mini=true&url='+link_url+'&title='+title+'&summary='+summary+'&source='+link_url;
		window.open(url, 'sharer', 'toolbar=0,status=0,width=548,height=425');
		return true;
	}
	$instance.tab3Controll = function(){
		$.getScript(base_url+"/Themes/Release/javascript/jquery_ui.min.js")
			.done(function () {
				$( ".tabs3, .tabs1" ).tabs({
					active: 0				   
				});	
			})
			.fail(function () {
				console.log('Tab3 not loaded');
			});
	};
	$instance.webcamNormal = function(question_type, question_id, question_token, allow_new_tab, auto_submit_time_limit, out_movement_allowed_number, platform_type) {
        var focusLostCounter = 0; 
        var focusLostFlag = 0;
        var focusLostStartTime = '';
        var focusLostEndTime = '';
        var timeElapsed = 0;
        var focusOutTimeInterval = 5000;


        var timeElapsedLimit = auto_submit_time_limit;


        if (timeElapsedLimit > 0) {
            var doAutoSubmitFlag = 'Y';
        }

        /* if(out_movement_allowed_number == 0) {
        var movingOutAllowedCounter = 10;
        } else { */
        var movingOutAllowedCounter = out_movement_allowed_number;
        //}


        // main visibility API function 
        // use visibility API to check if current tab is active or not
        var vis = (function() {
            var stateKey,
                eventKey,
                keys = {
                    hidden: "visibilitychange",
                    webkitHidden: "webkitvisibilitychange",
                    mozHidden: "mozvisibilitychange",
                    msHidden: "msvisibilitychange"
                };
            for (stateKey in keys) {
                if (stateKey in document) {
                    eventKey = keys[stateKey];
                    break;
                }
            }
            return function(c) {
                if (c) document.addEventListener(eventKey, c);
                return !document[stateKey];
            }
        })();

        // check if browser window has focus		
        var notIE = (document.documentMode === undefined),
            isChromium = window.chrome;

        if (notIE && !isChromium) {

            // check if current tab is active or not
            vis(function() {

                if (vis()) {

                    // User has come back on the Page, So reset the Focus Lost Flag
                    //focusLostCounter = 0;
                    focusLostFlag = 0;

                    // But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

                    if (timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {

                        if (doAutoSubmitFlag == 'Y') {
                            alert('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');

                            // Auto Submit Call will go here
                            autoSubmitUserContest();

                        }
                        // Logging in Error Log file will go here
                        saveWebcamLog(config.webcam_log[4]);

                        // reset the flags
                        //timeElapsed = 0;
                    } else {
                        timeElapsed = 0;
                    }

                } else {

                    var codingEditorFocusFlag = 0;

                    var specific_element_id = $(document.activeElement).attr('id');
                    //alert($( document.activeElement ).attr('id'));

                    if (specific_element_id == 'frame_user_code' || specific_element_id == 'auto_save_code') {
                        codingEditorFocusFlag = 1;
                    } else {
                        //alert('Increment Counter..');
                        focusLostCounter++;
                    }

                    if (!codingEditorFocusFlag) {
                        if (movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
                            //alert('OUT OF FOCUS Going Limit Reached. 1.');

                            if (doAutoSubmitFlag == 'Y') {
                                alert('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');

                                // Logging in Error Log file will go here
                                //alert(config.webcam_log[4]);
                                saveWebcamLog(config.webcam_log[4]);

                                // Auto Submit Call will go here
                                autoSubmitUserContest();

                            }

                        } else {

                            if (allow_new_tab == 'N') {
                                alert('You are not allowed to move out of current window during this contest!');
                                //$('#disable_ctrl_key_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                                //$('#disable_ctrl_key_combination').modal('show');
                            } else {

                                // Activated in Chrome on mouse New tab click AND windows tab Click
                                if (focusLostCounter == 2) {
                                    if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

                                        // Write Movement in Log File
                                        saveWebcamLog(config.webcam_log[3]);

                                        // Set focus Lost flag to true
                                        focusLostFlag = 1;
                                        focusLostStartTime = new Date().getTime();
                                        setInterval(myTimeoutFunction, focusOutTimeInterval);

                                    }
                                } else if (focusLostCounter > 2) {
                                    // Write Movement in Log File
                                    saveWebcamLog(config.webcam_log[3]);

                                    // Set focus Lost flag to true
                                    focusLostFlag = 1;
                                    focusLostStartTime = new Date().getTime();
                                    setInterval(myTimeoutFunction, focusOutTimeInterval);
                                }

                            }
                        }

                    }

                }
            });

        } else {
            // checks for IE and Chromium versions
            if (window.addEventListener) {

                // CHROME BLOCK

                // bind focus event
                window.addEventListener("focus", function(event) {

                    // User has come back on the Page, So reset the Focus Lost Flag
                    //focusLostCounter = 0;
                    focusLostFlag = 0;

                    // But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

                    if (timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {
                        if (doAutoSubmitFlag == 'Y') {
                            alert('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');

                            // Auto Submit Call will go here
                            autoSubmitUserContest();

                        }

                        // Logging in Error Log file will go here
                        //alert(config.webcam_log[4]);
                        saveWebcamLog(config.webcam_log[4]);

                        // reset the flags
                        //timeElapsed = 0;
                    } else {
                        timeElapsed = 0;
                    }

                }, false);

                // bind blur event
                window.addEventListener("blur", function(event) {

                    var codingEditorFocusFlag = 0;

                    var specific_element_id = $(document.activeElement).attr('id');
                    //alert($( document.activeElement ).attr('id'));

                    if (specific_element_id == 'frame_user_code' || specific_element_id == 'auto_save_code') {
                        codingEditorFocusFlag = 1;
                    } else {
                        //alert('Increment Counter..');
                        focusLostCounter++;
                    }

                    if (!codingEditorFocusFlag) {

                        if (movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
                            //alert('OUT OF FOCUS Going Limit Reached.');

                            if (doAutoSubmitFlag == 'Y') {
                                alert('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');

                                // Logging in Error Log file will go here
                                //alert(config.webcam_log[4]);
                                saveWebcamLog(config.webcam_log[4]);

                                // Auto Submit Call will go here
                                autoSubmitUserContest();

                            }

                        } else {

                            if (allow_new_tab == 'N') {
                                alert('You are not allowed to move out of current window during this contest!');
                                //$('#disable_ctrl_key_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                                //$('#disable_ctrl_key_combination').modal('show');
                                setInterval(function() {
                                    window.focus()
                                }, 1000);
                            } else {

                                // Activated in Chrome on mouse New tab click AND windows tab Click
                                if (focusLostCounter == 2) {
                                    if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

                                        // Write Movement in Log File
                                        saveWebcamLog(config.webcam_log[3]);

                                        // Set focus Lost flag to true
                                        focusLostFlag = 1;
                                        focusLostStartTime = new Date().getTime();
                                        setInterval(myTimeoutFunction, focusOutTimeInterval);

                                    }
                                } else if (focusLostCounter > 2) {
                                    // Write Movement in Log File
                                    saveWebcamLog(config.webcam_log[3]);

                                    // Set focus Lost flag to true
                                    focusLostFlag = 1;
                                    focusLostStartTime = new Date().getTime();
                                    setInterval(myTimeoutFunction, focusOutTimeInterval);
                                }

                            }

                        }

                    }

                }, false);

            } else {

                // IE BLOCK

                // bind focus event
                window.attachEvent("focus", function(event) {

                    // User has come back on the Page, So reset the Focus Lost Flag
                    //focusLostCounter = 0;
                    focusLostFlag = 0;

                    // But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

                    if (timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {
                        if (doAutoSubmitFlag == 'Y') {
                            alert('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');

                            // Auto Submit Call will go here
                            autoSubmitUserContest();

                        }

                        // Logging in Error Log file will go here
                        //alert(config.webcam_log[4]);
                        saveWebcamLog(config.webcam_log[4]);

                        // reset the flags
                        //timeElapsed = 0;
                    } else {
                        timeElapsed = 0;
                    }

                });

                // bind focus event
                window.attachEvent("blur", function(event) {

                    var codingEditorFocusFlag = 0;

                    var specific_element_id = $(document.activeElement).attr('id');
                    //alert($( document.activeElement ).attr('id'));

                    if (specific_element_id == 'frame_user_code' || specific_element_id == 'auto_save_code') {
                        codingEditorFocusFlag = 1;
                    } else {
                        //alert('Increment Counter..');
                        focusLostCounter++;
                    }

                    if (!codingEditorFocusFlag) {

                        if (movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
                            //alert('OUT OF FOCUS Going Limit Reached. 3.');

                            if (doAutoSubmitFlag == 'Y') {
                                alert('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');

                                // Logging in Error Log file will go here
                                //alert(config.webcam_log[4]);
                                saveWebcamLog(config.webcam_log[4]);

                                // Auto Submit Call will go here
                                autoSubmitUserContest();

                            }

                        } else {
                            if (allow_new_tab == 'N') {
                                alert('You are not allowed to move out of current window during this contest!');
                            } else {

                                // Activated in Chrome on mouse New tab click AND windows tab Click
                                if (focusLostCounter == 2) {
                                    if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

                                        // Write Movement in Log File
                                        saveWebcamLog(config.webcam_log[3]);

                                        // Set focus Lost flag to true
                                        focusLostFlag = 1;
                                        focusLostStartTime = new Date().getTime();
                                        setInterval(myTimeoutFunction, focusOutTimeInterval);

                                    }
                                } else if (focusLostCounter > 2) {
                                    // Write Movement in Log File
                                    saveWebcamLog(config.webcam_log[3]);

                                    // Set focus Lost flag to true
                                    focusLostFlag = 1;
                                    focusLostStartTime = new Date().getTime();
                                    setInterval(myTimeoutFunction, focusOutTimeInterval);
                                }
                            }

                        }

                    }

                });
            }
        }

        
    };

};


/***
 * Javascript For All Capgemini landing Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Capgemini Project
 * 
 * Author   : Sebin Baby
 * Created  : 02 August, 2016
 */

Capgemini_LandingPage = new function() {
    var $instance = this;
	var count = 0;

    $instance.init = function() {
		Capgemini_LandingPage.landingBanner();
		
		
		 $('#prizes .count').each(function () {
            var $this = $(this);
            jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                    $this.text(Math.ceil(this.Counter));
                }
            });
        });
		
		$("#video-player").height($("#banner .slides").height());
		
		var vid = document.getElementById("bgvid");
		var pauseButton = document.querySelector("#polina button");

		function vidFade() {
		  vid.classList.add("stopfade");
		} 
			
		
        $("#banner").height($("#video-player").height());
		
		$(window).resize(function() {
			$("#video-player").height($("#banner .slides").height());
			$("#banner").height($("#video-player").height());
		});
		
		$( "#prizes" ).mouseenter(function() {
			  if(count == 0){
				  $('#prizes .count').each(function () {
					var $this = $(this);
					jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
						duration: 500,
						easing: 'swing',
						step: function () {
							$this.text(Math.ceil(this.Counter));
						}
					});
				});
				count = 1;
			  }
		});
		
		$.getStylesheet(base_url + "/Themes/Release/wow_animation.css")
		$.getScript(base_url + "/Themes/Release/javascript/wow.min.js")
			.done(function() {
				new WOW().init();
			})
			.fail(function() {
				console.log('Wow not loaded');
			})
		
		Capgemini_LandingPage.countdown();
		
		if (navigator.userAgent.indexOf('MSIE') != -1){
			
		}else{
			Capgemini_LandingPage.animatedEmail();
		}
	}
	
	$instance.animatedEmail = function(){
		$.getScript(base_url+"/Themes/Release/javascript/superplaceholder.min.js")
		.done(function () {
			
				superplaceholder({
					el: register_email,
					sentences: [ 'abc@xyz.com' ],
					options: {
						letterDelay: 200,
						loop: true,
						startOnFocus: false
					}
				})
			
			
		})
		.fail(function () {
			console.log('superplaceholder not loaded');
		});
	};
	
	
	$instance.countdown = function(){
		$.getScript(base_url+"/Themes/Release/javascript/cg2016_jquery.countdown.js")
		.done(function () {
			$('.countdown .alt-1').countDown({
				css_class: 'countdown-alt-2'
			});	
		})
		.fail(function () {
			console.log('Countdown not loaded');
		});
	};

	
	$instance.landingBanner = function() {
		$.getScript(base_url + "/Themes/Release/javascript/jquery.cycle.all.js")
		.done(function() {
			$('#banner .slides').cycle({
				slideExpr: '.slide',
				cleartypeNoBg: ' true',
				fx: 'fade',
				timeout: 5000,
				speed: 500,
				fit: 1,
				slideResize: 0,
				containerResize: 0,
				height: 'auto',
				width: null,
				next: '#banner .next-btn',
				prev: '#banner .previous-btn',
				pager:  '#slider-controls ul', 
				pagerAnchorBuilder: function(idx, slide) { 
					// return selector string for existing anchor 
					return '#slider-controls li:eq(' + idx + ') a'; 
				}

			});
			
			$("#banner .slide").each(function() {
				var slideSrc = $(this).find('.bg-img').attr("src");
				$(this).css("background-image", "url(" + slideSrc + ")");
			});
			
			$('#register_email').focus(function(){
				$('#banner .slides').cycle('pause'); 
			});

			$('#register_email').blur(function(){ 
				$('#banner .slides').cycle('resume'); 
			});
			
			$('.click-register-home').hover( 
				function() { 
					$('#banner .slides').cycle('pause');
				}, 
				function() { 
					$('#banner .slides').cycle('resume');
				} 
			);
			
			/*$(".click-register-home").hover(function () {
				$('#banner .slides').cycle('pause');
			});

			$(".click-register-home").mouseleave(function() {
			    $('#banner .slides').cycle('resume');
			});*/
			
		})
		.fail(function() {
			console.log('Cycle not loaded');
		})
	};
	
};


/***
 * Javascript For All Capgemini Register Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Capgemini Project
 * 
 * Author   : Sebin Baby
 * Created  : 02 August, 2016
 */

Capgemini_RegisterPage = new function() {
    var $instance = this;

    $instance.init = function() {	
		Capgemini_RegisterPage.Datepicker();	
	}

	$instance.Datepicker = function(){
		$.getStylesheet(base_url + "/Themes/Release/jquery-ui.css")
		$.getScript(base_url+"/Themes/Release/javascript/jquery_ui.min.js")
		.done(function () {
			$("#dob").datepicker({
				showOn: 'button',
				buttonText: '',
				buttonImageOnly: true,
				yearRange : "1950:2010",
				buttonImage: base_url+"/Themes/Release/images/capgemini2016_images/calender-icon.png",
				dateFormat: 'dd/mm/yy',
				constrainInput: true,
				changeMonth: true,
				changeYear: true,
				defaultDate: '01/01/1989'
			
				
			});
		})
		.fail(function () {
			console.log('datepicker not loaded');
		});
	};

	$instance.checkIfUserEmailAlreadyRegisteredOnTg = function(login_source_input, red_url_val){
		var user_email_id = $.trim($('#email').val());
		
		var companyUrl = $.trim($('#company_Url').val());
		companyUrl = (typeof companyUrl === "undefined") ? "openparticipation" : companyUrl;
		
		login_source_input = (typeof login_source_input === "undefined") ? "OTH" : login_source_input;
		red_url_val = (typeof red_url_val === "undefined") ? "techchallenge" : red_url_val;
		
		if(companyUrl == '') {companyUrl = 'openparticipation';}
		
		var action_url = base_url+'/general_ajax_task.php';
		action_block_name = 'check_if_email_already_registered_on_codejudge';

		if(user_email_id != '') {
			$.post(action_url,{action: action_block_name, user_email_id: user_email_id,companyUrl:companyUrl,login_source_input:login_source_input,red_url_val:red_url_val},function(data) {
			
				//alert(data);
			
				var output_chk = $.trim(data);
				
				if(output_chk == 'success') {
					// Show login Tab
					if(red_url_val=='codegladiators'){
						$('#err_email_already_exist').show();
						$('#login_uid').val(user_email_id);
						$('#login_pass').focus();
						$('#header .sign-btn').trigger( "click" );

					} else {
						$( ".tabs1" ).tabs({
							active: 1				   
						});
						$('#login-alert-login').hide();
						$('#already_registered').show();
						$('#username').val(user_email_id);
						$('#password').focus();
					}
					
					
				} else if(output_chk == 'email_company_mapping_exist') {
					// Show login Tab
					$( ".tabs1" ).tabs({
						active: 1				   
					});
					$('#login-alert-login').hide();
					$('#useremail_company_only_login').hide();
					$('#useremail_company_mapping_exist').show();
				}
			})
		}
	}

	

};



function myTimeoutFunction() {
	timeElapsed = new Date().getTime() - focusLostStartTime; // time in ms
	timeElapsed = (timeElapsed / 1000); // time in seconds
	timeElapsed = Math.round(timeElapsed % 60); // formatting the time in seconds
	return timeElapsed;
};

function autoSubmitUserContest() {

	if (question_type == 'code') {
		form_post = 1;
		compile_test('submit', 'question_id', 'question_token', 'tg_testcase', 'platform_type', 'N');
	} else {
		$('#codejudge_requirement').submit();
	}

}


