/***
 * Required for Recruit Company Page Page
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


function LoadRecentTakersData(div_id, d, type,event_type, event_name,current_page_url) {
		if(type == 2) {
		var cols = 4;
		$('#leaderboard_page').val(2);			
		} else if(type == 3) {
		var cols = 3;
		$('#final_leaderboard_page').val(2);
		} else {
		var cols = 4;
		$('#recent_page').val(2);
		}
		
		if(typeof event_type === 'undefined') { event_type = ''; }
		if(typeof event_name === 'undefined') { event_name = ''; }
		if(typeof current_page_url === 'undefined') { current_page_url = ''; }
		
		$("#"+div_id+"-"+d+" tbody").html("<span class='tabs_loader'>please wait loading... <img src='"+THEME_PATH+"/images/loading.gif'> </span>");
		 var url = base_url+'/ajax_files/assessment_recent_takers.php?season_id='+d+'&type='+type+'&div_id='+div_id+'&event_type='+event_type+'&event_name='+event_name+'&page_url='+current_page_url;
		 $("#"+div_id+"-"+d+" tbody").load(url, function(response, status, xhr) {
			response = $.trim(response);
			if(response == 'no_record') {
				$("#"+div_id+"-"+d+" tbody").html("<tr style='display: table-row;'><td align='center' colspan='"+cols+"'>No users to display.</td></tr>");
			}
		 });
		 return false;
}

	

Recruit_CommonFunction = new function () {
    var $instance = this;
	$('#main-navigation.nav-menu-lists ul li.more-items').hide();
	
	$(document).on("click","ul.options li", function(){	
		var is_multiple_ans = $('#is_multiple_ans').val();
		if(is_multiple_ans == 1) {
			$(this).toggleClass("active");
		} else if($(this).hasClass("active")) {
			$(this).removeClass("active");
		} else{
			$("ul.options li").removeClass("active");
			$(this).addClass("active");
		}
		
		if($(this).hasClass("save-mcq-answer")) {
			Tg_ChallengesPage.saveMCQAnswer();
		}	
	});
	
		
	$instance.calculateLIsInRow = function() {
        var lisInRow = 0;
        var total_li_count = $('#main-navigation.nav-menu-lists ul li').length;
        $('#main-navigation.nav-menu-lists > ul > li').each(function() {  
			if(lisInRow >= 5 && lisInRow < (total_li_count-1)) {
				$('#main-navigation.nav-menu-lists .dropdown-menu').append('<li>' + $(this).html() + '</li>');
				$(this).remove();
			}
			lisInRow++;

        });
        if((total_li_count-1) > 5) {
            $('#main-navigation.nav-menu-lists ul li.more-items').show();
        }else if ((total_li_count-1) == 5) {
            $('#main-navigation.nav-menu-lists ul li.more-items').hide();
        } else {
			$('#main-navigation.nav-menu-lists ul li.more-items').hide();
		}
    };
	
};

Recruit_CompanyPage = new function () {
    var $instance = this;
	
	$instance.init = function () {
            $('.navigation-select').change(function () {
                $(this).closest('tr').find('.clear-on-navigation').val('');
            });
            $('.custom-title-focus').blur(function(){
                $(this).closest('tr').find('.clear-on-navigation').val('');
            });
            
		$(".white-box .tab-pane").each( function(){
			
			$(this).find(".save-submit-btn").click(function(){
				$('.tabs .nav-tabs').find('li.active').next().children().trigger("click");
				$('html, body').animate({scrollTop: $("#container-wrap").offset().top}, 1000);	
			});
			
			$(this).find(".back-btn").click(function(){
				$('.tabs .nav-tabs').find('li.active').prev().children().trigger("click");
				$('html, body').animate({scrollTop: $("#container-wrap").offset().top}, 1000);	
			});

		});
		
		$(".menu-table .user-actions .manage-menu-btn").click(function(){
			$(this).closest("tr.menu-item-box").addClass("manage-menu");
			return false;
		});
		$(".menu-table .user-actions .manage-menu-contents").click(function(){
			$(this).closest("tr.menu-item-box").addClass("manage-content");
			return false;
		});
		
		/*$(".menu-table .manage-menu-content .button4").click(function(){
			$(this).closest("tr.menu-item-box").removeClass("manage-menu").addClass("success");
			return false;
		});*/
		
		$(".menu-table .manage-menu-content .button1").click(function(){
			$(this).closest("tr.menu-item-box").removeClass("manage-menu");
			return false;
		}); 
		
		// Blog/Rss/Custom news adding
		$('#news_source').change(function() {
			var click_value = $('#news_source').val();
			
			if(click_value == 'rss') {
				$('#custom-news').hide();
				$('#rss_url_block').show();
				$('#rss_url').show();
			} else if(click_value == 'company') {
				$('#rss_url').hide();
				$('#rss_url_block').hide();
				$('#custom-news').show();
			} else if(click_value == 'google') {
				$('#rss_url').hide();
				$('#rss_url_block').hide();
				$('#custom-news').hide();
			}
		});
		
		
		$('#btnSaveLeadCaptureFlag').click(function() {
			var cltype = '';
			
			if($('#rbDocumentWise').is(':checked')) {
				cltype = 'doc#1';
			} else {
				cltype = 'doc#0';
			}
			
			if($('#chkCaptureLeads').prop('checked')){
				cltype = cltype+':1';
				var CaptureLeadsChecked = true;	
			}else{
				cltype = cltype+':0';
				var CaptureLeadsChecked = false;
			}
			var entityId = $('#company_id').val();
			
			if(confirm('Are you sure?')) {
				var action_block_name = 'save_capture_leads_to_access';
				$.post(base_url+"/general_ajax_task.php",{action: action_block_name, cid: entityId, cltype: cltype},function(data) {
					data = $.trim(data);
					if(data == 'Y') {
						if(CaptureLeadsChecked) {
							alert('Flag saved successfully');
						} else {
							alert('Flag removed successfully');
						}
					} else {
						alert('Flag not saved');
					}
				});
			}
		});
		
		$instance.confirm_remove = function (txt) {
			return confirm('Are you sure you want to '+txt+' this Ambassador?');
		}
		
		$('.rss_feed').click (function () {
			var rss_url = $(this).data('feed');
			$('#rss_url').val(rss_url);
			$( "#add_content" ).submit();
		});
		
		
		$('.zoom_image').click (function () {
			var img_url = $(this).data('img');
			var title = $(this).data('title');
			bootbox.alert({ 
				title: title,
				message: '<img src="'+img_url+'">', 
				callback: function(){	
					//
				}
			});	
		});
		
		
		/* $('#btnContentHeading').click(function(){
			var content_heading = $('#content_heading').val();
			if(content_heading == '') {
				alert('Please enter content for heading');
			} else {
				if(confirm('Are you sure to save content for heading?')) {
					var action_block_name = 'save_company_content_heading';
					var entityId = $('#company_id').val();
					$.post(base_url+"/general_ajax_task.php",{action: action_block_name, cid: entityId, ctype: 'doc', content_heading: encodeURIComponent(content_heading)},function(data) {
						data = $.trim(data);
						if(data == 'Y') {
							alert('Heading content saved successfully');
						} else {
							alert('Heading content not saved');
						}
					});
				}
			}
		}); */
		
	
	};
	
	$instance.LoadSwitch = function () {
        $.getScript(base_url + "/Themes/Release/javascript/bootstrap-switch.min.js")
                .done(function () {
                    $("[name='visibility-checkbox']").bootstrapSwitch();
                })
                .fail(function () {
                    console.log('Switch not loaded');
                });
	};
	
	$instance.showHideBlock = function (showBlk, hideBlk) {
        document.getElementById(showBlk).style.display = "block";
        document.getElementById(hideBlk).style.display = "none";
	};
	$instance.showHideSecondBlock = function (valueId) {
        var value =  confirm('Do you really want to remove the background repeat image?');
        if(value){
            $('#banner_db_'+valueId).val('');
        }
	};

	$instance.loadMoreComments = function(type){
        var page = $('#page').val(),
            companyId = $('#company_id').val(),
            companyName = $('#company_name').val(),
            moduleId = $('#module_id').val();
    
        $('#ancViewMore').hide();
        $('#ajax_processing').show(); 
        
//        var action_file_url = encodeURI(base_url+'/ajax_files/process_company_page_data.php?action=list_comments&type=' + type + '&page=' + page  + '&company_id=' + companyId + '&company_name=' + companyName + '&module_id=' + moduleId);
        var action_file_url = encodeURI(base_url+'/ajax_files/process_company_page_data.php?action=list_comments&type=' + type + '&page=' + page  + '&limit=' + 1 + '&company_id=' + companyId + '&company_name=' + companyName + '&module_id=' + moduleId);

        $.get(action_file_url, function(response) {
            var response = $.parseJSON(response);
            
            $('#ajax_status').hide();
            
            if(response['data'] === '') {
                    $('#ajax_status').show();
                    $('#ajax_processing').hide();
                    $('#ancViewMore').hide();
            } else {                
                $('#comments').append(response['data']);
                page++;
                $('#page').val(page);
                $('#ajax_processing').hide();
                $('#ancViewMore').show();
            }
        });
    };
	
	
	$instance.updateCommentStatus = function (comment_id, company_id, status_in) {
		//try {
			var action_str = ' delete ';
			var status = parseInt(status_in);
			if(status == 1){
				action_str = ' restore ';
			}else{
				status = 0;
			}
			
			if(!confirm('Do you really want to '+action_str+' this item?')){ return; }
			comment_id = parseInt(comment_id);
			company_id = parseInt(company_id);
			if(comment_id > 0 && company_id > 0){
				var ajax_file = base_url+'/ajax_files/ajax_companypage_data.php?action=delete_item';
				$.post(ajax_file,{'comment_id':comment_id, 'company_id':company_id, 'status':status},function(data){
					data = $.trim(data);
					if(data == 'Y'){
						var btn_txt_new = '';
						if(status == 1) {
							btn_txt_new = '<a href="javascript:void(0);" onclick="Recruit_CompanyPage.updateCommentStatus(\''+comment_id+'\',\''+company_id+'\', 0);" class="left remove"><i class="fa fa-remove" aria-hidden="true"></i> Delete</a>';
						} else{
							btn_txt_new = '<a href="javascript:void(0);" onclick="Recruit_CompanyPage.updateCommentStatus(\''+comment_id+'\',\''+company_id+'\', 1);" class="left restore"><i class="fa fa-reply" aria-hidden="true"></i> Restore</a>';
						}
						$('#_action_btn_bx_'+comment_id).html(btn_txt_new);
					}
				});
			}
		//}catch(e){}
	}
	
	
	$instance.add_company_mailer_content = function (content_type, content_id, company_id, status_in){
		try{
			var action_str = 'Do you really want to add this item into mailer?';
			var status = parseInt(status_in);
			if(status == 1){
				action_str = 'Do you really want to remove this item from mailer?';
			}else{
				status = 0;
			}
			
			if(!confirm(action_str)){ return; }
			content_id = parseInt(content_id);
			company_id = parseInt(company_id);
			if(content_type != '' && content_id > 0 && company_id >= 0){
				var ajax_file = base_url+'/ajax_files/ajax_companypage_data.php?action=add_mailer_content';
				$.post(ajax_file,{'content_type':content_type, 'content_id':content_id, 'company_id':company_id, 'status':status},function(data){
					data = $.trim(data);
					if(data == 'Y'){
						var btn_txt_new = '';
						var response = '';
						if(status == 1){
							btn_txt_new = '<a href="javascript:void(0);" onclick="Recruit_CompanyPage.add_company_mailer_content(\''+content_type+'\',\''+content_id+'\',\''+company_id+'\', 0);">Add to mailer template</a>';
							
							response = content_id + ' - Removed from mailer template';
						} else{
							btn_txt_new = '<a href="javascript:void(0);" onclick="Recruit_CompanyPage.add_company_mailer_content(\''+content_type+'\',\''+content_id+'\',\''+company_id+'\', 1);">Remove from mailer template</a>';
							response = content_id + ' - Added to mailer template';
						}
						$('#_action_mlr_cnt_'+content_id).html(btn_txt_new);
						$('#manual_added_mlr_cnt').html(response);
					} else {
						alert("Some Error Occurred, Please try again");
					}
				});
			}
		}catch(e){}
	}
	
	$instance.LoadCodejudgeLeaderData = function(div_id, d){

		$('#leaderboard_page').val(2);			
		var cols = 3;
		$("#"+div_id+"_"+d+" tbody").html("<span class='tabs_loader'>please wait loading... <img src='"+THEME_PATH+"/images/loading.gif'> </span>");
		 var url = base_url+'/ajax_files/codejudge_leader_users.php?season_id='+d+'&div_id='+div_id;
		 $("#"+div_id+"_"+d+" tbody").load(url, function(response, status, xhr) {
			response = $.trim(response);
			if(response == 'no_record') {
				$("#"+div_id+"_"+d+" tbody").html("<tr style='display: table-row;'><td align='center' colspan='"+cols+"'>No users to display.</td></tr>");
			}
		 });
		 
		 return false;
	};
	
	$instance.LoadCodejudgeLeaderDataPagination = function(div_id, d){
	
		var cols = 2;
		var page = $('#leaderboard_page').val();

		$('#view_more_users-'+div_id+'-'+d).hide();
		
		$('#ajax_'+div_id+'_'+d).html('<td colspan="'+cols+'" align="center">please wait loading... <img src="'+THEME_PATH+'/images/loading.gif"> </td>'); 
		var action_file_url = base_url+'/ajax_files/codejudge_leader_users.php?season_id='+d+'&div_id='+div_id+'&page_no='+page;
		$.get(action_file_url, function(data) {
					$('#ajax_'+div_id+'_'+d).hide();
					data = $.trim(data);
					if(data == 'no_record') {
						$('#ajax_'+div_id+'_'+d).html('<td colspan="'+cols+'" align="center">No more users to display.</td>');
						$('#ajax_'+div_id+'_'+d).show();
					} else {
						$(data).insertBefore('.ajax_'+div_id+'_'+d);
						page++;
						$('#leaderboard_page').val(page);
						$('#view_more_users-'+div_id+'-'+d).show();
					}
		});
	};
	
	$instance.attach_season_on_job = function (job_id,season_id) {
		var input_season_id = prompt("Please enter contest season id to attached",season_id);
		if(input_season_id != null) {
			if(input_season_id >= 0) {
				var action_block_name = 'attach_season_on_job';
				$.post(base_url+"/general_ajax_task.php",{action: action_block_name, job_id: job_id, season_id: input_season_id},function(data) {
					data = $.trim(data);
					if(data == 'Y') {
						alert('Season attached successfully with this job');
						window.location = '<?php echo "http://".$_SERVER[HTTP_HOST].$_SERVER[REQUEST_URI]; ?>';
					} else {
						alert('Some Error Occurred, Please try again');
					}
				});
			} else {
				alert('Please enter season id to attached');
			}
		}	
	}

};


/***
 * Required for Bosch Pages
 */

Bosch_Commonfunction = new function () {
    var $instance = this;
	
	$instance.init = function () {
		
		$(document).on("click",".connect-to-forgot", function(){ 
			$('#saas_login_form').hide();
			$('#saas_forgot_password_form').show();
		});
		
		$(document).on("click",".connect-to-login", function(){ 
			$('#saas_login_form').show();
			$('#saas_forgot_password_form').hide();
		});
		
		$('#refer_a_friend a').click(function () {
			$('#refer-a-friend').modal('show');
		});
		
		
		$(".checkbox input").click(function(){ 
			 $("#participate_season_ids").val('');
			 var selected_themes = [];
			 $('.checkboxes .checkbox input:checked').each(function() {
				var value = $(this).val();
				if (value) {
					selected_themes.push(value);
				}
				if(selected_themes.length > 3) {
					   $(this).prop('checked',false);
					  $.getScript(base_url + "/Themes/Release/javascript/bootbox.min.js")
						.done(function() {
							bootbox_alert_msg('You cannot select more than 3 themes!');
						})
						.fail(function() {
							console.log('chosen not loaded');
						});
				} else {
				var selected_season_ids = selected_themes.join();
				//$("#participate_season_ids").val(selected_season_ids);
				}
			 });
	  });
	 
	    
	    
	   $(window).scroll(function() { 
	    var windowScroll = $(window).scrollTop();
		var topScroll = $("#bosch-banner").height();
		
		if (windowScroll > topScroll) {
			$('.links-container').addClass('fixed-parent');
			$('#container-wrap').css('padding-top', 64);
		   } else {
			$('.links-container').removeClass('fixed-parent');
			$('#container-wrap').css('padding-top', 0);
		   }
	  });
	  
	  
	   $("#send_invites").click ( function () {
			$("#refer-a-friend").modal('show');
			$("#sent_success_msg").hide();
			$("#refer-a-friend input[type=text]").val('');
	   });
	   
	   $(document).on('click','.send-invites-email' ,function(){
			
			$( "#refer-a-friend .error_msg").remove();
			$( "#refer-a-friend li").removeClass( "has-error" );
			
			$.ajax({
			   type: 'POST',
			   url: base_url+'/ajax_files/saas_corporate_function.php?action=send_invitation_email',
			   data: $("#invite_email").serialize(),
					success: function(response){
					response = $.trim(response);
					var msg = $.parseJSON(response);
					if(msg.status == 'success') {
							$("#sent_success_msg").show();
							setTimeout(function(){$('#refer-a-friend').modal('hide');}, 2000);
					} else { 
						$.each(msg, function (index, value) {
							$("#"+index).closest('li').addClass( "has-error" );
							$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("#"+index);
						});	
					}
				}
			});
			
	   });
	
	
	};
	
	
	$instance.commonChosen = function () {
		
		$.getStylesheet(base_url + "/Themes/Release/chosen_min.css")
        $.getScript(base_url + "/Themes/Release/javascript/chosen_jquery.min.js")
			.done(function() {
				$('.chosen-select').chosen();
			})
			.fail(function() {
				console.log('chosen not loaded');
			});
	};
	
	$instance.subLinks = function () {
        $.getScript(base_url + "/Themes/Release/javascript/onepagenav.js")
			.done(function() {
				$('#sub-links ul').onePageNav({ 
					currentClass: 'active',
					scrollOffset: 80,
					scrollThreshold: 0.01,
					changeHash: false,
					filter: ':not(.external)'
				});
			})
			.fail(function() {
				console.log('onePageNav not loaded');
			});
	};
	
};

Recruit_AppNotification = new function () {
    
	var $instance = this;
	
	$instance.init = function () {
			
			$('.app_notification').click(function(){
			   var message_id = $(this).data('id');
			   var action_url_app =  base_url+'/ajax_files/app_notification.php?message_id='+message_id;
			   
				$('#app_notifaction_form .modal-body').load(action_url_app, function(e){
					$('#app_notifaction_form').modal('show');
				});	
			});
			
			$('.send_app_notification').click(function(){
			   var action_url = $(this).data('href');
					bootbox.confirm({ 
					//size: 'small',
					title: "Send Notification",
					message: "<p>Are you sure you want to send notification?</p>", 
						callback: function(response){	
							if(response) {
								 //window.location.href = action_url;
								 window.open(
									  action_url,
									  '_blank' // <- This is what makes it open in a new window.
									);
							}
						}
					});	
			});
			
			
		$('#saveAppNotification').click(function(){
			
			$( "#app_notifaction_form .error_msg").remove();
			$( "#app_notifaction_form .alert-success").hide();
			$( "#app_notifaction_form div").removeClass( "has-error" );
			
			$.ajax({
			   type: 'POST',
			   url: base_url+'/ajax_files/saas_corporate_function.php?action=SaveAppNotification',
			   data: $("#app_notification_form").serialize(),
					success: function(response){
					response = $.trim(response);
					var msg = $.parseJSON(response);
					if(msg.status == 'success') {
							$("#app_notifaction_form .save_message").html('Message save Sucessfully!').show();
							setTimeout(window.location.href = window.location.href, 2000);
					} else { 
						$.each(msg, function (index, value) {
							$("textarea[name="+index+"], select[name="+index+"]").closest('div').addClass( "has-error" );
							$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("textarea[name="+index+"], select[name="+index+"]");
						});	
					}
				}
			})
			
		});
	
	
	};
	
};


/***
	
 * Required for Recruit Code Learn Page Page
   Author: Arun George ( 22-06-2016 )
 */

Recruit_CodeLearnPage = new function () {
    var $instance = this;
	
$instance.init = function () {
		$(".white-box .tab-pane").each( function(){
			
			$(this).find(".save-submit-btn").click(function(){
				$('.tabs .nav-tabs').find('li.active').next().children().trigger("click");
				$('html, body').animate({scrollTop: $("#container-wrap").offset().top}, 1000);	
			});
			
			$(this).find(".back-btn").click(function(){
				$('.tabs .nav-tabs').find('li.active').prev().children().trigger("click");
				$('html, body').animate({scrollTop: $("#container-wrap").offset().top}, 1000);	
			});

		});
		
		$(".menu-table .user-actions .manage-menu-btn").click(function(){
			$(this).closest("tr.menu-item-box").addClass("manage-menu").removeClass("success");
			return false;
		});
		
		$(".menu-table .manage-menu-content .button4").click(function(){
			$(this).closest("tr.menu-item-box").removeClass("manage-menu").addClass("success");
			return false;
		});
		
		$(".menu-table .manage-menu-content .button1").click(function(){
			$(this).closest("tr.menu-item-box").removeClass("manage-menu");
			return false;
		});
		
		$('[data-toggle="tooltip"]').tooltip();
		
		$(".edit-delete .delete-button").click(function(){
			$(this).closest("li").remove();
		});
		
		$("#remove_bg_banner").click( function () {
		$("#fileupload_large_old").val('');
		$("#upload_test_bg_banner_img").remove();
		
		});

		$("#remove_sm_banner").click( function () {
		$("#fileupload_small_old").val('');
		$("#upload_test_sm_banner_img").remove();
		
		});
		
		$("#remove_logo_banner").click( function () {
		$("#fileupload_logo_old").val('');
		$("#upload_logo_banner").remove();
		
		});
		
		$(".controls-group .delete-button").click(function(){
			$(this).closest("li").remove();
		});
		
	};
	
	$instance.SlidingTestimonial = function () {
		$.getScript(base_url + "/Themes/Release/javascript/jquery.cycle.all.js")
                .done(function () {
					$('#learn-testimonials .slides').cycle({
					slideExpr: '.slide',
					cleartypeNoBg: ' true' ,
					fx: 'fade',
					timeout:0,
					speed: 500,
					fit: 1,
					slideResize: 0,
					containerResize:0,
					height:'auto',
					width:null,
					pager: '.controls'
				});	
					$("#learn-testimonials .slides").height($("#learn-testimonials .slide").height());
                })
                .fail(function () {
                   console.log('Tesimonial not loaded');
                });
	};
	
	$instance.ProgressBarRound = function () {
		$.getScript(base_url + "/Themes/Release/javascript/jQuery-plugin-progressbar.js")
                .done(function () {
						$(".progress-bar").loading();
						$('input').on('click', function () {
						$(".progress-bar").loading();
					});
                })
                .fail(function () {
                   console.log('Progress not loaded');
                });
	};
	
	
	$instance.NiceEdit = function () {
		$.getScript(base_url + "/Themes/Release/javascript/nicEdit-latest.js")
			.done(function () {
					
				new nicEditor({buttonList : ['bold','italic','underline','center','right','justify','ul','ol','indent','outdent','link','unlink','upload','xhtml'], maxHeight : 100}).panelInstance('address');

                })
                .fail(function () {
                   console.log('Progress not loaded');
                });
	};
	
	$instance.DemoSlider = function () {
		$.getScript(base_url + "/Themes/Release/javascript/jquery.cycle.all.js")
                .done(function () {
					$('#demo-slider .slides').cycle({
					slideExpr: '.slide',
					cleartypeNoBg: ' true' ,
					fx: 'fade',
					timeout:2000,
					speed: 500,
					fit: 1,
					slideResize: 0,
					containerResize:0,
					height:'auto',
					width:null,
					pager: '.controls'
				});	
					$("#demo-slider .slides").height($("#demo-slider .slide").height());
                })
                .fail(function () {
                   console.log('Demo Slider not loaded');
                });
	};
	
	
};

HighChart = new function () {
    var $instance = this;
	$instance.init = function () {
		
		$('.PieChart').hide();
		$('.ColumnChart').hide();
		$('.TableChart').hide();
		$('.TableChart').show();
		$(".ChartNav a").click (function () {
			$(".ChartNav a").removeClass('active');
			$(this).addClass('active');
			$('.PieChart').hide();
			$('.ColumnChart').hide();
			$('.TableChart').hide();
			var chart_value = $(this).data('chart');
			$('.'+chart_value+'Chart').show();
		});

	};
	
	$instance.PieChart = function(div_ID, chart_value, title, text_title){
					$('#'+div_ID).highcharts({
								chart: {
									plotBackgroundColor: null,
									plotBorderWidth: null,
									plotShadow: false,
									type: 'pie'
								},
								title: {
									text: text_title,
									align : 'left',
									style : { "fontSize": "22px" },
									x : 30,
									y : 30
								},
								tooltip: {
									pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
								},
								plotOptions: {
									pie: {
										allowPointSelect: true,
										cursor: 'pointer',
										//center: ['25%', '150px'],
										dataLabels: {
											enabled: true,
											formatter: function() {
												return Math.round(this.percentage*100)/100 + ' %';
											},
											style: {
												textShadow: false ,
												fontSize : '16px'
											},
											distance: -40,
											color: 'white'
										},
										showInLegend: true,
									    size: 300
									}
								},
								credits: {
									enabled: false
								}, 
								legend: {
									enabled: true,
									layout: 'vertical',
									align: 'right',
									verticalAlign: 'middle',
									labelFormatter: function() {
										return this.name + ' -  ' + this.y + ' No. of Users';
									},
									itemStyle: {
										 font: '12pt Trebuchet MS, Verdana, sans-serif',
										 color: '#333',
										 paddingBottom: '20px'
										 
									}
								},
								series: [{
									name: title,
									colorByPoint: true,
									data: chart_value
								}]
					});		
	};
	
	
	$instance.ColumnChart = function(div_ID, key, data_value, title, text_title){
	
					//make percentage here
					var dataSum = 0;
					for (var i=0;i < data_value.length;i++) {
						dataSum += data_value[i];
					}
					//end here
					
					
					$('#'+div_ID).highcharts({
					   chart: {
						type: 'column'
					},
					title: {
									text: text_title,
									align : 'left',
									style : { "fontSize": "22px" },
									x : 30,
									y : 20
					},
					subtitle: {
						text: ''
					},
					xAxis: {
						categories: key,
						crosshair: true
					},
					yAxis: {
						min: 0,
						title: {
							text: 'No. of Users'
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px;color:{series.color};padding:0">{series.name}: {point.key}</span><table>',
						pointFormat: '<td style="padding:0"><b> {point.y} Users </b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0,
							dataLabels: {
								enabled: true,
								  formatter: function() { return Math.round(this.y*100/dataSum) + ' %'; },
								  style: {
												textShadow: false,
												fontSize : '18px',
												fontWeight: 'bolder'
								  },
								 color: '#333'
							},
							events: {
									legendItemClick: function () {
										return false; 
									}
								}
						},
						allowPointSelect: false,
					},
					series: [{
						name: title,
						data: data_value

					}],
					credits: {
						enabled: false
					}
					});		
	};
	
};




$(document).ready(function() {
    
    //demo link for sales
    $(document).on('click','#demo-link-sales',function(){
        $( "#demo-link-sales .error_msg").remove();
        $( ".demo-msg-value").remove();
        $.ajax({
            type : 'POST',
            url : base_url + '/corporate_demo.php',
            success : function(data){
                var response = $.parseJSON(data);
                if(response.status == 'success'){
                    $( "<span class='demo-msg-value' style='color:#FFF'> Your demo id is "+ response.demoId +"  </span>" ).insertAfter("#demo-link-sales");

                }else{
                    $( "<span class='error_msg demo-msg-value'> Please retry again. </span>" ).insertAfter("#demo-link-sales");
                    $( "#demo-link-sales").val( "Save" );
                   
                }
            }
        });
    });
    
    
    //ajax request for checking emails is valid or not
	$(document).on('blur','.autocheck-email',function(){
            $( "#sign-up-form li").removeClass( "has-error" );
            $( "#sign-up-form .error_msg").remove();
            var action_file_url = base_url+'/ajax_files/saas_user_registration.php';
            var email = $('.autocheck-email').val();
            $.ajax({
		type: "GET",
		url: action_file_url,
		data: {email:email},
		async: false,
		success: function(data) {
                    var response = $.parseJSON(data);
                        if(!response.status) {
                            $("input[name=email]").closest('li').addClass( "has-error" );
                            $( "<span class='error_msg'> "+response.msg+" </span>" ).insertAfter("input[name=email]");
                            
			} 
                    }
                            
                });
        });
	
	$('.confirm_click').click(function(){
			$('.confirm_now_click').modal('show');
			var action_url = $(this).data('link');
			$("#confirm_click_link").attr('href', action_url);	
	});
	
	$(document).on('click', '.close', function() {
		$('.msgErrortop').slideUp()
	});
	
	$('.open_modal').click(function(){
			var action_url_register = $(this).data('link');
			$('#SignUp_loginForm .modal-body').load(action_url_register, function(e){
			$('#SignUp_loginForm').modal('show');
		});	
	});
	
	//	$('.open_modal_saas_popup').click(function(){
	$(document).on("click",".open_modal_saas_popup", function(){ 
			var action_url_sms = $(this).data('link');
			var title = $(this).data('title');
			$('#sms_window .modal-title').html(title);
			$('#sms_window .modal-body').load(action_url_sms, function(e){
				$('#sms_window').modal('show');
			});	
	});	
	
	$(document).on("click","#resetSaasUserPassword", function(){ 
		if($(this).text() == 'Login') {
			$('#saas_login_form').show();
			$('#saas_forgot_password_form').hide();
			$(this).text('Forgot Password?');
		} else {
			$('#saas_login_form').hide();
			$('#saas_forgot_password_form').show();
			$(this).text('Login');
		}
	
	});
	

	$(document).on("click","#password_reset_saas_user", function(){ 
			
			$( "#saas_forgot_password_form .error_msg").remove();
			$( "#saas_forgot_password_form .alert-success").hide();
			$( "#saas_forgot_password_form li").removeClass( "has-error" );
			
	
	
			var email = $('#email_address_password').val();
			var season_url = $('#season_url').val();
			var return_url = $('#contest_url').val();
			
			//var codejudge_client_event = $('#codejudge_client_event').val();
			//codejudge_client_event = (typeof codejudge_client_event === "undefined") ? "" : codejudge_client_event;
			
			$.ajax({
			   type: 'POST',
			   url: base_url+'/ajax_files/saas_corporate_function.php?action=saasuserpassword_reset',
			   data: {'email':email, 'season_url':season_url, 'return_url':return_url},
					success: function(response){
					response = $.trim(response);
					var msg = $.parseJSON(response);
					if(msg.status == 'success') {
						if(msg.season_url == 'bosch') {
						$("#saas_forgot_password_form .alert-success").html('We have sent you an email that will allow you to reset your password quickly and easily.').show();
						} else {
						$("#saas_forgot_password_form .alert-success").html('We have sent you an email and SMS that will allow you to reset your password quickly and easily.').show();
						}
						$("#password_reset_saas_user").addClass( "disabled" );
						setTimeout("$('#SignUp_loginForm').modal('hide')", 2000);
					} else { 
					  $.each(msg, function (index, value) {
									$("input[name="+index+"]").closest('li').addClass( "has-error" );
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("input[name="+index+"]");
						});	
					}
				}
			})
			
	});
	
        $('.next-page-redirect').click(function(){
	
			var action_url = $(this).data('link');
			var is_compile = $('#is_compile').val();
                        var is_submitted = $('#is_submitted').val();
			
			if(is_compile == 1) {
				bootbox.confirm({ 
					//size: 'small',
					title: "Code Is Not Submitted",
					message: "<p> Your code is not yet submitted. Do you wish to continue to next question without submitting the code?  </p>", 
					callback: function(result){
						if(result) {  
								window.location.href = action_url;
						} else {
								
						}
					}
				});
			}else if(is_submitted == 'no'){
                            bootbox.confirm({ 
					//size: 'small',
					title: "File Not Submitted",
					message: "<p> You have not submitted file  Do you wish to continue.</p>", 
					callback: function(result){
						if(result) {  
                                                    window.location.href = action_url;
						} else {
								
						}
					}
				});
                        }
                    else {
				window.location.href = action_url;
			}
	
	});

	$('.signUp_Form').click(function(){
			$('#SignUpForm .modal-body').load(base_url+'/ajax_files/saas_register.php', function(e){
			$('#SignUpForm').modal('show');
		});	
	});
	
	$('.user-capture-gallery').click(function(){
			var action_url = $(this).data('link');
			$('#capture_screen .modal-body').load(action_url, function(e){
			$('#capture_screen').modal('show');
		});	
	});
	
	$("#sidebar").height($(window).height()- ($("#header").height() + $("#footer").innerHeight()));
	
	if (Function('/*@cc_on return document.documentMode===11@*/')() || Function('/*@cc_on return document.documentMode===10@*/')() || Function('/*@cc_on return document.documentMode===9@*/')() || Function('/*@cc_on return document.documentMode===8@*/')()) {
		$("body").addClass("ie-platform");
    } else {
		$("body").removeClass("ie-platform");
    }
	
	var re_windowHeight = $(window).height() - ($("#header").height() + $("#footer").innerHeight());
	$("#register-page .box1").css('min-height', re_windowHeight);
	
	var library_footerHeight = $(window).width() - ($("#sidebar").width() + 30);
	$("#add-from-library footer").width(library_footerHeight);
	
	$('#main-navigation .menu-btn').click(function(){
			$('#main-navigation ul').slideToggle();
	});
	
	$(".codehire #user-panel, .codehire .content-area").css("min-height", $(window).height() - ($("#header").height() + $(".codehire .user-info-bar").innerHeight()));
	
	if($(window).width() < 767 ){
			$("#user-panel").addClass("collapseMenu");
	}
	//Controlling input of whitespaces from text field
        $(function(){
            $('#season_url').bind('input', function(){
            $(this).val(function(_, v){
                return v.replace(/\s+/g, '');
                });
            });
        });
        
	$('#season_url').keyup(season_url_check);
        
	$('#home_page_season_url').keyup(season_home_url_check);
	
	
	  $('#editor-box .expand-collapse-btn').click(function(){
			$('#full-screen-question').toggleClass('expanded');
			$('body').toggleClass('full-screen-view');
			
			if($('#full-screen-question').hasClass('expanded')){
				$('#full-screen-question #question-area, #full-screen-question #editor-box').innerHeight($(window).height());	
				$("body.codehire").css("overflow", "hidden");
				
				//create cookie
				$.cookie("question-full-screen", "1");
				
			}else{  
				$('#full-screen-question #question-area, #full-screen-question #editor-box').css('height', 'auto');
				$("body.codehire").css("overflow", "visible");
				
				//delete cookie
				$.cookie("question-full-screen", "");
				
			}
			
		});	

		$('#editor-box .user-actions .keyboard-btn').click(function(){
			$("#keyboard-bindings").modal('show');
		});
		
		$('#editor-box .user-actions .settings-btn').click(function(){
			$(this).toggleClass("active");
			$("#settings-dropdown").toggle();
		});
		
		$(document).on("click", function(event){
			var $trigger = $("#editor-box .user-actions");
			if($trigger !== event.target && !$trigger.has(event.target).length){
				$(this).find("#settings-dropdown").hide();
				$("#editor-box .editor-controllers > ul > li > a").removeClass("active");
			}            
		});
		
		$('#settings-dropdown .btn-group .btn').each(function(){
			$(this).click(function(){
				$("#settings-dropdown .btn-group .btn").removeClass("active");
				$(this).addClass("active");
				var btnValue = $(this).html();
				var btnEditorValue = $(this).data('value');
				$("#editor-box .editor-footer .editor-mode").html(btnValue);
				editor.setKeyboardHandler("ace/keyboard/"+btnEditorValue);
				$('#settings-dropdown').hide();
				$("#editor-box .editor-controllers > ul > li > a").removeClass("active");
			});
			
		});
		
			
			$("#downloadUserCode").click( function () {
				
				var candidate_code = editor.getValue();
				var code_extension = $('#defaultlanguage').val();
				$('#candidate_code').val(candidate_code);
				$('#code_extension').val(code_extension);
				$('#download_user_code').submit();
				
			});
			
			$( "#change_editor_themes" ).change(function() {
				var btnthemeValue = $(this).val();
				editor.setTheme(btnthemeValue);
				$('#settings-dropdown').hide();
			});
			
			$("#auto-complete").click( function () {
				
				var autocomplete_type = $("input:checkbox[name=auto_complete_snippet]:checked").val();
				if(autocomplete_type == 1) {
						editor.setOptions({
							enableBasicAutocompletion: true,
							enableSnippets: true
						});
				} else {
						editor.setOptions({
							enableBasicAutocompletion: false,
							enableSnippets: false
						});
				}
				editor.setShowPrintMargin(true);
				$('#settings-dropdown').hide();
			});
			
			$( "#fontsize" ).change(function() {
				var fontValue = $(this).val();
					editor.setOptions({
					  //fontFamily: "tahoma",
					  fontSize: fontValue
					});

					$('#settings-dropdown').hide();
			});
			
			$( "#tab_space" ).keyup(function() {
				var tabValue = $(this).val();
				editor.getSession().setTabSize(tabValue);
				//$('#settings-dropdown').hide();
			});

		

	$('.changeClientStatus').click(function(){
	var objButton = $(this);
	var admin_id = $(this).data('admin_id');
	var status = $("#client_"+admin_id).val();

	
			$.ajax({
			   type: 'POST',
			   url: base_url+'/ajax_files/saas_corporate_function.php?action=changeClientStatus',
			   data: {status:status,admin_id:admin_id},
				  success: function(response){
				  var msg = $.parseJSON(response); 
					if(msg.status == 'success') {
					  $(objButton).text(msg.new_status_msg);
					  $("#client_"+msg.admin_id).val(msg.admin_status);
					  $(objButton).attr( "data-admin_id", msg.admin_id );
					} else { 
					  //
					}
				}
			})
	});
	
	$('.changeUserActivation').click(function(){
	var objButton = $(this);
	var user_id = $(this).data('user_id');
	var season_id = $(this).data('season_id');
	var status = $("#user_"+user_id).val();

	
			$.ajax({
			   type: 'POST',
			   url: base_url+'/ajax_files/saas_corporate_function.php?action=changeUserActivation',
			   data: {'status':status,'user_id':user_id,'season_id':season_id},
				  success: function(response){
				  var msg = $.parseJSON(response); 
					if(msg.status == 'success') {
					  $(objButton).text(msg.new_status_msg);
					  $("#user_"+msg.user_id).val(msg.admin_status);
					  //$(objButton).attr( "data-admin_id", msg.admin_id );
					} else { 
					  //
					}
				}
			})
	});
	
	$('.proceed_next_question_step').click(function(){
	
		var action_link = $(this).data('link');
		var question_id = $("#question_id").val();
	
			$.ajax({
			    type: 'POST',
			    url: base_url+'/ajax_files/saas_corporate_function.php?action=proceed_next_question_step',
			    data: {'question_id':question_id},
				  success: function(response){
				  var msg = $.parseJSON(response); 
					if(msg.status == 'success') {
					  window.location.href = action_link;
					} else { 
						bootbox.alert({ 
							title: "TestCase Validation",
							message: "<p class='alert alert-warning'> Warning : Please add minimum one default test-case and one basic test case  </p>", 
							callback: function(){	
								//
							}
						});	
					}
				}
			})
	});
	
	$('.user-web-cam').click(function(){
			var action_url = $(this).data('link');
			//$('#user-web-cam-screen .modal-body').load(action_url, function(e){
			//$('#user-web-cam-screen').modal('show');
				  //window.open(action_url,'name','height=500,width=');
		  var w = 700;
		  var h = 500;
		  var left = (screen.width/2)-(w/2);
		  var top = (screen.height/2)-(h/2);
		  window.open(action_url, 'Snapshots', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
			//});
	});
	
	$("#btn_copy").click(function(){
	  var holdtext = $("#share_url").val();
	  Copied = holdtext.createTextRange();
	  Copied.execCommand("Copy");
	});
	
	$(document).on("click","#activation_client_verification_link", function(){
			action_url = base_url+'/ajax_files/saas_corporate_function.php?action=SendClientVerificationLink';
			var token = $(this).data('link');
			$.ajax({
						type: "POST",
						url: action_url, 
						data: {token:token},
						async: false,
						success: function(data){
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'error') {
								alert('something error!');
							} else {
									$('.signup-success-msg span').html("The activation email has been sent again. Please check your inbox.");
									$('#activation_link').remove();
							}	
						}
			});
	});
	
	$("#create_interview").click(function(){
			
			$( "#create-interviews .form-group").removeClass( "has-error" );
			$( "#create_interview").val( "Processing..." );
			$( "#create_interview").addClass( "disabled" );
			$( "#create-interviews .error_msg").remove();

			$.ajax({
						type: "POST",
						url: $("#create-interviews").attr('action'), 
						data: $( "#create-interviews").serialize(),
						async: false,
						success: function(data){
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'exceed') {
								lockedcontest_question();
							}
							else if(msg.status == 'error') {
								$("#create_interview").removeClass( "disabled" );
								$("#create_interview").val("Create Interview");
								
								$.each(msg, function (index, value) {
									$("input[name="+index+"], select[name="+index+"], textarea[name="+index+"]").closest('div').addClass( "has-error" );
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("input[name="+index+"], select[name="+index+"], textarea[name="+index+"]");
								});	
								
							} else {
								window.location.href = base_url+'/recruit/interviews/myinterviews/16004/1';
							}	
						}
			});
	});
	
	$('#add-more-options').click(function(){
			
			var options_cnt = $("#options_cnt").val();
			
			//u can add maximum 10 choices
			if(options_cnt >9) {
			$('#alert-max-choices').modal('show');
				return false;
			}
			
			$.get(base_url+'/ajax_files/saas_add-more-choices.php?options_cnt='+options_cnt, function(data){ 
			  $(data).insertAfter("#first-choice-option-"+options_cnt);
			  var new_options_cnt = parseInt(options_cnt)+1;
			  $("#options_cnt").val(new_options_cnt);
			});
			
	});
	
	$("#completed-test, #submit-feedback").height($(window).height() - ($("#footer").innerHeight() + 68));
	
	$(document).on("click","#show_upload_file", function(){
		$('#upload-zip-file .modal-footer .button5').hide();
		$('#show_upload_file').hide();
		$('#upload').show();
		$('#upload_front_end').show();
		$(this).val('Upload');
		$('.file_upload_instructions').hide();
                $('#upload_front_end-project').show();
		$('.file_upload').show();
	});
	
	$('#search-test').keyup(function(){
		var valThis = $(this).val().toLowerCase();
		if(valThis) {
			$('.pagination1').hide();
		} else {
			$('.pagination1').show();
		}
		$('table tr td').each(function(){
			var text = $(this).text().toLowerCase();
			(text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();            
		});
	});
	
	var techbannerSrc = $(".techBanner img").attr("src");
	$(".techBanner").css("background-image", "url(" + techbannerSrc + ")");
	
	/* $('#QuestionFeedback').click(function () {
		$("#completed-test").hide();
		$("#submit-feedback").show();
	}); */
	
	$('#search-questions').keyup(function(){
		var valThis = $(this).val().toLowerCase();
		if(valThis) {
			$('.pagination1').hide();
		} else {
			$('.pagination1').show();
		}
		$('table tr td').each(function(){
			var text = $(this).text().toLowerCase();
			(text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();            
		});
	});
	
	$('input:radio[name="enable-candidate"]').change(
    function(){
        if ($(this).is(':checked') && $(this).val() == '2') {
			$('#html-design').hide();
			$('#upload-section').show();
        } else {
			$('#html-design').show();
			$('#upload-section').hide();
		}
    });
	
	$('#upload').on('click', function() {
		var contest_id = $('#contest_id').val();
		$('#upload').val( "Processing..." );
		$('#upload').addClass( "disabled" );
		$( "#upload-zip-file .error_msg").remove();
		var file_data = $('#file_upload').prop('files')[0];   
		var form_data = new FormData();                  
		form_data.append('file', file_data);                          
		form_data.append('contest_id', contest_id);                          
		$.ajax({
					url: base_url+'/ajax_files/saas_corporate_function.php?action=UploadZipFiles', 
					dataType: 'text',  // what to expect back from the PHP script, if anything
					cache: false,
					contentType: false,
					processData: false,
					data: form_data,                         
					type: 'post',
					success: function(data){
							$('#upload').removeClass( "disabled" );
							$('#upload').val("Upload");
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'error') {
								$("<span class='error_msg'> "+msg.file+" </span>").insertAfter(".btn-file");
							} else if(msg.status == 'success') {
								//window.location.href = base_url+'/recruit/test/'+msg.season_id+'/questions/'+msg.contest_id+'/'+msg.category_key+'/edit/step2';
								$('#upload-zip-file').modal('hide');
								location.reload(); 
							} else {
								$("<span class='error_msg'> Could not upload file </span>").insertAfter(".btn-file");
							}	
					}
		 });
	});
	
	
	
	
	//admin new registration
	$('#new-admin-user').click(function(){
		
		$( "#admin-new-registration li").removeClass( "has-error" );
		$( "#new-admin-user").val( "Processing..." );
		$( "#new-admin-user").addClass( "disabled" );
		$( "#admin-new-registration .error_msg").remove();
		$.ajax({
			type: "POST",
			url: base_url+'/ajax_files/saas_corporate_function.php?action=AddNewSaasAdmin', 
			data: $( "#admin-new-registration").serialize(),
			async: false,
			success: function(data) {
						$( "#new-admin-user").removeClass( "disabled" );
						$( "#new-admin-user").val( "Save" );
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
							if(status == 'error') {
								$.each(msg, function (index, value) {
									$("input[name="+index+"], select[name="+index+"], textarea[name="+index+"]").closest('li').addClass( "has-error" );
									if(index == 'units') {
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("#unitPlans");
									} else {
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("input[name="+index+"], select[name="+index+"], textarea[name="+index+"]");
									}
								});	
								  
							}  else {
								//$('#admin-new-registration').trigger("reset");
								$('#user_create').text(msg.message);
								$('.alert-success').show();
							}		
			}
		});
	});

						
	$('#test-question-setting').click(function() {
		var objButton = $(this);
		var form = $(this).parents('form:first');
		$(this).text( "Processing...");
		$(this).addClass("disabled");
		$.ajax({
			type: "POST",
			url: form.attr('action'), 
			data: $("#random-category-questions").serialize(),
			async: false,
			success: function(data) {
						$(objButton).removeClass( "disabled" );
						$(objButton).text( "Saved!" );
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
							if(status == 'error') {
								//$( ".alert-success").show();
							} else if(status == 'invalid') {
								$("#category_random_question").text(msg.key);
								$('#random_setting_error').modal('show');
								$(objButton).text( "Save" );
							} else if(status == 'invalid_count') {
								$("#category_random_question_count_error").text(msg.key);
								$('#random_setting_count_error').modal('show');
								$(objButton).text( "Save" );
							} else {
								//$( ".alert-success").show();
							}	
			}
		});
	});
  
  
  $('#monitoring-test_setting').click(function() {
		var objButton = $(this);
		var form = $(this).parents('form:first');
		$(this).text( "Processing...");
		$(this).addClass("disabled");
		$.ajax({
			type: "POST",
			url: form.attr('action'), 
			data: $("#form-inline-proctoring").serialize(),
			success: function(data) {
						$(objButton).removeClass( "disabled" );
						$(objButton).text( "Saved!" );
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
						if(status == 'error') {
							//$( ".alert-success").show();
						} else if(status == 'invalid') {
							$("#category_random_question").text(msg.key);
							$('#random_setting_error').modal('show');
							$(objButton).text( "Save" );
						} else {
							//$( ".alert-success").show();
						}	
			}
		});
	});
  $('#test-question-tags').click(function() {
		var objButton = $(this);
		var form = $(this).parents('form:first');
		$(this).text( "Processing...");
		$(this).addClass("disabled");
		$.ajax({
			type: "POST",
			url: form.attr('action'), 
			data: $("#form-inline-tags").serialize(),
			success: function(data) {
						$(objButton).removeClass( "disabled" );
						$(objButton).text( "Saved!" );
							
			}
		});
	});
	
	  $('#copy_paste_setting').click(function() {
		var objButton = $(this);
		var form = $(this).parents('form:first');
		$(this).text( "Processing...");
		$(this).addClass("disabled");
		$.ajax({
			type: "POST",
			url: form.attr('action'), 
			data: $("#copy_paste_setting_form").serialize(),
			success: function(data) {
						$(objButton).removeClass( "disabled" );
						$(objButton).text( "Saved!" );
						data = $.trim(data);
						var msg = $.parseJSON(data);
			}
		});
	});
  
  $('#extra-information_setting').click(function() {
		var objButton = $(this);
		var form = $(this).parents('form:first');
		$(this).text( "Processing...");
		$(this).addClass("disabled");
		$.ajax({
			type: "POST",
			url: form.attr('action'), 
			data: $("#form-extra-information").serialize(),
			async: false,
			success: function(data) {
						$(objButton).removeClass( "disabled" );
						$(objButton).text( "Saved!" );
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
						if(status == 'error') {
							//$( ".alert-success").show();
						} else if(status == 'invalid') {
							$("#category_random_question").text(msg.key);
							$('#random_setting_error').modal('show');
							$(objButton).text( "Save" );
						} else {
							//$( ".alert-success").show();
						}	
			}
		});
	});
  
  
  $('#attached-season_setting').click(function() {
		var objButton = $(this);
		var form = $(this).parents('form:first');
		$(this).text( "Processing...");
		$(this).addClass("disabled");
		$.ajax({
			type: "POST",
			url: form.attr('action'), 
			data: $("#form-attached-seasons").serialize(),
			async: false,
			success: function(data) {
					$(objButton).removeClass( "disabled" );
					$(objButton).text( "Saved!" );
					data = $.trim(data);
					var msg = $.parseJSON(data);
					
					var status = msg.status;
					if(status == 'error') {
						//$( ".alert-success").show();
					} else if(status == 'invalid') {
						$("#category_random_question").text(msg.key);
						$('#random_setting_error').modal('show');
						$(objButton).text( "Save" );
					} else {
						//$( ".alert-success").show();
						$('#old_seasons_attached').val(msg.attched_seasons_ids);
						$('#count_attach_season_id').val(msg.count_attach_season_id);
						window.location.href = base_url + '/' + saas_prefix + '/test/' + msg.season_id + '/advanced-settings?msg_id=3007';
					}	
			}
		});
		
	});
	
	$(document).on("click","#upload_front_end", function(){
		var contest_id = $('#contest_id').val();
		var invitation_id = $('#invitation_id').val();
		var question_category = $('#question_category').val();
                var webcam_val = $('#webcam_enable').val();
		$('#upload_front_end').val( "Processing..." );
		$('#upload_front_end').addClass( "disabled" );
		$( "#upload-zip-file .error_msg").remove();
                var test_action_url = $('#test_action_url').val(); 
		var file_data = $('#file_upload').prop('files')[0];   
		var form_data = new FormData();                  
		form_data.append('file', file_data);                          
		form_data.append('contest_id', contest_id);                          
		form_data.append('invitation_id', invitation_id);                          
		form_data.append('question_category', question_category);                          
                var page_number = $('#next_page_count').val(); 
                if(test_action_url != '') {
                    var contest_redirect_url = test_action_url;
                }
		$.ajax({
					url: base_url+'/ajax_files/saas_candidate_function.php?action=UploadZipAttemptFiles', 
					dataType: 'text',  // what to expect back from the PHP script, if anything
					cache: false,
					contentType: false,
					processData: false,
					data: form_data,                         
					type: 'post',
					success: function(data){
							$('#upload_front_end').removeClass( "disabled" );
							$('#upload_front_end').val("Upload");
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'error') {
								$("<span class='error_msg'> "+msg.file+" </span>").insertAfter(".btn-file");
							} else if(webcam_val == 1) {
                                                            if(page_number != 'none'){
                                                               var action_url = contest_redirect_url+'/ajax/'+invitation_id+'/'+page_number;
                                                            $('.append-question-detail-ajax').load(action_url, function(responseTxt, statusTxt, xhr){

                                                            });	
                                                            }else{
                                                                var action_url = contest_redirect_url+'/ajax/'+invitation_id;
                                                            $('.append-question-detail-ajax').load(action_url, function(responseTxt, statusTxt, xhr){

                                                            });	
                                                            }
                                                            $('#upload-zip-file').modal('hide');
                                                            $('body').removeClass('modal-open');
                                                            $('.modal-backdrop').remove();
							}  else if(msg.status == 'success') {
								//window.location.href = base_url+'/recruit/test/'+msg.season_id+'/questions/'+msg.contest_id+'/'+msg.category_key+'/edit/step2';
								$('#upload-zip-file').modal('hide');
								location.reload(); 
							} else {
								$("<span class='error_msg'> Could not upload file </span>").insertAfter(".btn-file");
							}	
					}
		 });
	});
	
  
	//saas contact lead
	$('#generate-lead').click(function(){
		$( "#corporate-lead-form li").removeClass( "has-error" );
		$( "#generate-lead").val( "Processing..." );
		$( "#generate-lead").addClass( "disabled" );
		$( "#corporate-lead-form .error_msg").remove();
		var action_file_url = base_url+'/ajax_files/saas_corporate_function.php?action=SaveCorporateContact';
		$.ajax({
			type: "POST",
			url: action_file_url,
			data: $("#corporate-lead-form").serialize(),
			async: false,
			success: function(data) {
						$( "#generate-lead").removeClass( "disabled" );
						$( "#generate-lead").val( "Submit" );
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
							if(status == 'error') {
								$.each(msg, function (index, value) {
									if(index == 'location') {
									$("span.select").closest('li').addClass( "has-error" );
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("span.select");
									} else {
									$("input[name="+index+"],textarea[name="+index+"]").closest('li').addClass( "has-error" );
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("input[name="+index+"],textarea[name="+index+"]");
									}
								});	
							} else {
								//window.location.href = base_url+'/recruit/dashboard';	
								$(':input').val('');
								$( "#corporate-lead-form").remove();
								$( "#generate-lead").remove();
								$( "#thanks-submission").show();
								$( ".alert-success").show();
							}	
			}
		});
	});

	$('.question_remove_contest').click(function(){
			
			var season_id = $(this).data('season_id');
			//var category_id = $(this).data('category_id');
			//var question_fetch_table = $(this).data('question_fetch_table');
			var contest_id = $(this).data('id');
			var action_url =  base_url+'/ajax_files/saas_corporate_function.php?action=removeQuestion';
			var marks = $(this).data('marks');
                        var category_key = $(this).attr('data-category-key');
                        var rowCount = ($('table#row-count-question tr:last').index())/2;
                        var loc = window.location.href.split('/');
                        var page_number = loc[loc.length - 1];
                        console.log(rowCount);
                        console.log(page_number);
			//return false;
			var objButton = $(this);
			var action_text = $.trim($(objButton).text());	
			$.ajax({
						type: "POST",
						url: action_url, 
						data: {contest_id:contest_id,season_id:season_id,marks:marks},
						success: function(data){
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'error') {
								alert('something error!');
							} else if(msg.status == 'success') {
									//window.location.href = base_url+'/recruit/test/'+msg.season_id+'/questions/85004/1';
									$('#question_list_'+contest_id).next(".open-content").remove();
									$('#question_list_'+contest_id).remove();
                                                                        if(saas_prefix === 'recruit' && rowCount-1 == 0){
                                                                            
                                                                            if($.isNumeric(page_number) && page_number > 1){
                                                                                page_number = page_number-1;
                                                                                var surl = base_url +'/'+ saas_prefix +'/test/' + season_id +'/questions/page/'+page_number;
                                                                                window.location.href= base_url +'/'+ saas_prefix +'/test/' + season_id +'/questions/page/'+page_number;
                                                                            }else if($.isNumeric(page_number) && page_number == 1){
                                                                                window.location.href= base_url +'/'+ saas_prefix +'/test/' + season_id +'/questions';
                                                                               
                                                                            }
                                                                        }
                                                                        if(saas_prefix === 'code/add'){
                                                                            window.location.href= base_url + '/code/add/test/'+ season_id +'/questions/15021/1/battle/'+category_key;
                                                                        }                                                                        
                                                                        
							} else {
								alert('something error!');
							}	
						}
			});
	});
	
	$(document).on("click",".try_test_demo", function(){
	
			//window.open($('#redirect_link').attr('href')); 
			
			action_url = base_url+'/ajax_files/saas_corporate_function.php?action=TryTestContest';
			var season_id = $(this).data('season_id');
			$.ajax({
				type: "POST",
				url: action_url, 
				data: {season_id:season_id},
				success: function(data){
					data = $.trim(data);
					var msg = $.parseJSON(data); 
					if(msg.status == 'error' && msg.error_type == 'season_url') {
						$('#msg-add-requirement-url').modal('show');
					} else if(msg.status == 'error' && msg.error_type == 'question_id') {
						$('#msg-add-question').modal('show');
					} else if(msg.status == 'error' && msg.error_type == '') {
						alert('something error!');
					} 	else {
						if(msg.parent_contest=='true') {
						  var url = msg.season_url;	
						} else {
						  var url = base_url+'/challenge/'+msg.season_url;	
						}
						//alert(url); 
						window.open(url, '_blank');
					}	
				}
			});
	});
	
	
	$('.saas_invite_candidate').click(function(){
			//window.open($('#redirect_link').attr('href')); 
			
			var action_url = base_url+'/ajax_files/saas_corporate_function.php?action=invite_saas_candidate';
			var season_id = $(this).data('season_id');
				$.ajax({
					type: "POST",
					url: action_url, 
					data: {season_id:season_id},
					success: function(data){
						data = $.trim(data);
						var msg = $.parseJSON(data); 
						if(msg.status == 'season_url') {
							$('#msg-add-requirement-url').modal('show');
						} else if(msg.status == 'question_id') {
							$('#msg-add-question').modal('show');
						} else	{
							window.location.href = base_url+'/'+saas_prefix+'/test/'+season_id+'/candidates/invite';
						}	
					}
				});
	});
	
	$('.library_question_add').click(function(){
			
			var season_id = $('#season_id').val();
			var category_id = $('#category_id').val();
			if(category_id == 'others') {
				category_id = $(this).data('category');
			} else {
				category_id = category_id
			}
			var question_fetch_table = $('#question_fetch_table').val();
			var contest_id = $(this).data('id');
			var action_url = $(this).data('link');
			var marks = $(this).data('marks');
			var objButton = $(this);
			$(objButton).hide();
			var action_text = $.trim($(objButton).text());	
			$.ajax({
						type: "POST",
						url: action_url, 
						data: {category_id:category_id,contest_id:contest_id,season_id:season_id,question_fetch_table:question_fetch_table,marks:marks},
						success: function(data){
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'error') {
								$( "<span class='error_msg'> "+value+" </span>" ).insertAfter(".checkboxes");
							} else if(msg.status == 'exceed') {
								$(objButton).next(".library_question_add").show();
								lockedcontest_question();
							} else if(msg.status == 'success') {
								$('#testcase_cnt').text(msg.q_cnt);
								$('#score-season').text(msg.total_marks);
								if(action_text == 'ADD') {
								$(objButton).next(".library_question_add").show();
								} else {
								$(objButton).prev(".library_question_add").show();
								}
								
							} else {
								$( "<span class='error_msg'> Could not save Test </span>" ).insertBefore("#save-template");
							}	
						}
			});
	});	
	
	
	$('.request_vendor_question').click(function(){
			var season_id = $('#season_id').val();
			var category_id = $('#category_id').val();
			if(category_id == 'others') {
				category_id = $(this).data('category');
			} else {
				category_id = category_id
			}
			$('.pull-right span').html("").hide();
			var contest_id = $(this).data('id');
			var action_url = $(this).data('link');
			var objButton = $(this);
			$(objButton).prev("span").hide(); 
			$.ajax({
					type: "POST",
					url: action_url, 
					data: {category_id:category_id,contest_id:contest_id,season_id:season_id},
					success: function(data){
						data = $.trim(data);
						var msg = $.parseJSON(data); 
						$(objButton).prev("span").show();
						$(objButton).prev("span").html(msg.message);
					}
			});
	});	
	
	$(document).on('click', '#verify_schema', function() {
			
			$('#output_show').hide();
			$('.alert-danger').hide();
			$('.alert-success').hide();
			$('.alert').html();
			$('#output_show').html();
			var code = editor.getValue();
			var question_id = $('#question_id').val();
			var select_query = $('#select_query').val();
			var action_url =  base_url+'/ajax_files/saas_candidate_function.php?action=runDbStatement';
			$.ajax({
						type: "POST",
						url: action_url, 
						data: {code:code, question_id:question_id, select_query:select_query},
						success: function(data){
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'success') {
								$('#output_show').show();
								$('#user_output').html(msg.output);
								$('.alert-success').show();
								$( "#table_info" ).load(base_url+'/ajax_files/saas_database_info.php?question_id='+question_id, function() {
								  //alert( "Load was performed." );
								});
							} else {
								$('.alert-danger').show();
							}
							$('.alert').html(msg.message);
						}
			});
	});	
	
	//method use after data load using ajax 
	$(document).on('click', '.library_question_add', function() {
			
			var season_id = $('#season_id').val();
			var category_id = $('#category_id').val();
			var question_fetch_table = $('#question_fetch_table').val();
			var contest_id = $(this).data('id');
			var action_url = $(this).data('link');
			var marks = $(this).data('marks');
			var objButton = $(this);
			$(objButton).hide(); 
			var action_text = $.trim($(objButton).text());	
			$.ajax({
						type: "POST",
						url: action_url, 
						data: {category_id:category_id,contest_id:contest_id,season_id:season_id,question_fetch_table:question_fetch_table,marks:marks},
						success: function(data){
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'error') {
								$( "<span class='error_msg'> "+value+" </span>" ).insertAfter(".checkboxes");
							} else if(msg.status == 'exceed') {
								$(objButton).next(".library_question_add").show();
								$('.test-library-set').modal('hide');
								lockedcontest_question();
							} else if(msg.status == 'success') {
								$('#testcase_cnt').text(msg.q_cnt);
								$('#score-season').text(msg.total_marks);
								if(action_text == 'ADD') {
								$(objButton).next(".library_question_add").show();
								} else {
								$(objButton).prev(".library_question_add").show();
								}
								
							} else {
								$( "<span class='error_msg'> Could not save Test </span>" ).insertBefore("#save-template");
							}	
						}
			});
	});
	
	
	$('.view_mcq_set').click(function(){
			
			var skill_id = $(this).data('id');
			var season_id = $(this).data('season_id');
			var action_url = $(this).data('link');
			var category = $(this).data('category');
			var title = $('#title_'+skill_id).text();
			var objButton = $(this);
			var action_text = $.trim($(objButton).text());	
			$.ajax({
						type: "POST",
						url: action_url, 
						data: {skill_id:skill_id,title:title,category:category,season_id:season_id},
						success: function(data){
							data = $.trim(data);
							$('.test-library-set').html(data);
							$('.test-library-set').modal('show');
						}
			});
	});	
	
	$('#save_requirement_url').click(function(){
			
			var season_url = $(".requirement_url #season_url").val();
			var season_id=$('input[name=season_id]').val();

			var action_url = base_url+'/ajax_files/saas_corporate_function.php?action=saveRequirementUrl';

			$.ajax({
						type: "POST",
						url: action_url, 
						data: {season_url:season_url,season_id:season_id},
						success: function(data){
								$('#save_requirement_url').text('saved!');
						}
			});
	});
	$('#save_master_password').click(function(){
			
			var master_password = $("#master_password").val();
			var season_id=$('input[name=season_id]').val();

			var action_url = base_url+'/ajax_files/saas_corporate_function.php?action=saveMasterPassword';

			$.ajax({
						type: "POST",
						url: action_url, 
						data: {master_password:master_password,season_id:season_id},
						success: function(data){
								$('#save_master_password').text('saved!');
						}
			});
	});
	
	$(document).on('click', '.Show_mcqQuestion', function() {
			var question_id = $(this).data('id');
			var season_id = $(this).data('season_id');
			var action_url =  base_url+'/ajax_files/saas_fetch_mcq_question.php?question_id='+question_id+'&season_id='+season_id;
			$("#question_view").load(action_url, function(response, status, xhr) {
			response = $.trim(response);
			if(response == 'no_record') {
				$("#question_view").html("No question to display");
			}
			});
	});
	
	$('#addTestCase, .EditTestCase').click(function(){
			var contest_id = $('#question_id').val();
			var season_id = $('#season_id').val();
			var testcase_id = $(this).data('id');
			if(typeof testcase_id === 'undefined') {
			var testcase_id = '';
			}
			$('#add-test-case .modal-body').load(base_url+'/ajax_files/saas_add_test_case.php?testcase_id='+testcase_id+'&contest_id='+contest_id+'&season_id='+season_id, function(e){
			$('#add-test-case').modal('show');
		});	
	});
	
	
	$('body').on('click', '.webcam_button', function (e){
        var invitation_id = $(this).data('invitation_id');
        var page_number = $('#next_page_count').val();

        var params = {};
        var modules = 'ShowQuestionDescriptionModule';
        params.question_id = $('#next_question_id').val();
        params.question_no = page_number-1;
        params.invitation_id = invitation_id;
                        
        $.ajax({
                        type: "POST",
                        url: base_url + "/ajax_files/load_question_module.php",
                        data: {params: params, modules: modules},
                        dataType: 'html',
                        cache: false,
                        success: function (data) {
                            $('#coding-content-area').html('');
                            $('#coding-content-area').html(data);
                        }
                    });
        
    });
	
	$('#project_step_1').click(function(){
		var objButton = $(this);
		var form = $(this).parents('form:first');
		$(form).find('.has-error').removeClass( "has-error" );
		$(this).val( "Processing..." );
		$(this).addClass( "disabled" );
		$(form).find('.error_msg').remove();
		var data = $('#myForm').serializeArray();
		var nicInstance_mail_message = nicEditors.findEditor('answer_options');
		var options = nicInstance_mail_message.getContent();
                options = encodeURIComponent(options.replace(/&nbsp;/g, ' '));
		$.ajax({
						type: "POST",
						url: form.attr('action'), 
						data: form.serialize()+ "&options="+options,
						success: function(data){
							data = $.trim(data);
							var msg = $.parseJSON(data);
							if(msg.review_parameters != '' && typeof msg.review_parameters !== 'undefined') {
								$(objButton).removeClass( "disabled" );
								$(objButton).val( "Save & Proceed" );	
                $("#parameter_error").html("<span class='error_msg'> "+msg.review_parameters+" </span>");						
              } else if(msg.review_marks != '' && typeof msg.review_marks !== 'undefined') {
								$(objButton).removeClass( "disabled" );
								$(objButton).val( "Save & Proceed" );
                $("#parameter_error").html("<span class='error_msg'> "+msg.review_marks+" </span>");
              } else if(msg.status == 'error') {
									$(objButton).removeClass( "disabled" );
									$(objButton).val( "Save & Proceed" );
									$.each(msg, function (index, value) {
									$("#"+index).closest('li').addClass( "has-error" );
									if(index != 'status') {
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("#"+index);
									}
									});
							} else if(msg.status == 'success') {
								$(objButton).val( "redirecting..." );
								window.location.href = base_url+'/recruit/test/'+msg.season_id+'/questions/'+msg.contest_id+'/'+msg.category_key+'/edit/step2';
							} else {
								$(objButton).removeClass( "disabled" );
								$(objButton).val( "Save & Proceed" );
								$( "<span class='error_msg'> Could not save Test </span>" ).insertBefore("#save-template");
							}	
						}
		});
	});
	
	$('#db_save_coutput').click(function(){
		var objButton = $(this);
		var form = $(this).parents('form:first');
		$(form).find('.has-error').removeClass( "has-error" );
		$(this).val( "Saving..." );
		$(this).addClass( "disabled" );
		$(form).find('.error_msg').remove();
		$.ajax({
						type: "POST",
						url: form.attr('action'), 
						data: form.serialize(),
						success: function(data){
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'error') {
									$(objButton).removeClass( "disabled" );
									$(objButton).val( "Save Question" );
									$.each(msg, function (index, value) {
									$("#"+index).closest('li').addClass( "has-error" );
									if(index != 'status') {
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("#"+index);
									}
									});
							} else if(msg.status == 'success') {
								$(objButton).val( "redirecting..." );
								window.location.href = base_url+'/recruit/test/'+msg.season_id+'/questions/15021/1';
							} else {
								$(objButton).removeClass( "disabled" );
								$(objButton).val( "Save Question" );
								$( "<span class='error_msg'> Could not save Test </span>" ).insertAfter(objButton);
							}	
						}
		});
	});
	
	
	$('#save_general_setting').click(function(){
		var objButton = $(this); 
		$("#general_settings").find('.has-error').removeClass( "has-error" );
		$(this).val( "Saving..." );
		$(this).addClass( "disabled" );
		$("#general_settings").find('.error_msg').remove();
		 
		$.ajax({ 
			type: "POST",
			url: base_url+'/ajax_files/saas_corporate_function.php?action=save_general_settings', 
			data: $("#general_settings").serialize(),
			success: function(data){
				data = $.trim(data);
				var msg = $.parseJSON(data); 
				if(msg.test_enable == '1') {
						$(objButton).removeClass( "disabled" );
						$(objButton).val( "Save" );
						if(msg.season_url == '1') {
							$("#pending_season_url").show();						
						}
						if(msg.question_ids == '1') {
							$("#pending_question_ids").show();						
						}
						if(msg.contest_big_pic == '1') {
							$("#pending_contest_big_pic").show();						
						}
						if(msg.promotional == '1') {
							$("#pending_promotional").show();
							$("#pending_promotional").attr('href', base_url + '/' +saas_prefix+ '/test/'+msg.season_id+'/promotion-page');								
						}
						if(msg.contest_small_pic == '1') {
							$("#pending_contest_small_pic").show();						
						}
						$("#finilized_test_settings").modal( "show" );
				} else if(msg.status == 'error') {
						$(objButton).removeClass( "disabled" );
						$(objButton).val( "Save" );
						$.each(msg, function (index, value) {
							$("input[name="+index+"],select[name="+index+"]").closest('li').addClass( "has-error" );
							$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("input[name="+index+"],select[name="+index+"]");
						});
				} else  {
					$(objButton).val( "redirecting..." );
					window.location.href = base_url+'/recruit/test/'+msg.season_id+'/questions/15021/1';
				} 	
			}
		});
	});
	$('.active_test_checklist').click(function(){
	
		$("#checklist_active_test").find('.has-error').removeClass( "has-error" );
		$("#checklist_active_test").find('.error_msg').remove();
		$("#pending_season_url, #pending_promotional, #pending_question_ids, #pending_contest_small_pic, #pending_contest_big_pic").hide();
		$(".active_button").hide();
		
		var season_id = $(this).data('season_id');
		var page_no = $(this).data('page_no');
		 
		$.ajax({ 
			type: "POST",
			url: base_url+'/ajax_files/saas_corporate_function.php?action=active_test_checklist', 
			data: {season_id:season_id,page_no:page_no},
			success: function(data){
				data = $.trim(data);
				var msg = $.parseJSON(data); 
				$("#checklist_active_test .name").text(msg.title);		
				$("#checklist_active_test .duration").text(msg.duration);		
				$("#checklist_active_test .attempts").text(msg.user_attempts);		
				$("#checklist_active_test .started_on").text(msg.started_on);		
				$("#checklist_active_test .ended_on").text(msg.ended_on);		
				if(msg.test_enable == '1') {
						if(msg.season_url == '1') {
							$("#pending_season_url").show();
							$("#pending_season_url").attr('href', base_url + '/' +saas_prefix+ '/test/'+msg.season_id+'/advanced-settings');								
						}
						if(msg.promotional == '1') {
							$("#pending_promotional").show();
							$("#pending_promotional").attr('href', base_url + '/' +saas_prefix+ '/test/'+msg.season_id+'/promotion-page');								
						}
						if(msg.question_ids == '1') {
							$("#pending_question_ids").show();	
							$("#pending_question_ids").attr('href', base_url + '/' +saas_prefix+ '/test/'+msg.season_id+'/questions');								
						}
						if(msg.contest_big_pic == '1') {
							$("#pending_contest_big_pic").show();						
							$("#pending_contest_big_pic").attr('href', base_url + '/' +saas_prefix+ '/test/'+msg.season_id+'/landing-page');						
						}
						if(msg.contest_small_pic == '1') {
							$("#pending_contest_small_pic").show();	
							$("#pending_contest_small_pic").attr('href', base_url + '/' +saas_prefix+ '/test/'+msg.season_id+'/landing-page');							
						}
						$("#checklist_active_test").modal( "show" );
				} 	else {
					
					$(".pending-items").hide(  );
					$("#checklist_active_test").modal( "show" );
					$(".active_button").show();
					
					$(".active_button").attr('href', base_url + '/' +saas_prefix+ '/dashboard?season_id='+msg.season_id+'&status=active&page_no='+msg.page_no);
				}
			}
		});
	});
	
	$('#save_contest_job_details').click(function(){
		var season_id = $("#season_id").val();
		var season_ended_on = $("#season_ended_on").val();
		
		var job_details = [];
		job_details.push($("#job_id").val());
		job_details.push($("#job_title").val());
		job_details.push($("#skill_tags").val());
		job_details.push($("#job_loc").val());
		job_details.push($("#minexp").val());
		job_details.push($("#maxexp").val());
		job_details.push($("#txtLowSalary").val());
		job_details.push($("#txtHighSalary").val());		
				
		var nicInstance = nicEditors.findEditor('season_job');
		job_details.push(nicInstance.getContent());
		
		job_details.push($("#company_name").val());

		var jsonString = JSON.stringify(job_details);
		var action_url =  base_url+'/ajax_files/saas_corporate_function.php?action=save_contest_job_details';
		var objButton = $(this);
		
		$("#contest_job_details").find('.has-error').removeClass( "has-error" );
		$(this).val( "Saving..." );
		$(this).addClass( "disabled" );
		$("#contest_job_details").find('.error_msg').remove();

		$.ajax({
			type: "POST",
			url: action_url, 
			data: {season_id:season_id, season_ended_on:season_ended_on, job_details:jsonString},
			success: function(data){
				$(objButton).removeClass( "disabled" );
				$(objButton).val( "Save" );
				data = $.trim(data);
				var msg = $.parseJSON(data); 
				if(msg.status == 'success') {
					$(objButton).val( "Saved!!!" );	
					if(msg.job_id > 0) {
						$('#job_id').val(msg.job_id);
					}
				} else {
					$( "<span class='error_msg'> "+msg.message+" </span>" ).insertAfter("#save_contest_job_details");
				}	

			}
		});
	});
	
	$('#sentence_complete').click(function(){
		var objButton = $(this);
		var form = $(this).parents('form:first');
		$(form).find('.has-error').removeClass( "has-error" );
		//$(this).val( "Processing..." );
		//$(this).addClass( "disabled" );
		$(form).find('.error_msg').remove();
		var blank_string_count = $('#answers_paragraph').val();
		var data = $('#sentence_statement').serializeArray();
		var nicInstance_mail_message = nicEditors.findEditor('options');
		var options = nicInstance_mail_message.getContent();
		options = options.replace(/&nbsp;/g, ' ');
		var count = (blank_string_count.match(/{blank}/g) || []).length;
		var field_count = $('.choice-fields .choice-field').length;
		
		if(count < 1) {
			$("#error_msg_sentence").html( "<span class='error_msg'> Question String Cannot be empty </span>" );
			return false;
		}
		
		if(field_count < 1) {
			$("#error_msg_sentence").html( "<span class='error_msg'> You need to have atleast one option </span>" );
			return false;
		}
		
		if(count != field_count) {
			$("#error_msg_sentence").html( "<span class='error_msg'> There should be one answer for every blank </span>" );
			return false;
		}
		
		var choices_text = [];
		var exitSubmit = true;
		$("input[name='choices_text[]']").each(function() {
			var value = $(this).val();
			if (value) {
				choices_text.push(value);
			} else {
			$( "<span class='error_msg'> correct answers cannot be empty  </span>" ).insertAfter("#error_msg_sentence");
			exitSubmit = false;
			return false;
			}
		});
		
		
		if(exitSubmit) {
			
			$.ajax({
							type: "POST",
							url: form.attr('action'), 
							data: form.serialize()+ "&options="+options,
							success: function(data){
								$(objButton).removeClass( "disabled" );
								$(objButton).val( "Save Question" );
								data = $.trim(data);
								var msg = $.parseJSON(data); 
								if(msg.status == 'error') {
										$.each(msg, function (index, value) {
										$("#"+index).closest('li').addClass( "has-error" );
										if(index != 'status') {
										$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("#"+index);
										}
										if(index == 'marks') {
										$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("#score");
										}
										});
								} else if(msg.status == 'success') {
									window.location.href = base_url+'/recruit/test/'+msg.season_id+'/questions/15021/1';
								} else {
									$( "<span class='error_msg'> Could not save Test </span>" ).insertBefore("#save-template");
								}	
							}
			});
		
		}
		
	});
	
	$( "#languages-list" ).change(function() {
		var language_id = $(this).val();
		var contest_id = $('#question_id').val();
		var evaluation_type = $('input[name=evaluation_type]:checked').val();
		if(language_id > 0 && contest_id > 0) {	
		var url = base_url+'/ajax_files/saas_corporate_function.php?action=FetchQuestionlanguageTemplate&language_id='+language_id+'&contest_id='+contest_id;
			$.get(url, function(data){
			data = $.trim(data);
			var msg = $.parseJSON(data);
				if(msg.status == 'success') { 
				if(msg.template_id > 0) {
					$('#template_id').val(msg.template_id);
				}
				$("#body_code_div").hide();
				if(evaluation_type==2){
					$('#body_head_code').next().remove();
					$('#body_tail_code').next().remove();
					$("#body_code_div").show();				
				}
				
				$('#body_code').next().remove();
				if(evaluation_type==2){
					
					var headeditor = CodeMirror.fromTextArea(document.getElementById('body_head_code'), {
						 mode: "text/html",
						  lineNumbers: true,
						  lineWrapping: true,
						  readOnly: true
						}).setValue(msg.head_testcase_template);
						
					var lineNumberCounter = msg.head_line_count;
					
					lineNumberCounter = (typeof lineNumberCounter === "undefined") ? 1 : lineNumberCounter;
					
					var editor = CodeMirror.fromTextArea(document.getElementById('body_code'), {
						mode: "text/html",
						lineNumbers: true,
						gutter: true,
						lineWrapping: true,
						firstLineNumber: lineNumberCounter
					});

                    editor.setValue(msg.code_template);
                 
					OnChange = function (cm) {
						$('#body_tail_code').next().remove();
						var editortailcount = editor.lineCount()+lineNumberCounter;
						var taileditor = CodeMirror.fromTextArea(document.getElementById("body_tail_code"), {
							mode: "text/html",
							lineNumbers: true,
							lineWrapping: true,
							readOnly: true,
							firstLineNumber: editortailcount
						});
	
					};
					CodeMirror.on(editor, 'change', $.proxy(OnChange, this));
										
					
					
					$('#languages .editor .editing-area .tail-section').prev().height(110);
					
					var lineNumberTailCounter = msg.head_body_count;
					lineNumberTailCounter = (typeof lineNumberTailCounter === "undefined") ? 1 : lineNumberTailCounter;
					CodeMirror.fromTextArea(document.getElementById('body_tail_code'), {
						 mode: "text/html",
						  lineNumbers: true,
						  lineWrapping: true,
						  readOnly: true,
						  firstLineNumber: lineNumberTailCounter
						}).setValue(msg.tail_testcase_template);
										
				} else {
				
					CodeMirror.fromTextArea(document.getElementById('body_code'), {
					 mode: "text/html",
					  lineNumbers: true,
					  lineWrapping: true
					}).setValue(msg.code_template);
					
					$('#languages .editor .editing-area .tail-section').prev().height(110);	
					
				}
				}
			});
			
		}
	});
  

	$( "#unit_Plans" ).change(function() { 
		var plan_id = $(this).val();
		if(plan_id > 0) {	
		var url = base_url+'/ajax_files/saas_corporate_function.php?action=FetchUnitPlanDetails&plan_id='+plan_id;
			$.get(url, function(data){
			data = $.trim(data);
			var msg = $.parseJSON(data);
				if(msg.status == 'success') { 
					
					$.each(msg.quantity, function (index, value) {
						$("input[name=quantity_"+index+"]").val(value);
					});	
				}
			});
			
		}
	});
	
	
	$( "#languages-list-approximate" ).change(function() {
		var language_key = $(this).val();
		var contest_id = $('#contest_id').val();
		var season_id = $('#season_id').val();
		if(language_key != '' && contest_id > 0) {	
		var url = base_url+'/ajax_files/saas_corporate_function.php?action=FetchlanguageTemplate&language_key='+language_key+'&contest_id='+contest_id+'&season_id='+season_id;
			$.get(url, function(data){
			data = $.trim(data);
			var msg = $.parseJSON(data);
				if(msg.status == 'success') {
					document.getElementById("body_code").value = msg.code_template;
					$('#languages .editor .editing-area .tail-section').prev().height(110);
				}
			});
			
		}
	});
	
	
	$("[name='shuffle-checkbox'], [name='auto_suggest-checkbox'], [name='monitoring-checkbox']").on('switchChange.bootstrapSwitch', function() {
  	if($(this).attr('name') == 'monitoring-checkbox') {	
      if($(this).is(":checked") && ($(this).attr('name') == 'monitoring-checkbox')) {
  			$('#coming_soon_proctoring').modal('show');
        $('#show_proctoring_block').show();
  		} else {
        $('#show_proctoring_block').hide();
      }
     }
		var form = $(this).parents('form:first');	
		var form_reference = form.attr('id');    
		$.ajax({
			type: "POST",
			url: form.attr('action'), 
			data:  $('#'+form_reference).serialize(),
			async: false,
			success: function(data) { 
				data = $.trim(data);
				var msg = $.parseJSON(data);
				var status = msg.status;
				if(status == 'success') {
					//
				} 	
			}
		});
	});  

	$("[name='screen-capture']").on('switchChange.bootstrapSwitch', function() {
  
		if($(this).is(":checked")) {
  			bootbox.confirm({ 
				//size: 'small',
				title: "Screen Capture",
				message: "<p> Are you sure to allow screen capture, it works only for coding editor problem  </p>", 
				callback: function(result){if(result) {  
					$.ajax({
						type: "POST",
						url: $('#form-screen-capture').attr('action'), 
						data:  $('#form-screen-capture').serialize(),
						success: function(data) { 
							data = $.trim(data);
							var msg = $.parseJSON(data);
							var status = msg.status;
							if(status == 'success') {
								//
							} 	
						}
					});
				} else {
						$("[name='screen-capture']").bootstrapSwitch('toggleState');
				}}
			});
  		} else {
				$.ajax({
					type: "POST",
					url: $('#form-screen-capture').attr('action'), 
					data:  $('#form-screen-capture').serialize(),
					success: function(data) { 
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
						if(status == 'success') {
							//
						} 	
					}
				});
		}
		
	});   	
  
  
  $("[name='copy_paste-checkbox'],[name='allow_tab-checkbox'],[name='run_time_regularly'],[name='form_page_required'],[name='show_levels_stepwise']").on('switchChange.bootstrapSwitch', function() {
		var form = $(this).parents('form:first');	
		var form_reference = form.attr('id');    
		$.ajax({
			type: "POST",
			url: form.attr('action'), 
			data:  $('#'+form_reference).serialize(),
			async: false,
			success: function(data) { 
				data = $.trim(data);
				var msg = $.parseJSON(data);
				var status = msg.status;
				if(status == 'success') {
					//
				} 	
			}
		});
	});         
	
	
	$('#upload_banner').on('click', function() {
		$('#upload_banner').val( "Processing..." );
		$('#upload_banner').addClass( "disabled" );
		$( "#upload-test-banner .alert-danger").remove();
		var season_id=$('input[name=season_id]').val();
    var platform_type= $('input[name=platform_type]').val();
		var sm_pic=$('input[name=fileupload_small_old]').val();
		var lg_pic=$('input[name=fileupload_large_old]').val();
		var logo_pic=$('input[name=fileupload_logo_old]').val();
    var form_data = new FormData();  
		var file_data = $('#upload-test-banner #file_upload').prop('files')[0]; 
    //if(platform_type=='codehire') {  
		 var file_data_small = $('#upload-test-banner #file_upload_small').prop('files')[0];   
		 var file_data_logo = $('#upload-test-banner #file_upload_logo').prop('files')[0];   
		 form_data.append('file_small', file_data_small);
		 form_data.append('file_logo', file_data_logo);
     form_data.append('sm_pic', sm_pic);
     form_data.append('logo_pic', logo_pic);
  //  }                 
		form_data.append('file', file_data);
    form_data.append('season_id', season_id);                                                                                                      
    form_data.append('lg_pic', lg_pic);                                                    
		$.ajax({
				url: base_url+'/ajax_files/saas_corporate_function.php?action=UploadTestBanner', 
				dataType: 'text',  // what to expect back from the PHP script, if anything
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,                         
				type: 'post',
				success: function(data){
					  data = $.trim(data);
					  var msg = $.parseJSON(data);
					  var status = msg.status;
					  if(status=='success') {
						$('#upload_banner').val("Upload"); 
						$('#upload_banner').removeClass( "disabled" );
						window.location = window.location.href;
					  } else {
						$.each(msg, function (index, value) {
									$( "<p class='alert alert-danger'> "+value+" </p>" ).insertAfter("."+index);
						});	
						$('#upload_banner').val("Upload"); 
						$('#upload_banner').removeClass( "disabled" );
					  } 
				}
		 });
	});
  
//--- code for update cutoff marks -----  
  $('#update_cutoff').click(function() {
    if($('#marks').val()=='') {
      $('#error_msg').html("Please enter marks").show();
      return false;
    }
    $('#update_cutoff').val( "Processing..." );
		$('#update_cutoff').addClass( "disabled" );
		var objButton = $(this);	
		var form = $(this).parents('form:first');	
		var form_reference = form.attr('id');                                          
		$.ajax({
			url: base_url+'/ajax_files/saas_corporate_function.php?action=UpdateCutoffMarks', 
			async: false,
			data: $('#'+form_reference).serialize(),                      
			type: 'post',
			success: function(data){
			  data = $.trim(data);
			  var msg = $.parseJSON(data);
			  var status = msg.status;
			  if(status=='success') {
  				$('#update_cutoff').val("Update"); 
  				$('#update_cutoff').removeClass( "disabled" );
          $('#cutoff_marks_'+msg.season_id).text(msg.marks);
          $('#marks_'+msg.season_id).data('cutoff_marks',msg.marks);
  				setTimeout("$('#update_cutoff_marks').modal('hide')", 550);
			  } else {
  				$('#update_cutoff').val("Update"); 
  				$('#update_cutoff').removeClass( "disabled" );
  				$('#error_msg').html('Error in update marks.').show();
			  } 
			}
		});
	});
  
  
  //--- code for update client password -----  
  $('#update_client_password').click(function() {
  $( "#change_client_password .error_msg").remove();
   $("#change_client_password").find('.has-error').removeClass( "has-error" );
    if($('#client_password').val()=='') {
     // $('#error_msg').html("Please enter password").show();
	  $('#client_password').closest('div').addClass( "has-error" );					
	  $( "<span class='error_msg'> Please enter password </span>" ).insertAfter("#client_password");						
      return false;
    }
    if($('#client_password').val().length<5 || $('#client_password').val().length>16) {
	   $('#client_password').closest('div').addClass( "has-error" );					
	   $( "<span class='error_msg'> Password length will be between 5 to 16 characters. </span>" ).insertAfter("#client_password");	
      return false;
    }
	
		$('#update_client_password').val( "Processing..." );
		$('#update_client_password').addClass( "disabled" );
		var objButton = $(this);	
		var form = $(this).parents('form:first');	
		var form_reference = form.attr('id');                                          
		$.ajax({
			url: base_url+'/ajax_files/saas_corporate_function.php?action=changeClientPassword', 
			async: false,
			data: $('#'+form_reference).serialize(),                      
			type: 'post',
			success: function(data){
			  data = $.trim(data);
			  var msg = $.parseJSON(data);
			  var status = msg.status;
			  if(status=='success') {
  				$('#update_client_password').val("Update"); 
  				$('#update_client_password').removeClass( "disabled" );
				$( "<br/><span class='alert alert-success'> Password change successfully. </span>" ).insertAfter("#change_client_password .form-inline");	
  				setTimeout("$('#change_client_password').modal('hide')", 1000);
			  } else {
  				$('#update_client_password').val("Update"); 
  				$('#update_client_password').removeClass( "disabled" );
				$('#client_password').closest('div').addClass( "has-error" );					
				$( "<span class='error_msg'> Error in change password. </span>" ).insertAfter("#client_password");	
			  } 
			}
		});
	});
  
	
	$("#language-test_setting").click(function() {
		var objButton = $(this);	
		var form = $(this).parents('form:first');	
		var form_reference = form.attr('id');
		$.ajax({
			type: "POST",
			url: form.attr('action'), 
			data:  $('#'+form_reference).serialize(),
			async: false,
			success: function(data) {
						data = $.trim(data);
						$(objButton).text("Saved!");
						var msg = $.parseJSON(data);
						var status = msg.status;
							if(status == 'success') {
								//
							} 	
			}
		});
	});
  
  
  $('#timer-test_setting, #score-test_setting').click(function() {
		var objButton = $(this);	
		var form = $(this).parents('form:first');	
		var form_reference = form.attr('id');
		$.ajax({
			type: "POST",
			url: form.attr('action'), 
			data:  $('#'+form_reference).serialize(),
			async: false,
			success: function(data) {
					data = $.trim(data);
					$(objButton).text("Saved!");
					var msg = $.parseJSON(data);
					var status = msg.status;
						if(status == 'success') {
							//
						} 	
			}
		});
	});
  
	
	$(".unlock-all-user").click(function() {
		if($("input[type='checkbox']:checked").length == 0) {
		 $('#check-short-listed-info').modal('show');
		  return false;
		}
		
		var objButton = $(this);	
		var action_url = base_url+'/ajax_files/saas_corporate_function.php?action=ShortListedUser';		
		$.ajax({
			type: "POST",
			url: action_url, 
			data:  $('#unlock-user-result').serialize(),
			async: false,
			success: function(data) {
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
						var cnt = msg.cnt;
						var user_ids = msg.user_ids;
						
						if(cnt > 0) {
						var user_id_array = user_ids.split(",");
							for (i = 0; i < user_id_array.length; i++) {
								$('#row_'+user_id_array[i]).remove();
							}
						}
						
						if(status == 'no_permission') {
							//$('#short-listed-info .modal-body').html('<p> '+cnt+' users short-listed, Your account limit exceed to unlock more users.  </p>');
						 window.location= msg.redirect_link;
            }
						
						if(status == 'success') {
             $('#unlock-user').html('');
             $(".scrolling-table input").prop('checked',false);
             //$('#short-listed-info').modal('show');
             //setTimeout(function(){ window.location.reload(); }, 3000);
             window.location= msg.redirect_link;
							//
						} 
						
			}
		});
	});

//-------- code to shortlist user from completed users-------------------  
  $(".shortlist-all-user").click(function() {
		if($("input[type='checkbox']:checked").length == 0) {
		$('#check-short-listed-info').modal('show');
		 return false;
		}
		var objButton = $(this);	
		var action_url = base_url+'/ajax_files/saas_corporate_function.php?action=InterviewShortListedUser';		
		$.ajax({
			type: "POST",
			url: action_url, 
			data:  $('#unlock-user-result').serialize(),
			async: false,
			success: function(data) {
				data = $.trim(data);
				var msg = $.parseJSON(data);
				var status = msg.status;
				var cnt = msg.cnt;
				var user_ids = msg.user_ids;
        if(status == 'success') {
          $('#short-listed-info').modal('show');
          setTimeout(function(){window.location = base_url+'/recruit/interviews/done';}, 2000); 
					//window.location.href = base_url+'/recruit/interviews/done';      
				} 
				if(cnt > 0) {
				var user_id_array = user_ids.split(",");
					for (i = 0; i < user_id_array.length; i++) {
						$('#row_'+user_id_array[i]).remove();
					}
				}
        if(status == 'no_permission') {
					$('#short-listed-info .modal-body').html('<p> '+cnt+' users short-listed, Your account limit exceed to unlock more users.  </p>');
          $('#short-listed-info').modal('show');
				}		
			}
		});
	});
	
	$('#cancel-proctoring').click(function(){
	
		$("[name='monitoring-checkbox']").trigger( "click" );
		$('#coming_soon_proctoring').modal('hide');
		/*
		$("[name='monitoring-checkbox']").removeAttr('checked');
			
		$.ajax({
			type: "POST",
			url: $("#form-inline-proctoring").attr('action'), 
			data:  $("#form-inline-proctoring").serialize(),
			async: false,
			success: function(data) {
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
							if(status == 'success') {
									$('#coming_soon_proctoring').modal('hide');
							} 	
			}
		});*/
		
	});
	
	$(document).on('click', '#SaveLanguageTemplate', function() {
			var objButton = $(this);
			var form = $(this).parents('form:first');
			$(this).text( "Processing..." );
			$(this).addClass( "disabled" );
			$(form).find('.alert-success').hide();
			var contest_id = $('#contest_id').val();
			var season_id = $('#season_id').val();
			var language = $('#languages-list-approximate').val();
			var template_code = $('#body_code').val();
			if(contest_id > 0) {
				action_url = base_url+'/ajax_files/saas_corporate_function.php?action=SavelanguageTemplate';
				$.ajax({
					type: "POST",
					url: action_url, 
					//data: "season_id="+season_id+"&template_code="+template_code+"&contest_id="+contest_id+"&language="+language,
					data: {season_id:season_id, template_code:template_code, contest_id:contest_id, language:language},
					success: function(data){
						$(objButton).removeClass( "disabled" );
						$(objButton).text( "Update Template" );
						data = $.trim(data);
						var msg = $.parseJSON(data); 
						if(msg.status == 'success') {
						$(form).find('.alert-success').show();		
						} else {
							
						}	
					}
				});
				
			}
	});
	
	$('.DeleteTestCaseDialog').click(function(){
		var testcase_id = $(this).data('id');
		if(typeof testcase_id === 'undefined') {
		 var testcase_id = '';
		}
		$('#delete-testcase .modal-content').load(base_url+'/ajax_files/saas_dialog.php?testcase_id='+testcase_id, function(e){
		 $('#delete-testcase').modal('show');
	  });	
	})
	
	//below function not working need to modify later
	$('.upoload-test-case').click(function(){
			var filename = $("#file").val();
			$.ajax({
							type: "POST",
							url: base_url+'/ajax_files/saas_corporate_function.php?action=UploadTestCase', 
							data: data,
							processData: false,
							type: 'POST',
							contentType: 'multipart/form-data', 

							success: function(data){
								data = $.trim(data);
								var msg = $.parseJSON(data);
								if(msg.status == 'success') {
									//window.location.href = base_url+'/recruit/test/'+msg.season_id+'/questions/'+msg.contest_id+'/coding/edit/step3';
								} else {
									$( "<span class='error_msg'> Could not Delete TestCase </span>" ).insertBefore(".table3");
								}	
							}
			});
	});
	
	$(document).on('click', '.DeleteTestCase', function(){
			var contest_id = $('#question_id').val();
			var season_id = $('#season_id').val();
			var testcase_id = $(this).data('id');
			if(typeof testcase_id === 'undefined') {
			 var testcase_id = '';
			}
			$.ajax({
					type: "POST",
					url: base_url+'/ajax_files/saas_corporate_function.php?action=DeleteTestCase', 
					data: 'testcase_id='+testcase_id+'&contest_id='+contest_id+'&season_id='+season_id,
					success: function(data){  
						data = $.trim(data);
						var msg = $.parseJSON(data);
						if(msg.status == 'success') {
							//window.location.href = base_url+'/recruit/test/'+msg.season_id+'/questions/'+msg.contest_id+'/coding/edit/step3';
							window.location.href=window.location.href;
						} else {
							$( "<span class='error_msg'> Could not Delete TestCase </span>" ).insertBefore(".table3");
						}	
					}
			});
		
	});
	
	$(".submit_code_again").click ( function () {
	
		$('#submit-code-again').modal('show');
		var result_id = $(this).data('result_id');
		var platform_type = $(this).data('platform_type');
		$('#result_id').val(result_id);
		$('#platform_type').val(platform_type);
		
	});
	
	
	$('#evaluate-code-again').click(function(){
	
		var objButton = $(this);
		$(this).text( "Processing..." );
		$(this).addClass( "disabled" );
		
			
		$.ajax({
			type: "POST",
			url: base_url+'/ajax_files/saas_corporate_function.php?action=EvaluateCodeAgain', 
			data:  $("#evaluate-code-form").serialize(),
			success: function(data) {
						$(objButton).removeClass( "disabled" );
						$(objButton).text( "Evaluate Successfully!" );
						
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
							if(status == 'success') {
									 $( ".modal-footer" ).append( '<span class="alert alert-success left"> code evalate succesfully </span>' );
									 setTimeout(function(){$('#submit-code-again').modal('hide');}, 1000);	
							} 	
			}
		});
		
	});
	
	
	/*$("#user-panel").height($(window).height()-$("#header").innerHeight());*/
	
	$("#user-panel .top-bar .create-test .create-test-btn").click( function(){
		$("#create-test-popup").fadeToggle();												
	});
	
	$(".add-assessment-btn").click( function(){
		$("#create-test-popup").fadeToggle();	
	});
	
	$(".popover .close").click( function(){
		$(this).parents(".popover").fadeOut();															
	});
	
	
	$(document).on('click', '#user-panel .slidebar-toggle', function() {
		$("#user-panel").toggleClass("collapseMenu");
	});
	
	$('#welcome-message .close').click(function(){
		$("#welcome-message").fadeOut();
	});
	
	$("#user-panel .top-bar .filter .filter-btn").click( function(){
		$("#filter-options").slideToggle('slow');
		if($(this).find(".fa").hasClass("fa-minus")){
			$(this).find(".fa").removeClass("fa-minus").addClass("fa-plus");
		}
		else{
			$(this).find(".fa").removeClass("fa-plus").addClass("fa-minus");
		}
	});
	
	$('#add-from-library tr.title-row').click(function(){
		if($(this).hasClass("current")){
			$(this).removeClass("current").next(".open-content").fadeOut();
			$("#add-from-library .table1 .short-description").fadeIn();
		}
		else {
			$('#add-from-library tr.title-row').removeClass("current");
			$('#add-from-library tr.open-content').fadeOut();
			$(this).addClass("current").next(".open-content").fadeIn();
			$(this).find(".short-description").fadeOut();			
		}
	});
	
	
	$('#add-from-library .remove-btn, #add-from-library .add-btn, #add-from-library .question-insights').click(function(event){
       event.stopPropagation();
    });
	
	$('.table2 .expand-collapse-btn').click(function(){
		if($(this).parents("tr").hasClass("current")){
			$(this).parents("tr").removeClass("current").next(".open-content").fadeOut();
			$(this).find('.fa').removeClass('fa-minus').addClass('fa-plus');
		}
		else {
			$('.table2 tr').removeClass("current");
			$('.table2 tr.open-content').fadeOut();
			$('.table2 tr .expand-collapse-btn .fa').removeClass('fa-minus').addClass('fa-plus');
			$(this).parents("tr").addClass("current").next(".open-content").fadeIn();
			$(this).find('.fa').removeClass('fa-plus').addClass('fa-minus');
		}
	});
  
  $('.table5 .expand-collapse-btn').click(function(){
		if($(this).parents("tr").hasClass("current")){
			$(this).parents("tr").removeClass("current").next(".open-content").fadeOut();
			$(this).find('.fa').removeClass('fa-minus').addClass('fa-plus');
		}
		else {
			$('.table5 tr').removeClass("current");
			$('.table5 tr.open-content').fadeOut();
			$('.table5 tr .expand-collapse-btn .fa').removeClass('fa-minus').addClass('fa-plus');
			$(this).parents("tr").addClass("current").next(".open-content").fadeIn();
			$(this).find('.fa').removeClass('fa-plus').addClass('fa-minus');
		}
	});
	
	$('[data-toggle="tooltip"]').tooltip();

	$('#user-panel #sidebar .widget ul i').attr('title', '');
	
	/*$(".inner-main").innerHeight($(window).height() - ($("#header").innerHeight() + $("#user-panel .top-bar").innerHeight() + $("#user-panel .steps").innerHeight() + $("#footer").innerHeight()) - 25);
	
	$(".content-area").height($(window).height() - ($("#header").innerHeight() + $("#user-panel .top-bar").innerHeight() + $("#footer").innerHeight()) - 68);*/
	
	$("#sidebar .scroll").innerHeight($(window).height() - ($("#header").innerHeight() + $("#user-panel .slidebar-toggle").innerHeight() + $("#user-panel #sidebar .user-actions").innerHeight() + $("#footer").innerHeight()) - 30);
	
	$("#sidebar #sidebar-navigation .scroll").innerHeight($(window).height() - ($("#header").innerHeight() + $("#sidebar-navigation li.questions-status > a").innerHeight() + $("#sidebar-navigation li.all-questions > a").innerHeight()) - 41);
	
	$(".codehire #sidebar #sidebar-navigation .scroll").innerHeight($(window).height() - ($("#header").innerHeight() + $("#sidebar-navigation li.questions-status > a").innerHeight() + $("#sidebar-navigation li.all-questions > a").innerHeight()) - 68);
	
	$('#problem-statement .choices-checkbox-input').on('click', 'label', function(){
		$(this).parent().toggleClass("active");
		//$('#problem-statement .textarea .mark-unmark .button5').text("Mark as answer");
		//$(this).parents('.checkbox-input').find('.button5').text("Unmark as answer");
	});
	/*
	$('#problem-statement .textarea .mark-unmark .button5').click(function(){
		$('#problem-statement .choices-checkbox-input .checkbox').removeClass("active");
		$('#problem-statement .textarea .mark-unmark .button5').removeClass("current").text("Mark as answer");
		$(this).addClass("current").text("Unmark as answer");
		$('#problem-statement .choices-checkbox-input .checkbox-input input[type=checkbox]').removeAttr('checked');
		if($(this).hasClass("current")){
			$(this).text("Unmark as answer");
			$(this).parents(".checkbox-input").find(".checkbox").addClass("active");
			$(this).parents(".checkbox-input").find("input[type=checkbox]").prop('checked',true);
		}
		else{
			$(this).text("Mark as answer");
		}
	});*/
	
	//$("#languages .stylish-checkboxes .checkbox input").prop('checked',true);
  
  $('#check_all').click(function() {
    if ($(this).is(':checked')) {
      $(".scrolling-table input").prop('checked',true);
    } else {
      $(".scrolling-table input").prop('checked',false);
    }
    var generallen = $(".scrolling-table input[name='open-user[]']:checked").length;
    if(generallen>0) {
      $('#unlock-user').html(''+generallen+'');
    } else {
      $('#unlock-user').html('');
    }
  });
  
  $(".scrolling-table input[name='open-user[]']").click(function() {
    var open_user_count = $(".scrolling-table input[name='open-user[]']:checked").length;
    if(open_user_count>0) {
      $('#unlock-user').html(''+open_user_count+'');
    } else {
      $('#unlock-user').html('');
    }
  });
	
	//$("#languages .stylish-checkboxes .checkbox input").prop('checked',true);
	$("#languages .controls li a").click(function(){
		if($(this).hasClass("select-all")){
			$("#languages .stylish-checkboxes .checkbox input").prop('checked',true);
		}
		else {
			$("#languages .stylish-checkboxes .checkbox input").prop('checked',false);
		} 
	});
	
	$('#languages .editor .editing-area .tail-section').prev().height(110);
	$('#languages .editor .editing-area textarea').attr('readonly','readonly');
	$('#languages .editor .editing-area .tail-section').prev().find("textarea").removeAttr('readonly');
	
	$('#languages .stylish-checkboxes .checkbox').addClass("active");
	
	/*
	$('#languages .stylish-checkboxes .checkbox label').click(function(){
		if($("#languages .stylish-checkboxes .checkbox").hasClass("active")){
			$(this).parent().removeClass("active");
		}
		else {
			$(this).parent().addClass("active");
		}
	});
	
	var checkedItems = $("#languages .stylish-checkboxes .active label").text();
		
	alert(checkedItems);
	
	$('#selectedLanguages').append($('<option>', { 
		value: item.value,
		text : item.text 
	}));
	*/
	
	$("#folder-structure header .settings").click( function(){
		$("#preferences-popup").fadeToggle();															
	});
  
  
  $("#teams-management .table3 tr.top-header").click( function(){ 
		$("#teams-management .table3 tr").slideUp();
		$(this).parent().find("tr").toggle();		

		if($(this).hasClass("active")){
			$(this).find(".up-down-arrow .fa").removeClass("fa-arrow-up").addClass("fa-arrow-down");
			$(this).removeClass("active");
		}
		else{
			$("#teams-management .table3 .up-down-arrow .fa").removeClass("fa-arrow-up").addClass("fa-arrow-down");	
			$(this).find(".up-down-arrow .fa").removeClass("fa-arrow-down").addClass("fa-arrow-up");
			$("#teams-management .table3 tr.top-header").removeClass("active");
			$(this).addClass("active");
		}
		
	});
	
	$('#save-landing-page-content').click(function(){
			
			var season_id = $("#encrypt_season_id").val();
			var textareas = [];
			$('.nicEdit-main').each(function() {
				textareas.push($(this).html());
			});
			var landing_page = textareas[0];
			var season_url = $("#season_url").val();
			var action_url =  base_url+'/ajax_files/saas_corporate_function.php?action=SaveLandingPage_Banner';
			var objButton = $(this);
			$(this).text( "Processing..." );
			$(this).addClass( "disabled" );
			$.ajax({
						type: "POST",
						url: action_url, 
						data: {season_id:season_id, landing_page:landing_page, season_url:season_url},
						success: function(data){
							$(objButton).removeClass( "disabled" );
							$(objButton).val( "Save" );
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'success') {
								$(objButton).val( "Saved!!!" );	
							} else {
								$( "<span class='error_msg'> Could not save </span>" ).insertAfter("#save-landing-page-content");
							}	
						}
			});
	});
	
	$('#save-description-page-content').click(function(){
			
			var season_id = $("#encrypt_season_id").val();
			var landing_page = $("#landing_page").val();
			var textareas = [];
			$('.nicEdit-main').each(function() {
				textareas.push($(this).html());
			});
			var jsonString = JSON.stringify(textareas);
			var action_url =  base_url+'/ajax_files/saas_corporate_function.php?action=SaveTestDescriptionPage';
			var objButton = $(this);
			$(this).text( "Processing..." );
			$(this).addClass( "disabled" );
			$("#landing_page_settings .error_msg").remove();

			$.ajax({
						type: "POST",
						url: action_url, 
						data: {season_id:season_id,landing_page:landing_page, description_fields:jsonString},
						success: function(data){
							$(objButton).removeClass( "disabled" );
							$(objButton).val( "Save" );
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'success') {
								$(objButton).val( "Saved!!!" );	
							} else {
								$( "<span class='error_msg'> "+msg.message+" </span>" ).insertAfter("#save-description-page-content");
							}	

						}
			});
	});
	
		$('#save-mailer-setting').click(function(){
			
			var mail_sending = $("#mail_sending").val();
			var mail_sender_name = $("#mail_sender_name").val();
			var mail_subject = $("#mail_subject").val();
			var season_id = $("#encrypt_season_id").val();
			var textareas = [];
			textareas.push(mail_sending);
			textareas.push(mail_sender_name);
			textareas.push(mail_subject);
			$('.nicEdit-main').each(function() {
				textareas.push($(this).html());
			});
			console.log(textareas);
			var jsonString = JSON.stringify(textareas);
			var action_url =  base_url+'/ajax_files/saas_corporate_function.php?action=SaveMailerSetting';
			var objButton = $(this);
			$(this).text( "Processing..." );
			$(this).addClass( "disabled" );
			$.ajax({
						type: "POST",
						url: action_url, 
						data: {season_id:season_id, description_fields:jsonString},
						success: function(data){
							$(objButton).removeClass( "disabled" );
							$(objButton).val( "Save" );
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'success') {
								$(objButton).val( "Saved!!!" );	
							} else {
								$( "<span class='error_msg'> Could not save </span>" ).insertAfter("#save-mailer-setting");
							}	
						}
			});
	});
	
	$('#save-extra-information-content').click(function(){
			
			var action_url =  base_url+'/ajax_files/saas_corporate_function.php?action=saveExtraInformationTest';
			var objButton = $(this);
			$(this).text( "Processing..." );
			$(this).addClass( "disabled" );
			$.ajax({
						type: "POST",
						url: action_url, 
						data: $("#extra-information-content").serialize(),
						success: function(data){
							$(objButton).removeClass( "disabled" );
							$(objButton).val( "Save" );
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'success') {
								$(objButton).val( "Saved!!!" );	
							} else {
								$( "<span class='error_msg'> Could not save </span>" ).insertAfter("#save-extra-information-content");
							}	
						}
			});
	});
	
	
	$('#save-extra-information-content-menus').click(function(){
			
			var action_url =  base_url+'/ajax_files/saas_corporate_function.php?action=saveExtraInformationTestMenus';
			var objButton = $(this);
			$(this).text( "Processing..." );
			$(this).addClass( "disabled" );
			$.ajax({
						type: "POST",
						url: action_url, 
						data: $("#extra-information-content").serialize(),
						success: function(data){
							$(objButton).removeClass( "disabled" );
							$(objButton).val( "Save" );
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'success') {
								$(objButton).val( "Saved!!!" );	
							} else {
								$( "<span class='error_msg'> Could not save </span>" ).insertAfter("#save-extra-information-content");
							}	
						}
			});
	});
	

    
	$('#uploadTestCasesFile').click( function() {
		var contest_id = $('#question_id').val();
		//$('#uploadTestCasesFile').val( "Processing..." );
		//$('#uploadTestCasesFile').addClass( "disabled" );
		$( "#upload-test-cases .error_msg").remove();
		var file_data = $('#file_testcases').prop('files')[0];   
		var form_data = new FormData();                  
		form_data.append('file', file_data);                          
		form_data.append('contest_id', contest_id);                          
		$.ajax({
					url: base_url+'/ajax_files/saas_corporate_function.php?action=UploadTestCasesZipFiles', 
					dataType: 'text',  // what to expect back from the PHP script, if anything
					cache: false,
					contentType: false,
					processData: false,
					data: form_data,                         
					type: 'post',
					success: function(data){
							$('#uploadTestCasesFile').removeClass( "disabled" );
							$('#uploadTestCasesFile').val("Upload");
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'error') {
								$("<span class='error_msg'> "+msg.file+" </span>").insertAfter(".btn-file");
							} else if(msg.status == 'success') {
								$('#upload-test-cases').modal('hide');
								$("<span class='alert alert-success' style='margin-left: 15px;'> Uploaded successfully! </span>").insertAfter("#upload-test-case");
								$("#standard-template-test-case .alert-info").remove();
								//window.location.href = window.location.href
							} else {
								//	
							}	
					}
		 });
	});
  
  $('#upload_mcq').on('click', function() {
		$('#upload_mcq').val( "Processing..." );
		$('#upload_mcq').addClass( "disabled" );
		var season_id=$('#season_id').val();
		var file_data = $('#file_upload').prop('files')[0];   
		var form_data = new FormData();                  
		form_data.append('file', file_data);
    form_data.append('season_id', season_id);                                                    
		$.ajax({
				url: base_url+'/ajax_files/saas_corporate_function.php?action=UploadMcqFiles', 
				dataType: 'text',  // what to expect back from the PHP script, if anything
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,                         
				type: 'post',
				success: function(data){
					data = $.trim(data);
					var msg = $.parseJSON(data);
          if(msg.status=='success') {
           if(msg.correct_question>0) {
			$("#upload_mcq_question").modal('hide');
			bootbox.alert({ 
					title: "Question Upload Stats",
					message: "<p> Correct Question : "+msg.correct_question+"  </p> <p> Total Question : "+msg.total_question+"  </p>", 
					callback: function(){	
                                           if(saas_prefix === 'code/add'){
						 window.location.href = base_url+'/'+ saas_prefix +'/test/'+msg.season_id+'/questions/15021/1/battle/multiple_choice';
                                             }else if(msg.season_id > 0){
                                                window.location.href = base_url+'/'+ saas_prefix +'/test/'+msg.season_id+'/questions/15021/1';
                                             } else{
                                                window.location.href = base_url+'/'+ saas_prefix +'/personal/library/all/multiple_choice?msg_id=15021&msg_type=1';
                                             }
					}
			});	

           } else {
            $("#csv_error").html('Incorrect format of sheet or questions found. Please download sample file to view correct format.').show();
            $('#upload_mcq').val("Upload"); 
            $('#upload_mcq').removeClass( "disabled" ); 
           }
          } else {
            $("#csv_error").html(msg.msg_text).show();
            $('#upload_mcq').val("Upload"); 
            $('#upload_mcq').removeClass( "disabled" );
          } 
				}
		 });
	});
	
	
	
	 $('#upload_coding').on('click', function() {
		$('#upload_coding').val( "Processing..." );
		$('#upload_coding').addClass( "disabled" );
		var season_id=$('#season_id').val();
		var file_data = $('#file_upload').prop('files')[0];   
		var form_data = new FormData();                  
		form_data.append('file', file_data);
    form_data.append('season_id', season_id);                                                    
		$.ajax({
				url: base_url+'/ajax_files/saas_corporate_function.php?action=UploadCodingFiles', 
				dataType: 'text',  // what to expect back from the PHP script, if anything
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,                         
				type: 'post',
				success: function(data){
					data = $.trim(data);
					var msg = $.parseJSON(data);
          if(msg.status=='success') {
           if(msg.correct_question>0) {
			$("#upload_coding_question").modal('hide');
			bootbox.alert({ 
					title: "Question Upload Stats",
					message: "<p> Correct Question : "+msg.correct_question+"  </p> <p> Total Question : "+msg.total_question+"  </p>", 
					callback: function(){	
                                            if(msg.season_id > 0){
                                                window.location.href = base_url+'/'+ saas_prefix +'/test/'+msg.season_id+'/questions/15021/1';
                                             } else{
                                                window.location.href = base_url+'/'+ saas_prefix +'/personal/library/all/coding?msg_id=15021&msg_type=1';
                                             }
					}
			});	

           } else {
            $("#csv_error").html('Incorrect format of sheet or questions found. Please download sample file to view correct format.').show();
            $('#upload_coding').val("Upload"); 
            $('#upload_coding').removeClass( "disabled" ); 
           }
          } else {
            $("#csv_error").html(msg.msg_text).show();
            $('#upload_coding').val("Upload"); 
            $('#upload_coding').removeClass( "disabled" );
          } 
				}
		 });
	});
	
	
	
	$(document).on("click","#send_sms_to_users", function(){ 
		$('#sms_window .alert-danger').remove();
		$.ajax({
			type: "POST",
			url: base_url+'/ajax_files/saas_corporate_function.php?action=send_sms_to_users', 
			data:  $('#send_sms_form').serialize(),
			success: function(data) {
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
							if(msg.status == 'success') {
								 $( "<p class='alert alert-success'> "+msg.message+" </p>" ).insertAfter(".send_sms_button");
								 setTimeout(function(){$('#sms_window').modal('hide');}, 1000);	
							} else {
								$( "<p class='alert alert-danger'> "+msg.message+" </p>" ).insertAfter(".send_sms_button");
							}		
			}
		});
	});
	
	$(document).on("click","#send_email_to_users", function(){ 
		$('#sms_window .alert-danger').remove();
		$.ajax({
			type: "POST",
			url: base_url+'/ajax_files/saas_corporate_function.php?action=send_email_to_users', 
			data:  $('#send_mail_form').serialize(),
			success: function(data) {
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
							if(msg.status == 'success') {
								 $( "<p class='alert alert-success'> "+msg.message+" </p>" ).insertAfter(".send_email_button");
								 setTimeout(function(){$('#sms_window').modal('hide');}, 1000);	
							} else {
								$( "<p class='alert alert-danger'> "+msg.message+" </p>" ).insertAfter(".send_email_button");
							}		
			}
		});
	});
  
	
  
});

$(window).scroll(function() {    
		var windowScroll = $(window).scrollTop();
		var topScroll = 0;
		
		if (windowScroll > topScroll) {
			$('#sidebar').addClass('fixed');
			$('.codehire .user-info-bar').addClass('removeBefore');
			$('#video-controls').fadeOut();
		}
		else{
			$('#sidebar').removeClass('fixed');
			$('.codehire .user-info-bar').removeClass('removeBefore');
			$('#video-controls').fadeIn();
		}
});

$( window ).resize(function() {
	$("#sidebar").height($(window).height()- ($("#header").height() + $("#footer").innerHeight()));
	
	$(".codehire #user-panel, .codehire .content-area").css("min-height", $(window).height() - ($("#header").height() + $(".codehire .user-info-bar").innerHeight()));
	
	/*$("#user-panel").height($(window).height()-$("#header").innerHeight());*/
	
	/*$(".inner-main").innerHeight($(window).height() - ($("#header").innerHeight() + $("#user-panel .top-bar").innerHeight() + $("#user-panel .steps").innerHeight() + $("#footer").innerHeight()) - 25);
	
	$(".content-area").height($(window).height() - ($("#header").innerHeight() + $("#user-panel .top-bar").innerHeight() + $("#footer").innerHeight()) - 68);*/
	
	$("#sidebar .scroll").innerHeight($(window).height() - ($("#header").innerHeight() + $("#user-panel .slidebar-toggle").innerHeight() + $("#user-panel #sidebar .user-actions").innerHeight() + $("#footer").innerHeight()) - 30);
	
	$("#completed-test, #submit-feedback").height($(window).height() - ($("#footer").innerHeight() + 68));
	
	$("#sidebar #sidebar-navigation .scroll").innerHeight($(window).height() - ($("#header").innerHeight() + $("#sidebar-navigation li.questions-status > a").innerHeight() + $("#sidebar-navigation li.all-questions > a").innerHeight()) - 41);
	
	$(".codehire #sidebar #sidebar-navigation .scroll").innerHeight($(window).height() - ($("#header").innerHeight() + $("#sidebar-navigation li.questions-status > a").innerHeight() + $("#sidebar-navigation li.all-questions > a").innerHeight()) - 68);
	
	var re_windowHeight = $(window).height() - ($("#header").height() + $("#footer").innerHeight());
	$("#register-page .box1").css('min-height', re_windowHeight);
	
	var library_footerHeight = $(window).width() - ($("#sidebar").width() + 30);
	$("#add-from-library footer").width(library_footerHeight);
	
});

//setTimeout(function(){$('.msgErrortop').slideUp();}, 4000);



//new registration saas client
function SignUpSaas() {
		$( "#sign-up-form li").removeClass( "has-error" );
		$( "#sign-up-button").val( "Processing..." );
		$( "#sign-up-button").addClass( "disabled" );
		$( "#sign-up-form .error_msg").remove();
		var action_file_url = base_url+'/ajax_files/saas_user_registration.php';		
		$.ajax({
			type: "POST",
			url: action_file_url,
			data: $("#sign-up-form").serialize(),
			async: false,
			success: function(data) {
						$( "#sign-up-button").removeClass( "disabled" );
						$( "#sign-up-button").val( "Sign Up" );
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
							if(status == 'error' && msg.activation_link==1) {
                $('#sign-up-form').trigger("reset");
								$('#sign-up-form .label').hide();
								$( "#sign-up-button").addClass( "disabled" );
								$( "#activation_client_verification_link").attr('data-link', msg.token_id);
                $( "div.signup-success-msg h3" ).html('You are already registered with us.');
								$( ".signup-success-msg").show();
                $( "#signup").hide();
								$('html, body').animate({
									scrollTop: $("#container-wrap").offset().top
								});
              } else if(status == 'error') {
								$.each(msg, function (index, value) {
									$("input[name="+index+"]").closest('li').addClass( "has-error" );
									if(index == 'tos') {
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter(".checkbox-input");
									} else {
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("input[name="+index+"]");
									}
								});	
							} else {
								$('#sign-up-form').trigger("reset");
								$('#sign-up-form .label').hide();

								$('#sign-up-form').hide();
								$("#sign-up-button").addClass( "disabled" );
								$("#activation_client_verification_link").attr('data-link', msg.token_id);
								$(".signup-success-msg").show();

								$('html, body').animate({
									scrollTop: $("#container-wrap").offset().top
								});
								//window.location.href = base_url+'/recruit/dashboard';	;
							}	
			}
		});
}


//login candidate 
function loginCandidate() {
		$( "#access_token_form div").removeClass( "has-error" );
		$( "#access-to-login").text( "Checking..." );
		$( "#access-to-login").addClass( "disabled" );
		$( "#access_token_form .error_msg").remove();	
		$( ".alert-danger").hide()
		$( ".alert-info").hide()
		$( ".alert-success").hide()
		
		$.ajax({
			type: "POST",
			url: base_url+'/ajax_files/saas_corporate_function.php?action=CredentialCheckLogin', 
			data: $("#access_token_form").serialize(),
			async: false,
			success: function(data) {
						$( "#access-to-login").removeClass( "disabled" );
						$( "#access-to-login").text( "Start test" );
						data = $.trim(data);
						var msg = $.parseJSON(data);
						var status = msg.status;
							if(status == 'error') {
								$.each(msg, function (index, value) {
									if(index == 'term') {
									$( ".alert-danger").show().html(value);
									} else if(index == 'education_qualification') {
									$("#"+index).closest('div').addClass( "has-error" );
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter(".table3");
									}  else {
									$("input[name="+index+"], select[name="+index+"], textarea[name="+index+"]").closest('div').addClass( "has-error" );
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("input[name="+index+"], select[name="+index+"], textarea[name="+index+"]");
									}
								});	
								$('html, body').animate({
									scrollTop: $(".alert-danger").offset().top
								});
							} else if(status == 'incorrect') {
								$( ".alert-danger").show().html(msg.message);
								$('html, body').animate({
									scrollTop: $(".alert-danger").offset().top
								});
							}  else if(status == 'partipation') {
								$( ".alert-info").show().html(msg.message);
								$( ".alert-success").show().html(msg.term);
								$('html, body').animate({
									scrollTop: $(".alert-success").offset().top
								});
							} else if(msg.webcam_enable == 'Y') {
								window.location.href = base_url+'/recruit/tests/questions/'+msg.token+'/1';
							} else {
								window.location.href = base_url+'/recruit/tests/questions/'+msg.token;
							}		
			}
		});
}

//login candidate 
function checkLogin() {
	$( "#login_token_form div").removeClass( "has-error" );
	$( "#token-to-login").text( "Checking..." );
	$( "#token-to-login").addClass( "disabled" );
	
	$.ajax({
		type: "POST",
		url: base_url+'/ajax_files/saas_corporate_function.php?action=CheckLogin', 
		data: $("#login_token_form").serialize(),
		async: false,
		success: function(data) {
			$( "#token-to-login").removeClass( "disabled" );
			$( "#token-to-login").text( "Start test" );
			data = $.trim(data);
			var msg = $.parseJSON(data);
			var status = msg.status;
			if(status == 'error') {
			  $( ".alert-danger").show().html(msg.message); 	
			} else {
				window.location.href = msg.url;
			}		
		}
	});
}

//login candidate 
function checkLoginSaas() {
	$( "#login_token_form div").removeClass( "has-error" );
	$( "#token-to-login").text( "Checking..." );
	$( "#token-to-login").addClass( "disabled" );
	$( "#saas_login_form .error_msg").remove();
	$( "#saas_login_form div").removeClass( "has-error" );
	$( "#login_register_popup .alert").hide();
	$.ajax({
		type: "POST",
		url: base_url+'/ajax_files/saas_corporate_function.php?action=CheckLoginSass', 
		data: $("#login_saas_form").serialize(),
		success: function(data) {
			$( "#token-to-login").removeClass( "disabled" );
			$( "#token-to-login").text( "Login" );
			data = $.trim(data);
			var msg = $.parseJSON(data);
			var status = msg.status;
			if(status == 'return') {
				window.location.href = msg.return_url;
			} else if(status == 'error') {
			  $.each(msg, function (index, value) {
				  $("#saas_login_form input[name="+index+"]").closest('li').addClass( "has-error" );
				  $( "<span class='error_msg'> "+value+" </span>" ).insertAfter("#saas_login_form input[name="+index+"]");	
			  });
			} else if(status == 'verification') {
				$( ".alert-danger").show().html(msg.message); 
			} else {
				window.location.href = window.location.href;
			}		
		}
	});
}

//register candidate 
function checkSaasRegister() {
	$( "#login_register_popup .alert").hide();
	$( "#register_token_form .error_msg").remove();
	$( "#register_token_form li").removeClass( "has-error" );
	$( "#register_token_form div").removeClass( "has-error" );
	$( "#token-to-register").text( "Checking..." );
	$( "#token-to-register").addClass( "disabled" );
	$("#select-your-theme span.error_message").hide();
	$.ajax({
		type: "POST",
		url: base_url+'/ajax_files/saas_corporate_function.php?action=CheckRegisterSaas', 
		data: $("#register_token_form").serialize(),
		success: function(data) {
			$( "#token-to-register").removeClass( "disabled" );
			$( "#token-to-register").text( "Register" );
			data = $.trim(data);
			var msg = $.parseJSON(data);
			var status = msg.status;
			if(status == 'exist') {
			  $( ".alert-danger").show().html(msg.message); 			  
			} else if(status == 'return') {
                                if(msg.return_url !== null){
                                    window.location.href = msg.return_url;
                                }else{
                                    $('.msgErrortop .message-box').addClass('error-msg').find('p').text(msg.message);
									 setTimeout('window.location.href = window.location.href', 1000);	
                                }
				
			} else if(status == 'error') {
			  //$( ".alert-danger").show().html(msg.message); 
				$.each(msg, function (index, value) {
					if(index == 'themes') {
						$("#select-your-theme span.error_message").text(value).show();
					} else {
					$("#register_token_form input[name="+index+"], #register_token_form select[name="+index+"]").closest('li').addClass( "has-error" );
					$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("#register_token_form input[name="+index+"], #register_token_form select[name="+index+"]");
					}
				});		
			} else if(status == 'verification') {	
				$( "#register_token_form input").val("");
				$( ".alert-verification").show().html(msg.message); 
			} else if(status == 'resend') {	
				$( ".alert-verification").show().html(msg.message+'<br><a href="#" id="send_verification_mail" data-user_id='+msg.user_id+' data-season_id='+msg.season_id+' "><u>Click here</u></a> to resend verification mail!'); 
				$( "#register_token_form input").val("");
			} else {
				window.location.href = window.location.href;
			}		
		}
	});
}

 $(document).on('click', '#send_verification_mail', function(){
	 var user_id = $(this).data('user_id')
	 var season_id = $(this).data('season_id')
	$.ajax({
		type: "POST",
		url: base_url+'/ajax_files/saas_corporate_function.php?action=resendVerificationMail', 
		data: {user_id:user_id,season_id:season_id,},
		success: function(data) {
			$( "#token-to-register").removeClass( "disabled" );
			$( "#token-to-register").text( "Register" );
			data = $.trim(data);
			var msg = $.parseJSON(data);
			var status = msg.status;
			if(status == 'success') {
				$( ".alert-verification").show().html(msg.message); 
			}				
		}
	});
 });
 
//show registration display label 
  $(document).on('keyup', '#sign-up-form :input', function(){
	 var inputName = $(this).val();
	 if(inputName) {
		$(this).closest('li').find('label').show();
	 } else {
		$(this).closest('li').find('label').hide();
	 }
  });
  
  
function recruitPaswword() {
$('#login-form').fadeOut();
$('#forgot-password').fadeIn();
}

function recruitlogin() {
$('#login-form').fadeIn();
$('#forgot-password').fadeOut();
}

function sendCorporatePassword() {
 var email = $('input#email_id').val();
 var captcha_value=$('input#txtCaptcha').val();
 $("#error_msg").html('');
 $('#error_msgli').removeClass('has-error');
	if(email == '') {
	  $('#error_msg').html('Please enter a email id.').show();
      $('#error_msgli').addClass('has-error');
      $("#error_msg1").hide();
      $('#error_msgli1').removeClass('has-error');
	  return false;
	}
	
	if(email != '') {
	  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  if (!filter.test(email)) {
		$('#error_msg').html('Please enter a valid email id.').show();
        $('#error_msgli').addClass('has-error');
        $("#error_msg1").hide();
        $('#error_msgli1').removeClass('has-error');
		return false;
	  }
	}
	
	$.ajax({
      type: "POST",
      url: base_url+'/ajax_files/codejudge_send_corporate_password.php', 
      data: "email=" + email+"&captcha_value="+captcha_value,//only input,
      success: function(data){
        $("#error_msg").html('');
        $('#error_msgli').removeClass('has-error');
        if(data.length > 0) {
            var string = new Array();
            string = data.split('@@@');
            if(string[0]==1) {
              $("#email_msg").html(''+string[1]+'').show();
              //setTimeout('recruitlogin()', 3000);	
	          return false;
            } else  {
              if(string[0]==3) {
                $("#error_msg1").html(''+string[1]+'').show();
                $('#error_msgli1').addClass('has-error');
                $("#error_msg").hide();
                $('#error_msgli').removeClass('has-error');
              } else if(string[0]==4) {
			    $("#error_msg").html(''+string[1]+'').show();
                $('#error_msgli').addClass('has-error');
                $("#error_msg1").hide();
                $('#error_msgli1').removeClass('has-error');
			  } else {
                window.location.href = string[1];
                //$("#error_msg").html(''+string[1]+'').show();
                //$('#error_msgli').addClass('has-error');
                //$("#error_msg1").hide();
                //$('#error_msgli1').removeClass('has-error');
              }
            }
        } 
      }
	});
	
}

function CreateNewTest() {

	$( "#createNewTest div").removeClass( "has-error" );
	$( "#createTest").val( "Processing..." );
	$( "#createTest").addClass( "disabled" );
	$( "#createNewTest .error_msg").remove();
		$.ajax({
				type: "POST",
				url: base_url+'/ajax_files/saas_corporate_function.php?action=CreateNewTest', 
				data: $("#createNewTest").serialize(),
				success: function(data){

					$( "#createTest").removeClass( "disabled" );
					$( "#createTest").val( "Create Test" );
					data = $.trim(data);
					var msg = $.parseJSON(data);

					if(msg.status == 'error') {
						$.each(msg, function (index, value) {
							$("input[name="+index+"]").closest('div').addClass( "has-error" );
							if(index != 'status') {
							 $( "<span class='error_msg'> "+value+" </span>" ).insertAfter("input[name="+index+"]");
							}
						});
					} else if(msg.status == 'exceed') {
						lockedcontest();
						$('#create-test-popup').hide();
					}  else if(msg.status == 'success') {
						$("#create-test-popup").hide();
						$("#new_season_id").val(msg.contest_id);
						$("#default_season_id").val(msg.contest_id);
						$("#new_test_name").val(msg.test_name);
						$("#test_duration").val(msg.duration);
						$("a#add_question_link").attr("href", msg.add_question_link);
						$("a#advance_setting_link").attr("href", msg.advance_setting_link);
						$("a#candidate_setting_link").attr("href", msg.candidate_setting_link);
						$("a#theme_link").attr("href", msg.theme_link);
						$("#full_season_url").html(msg.full_season_url);
						$("#season_url").val(msg.season_url);
						$("#basic_settings_popup").modal("show");
						/*if(msg.show_platform_popup=='Yes') {
						  $("#choose_platform_popup").modal("show");
						} else {
						  $("#basic_settings_popup").modal("show");
						}*/
						//window.location.href = base_url+'/recruit/test/'+msg.contest_id+'/questions';
					} else {
						$( "<span class='error_msg'> Could not save Test </span>" ).insertBefore("#createTest");
					}	
				}
		});
}


function CreateCodehireTest() {
		$.ajax({
				type: "POST",
				url: base_url+'/ajax_files/saas_corporate_function.php?action=CreateCodehireTest', 
				data: $("#createCodehireTest").serialize(),
				success: function(data){
					data = $.trim(data);
					var msg = $.parseJSON(data);
					if(msg.status == 'success') {
						alert('Yes');
            $('#exced_limit_popup').hide();
					} else {
						alert('No');
					}	
				}
		});
}



function AddtestCases() {
	$( "#add-test-case div").removeClass( "has-error" );
	$( "#add-testcase-button").val( "Processing..." );
	$( "#add-testcase-button").addClass( "disabled" );
	$( "#add-test-case .error_msg").remove();

		$.ajax({
						type: "POST",
						url: base_url+'/ajax_files/saas_corporate_function.php?action=AddTestCase', 
						data: $("#add-test-case-form").serialize(),
						success: function(data){
							$( "#add-testcase-button").removeClass( "disabled" );
							$( "#add-testcase-button").val( "Save Changes" );
							data = $.trim(data);
							var msg = $.parseJSON(data);
							if(msg.status == 'error') {
									$.each(msg, function (index, value) {
									$("[name="+index+"]").closest('div').addClass( "has-error" );
									if(index != 'status' && index != 'testcase_type') {
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("#"+index);
									}
									if(index == 'testcase_type') {
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter(".select");
									}
									});
							} else if(msg.status == 'success') {
								window.location.href = base_url+'/'+saas_prefix+'/test/'+msg.season_id+'/questions/'+msg.contest_id+'/'+msg.category_key+'/edit/step3';
							} else {
								$( "<span class='error_msg'> Could not save Test </span>" ).insertBefore("#add-testcase-button");
							}	
						}
		});
}

function SaveTemplates() {

	$( "#generateTemplates div").removeClass( "has-error" );
	$( "#save-template").text( "Processing..." );
	$( "#save-template").addClass( "disabled" );
	$( "#generateTemplates .error_msg").remove();

		$.ajax({
						type: "POST",
						url: base_url+'/ajax_files/saas_corporate_function.php?action=generateTemplates', 
						data: $("#generateTemplates").serialize(),
						success: function(data){
							$( "#save-template").removeClass( "disabled" );
							$( "#save-template").text( "Save & Proceed" );
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'error') {
									$.each(msg, function (index, value) {
									$("#"+index).closest('li').addClass( "has-error" );
									if(index != 'status') {
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("#"+index);
									}
									if(index == 'language_id') {
									$( "<span class='error_msg'> "+value+" </span>" ).insertAfter(".stylish-checkboxes");
									}
									if(index == 'selected_input_types') {
									$( "<span class='error_msg'> "+value+" </span>" ).insertBefore(".input-options");
									}
									});
							} else if(msg.status == 'success') {
								if(msg.data_type_exception) {
								$('#input-data-type-error').modal('show');
								$('#exception_language').html(msg.exception_language);
								$('.exception_datatype').html(msg.exception_datatype);
								$('#step_third_link').attr('href',base_url+'/'+saas_prefix+'/test/'+msg.season_id+'/questions/'+msg.contest_id+'/coding/edit/step3');
								
								} else {
								window.location.href = base_url+'/'+saas_prefix+'/test/'+msg.season_id+'/questions/'+msg.contest_id+'/'+msg.category_key+'/edit/step3';
								}
								
							} else {
								$( "<span class='error_msg'> Could not save Test </span>" ).insertBefore("#save-template");
							}	
						}
		});
}

function GenerateTemplatesCode() {
	
	$( "#generateTemplates div").removeClass( "has-error" );
	$( "#generate-code").text( "Processing..." );
	$( "#generate-code").addClass( "disabled" );
	$( "#generateTemplates .error_msg").remove();
	//$('.save_answer_status_msg').show();
	$('#testcase_count').val();
	$("#skillpopup").modal('hide');
	bootbox.confirm({ 
				//size: 'small',
				title: "Are you sure to generate code?",
				message: "<p class='alert alert-warning'>Warning : If you have existing test cases or code that will be removed!</p> ", 
				callback: function(result){if(result) {  
					$('.save_answer_status_msg').show();
					$.ajax({
						type: "POST",
						url: base_url+'/ajax_files/saas_corporate_function.php?action=generateTemplatesCode', 
						data: $("#generateTemplates").serialize(),
						success: function(data){
							$( "#generate-code").removeClass( "disabled" );
							$( "#generate-code").text( "Generate Code" );
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'error') {
									$.each(msg, function (index, value) {
										$("#"+index).closest('li').addClass( "has-error" );
										if(index != 'status') {
										$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("#"+index);
										}
										if(index == 'language_id') {
										$( "<span class='error_msg'> "+value+" </span>" ).insertAfter(".stylish-checkboxes");
										}
										if(index == 'selected_input_types') {
										$( "<span class='error_msg'> "+value+" </span>" ).insertBefore(".input-options");
										}
									});
									 $('.save_answer_status_msg').hide();
							} else if(msg.status == 'success') {
										if(msg.data_type_exception) {
										$('#input-data-type-error').modal('show');
										$('#exception_language').html(msg.exception_language);
										$('.exception_datatype').html(msg.exception_datatype);
										$('#step_third_link').attr('href',base_url+'/'+saas_prefix+'/test/'+msg.season_id+'/questions/'+msg.contest_id+'/coding/edit/step3');
									} else {
										window.location.href = base_url+'/'+saas_prefix+'/test/'+msg.season_id+'/questions/'+msg.contest_id+'/'+msg.category_key+'/edit/step2';
										}
							} else {
								 $('.save_answer_status_msg').hide();
								$( "<span class='error_msg'> Could not save Test </span>" ).insertBefore("#save-template");
							}	
						}
					});
				} else {
						//$("[name='screen-capture']").bootstrapSwitch('toggleState');
				}}
	});
	
		
}

function setSkillAllow(skillCheck){
	var skill_language = $("#skillLanguage").val();
	skill_language = (typeof skill_language === "undefined") ? "" : skill_language;
	if(skill_language!='' && skillCheck==1){
		$("#skip_language_for_template").val(skill_language);
		$('#skill_allow_no').prop('checked', true);
		return false;
	}
	$('#skill_allow_yes').prop('checked', true);
}

function ValidateTemplatesLanguage(){
	
	$( "#generateTemplates div").removeClass( "has-error" );
	$( "#generate-code").text( "Processing..." );
	$( "#generate-code").addClass( "disabled" );
	$( "#generateTemplates .error_msg").remove();
	$('#testcase_count').val();
	$.ajax({
				type: "POST",
				url: base_url+'/ajax_files/saas_corporate_function.php?action=validateTemplatesLanguage', 
				data: $("#generateTemplates").serialize(),
				success: function(data){
				var msg = $.parseJSON(data); 
				if(msg.status == 'success') {
					
					if(msg.message==''){
						GenerateTemplatesCode();
						 return false;
					} else {
						$("#skillpopup").modal('show');
						$("#not_supported_skill").html(msg.message);
						 return false;
					}
					
				} else {
					 $('.save_answer_status_msg').hide();
					 $( "<span class='error_msg'> Could not save Test </span>" ).insertBefore("#save-template");
					 return false;
				}	
			}
		});
		
	
	
}


function showEditor(editor_id) {
  var editor_type = ["editor-1", "editor-2", "editor-3"];
		$('#'+editor_id).show();	
		
		  editor_type = jQuery.grep(editor_type, function(value) {
		  return value != editor_id;
		});
		var res = editor_type.toString()	
		editor_ids = res.split(',');
	
		$('#'+editor_ids[0]).hide(); 
		$('#'+editor_ids[1]).hide(); 
}

function redirectToPreviousQuestion(invitation_id){
    var test_action_url = $('#test_action_url').val(); 
    $("#submit_button-practice-previous").val("Redirecting...");
     window.location.href = test_action_url+'/'+invitation_id;
}

$(document).ready(function(){
    $(document).on('click', '#save-mcq',function(){
       
	var answer_option = '';
        var invitation_id = $(this).data('invitation_id');
        var question_id = $(this).data('question_id');
  var check_clear_validation=$('#clear_option_check').val();
	$('#attempted_option ul li.active').each(function() {
		if(answer_option == '') {
			answer_option = $(this).attr('id');
		} else {
			answer_option = answer_option+'@@'+$(this).attr('id');
		}
	});
    
	if(answer_option == '' && check_clear_validation==0) { 
	$('#submit-error').modal('show');
	return false;
	}
	
	var webcam_val = $('#webcam_enable').val(); 
	var platform_type = $('#platform_type').val(); 
	var page_number = $('#next_page_count').val();
	var event_name = $('#event_name').val(); 
	var test_action_url = $('#test_action_url').val(); 
    var practice = $('#practice').val();
    var finalsubmit = $('#final-submit').val();
    if(typeof finalsubmit === 'undefined') { finalsubmit = ''; }
	$("#save-mcq").addClass( "disabled" );
	$("#save-mcq").val("Submitting...");
	$(".submit_button-practice").val("Submitting...");
	$(".submit_button-practice").addClass( "disabled" );
	//check here platform_type 
	if(platform_type == 'codejudge') {
		
		if(contest_saas_prefix=='techchallenge'){
			var contest_redirect_url = base_url+'/'+saas_prefix+'/question';
		} else {
			var contest_redirect_url = base_url+'/'+saas_prefix+'/tests/questions';
		}
		
	} else {
		var contest_redirect_url = base_url+'/'+assessment_url+'/question';
	}
	
	if(test_action_url != '') {
		var contest_redirect_url = test_action_url;
	}
	
	try{
		var url = base_url+"/ajax_files/codejudge_save_mcq_answer.php";
		$.post(url,{'question_id':question_id,'answer_option':answer_option, 'invitation_id':invitation_id, 'platform_type':platform_type},function(data){
      data = $.trim(data);
	
			if(data.length > 0) {
				$("#save-mcq").val( "Done, redirecting..." );
				if(data == 'timeout') {
					alert('Contest Time is over. Click OK to see the result');
					$('#codejudge_requirement').submit();
				} else if(webcam_val == 1) { //webcam
					$('#clear_option_check').val("0");
					if(page_number != 'none') {
                        var params = {};
                        var modules = 'ShowQuestionDescriptionModule';
                        params.question_id = $('#next_question_id').val();
                        params.question_no = page_number;
                        params.invitation_id = invitation_id;
                        
						$.ajax({
                        type: "POST",
                        url: base_url + "/ajax_files/load_question_module.php",
                        data: {params: params, modules: modules},
                        dataType: 'html',
                        cache: false,
                        success: function (data) {
                            $('#coding-content-area').html('');
                            $('#coding-content-area').html(data);
                        }
                    });
					} else {
					$("#save-mcq").removeClass( "disabled" );
					$("#save-mcq").val("Submit answer");
					}
	
				} else if(data == 'success' && page_number == 'none') {
						var final_url = contest_redirect_url+'/'+invitation_id;

					window.location.href = final_url;
					
				} else if(data == 'success') {
                    
                    if($.trim(practice) && practice !=0){
                        if(finalsubmit == '1'){
                                $('#codejudge_requirement').submit();
                        }else{
                            window.location.href = contest_redirect_url+'/'+invitation_id;
                        }
                        }else{
                            window.location.href = contest_redirect_url+'/'+invitation_id+'/'+page_number;
                            }
				} 
			}
		});
		
	}catch(e){
		//alert(e.description);
	}
});
});

$(document).ready(function(){
    $(document).on('click','#save-sentence-question', function(){
	
	var question_id = $(this).data('question_id');
	var invitation_id = $('#encrypt_token').val(); 
	var webcam_val = $('#webcam_enable').val(); 
	var page_number = $('#next_page_count').val(); 
	var platform_type = $('#platform_type').val(); 
	var test_action_url = $('#test_action_url').val(); 
        var item = $('.check-input-choices').val();
        
        if(!$.trim(item)){
             $('.submit-error').modal('show');
            return false;
            
        }
        
        var contest_redirect_url = base_url+'/'+assessment_url+'/question';
	if(test_action_url != '') {
            var contest_redirect_url = test_action_url;
	}
	
	$("#save-sentence-question").addClass( "disabled" );
	$("#save-sentence-question").val("Submitting...");
	try	{
					$.ajax({
						type: "POST",
						url: base_url+'/ajax_files/saas_candidate_function.php?action=sentence_complete_submission', 
						data: $("#choice_options").serialize()+'&question_id='+question_id+'&invitation_id='+invitation_id,
						success: function(data){
							data = $.trim(data);
							var msg = $.parseJSON(data); 
                                                        
							$("#save-sentence-question").val( "Done, redirecting..." );
							if(msg.status == 'error') {
									$("#save-sentence-question").removeClass( "disabled" );
									$("#save-sentence-question").val("Submit answer & continue");
									$('.submit-error .modal-body p').html(msg.error);
									$('.submit-error').modal('show');
							} else if(msg.status == 'timeout') {
								alert('Contest Time is over. Click OK to see the result');
								$('#codejudge_requirement').submit();
							} else if(webcam_val == 1) {
									var params = {};
                                                                    var modules = 'ShowQuestionDescriptionModule';
                                                                    params.question_id = $('#next_question_id').val();
                                                                    params.question_no = page_number;
                                                                    params.invitation_id = invitation_id;
                                                                    
                                                                    $.ajax({
                                                                    type: "POST",
                                                                    url: base_url + "/ajax_files/load_question_module.php",
                                                                    data: {params: params, modules: modules},
                                                                    dataType: 'html',
                                                                    cache: false,
                                                                    success: function (data) {
                                                                        $('#coding-content-area').html('');
                                                                        $('#coding-content-area').html(data);
                                                                    }
                                                            });
							} else if(msg.status == 'success' && page_number == 'none') {
								$('#codejudge_requirement').submit();
							} else if(msg.status == 'success') {
								window.location.href = contest_redirect_url+'/'+invitation_id+'/'+page_number;
							} 	
						}
					});
	}catch(e){
		//alert(e.description);
	}
});
});

function unselect_question_answer(question_id, invitation_id) {
	$("#attempted_option ul.options li").removeClass("active");
	$('#clear_option_check').val("1");
	var answer_option = '';
	try{

		var url = base_url+"/ajax_files/codejudge_save_mcq_answer.php";
		$.post(url,{'question_id':question_id,'answer_option':answer_option, 'invitation_id':invitation_id},function(data){
			data = $.trim(data);
			if(data.length > 0) {
			//blank no alert
			}
		});
		
	}catch(e){
		//alert(e.description);
	}
	
}
$(document).ready(function(){
    $(document).on('click','#save-file-question', function(){

	var question_id = $(this).data('question_id');
	var invitation_id = $(this).data('invitation_id');
	
	var answer_option = '';
	$('.submit-error').find('.file-error-message').remove();
	var exist_file_upload = $('#exist_file_upload').val(); 
	
	var test_action_url = $('#test_action_url').val(); 
	var practice = $('#practice').val(); 
	
	var platform_type = $('#platform_type').val(); 	
	var webcam_val = $('#webcam_enable').val(); 	
	var file_data = $('#file_upload').prop('files')[0];  
	var form_data = new FormData();                  
	form_data.append('file', file_data);                          
	form_data.append('question_id', question_id);   
	form_data.append('platform_type', platform_type);   
	form_data.append('invitation_id', invitation_id);   
	form_data.append('exist_file_upload', exist_file_upload);   
		
	var file_name = $('input[type=file]').val();
	
	if(file_name == '' && exist_file_upload == '') {
	 $('.submit-error').modal('show');
         var html = "<div class='file-error-message'><p>Please answer the question before submitting. </p></div>";
         $('.submit-error').find('.modal-body').append(html);
	 return false;
	}
        if(file_name == '' && exist_file_upload != ''){
         $('.submit-error').modal('show');
         var html = "<div class='file-error-message'><p>You have already submitted the file, please upload other file to override existing. </p></div>";
         $('.submit-error').find('.modal-body').append(html);
	 return false;
        }
  
  if(file_data.size>=5000000) {
    alert('File size can not be greater than 5MB.');
    return false;
  }
	
	var page_number = $('#next_page_count').val(); 
	$("#save-file-question").addClass( "disabled" );
	$("#save-file-question").val("Submitting...");
		var contest_redirect_url = base_url+'/'+assessment_url+'/question';
	if(test_action_url != '') {
		var contest_redirect_url = test_action_url;
	}
	
	try{
	
			$.ajax({
				
					url: base_url+'/ajax_files/saas_candidate_function.php?action=UploadFileSubmission', 
					dataType: 'text',  // what to expect back from the PHP script, if anything
					cache: false,
					contentType: false,
					processData: false,
					data: form_data,                         
					type: 'post',
					success: function(data){
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							$("#save-file-question").val( "Done, redirecting..." );
							if(msg.status == 'error') {
									$("#save-file-question").removeClass( "disabled" );
									$("#save-file-question").val("Submit answer & continue");
									$('.submit-error .modal-body p').html(msg.error);
									$('.submit-error').modal('show');
							} else if(msg.status == 'timeout') {
								alert('Contest Time is over. Click OK to see the result');
								$('#codejudge_requirement').submit();
							} else if(webcam_val == 1) {
								if(page_number != 'none') {
			
										var action_url = contest_redirect_url+'/ajax/'+invitation_id+'/'+page_number;
										$('.append-question-detail-ajax').load(action_url, function(responseTxt, statusTxt, xhr){
										});	
								} else {
										$("#save-file-question").removeClass( "disabled" );
										$("#save-file-question").val("Submit answer");
								}
							} else if(msg.status == 'success' && page_number == 'none') {
								window.location.href = contest_redirect_url+'/'+invitation_id;
							} else if(msg.status == 'success') {
                                                            if($.trim(practice)){
                                                                window.location.href = contest_redirect_url;

                                                            }else{
								window.location.href = contest_redirect_url+'/'+invitation_id+'/'+page_number;
                                                            }	
                                                        } 	
					}
		 });
	}catch(e){
		//alert(e.description);
	}
});});
$(document).ready(function(){

$(document).on('click','#submit_button_subjective', function(){
    var question_id = $(this).data('question_id');
	
    var nicInstance = nicEditors.findEditor('text_content');
    var template_content=nicInstance.getContent(); 
    var answer_option = template_content.replace(/&nbsp;/g, ' ');
	if(answer_option == '') {
	$('.submit-error').modal('show');
	return false;
	}
	var webcam_val = $('#webcam_enable').val(); 
	var invitation_id = $('#next_encrypt_token').val(); 
	var platform_type = $('#platform_type').val(); 
	var page_number = $('#next_page_count').val(); 
	$("#submit_button_subjective").addClass( "disabled" );
	$("#submit_button_subjective").val("Submitting...");
	var test_action_url = $('#test_action_url').val(); 
	
	//check here platform_type 
	if(platform_type == 'codejudge') {
		var contest_redirect_url = base_url+'/'+saas_prefix+'/tests/questions';
	} else {
		var contest_redirect_url = base_url+'/'+assessment_url+'/question';
	}
	
	if(test_action_url != '') {
		var contest_redirect_url = test_action_url;
	}
							
	try	{
					var url = base_url+'/ajax_files/saas_candidate_function.php?action=SubjectiveSubmission';
	
					$.post(url,{'question_id':question_id,'answer_option':answer_option,'platform_type':platform_type, 'invitation_id':invitation_id},function(data){ 
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							$("#submit_button_subjective").val( "Done, redirecting..." );
                                                        
							if(msg.status == 'error') {
                                                            $("#submit_button_subjective").removeClass( "disabled" );
                                                            $("#submit_button_subjective").val("Submit answer & continue");
									$('.submit-error .modal-body p').html(msg.error);
									$('.submit-error').modal('show');
							} else if(msg.status == 'timeout') {
								alert('Contest Time is over. Click OK to see the result');
								$('#codejudge_requirement').submit();
							} else if(webcam_val == 1) {								
								var params = {};
                                var modules = 'ShowQuestionDescriptionModule';
                                params.question_id = $('#next_question_id').val();
                                params.question_no = page_number;
                                params.invitation_id = invitation_id;
                                
                                $.ajax({
                                type: "POST",
                                url: base_url + "/ajax_files/load_question_module.php",
                                data: {params: params, modules: modules},
                                dataType: 'html',
                                cache: false,
                                success: function (data) {
                                    $('#coding-content-area').html('');
                                    $('#coding-content-area').html(data);
                                }
                            });
							} else if(msg.status == 'success' && page_number == 'none') {
								$('#codejudge_requirement').submit();
							} else if(msg.status == 'success') {
								window.location.href = contest_redirect_url+'/'+invitation_id+'/'+page_number;
							} 	
					});
	}catch(e){
		//alert(e.description);
	}
});    
});

$(document).ready(function(){
	
$(document).on('click','#save-db-question', function(){
    var question_id = $(this).data('question_id');
    var invitation_id = $(this).data('invitation_id'); 
	var answer_option = '';	
	var answer = editor.getValue();
	var answer_option = $.trim(answer);
  var form_key_post = $('#form_key_post').val();
	if(answer_option == '---Write your query statement here') {
	$('.submit-error').modal('show');
	return false;
	}
	
	var test_action_url = $('#test_action_url').val(); 
	var platform_type = $('#platform_type').val();
	var webcam_val = $('#webcam_enable').val();
	var form_key_post = $('#form_key_post').val();
	var page_number = $('#next_page_count').val(); 
        $("#save-db-question").addClass( "disabled" );
	$("#save-db-question").val("Submitting...");
	
		var contest_redirect_url = base_url+'/'+assessment_url+'/question';
	
	if(test_action_url != '') {
		var contest_redirect_url = test_action_url;
	}
	
	try	{
					var url = base_url+'/ajax_files/saas_candidate_function.php?action=DatabaseSubmission';

					$.post(url,{'question_id':question_id,'answer_option':answer_option, 'invitation_id':invitation_id, 'form_key_post':form_key_post, 'platform_type':platform_type},function(data){

							data = $.trim(data);
							var msg = $.parseJSON(data); 
														
							$("#save-db-question").val( "Done, redirecting..." );
							if(msg.status == 'error') {
									$("#save-db-question").removeClass( "disabled" );
									$("#save-db-question").val("Submit answer & continue");
									$('.submit-error .modal-body p').html(msg.error);
									$('.submit-error').modal('show');
							} else if(msg.status == 'timeout') {
								alert('Contest Time is over. Click OK to see the result');
								$('#codejudge_requirement').submit();
							} else if(webcam_val == 1) {
								if(page_number != 'none') {
									var action_url = contest_redirect_url+'/ajax/'+invitation_id+'/'+page_number;
                                                                
                                                                $('.append-question-detail-ajax').load(action_url, function(responseTxt, statusTxt, xhr){

									});	
								} else {
                                                                    var action_url = contest_redirect_url+'/ajax/'+invitation_id;
                                                                
                                                                $('.append-question-detail-ajax').load(action_url, function(responseTxt, statusTxt, xhr){

                                                                });
								
								}
							} else if(msg.status == 'success' && page_number == 'none') {
								window.location.href = contest_redirect_url+'/'+invitation_id;
							} else if(msg.status == 'success') {
								window.location.href = contest_redirect_url+'/'+invitation_id+'/'+page_number;
							} 	
					});
	}catch(e){
		//alert(e.description);
	}
});
});

	
	$('#upload_banner').on('click', function() {
		$('#upload_banner').val( "Processing..." );
		$('#upload_banner').addClass( "disabled" );
		$( "#upload-test-banner .alert-danger").remove();
		var season_id=$('input[name=season_id]').val();
    var platform_type= $('input[name=platform_type]').val();
		var sm_pic=$('input[name=fileupload_small_old]').val();
		var lg_pic=$('input[name=fileupload_large_old]').val();
    var form_data = new FormData();  
		var file_data = $('#upload-test-banner #file_upload').prop('files')[0]; 
    //if(platform_type=='codehire') {  
		 var file_data_small = $('#upload-test-banner #file_upload_small').prop('files')[0];   
		 form_data.append('file_small', file_data_small);
     form_data.append('sm_pic', sm_pic);
  //  }                 
		form_data.append('file', file_data);
    form_data.append('season_id', season_id);                                                                                                      
    form_data.append('lg_pic', lg_pic);                                                    
		$.ajax({
				url: base_url+'/ajax_files/saas_corporate_function.php?action=UploadTestBanner', 
				dataType: 'text',  // what to expect back from the PHP script, if anything
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,                         
				type: 'post',
				success: function(data){
					  data = $.trim(data);
					  var msg = $.parseJSON(data);
					  var status = msg.status;
					  if(status=='success') {
						$('#upload_banner').val("Upload"); 
						$('#upload_banner').removeClass( "disabled" );
						window.location = window.location.href;
					  } else {
						$.each(msg, function (index, value) {
									$( "<p class='alert alert-danger'> "+value+" </p>" ).insertAfter("."+index);
						});	
						$('#upload_banner').val("Upload"); 
						$('#upload_banner').removeClass( "disabled" );
					  } 
				}
		 });
	});
  

$(document).ready(function(){
	
$(document).on('click','#save-front-question', function(){
    var question_id = $(this).data('question_id');
	
	var html_data = editor1.getValue();
	var js_data = editor2.getValue();
	var css_data = editor3.getValue();
	
	var webcam_val = $('#webcam_enable').val();
        var invitation_id = $('#encrypt_token').val();
	var page_number = $('#next_page_count').val(); 
	$("#save-front-question").addClass( "disabled" );
	$("#save-front-question").val("Submitting...");
	var platform_type = $('#platform_type').val();
	var test_action_url = $('#test_action_url').val(); 
	
        var contest_redirect_url = base_url+'/'+assessment_url+'/question';
	if(test_action_url != '') {
            var contest_redirect_url = test_action_url;
	}
	
			$.ajax({
						type: "POST",
						url: base_url+'/ajax_files/saas_candidate_function.php?action=Front_end_Submission', 
						data: "html_data="+html_data+"&js_data="+js_data+"&css_data="+css_data+"&question_id="+question_id+"&invitation_id="+invitation_id,
						success: function(data){
							data = $.trim(data);
							var msg = $.parseJSON(data); 
							$("#save-front-question").val( "Done, redirecting..." );
							if(msg.status == 'error') {
									$("#save-front-question").removeClass( "disabled" );
									$("#save-front-question").val("Submit answer & continue");
									$('.submit-error .modal-body p').html(msg.error);
									$('.submit-error').modal('show');
							} else if(msg.status == 'timeout') {
								alert('Contest Time is over. Click OK to see the result');
								$('#codejudge_requirement').submit();
							} else if(webcam_val == 1) {
                                                            if(page_number != 'none'){
								var action_url = contest_redirect_url+'/ajax/'+invitation_id+'/'+page_number;
                                                                $('.append-question-detail-ajax').load(action_url, function(responseTxt, statusTxt, xhr){
								});	
                                                            }else{
                                                                var action_url = contest_redirect_url+'/ajax/'+invitation_id;
                                                                $('.append-question-detail-ajax').load(action_url, function(responseTxt, statusTxt, xhr){
                                                                });	
                                                            }
							} else if(msg.status == 'success' && page_number == 'none') {
                                                                $('#codejudge_requirement').submit();
								//window.location.href = contest_redirect_url+'/'+invitation_id;
							} else if(msg.status == 'success') {
								window.location.href = contest_redirect_url+'/'+invitation_id+'/'+page_number;
							} 	
						}
			});

});
});

//free client contest copy season
function copySeason(id, language, season_title, language_title, type_contest) {
	var clone_type = $("input:radio[name=clone_type]:checked").val();
  if(type_contest=='clone') {
    var season_id = $('#clone_season_id').val();
  } else {
    var season_id = id;
  }
  
  var platform_type = $("input:radio[name=platform_type]:checked").val();

  $('.save_answer_status_msg').show();
	$.ajax({
			type: "POST",
			url: base_url+"/ajax_files/contest_functions.php", 
			data: "action=copySeason&season_id="+season_id+"&language="+language+"&season_title="+season_title+"&language_title="+language_title+"&type_contest="+type_contest+"&platform_type="+platform_type+"&clone_type="+clone_type,//only input,
       success: function(data){
        data = $.trim(data);
			   if(data == 'success') {
				 window.location.href= base_url+'/'+saas_prefix+'/dashboard/3008/1';
				} else if(data == 'exceed') {
						$('.save_answer_status_msg').hide();
						$('#show_clone_popup').modal('hide');
						lockedcontest();
				} else {
				 $('.save_answer_status_msg').hide();
				 window.location.href= base_url+'/'+saas_prefix+'/dashboard/3011/2';
				}
			},
			error: function(jq,status,message) {
				$('.save_answer_status_msg').hide();
			}
	});
}

function save_candidate_setting() {
		var objButton = $(this); 
    $("#candidate_setting").find('.has-error').removeClass( "has-error" );
		$("#submit_button").addClass( "disabled" );
		$("#submit_button").val("Submitting...");
    $("#candidate_setting").find('.error_msg').remove();
		
		var season_id = $("#season_id").val();
    var company_domain_name = $("#company_domain_name").val();
    var mail_sending = $("#mail_sending").val();
    
    var e = document.getElementById("judging_criteria");
    var judging_criteria = e.options[e.selectedIndex].value;
    
		var mendatory_fields='';
		$('.checkbox  .mandatory:checked').each(function() {
			if(mendatory_fields == '') {
				mendatory_fields = $(this).val();
			} else {
				mendatory_fields = mendatory_fields+','+$(this).val();
			}
		});
		
		mendatory_fields = mendatory_fields.replace(/\,&/g,',');
		mendatory_fields = mendatory_fields.replace(/\&,/g,',');
		mendatory_fields = mendatory_fields.replace(/\&/g,'');
		
		var uniqueList1=mendatory_fields.split(',').filter(function(item1,i1,allItems1){
			return i1==allItems1.indexOf(item1);
		}).join(',');
		mendatory_fields = uniqueList1;	
		
		var registration_fields='';  var custom_text_1 = ''; var custom_text_2 = ''; var custom_text_3 = '';
		$('.checkbox .registration:checked').each(function() {
			if(registration_fields == '') {
				registration_fields = $(this).val();
			} else {
				registration_fields = registration_fields+','+$(this).val();
			}
			var field_id = $(this).val();
		
			if(field_id ==52) {
				 custom_text_1 = $("#custom_field_"+field_id).val();
			}
			if(field_id ==53) {
				 custom_text_2 = $("#custom_field_"+field_id).val();
			}
			if(field_id ==54) {
				 custom_text_3 = $("#custom_field_"+field_id).val();
			}
		});
	
		registration_fields = registration_fields.replace(/\,&/g,',');
		registration_fields = registration_fields.replace(/\&,/g,',');
		registration_fields = registration_fields.replace(/\&/g,'');
		
		var uniqueList=registration_fields.split(',').filter(function(item,i,allItems){
			return i==allItems.indexOf(item);
		}).join(',');
		registration_fields = uniqueList;
    
    var nicInstance = nicEditors.findEditor('test_instructions');
		var template_content=nicInstance.getContent();
		template_content = template_content.replace(/&nbsp;/g, ' ');
		
		$.ajax({
				type: "POST",
				url: base_url+'/ajax_files/saas_corporate_function.php?action=UpdateGeneralSetting', 
				data: "mendatory="+mendatory_fields+"&register="+registration_fields+"&season_id="+season_id+"&instructions="+template_content+"&company_domain_name="+company_domain_name+"&mail_sending="+mail_sending+"&judging_criteria="+judging_criteria+"&custom_text_1="+custom_text_1+"&custom_text_2="+custom_text_2+"&custom_text_3="+custom_text_3,
				success: function(data){
					data = $.trim(data);
					var msg = $.parseJSON(data); 
					$("#submit_button").val( "Done, redirecting..." );
					if(msg.custom_status == 1) {
						$("#submit_button").removeClass( "disabled" );
						$("#submit_button").val("Save");
						$( "<span class='error_msg'> "+msg.custom_text+" </span>" ).insertAfter(".custom_fields");
					}else if(msg.status == 'error') {
						$("#submit_button").removeClass( "disabled" );
						$("#submit_button").val("Save");
						$.each(msg, function (index, value) {
							$("input[name="+index+"]").closest('li').addClass( "has-error" );
							$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("input[name="+index+"]");
						});
					}  else  {
						window.location.href = base_url+'/'+saas_prefix+'/test/'+msg.season_id+'/questions/15021/1';
					} 	
				}
		});
}

function cancelInvite(id,page,season_id,user_id) {
	//$('.save_answer_status_msg').show();
	$('#cancel_invite_'+id).text('Processing...');
   $.ajax({
		url: base_url+'/ajax_files/saas_corporate_function.php?action=cancelInvite&id='+id+'&season_id='+season_id+'&user_id='+user_id, 
		dataType: 'text',  // what to expect back from the PHP script, if anything
		cache: false,
		contentType: false,
		processData: false,
		data: '',                         
		type: 'post',
		success: function(data){
			data = $.trim(data);
			var response_msg = $.parseJSON(data);
			if(response_msg['status']=='success') {	
				 //window.location = base_url+'/recruit/test/'+season_id+'/candidates/invited/'+page+'/15025/1';
					//$('#saas_user_invite_'+id).hide();
					$('#cancel_invite_'+id).hide();
			} else {
				// $('.save_answer_status_msg').hide();
				 $('#cancel_invite_'+id).text('Cancel Invite');
				 $("#invite_error").html('Error in Cancel Invite.').show();
			} 
		}
	});
}

function reInvite(id,page,season_id,user_id) {
	//$('.save_answer_status_msg').show();
	$('#re_invite_'+id).text('Sending...');
  $.ajax({
		url: base_url+'/ajax_files/sendSaasReInviteMail.php', 
		data: { 'season_id' : season_id, 'user_id' : user_id},                           
		type: 'post',
		success: function(data){
		data = $.trim(data);
		var response_msg = $.parseJSON(data);
		if(response_msg['status']=='success') {	
			$('#re_invite_'+id).text('Sent!');
			$('#re_invite_'+id).removeAttr("onclick");
			// window.location = base_url+'/recruit/test/'+season_id+'/candidates/invited/'+page+'/6004/1';	
			//$('#re_invite_'+id).hide();
		} else {
		 // $('.save_answer_status_msg').hide();
		 $('#re_invite_'+id).text('Reinvite');
      $("#invite_error").html('Error in Mail Sent.').show();
		} 
		}
	});
}

function addUserOnTeamForm() {
    var email_details=$('select[name=select_member]').val();
    var res = email_details.split("##");
    var email_values=[];
     $('#team_member .member p').each(function() {
        var pervious_value=$(this).text();
        email_values.push(pervious_value);
     });
    if($.inArray(res[1], email_values)==-1) {
      $('#team_member').append("<div class='member' id='remove_"+res[0]+"'><p>"+res[1]+"</p><a href='javascript:void(0);' onClick='removeUserOnTeamForm("+res[0]+");' class='close-btn'><i class='fa fa-times'></i></a><input type='hidden' name='members_id[]' value='"+res[0]+"'></div>");
    }
  }
  
  function removeUserOnTeamForm(id) {
    $("#remove_"+id).remove();
  }
  
  function removeTeamTest(id,season_id) {
    if(id>0) {
     $('.save_answer_status_msg').show(); 
     $.ajax({
  		url: base_url+'/ajax_files/saas_corporate_function.php?action=deleteShareTeamTest', 
  		data: "id="+id+"&season_id="+season_id,                         
  		type: 'post',
  		success: function(data){
       data = $.trim(data);
			 var response_msg = $.parseJSON(data);
        if(response_msg['status']=='success') {
          $('.save_answer_status_msg').hide(); 
           window.location.href = window.location.href;
    		}
  		}
	   });
    }
  }
  
  function removeUserTest(id,season_id) {
    if(id>0) {
     $('.save_answer_status_msg').show(); 
     $.ajax({
  		url: base_url+'/ajax_files/saas_corporate_function.php?action=deleteShareUserTest', 
  		data: "id="+id,                         
  		type: 'post',
  		success: function(data){
       data = $.trim(data);
			 var response_msg = $.parseJSON(data);
        if(response_msg['status']=='success') {
          $('.save_answer_status_msg').hide(); 
          window.location.href = window.location.href;
    		}
  		}
	   });
    }
  }

  function addTeamUser(season_id) {
    var team_id=$('#add_user_team').val();
    var first_name_values = [];
    var first_name_fields = document.getElementsByName("first_name[]");
    var last_name_values = [];
    var last_name_fields = document.getElementsByName("last_name[]");
    var email_values = [];
    var email_fields = document.getElementsByName("user_email[]");
    for(var i = 0; i < email_fields.length; i++) {
      var email_filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var name_filter = /^[a-zA-Z]+$/;
      if(email_fields[i]!='') {
        if(!email_filter.test(email_fields[i].value)) {
          $("#add_user_error").html("<div class='alert alert-warning' id='alert_warning'>Please enter correct email id</div>").show();
          email_fields[i].focus();
          return false;
        } else {
          email_values.push(email_fields[i].value);
        }
        if(!name_filter.test(first_name_fields[i].value)) {
          $("#add_user_error").html("<div class='alert alert-warning' id='alert_warning'>Please enter valid first name. Only character allow</div>").show();
          first_name_fields[i].focus();
          return false;
        } else {
          first_name_values.push(first_name_fields[i].value);
        }
        if(!name_filter.test(last_name_fields[i].value)) {
          $("#add_user_error").html("<div class='alert alert-warning' id='alert_warning'>Please enter valid last name. Only character allow</div>").show();
          last_name_fields[i].focus();
          return false;
        } else {
          last_name_values.push(last_name_fields[i].value);
        }
      }
    }
    if(email_values.length>0) {
      $('#add_team_user').text( "Processing..." );
		  $('#add_team_user').addClass( "disabled" );
      $.ajax({
    		url: base_url+'/ajax_files/saas_corporate_function.php?action=createTeamUser', 
    		data: "first_name="+first_name_values+"&last_name="+last_name_values+"&email="+email_values+"&team_id="+team_id,                         
    		type: 'post',
    		success: function(data){
         data = $.trim(data);
  			 var response_msg = $.parseJSON(data);
           if(response_msg['existing']=='true') {
            $("#add_user_error").html("<div class='alert alert-success' id='alert_success'>"+response_msg['exist_email']+" email ids already registered with different activities. Please share with different email ids. "+response_msg['valid_email']+". </div>").show();
            setTimeout(function(){window.location.href = window.location.href;}, 8000); 
      		} else if(response_msg['status']=='success') {
            $("#add_user_error").html("<div class='alert alert-success' id='alert_success'>Total email ids registeres "+response_msg['valid_email']+". Duplicate email ids "+response_msg['duplicate_email']+"</div>").show();
            setTimeout(function(){window.location.href = window.location.href;}, 3000); 
      		} else {
            $("#add_user_error").html("<div class='alert alert-warning' id='alert_warning'>"+response_msg['msg']+"</div>").show();
      		} 
    		}
	   });
    }
  }

  function showShareBlock(type) {
    if(type=='user') {
      $('#share_user').show();
      $('#share_team').hide();
      $('#team_share').removeClass('active');
      $('#user_share').addClass('active');
    } else {
      $('#share_team').show();
      $('#share_user').hide();
      $('#user_share').removeClass('active');
      $('#team_share').addClass('active');
    }
  }
  
  function saveTeam(season_id) {
   $("#team_error").hide();
   var team_name=$('#team_name').val();
   var member_values = [];
    var member_fields = document.getElementsByName("members_id[]");
    for(var i = 0; i < member_fields.length; i++) {
      if(member_fields[i]!='') {
        member_values.push(member_fields[i].value);
      }
    }
   if(team_name!='') {
    $.ajax({
  		url: base_url+'/ajax_files/saas_corporate_function.php?action=createTeam', 
  		data: "name="+team_name+"&member_ids="+member_values,                         
  		type: 'post',
  		success: function(data){
       data = $.trim(data);
			 var response_msg = $.parseJSON(data);
        if(response_msg['status']=='success') {
          window.location.href = window.location.href;
    		} else {
          $("#team_error").html(''+response_msg['msg']+'').show();
    		} 
  		}
	 });
  } else {
    $("#team_error").html("Please enter team name.").show();
  }
 }
 
 function addMoreUser() {
   var random_no=$('#addmoreuser .inner').length;
   $('#addmoreuser').append("<div class='inner' id='remove_user_"+random_no+"'><ul class='row'><li class='col-sm-4 col-xs-12'><input type='text' id='first_name' name='first_name[]' class='form-control' placeholder='First name'></li><li class='col-sm-4 col-xs-12'><input type='text' id='last_name' name='last_name[]' class='form-control' placeholder='Last name'></li><li class='col-sm-4 col-xs-12'><input type='text' id='user_email' name='user_email[]' class='form-control' placeholder='Email address'></li></ul><a href='#' onclick='removeMoreUser("+random_no+");'><i class='fa fa-times-circle'></i></a></div>");
 }
 
 function removeMoreUser(id) {
   $('#remove_user_'+id+'').remove();
 }
 
 function showDeleteMemberPopUp(team_id,admin_id,email,team_name) {
  $("#email_replace").text(''+email+'');
  $("#team_name_replace").text(''+team_name+'');
  var team_admin_id=team_id+'-'+admin_id;
  $("#admin_and_team_id").val(''+team_admin_id+'');
  $("#delete_user_from_team").show();
  
}

function showAddMemberTeamPopUp(team_id,team_name) {
  $("#team_user_name").text(''+team_name+'');
  $("#team_user_id").val(''+team_id+'');
  $("#team-add-user").show(); 
}



function showChangeTeamNamePopUp(team_id,team_name) {
  $("#team_id").val(''+team_id+'');
  $("#team_name").val(''+team_name+'');
  $("#change_team_name").show();
  
}


function showDeleteTeamPopUp(team_id,team_name) {
  $("#delete_team_id").val(''+team_id+'');
  $("#delete_team_name").text(''+team_name+'');
  $("#delete_team").show(); 
}

function addMemberInTeam() {
  var member_id=$('#selectMember').val();
  var team_id=$("#team_user_id").val();
  if(team_id>0) {
     $.ajax({
  		url: base_url+'/ajax_files/saas_corporate_function.php?action=addMemberInTeam', 
  		data: "team_id="+team_id+"&member_id="+member_id,                         
  		type: 'post',
  		success: function(data){
       data = $.trim(data);
			 var response_msg = $.parseJSON(data);
        if(response_msg['status']=='success') { 
          window.location = base_url+'/recruit/setting/teams?msg=4';	
    		} else {
          $('#add_member_error').html(''+response_msg['msg']+'');
          $('#add_member_error').show();
        }
  		}
	   });
    }
}

function deleteTeam() {
  var team_id=$("#delete_team_id").val();
  if(team_id>0) {
     $.ajax({
  		url: base_url+'/ajax_files/saas_corporate_function.php?action=deleteTeam', 
  		data: "team_id="+team_id,                         
  		type: 'post',
  		success: function(data){
       data = $.trim(data);
			 var response_msg = $.parseJSON(data);
        if(response_msg['status']=='success') { 
          window.location = base_url+'/recruit/setting/teams?msg=3';	
    		}
  		}
	   });
    }
}

function changeTeamName() {
  $('#team_name_error').hide();
  var team_id=$("#team_id").val();
  var team_name=$("#team_name").val();
  if(team_id >0) {
    if($.trim(team_name)=='') {
     $('#team_name_error').html('Please enter team name.');
     $('#team_name_error_div').addClass('has-error');
     $('#team_name_error').show();
    } else {
     $.ajax({
  		url: base_url+'/ajax_files/saas_corporate_function.php?action=chnageTeamName', 
  		data: "team_id="+team_id+"&team_name="+team_name,                         
  		type: 'post',
  		success: function(data){
       data = $.trim(data);
			 var response_msg = $.parseJSON(data);
        if(response_msg['status']=='success') {
          window.location = base_url+'/recruit/setting/teams?msg=2';	
    		} else {
          $('#team_name_error').html(''+response_msg['msg']+'');
          $('#team_name_error').show();
        }
  		}
	   });
    }
  }
}


function deleteMemberFromTeam() {
  var ids=$("#admin_and_team_id").val();
  var res=ids.split('-');
  var team_id=res[0];
  var user_id=res[1];
  if(team_id>0 && user_id>0) {
     $.ajax({
  		url: base_url+'/ajax_files/saas_corporate_function.php?action=deleteMemberFromTeam', 
  		data: "team_id="+team_id+"&user_id="+user_id,                         
  		type: 'post',
  		success: function(data){
       data = $.trim(data);
			 var response_msg = $.parseJSON(data);
        if(response_msg['status']=='success') {
          $('#delete_user_from_team').hide(); 
          window.location = base_url+'/recruit/setting/teams?msg=1';	
    		}
  		}
	   });
    }
}

function showChangeUserStatusPopUp(user_id,status) {
  if(status=='Y') {
    $("#change_staus_from").text('Active');
    $("#change_staus_to").text('Deactive');
    var changed_status='N';
  } else {
    $("#change_staus_from").text('Deactive');
    $("#change_staus_to").text('Active');
    var changed_status='Y';
  }
  $("#change_user_id").val(''+user_id+'');
  $("#changed_status").val(''+changed_status+'');
  $("#change_user_status").show(); 
}

function changeUserStatus() {
  var user_id=$('#change_user_id').val();
  var status=$("#changed_status").val();
  if(user_id>0) {
     $.ajax({
  		url: base_url+'/ajax_files/saas_corporate_function.php?action=changeUserStatus', 
  		data: "user_id="+user_id+"&status="+status,                         
  		type: 'post',
  		success: function(data){
       data = $.trim(data);
			 var response_msg = $.parseJSON(data);
        if(response_msg['status']=='success') { 
          window.location = base_url+'/recruit/setting/teams?msg=5';	
    		} else {
          $('#change_status_error').html(''+response_msg['msg']+'');
          $('#change_status_error').show();
        }
  		}
	   });
    }
}

function addEditInviteTemplate() {
   $('#alert_warning').hide();
   if($("#default-template").is(':checked')) {
     var check_value='Y';
   } else {
     var check_value='N';
   }
   var template_name=$('#template_name').val();
   var template_id=$('#template_id').val();
   var nicInstance = nicEditors.findEditor('options');
   var template_content=nicInstance.getContent();
   template_content = template_content.replace(/&nbsp;/g, ' ');
   if($.trim(template_name)!='') {
     $.ajax({
  		url: base_url+'/ajax_files/saas_corporate_function.php?action=addEditInviteTemplate', 
  		data: "template_name="+template_name+"&template_content="+template_content+"&template_id="+template_id+"&check_value="+check_value,                         
  		type: 'post',
  		success: function(data){
       data = $.trim(data);
			 var response_msg = $.parseJSON(data);
        if(response_msg['status']=='success') {
          window.location = base_url+'/recruit/setting/advance';	
    		} else {
          $('#alert_warning').show();
          $('#alert_warning').html(''+response_msg['msg']+'');
        }
  		}
	   });
   } else {
     $('#alert_warning').show();
     $('#alert_warning').html('Please enter template name.');
   }
 }
 
 function showMailerContent(id) {
   $.ajax({
		url: base_url+'/ajax_files/saas_corporate_function.php?action=showMailerContent', 
		data: "id="+id,                         
		type: 'post',
		success: function(data){
     data = $.trim(data);
		 var response_msg = $.parseJSON(data);
      if(response_msg['status']=='success') {
        $('#template_name').val(""+response_msg['template_name']+"");
        $('#template_id').val(""+id+"");
        var nicInstance = nicEditors.findEditor('options');
        nicInstance.setContent(''+response_msg['template_content']+'');
        if(response_msg['default_status']=='Y') {
          $("#default-template").prop('checked',true);
        } else {
          $("#default-template").prop('checked',false);
        }
  		} else {
        $('#alert_warning').show();
        $('#alert_warning').html(''+response_msg['msg']+'');
      }
		}
   });
 }
 
 function deleteTemplate(id) {
   $.ajax({
		url: base_url+'/ajax_files/saas_corporate_function.php?action=deleteMailerTemplate', 
		data: "id="+id,                         
		type: 'post',
		success: function(data){
     data = $.trim(data);
		 var response_msg = $.parseJSON(data);
      if(response_msg['status']=='success') {
        window.location = base_url+'/recruit/setting/advance?msg=1';
  		} else {
        $('#alert_delete').html(''+response_msg['msg']+'').show();
      }
		}
   });
 }
 
 function showPreview(id) {
	var season_url = $('#season_url').val();
   $.ajax({
		url: base_url+'/ajax_files/saas_corporate_function.php?action=showPreview', 
		data: "id="+id+"&season_url="+season_url,                         
		type: 'post',
		success: function(data){
		data = $.trim(data);
		 var response_msg = $.parseJSON(data);
			if(response_msg['status']=='success') {
			$('#preview_mailer').html(''+response_msg['msg']+''); 
			} else {
			$('#alert_delete').show();
			$('#alert_delete').html(''+response_msg['msg']+'');
			}
		}
   });
 }
 
 function setDefaultTemplate(id) {
   if(id>0) {
     $.ajax({
  		url: base_url+'/ajax_files/saas_corporate_function.php?action=setDefaultTemplate', 
  		data: "id="+id,                         
  		type: 'post',
  		success: function(data){
       data = $.trim(data);
  		 var response_msg = $.parseJSON(data);
        if(response_msg['status']=='success') {
          $('#set_default_success').html(''+response_msg['msg']+'').show();
          setTimeout(function(){window.location = base_url+'/recruit/setting/advance';}, 2000);  
    		} else {
          $('#set_default_warning').html(''+response_msg['msg']+'').show();
        }
  		}
     });
   }
 }
 
  $("#default-template").click(function(){
    if($("#default-template").is(':checked')) {
      this.setAttribute('checked','checked');
    } else {
      this.setAttribute('checked','');
    }
	});
 
 function openAddTemplatePopUp() {
   $('#template_name').val("");
   $('#template_id').val("");
   var nicInstance = nicEditors.findEditor('options');
   nicInstance.setContent('');
   $("#default-template").prop('checked',false);
 }
 
 function showCreateTemplatePopUp() {
   $('#alert_warning').hide();
   $('#alert_success').hide();
   $('#template_name').val("");
   //var nicInstance = nicEditors.findEditor('options');
   //nicInstance.setContent('');
   $("#default-template").prop('checked',false);
 }
 
  function addInviteTemplate() {
     if($("#default-template").is(':checked')) {
       var check_value='Y';
     } else {
       var check_value='N';
     }
     var template_name=$('#template_name').val();
     var template_id=0;
     var nicInstance = nicEditors.findEditor('options');
     var template_content=nicInstance.getContent();
     template_content = template_content.replace(/&nbsp;/g, ' ');
     if($.trim(template_name)!='') {
       $.ajax({
    		url: base_url+'/ajax_files/saas_corporate_function.php?action=addEditInviteTemplate', 
    		data: "template_name="+template_name+"&template_content="+template_content+"&template_id="+template_id+"&check_value="+check_value,                         
    		type: 'post',
    		success: function(data){
         data = $.trim(data);
  			 var response_msg = $.parseJSON(data);
          if(response_msg['status']=='success') {
            $('#alert_success').html('Template saved successfully.').show();
            setTimeout(function(){$('#create-template').modal('hide');}, 1000);	
      		} else {
            $('#alert_warning').html(''+response_msg['msg']+'').show();
          }
    		}
  	   });
     } else {
       $('#alert_warning').show();
       $('#alert_warning').html('Please enter template name.');
     }
   }
  
  function loadSelectedTemplate(id) {
    $.ajax({
		url: base_url+'/ajax_files/saas_corporate_function.php?action=showMailerContent', 
		data: "id="+id,                         
		type: 'post',
		success: function(data){
     data = $.trim(data);
		 var response_msg = $.parseJSON(data);
      if(response_msg['status']=='success') {
        var nicInstance = nicEditors.findEditor('options');
        nicInstance.setContent(''+response_msg['template_content']+'');
        $('#use-template').modal('hide');
  		} else {
        
      }
		}
   });
  }
 
  function markStarTest(status,id) {
   if(id>0) {
     $.ajax({
  		url: base_url+'/ajax_files/saas_corporate_function.php?action=markStarSeason', 
  		data: "status="+status+"&season_id="+id,                         
  		type: 'post',
  		success: function(data){
       data = $.trim(data);
			 var response_msg = $.parseJSON(data);
        if(response_msg['status']=='success') {
          //$('#alert_success').html('').show();
          //setTimeout(function(){$('#create-template').modal('hide');}, 1000);	
    		} else {
          //$('#alert_warning').html(''+response_msg['msg']+'').show();
        }
  		}
	   });
   }
 }
  
function lockedcontest() {
 //$(".content-area").addClass('locked-screen');
 $("#locked-message").modal('show');
}


function excedLimitPopup(msg) {
 //$(".content-area").addClass('locked-screen');
 $("#exced_limit_popup").modal('show');
}

function lockedcontest_question() {
$("#locked-question-message").modal('show');
}

function showMoreFilters() {
   if($('#advanced_more_filter').css('display')=='none') {
	 var today = new Date();
	 var expiry = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000);
	 SetCookie('advanced_more_filter', 'yes', expiry);
     $('#advanced_more_filter').show();
     $('#filter_content').html('- Hide More Filters');
   } else {
	 DeleteCookie('advanced_more_filter');
	 $(".filter-form").find('input:text, input:password, select, textarea').val('');
     $('#advanced_more_filter').hide();
     $('#filter_content').html('+ Show More Filters');
   }
 }

function GetCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
  }

function DeleteCookie (name,path,domain) {
  if (GetCookie(name)) {
    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
  }

function SetCookie (name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}


function updateUserCode() {

	try {
		
		var code  = editor.getValue();

		if(!code) {
			return false;
		}
		var save_for_language = $( "#defaultlanguage" ).val();
		var attempt_encrypt_token = $('#encrypt_token').val();
		var contest_current_link = $('#contest_current_link').val();
		var interview_contest = $('#interview_contest').val();
		
		var url = base_url+'/ajax_files/saas_corporate_function.php?action=save_user_code';
		$.post(url,{'encrypt_token':attempt_encrypt_token,'code':code,'save_for_language':save_for_language,'contest_current_link':contest_current_link, interview_contest:interview_contest},function(data) {
			if(data.length > 0) {

			}
		});
		
		}catch(e){
			//alert(e.description);
		}

}


function updateEvaluation() {

	try { 
                var attempt_encrypt_token = $('#encrypt_token').val();
		var url = base_url+'/ajax_files/saas_candidate_function.php?action=update_user_time_eval';
		$.post(url,{'encrypt_token':attempt_encrypt_token},function(data) {
		});
		
		}catch(e){
			//alert(e.description);
		}

}



function updateResumeEvaluation() {

	try { 
                var attempt_encrypt_token = $('#encrypt_token').val();
		var url = base_url+'/ajax_files/saas_candidate_function.php?action=resume_user_time_eval';
		$.post(url,{'encrypt_token':attempt_encrypt_token},function(data) {
		});
		
		}catch(e){
			//alert(e.description);
		}

}


function updateUserCurrentUrl() {

	try {
		
		var contest_current_link = $('#contest_current_link').val();

		if(!contest_current_link) {
			return false;
		}
		var contest_invitation_token = $('#contest_invitation_token').val();
		
		var url = base_url+'/ajax_files/saas_corporate_function.php?action=save_user_current_url';
		$.post(url,{'encrypt_token':contest_invitation_token,'contest_current_link':contest_current_link},function(data) {
			if(data.length > 0) {

			}
		});
		
		}catch(e){
			//alert(e.description);
		}

}

//share candidate url  for interviews
function shareCandidateUrl(shareurl) {
	
	$('#share-interview_url #share_url').val(shareurl);
	$('#share-interview_url').modal('show');
}

function user_redirect_contest_url() { 
	 
	 var candidate_redirect_url = $('#contest_candidate_url').val();
	 if(typeof candidate_redirect_url === 'undefined') {
			return false;
	 }
	  if(candidate_redirect_url) {
		SetDivPosition();
		window.location = candidate_redirect_url;
	  }
}

function SetDivPosition(){ 
	var intY = $(".inner-main").scrollTop();
	//alert(intY);
	localStorage.setItem('interviewScroll', intY);
} 
	
	function user_refresh_live_image() { 
				action_url = base_url+'/ajax_files/saas_candidate_function.php?action=RefreshLiveImage';
				var live_image = $('#contest_candidate_live_image').val();
				$.ajax({
							type: "POST",
							url: action_url, 
							data: {live_image:live_image},
							async: false,
							success: function(data){
								data = $.trim(data);
								var msg = $.parseJSON(data); 
								if(msg.status = 'success') {
									d = new Date();
									$(".interview_user_image img").attr("src", msg.image+"?"+d.getTime());
									//$('.interview_user_image').html('<img src="'+msg.image+'">');
								}

							}
				});
	}
	
	function customModalShow (title, msg) {
		$('#check-custom-alert .modal-title').html(title);
		$('#check-custom-alert .modal-body p').html(msg);
		$('#check-custom-alert').modal('show');	
	}
	
	function customURLModalShow (title, url, size) {
		$('#check-custom-alert .modal-title').html(title);
		$('#check-custom-alert .modal-body').removeClass('text-center');
		$('#check-custom-alert .modal-dialog').addClass('modal-lg');
		$('#check-custom-alert .modal-body').load(base_url+'/ajax_files/saas_library_question_category.php', function(e){
			$('#check-custom-alert').modal('show');	
		});	
	}

	
	function season_url_check(){
	
			var season_url = $('#season_url').val();
			var platform_type = $('#platform_type').val();
			var assessment_url = $('#assessment_url').val();
			$('#bind_season_url').text(season_url);
			if (season_url == '' || season_url.length < 4){
				$('#season_url').parent().addClass('has-error');
				$('.requirement_url .fa-check').hide();
				$('#save_requirement_url').hide();
				$('.codehireshareurl').hide();
			} else {
			
			if(platform_type == 'codejudge') {
			var assessment_test_url = base_url+'/tests/'+season_url+'/challenge';
			} else {
			var assessment_test_url = base_url+'/'+assessment_url+'/'+season_url;
			}
			
			
			$.ajax({
			   type: 'POST',
			   url: base_url+'/ajax_files/saas_corporate_function.php?action=checkSeasonUrl',
			   data: 'season_url='+ season_url,
			   cache: false,
				   success: function(response){
				    var msg = $.parseJSON(response); 
					if(msg.status == 'success') {
					$('#season_url').parent().addClass('has-error');	
					$('.requirement_url .fa-check').hide();
					$('.requirement_url .fa-times').fadeIn();
					$('.codehireshareurl').hide();
					$('#save_requirement_url').hide();
					} else { 
					$('#season_url').parent().removeClass('has-error');
					$('.requirement_url .fa-times').hide();
					$('.requirement_url .fa-check').fadeIn();
					$('#save_requirement_url').show();
					$('.codehireshareurl').show();
					$('.codehireshareurl a').text(assessment_test_url);
					$('.codehireshareurl a').attr('href', assessment_test_url);
						
					}
				}
			});
		}
	}
	
	function season_home_url_check(){
	
			var season_url = $('#home_page_season_url').val();
			//$('#bind_season_url').text(season_url);
			if (season_url == '' || season_url.length < 4){
				$('#home_page_season_url').parent().addClass('has-error');
				$('.home_requirement_url .fa-check').hide();
			} else {

			$.ajax({
			   type: 'POST',
			   url: base_url+'/ajax_files/saas_corporate_function.php?action=checkSeasonHomeUrl',
			   data: 'home_season_url='+ season_url,
			   cache: false,
				   success: function(response){
				    var msg = $.parseJSON(response); 
					if(msg.status == 'success') {
					$('#home_page_season_url').parent().addClass('has-error');	
					$('.home_requirement_url .fa-check').hide();
					$('.home_requirement_url .fa-times').fadeIn();
					} else {
					$('#home_page_season_url').parent().removeClass('has-error');
					$('.home_requirement_url .fa-times').hide();
					$('.home_requirement_url .fa-check').fadeIn();
						
					}
				}
			});
		}
}
	
	function updateUserSubjectiveCode() {

		try {
		
        var nicInstance = nicEditors.findEditor('text_content');
        var template_content=nicInstance.getContent(); 
        var subjective_text = template_content.replace(/&nbsp;/g, ' ');

		if(!subjective_text) {
			return false;
		}

		var attempt_encrypt_token = $('#next_encrypt_token').val();
		
		var url = base_url+'/ajax_files/saas_candidate_function.php?action=save_subjective_code';
		
		$.post(url,{'encrypt_token':attempt_encrypt_token, 'code':subjective_text}, function(response) {
			var msg = $.parseJSON(response); 
				if(msg.status == 'success') {
					//saved
				}
		});
		
		}	catch(e){
			//alert(e.description);
		}

	}
	


function changeClientStatus(status,admin_id){
		$.ajax({
		   type: 'POST',
		   url: base_url+'/ajax_files/saas_corporate_function.php?action=changeClientStatus',
		   data: {status:status,admin_id:admin_id},
		   cache: false,
			  success: function(response){
			  var msg = $.parseJSON(response); 
				if(msg.status == 'success') {
				  $('#client_'+msg.admin_id).html(msg.new_status_msg);
				} else { 
				  
				}
			}
		});
 }
 
 function unlockTotalUser(season_id,admin_id,platform_type) {	
	var action_url = base_url+'/ajax_files/saas_corporate_function.php?action=ShortListedTotalUser';		
	$.ajax({
		type: "POST",
		url: action_url, 
		data: {season_id:season_id,admin_id:admin_id,platform_type:platform_type},
		async: false,
		success: function(data) {
			data = $.trim(data);
			var msg = $.parseJSON(data);
			var status = msg.status;
			var cnt = msg.cnt;
			
			if(status == 'no_permission') {
				//$('#short-listed-info .modal-body').html('<p> '+cnt+' users short-listed, Your account limit exceed to unlock more users.  </p>');
        window.location= msg.redirect_link;
			}
			
			if(status == 'success') {
       window.location= msg.redirect_link;
				//
			} 
		}
	});
}

function changeClientPassword(admin_id) {
  $( "#change_client_password .error_msg").remove();
  $( "#change_client_password .alert-success").remove();
  $("#change_client_password").find('.has-error').removeClass( "has-error" );
  $('#error_msg').html('');
  $("#client_password").val('');
  $("#admin_id").val(admin_id);
  $("#change_client_password").modal('show');
}
	
		function editor_copy_paste_disable () {
	
		//disable command windows and mac
		editor.commands.addCommand({
			name: 'PasteCommand',
			bindKey: {win: 'Ctrl-V',  mac: 'Command-V'},
			exec: function(editor) {
				var key_ctrl_disable = 'Key combination CTRL + V has been disabled.';
				$('#disable_ctrl_key_combination .modal-body p').html(key_ctrl_disable);
				$('#disable_ctrl_key_combination').modal('show');
			},
			readOnly: false // false if this command should not apply in readOnly mode
		});
		
		editor.commands.addCommand({
			name: 'CopyCommand',
			bindKey: {win: 'Ctrl-C',  mac: 'Command-C'},
			exec: function(editor) {
				var key_ctrl_disable = 'Key combination CTRL + C has been disabled.';
				$('#disable_ctrl_key_combination .modal-body p').html(key_ctrl_disable);
				$('#disable_ctrl_key_combination').modal('show');
			},
			readOnly: false // false if this command should not apply in readOnly mode
		});
	
	}

$(document).on('click', '#submitDataFiles', function () {
	$("#confirmdatascienceclose").modal('show');  
  });
 
 $(document).on('click', '#submitLogDataFiles', function () {
	   var encrypt_token = $("#question_token").val();
	   var platform_type = $("#platform_type").val();
	   var selectedAns = '';	
	   $('input[name="answer_option[]"]').each(function() { 
			var aValue = $(this).val(); 
			if(aValue != '') {
				if(selectedAns == "") {
					selectedAns = aValue;
				} else {
					selectedAns = selectedAns + ',' + aValue;
				}
			}
					
	   });
	  
	   var formData = new FormData();
            formData.append('answer_option', selectedAns);
            formData.append('encrypt_token', encrypt_token);
            formData.append('platform_type', platform_type);
            $.ajax({
                url: base_url + '/ajax_files/saas_candidate_function.php?action=saveCandidateRunDataScienceData',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                success: function (response) {
                    var data = $.parseJSON(response);

                    var html = '';
                    if (data.status == 'success') {
                       $("#confirmdatascienceclose").modal('show'); 
                    } else {
                        html += "<div class='alert alert-danger'>" + data.error + "</div>";
                    }
                    $('#submission-status').html(html);
                    $('#submission-status').show();
                    $('.progress-loading').hide();
                }
            });
			
});
	

function compile_test(action, contest_id, encrypt_token, testcase_type, platform_type, want_to_confirm) {
	 
	 if(typeof want_to_confirm === 'undefined') {
			 want_to_confirm = 'Y';
	 }
	 
	var language = $( "#modeSelect" ).val();
	var write_code = $( "#code_execute" ).val();
	if(language == '' || language == 'html') {
		alert('Please select language first.');
		return false;
	}
	
	if(write_code == '' && want_to_confirm == 'Y') {
		$('#attempt-problem-first').modal('show');
		return false;
	}
	
	
	var auto_submit_code = $( "#auto_submit_code" ).val();
	
	if(action == 'submit' ) {
		var auto_submit_code = 'N'; //new add
		var want_to_confirm = 'N'; //new add
	}
	
	if(auto_submit_code == 'Y') {
		want_to_confirm = 'N';
	}
	if(action == 'submit'){
        updateUserCode();
	}
	
	if(action == 'submit' && want_to_confirm == 'Y') {
		bootbox.confirm({ 
				//size: 'small',
				title: "Are you sure you want to submit your code?",
				message: "<p class='alert alert-warning'> Warning : Modification in the code will not be possible after it has been submitted.  </p>", 
				callback: function(result){if(result) {		
					compile_test_execution(action,contest_id,encrypt_token,testcase_type,platform_type,language);	
				} else {
				
				//
				}}
			});		
	} 
	 $('.compile-button-click-attr').attr('disabled','disabled');
	if(action == 'submit' && want_to_confirm == 'N') {
           
            compile_test_execution(action,contest_id,encrypt_token,testcase_type,platform_type,language);		
	}
	
	if(action == 'compile' && want_to_confirm == 'Y') {
               
		compile_test_execution(action,contest_id,encrypt_token,testcase_type,platform_type,language);
	}
	if(action == 'run') {
		compile_test_execution(action,contest_id,encrypt_token,testcase_type,platform_type,language);
	}
	
	
}

function updateTotalScore() {
   var total_marks=0;
   $("input[name='review_marks[]']").each(function(){
    if($(this).val()!='') { 
     total_marks = total_marks+parseInt($(this).val());
    }
  });
  $('#score').val(total_marks);
 }
 
$(document).on("click",".add-more-level", function(){
    $("#review_parameter").append("<ul class='row' style='margin:0 -15px;'><li class='col-sm-2 col-xs-12'><input type='text' value='' class='form-control' id='review_criteria' name='review_criteria[]' placeholder=''></li><li class='col-sm-2 col-xs-6'><input type='text' value='' class='form-control' id='marks' name='review_marks[]' placeholder='' onBlur='updateTotalScore();'></li><input type='hidden' name='review_id[]' value=''></ul>");
 });


function compile_test_execution(action,contest_id,encrypt_token,testcase_type,platform_type,language) {
					var form_post = $('#form_post').val();
                                        
					var season_id = $('#season_id_data').val();
                                        if(typeof season_id === 'undefined') { season_id = ''; }
					//if confirm submission
					try{
						$('#code_result_heading').hide();
						if(action == 'compile') {
							if(testcase_type == 'tg_testcase') {
								$('#compile_code_text').show();
								$('#compile_code .btn').addClass('disabled');
							} else {
								$('#user_compile_code_text').show();
								$('#user_compile_code').hide();
							}
							$('#is_compile').val(1);	
						}else if(action == 'submit') {
							$('#submit_code_text').show();
							$('#submit_code .btn').val("Submitting...");
							$('#is_compile').val(0);
						}
						
                                            
						$('#code_result_heading').hide();
						$('#code_result').hide();
						$('#testcase_status_heading').hide();
						$('#testcase_status').hide();
						$('#code_result').removeClass('success-msg');
						//$('#code_result').addClass('error-msg');
						var isBotChallenge = $("#bot_challenge").val();
                                                if(typeof isBotChallenge === 'undefined') { isBotChallenge = ''; }
                                                
						var candidate_encrypt_token = $("#candidate_encrypt_token_bot").val();
                                                if(typeof candidate_encrypt_token === 'undefined') { candidate_encrypt_token = ''; }
                                               
						//$('#code_result').html('');
						var code = editor.getValue();
                                                if(code == 'undefined' || $.trim(code) == ''){
                                                    code = defaultCode;
                                                }
                                                
						var own_testcase_input = $('#own_testcase_input').val();
						var url = base_url+"/ajax_files/codeJudgeCompileTest.php";  
                                                
                                                 $('#code_result_heading').show();
                                                 $('.user-action-tabs').show();
                                                 $('.user-action-tabs .nav-tabs > li a[href="#console-content"]').tab('show');
                                                 $('#console-content').addClass('active');
                                                 $('.user-action-tabs .nav-tabs > li a[href="#console-content"]').trigger('click');
						$.post(url,{'code':code,'action':action,'contest_id':contest_id, 'language':language, 'encrypt_token':encrypt_token, 'testcase_type':testcase_type,'own_testcase_input':own_testcase_input,'platform_type':platform_type,'isBotChallenge':isBotChallenge,'candidate_encrypt_token':candidate_encrypt_token},function(data){
							//alert(data);
							
                                                        $('.compile-button-click-attr').removeAttr("disabled");
                                                    
                                                            
                                                            setTimeout(function(){ 
                                                                    var href1= "#editor-main-footer";
                                                                    var target=$(href1).parents(".mCustomScrollbar"); 
                                                                    target.mCustomScrollbar("scrollTo",href1);
                                                                    $('html, body').animate({scrollTop: $("#editor-main-footer").offset().top - 80}, 1000);
                                                                    $('.user-action-tabs').show();
                                                                     $('.user-action-tabs .nav-tabs > li a[href="#console-content"]').tab('show');
                                                            }, 800);
                                                        
							if($.trim(data) == '') {
								$('#code_result').html('Some Error occured').show();
								if(action == 'compile') {
									if(testcase_type == 'tg_testcase') {
										$('#compile_code .btn').removeClass('disabled');
										$('#compile_code_text').hide();
									} else {
										$('#user_compile_code').show();
										$('#user_compile_code_text').hide();
									}
								} else if(action == 'submit') {	
									if($('#webcam_container').length){
										$.scriptcam.closeCamera();
									 }
									$('#code_result').removeClass('error-msg');
									$('#code_result').addClass('success-msg');
									$('#code_result').html('Code Submitted successfully.').show();
									if(form_post == 1) {
											$('#codejudge_requirement').submit();
										} else {
											$('#submit_code_text').hide();
									}
								}
							} else {			
								var new_data = $.trim(data);
								var res = new_data.split('*||*');
                                                                    
									if(res[1] == 'failure') {						
									if(action == 'compile') {
										$('#code_result').html('Some technical error has occured. Please try again after some time. ').show();
										if(testcase_type == 'tg_testcase') {
											$('#compile_code .btn').removeClass('disabled');
											$('#compile_code_text').hide();
										} else {
											$('#user_compile_code').show();
											$('#user_compile_code_text').hide();
										}
									} else if(action == 'submit') {	
										if($('#webcam_container').length){
										  $.scriptcam.closeCamera();
										}
										$('#code_result').removeClass('error-msg');
										$('#code_result').addClass('success-msg');
										$('#code_result').html('Code Submitted successfully.').show();
											//$('#submit_code').show();
										if(form_post == 1) {
											$('#codejudge_requirement').submit();
										} else {
											$('#submit_code_text').hide();
										}
									}
								} else if(res[1] == 'timeout') {
									$('#code_result').html('Contest Timeout.').show();
									$('#codejudge_requirement').submit();
								} else {
									if(action == 'compile') {
										$('#testcase_status_heading i').hide();
                                                                                $('.user-action-tabs .nav-tabs > li a[href="#console-content"]').tab('show');
										if(typeof res[2] != "undefined") {
										$('#code_result').html(res[1]+'').show();
										$('#code_result').removeClass('success-msg');
										//$('#code_result').addClass('error-msg')									
										} 
										
										if(res[1] == "") {
											 if (res[2].indexOf('|') >= 0) { 
												var dataPrint = $(res[2]).find("td").eq(4).html();
												if (typeof dataPrint != 'undefined') {
													var resPrint = dataPrint.split('|');
												} else { //handle own test-case type
												dataPrint = '';
												var resPrint = dataPrint.split('|');;
												}
												//$('#code_result').html('Code Compiled successfully.').show();
												$('#code_result').html('<span style="color:#707070; font-family:monospace,serif;display:block;margin-bottom:1px;">'+resPrint[0]+'</span>'+' --Code Compiled successfully--').show();
											} else {
												$('#code_result').html('<span class="compile-success-msg" style="color:#c0c0c0">--Code Compiled successfully--</span>').show();
											}
										$('#code_result').removeClass('error-msg');
										//$('#code_result').addClass('success-msg'); // commented by amit verma to remove the class
										}
										
										//if(str.search$(res[2]+":contains('')")) {
										if(res[2].indexOf("Time Limit Exceeded") > -1) {
										$('#code_result_heading').hide();
										$('#code_result').hide();
										}
										if($(res[2]).find("td").eq(2).find('span').text() == 'True') {
											$('#default_testcase_status span').text('Testcase Passed');
											$('#testcase_status_heading i:eq(0)').show();
											$('#testcase_status ul li .failed-icon').hide();
											$('#testcase_status ul li .pass-icon').show();
										} else {
											$('#default_testcase_status span').text('Failed');
											$('#testcase_status_heading i:eq(1)').show();
											$('#testcase_status ul li .failed-icon').show();
											$('#testcase_status ul li .pass-icon').hide();
										}
										
										$('#testcase_status_heading').show();
										$('#testcase_status').html(res[2]+'').show();
										if(testcase_type == 'tg_testcase') {
											$('#compile_code .btn').removeClass('disabled');
											$('#compile_code_text').hide();
											$('#default_testcase_status').show();
										} else {
											$('#testcase_status_heading i').hide();
											$('#user_compile_code').show();
											$('#user_compile_code_text').hide();
											//$('#testcase_status_heading i:eq(0)').show();
											$('#default_testcase_status').hide();
										}
										
									var UserCompileoutputLog = $('#user_compile_log_output').html();
									$( "#code_result span" ).before( UserCompileoutputLog );
                                                                        $('.user-action-tabs .nav-tabs > li a[href="#console-content"]').tab('show');
									
										//hide status 
										if(res[1] != "") {
											$('#testcase_status_heading').hide();
										}
										
										
									} else if(action == 'submit') {		
									   if($('#webcam_container').length){
										  $.scriptcam.closeCamera();
									   }
										$('#code_result').removeClass('error-msg');
										$('#code_result').addClass('success-msg');
										$('#code_result').html('Code Submitted successfully.').show();
										
										if(form_post == 1) {
											$('#codejudge_requirement').submit();
										} else if(form_post ==2) {
											
                                                                                    
                                                                        
                                                                                    
										}else{
                                                                                    
                                                                                    $('#submit_code_text').hide();
                                                                                        var test_action_url = $('#test_action_url').val();
                                                                                        var action_url = test_action_url + '/' + encrypt_token;
                                                                                        window.location.href = action_url;
                                                                                    
                                                                                }

									}else if(action == 'run'){
                                                                            $('#testcase_status').html(res[2]+'').show();
									}
								}
							}

						});
						
					}catch(e){
						alert(e.description);
					}

}
	
	//screen capture function
	
	function screen_capture() {
		 scrollPos = document.body.scrollTop;
		 var question_category = $('#question_category_name').val();
		 var capture_class = '';
		 if(question_category == 'coding') {
			var capture_class = '#editor';
		 } else {
			var capture_class = '.inner-main';
		 }
		 $(capture_class).html2canvas({
			onrendered: function (canvas) {
				window.scrollTo(0,scrollPos); 
				var cap_img_val = canvas.toDataURL("image/png");
				var test_id = $("#test_id").val();
				var test_attempt_id = $("#test_attempt_id").val();
					$.ajax({
						type: "POST",
						url: base_url+'/ajax_files/saas_candidate_function.php?action=capture_screen', 
						data: 'img_val='+encodeURIComponent(cap_img_val)+'&test_id='+test_id+'&test_attempt_id='+test_attempt_id,
						success: function(data){
							/*data = $.trim(data);
							var msg = $.parseJSON(data); 
							if(msg.status == 'save') {
									//alert('saved');
							} */
						}
					});
			}
		});
	}
	
		function bootbox_alert() {
			var warning_count_away = $('#warning_count').val();
			$("#body_user_disabled").show();
			$("body").css('overflow-y', 'hidden');
			bootbox.alert({ 
				//size: 'small',
				title: warning_count_away+" Warning!",
				backdrop: true,
				message: "<p> You've been idle from the test window. This action will be reported to the company.  </p><p class='alert alert-warning'> <i class='fa fa-exclamation-triangle fa-2x' style='vertical-align:middle; margin-right:5px;'></i>  Do not repeat this behaviour more than 5 times else your test will be auto-submitted immediately.</p>", 
				callback: function(){				
					$("#body_user_disabled").hide(); 
					$("body").css('overflow-y', 'visible');
				},
				className: "enable_alert_naviagtion"
			});	
		}
		
		function bootbox_alert_msg(msg) {
			bootbox.alert({ 
				//size: 'small',
				title: "Warning",
				backdrop: true,
				message: "<p class='alert alert-warning'> "+msg+" </p>", 
				callback: function(){				

				}
			});	
		}
		
		function bootbox_alert_submit() {
			var warning_count_away = $('#warning_count').val();
			$("#body_user_disabled").show();
			$("body").css('overflow-y', 'hidden');
			bootbox.alert({ 
				//size: 'small',
				title: warning_count_away+" Warning!",
				message: " <p>  You have exceeded the permissible limit idle from the test window. Your test has finished. You can close the window now.</p>", 
				backdrop: true,
				callback: function(){				
					$("#auto_submit_code").val('Y'); 
					$("#form_post").val(1); 
					$("#body_user_disabled").hide(); 
					$("body").css('overflow-y', 'visible');
					$('#submit_code input').trigger('click');
					$('#codejudge_requirement').submit();
				},
				className: "enable_alert_naviagtion"
			});	
		} 
	
	//Get Browser Specifc Prefix
	function getBrowserPrefix() {
	  
	  // Check for the unprefixed property.
	  if ('hidden' in document) {
		return null;
	  }

	  // All the possible prefixes.
	  var browserPrefixes = ['moz', 'ms', 'o', 'webkit'];

	  for (var i = 0; i < browserPrefixes.length; i++) {
		var prefix = browserPrefixes[i] + 'Hidden';
		if (prefix in document) {
		  return browserPrefixes[i];
		}
	  }

	  // The API is not supported in browser.
	  return null;
	}

	// Get Browser Specific Hidden Property
	function hiddenProperty(prefix) {
	  if (prefix) {
		return prefix + 'Hidden';
	  } else {
		return 'hidden';
	  }
	}

	// Get Browser Specific Visibility State
	function visibilityState(prefix) {
	  if (prefix) {
		return prefix + 'VisibilityState';
	  } else {
		return 'visibilityState';
	  }
	}

	// Get Browser Specific Event
	function visibilityEvent(prefix) {
	  if (prefix) {
		return prefix + 'visibilitychange';
	  } else {
		return 'visibilitychange';
	  }
	}
	
	function checkUserParticipation(previous_season_id, parent_season_id, season_id) {
		$("div[id^='contestMsg_']").html(''); 
		var action_file_url = base_url+'/ajax_files/assessment_check_participation.php?previous_season_id='+previous_season_id+'&parent_season_id='+parent_season_id+'&season_id='+season_id+'&event_name='+event_url;
		$.get(action_file_url, function(data) {
					data = $.trim(data);
					var msg = $.parseJSON(data);
					if(msg.status == 'success') {
						window.location.href = msg.url;
					} else {
						$('.msgErrortop .message-box').addClass('info-msg').find('p').html(msg.message); 
						Tg_CommonFunction.clearMessage();
                        }
		});
		
	}
	
	
	function send_congrts_email(obj, user_id, _name, contest, event_name, event_rule_name){ 
		if(user_id){
			//var user_message = $.trim($('#user_custom_mail_message').val());
			_sending_mail_congrts(_name, user_id, obj, contest, event_name, event_rule_name);
			//_remove_custom_poplayer2('#_l2_id_'+ele_id+',#l2_overlay_bx_'+ele_id);
			
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
					$('#congrt-'+contest+'-'+obj).html('<span class="btn btn-danger">Already Sent!</span>');
				} else if(status==3) {
					$('#congrt-'+contest+'-'+obj).html('<span class="btn btn-danger">Limit exceeded!</span>');
				} else {
					$('#congrt-'+contest+'-'+obj).html('<span class="btn btn-success">Message Sent!</span>');
				}
				//console.log('data => '+data);
			}); 
		}
	}
	
	
	function SaascheckUserParticipation(previous_season_id, parent_season_id, season_id) {
		$("div[id^='contestMsg_']").html('');
		var season_url = $("#season_url").val();
		$('.msgErrortop').hide();
		var action_file_url = base_url+'/ajax_files/saas_candidate_function.php?action=checkParticipation&previous_season_id='+previous_season_id+'&parent_season_id='+parent_season_id+'&season_id='+season_id+'&season_url='+season_url;
		$.get(action_file_url, function(data) {
					data = $.trim(data);
					var msg = $.parseJSON(data); 
					
					if(msg.status == 'success') {
								window.location.href =	msg.message;
					} else {
								$('#contestMsg_'+msg.parent_season_id).html('<div class="info-msg"><i class="fa fa-warning"></i>'+msg.message+'<a href="javascript:void(0)" class="close"><i class="fa fa-close"></i></a></div>').slideDown( "slow" );
					}
		});
	}
	
	//Function is used to show left charaters with comparing to max allowed length....Sushil 30-Sep-2013
	function countCharacters(sourceTextBox, displayControl, maxlength) {
		if(sourceTextBox != '' && displayControl != '') {
			var sourceText = $('#'+sourceTextBox).val();
			if(sourceText != '') {
				var len = sourceText.length;
				if (len<=maxlength) {
					$("#"+displayControl).text(maxlength-len+" characters left");
				} else {            
					$('#'+sourceTextBox).val(sourceText.substring(0, maxlength));
					return false;
				}
			}
		}
	}
	
	
	
	//end send sms and email

	$(document).on("keyup","#sms_message", function(){ 

		var sourceTextBox = 'sms_message';
		var displayControl = 'spanCounter';
		var maxlength = '135';
		
		
		if(sourceTextBox != '' && displayControl != '') {
				var sourceText = $('#'+sourceTextBox).val();

				if(sourceText != '') {
					var len = sourceText.length;
					
					if (len<=maxlength) {
						$("#"+displayControl).text(maxlength-len+" characters left");
					} else {            
						$('#'+sourceTextBox).val(sourceText.substring(0, maxlength));
						return false;
					}
					
				}
		}
	}); 
	
	
	function  open_url_iframe_modal(title, url, height, width) {
		$('#saas_promotion_schedule_mailer .modal-dialog').removeClass('modal-lg');
		if(typeof url === 'undefined' || url == '') {
			return false;
		}		
		if(typeof title === 'undefined') {			
			title = '';
		}
		if(typeof height === 'undefined') {			
			height = '100%';
		}
		if(typeof width === 'undefined') {			
			width = '100%';
		}

		if(title == '') {
			$('#saas_promotion_schedule_mailer .modal-header').hide(); //hiding title header
		} else {
			$('#saas_promotion_schedule_mailer .modal-title').html(title);
		}
		
		$("#saas_promotion_schedule_mailer .modal-body").html('<iframe width="'+width+'" height="'+height+'" frameborder="0" scrolling="yes" allowtransparency="true" src="'+url+'"></iframe>');

		$('#saas_promotion_schedule_mailer').modal('show');
		return false;
	}
	
	
	
	function checkIfCheckAllSelectedNSaveInSession(obj, promotionType) {

		
		var selectedUserList = '';
		var selectedUserListArray =  new Array();
		
		//show send mail or message link if any check-box checked
		if ( $('input[name="chk_list"]').is(':checked') ) {
			$('.panel-heading').show();		
		}
		else {
			$('.panel-heading').hide();
		}
		
			//get all selected user list
			$('input[name="chk_list"]:checked').each(function() {
				selectedUserListArray.push(this.value);
			});
			
			var selectedUserList = selectedUserListArray.join();
			$("#selected_user_list").val(selectedUserList);
			
		
	}
	
	
	
	 function addToSelectedUserList(promotionType, all_users, users_cnt) {	
		
				var selectedUserList = $('#selected_user_list').val();
				var client_id = $('#client_id').val();
				var activity_type = $('#activity_type').val();
				var content_id = $('#content_id').val();
				var product_activity_id = $('#activity_id').val();
				var action_block_name = 'save_corporate_promotion_uid_list';
				var arrSelectedUserList = selectedUserList.split(","); 
				var selected_user_count = arrSelectedUserList.length;
				var is_season_id = 'N';
				var search_param = ''
				var client_activity = activity_type+'_'+content_id;
				
				var batch_name = $('#batch_name').val();
				
				if(all_users == 'ALL') {
					var selected_user_count = users_cnt;
					var selectedUserList = 'ALL';
				}
					
				
				
				if(promotionType == 'Msg') {
				
					var msg_title = 'SEND SMS';
					var msg_description = "<p class='send_sms_info'>"+selected_user_count+" users selected! Are you sure to send sms </p><p><label>Message:</label><textarea id='sms_message' class='form-control'></textarea><span id = 'spanCounter'>135 characters left</span></p>";
					var activityId = 9;
					var activityType = 'sms';
					
					if(activity_type == 'webinar') {
						var activityId = 6;
						var activityType = 'webinar';
					}
					
					
						bootbox.confirm({
								//size: 'small',
								title: msg_title,
								message: msg_description, 
								 buttons: {
									'cancel': {
										label: 'Close',
										className: 'btn-default'
									},
									'confirm': {
										label: 'Send',
										className: 'btn-danger '
									}
								},
								callback: function(result){	
									if(result) {  
										
										$.post(base_url+"/general_ajax_task.php",{action: action_block_name, uid_list: selectedUserList, activity_id: activityId, activity_type:activityType,promotion_type:promotionType, client_id: client_id,'content_id':content_id,'is_season_id':is_season_id,'search_param':search_param, selected_user_count: selected_user_count, batch_name: batch_name},function(data) {
										
										   //alert(data);   
											//return false;
											
											var finalVal = data.split('#');
											var sms_message = $("#sms_message").val();
											if(sms_message == '') {
												$( "<p class='alert alert-danger'> Please enter message </p>" ).insertAfter(".send_sms_info");
												return false;
											}

												 //bootbox.hideAll();
												 
												if(promotionType == 'Msg') {
													var action_promotionType = 'send_sms_corporate_users';
												} else {
													var action_promotionType = 'send_email_corporate_users';
												}
												
												$( ".bootbox-body .alert-danger").remove();
												$.ajax({
													type: "POST",
													url: base_url+'/ajax_files/saas_corporate_function.php?action='+action_promotionType,
													data: "batch_name="+finalVal[2]+"&message="+sms_message+"&selected_user_count="+selected_user_count+"&batch_id="+finalVal[3],//only input,
													success: function(data){
														data = $.trim(data);
														var msg = $.parseJSON(data); 
														if(msg.status == 'success') {
																$( "<p class='alert alert-success'> "+msg.message+" </p>" ).insertAfter(".send_sms_info");
																setTimeout("bootbox.hideAll()", 1000);
														}  else {
															$( "<p class='alert alert-danger'> "+msg.message+" </p>" ).insertAfter(".send_sms_info");
														}
													}
												});				
											
											
										});
										
										return false; //bootbox preventive close
										
									} 
								}
				});
				
				
				
					
				} else {
				
					var msg_title = 'SEND EMAIL';
					var msg_description = "<p class='send_sms_info'>"+selected_user_count+" users selected! Are you sure to send email </p> <form action='' method='post' id='send_mail_form' name='send_mail_form'> <p> <label>Subject:</label><input type='text' name='mailer_subject' value='' class='form-control'></p><p><label>Message:</label><textarea name='mail_message' class='form-control'></textarea></p></form>";
					
					if(activity_type == 'codehire') {
						var activityId = 4;
						var activityType = 'codehire';
					} else if(activity_type == 'codejudge') {
						var activityId = 5;
						var activityType = 'codejudge';
					} else {
						var activityId = product_activity_id;
						var activityType = activity_type;
					}
					
					
					$.post(base_url+"/general_ajax_task.php",{action: action_block_name, uid_list: selectedUserList, activity_id: activityId, activity_type:activityType,promotion_type:promotionType, client_id: client_id,'content_id':content_id,'is_season_id':is_season_id,'search_param':search_param, selected_user_count: selected_user_count, batch_name: batch_name},function(data) {

						var finalVal = data.split('#');
						var batch_name = trim(finalVal[0]);
						open_url_iframe_modal('Mailer Promotion', base_url+'/ajax_files/load_saaspromotesendmailer.php?batch='+batch_name+'&type='+activityType+'&client_activity='+client_activity, 530, 560);
					
					});
				
				}
				
				
				
				
			
		
    }
	
	
	
  function CheckAll_users(chk) {
		
		var selectedUserList = '';
		var selectedUserListArray =  new Array();
		
		if(!$('#check-all').is(':checked')) { 
			UnCheckAll_users(chk)
			$('.panel-heading').hide();
		} else {
			$('.panel-heading').show();

			var ttl_sel = document.getElementsByName('chk_list');

			if(ttl_sel){
				for (var k in ttl_sel){
					ttl_sel[k].checked = "checked";
				}
			}

				//get all selected user list
				$('input[name="chk_list"]:checked').each(function() {
					selectedUserListArray.push(this.value);
				});
				
				var selectedUserList = selectedUserListArray.join();
				$("#selected_user_list").val(selectedUserList);

		
		}
		
		
			
			
        return;
		
    }

	function UnCheckAll_users(chk) {
       
	   var ttl_sel = document.getElementsByName('chk_list');
        if(ttl_sel){
            for (var k in ttl_sel){
                ttl_sel[k].checked = "";
            }
        }
		
		$("#selected_user_list").val('');
		
        return;
    }
	
	
	// function being created for common purpose
	function validate_n_load_ppt_video_url(obj, hide_div_list, show_div_list, container_id) {
	//try {
		//if(isLinkBlock) return;
		var curval = $.trim($(obj).val());
		
		var curval_length = curval.length;
		var url = base_url + '/ajax_files/ajax_companypage_data.php?action=fetch_url_data';

		if(curval.charAt(curval_length-1) == " " || isUrl(curval)){

		  var curval_arr = new Array();
		  curval_arr = curval.split(' ');

		//alert(curval_arr.length);
		  for (i in curval_arr){
			  if(isUrl(curval_arr[i])){
					lastUrl = curval_arr[i];
					//$('#attach_link_block').hide();
					//$('#attach_link_error').hide();
					//$('#upload_div').hide();
					
					$('#attach_link_block').hide();
					
					$(hide_div_list).show();
					//$('#url_data_loader').show();
					$(show_div_list).show();
					
					$(container_id).html('<div style="background:url('+loading_img_path+') no-repeat scroll center bottom; text-align:center; height:23px;">&nbsp;</div>');
					$.post(url, {'url' : escape(curval_arr[i])}, function(data){

						$('#attach_icon_block').hide(); // CHECK IT
						var content_arr = eval('('+data+')'); 
						//var content_arr = data.parseJSON();
						
						var htm_cont = content_arr['html'];
						var link_data = content_arr['pic_data'];
						
						var pic_str = String(link_data.pics);
						
						var v_src = String(link_data.v_src);

						link_src_arr = pic_str.split(",");
						//$('#url_data_block #url_data_loader').html(htm_cont);
						$(container_id).html(htm_cont);

						$('#link_prev').css({filter:'alpha(opacity=40)', opacity:'0.4', cursor:'default'});
						//isLinkBlock = true;
						//if(v_src != 'undefined' && v_src != '' && pic_str != '') {
						//	document.getElementById('shareList_subBtn').disabled = false;
						//	$('#shareList_subBtn').removeClass('gsbmt-dis flr mrtp7').addClass('gsbmt flr mrtp7');
						//}

					});
					break;
				}
		  }
		}
	///}catch(e){
	//	alert(e.description);
	 //}	
	}
	
	function validateAttachLinkValue(obj) {
		var tmpObjId = obj.id;

		if($('#'+tmpObjId).val() == 'http://' || $('#'+tmpObjId).val() == 'https://') {
			$('#'+tmpObjId).val('');
			$('#'+tmpObjId).css({
				'color':'#000'
			});
		}
	}
	
	function isUrl(string){
		if ( string.search(/^[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,5})/) != -1 ){
			return true;
		}
		if (string.search(/^[http://]+[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,5})/) != -1 ){
			return true;
		} 
		if (string.search(/^[https://]+[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,5})/) != -1 ){
			return true;
		}
		return false;
	}
	
	
	/* added by jais for status update */
/*  addded for status update by jais on 17 May 2010  */
function company_wall_status_update_post(obj) {
	//try{
	var activityTypeIndexVal = $('#company_activity_type').val();
	var activityWallTypeIndexVal = $('#company_wall_activity_type').val();
	var module_name = $('#module_name').val();
	
	var providedUrl = null;
	if(activityTypeIndexVal == 'rss' || activityTypeIndexVal == 'blog') {
		providedUrl = $('#attach_link').val();
	}
	// add method by kuldeep
	if(activityWallTypeIndexVal == 'WALL_VIDEO') {
		providedUrl = $('#post_link_url').val();
	}
	
	//var message = trim($('#'+obj).val());
	var media_type = "";
	var media_url = "";
	var media_title = "";
	var media_subtitle = "";
	var media_descp = "";
	var v_src = "";
	var v_type = "";

	//var activityRefId= $('#company_activity_category').val();

	var groupid= $('#group_id').val();
	var statustype = $('#status_type').val();
	var preText = $('#status_update_listing').html();

	if(activityTypeIndexVal == 'slideshare') {activityTypeIndexVal = 'ppt';}
	
//	alert(groupid+'==Hello-1'+statustype+'=='+preText);

	var ajax_url = base_url + '/ajax_files/ajax_companypage_data.php?action=status_update&groupid='+groupid+'&statustype='+statustype+'&providedUrl='+providedUrl+'&activityTypeIndexVal='+activityTypeIndexVal+'&activityWallTypeIndexVal='+activityWallTypeIndexVal+'&module_name='+module_name;

	if(activityTypeIndexVal == 'rss' || activityTypeIndexVal == 'blog') {
		
	} else {

	if(typeof inputType != 'undefined') {
		if(inputType == 'image' || inputType == 'video' || inputType == 'slideshare') {
			if(!validateShareListPageNoFillCase()) {return false;}
		} else if(inputType == 'photo' || inputType == 'doc') {
			if(!validateShareListDocPhotoUploadFlag()) {return false;}
		}
	}

	var params = {};
	if(isLinkBlock) {
		//var message = trim($('#'+obj).val());
		
		if(typeof inputType != 'undefined') {
			var tmpMsg = '';
			if(inputType == 'image') {
				tmpMsg = "Share and talk about your link with the group.";
			} else if(inputType == 'video') {
				tmpMsg = "Share and talk about your video with the group.";
			} else if(inputType == 'photo') {
				tmpMsg = "Share and talk about your photo with the group.";
			} else if(inputType == 'slideshare') {
				tmpMsg = "Share and talk about your presentation with the group.";
			} else if(inputType == 'doc') {
				tmpMsg = "Share and talk about your document with the group.";
			} else {
				tmpMsg = "";
			}
			if(message == tmpMsg) message = "";
		} else {
			//if(message == 'What is on your mind?') message = "";
		}

//		alert('LINK SRC ==>'+$('#post_link_src').val());

		if(!$('#showhide_link_img').attr('checked') && $('#post_link_src').val() != "") {
			if(photoUpload) {
				media_url = uploadedPhotoUrl;
				media_type = 'photo';
			} else if(docUpload) {
				media_url = uploadedDocUrl;
				media_type = 'doc';				
			} else {
				media_url = $('#post_link_src').val();
				media_type = $('#post_link_type').val();
			}
		} else{
			media_type = "link";
		}

		/*
		 else if(!$('#showhide_link_img').attr('checked') && $('#post_link_src').val() == "" && $('#post_link_subtitle').val() != ""){
			media_type = "image";
		} else{
			media_type = "link";
		}
		*/

//		alert('LINK TITLE ==>'+$('#post_link_title').val());

		if($('#post_link_title').val() != ""){
			media_title = $('#post_link_title').val();
		}


//		alert('LINK SUB TITLE ==>'+$('#post_link_subtitle').val());

		if($('#post_link_subtitle').val() != ""){
			media_subtitle = $('#post_link_subtitle').val();
		}
		if($('#post_link_descp').val() != ""){
			media_descp = $('#post_link_descp').val();
		}

//		alert('VIDEO SRC ==>'+$('#post_video_type').val());

		if($('#post_video_src').val() != ""){
			v_src = $('#post_video_src').val();
		}

//		alert('VIDEO TYPE ==>'+$('#post_video_type').val());
		if($('#post_video_type').val() != "") {
			v_type = $('#post_video_type').val();
		}
		$('#url_data_block').hide();
	    isLinkBlock = false;
	    link_src_arr = "";
		if(photoUpload) {
			photoUpload = false;
			uploadedPhotoUrl = null;
		}
		if(docUpload) {
			docUpload = false;
			uploadedDocUrl = null;
		}

  } else {
		//alert('AB-5');
		//if(message == 'What is on your mind?'){
		//  return false;
	    //}
	}

	//params['status_update'] = message;
	params['media_type'] = media_type;

	params['media_url'] = media_url;

	params['media_title'] = media_title;

	params['media_subtitle'] = media_subtitle;

	params['media_descp'] = media_descp;

	params['v_src'] = v_src;

	params['v_type'] = (v_type) ? v_type : 'application/x-shockwave-flash';

	params['group_id'] = groupid;

	//params['status_type'] = status_type;
	//alert(params['v_type']+'=='+params['v_src']);

	}

	$('#url_data_block').show();
	$('#url_data_block #url_data_loader').html('<div style="background:url('+loading_img_path+') no-repeat scroll center bottom; text-align:center; height:23px;">&nbsp;</div>');
	$.post(ajax_url, params, function(data) {
		//alert('Return Data=='+data);
		
		var page_type_url = $.trim($('#page_type_url').val());
		if(!page_type_url){
			page_type_url = 'company-page'; 
		}
		
		if(data > 0) {			
			window.location = base_url+'/corporate/'+page_type_url+'/'+groupid+'/'+activityTypeIndexVal;
		} else {
			alert('Some error occured! \nPerhaps, you may already have added this item');
			
			window.location = base_url+'/corporate/'+page_type_url+'/'+groupid+'/'+activityTypeIndexVal;
			
			return false;
		}
		
		if(data == 'P') {
			alert('You have already posted the same content. ');
			$('#'+obj).val('');
			$('#'+obj).focus();	
			return false;
		}
		if(msg_count == 0) {
			$('#no_group_update_block').hide(); 
		}
		//$('#status_update_listing').prepend(data);

		document.getElementById('shareList_subBtn').disabled = true;
		$('#shareList_subBtn').removeClass('gsbmt flr mrtp7').addClass('gsbmt-dis flr mrtp7');
    
		//changed
		$('#url_data_block').hide();
		$('#url_data_loader').hide();

		$('#'+obj).val('');
		//document.getElementById(obj).onblur();
		$('#upload_div').show();
		
		var content_list_type = ''; // ADDED AS WAS GIVING ERROR
		
		if(content_list_type != '') {
			$('#url_data_loader').html('');
			if(content_list_type == 'image') {
				$('#url_data_block').show();
				$('#attach_link').val('');
				$('#attach_link_block').show();
			} else if(content_list_type == 'photo') {
				$('#url_data_block').show();
				$('#upload_photo_block').show();
			} else if(content_list_type == 'video') {
				$('#url_data_block').show();
				$('#attach_link').val('');
				$('#attach_link_block').show();
			} else if(content_list_type == 'slideshare') {
				$('#url_data_block').show();
				$('#attach_link').val('');
				$('#attach_link_block').show();
			} else if(content_list_type == 'doc') {
				$('#url_data_block').show();
				$('#upload_doc_block').show();
			} else {
				//alert('6');
			}
		}

	});
	return false;	
 //}catch(e){ }
}


/***
 * Javascript For Jobs Landing Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 21 July, 2016
 */

Tg_JobsLandingPage = new function() {
    var $instance = this;

    $instance.init = function() {
		
        $("#btn-srch-search").click(function() {
            var keyword = $.trim($("#input_txt").val());
            if (keyword == '' || keyword == 'e.g. Product Manager or Engineer') {
                alert("Please enter keyword to search your desired jobs");
                $("#input_txt").val(keyword);
                $("#input_txt").focus();
                return false;
            }

            var sel_location_count = $("#txtLocation :selected").length;
            if (sel_location_count > 10) {
                alert("You can select maximum of 10 locations at a time, wherever you have selected " + sel_location_count + " locations");
                return false;
            }
        });
		
		$('.filters .job-sources li a').popover();
		
		$.getScript(base_url + "/Themes/Release/javascript/chosen_jquery.min.js")
            .done(function() {
                $('.chosen-select').chosen();
				$('#span-location .chosen-select').chosen({
					max_selected_options:12, //Max select limit 
				});	
            })
            .fail(function() {
                console.log('chosen not loaded');
            })
		
		$instance.showRemainingCompany = function() {
			document.getElementById('show_init_comp').style.display='none';
			document.getElementById('show_rem_comp').style.display='inline';
		}

		$instance.hideRemainingCompany = function() {
			document.getElementById('show_init_comp').style.display='inline';
			document.getElementById('show_rem_comp').style.display='none';
		}

		$instance.showRemainingInstitute = function() {
			document.getElementById('show_init_inst').style.display='none';
			document.getElementById('show_rem_inst').style.display='inline';
		}

		$instance.hideRemainingInstitute = function() {
			document.getElementById('show_init_inst').style.display='inline';
			document.getElementById('show_rem_inst').style.display='none';
		}
		
		$('#span-location .chosen-select').on('chosen:maxselected', function() {
			Tg_CommonFunction.open_html_modal('Job Post: Max Locations Reached','<p class="text-center">You can not select more than twelve locations</p>');
		});
		
		$('[data-toggle="tooltip"]').tooltip();
		
    }
	
	$instance.validate_mobile = function() {
		if(document.myForm.src_mobile.value.length == 0 || document.myForm.src_mobile.value.length < 10) {
			alert('Please enter valid Mobile no. ');
			document.myForm.src_mobile.focus();
			return false;
		}
		if(document.myForm.src_mobile.value.length != 0) {
				var numericExpression = /^[0-9+-]+$/;
				if(!document.myForm.src_mobile.value.match(numericExpression)){
							alert('Only numbers are allowed in Mobile field. ');
							document.myForm.src_mobile.focus();
							return false;
					}
		}
		return;
	}
	
	$instance.company_onblur = function(id) {
		  var company_name = trim(document.getElementById(id).value);
		  document.getElementById(id).value = company_name;
		  url = base_url + "/ajax/ajax_company_request_form.php?ajax_check=1&company_name="+escape(company_name);
		  HTTPGet(url, $instance.company_onblur_response);
	}
	
	$instance.maxExpReload = function() {
		var minExp=-1;
		var maxExp=-1;
		if(document.getElementById("minexp") != null)
			minExp=document.getElementById("minexp").value;
		if(document.getElementById("maxexp") != null)
			maxExp=document.getElementById("maxexp").value;
		
		if(parseInt(minExp) == -1){
			for (var i=(document.getElementById("maxexp").options.length-1); i>=0; i--){ 
				document.getElementById("maxexp").remove(i);
			}
			document.getElementById("maxexp").options[document.getElementById("maxexp").length] = new Option('Max',minExp);
		}else{
			for (var i=(document.getElementById("maxexp").options.length-1); i>=0; i--) 		
				document.getElementById("maxexp").remove(i);
			for(x = minExp; x<=20; x++){
				if(x == 0){
					p=x;
					q='Entry Level';
				} else if(x < 20){
					p=x;
					q=x+' year';
				}else{
					p=20;
					q='20+ years';
				}
				document.getElementById("maxexp").options[document.getElementById("maxexp").length] = new Option(q,p);
			}
			for (var idx=0;idx<document.getElementById('maxexp').options.length;idx++) {
				if(parseInt(maxExp) != -1 && (parseInt(maxExp) > parseInt(minExp))){
					if((parseInt(maxExp))==document.getElementById('maxexp').options[idx].value){
						document.getElementById('maxexp').selectedIndex=idx;
						document.getElementById('maxexp').options[idx].selected=true;
						break;
					}					
				}else{
					if ((parseInt(minExp)+1)==document.getElementById('maxexp').options[idx].value) {
						document.getElementById('maxexp').selectedIndex=idx;
						document.getElementById('maxexp').options[idx].selected=true;
						break;
					}
				}
			}
		}
	}

	$instance.maxSalaryReload = function() {
		var txtLowSalary=-1;
		var txtHighSalary=-1;
		
		if(document.getElementById("txtLowSalary") != null)
			txtLowSalary=document.getElementById("txtLowSalary").value;
		if(document.getElementById("txtHighSalary") != null)
			txtHighSalary=document.getElementById("txtHighSalary").value;
		
		if(parseInt(txtLowSalary) == -1){
			for (var i=(document.getElementById("txtHighSalary").options.length-1); i>=0; i--){
				document.getElementById("txtHighSalary").remove(i);
			}
			document.getElementById("txtHighSalary").options[document.getElementById("txtHighSalary").length] = new Option('Max',txtLowSalary);
		}else{
			txtLowSalary = parseInt(txtLowSalary) + 100000;
			for (var i=(document.getElementById("txtHighSalary").options.length-1); i>=0; i--) 		
				document.getElementById("txtHighSalary").remove(i);
			for(x = txtLowSalary; x<=5000000;){
				if(x < 5000000){
					p=x;
					q=parseInt(x)/100000;
				}else{
					p=5000000; 
					q='50+';
				}
				document.getElementById("txtHighSalary").options[document.getElementById("txtHighSalary").length] = new Option(q,p);
				if(parseInt(x) == 0){ 
					x= 100000;
				}else{
					x = parseInt(x) + 100000;
				}
			}
			for (var idx=0;idx<document.getElementById('txtHighSalary').options.length;idx++) {
				if(parseInt(txtHighSalary) != -1 && (parseInt(txtHighSalary) > parseInt(txtLowSalary))){
					if((parseInt(txtHighSalary))==document.getElementById('txtHighSalary').options[idx].value){
						document.getElementById('txtHighSalary').selectedIndex=idx;
						document.getElementById('txtHighSalary').options[idx].selected=true;
						break;
					}					
				}else{
					if ((parseInt(txtLowSalary)+1)==document.getElementById('txtHighSalary').options[idx].value) {
						document.getElementById('txtHighSalary').selectedIndex=idx;
						document.getElementById('txtHighSalary').options[idx].selected=true;
						break;
					}
				}
			}
		}
	}
	
	$instance.company_onblur_response = function(data, xmlresponse) {
	  var company = document.getElementById('add_pro_details');
	  if (data == 1) {
		company.style.display = 'block';
	  }
	  else {
		company.style.display = 'none';
	  }
	}
	
	$instance.post_job_on_fb = function(job_id) {

		var action_block_name = 'post_job_on_fb';
		$.post(base_url+"/general_ajax_task.php",{action: action_block_name, job_id: job_id},function(data) {
			//alert(data);
			if(data == 1) {
				$('#fb_job_post_init_'+job_id).hide();
				$('#fb_job_post_success_'+job_id).html('Job Successfully added for FB Posting.').show();
				//var url_array = data.split(',');
				//var url_count = url_array.length;
			}
	    })
	}
	
	$instance.save_webinar_user_feedback = function(user_id, feedback_webinar_id, feedback_question_id, cur_value) {
		var ajax_url = base_url+"/general_ajax_task.php?action=save_expertspeak_user_feedback";
		
		$.post(ajax_url, {'user_id':user_id,'feedback_webinar_id':feedback_webinar_id,'feedback_question_id':feedback_question_id,'cur_value':cur_value}, function(data) {
			//alert(data);
		});
		
	}
	
	$instance.validateFeedbackSubmission = function() {
		var obj = document.getElementsByTagName('input');
		var checkedCounter = 0;
		for (i = 0; i < obj.length; i++) {
			if(obj[i].type == "radio" && obj[i].checked == true) {
				checkedCounter++;
			}
		}
		
		if(checkedCounter == 0) {
			alert('Please provide any input. ');
			return false;
		}
		
		var title = 'TechGig <?php echo TG_POPUP_EXPERTSPEAK_NAME; ?> Feedback';
		var msg = 'Thanks for Submitting TechGig <?php echo TG_POPUP_EXPERTSPEAK_NAME; ?> Feedback';
		Tg_CommonFunction.open_html_modal(title, '<p class="text-center">'+msg+'</p>');
			
		return true;
	}
	
	$instance.deleteJobAlert = function(alert_id,alert_cnt) {
		var alert_cnt_max = '<?php echo $alert_cnt; ?>';
		var del_conf = confirm('Are you sure you want to delete this Job Alert?');
		var job_del_url = base_url+"/general_ajax_task.php?action=delete_job_alert";
		var ret_url = window.location;
		if (/\?/.test(ret_url)){
			ret_url += "&msg_id=7509";
		}else{
			ret_url += "?msg_id=7509";
		}
		if(del_conf){
			$.post(job_del_url, {job_alert_id:alert_id}, function(data){
				window.location = ret_url;
			});
		}
		return false;
	}

	$instance.show_hide_fields = function(type) {
		if(type == 2) {
			document.getElementById('company_name').style.display = 'none';
			document.getElementById('company_name_2').style.display = 'block';
			document.getElementById('company_name_3').style.display = 'none';

			document.getElementById('company_desc_section').style.display = 'block';
			var company_det_name = document.getElementById('company_det_name').value;
			document.getElementById('pro-company-2').value = company_det_name;
			//if(company_det_name != '') {
			//	document.getElementById('company_name_err_section').style.display = 'none';
			//}
			document.getElementById('company_description').style.display = 'none';
			document.getElementById('company_description_1').style.display = 'block';
			document.getElementById('type').value = 2;
			//document.getElementById('user_text').innerHTML='Job Posted by';
			document.getElementById('outside_job_bx').style.display = 'none';

		} else if (type == 1) {
			document.getElementById('company_name').style.display = 'block';
			document.getElementById('company_name_2').style.display = 'none';
			document.getElementById('company_name_3').style.display = 'none';

			document.getElementById('company_desc_section').style.display = 'block';
			document.getElementById('pro-company').value = '';			
			document.getElementById('company_description').style.display = 'block';
			document.getElementById('company_description_1').style.display = 'none';
			document.getElementById('type').value = 1;
			//document.getElementById('user_text').innerHTML='Job Posted by';
			document.getElementById('outside_job_bx').style.display = 'none';

		} else if (type == 3) {
			document.getElementById('company_name').style.display = 'none';
			document.getElementById('company_name_2').style.display = 'none';
			document.getElementById('company_name_3').style.display = 'block';
			document.getElementById('company_desc_section').style.display = 'none';
			document.getElementById('pro-company-2').value = '';
			document.getElementById('type').value = 3;
			//document.getElementById('user_text').innerHTML='Job Shared by';
			document.getElementById('outside_job_bx').style.display = 'block';
		}
		return true;
	}
	
	$instance.showHideOtherCity = function(obj) {
		var cityVal = obj.options[obj.selectedIndex].value;
		var searchFor = 'Others';
		if(cityVal.search(searchFor) == -1) {
			document.getElementById('other_india_city_name').value = "";	
			document.getElementById('other_india_city').style.display='none';				
		} else {
			document.getElementById('other_india_city').style.display='block';
		}
	}
	
	$instance.jobDatepicker = function() {
		$.getStylesheet(base_url + "/Themes/Release/jquery-ui.css")
		$.getScript(base_url + "/Themes/Release/javascript/jquery_ui.min.js")
            .done(function() {
                $( "#expiry_date" ).datepicker({ dateFormat: "yy-mm-dd", minDate: "+1D", maxDate: "+2M" });
            })
            .fail(function() {
                console.log('datepicker not loaded');
            })
	}
	
	
	$instance.getImages = function(company_logo,rb_company_img) {
		var type_of_job = $('#type').val();
		//logo selection option is opened for jobdate clients...Sushil 05-Aug-2014
		if(type_of_job != 9 && type_of_job != 8) {
			//Company Logo uploading disabled, comment "return false" from below line to enable again....Sushil 15-Jul-2014
			return false;
		}
		
		var company_name = '';
		if($('#job_type1').is(":checked")) {
			company_name = $("#pro-company").val();
		} else if($('#job_type2').is(":checked")){
			company_name = $("#pro-company-2").val();
		} else if($('#job_type3').is(":checked")){
			company_name = $("#pro-company-3").val();
		}
		
		if(company_name != '') {
			
			var loading_img_path = base_url + '/Themes/Release/images/preloader-rectpic.gif';
			
			document.getElementById('spanCompanyLogo').innerHTML = '<img src="'+loading_img_path+'" />';

			$.post(base_url+"/ajax_files/fetch_images.php",{keyword: encodeURIComponent(company_name), imageid: "company_img", sel_img: encodeURIComponent(rb_company_img), comp_logo: encodeURIComponent(company_logo)},function(images_html){
				if(images_html) {					
					//alert(images_html);
					if(images_html != '' && images_html != 'EMPTY_KEYWORD') {
						document.getElementById('spanCompanyLogo').innerHTML = images_html;
					}	
				}						
			});
			
			$("#divCompanyLogo").show();
		}
	}
	
	$instance.uploadResume = function(groupId,photoUpload,uploadedPhotoUrl,docUpload,uploadedDocUrl,ajax_resume_upload_path) {
	//var shareBoxNoUrlCallFlag = false;
    try {
        var btnUpload=$('#upload');
        var status=$('#status');
        var fileUploadPath = base_url+'/'+ajax_resume_upload_path;

        new AjaxUpload(btnUpload, {
            action: base_url+'/upload-resume.php?groupid='+groupId,
            name: 'uploadfile',
            onSubmit: function(file, ext){
            
            var photoBlock_visibility = $('#upload_block').css('display');
            var uploadType = '';
            if(photoBlock_visibility == 'block') {uploadType = 'doc';}
        
        try {
            var uploadDataType = $('#attach_link_block_type').val();
            //alert(uploadType+"=="+uploadDataType);
        } catch(err) {
              //alert(err);
        }
        
            //alert(photoBlock_visibility+'=='+ext);
            if(uploadDataType == 'doc') {
						    //if(!(ext && /^(doc|docx|xls|xlsx|pdf|ppt|pptx)$/.test(ext))){ 
                if(!(ext && /^(doc|docx|pdf)$/.test(ext))){ 
                    // extension is not allowed 
                    status.text('File can not be uploaded, you are allowed to upload documents only with doc, docx and pdf extensions.').show();
										$('#url_data_loader').hide();
                    return false;
				}
            }            
            
            status.text('Uploading...').show();
            },
            onComplete: function(file, response){
            
                //alert(response);
            
                var tmpData = response.split('||');
                
                //On completion clear the status
                status.text('').hide();
                //Add uploaded file to list
                if(tmpData[0] === "success"){
                    //alert('Success..');
                    //$('<li></li>').appendTo('#files').html(file).addClass('success');
                    //$('<li></li>').appendTo('#files').html('<img src="'+tmpData[1]+'" alt="" /><br />'+file).addClass('success');
                    $('#url_data_loader').show();
                    
                    if(tmpData[2] == 'photo') {
                        $('#url_data_loader').html('<img src="'+tmpData[1]+'" width="200" alt="" />');
                        isLinkBlock = true; // AB
                        photoUpload = true; // AB
                        uploadedPhotoUrl = tmpData[1]; // AB
                    } else if(tmpData[2] == 'doc') {
                        $('#url_data_loader').html(file+' has been successfully uploaded.').removeClass('alert-danger').addClass('alert-success');
                        isLinkBlock = true; // AB
                        docUpload = true; // AB
                        uploadedDocUrl = tmpData[1]; // AB
                    } else {
                        //alert('I M CALLED...');
                    }
                     //document.getElementById('shareList_subBtn').disabled = false;
                     //$('#shareList_subBtn').removeClass('gsbmt-dis flr mrtp7').addClass('gsbmt flr mrtp7');
                } else{
                    //alert('Failure..');
                    //$('<li></li>').appendTo('#files').text(file).addClass('error');
                    if(tmpData[2] == 'min-size' || tmpData[2] == 'max-size') {
						status.text(tmpData[1]).show();
						$('#url_data_loader').hide();
						return false;
					} else {
						$('#url_data_loader').html('Error Uploading Data.').removeClass('alert-success').addClass('alert-danger');
						$('#url_data_loader').show();
					}	
                }
            }
        });
        } catch(err) {
              //alert(err);
       }
	}

    $instance.txtLocation = function(city_list) {

        function split(val) {
            return val.split(/,\s*/);
        }

        function extractLast(term) {
            return split(term).pop();
        }

        $.getScript(base_url + "/Themes/Release/javascript/jquery_ui.min.js") 
            .done(function() {

                // don't navigate away from the field on tab when selecting an item
                $("#txtLocation").bind("keydown", function(event) {
                    if (event.keyCode === $.ui.keyCode.TAB &&
                        $(this).autocomplete("instance").menu.active) {
                        event.preventDefault();
                    }
                })

                $("#txtLocation").autocomplete({
                    minLength: 0,
                    source: function(request, response) {
                        // delegate back to autocomplete, but extract the last term
                        response($.ui.autocomplete.filter(
                            city_list, extractLast(request.term)));
                    },
                    focus: function() {
                        // prevent value inserted on focus
                        return false;
                    },
                    select: function(event, ui) {
                        var terms = split(this.value);
                        // remove the current input
                        terms.pop();
                        // add the selected item
                        terms.push(ui.item.value);
                        // add placeholder to get the comma-and-space at the end
                        terms.push("");
                        this.value = terms.join(", ");
                        return false;
                    }
                });
            })
            .fail(function() {
                console.log('Autocomplete not loaded');
            })

    }
	
	$instance.apply_job = function(jobid,return_url) {
		return_url = (typeof return_url === "undefined") ? "" : return_url;
		$('#ancApply'+jobid).removeAttr("onclick");
		var anc_text = $('#ancApply'+jobid).text();
		$('#ancApply'+jobid).text('Please Wait...');
		
		var action_block_name = 'save_apply_job';
		$.post(base_url+"/general_ajax_task.php",{action: action_block_name, jobid: jobid},function(data) {
			data = $.trim(data);
			var arr_data = data.split("##");
			var apply_satus = arr_data[0];
			var skilltest_url = arr_data[1];
			
			if(apply_satus == 'NOT-LOGGED') {
				$('#ancApply'+jobid).hide();
				$('#spanApplyMsg'+jobid).html('Please Login to Apply').show();
			} else if(apply_satus == 'ALREADY-APPLIED') {
				$('#ancApply'+jobid).hide();
				$('#spanApplyMsg'+jobid).html('You have Already Applied').show();
			} else if(apply_satus == 'NO-TECHQUOTIENT') {				
				$('#skillsTechQuotient').html(skilltest_url);
				$.colorbox({inline:true, height:280, width:500, href:"#no_techquotient", fixed:true});
				$('#ancApply'+jobid)[0].setAttribute("onclick", "Tg_JobsLandingPage.apply_job("+jobid+")");				
				$('#ancApply'+jobid).text(anc_text);
			} else {
				if(apply_satus == 'APPLIED') {
					if(return_url != "") {
						window.location.href = return_url;
					} else {
						$('#ancApply'+jobid).hide();
						$('#spanApplyMsg'+jobid).html('Applied Successfully').show();
					}
				}
				if(typeof skilltest_url != 'undefined' && skilltest_url != '') {
					window.open(skilltest_url, '_blank');				
				}
			}
	    })
	}
	
	$instance.job_apply_skilltest_instructions = function(job_id) {
		var job_apply_url = base_url+"/job_apply.php?jobid="+job_id;
		//$("#ancProceed").attr("href",job_apply_url);
		//open_div_html_modal('Instructions', 'apply_instructions');
		window.location.href = job_apply_url;
	}
	
	$instance.checkIfOtherCity = function (obj) {
		var city_val = $("#"+obj).val();
		var strObj = new String(city_val);
		var city_val_arr = strObj.split(' ');
		var other_val = '';
		for(var i in city_val_arr){
			if(city_val_arr[i] == 'Other' || city_val_arr[i] == 'Others'){
				other_val = 'Others';
				//alert(city_val_arr[i]);
				break;
			}
		}
		//alert(other_val);
		if(other_val == 'Others'){
			var html_txt = "<span class='star'>*</span> City Name :";
			if(obj == "city_combo"){
				$('#add_other_city label').html(html_txt);
				$('#add_other_city').css({"margin-top": "4px"});
				$('#add_other_city').show();
				//$('#add_other_city input').focus();
			}else if(obj == "int_city_combo2"){
				$('#int_add_other_city2 label').html(html_txt);
				$('#int_add_other_city2').css({"margin-top": "4px"});
				$('#int_add_other_city2').show();
				//$('#int_add_other_city input').focus();
			}else{
				$('#int_add_other_city label').html(html_txt);
				$('#int_add_other_city').css({"margin-top": "4px"});
				$('#int_add_other_city').show();
				//$('#int_add_other_city input').focus();
			}
		}else{
			if(obj == "city_combo"){
				$('#add_other_city').hide();
				$('#add_other_city input').val('');
			}else{
				$('#int_add_other_city').hide();
				$('#int_add_other_city input').val('');
			}
		}
		
	}
};


	function HTTPGet(uri, callbackFunction, callbackParameter, callbackParameter2) {
	  var xmlHttp = new XMLHttpRequest();
	  var bAsync = true;
	  if (!callbackFunction)
		bAsync = false;    
	  xmlHttp.open('GET', uri, bAsync);
	  xmlHttp.send(null);  
	  if (bAsync) {
		if (callbackFunction) {
		  xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4)
				callbackFunction(xmlHttp.responseText, xmlHttp, callbackParameter, callbackParameter2)
			}
		}
		return true;
	  }
	  else {
		return xmlHttp.responseText;
	  }
	}
	
	function checkIfOtherCity(obj) {
		var city_val = $("#"+obj).val();
		var strObj = new String(city_val);
		var city_val_arr = strObj.split(' ');
		var other_val = '';
		for(var i in city_val_arr){
			if(city_val_arr[i] == 'Other' || city_val_arr[i] == 'Others'){
				other_val = 'Others';
				//alert(city_val_arr[i]);
				break;
			}
		}
		//alert(other_val);
		if(other_val == 'Others'){
			var html_txt = "<span class='star'>*</span> City Name :";
			if(obj == "city_combo"){
				$('#add_other_city label').html(html_txt);
				$('#add_other_city').css({"margin-top": "4px"});
				$('#add_other_city').show();
				//$('#add_other_city input').focus();
			}else if(obj == "int_city_combo2"){
				$('#int_add_other_city2 label').html(html_txt);
				$('#int_add_other_city2').css({"margin-top": "4px"});
				$('#int_add_other_city2').show();
				//$('#int_add_other_city input').focus();
			}else{
				$('#int_add_other_city label').html(html_txt);
				$('#int_add_other_city').css({"margin-top": "4px"});
				$('#int_add_other_city').show();
				//$('#int_add_other_city input').focus();
			}
		}else{
			if(obj == "city_combo"){
				$('#add_other_city').hide();
				$('#add_other_city input').val('');
			}else{
				$('#int_add_other_city').hide();
				$('#int_add_other_city input').val('');
			}
		}
		
	}
	
	var loc_counter_ = 0 ;
function add_loc(from,url) { 
  var t = setTimeout("add_loc_delayed('"+from+"','"+url+"')", 50);
}

function add_loc_delayed(from,url){ 
  loc_fromList = document.getElementById(from);
  var sel = false;
  for (i=0;i<loc_fromList.options.length;i++)
  {
    var current = loc_fromList.options[i];
    if (current.selected)
    {
      sel = true;
      if (current.value == '')
      {
        //alert ('You cannot select this!');
        return;
      }
      var val = current.value;
      if (loc_counter_ == 12) {
        alert('You cannot select more than twelve locations');
        return;
      }
      var mydiv = document.createElement('div');
      var divIdName = 'locDiv'+val;
      mydiv.setAttribute('id',divIdName);
      if ( document.getElementById('locDiv'+val) == null) {
      data = "<p id ='loc_"+val+"'><img onclick='remove_loc(\""+val+"\")' id='loc_img"+val+"' onmouseover='profile_change_img(\"loc_img"+val+"\", "+url+")' onmouseout='profile_change_img(\"loc_img"+val+"\", "+url+")' src='"+url+"' class='cros' title='Delete'/>"+val+"</p>";
      mydiv.innerHTML = data;
      document.getElementById("add_loc").appendChild(mydiv);
      document.getElementById("add_loc").style.display = "block";
      var assign_option = document.getElementById("assign_option_job").value + val + ',';   
      document.getElementById("assign_option_job").value = assign_option;
      //loc_fromList.options[i] = null;
      loc_counter_ ++;
      } else {
      //alert ('You have already selected this location');
      return;
      }
      i--;
    }
  }
  if (!sel) alert ('You haven\'t selected any locations!');
}

function profile_change_img(id, img) {
	img_obj = document.getElementById(id);
	$(img_obj).attr('src', img);
	//$(img_obj).attr('src', base_url+'/Themes/Release/images/' + img);
}


DataScience = new function () {
    $instance = this;

    this.init = function (pre_populate_tags, question_id,select_value) {
        
        if(question_id){
            $('option[value=' + select_value + ']')
            .attr('selected',true);
        }
        
        $("#tags").tokenInput(base_url + "/ajax/autocomplete.php?autocomplete=tokeninput&type=technology_tags", {
            theme: "facebook",
            class: "form-control",
            width: 100,
            tabindex: 13,
            maxlength: 30,
            prePopulate: pre_populate_tags
        });

    };
    
    this.loadNiceEdit = function () {
        $.getScript(base_url + "/nicEdit-latest.js")
            .done(function () {
                new nicEditors.allTextAreas({buttonList: ['bold', 'italic', 'underline', 'link', 'unlink', 'upload', 'xhtml']});
            })
            .fail(function () {
                console.log('nicedit not loaded');
        });
    };
    
    this.UploadFile = function(file,season_id,question_id){
        $('.progress-loading').show();
        var form_data = new FormData();                  
	form_data.append('file', file);                          
	form_data.append('season_id', season_id);  
	form_data.append('question_id', question_id);  
       
    $.ajax({
        type: 'POST',
        url: base_url+'/ajax_files/saas_corporate_function.php?action=uploadDataScienceFile',
        data: form_data,
        processData: false,
        contentType: false,
        success: function () {
			$('.progress-loading').hide();
        }
    
  });

    };
    function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
        if(e.loaded == e.total){
            $('#upload-msg').html('Upload success');
        }
    }
};
    
};
DataScienceCoding = new function(){
    $instance = this;
    $instance.init = function(){
		/*
       $("#editor-box").innerHeight($(window).height() - ($("#header").innerHeight() + $("#user-nav").innerHeight() + $(".user-info-bar").innerHeight() + 2));
	   
	   $(".codehire #sidebar-navigation").css("padding-bottom", 8);
	   
	   $("#editor").innerHeight($(window).height() - ($("#header").innerHeight() + $("#data-science .tab1 .nav-tabs").innerHeight() + $(".user-info-bar").innerHeight() + $("#editor-box .editor-footer").innerHeight() + 6));
	   
	   $("#data-science .tab-content").innerHeight($(window).height() - ($("#header").innerHeight() + $(".user-info-bar").innerHeight() + $("#data-science .tab1 .nav-tabs").innerHeight() + 2));
	 */
    };
};
