/***
 * Javascript For Techgig Landing Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 01 June, 2016
 */

Tg_LandingPage = new function() {
    var $instance = this;

    $instance.init = function() {
		$instance.homeBannerSlider();
		
		if($(window).width() < 767){
			$("#intro-section .slide.hidden-xs").remove();
		}		
    }
	
	$instance.ourClientsSlider = function() {
		$('#our-clients ul').carouFredSel({
				responsive: true,
				width: '100%',
				circular: true,
				infinite: false,
				auto: true,
				scroll: {
					items: 1,
					duration: 1000
				},
				items: {
					width: 350,
					height: 'variable',
					visible: {
						min: 1,
						max: 4
					}
				},
				prev: $("#our-clients .previous-btn"),
				next: $("#our-clients .next-btn")
		});
		var bLazy = new Blazy();
    };

    $instance.homeBannerSlider = function() {
        //Load Home Banner 
        $.getScript(theme_url + "/javascript/jquery.cycle.all.js")
            .done(function() {
                $('#intro-section .slides').cycle({
                    slideExpr: '.slide',
                    cleartypeNoBg: ' true',
                    fx: 'fade',
                    timeout: 5000,
                    speed: 1000,
                    fit: 1,
                    slideResize: 0,
                    containerResize: 0,
                    height: 'auto',
                    width: null,
					pager: '.controls'
                });
            })
            .fail(function() {
                console.log('Home Slider not loaded');
            });
    };

    $instance.load_skill_toppers = function() {
        try {
            //$('#ajax_techNewsHomePage').html("<img src="+loading_img_path+ ">");
            var url = base_url + '/ajax_files/ajax_loadDashboardTechQuotientToppers.php';
            $.post(url, {
                'user_attempted_skills': user_attempted_skills
            }, function(data) {
                var exp_skill_toppers = data.split('@#$@#$');
                for (var i = 0; i < exp_skill_toppers.length; i++) {
                    var exp_skill_toppers_info = exp_skill_toppers[i].split('##');
                    var skill_id = $.trim(exp_skill_toppers_info[0]);
                    var skill_toppers = $.trim(exp_skill_toppers_info[1]);
                    $('#toppers_' + skill_id).html(skill_toppers).show(50000);
                }
            });
        } catch (e) {}
    }

    $instance.follow_entity_user = function(entity_id, user_id, type, entity_type, status) {
        
        if (user_id == '' || user_id <= 0) {
            alert('Please login first for following.');
            return false;
        }
        try {

            cliked_follow = true;
            var url = base_url + "/ajax_files/follow_entity.php";
            $.post(url, {
                'entity_id': entity_id,
                'user_id': user_id,
                'type': type,
                'entity_type': entity_type,
                'status': status
            }, function(data) {
                if (data.length > 0) {
                    if ($.trim(status) == 'Y') {
                        $('#follow-company-bx_user_' + entity_id).hide();
                        $('#unfollow-company-bx_user_' + entity_id).show();
                        var temp_cnt = parseInt($('#comp_follow_cnt_inp_user').val());
                        var cnt_up = temp_cnt + 1;
                        $('#comp_follow_cnt_inp_user').val(cnt_up);
                        $('#comp_follow_cnt_user').html(cnt_up);
                        // show popup
                        //$('#follow_setting_btn_user').click();
                    } else {
                        $('#unfollow-company-bx_user_' + entity_id).hide();
                        $('#follow-company-bx_user_' + entity_id).show();
                        var temp_cnt = parseInt($('#comp_follow_cnt_inp_user').val());
                        var cnt_up = temp_cnt - 1;
                        if (cnt_up < 0) {
                            cnt_up = 0;
                        }
                        $('#comp_follow_cnt_inp_user').val(cnt_up);
                        $('#comp_follow_cnt_user').html(cnt_up);
                    }
                }
            });

        } catch (e) {
            console.log(e);
        }
    }


    //Sebin - Extra JS from Others

    $instance.loadDashboardNitificationSkillNum = function(skill_load_try_counter, skill_loaded_flag, max_limit) {
		console.log(skill_load_try_counter);
        skill_load_try_counter++;
        var skillVal = '';
        skillVal = parseInt($('#user_skill_counter').val());

        if (typeof skillVal != "number") {
            $('#matched_skill_test_block').show();
            $('#matched_skill_count').html('100+');
        } else {
            if (skill_load_try_counter <= max_limit) {
                $('#matched_skill_test_block').show();
                $('#matched_skill_count').html($('#user_skill_counter').val());
                skill_load_try_counter = 5;
            } else {
                $('#matched_skill_test_block').show();
                $('#matched_skill_count').html('100+');
            }
            skill_loaded_flag = 'Y';
        }
    }



};

/***
 * Javascript For News Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Arun George
 * Created  : 10 June, 2016
 */

Tg_NewsPage = new function() {
    var $instance = this;

    $instance.init = function() {
		
		
		$(window).scroll(function() {    
			var windowScroll = $(window).scrollTop();
			var topScroll = 200;
	
			if(windowScroll > 2500){
				 $("#news-carousel").removeClass('active');
				 
			}else if(windowScroll > 200){
				 $("#news-carousel").addClass('active');
				 
			} else {
				$("#news-carousel").removeClass('active');
			}
		
		});	


        $(".news-lists .post p .favorite, #recommended-for-you p .favorite").click(function() {
            $(this).addClass("active");
            return false;
        });

    }

    $instance.save_content_like = function(act, content, like) {

        if (like == 1 || like == 'like') {
            like = 1;
        } else {
            like = 2;
        }

        var url = base_url + '/general_ajax_task.php?action=save_tg_activity_likes';
        $.post(url, {
            'act': act,
            'content': content,
            'like': like
        }, function(data) {
            data = $.trim(data);

            var title = '';
            var msg = '';

            if (data == 'INVALIDACT') {
                msg = 'Invalid Activity';
                open_html_modal(title, '<p class="text-center">' + msg + '</p>');
            } else if (data == 'ALREADY_EXIST') {
                if (like == 1) {
                    msg = 'You have already liked.';
                } else {
                    msg = 'You have already unliked.';
                }
                Tg_CommonFunction.open_html_modal(title, '<p class="text-center">' + msg + '</p>');
            } else {
                var arr_data = data.split("##");
                var like_satus = arr_data[0];
                var like_count = arr_data[1];
                if (like_satus == 'Y' && like_count >= 0) {
                    $('#like-' + act + '-' + content).html(like_count);
                    if (like == 1) {
                        $('#anc-like-' + act + '-' + content).addClass('active');
                        $('#anc-like-' + act + '-' + content).attr('onclick', 'Tg_NewsPage.save_content_like(' + act + ',' + content + ',\'unlike\')');
                        $('#anc-like-' + act + '-' + content).attr('title', 'Click to unlike this news');
                    } else {
                        $('#anc-like-' + act + '-' + content).removeClass('active');
                        $('#anc-like-' + act + '-' + content).attr('onclick', 'Tg_NewsPage.save_content_like(' + act + ',' + content + ',\'like\')');
                        $('#anc-like-' + act + '-' + content).attr('title', 'Click to like this news');
                    }
                }
            }
        });

    }

    $instance.NewsMainBanner = function() {

        $.getScript(theme_url + "/javascript/jquery.cycle.all.js")
            .done(function() {
                $("#news-banner .post").each(function() {
                    var bgSrc = $(this).find('.post-image').attr("src");
                    $(this).find(".inner-wrap").css("background-image", "url(" + bgSrc + ")");
                });

                $('.main-banner .slides').cycle({
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
                    pager: '.controls'
                });
            })
            .fail(function() {
                console.log('Cycle not loaded');
            });


    };

    $instance.NewsDetails = function() {
        $('.news-slideshow.carousel').carousel({
            interval: false
        });

        if ($('.main-banner').length > 0) {
            if ($(window).width() < 767) {
                $.scrollTo(($('.main-banner').height()) + 15, 1000);
            } else {
                $.scrollTo(($('.main-banner').height()) + 40, 1000);
            }

        }

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=170113813021038";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    };


    $instance.subscribeForm = function(activity_id) {
        $("#subscribe-form").modal("show");

        $.getScript(theme_url + "/javascript/chosen_jquery.min.js")
            .done(function() {
                $('#subscribe-form .chosen-select').chosen();
            })
            .fail(function() {
                console.log('chosen not loaded');
            });

        $("#subscribe-form .close").click(function() {
            var date = new Date();
            date.setTime(date.getTime() + (3600 * 12 * 1000)); // expires after 12 hours
            $.cookie("SUBSCRIPTION_ACT_" + activity_id, "1", {
                expires: date
            });
        });

        $("#ancSubsActivity").click(function() {
            var email = $('#subs_email').val();
            var act = $('#subs_act').val();

            var catg;
            catg = '';
            if ($('#subs_catg').val() !== null) {
                var subs_catg = $('#subs_catg').chosen().val();
                if (subs_catg != '') {
                    $.each(subs_catg, function(key, value) {
                        catg += ',' + value;
                    });
                    catg = catg.substring(1);
                }
            }
			

            $("#frm-subs-act").removeClass("has-error");
            $(".error_msg").hide();

            if (email == '') {
                $('#email_error_msg').html('Please enter your email id');
                $('#email_error_msg').show();
                $('#email_error_msg').closest('li').addClass("has-error");
            } else {
                var url = base_url + '/general_ajax_task.php?action=save_tg_activity_subscription';
                $.post(url, {
                    'email': email,
                    'act': act,
                    'catg': catg
                }, function(data) {
                    data = $.trim(data);
                    if (data == 'EMPTYEMAIL') {
                        $('#email_error_msg').html('Please enter your email id');
                        $('#email_error_msg').show();
                        $('#email_error_msg').closest('li').addClass("has-error");
                    } else if (data == 'NVEMAIL') {
                        $('#email_error_msg').html('Please enter valid email id');
                        $('#email_error_msg').show();
                        $('#email_error_msg').closest('li').addClass("has-error");
                    } else if (data == 'INVALIDACT') {
                        $('#subs_error_msg').html('Invalid Activity');
                        $('#subs_error_msg').show();
                        $('#subs_error_msg').closest('li').addClass("has-error");
                    } else if (data == 'ALREADY_EXIST') {
                        $('#subscribe-form .modal-body').html('<div class="alert alert-info text-center" role="alert" style="margin-bottom:0;><strong>You have already subscribed.</strong></div>');
                        $('#subscribe-form').modal('show');
                    } else {
                        $('#subscribe-form .modal-body').html('<div class="alert alert-success text-center" role="alert" style="margin-bottom:0;"><strong>Thank you for subscribing to TechGig Updates.</strong></div>');
                        $('#subscribe-form').modal('show');
                    }
                    setTimeout(function() {
                        //$('#subscribe-form').modal('hide').show();
                        $('#subscribe-form').modal('hide').show();
                    }, 5000);
                });
            }
        });

    };

    $instance.loadMoreContents = function(ajax_page_url, container_id, content_type, custom_query_string) {
        custom_query_string = (typeof custom_query_string === "undefined") ? "" : custom_query_string;

        var page = $('#page_' + container_id).val();
        $('#anc_more_' + container_id).hide();
        $('#ajax_status_' + container_id).html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();

        var action_file_url = base_url + '/ajax_files/' + ajax_page_url + '?page=' + page;

        if (custom_query_string != "") {
            var action_file_url = action_file_url + '&' + custom_query_string;
        }

        $.get(action_file_url, function(data) {
            $('#ajax_status_' + container_id).hide();
            data = $.trim(data);
            if (data == 'no_record') {
                $('#ajax_status_' + container_id).html('<p class="text-center">No more ' + content_type + ' to display.</p>').show();
            } else if (data == 'invalid_type') {
                $('#ajax_status_' + container_id).html('Invalid Request.').show();
            } else {
                $('#' + container_id).append(data);
                page++;
                $('#page_' + container_id).val(page);
				$('#anc_more_' + container_id).show();
            }
        });

    };

};

Jstree = new function () {
    $instance = this;
    $instance.init = function (directory,platform_type,encryptToken,questionCategory) {        
        $('#tree')
                .jstree({
                    'core': {
                        'data': {
                            'url': base_url + "/file_project_question.php?operation=get_node&directory=" + directory + "&cache=" + $.now(),
                            'data': function (node) {
                                return {'id': node.id};
                            }
                        },
                        'check_callback': function (o, n, p, i, m) {
                            if (m && m.dnd && m.pos !== 'i') {
                                return false;
                            }
                            if (o === "move_node" || o === "copy_node") {
                                if (this.get_node(n).parent === this.get_node(p).id) {
                                    return false;
                                }
                            }
                            return true;
                        },
                        'force_text': true,
                        'themes': {
                            'responsive': false,
                            'variant': 'small',
                            "stripes": true
                        }
                    },
                    'sort': function (a, b) {
                        return this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : (this.get_type(a) >= this.get_type(b) ? 1 : -1);
                    },
                    'contextmenu': {
                        'items': function (node) {
                            var tmp = $.jstree.defaults.contextmenu.items();
                            delete tmp.create.action;
                            tmp.create.label = "Create";
                            tmp.create.submenu = {
                                "create_folder": {
                                    "separator_after": true,
                                    "label": "Folder",
                                    "action": function (data) {
                                        var inst = $.jstree.reference(data.reference),
                                                obj = inst.get_node(data.reference);
                                        inst.create_node(obj, {type: "default", directoy: directory, cache: $.now()}, "last", function (new_node) {
                                            setTimeout(function () {
                                                inst.edit(new_node);
                                            }, 0);
                                        });
                                    }
                                },
                                "create_file": {
                                    "label": "File",
                                    "action": function (data) {
                                        var inst = $.jstree.reference(data.reference),
                                                obj = inst.get_node(data.reference);
                                        inst.create_node(obj, {type: "file", directory: directory, cache: $.now()}, "last", function (new_node) {
                                            setTimeout(function () {
                                                inst.edit(new_node);
                                            }, 0);
                                        });
                                    }
                                }
                            };
                            if (this.get_type(node) === "file") {
                                delete tmp.create;
                            }
                            return tmp;
                        }
                    },
                    'types': {
                        'default': {'icon': 'folder'},
                        'file': {'valid_children': [], 'icon': 'file'}
                    },
                    'unique': {
                        'duplicate': function (name, counter) {
                            return name + ' ' + counter;
                        }
                    },
                    'plugins': ['state', 'sort', 'types', 'contextmenu', 'unique', 'themes']
                })
                .on('delete_node.jstree', function (e, data) {
                    $.get(base_url + '/file_project_question.php?operation=delete_node', {id: data.node.id, directory: directory, cache: $.now()})
                            .fail(function () {
                                data.instance.refresh();
                            })
                            .done(function () {
                                //$("#tree > ul > li > i.jstree-icon").remove();
                                //$("#tree > ul > li > a.jstree-anchor").remove();
                            });
                })
                .on('create_node.jstree', function (e, data) {
                    $.get(base_url + '/file_project_question.php?operation=create_node', {type: data.node.type, id: data.node.parent, text: data.node.text, directory: directory, cache: $.now()})
                            .done(function (d) {
                                data.instance.set_id(data.node, d.id);
                                //$("#tree > ul > li > i.jstree-icon").remove();
                                //$("#tree > ul > li > a.jstree-anchor").remove();
                            })
                            .fail(function () {
                                data.instance.refresh();
                            });
                })
                .on('rename_node.jstree', function (e, data) {
                    $.get(base_url + '/file_project_question.php?operation=rename_node', {id: data.node.id, text: data.text, directory: directory, cache: $.now()})
                            .done(function (d) {
                                data.instance.set_id(data.node, d.id);
                                //data.instance.refresh();
                                //$("#tree > ul > li > i.jstree-icon").remove();
                                //$("#tree > ul > li > a.jstree-anchor").remove();

                            })
                            .fail(function () {
                                data.instance.refresh();
                            });
                })
                .on('move_node.jstree', function (e, data) {
                    $.get(base_url + '/file_project_question.php?operation=move_node', {id: data.node.id, parent: data.parent, directory: directory, cache: $.now()})
                            .done(function (d) {
                                data.instance.load_node(data.parent);
                                //data.instance.refresh();
                                //$("#tree > ul > li > i.jstree-icon").remove();
                                //$("#tree > ul > li > a.jstree-anchor").remove();
                            })
                            .fail(function () {
                                data.instance.refresh();
                            });
                })
                .on('copy_node.jstree', function (e, data) {
                    $.get(base_url + '/file_project_question.php?operation=copy_node', {id: data.original.id, parent: data.parent, directory: directory, cache: $.now()})
                            .done(function (d) {
                                data.instance.load_node(data.parent);
                                //  data.instance.refresh();
                                //$("#tree > ul > li > i.jstree-icon").remove();
                                //$("#tree > ul > li > a.jstree-anchor").remove();
                            })
                            .fail(function () {
                                data.instance.refresh();
                            });
                })
                .on('changed.jstree', function (e, data) {
                    if (data && data.selected && data.selected.length) {
                        $.get(base_url + '/file_project_question.php?operation=get_content&id=' + data.selected.join(':'), {directory: directory, cache: $.now()}, function (d) {
                            if (d && typeof d.type !== 'undefined') {
                                $('#data .content').hide();
                                switch (d.type) {
                                    case 'text':
                                    case 'txt':
                                    case 'md':
                                    case 'htaccess':
                                    case 'log':
                                    case 'sql':
                                    case 'php':
                                    case 'js':
                                    case 'json':
                                    case 'css':
                                    case 'html':
                                    case 'py':
                                    case 'pl':
                                    case 'java':
                                    case 'xml':
                                    case 'properties':
                                    case 'gradle':
                                        $('#data .code').show();
                                        $('#body_code').next().remove();

                                        var info = CodeMirror.findModeByExtension(d.type);

                                        mode = info.mode;
                                        spec = info.mime;

                                        var editor = CodeMirror.fromTextArea(document.getElementById('body_code'), {
                                            mode: spec,
                                            lineNumbers: true,
                                            lineWrapping: true,
                                            smartIndent: true
                                        });

                                        editor.setValue(d.content);
                                        CodeMirror.autoLoadMode(editor, mode);

                                        OnChange = function (cm) {
                                            saveContentData(directory, data.node.id, cm.getValue());
                                        };
                                        CodeMirror.on(editor, 'change', $.proxy(OnChange, this));
                                        break;
                                    case 'png':
                                    case 'jpg':
                                    case 'jpeg':
                                    case 'bmp':
                                    case 'gif':
                                        $('#data .image img').one('load', function () {
                                            $(this).css({'marginTop': '-' + $(this).height() / 2 + 'px', 'marginLeft': '-' + $(this).width() / 2 + 'px'});
                                        }).attr('src', d.content);
                                        $('#data .image').show();
                                        break;
                                    default:
                                        $('#data .default').html(d.content).show();
                                        break;
                                }
                            }
                        }
                        );
                    }
                    else {
                        $('#data .content').hide();
                        $('#data .default').html('Select a file from the Directory.').show();
                    }
                });
        function saveContentData(directory, fileName, values) {
            $.ajax({
                type: "POST",
                url: base_url + '/ajax_files/saas_corporate_function.php?action=saveFileProjectData',
                data: {directory: directory, fileName: fileName, values: values},
                dataType: 'json',
                cache: false,
                success: function (data) {

                }
            });
        }

        $('#submitproject').on('click', function () {
            var value = $('.file-project-data').attr('data-value');
            $.ajax({
                url: base_url + "/ajax_files/saas_candidate_function.php?action=saveCompleteFileProject",
                data: {platform_type: platform_type, invitation_id: encryptToken, category: questionCategory},
                type: 'POST',
                cache: false,
                success: function (data) {
                    $('.project-save').modal('show');
                    $('#check_user_submission').val('Y');
                }

            });
        });
        $('#download-candidate-code').on('click', function () {

            $.ajax({
                url: base_url + "/ajax_files/saas_corporate_function.php?action=downloadCandidateProject",
                data: {project_dir: directory},
                type: 'POST',
                cache: false,
                success: function (response) {
                    window.location.href = base_url + '/' + directory + '/project.zip';
                }

            });
        });

        $('#download-project').on('click', function () {
            $.ajax({
                url: base_url + "/ajax_files/qrcode_generator.php",
                data: {directory: directory},
                type: 'POST',
                cache: false,
                success: function (response) {
                    $('#model-download-apk .modal-body').html(response);
                }

            });
        });

        $("#tree").on("loaded.jstree", function (e, data) {
            //$("#tree > ul > li > i.jstree-icon").remove();
            //$("#tree > ul > li > a.jstree-anchor").remove();
        });

    };

    $instance.uploadProject = function (season_id, question_id, attempt_id, directory) {
        var file_data = $('#file_upload').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('project_dir', directory);
        form_data.append('season_id', season_id);
        form_data.append('question_id', question_id);
        form_data.append('attempt_id', attempt_id);
        var webcam_val = $('#webcam_enable').val();
        var invitation_id = $('#invitation_id').val();
        var page_number = $('#next_page_count').val();
        var test_action_url = $('#test_action_url').val(); 
        if(test_action_url != '') {
            var contest_redirect_url = test_action_url;
        }
        
        $('.loader_ajax').show();
        $('.error_msg').remove();
        $.ajax({
            url: base_url + "/ajax_files/saas_corporate_function.php?action=uploadCandidateProject",
            data: form_data,
            type: 'POST',
            processData: false,
            contentType: false,
            cache: false,
            success: function (response) {
                $('.loader_ajax').hide();
                response = $.trim(response);
                var response = $.parseJSON(response);
                if (response.status == 'error') {
                    $("<span class='error_msg'> " + response.file + " </span>").insertAfter(".btn-file");
                }else if(webcam_val == 1) {
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
        } else if (response.status == 'success') {
                    $('#upload-zip-file').modal('hide');
                    window.location.reload();
                } else {
                    $("<span class='error_msg'> Could not upload file </span>").insertAfter(".btn-file");
                }

            }

        });
    };

    $instance.fileProjectData = function (questionCategory, encrypt_token, buttonCode) {
        $('.show-response').html('');
        $('#project-status').html('');
        $('.show-response').hide();
        $('#download-project').hide();
        $('.show-status').show();
        $('#project-status').html("");
        $('#project-status').html("Building project...");
        $('.disable-before-result').attr("disabled","disabled");
        $('.disable-before-result').addClass("hide");

        var scroll = $("#debug-project-data").offset().top;
        $('html, body').animate({
            scrollTop: scroll - 60
        }, 1000, function () {
        });


        $.ajax({
            url: base_url + "/ajax_files/codeJudgeCompileTest.php",
            data: {action: 'run', buttonCode: buttonCode, language: questionCategory, encrypt_token: encrypt_token},
            type: 'POST',
            cache: false,
            success: function (data) {
                $('.disable-before-result').removeAttr("disabled");
                $('.disable-before-result').removeClass("hide");
                var scroll = $("#debug-project-data").offset().top;
                $('html, body').animate({
                    scrollTop: scroll - 60
                }, 1000, function () {
                });

                if ($.trim(data) == '0*||*failure') {
                    $('.show-status').show();
                    $('#project-status').html("Please Retry Again!!");
                    return;
                }
                data = $.parseJSON(data);
                
                $('.show-response').html(data.output);
                $('.show-status').show();
                $('#project-status').html(data.iscompiled);
                $('.show-response').show();
                
                if (questionCategory == 'androidproject' && data.iscompiled.includes("Build Success")) {
                    $('#download-project').show();
                }
            }

        });
    };
};

/***
 * Javascript For Challenges Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 20 July, 2016
 */

Tg_ChallengesPage = new function() {
    var $instance = this;

    $instance.init = function() {
			
                        
			$('#previous-challenges .nav.nav-tabs li a').click (function () {
				var type = $(this).data('challenge_type');
				$('#previous-challenges .tab-pane').attr('id', type + '-challenges');
				$('#previous-challenges .tab-pane .col-sm-6').remove();
				$('#challenge_type').val(type);
				$('#page_number').val(1);
				$('#search_past_challenge').val('');
				$instance.LoadPreviousContest();
			});	
			
			$('#leaderboard1 .nav.nav-tabs li a').click (function () {
				var type = $(this).data('type');
				$('#leaderboard1 .tab-pane').attr('id', type + '-challenges');
				$('#leaderboard1 .tab-pane table tbody tr.row-header').remove();
				$('#leaderboard1 .tab-pane table tbody tr.user-row').remove();
				$('#type').val(type);
				$('#page_number').val(1);
				$instance.LoadLeaderBoardChallenge();
			});
			
		   $(document).on("change", "#leaderboard1 table tr.row-header select", function() {
				var season_id = $(this).val();
				$('#leaderboard1 .tab-pane table tbody tr.row-header').remove();
				$('#leaderboard1 .tab-pane table tbody tr.user-row').remove();
				$('#page_number').val(1);
				$('#season_id').val(season_id);
				$instance.LoadLeaderBoardChallenge();
			});
			
			//search challenge
		$('#search_past_challenge').keyup (function () {
		
			 var filter = $(this).val();
			 var keyword = $('#search_past_challenge').val();
			 var challenge_type = $('#challenge_type').val();
			 $('#page_number').val(1);
			
			 
			 //search if more than 2 character
			 if(keyword.length > 2) {
			
			$('#previous-challenges div.col-sm-6').remove();
			$('#ViewMore').hide();
			$('#ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
			
			var action_file_url = base_url + '/ajax_files/codecontestspreviouschallenges.php?keyword=' + keyword + '&type='+ challenge_type;
			$.ajax({
				type: "POST",
				url: action_file_url,
				data: ({}),
				success: function(data) {
					data = $.trim(data);
					if (data == 'none') {
						$('#no_more_user').html('<p class="text-center">Challenges not found.</p>');
						$('#ViewMore').hide();
						$('#ajax_previous_contest').html('');
					} else if (data == 'no_record') {
						$('#no_more_user').html('<p class="text-center">No more challenges to display.</p>');
						$('#ViewMore').hide();
						$('#ajax_previous_contest').html('');
					} else {
					    $('#previous-challenges div.col-sm-6').remove();
						$(data).insertBefore('.ajax_previous_contest');
						$('#ajax_previous_contest').hide();
					}
				}
			});
			
			} else {	
				$('#previous-challenges div.col-sm-6').remove();
				Tg_ChallengesPage.LoadPreviousContest();
			}
			
		});
		
		$(document).on('click', '#next-mcq',function(){		
			var invitation_id = $(this).data('invitation_id');
			var check_clear_validation=$('#clear_option_check').val();
			
			var answer_option = '';
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
			$("#next-mcq").addClass( "disabled" );
			$("#next-mcq").val("Redirecting...");
			
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
			
			try {
				if(webcam_val == 1) { //webcam
					$('#clear_option_check').val("0");
					if(page_number != 'none') {
						var action_url = contest_redirect_url+'/ajax/'+invitation_id+'/'+page_number;
						$('#content').load(action_url, function(responseTxt, statusTxt, xhr){
													
						});	
					}		
				} else if(page_number == 'none') {
					var final_url = contest_redirect_url+'/'+invitation_id;
					window.location.href = final_url;
				} else {
					if($.trim(practice) && practice !=0){
						if(finalsubmit == '1'){
							$('#codejudge_requirement').submit();
						} else {
							window.location.href = contest_redirect_url+'/'+invitation_id;
						}
					} else {
						window.location.href = contest_redirect_url+'/'+invitation_id+'/'+page_number;
					}
				} 
			} catch (e){
				//alert(e.description);
			}
		});
		
		// Load live challenge filter
		$(document).on('click', '.contest-section .header .dropdown .btn',function(){	
			if($(this).parent().hasClass("less")) {
				$(this).parent().removeClass("less");	
			} else { 
				$(this).parent().addClass("less");
			}
		});	

		
		$(document).on('click', '#attempted_option .bookmark-icon, #mcq-questions-list .bookmark-icon',function(){		
			var encrypt_token = $(this).data('token');
			var platform_type = $('#platform_type').val();
			var question_id = $(this).data('question_id');
			var category = $(this).data('category');
			var objectBtn = $(this);
			
			var bookmark = 'true';
			if($(this).hasClass("active")) {
				bookmark = 'false';
			}

			var url = base_url + '/ajax_files/saas_candidate_function.php?action=bookmark_question';
			$.post(url, {'invitation_id': encrypt_token, 'question_id': question_id, 'platform_type': platform_type, 'category': category, 'bookmark': bookmark}, function(data) {
				if(data.status == 'success') {
					if(bookmark == 'true') {
						$(objectBtn).addClass("active");
                                                $('.bookmark_'+question_id).addClass("active");
					} else {
						$(objectBtn).removeClass("active");
                                                $('.bookmark_'+question_id).removeClass("active");
					}
				}
			});			
		});	
		
		// Load upcoming prize recommanded challenge
		$(document).on('click', '#upcoming-job-filter-mob, #upcoming-prize-filter-mob',function(){	
			
			var upcoming_job_filter = $('input[name=upcoming_job_filter_mob]:checked').val();
			var upcoming_prize_filter = $('input[name=upcoming_prize_filter_mob]:checked').val();
			var contest_type = 'upcoming';
			upcoming_job_filter = (typeof upcoming_job_filter === "undefined") ? "" : upcoming_job_filter;
			upcoming_prize_filter = (typeof upcoming_prize_filter === "undefined") ? "" : upcoming_prize_filter;
			$('#upcoming_contest_listing').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
			var url = base_url + '/ajax_files/ajax_load_upcoming_challenge.php';
			$.post(url, {'prize_filter': upcoming_prize_filter, 'job_filter': upcoming_job_filter, 'contest_type': contest_type}, function(data) {
				var upcoming = data.split('@@$$#!#@@');
				$("#upcoming_contest_listing").html();
				$("#upcoming_contest_listing").html(upcoming[0]);
				$("#upcoming_count_id").html($.trim(upcoming[1]));
				var bLazy = new Blazy();
				return false;
				
			});			
		});	

			// Load upcoming prize recommanded challenge
		$(document).on('click', '#upcoming-prize-filter, #upcoming-job-filter',function(){	
			var upcoming_job_filter = $('input[name=upcoming_job_filter]:checked').val();
			var upcoming_prize_filter = $('input[name=upcoming_prize_filter]:checked').val();
			var contest_type = 'upcoming';
			upcoming_job_filter = (typeof upcoming_job_filter === "undefined") ? "" : upcoming_job_filter;
			upcoming_prize_filter = (typeof upcoming_prize_filter === "undefined") ? "" : upcoming_prize_filter;
			$('#upcoming_contest_listing').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
			var url = base_url + '/ajax_files/ajax_load_upcoming_challenge.php';
			$.post(url, {'prize_filter': upcoming_prize_filter, 'job_filter': upcoming_job_filter, 'contest_type': contest_type}, function(data) {
				var upcoming = data.split('@@$$#!#@@');
				$("#upcoming_contest_listing").html();
				$("#upcoming_contest_listing").html(upcoming[0]);
				$("#upcoming_count_id").html($.trim(upcoming[1]));
				
				var bLazy = new Blazy();
				return false;
				
			});			
		});	
		
		// Load live challenge filter
		$(document).on('click', '#live-job-filter-mob, #live-prize-filter-mob',function(){	

			var upcoming_job_filter = $('input[name=live_job_filter_mob]:checked').val();
			var upcoming_prize_filter = $('input[name=live_prize_filter_mob]:checked').val();
			var contest_type = 'running';
			upcoming_job_filter = (typeof upcoming_job_filter === "undefined") ? "" : upcoming_job_filter;
			upcoming_prize_filter = (typeof upcoming_prize_filter === "undefined") ? "" : upcoming_prize_filter;
			$('#live-contest-listing').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
			var url = base_url + '/ajax_files/ajax_load_upcoming_challenge.php';
			$.post(url, {'prize_filter': upcoming_prize_filter, 'job_filter': upcoming_job_filter, 'contest_type': contest_type}, function(data) {
				var running = data.split('@@$$#!#@@');
				$("#live-contest-listing").html();
				$("#live-contest-listing").html(running[0]);
				$("#live_running_id").html($.trim(running[1]));
				var bLazy = new Blazy();
				return false;
				
			});			
		});	
		
		// Load live challenge filter
		$(document).on('click', '#live-prize-filter, #live-job-filter',function(){	
			var upcoming_job_filter = $('input[name=live_job_filter]:checked').val();
			var upcoming_prize_filter = $('input[name=live_prize_filter]:checked').val();
			var contest_type = 'running';
			upcoming_job_filter = (typeof upcoming_job_filter === "undefined") ? "" : upcoming_job_filter;
			upcoming_prize_filter = (typeof upcoming_prize_filter === "undefined") ? "" : upcoming_prize_filter;
			$('#live-contest-listing').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
			var url = base_url + '/ajax_files/ajax_load_upcoming_challenge.php';
			$.post(url, {'prize_filter': upcoming_prize_filter, 'job_filter': upcoming_job_filter, 'contest_type': contest_type}, function(data) {
				var running = data.split('@@$$#!#@@');
				$("#live-contest-listing").html();
				$("#live-contest-listing").html(running[0]);
				$("#live_running_id").html($.trim(running[1]));
				var bLazy = new Blazy();
				return false;
				
			});			
		});	
		
		

    }
	
	
	$instance.leaderboardTabs = function(){
		$.getScript(theme_url+"/javascript/jquery_ui.min.js")
                .done(function () {
                    $( ".tabs3" ).tabs();
                })
                .fail(function () {
                    console.log('Tabs not loaded');
                })
		
	}
	
	$instance.running_challenge_cnt = function(){
		var running_challenge_cnt = $('#running_challenge_cnt').val();
        var running_challenge_event = $('#running_challenge_cnt_event').val();
        var total_running_challenge = running_challenge_cnt;
        
        if(running_challenge_event){
         total_running_challenge = parseInt(running_challenge_cnt) + parseInt(running_challenge_event);
        }
        
        
		if(running_challenge_cnt > 0) {
			$('#page-header ul#challenge_nav li:eq(0) a').append('<span class="number">'+ total_running_challenge+'</span>');
		}
	}
	
	$instance.upcoming_challenge_cnt = function(){
		var upcoming_challenge_cnt = $('#upcoming_challenge_cnt').val();
		if(upcoming_challenge_cnt > 0) {
			$('#page-header ul#challenge_nav li:eq(1) a').append('<span class="number">'+ upcoming_challenge_cnt +'</span>');
		}else{
			$('#page-header ul#challenge_nav li:eq(1) a').hide();

		}
	}
	
	$instance.recommended_challenge_cnt = function(){
		var recommended_challenge_cnt = $('#recommended_challenge_cnt').val();
		if(recommended_challenge_cnt > 0) {
			$('#page-header ul#challenge_nav li:eq(0) a').append('<span class="number">'+ recommended_challenge_cnt +'</span>');
		}
	}
	
	$instance.recommended_skilltest_cnt = function(){
		var recommended_skilltest_cnt = $('#recommended_skilltest_cnt').val();
		if(recommended_skilltest_cnt > 0) {
			$('#page-header ul#challenge_nav li:eq(1) a').append('<span class="number">'+ recommended_skilltest_cnt +'</span>');
			$('#page-header ul#skilltest_nav li:eq(0) a').append('<span class="number">'+ recommended_skilltest_cnt +'</span>');
		}
	}
	
	$instance.recommended_webinar_cnt = function(){
		var recommended_webinar_cnt = $('#recommended_webinar_cnt').val();
		if(recommended_webinar_cnt > 0) {
			$('#page-header ul#webinar_nav li:eq(0) a').append('<span class="number">'+ recommended_webinar_cnt +'</span>');
			$('#page-header ul#challenge_nav li:eq(2) a').append('<span class="number">'+ recommended_webinar_cnt +'</span>');
		}
	}
	
	$instance.recommended_news_cnt = function(){
		var recommended_news_cnt = $('#recommended_news_cnt').val();
		if(recommended_news_cnt > 0) {
			$('#page-header ul#technews_nav li:eq(0) a').append('<span class="number">'+ recommended_news_cnt +'</span>');
			$('#page-header ul#challenge_nav li:eq(3) a').append('<span class="number">'+ recommended_news_cnt +'</span>');
		}
	}
	
	$instance.recommended_skillpage_cnt = function(){
		var recommended_skillpage_cnt = $('#recommended_skillpage_cnt').val();
		if(recommended_skillpage_cnt > 0){
			$('#page-header ul#skillpage_nav li:eq(0) a').append('<span class="number">'+ recommended_skillpage_cnt +'</span>');
		}
	}
	
	$instance.recommended_company_cnt = function(){
		var recommended_company_cnt = $('#recommended_company_cnt').val();
		if(recommended_company_cnt > 0) {
			$('#page-header ul#company_nav li:eq(0) a').append('<span class="number">'+ recommended_company_cnt +'</span>');
		}
	}
	
	$instance.challengeCalender = function(){
			var action_url_calender =  base_url + '/challenge_calender.php';
			$('#challenges-calender .calender').load(action_url_calender, function(e){
				//load success
			});	
	};
	
	$instance.LoadRecentTakersData = function(div_id, d, type){
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
		$("#"+div_id+"-"+d+" tbody").html("<span class='tabs_loader'>please wait loading... <img src='"+THEME_PATH+"/images/loading.gif'> </span>");
		 var url = base_url+'/ajax_files/assessment_recent_takers.php?season_id='+d+'&type='+type+'&div_id='+div_id;
		 $("#"+div_id+"-"+d+" tbody").load(url, function(response, status, xhr) {
			response = $.trim(response);
			if(response == 'no_record') {
				$("#"+div_id+"-"+d+" tbody").html("<tr style='display: table-row;'><td align='center' colspan='"+cols+"'>No users to display.</td></tr>");
			}
		 });
		 return false;
	}
	
	$instance.LoadRecentTakersDataPagination = function(div_id, d, type,event_type, event_name,current_page_url){
		if(type == 2) {
		var cols = 4;
		var page = $('#leaderboard_page').val();
		} else if(type == 3) {
		var cols = 3;
		var page = $('#final_leaderboard_page').val();
		} else {
		var cols = 4;
		var page = $('#recent_page').val();
		}
		
		
		
		if(typeof event_type === 'undefined') { event_type = ''; }
		if(typeof event_name === 'undefined') { event_name = ''; }
                if(event_name){
                var cols = 5;
                }

		if(typeof current_page_url === 'undefined') { current_page_url = ''; }
		$('#view_more_users-'+div_id+'-'+d).hide();
		$('#ajax_'+div_id+'-'+d).html('<td colspan="'+cols+'" align="center">please wait loading... <img src="'+THEME_PATH+'/images/loading.gif"> </td>'); 
		var action_file_url = base_url+'/ajax_files/assessment_recent_takers.php?season_id='+d+'&type='+type+'&div_id='+div_id+'&page_no='+page+'&event_type='+event_type+'&event_name='+event_name+'&page_url='+current_page_url;
		$.get(action_file_url, function(data) {
					$('#ajax_'+div_id+'-'+d).hide();
					data = $.trim(data);
					if(data == 'no_record') {
						$('#ajax_'+div_id+'-'+d).html('<td style="text-align:center" colspan="'+cols+'" align="center">No more users to display.</td>');
						$('#ajax_'+div_id+'-'+d).show();
					} else {
						$(data).insertBefore('.ajax_'+div_id+'-'+d);
						page++;
						if(type == 2) {
						$('#leaderboard_page').val(page);
						} else if(type == 3) {
						$('#final_leaderboard_page').val(page);
						} else {
						$('#recent_page').val(page);
						}
						$('#view_more_users-'+div_id+'-'+d).show();
					}
		});
	}

    $instance.checkUserParticipation = function(previous_season_id, parent_season_id, season_id) {
		var is_digital_source='N';
        $("div[id^='contestMsg_']").html('');
        var action_file_url = base_url + '/ajax_files/assessment_check_participation.php?previous_season_id=' + previous_season_id + '&parent_season_id=' + parent_season_id + '&season_id=' + season_id + '&is_digital_source=' + is_digital_source;
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
	
	$instance.participateTest = function(season_id,msg_div) {
		var is_digital_source='N';
        $("div[id^='contestMsg_']").html('');
        var action_file_url = base_url + '/ajax_files/assessment_check_participation.php?season_id=' + season_id + '&is_digital_source=' + is_digital_source;
        $.get(action_file_url, function(data) {
            data = $.trim(data);
            var msg = $.parseJSON(data);
            if (msg.status == 'success') {
                window.location.href = msg.url;
            } else {
				// $('.msgErrortop .message-box').addClass('warning-msg').find('p').html(msg.message); 
				 //Tg_CommonFunction.clearMessage();
				 if(msg_div!=''){
					$("#"+msg_div).show();
					$("#"+msg_div).html(msg.message); 
				 } else {
					$("#message_div").show();
					$("#message_div").html(msg.message);  
				 }
				 
				 
            }
        });
    };
	
	$instance.pauseTest = function(attempt_id, evaluateFLag) { 
            
            window.clearTimeout(SD);
            $("#test-paused").modal({
                backdrop: 'static',
                    keyboard: false
            });
            $('#test-paused').on('hide.bs.modal', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
                        
		var url = base_url + '/ajax_files/saas_candidate_function.php?action=pause_user_test';
		$.post(url, {
			'attempt_id': attempt_id
		}, function(data) {
                        if(data.status == 'success') {
				
                            if(evaluateFLag == 'N'){
                                idledeTector();
                            }
			}
		});	
    };
    
    $instance.resumeUserTest = function(attempt_id, evaluateFLag, category_key, question_id, encrypt_token) { 
            window.clearTimeout(SD);
            window.clearTimeout(UE);
            var url = base_url + '/ajax_files/saas_candidate_function.php?action=resume_user_test';
		$.post(url, {
			'attempt_id': attempt_id
		}, function(data) {
                        if(data.status == 'success') {
                            $("#ancResumeUserTest").text("resume test");
                            $('#instructions-popup, #test-paused,#submit-test').unbind();
                            $("#instructions-popup").modal("hide");
                            $("#test-paused").modal("hide");
                            $("#submit-test").modal("hide");
                            Tg_ChallengesPage.setCountDown(category_key, question_id, encrypt_token, 'codejudge', 'N');
                             UE = setInterval(updateEvaluation, 10 * 1000);
                            if(evaluateFLag == 'N'){
                                idledeTector();
                            }
			}
		});
        
                	
    };
	
	$instance.saveMCQAnswer = function() {
		var invitation_id = $('#encrypt_token').val();
		var question_id = $('#question_id').val();
		var platform_type = $('#platform_type').val();
		
		try {			
			var answer_option = '';
			$('#attempted_option ul li.active').each(function() {
				if(answer_option == '') { answer_option = $(this).attr('id'); } 
				else { answer_option = answer_option+'@@'+$(this).attr('id'); }
			});
		
			var url = base_url+"/ajax_files/codejudge_save_mcq_answer.php";
			$.post(url,{'question_id':question_id,'answer_option':answer_option, 'invitation_id':invitation_id, 'platform_type':platform_type},function(data){
				data = $.trim(data);	
				if(data.length > 0) {
                                        
					if(data == 'timeout') {
						alert('Contest Time is over. Click OK to see the result');
						$('#codejudge_requirement').submit();
					} else if(data == 'failure') {                    
						
					}else{
                                        
                                            $('#check_user_submission').val('Y');
                                        }
				}
			});		
		} catch(e){
			//alert(e.description);
		}
	};
	
	$instance.setCountDown = function(category_key, question_id, encrypt_token, platform_type, isEventPage) {		
			seconds++;
                        remaining_time--;
                        
                        var remainTime  = 100-((remaining_time/seasonDuration)*100);
                        $('.timer-progress').css('width',remainTime+'%');
			if (seconds > 59){ minutes++; seconds = 0; }			
			if (minutes > 59){ hours++; minutes = 0; }			
			if (hours > 23){ days++; hours = 0; }
			
			if (days == 0) {			
				if(minutes < 10){ minutes = ('0' + minutes).slice(-2); }
				if(hours < 10){ hours = ('0' + hours).slice(-2); }
				if(seconds < 10){ seconds = ('0' + seconds).slice(-2); }				
				
				if(hours > 0) {
					var left_time = hours + ":" + minutes + ":" + seconds;
				} else {
					var left_time = minutes + ":" + seconds;
				}	
				$('#remain').html(left_time);
				$('#remainSideBar').html(left_time);
			} else {
				if(days < 10){ days = ('0' + days).slice(-2); }
				if(hours < 10){ hours = ('0' + hours).slice(-2); }
				if(minutes < 10){ minutes = ('0' + minutes).slice(-2); }
				if(seconds < 10){ seconds = ('0' + seconds).slice(-2); }
				
				if(days > 1){
				
                                    $('#remain').html(days + " days and " + hours + ":" + minutes + ":" + seconds);
                                    $('#remainSideBar').html(days + " days and " + hours + ":" + minutes + ":" + seconds);
                                }else{
                                    $('#remain').html(days + " day and " + hours + ":" + minutes + ":" + seconds);
                                    $('#remainSideBar').html(days + " day and " + hours + ":" + minutes + ":" + seconds);
                                    
                                }
			}
			
			SD = window.setTimeout("Tg_ChallengesPage.setCountDown('"+category_key+"', '"+question_id+"', '"+encrypt_token+"', '"+platform_type+"', '"+isEventPage+"')", 1000);
			if (remaining_time == 0) {
				seconds = 0;
				window.clearTimeout(SD);
				
				//Time has been finished so now auto submit the test;
				Tg_ChallengesPage.autoSubmitTest(category_key, question_id, encrypt_token, platform_type, isEventPage);
			}
				
    };
	
	$instance.autoSubmitTest = function(category_key, question_id, encrypt_token, platform_type, isEventPage) {
                
                    if(!$.trim(isEventPage)){
                            isEventPage = 'N';
                        }
            
		$("#auto_submit_code").val('Y');
		bootbox.alert({
			//size: 'small',
			title: "Contest time is over",
			message: "<p class='alert alert-warning'>Warning : Contest time is over. Click OK to see the result</p>",
			callback: function(result){
			if ($("#defaultCode").length > 0) {
				if(isEventPage == 'Y'){
                                     $('#form_post').val('2');
                                     compile_test('submit', question_id, encrypt_token, 'tg_testcase', platform_type, 'N');
                                     event_execution()
                                    return false;
                                }else{
                                    $('#form_post').val('1');
                                    compile_test('submit', question_id, encrypt_token, 'tg_testcase', platform_type, 'N');
                                }
			}
			
                            
                            if(isEventPage == 'Y'){
                            $('.submit-test-response-data').trigger('click');
                            return false;
                        }else{
                             
                             
                             if (category_key == 'coding' || category_key == 'approximate_solution'|| category_key == 'botchallenge') {
                                 $('#form_post').val('1');
                                compile_test('submit', question_id, encrypt_token, 'tg_testcase', platform_type, 'N');
                             }else{
                                $('#codejudge_requirement').submit();
                             }
                             
                        }
			
			}
		});
	};	

    $instance.LoadPreviousContest = function() {
		$("#previous-challenges .contest-box").removeClass("last");
        var page = $('#page_number').val();
		var challenge_type = $('#challenge_type').val();
        $('#ViewMore').hide();
        $('#ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/codecontestspreviouschallenges.php?page_no=' + page + '&type='+ challenge_type;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#no_more_user').html('<p class="text-center">No more challenges to display.</p>');
                    $('#ViewMore').hide();
					$('#ajax_previous_contest').html('');
                } else {
                    $(data).insertBefore('.ajax_previous_contest');
                    page++;
                    $('#page_number').val(page);
                    $('#ajax_previous_contest').hide();
                    $('#ViewMore').show();
                }
				var bLazy = new Blazy();
            }
        });

    };
	
	
	$instance.LoadLeaderBoardChallenge = function() {

       var page = $('#page_number').val();
		  var display_type = $('#type').val();
		  var season_id = $('#season_id').val();	  
          $('#ViewMore').hide();
          $('.no_user_display').remove();
        $('#ajax_leaderboard_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/assessment_leaderboard.php?page_no=' + page + '&type='+ display_type + '&season_id='+ season_id;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(response) {
                data = response.trim();
                if (data.indexOf("no_record") >= 0) {
                    $('#ViewMore').hide();
					$('#ajax_leaderboard_contest').html('');
					$(data).insertBefore('.ajax_leaderboard_contest');
					$('<tr class="no_user_display"><td colspan="4">  Be the first one to ace the leaerboard </td> </tr>').insertBefore('.ajax_leaderboard_contest');
                } else {
                    $(data).insertBefore('.ajax_leaderboard_contest');
                    page++;
                    $('#page_number').val(page);
                    $('#ajax_leaderboard_contest').hide();
                    $('#ViewMore').show();
                }
            }
        });

    };
	
	
	$instance.LoadRecommendedSkillTest = function() {

        var page = $('#page_number_skilltest').val();
        $('#ViewMore_recommended_skilltest').hide();
		
        $('#ajax_recommended_skilltest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/show_more_skilltest.php?page_no=' + page;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#no_more_skilltest').html('<div class="text-center view-all-block clearfix"><p class="text-center">No more skill tests to display.</p></div>');
                    $('#ViewMore_recommended_skilltest').hide();
					$('#ajax_recommended_skilltest').html('');
					// Hide the Main Block
					if(page == 1){
						$('#recommended-skill-test').hide();
					}
                } else {
                    $(data).insertBefore('.ajax_recommended_skilltest');
                    page++;
                    $('#page_number_skilltest').val(page);
                    $('#ajax_recommended_skilltest').hide();
                    $('#ViewMore_recommended_skilltest').show();
                }
            }
        });

    };
	
	$instance.LoadRecommendedSkillPages = function() {

        var page = $('#page_number_skillpages').val();
        $('#ViewMore_recommended_skillpages').hide();
		
        $('#ajax_recommended_skillpages').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/show_more_skillpages.php?page_no=' + page;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#no_more_skillpages').html('<p class="text-center">No more skill pages to display.</p>');
                    $('#ViewMore_recommended_skillpages').hide();
					$('#ajax_recommended_skillpages').html('');
					// Hide the Main Block
					if(page == 1){
						$('#recommended-skill-page').hide();
					}
                } else {
                    $(data).insertBefore('.ajax_recommended_skillpages');
                    page++;
                    $('#page_number_skillpages').val(page);
                    $('#ajax_recommended_skillpages').hide();
                    $('#ViewMore_recommended_skillpages').show();
                }
            }
        });

    };
	
	$instance.LoadRecommendedCompany = function() {

        var page = $('#page_number_company').val();
        $('#ViewMore_recommended_company').hide();
		
        $('#ajax_recommended_company').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/show_more_company.php?page_no=' + page;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#no_more_company').html('<p class="text-center">No more Company to display.</p>');
                    $('#ViewMore_recommended_company').hide();
					$('#ajax_recommended_company').html('');
					// Hide the Main Block
					if(page == 1){
						$('#recommended-companies').hide();
					}
                } else {
                    $(data).insertBefore('.ajax_recommended_company');
                    page++;
                    $('#page_number_company').val(page);
                    $('#ajax_recommended_company').hide();
                    $('#ViewMore_recommended_company').show();
                }
            }
        });

    };
	
	$instance.LoadRecommendedChallenge = function() {

        var page_challenge = $('#page_number_challenge').val();
        $('#ViewMore_recommended_challenge').hide();

        $('#ajax_recommended_challenge').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/show_more_challenge.php?page_no=' + page_challenge;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#no_more_challenge').html('<div class="text-center view-all-block clearfix"><p class="text-center">No more challenges to display.</p></div>');
                    $('#ViewMore_recommended_challenge').hide();
					$('#ajax_recommended_challenge').html('');
					// Hide the Main Block
					if(page_challenge == 1){
						$('#recommended-challenges').hide();
					}
                } else {
                    $(data).insertBefore('.ajax_recommended_challenge');
                    page_challenge++;
                    $('#page_number_challenge').val(page_challenge);
                    $('#ajax_recommended_challenge').hide();
                    $('#ViewMore_recommended_challenge').show();
                }
            }
        });

    };
	
	$instance.LoadRecommendedWebinar = function() {

        var page_webinar = $('#page_number_webinar').val();
        $('#ViewMore_recommended_webinar').hide();

        $('#ajax_recommended_webinar').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/show_more_webinar.php?page_no=' + page_webinar;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#no_more_webinar').html('<div class="text-center view-all-block clearfix"><p class="text-center">No more webinars to display.</p></div>');
                    $('#ViewMore_recommended_webinar').hide();
					$('#ajax_recommended_webinar').html('');
					// Hide the Main Block
					if(page_webinar == 1){
						$('#recommended-webinar').hide();
					}
                } else {
                    $(data).insertBefore('.ajax_recommended_webinar');
                    page_webinar++;
                    $('#page_number_webinar').val(page_webinar);
                    $('#ajax_recommended_webinar').hide();
                    $('#ViewMore_recommended_webinar').show();
                }
            }
        });

    };
	
    var p = 10;
    $instance.timeout_trigger = function(total_registration_val, total_developers_val, total_submissions_val) {
        $('#registered-developers').html('<span class="number">' + total_registration_val + '</span><div id="slice"' + (p > 50 ? ' class="gt50"' : '') + '><div class="pie"></div>' + (p > 50 ? '<div class="pie fill"></div>' : '') + '</div>');
        $('#registered1-developers').html('<span class="number">' + total_developers_val + '</span><div id="slice"' + (p > 50 ? ' class="gt50"' : '') + '><div class="pie"></div>' + (p > 50 ? '<div class="pie fill"></div>' : '') + '</div>');
        $('#registered2-developers').html('<span class="number">' + total_submissions_val + '</span><div id="slice"' + (p > 50 ? ' class="gt50"' : '') + '><div class="pie"></div>' + (p > 50 ? '<div class="pie fill"></div>' : '') + '</div>');

        var deg = 360 / 100 * p;

        $('#registered-developers #slice .pie, #registered1-developers #slice .pie, #registered2-developers #slice .pie').css({
            '-moz-transform': 'rotate(' + deg + 'deg)',
            '-webkit-transform': 'rotate(' + deg + 'deg)',
            '-o-transform': 'rotate(' + deg + 'deg)',
            'transform': 'rotate(' + deg + 'deg)'
        });

        if (p != 100) {
            setTimeout('Tg_ChallengesPage.timeout_trigger(' + total_registration_val + ',' + total_developers_val + ',' + total_submissions_val + ')', 25);
        }

        p++;
    }


    $instance.webcamTypeMcq = function(question_type, question_id, question_token, allow_new_tab, auto_submit_time_limit, out_movement_allowed_number, platform_type) {
        var focusLostCounter = 0;
        var focusLostFlag = 0;
        var focusLostStartTime = '';
        var focusLostEndTime = '';
        var timeElapsed = 0;
        var focusOutTimeInterval = 5000;


        /* if(auto_submit_time_limit == 0) {
        var timeElapsedLimit = '<?php echo TIME_ELAPSED_LIMIT; ?>';
        } else { */
        var timeElapsedLimit = auto_submit_time_limit;
        //}

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

                            $('#disable_ctrl_key_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');
                            $('#disable_ctrl_key_combination .modal-title').text('');
                                $('#disable_ctrl_key_combination').modal('show');


                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }
                        // Logging in Error Log file will go here
                        //alert(config.webcam_log[4]);
                        //saveWebcamLog(config.webcam_log[4]);

                        // reset the flags
                        //timeElapsed = 0;
                    } else {
                        timeElapsed = 0;
                    }

                } else {

                    focusLostCounter++;
                    if (movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
                        //alert('OUT OF FOCUS Going Limit Reached..');

                        if (doAutoSubmitFlag == 'Y') {
                            $('#disable_ctrl_key_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');
                            $('#disable_ctrl_key_combination .modal-title').text('');

                                $('#disable_ctrl_key_combination').modal('show');

                            // Logging in Error Log file will go here
                            //alert(config.webcam_log[4]);
                            saveWebcamLog(config.webcam_log[4]);

                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }

                    } else {

                        if (allow_new_tab == 'N') {
                            $('#disable_ctrl_key_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                            $('#disable_ctrl_key_combination .modal-title').text('');
                                $('#disable_ctrl_key_combination').modal('show');

                        } else {

                            // Activated in Chrome on mouse New tab click AND windows tab Click
                            if (focusLostCounter == 1) {
                                if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

                                    // Write Movement in Log File
                                    //saveWebcamLog(config.webcam_log[3]);

                                    // Set focus Lost flag to true
                                    focusLostFlag = 1;
                                    focusLostStartTime = new Date().getTime();
                                    setInterval(myTimeoutFunction, focusOutTimeInterval);

                                }
                            } else {
                                // Write Movement in Log File
                                //saveWebcamLog(config.webcam_log[3]);

                                // Set focus Lost flag to true
                                focusLostFlag = 1;
                                focusLostStartTime = new Date().getTime();
                                setInterval(myTimeoutFunction, focusOutTimeInterval);
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

                    //alert(timeElapsed);

                    if (timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {

                        if (doAutoSubmitFlag == 'Y') {
                            $('#disable_ctrl_key_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');
                            $('#disable_ctrl_key_combination .modal-title').text('');

                                $('#disable_ctrl_key_combination').modal('show');


                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }

                        // Logging in Error Log file will go here
                        //alert(config.webcam_log[4]);
                        //saveWebcamLog(config.webcam_log[4]);

                        // reset the flags
                        //timeElapsed = 0;
                    } else {
                        timeElapsed = 0;
                    }

                }, false);

                // bind blur event
                window.addEventListener("blur", function(event) {

                    focusLostCounter++;
                    if (movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
                        //alert('OUT OF FOCUS Going Limit Reached..');

                        if (doAutoSubmitFlag == 'Y') {
                            $('#disable_ctrl_key_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');
                            $('#disable_ctrl_key_combination .modal-title').text('');
                                $('#disable_ctrl_key_combination').modal('show');

                            // Logging in Error Log file will go here
                            //alert(config.webcam_log[4]);
                            saveWebcamLog(config.webcam_log[4]);

                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }

                    } else {
                        if (allow_new_tab == 'N') {
                            $('#disable_ctrl_key_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                            $('#disable_ctrl_key_combination .modal-title').text('');

                                $('#disable_ctrl_key_combination').modal('show');

                        } else {

                            // Activated in Chrome on mouse New tab click AND windows tab Click
                            if (focusLostCounter == 1) {
                                if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

                                    // Write Movement in Log File
                                    //saveWebcamLog(config.webcam_log[3]);

                                    // Set focus Lost flag to true
                                    focusLostFlag = 1;
                                    focusLostStartTime = new Date().getTime();
                                    setInterval(myTimeoutFunction, focusOutTimeInterval);

                                }
                            } else {
                                // Write Movement in Log File
                                //saveWebcamLog(config.webcam_log[3]);

                                // Set focus Lost flag to true
                                focusLostFlag = 1;
                                focusLostStartTime = new Date().getTime();
                                setInterval(myTimeoutFunction, focusOutTimeInterval);
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
                            $('#disable_ctrl_key_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');
                            $('#disable_ctrl_key_combination .modal-title').text('');
                                $('#disable_ctrl_key_combination').modal('show');


                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }

                        // Logging in Error Log file will go here
                        //alert(config.webcam_log[4]);
                        //saveWebcamLog(config.webcam_log[4]);

                        // reset the flags
                        //timeElapsed = 0;
                    } else {
                        timeElapsed = 0;
                    }

                });

                // bind focus event
                window.attachEvent("blur", function(event) {

                    focusLostCounter++;
                    if (movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
                        //alert('OUT OF FOCUS Going Limit Reached..');

                        if (doAutoSubmitFlag == 'Y') {
                            $('#disable_ctrl_key_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');
                            $('#disable_ctrl_key_combination .modal-title').text('');
                                $('#disable_ctrl_key_combination').modal('show');


                            // Logging in Error Log file will go here
                            //alert(config.webcam_log[4]);
                            saveWebcamLog(config.webcam_log[4]);

                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }

                    } else {
                        if (allow_new_tab == 'N') {
                            $('#disable_ctrl_key_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                            $('#disable_ctrl_key_combination .modal-title').text('');

                                $('#disable_ctrl_key_combination').modal('show');

                        } else {

                            // Activated in Chrome on mouse New tab click AND windows tab Click
                            if (focusLostCounter == 1) {
                                if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

                                    // Write Movement in Log File
                                    //saveWebcamLog(config.webcam_log[3]);

                                    // Set focus Lost flag to true
                                    focusLostFlag = 1;
                                    focusLostStartTime = new Date().getTime();
                                    setInterval(myTimeoutFunction, focusOutTimeInterval);

                                }
                            } else {
                                // Write Movement in Log File
                                //saveWebcamLog(config.webcam_log[3]);

                                // Set focus Lost flag to true
                                focusLostFlag = 1;
                                focusLostStartTime = new Date().getTime();
                                setInterval(myTimeoutFunction, focusOutTimeInterval);
                            }

                        }
                    }

                });
            }
        }

        function myTimeoutFunction() {
            timeElapsed = new Date().getTime() - focusLostStartTime; // time in ms
            timeElapsed = (timeElapsed / 1000); // time in seconds
            timeElapsed = Math.round(timeElapsed % 60); // formatting the time in seconds
            return timeElapsed;
        }


        function autoSubmitUserContest(question_id,question_token,platform_type) {

            if (question_type == 'code') {
                
                $('#form_post').val('1');
                compile_test('submit', question_id, question_token, 'tg_testcase', platform_type, 'N');
            } else {
                $('#codejudge_requirement').submit();
            }

        }
    }

    $instance.webcamNormal = function(question_type, question_id, question_token, allow_new_tab, auto_submit_time_limit, out_movement_allowed_number, platform_type) {
        var focusLostCounter = 0;
        var focusLostFlag = 0;
        var focusLostStartTime = '';
        var focusLostEndTime = '';
        var timeElapsed = 0;
        var focusOutTimeInterval = 5000;
        
        /* if(auto_submit_time_limit == 0) {
        var timeElapsedLimit = '<?php echo TIME_ELAPSED_LIMIT; ?>';
        } else { */
        var timeElapsedLimit = auto_submit_time_limit;
        //}

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
                            $('#disable_ctrl_key_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');
                            $('#disable_ctrl_key_combination .modal-title').text('');

                                $('#disable_ctrl_key_combination').modal('show');


                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

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
                                $('#disable_ctrl_key_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');
                                $('#disable_ctrl_key_combination .modal-title').text('');

                                    $('#disable_ctrl_key_combination').modal('show');

                                // Logging in Error Log file will go here
                                //alert(config.webcam_log[4]);
                                saveWebcamLog(config.webcam_log[4]);

                                // Auto Submit Call will go here
                                setTimeout(function() {
                                    autoSubmitUserContest(question_id,question_token,platform_type);
                                }, 5000);

                            }

                        } else {

                            if (allow_new_tab == 'N') {
                                //alert('You are not allowed to move out of current window during this contest!');
                                $('#disable_ctrl_key_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                                $('#disable_ctrl_key_combination .modal-title').text('');
                                    $('#disable_ctrl_key_combination').modal('show');

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
                            $('#disable_ctrl_key_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window');
                            $('#disable_ctrl_key_combination .modal-title').text('');
                                $('#disable_ctrl_key_combination').modal('show');

                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

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
                                $('#disable_ctrl_key_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window');
                                $('#disable_ctrl_key_combination .modal-title').text('');
                                    $('#disable_ctrl_key_combination').modal('show');


                                // Logging in Error Log file will go here
                                //alert(config.webcam_log[4]);
                                saveWebcamLog(config.webcam_log[4]);

                                // Auto Submit Call will go here
                                setTimeout(function() {
                                    autoSubmitUserContest(question_id,question_token,platform_type);
                                }, 5000);

                            }

                        } else {

                            if (allow_new_tab == 'N') {
                                //alert('You are not allowed to move out of current window during this contest!');
                                $('#disable_ctrl_key_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                                $('#disable_ctrl_key_combination .modal-title').text('');
                                    $('#disable_ctrl_key_combination').modal('show');

                                setInterval(function() {

                                    window.focus();
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
                            $('#disable_ctrl_key_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window');
                            $('#disable_ctrl_key_combination .modal-title').text('');
                                $('#disable_ctrl_key_combination').modal('show');

                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

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
                                $('#disable_ctrl_key_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window');
                                $('#disable_ctrl_key_combination .modal-title').text('');

                                    $('#disable_ctrl_key_combination').modal('show');

                                // Logging in Error Log file will go here
                                //alert(config.webcam_log[4]);
                                saveWebcamLog(config.webcam_log[4]);

                                // Auto Submit Call will go here
                                setTimeout(function() {
                                    autoSubmitUserContest(question_id,question_token,platform_type);
                                }, 5000);

                            }

                        } else {
                            if (allow_new_tab == 'N') {
                                $('#disable_ctrl_key_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                                $('#disable_ctrl_key_combination .modal-title').text('');
                                    $('#disable_ctrl_key_combination').modal('show');

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

        function myTimeoutFunction() {
            timeElapsed = new Date().getTime() - focusLostStartTime; // time in ms
            timeElapsed = (timeElapsed / 1000); // time in seconds
            timeElapsed = Math.round(timeElapsed % 60); // formatting the time in seconds
            return timeElapsed;
        }

        function autoSubmitUserContest(question_id,question_token,platform_type) {

            if (question_type == 'code') {
                $('#form_post').val('1');
                compile_test('submit', question_id, question_token, 'tg_testcase', platform_type, 'N');
            } else {
                $('#codejudge_requirement').submit();
            }

        }
    }

};

/***
 * Javascript For Skill Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 21 July, 2016
 */

Tg_SkillPage = new function() {
    var $instance = this;

    $instance.init = function() {

        $("#company-banner .trending-skills ul li").mouseenter(function() {
            $("#company-banner .trending-skills ul li").removeClass("active");
            $(this).addClass("active");
        });

        $("#follow-us-popup [data-dismiss='modal']").click(function() {
            var date = new Date();
            date.setTime(date.getTime() + (3600 * 12 * 1000)); // expires after 12 hours
            $.cookie("FOLLOW_US_<?php echo $company_id;?>", "1", {
                expires: date
            });
        });

    }
	
	$(document).ready(function() {
		$(window).bind("pageshow", function() {
		  // update hidden input field
		  $('#page').val(2);
		});
	});
	
	$instance.onscrollLoad = function(){
		$.getScript(theme_url+"/javascript/jQuery.loadScroll.min.js")
			.done(function () {
				// Custom fadeIn Duration
				 var bLazy = new Blazy({
				// Options
				});
			})
			.fail(function () {
				console.log('loadScroll not loaded');
			});
	};
	
	
	$instance.loadSocialShareBox = function(goto_action_url) {
		var title = '';		
		Tg_CommonFunction.open_url_modal(title, goto_action_url);
	}
	
	$instance.get_certificates = function(skill_id) {
		var url = base_url+"/ajax_files/assessment_get_result.php";
		$.post(url,{'action':'certificates','skill_id':skill_id},function(data){
			if(data.length > 0) {
				data.trim();
				if(data != 0){
					var all_info = data.split(",");
					var certificate_url = base_url+"/assessment_certificate.php?rank="+all_info[0]+"&skill="+all_info[1];
					var myWindow = window.open("", "", "width=700, height=600, scrollbars=yes");
					$.get(certificate_url, function( my_var ) {
						myWindow.document.write(my_var);
					});
				}
			}
		});
	}


    $instance.show_skillsettings_layer = function(skill_name) {
        //try{
        var title_str = 'You are following ' + skill_name;
        var tmp_html = '<div id="Skill_TB_overlay_in" style="display:none;"><h4>' + title_str + '</h4><p>Choose how often do you want new updates on this skill to be shared with you.<br /><small>(Do not worry - you can change it later as well!!)</small></p><div class="sklpg-stng-alrt"><form id="mail_settings_fm" class="form1" name="mail_settings_fm" method="post" action="" onsubmit="javascript:Tg_SkillPage.save_mail_alert(\'' + alert_master_id + '\',\'' + skill_id + '\'); return false;"><p class="clearfix"><label>Alert Frequency</label><span class="radio-input" style="display:inline-block; margin-right:20px;"><input type="radio" id="duration_W" name="mail_alert_dur" value="W" /> <label for="duration_W">Weekly</label></span><span class="radio-input" style="display:inline-block; margin-right:20px;"><input type="radio" id="duration_M" name="mail_alert_dur" value="M" /><label for="duration_M">Monthly</label></span><span class="radio-input" style="display:inline-block; margin-right:20px;"><input type="radio" id="duration_N" name="mail_alert_dur" value="N" /> <label for="duration_N">Never</label></span><span id="err_pass" class="error_msg" style="display:none;"></span></p></form></div><p><a id="submit_reg_fm" class="btn button1" href="javascript:void(0);" onclick="javascript:Tg_SkillPage.save_mail_alert(\'' + alert_master_id + '\',\'' + skill_id + '\');" >Save Settings</a></p></div>';

        $("body").append(tmp_html);

        if (mail_alert_dur) {
            $('#duration_' + mail_alert_dur).attr('checked', 'checked');
        } else {
            $('#duration_M').attr('checked', 'checked');
        }

        Tg_CommonFunction.open_div_html_modal('Settings', 'Skill_TB_overlay_in');

        //}catch(e){}
    }

    $instance.save_mail_alert = function(alert_master_id, skill_id) {
        try {
            mail_alert_dur = trim($('input:radio[name=mail_alert_dur]:checked').val());
            $("#err_pass").html('Saving...').show();
            var url = base_url + "/ajax_files/skill_pages_new.php?action=save_mail_alert";
			$('input:radio[name=mail_alert_dur]:checked').removeAttr('checked');
            $.post(url, {
                'alert_master_id': alert_master_id,
                'skill_id': skill_id,
                'mail_alert_dur': mail_alert_dur
            }, function(data) {
                if (data.length > 0) {
					$("input[name=mail_alert_dur][value=" + mail_alert_dur + "]").attr('checked', 'checked');
                    $("#TechGigbootStrapModal").modal('hide');
                    $("#err_pass").hide();
                }
            });
        } catch (e) {}
    }

    $instance._hide_thanks = function() {
        try {
            $("#Skill_TB_overlay, #follow_setting").fadeOut('slow').remove();
            /* if(cliked_follow == true){
            	var redurl = window.location+'';
            	var red_url = redurl.replace("?fs=Y", "");
            	red_url = red_url.replace("&fs=Y", "");
            	window.location = red_url;
            } */
        } catch (e) {}
    }

    $instance.loadMoreSkills = function(div_id, type) {
        var page = $('#page').val();
        $('#ancViewMore').hide();
        $('#ajax_status').html('<div class="tg-loader text-center"><img src="' + theme_url + '/images/TG-Loader.gif"></div>').show();

        var action_file_url = base_url + '/ajax_files/more_skils.php?type=' + type + '&page_no=' + page;
        $.get(action_file_url, function(data) {
            $('#ajax_status').hide();
            data = $.trim(data);
            if (data == 'no_record') {
                $('#ajax_status').html('No more skill to display.').show();
            } else {
                $('#' + div_id).append(data);
                page++;
                $('#page').val(page);
                $('#ancViewMore').show();
            }
        });
    }

    $instance.loadMoreTopCompanies = function(div_id, type) {
        var page = $('#page').val();
        $('#ancViewMore').hide();
        $('#ajax_status').html('<div class="tg-loader text-center"><img src="' + theme_url + '/images/TG-Loader.gif"></div>').show();

        var action_file_url = base_url + '/ajax_files/more_companies.php?type=' + type + '&page_no=' + page;
        $.get(action_file_url, function(data) {
            $('#ajax_status').hide();
            data = $.trim(data);
            if (data == 'no_record') {
                $('#ajax_status').html('No more featured companies to display.').show();
                $('#ancViewMore').hide();
            } else {
                $('#' + div_id).append(data);
                page++;
                $('#page').val(page);
                $('#ancViewMore').show();
            }
        });
    }

    $instance.loadMoreCompanies = function(div_id, type) {
        var page = $('#page').val();
        $('#ancViewMore').hide();
        $('#ajax_status').html('<div class="tg-loader text-center"><img src="' + theme_url + '/images/TG-Loader.gif"></div>').show();
        var action_file_url = base_url + '/ajax_files/more_other_companies.php?type=' + type + '&page_no=' + page;
        $.get(action_file_url, function(data) {
            $('#ajax_status').hide();
            data = $.trim(data);
            if (data == 'no_record') {
                $('#ajax_status').html('No more company to display.').show();
            } else {
                $('#' + div_id).append(data);
                page++;
                $('#page').val(page);
                $('#ancViewMore').show();
            }
        });
    }
	


    $instance.leadersStructure = function() {
        $.getScript(theme_url + "/javascript/jquery.carouFredSel-6.0.5-packed.js")
            .done(function() {
                $("#leader ul").carouFredSel({
                    responsive: true,
                    width: '100%',
                    circular: true,
                    infinite: false,
                    auto: true,
                    prev: $("#leader .previous-btn"),
                    next: $("#leader .next-btn"),
                    scroll: {
                        items: 1,
                        pauseOnHover: true,
                    },
                    items: {
                        width: 350,
                        height: 'variable',
                        visible: {
                            min: 1,
                            max: 4
                        }
                    }
                });
            })
            .fail(function() {
                console.log('Cycle not loaded');
            })

    }

    $instance.companyVideos = function() {
        $.getScript(theme_url + "/javascript/jquery.carouFredSel-6.0.5-packed.js")
            .done(function() {
                $('.company-videos .thumbnails ul').carouFredSel({
                    responsive: true,
                    width: '100%',
                    circular: true,
                    infinite: false,
                    auto: false,
                    scroll: 1,
                    prev: '.company-videos .previous-btn',
                    next: '.company-videos .next-btn',
                    items: {
                        width: 160,
                        visible: {
                            min: 2,
                            max: 6
                        }
                    }
                });
            })
            .fail(function() {
                console.log('Cycle not loaded');
            })

    }

};


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
		
		$.getScript(theme_url + "/javascript/chosen_jquery.min.js")
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
		
		// Showing Applied successfully message for external jobs
		$("#ext_ancApply").click(function() {
            $('.section-action').html('<a class="btn button1 btn-lg book-seat-btn disabled">APPLY</a><i class="fa fa-check green" aria-hidden="true"></i> Applied Successfully');
        });
		
		// Tj Connect PopUp Flow from Job detail page
		$("#tjconnect_job_apply").click(function() {
			var tjconnect_job_url = $(this).attr('data-url');
			setTimeout('$("#TechGigbootStrapModal .modal-body").html("<iframe src=' + tjconnect_job_url + ' width=\'550\' height=\'420\' frameborder=\'0\'></iframe>")', 2000);
        });
		
    }
	
	$instance.dropfilesBox = function() {
		$.getScript(theme_url + "/javascript/dropzone-min.js")
			.done(function() {
				//$("#dropfiles-box form").dropzone({ url: base_url+"/upload-resume.php" });

				//console.log('SUCCESS');
				//$('#upload_success_msg').html('Resume successfully uploaded!').show();
				
				var myDropzone = new Dropzone("#dropfiles-box form", { 
				url: base_url+"/upload-resume.php"
                //addRemoveLinks: true,
                });

				myDropzone.on("success", function(file,responseText) {
					var tmpResponse = responseText.split('||');
					var upload_status = tmpResponse[0];
					var upload_msg = tmpResponse[1];
					if(upload_status == 'success') {
						$('#upload_success_msg').html('Resume successfully uploaded!').show();
					} else {
						$('#upload_success_msg').html(upload_msg).show();
					}					
					 //console.log(file);
					 console.log(responseText);
					// var fileonserver = responseText; // response is the file on the server
					// file.name = fileonserver; // IF THIS ONLY WORKED i would solve my problem 
				});
				
				myDropzone.on("error", function(file,responseText) {
					 $('#upload_success_msg').html('Error While Uploading!').show();
					 console.log(file);
				});


				
			})
			.fail(function() {
				console.log('dropzone not loaded');
			});
	};
	
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
	
	$instance.save_user_mobile_num = function () {
		$('#error-msg').hide();
		$('#success-msg').hide();
		
		var mobile = trim($('#mobile').val());
		if(mobile == '') {
			$('#error-msg').html('Please enter your mobile number').show();
		} else if(isNaN(mobile) || mobile.length < 10 || mobile.length > 12) {
			$('#error-msg').html('Please enter valid mobile number').show();
		} else {	
			var action_block_name = 'save_user_mobile_number';
			$.post(base_url+"/general_ajax_task.php",{action: action_block_name, mobile: mobile},function(data) {
				data = $.trim(data);
				$('#error-msg').hide();
				$('#success-msg').hide();
				if(data == 'Y') {
					$('#success-msg').html('Saved Successfully.').show();
				} else {
					$('#error-msg').html('Some Error Occurred, Please try again.').show();
				}
			});
		}
		return false;
	}
	
	$instance.company_onblur = function(id) {
		  var company_name = trim(document.getElementById(id).value);
		  document.getElementById(id).value = company_name;
		  url = base_url + "/ajax/ajax_company_request_form.php?ajax_check=1&company_name="+escape(company_name);
		  Tg_CommonFunction.HTTPGet(url, $instance.company_onblur_response);
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
		$.getStylesheet(theme_url + "/jquery-ui.css")
		$.getScript(theme_url + "/javascript/jquery_ui.min.js")
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
			
			var loading_img_path = theme_url + '/images/preloader-rectpic.gif';
			
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

        $.getScript(theme_url + "/javascript/jquery_ui.min.js") 
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
						
						$('#master_apply_block').hide();
						$('#TechGigbootStrapModal .modal-header h4').hide();
						$('.success-popup').show();
						
						// Change String on Parent Window
						$('.section-action').html('<a class="btn button1 btn-lg book-seat-btn disabled">APPLY</a><i class="fa fa-check green" aria-hidden="true"></i> Applied Successfully');
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
							btn_txt_new = '<a href="javascript:void(0);" onclick="Tg_JobsLandingPage.add_company_mailer_content(\''+content_type+'\',\''+content_id+'\',\''+company_id+'\', 0);">Add to mailer template</a>';
							
							response = content_id + ' - Removed from mailer template';
						} else{
							btn_txt_new = '<a href="javascript:void(0);" onclick="Tg_JobsLandingPage.add_company_mailer_content(\''+content_type+'\',\''+content_id+'\',\''+company_id+'\', 1);">Remove from mailer template</a>';
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
	

};

/***
 * Javascript For Webinar Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 21 July, 2016
 */

Tg_WebinarPage = new function() {
    var $instance = this;

    $instance.init = function() {
        $('#a-see-more').click(function() {
            var atext = ($('#a-see-more').html()).toLowerCase();
            if (atext.indexOf('more') > 0) {
                $('#more_tags').show();
                $('#a-see-more').html('view Less');
            } else {
                $('#more_tags').hide();
                $('#a-see-more').html('view More');
            }
        });
		
		$('[data-toggle="tooltip"]').tooltip();
		
		$(".webinar-speaker-info .details .suggest-topic").click( function() {
			$(this).parent().find('.popover').fadeToggle();
		});
		
		$(document).on("click", function(event){
			var $trigger = $(".webinar-speaker-info .user-action-lnks");
			if($trigger !== event.target && !$trigger.has(event.target).length){
				$(".webinar-speaker-info .user-action-lnks .popover").fadeOut();
			}            
		});
		
		$("#ancSubsActivity").click( function() {
			var email = $('#subs_email').val();
			var act = $('#subs_act').val();
			
			var catg;
			catg = '';
			if($('#subs_catg').val() !== null){
				var subs_catg = $('#subs_catg').chosen().val();
				if(subs_catg != '') {
					$.each(subs_catg, function( key, value ) {
						catg += ','+value;
					});
					catg = catg.substring(1);
				}
			}	
			
			$("#frm-subs-act").removeClass( "has-error" );
			$(".error_msg").hide();
			
			if(email == '') {
				$('#email_error_msg').html('Please enter your email id');
				$('#email_error_msg').show();
				$('#email_error_msg').closest('li').addClass( "has-error" );
			} else {		
				var url = base_url + '/general_ajax_task.php?action=save_tg_activity_subscription';			
					$.post(url, {'email':email, 'act':act, 'catg':catg}, function(data){ 
						data = $.trim(data);
						if(data == 'EMPTYEMAIL') {
							$('#email_error_msg').html('Please enter your email id');
							$('#email_error_msg').show();
							$('#email_error_msg').closest('li').addClass( "has-error" );
						} else if(data == 'NVEMAIL') {
							$('#email_error_msg').html('Please enter valid email id');
							$('#email_error_msg').show();
							$('#email_error_msg').closest('li').addClass( "has-error" );
						} else if(data == 'INVALIDACT') {
							$('#subs_error_msg').html('Invalid Activity');
							$('#subs_error_msg').show();
							$('#subs_error_msg').closest('li').addClass( "has-error" );
						} else if(data == 'ALREADY_EXIST') {
							$('#subscribe-form .modal-body').html('<div class="alert alert-info text-center" role="alert" style="margin-bottom:0;><strong>You have already subscribed.</strong></div>');
							$('#subscribe-form').modal('show');
						}  else {
							$('#subscribe-form .modal-body').html('<div class="alert alert-success text-center" role="alert" style="margin-bottom:0;"><strong>Thank you for subscribing to TechGig Updates.</strong></div>');
							$('#subscribe-form').modal('show');
						}				
						setTimeout(function() {
							//$('#subscribe-form').modal('hide').slow();
							$('#subscribe-form').modal('hide');
						}, 5000);
				});
			}
		});
		
    }
	
	$instance.readTranscription = function() {
		$('#TechGigbootStrapModal .modal-dialog').addClass('modal-lg');
		 $.getScript(theme_url + "/javascript/jquery.cycle.all.js")
            .done(function() {
                $('#read-transcription .slides').cycle({
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
					prev: '#read-transcription .direction-nav a.previous-btn',
					next: '#read-transcription .direction-nav a.next-btn'
				});
            })
            .fail(function() {
                console.log('readTranscription cycle not loaded');
            })
        
    };

	$instance.changePPTTxtMsg = function(id, src) {
		var isVisible = $('#url_video_block_'+id).is(':visible');
		var tmpId = 'url_video_block_'+id;
		
		if(!isVisible) {
			$('#'+tmpId).show();
			show_video(tmpId, src);
			$('#slideshare_ppt_hide').show();
			$('#show_hide_txt').html('Hide PPT');
		} else {
			$('#show_hide_txt').html('View PPT');
			$('#'+tmpId).hide();
		}
	
	}
	
	$instance.show_video = function(cont_box, v_src) {
		if(v_src){
		isIE6 = /msie|MSIE 6/.test(navigator.userAgent); 

		if(isIE6) {
			var video_elt = document.createElement('embed');
			$(video_elt).attr({'type':'application/x-shockwave-flash','src':v_src,'allowscriptaccess':'never','allowfullscreen':'false','width':'400','height':'332','wmode':'transparent'});
			$('#'+cont_box).html(video_elt);
		} else {
			$('#'+cont_box).html("<object width='400' height='332'><param name='movie' value='"+v_src+"'></param><param name='allowfullscreen' value='false'></param><param name='allowscriptaccess' value='never'></param><embed type='application/x-shockwave-flash' src='"+v_src+"' allowscriptaccess='never' allowfullscreen='false' width='400' height='332' wmode='transparent'></embed></object>");
		}
		
		//$('#'+cont_box).css({'float':'none'}); // commented by AB
			//$('#'+cont+' a').hide();
			//alert($('#'+cont_box).html());
		}
	}
	
	$instance.hide_upcoming_thanks = function(id_cnt) {
		$("#News_TB_overlay, #ys-no-bx").remove();
		if(id_cnt){
			$("#express_interest_"+id_cnt).html("Launch Webinar");
			$("#job_webinar_msg_"+id_cnt).show();			
		}
	}

	
	$instance.save_expertspeak_suggestion_to_speaker = function(expert_id, speaker_name, from_webinar_id, status) {
		try {
			var spkr_suggested_topic_name = $('#spkr_suggested_topic').val();
			spkr_suggested_topic_name = $.trim(spkr_suggested_topic_name);
			if(spkr_suggested_topic_name.length == 0) {
				alert('Suggest a topic first.');
				return false;
			}
			
			var url = base_url+"/ajax_files/follow_webinar_expert.php?action=expertspeak_suggestion_to_speaker";
			$.post(url,{'expert_id':expert_id, 'status':status, 'speaker_name':speaker_name, 'from_webinar_id':from_webinar_id, 'topic_name':spkr_suggested_topic_name},function(data) {
			
				data = trim(data);
				if(data.length > 0) {
					if(data == 'Y') {
						$('#spkr_topic_suggestion_response').hide();
						$('#spkr_topic_suggestion_submit').hide();
						$('#spkr_topic_suggestion_response_msg').html('Thankyou for your suggestion.').show();
					}
				}
			});
			
		}catch(e){}
	}
	
	$instance.follow_webinar_expert = function(module_id, expert_id, speaker_name, webinar_id, status) {
		try {

			var url = base_url+"/ajax_files/follow_webinar_expert.php?action=follow_expert";
			$.post(url,{'expert_id':expert_id, 'status':status, 'speaker_name':speaker_name, 'webinar_id':webinar_id},function(data) {
				//alert(data);
				if(data.length > 0) {
					$('#follow_expert_'+webinar_id).html(data);
				}
			});
			
		}catch(e){}
	}
	
	$(".follow_user").click(function() {
            var user_id = $(this).data('user_id');
            var follower_id = $(this).data('follower_id');
            var action_type = $(this).data('action_type');
            var follow_val = $(this).text();
			console.log(user_id,follower_id,action_type,follow_val);
			var tmp_id = 'user_'+action_type+'_'+user_id;
			var tmp_id2 = 'user_'+action_type+'_count_'+user_id;
            var url = base_url+"/ajax_files/follow_webinar_expert.php?action=follow_tg_user";
			$.post(url,{'user_id':user_id, 'action_type':action_type, 'follower_id':follower_id, 'follow_val':follow_val},function(data) {
				data = trim(data);
				var divs = data.split('##');
				if(data.length > 0) {
					$('#'+tmp_id).text(divs[0]);
					$('#'+tmp_id2).text(divs[1]);
				}
			});
    });
	
	$instance.load_webinar_register = function(url) {
		$('#webinar-register').modal('show');
		$('#webinar-register .modal-body').load(url, function(e){
			
		});					
	}
	
	$instance.imageLoad = function() {
			var image = new Image();
			image.onload = function(){
				// The user can access youtube
			};
			image.onerror = function(){
				// The user can't access youtube
				$("#_video_txt, #_video_bx").hide();
				$("#no_video_txt").show();
			};
			image.src = "https://youtube.com/favicon.ico";
	} 
	
	$instance.TopSpeakers = function() {
        $.getScript(theme_url + "/javascript/jquery.carouFredSel-6.0.5-packed.js")
            .done(function() {
                $('#top-speakers ul').carouFredSel({
                    responsive: true,
                    width: '100%',
                    circular: true,
                    infinite: false,
                    auto: true,
                    scroll: 1,
                    items: {
                        width: 350,
                        height: 'variable',
                        visible: {
                            min: 1,
                            max: 4
                        }
                    }
                });
            })
            .fail(function() {
                console.log('carouFredSel not loaded');
            })
    };
	
	$instance.attendingPeoples = function() {
        $.getScript(theme_url + "/javascript/jquery.carouFredSel-6.0.5-packed.js")
            .done(function() {
                $('.webinar-details .attending-peoples ul').carouFredSel({
							responsive: true,
							width: '100%',
							circular: true,
							infinite:false,
							auto : true,
							prev: {
						   button  : ".webinar-details .attending-peoples a.previous-btn"
					},
					next: {
						   button  : ".webinar-details .attending-peoples a.next-btn"
					},
							scroll: { items:2,duration: 1000},
							items: {
								width: 100,
								height: 'variable',
								visible: {
									min: 2,
									max: 6
								}
							}
				});
            })
            .fail(function() {
                console.log('carouFredSel not loaded');
            })
    };
	
};

/***
 * Javascript For Winners Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 21 July, 2016
 */

Tg_WinnersPage = new function() {
    var $instance = this;

    $instance.init = function() {
        $.getScript(theme_url + "/javascript/jquery_ui.min.js")
            .done(function() {
                $(".winners-accordion").accordion({
                    heightStyle: "content"
                });
            })
            .fail(function() {
                console.log('Accordion not loaded');
            })

        $(".show_winners").click(function() {
            var season_id = $(this).data('season_id');
            var number = $(this).data('number');
            $('#show_list_' + number).html('<div class="tg-loader text-center"><img src="' + theme_url + '/images/TG-Loader.gif"></div>');
            var action_url = base_url + '/ajax_files/assessment_winners.php';
            $.ajax({
                type: "POST",
                url: action_url,
                data: {
                    season_id: season_id
                },
                success: function(data) {
                    data = $.trim(data);
                    $('#show_list_' + number).html(data);
                }
            });
        });
		
		$(".winner-box footer .view-area .btn").click(function(){ 

			if($(this).html() == 'View more Winners'){
				
				$(".winner-box .regular-winner").fadeOut();
				$(this).parents(".winner-box").find('.regular-winner').fadeIn();
				
				$(".winner-box footer .view-area .btn").html('View more Winners');
				$(this).html('show less winners');
				
			}else{
				
				$(".winner-box footer .view-area .btn").html('View more Winners');
				$(".winner-box .regular-winner").fadeOut();
				
			}
			
			return false;
	
		});

        $(".accordion-head").click(function() {
            var season_id = $(this).data('season_id');
            var number = $(this).data('number');
            $('#show_list_' + number).html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>');
            var action_url = base_url + '/ajax_files/assessment_winners.php';
            $.ajax({
                type: "POST",
                url: action_url,
                data: {
                    season_id: season_id
                },
                success: function(data) {
                    data = $.trim(data);
                    $('#show_list_' + number).html(data);
                }
            });
        });

    }

    $instance.winTabs = function(obj, elem) {
        $(".cc-winners-wrp").hide();
        $("#" + elem).show();
        $("#win_tabs li a").removeClass("sel");
        $(obj).addClass("sel");
    }

    $instance.subTabs = function(tab_id, div_id, id) {
        $("#" + div_id).show();
        $("#" + tab_id).css({
            color: "#333",
            background: "#eee"
        });
        if (tab_id == 'overall_top_tab_' + id) {
            $("#daily_ref_" + id).hide();
            $("#daily_ref_tab_" + id).css({
                color: "#006B9C",
                background: "none"
            });
        } else if (tab_id == 'daily_ref_tab_' + id) {
            $("#overall_top_" + id).hide();
            $("#overall_top_tab_" + id).css({
                color: "#006B9C",
                background: "none"
            });
        }
    }

};




/***
 * Javascript For Leaderboard Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 22 July, 2016
 */

Tg_LeaderboardPage = new function() {
    var $instance = this;

    $instance.init = function() {
	
	 $("#from_topper_score, #to_topper_score, #from_topper_rank, #to_topper_rank").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
	
	
        $("#search-filter .advanced-btn").click(function() {
            $("#search-filter .form-elements .off").toggle();
            if ($(this).hasClass("active")) {
                if ($(this).text() == 'Show Less') {
                    $(this).html("advance search");
                } else {
                    $(this).html("Show Less");
                }
            } else {
                if ($(this).text() == 'Show Less') {
                    $(this).html("advance search");
                } else {
                    $(this).html("Show Less");
                }
            }
            return false;
        });

        $('#search-companies').keyup(function() {
            var valThis = $(this).val().toLowerCase();
            $('#participants-top-companies .filter-list-items>li').each(function() {
                var text = $(this).text().toLowerCase();
                (text.indexOf(valThis) == 0) ? $(this).show(): $(this).hide();
            });
        });

        $('#search-institutes').keyup(function() {
            var valThis = $(this).val().toLowerCase();
            $('#participants-top-institutes .filter-list-items>li').each(function() {
                var text = $(this).text().toLowerCase();
                (text.indexOf(valThis) == 0) ? $(this).show(): $(this).hide();
            });
        });

    }

    $instance.LoadTQleaderboard = function() {
        var page = $('#TQleaderboardPage').val();
        var pageSize = $('#PageSize').val();
        var queryString = $('#query_string_url').val();
        $('#TQleaderboard').hide();
        $('#ajax_tq_leaderboard').html('<td colspan="4" align="center"><div class="tg-loader text-center"><img src="' + theme_url + '/images/TG-Loader.gif"></div></td>').show();
        var action_file_url = base_url + '/ajax_files/assessment_tq_leader.php?page_no=' + page;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({
                queryString: queryString,
                pageSize: pageSize
            }),
            async: false,
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#ajax_tq_leaderboard').html('<td colspan="4" align="center">No more users to display.</td>');
                    $('#TQleaderboard').hide();
                } else {
                    $(data).insertBefore('.ajax_tq_leaderboard');
                    page++;
                    $('#TQleaderboardPage').val(page);
                    $('#ajax_tq_leaderboard').hide();
                    $('#TQleaderboard').show();
                }
            }
        });
    }

    //tq leader board search
    $instance.validateSearchForm = function() {
        var skill_id = $.trim($('#skill_id').val());
        var season_id = $.trim($('#season_id').val());
        var from_topper_rank = $.trim($('#from_topper_rank').val());
        var to_topper_rank = $.trim($('#to_topper_rank').val());
        var from_topper_score = $.trim($('#from_topper_score').val());
        var to_topper_score = $.trim($('#to_topper_score').val());
        var company = $.trim($('#company').val());
        var first_name = $.trim($('#first_name').val());
        var institute1 = $.trim($('#institute1').val());
        var city_combo = $.trim($('#city_combo').val());

        if (skill_id == 0 && season_id == '' && from_topper_rank == '' && to_topper_rank == '' && from_topper_score == '' && to_topper_score == '' && company == '' && first_name == '' && institute1 == '' && city_combo == '') {
            alert('Please enter atleast one criteria to search');
            $('#skill_id').focus();
            return false;
        }
        return true;
    }

};


/***
 * Javascript For Signup/Login Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 27 July, 2016
 */

Tg_SignupLoginPage = new function() {
    var $instance = this;

    $instance.init = function() {
		
    };


};


/***
 * Javascript For Company Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 29 July, 2016
 */

Tg_CompanyPage = new function() {
    var $instance = this;

    $instance.init = function() {

    }
	
	// new registration
	$instance.add_city_by_country_new = function(selected_value, selected_city, class_name) {
	get_data = "country="+escape(selected_value)+'&selected_city='+escape(selected_city)+'&select_id=city_combo&class_name='+class_name;
	 $.ajax({
		   type: "GET",
		   url: base_url+"/ajax_files/city_list_new.php",
		   data: get_data,
		   success: function(msg) {
		   msg = trim(msg);
			if(msg) {
				$('#add_city').show();
				$('#add_city').html(msg);
				$('#add_other_city').hide();
				if(from_where == 'register'){
					$('#city_combo').attr({'tabindex':5});
				}
				$instance.checkIfOtherCity_new('city_combo');
			} else {
				$('#add_other_city').show();
				$('#add_city').html('');
				$('#add_city').hide();
			}
		  }
		});
	   
	}
	
	$instance.validateEmail = function ($email) {
	  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	  return emailReg.test( $email );
	}
	
	$instance.validate_lead_form = function () {
		var cont_box = trim($('#cont_box').val());
		var v_src = trim($('#v_src').val());
		var cid = trim($('#cid').val());
		var type = trim($('#type').val());
		
		var name = trim($('#name').val());
		var email = trim($('#email').val());
		var mobile = trim($('#mobile').val());
		var designation = trim($('#designation').val());
		var company_name = trim($('#company_name').val());
		
		if(name == '') {
			$('#error-msg').html('Please enter your name');
		} else if(email == '') {
			$('#error-msg').html('Please enter your emailid');
		} else if(!validateEmail(email)) {
			$('#error-msg').html('Please enter valid email id');
		} else if(mobile == '') {
			$('#error-msg').html('Please enter your mobile number');
		} else if(isNaN(mobile) || mobile.length < 10 || (mobile.substring(0,1) != 9 && mobile.substring(0,1) != 8 && mobile.substring(0,1) != 7)) {
			$('#error-msg').html('Please enter valid mobile number');
		} else if(designation == '') {
			$('#error-msg').html('Please enter your designation');
		} else if(company_name == '') {
			$('#error-msg').html('Please enter your company name');
		} else {	
			var action_block_name = 'save_companypage_access_lead';
			$.post(base_url+"/general_ajax_task.php",{action: action_block_name, cid: cid, type: type, custom_id: cont_box, name: name, email: email, mobile: mobile, designation: designation, company_name: company_name},function(data) {
				data = $.trim(data);
				var arr_data = data.split("##");
				var status = arr_data[0];
				var msg = arr_data[1];			
				
				$('#error-msg').hide();
				if(status == 'Y') {
					
					//parent.$.colorbox.close();
					$("#doc-access").modal('hide');
					if(download == 'newpage') {					
						window.open(v_src,"_blank");
					} else {
						show_google_doc(cont_box, v_src);
					}	
				} else if(status == 'N') {
					$('#error-msg').html(msg).show();
				} else {
					$('#error-msg').html('Some Error Occurred, Please try again').show();
				}
			});
		}
		return false;
	}

	$instance.checkIfOtherCity_new = function(obj) {
		var city_val = $("#"+obj).val();
		var city_val_arr = city_val.split(' ');
		var other_val = '';
		for(var i in city_val_arr){
			if(city_val_arr[i] == 'Other' || city_val_arr[i] == 'Others'){
				other_val = 'Others';
				break;
			}
		}
		if(other_val == 'Others'){
			$('#add_other_city').show();
		}else{
			$('#add_other_city').hide();
			$('#add_other_city input').val('');
		}
	}
	
	$instance.change_role_by_fa_profile = function(mfa_id, container_width, selected_role) {
	  url = base_url + "/ajax/role_by_fa.php?mfa_id="+mfa_id + '&container_width='+container_width+ '&selected_role='+selected_role;
	 
	  $('#role_by_sfa_blk dfn').html('<span class="color">loading ...</span>');//.load(url);
		$.get(url, function(data){
			data= data.trim();
			if(data){
				$('#role_by_sfa_blk dfn').html(data);
				$('#add_role_by_sfa_blk').hide();
				$('#other_role_by_sfa_blk').hide();
				$('#role_by_sfa_blk').show();
				$('#role_type').val('role');
				check_role_value('role_select');
			}else{
				$('#role_by_sfa_blk').hide();
				$('#other_role_by_sfa_blk').hide();
				$('#add_role_by_sfa_blk').show();
				$('#role_type').val('add_role');
			}
		});
	}

	
	$instance.follow_entity_user = function(entity_id, user_id, type, entity_type, status) {
            
		if(user_id == '' || user_id <= 0) {
			alert('Please login first for following.');
			return false;
		}
		try{
			
			Tg_SkillPage._hide_thanks();
			cliked_follow = true;
		
			var url = base_url+"/ajax_files/follow_entity.php";
			
			$.post(url,{'entity_id':entity_id,'user_id':user_id,'type':type,'entity_type':entity_type,'status':status},function(data){
				data = trim(data);
				if(data.length > 0) {
					if(data != 'Y' && data != 'N') {						
						alert(data);
						return false;
					}
					if($.trim(status) == 'Y'){
						
						$('#follow-company-bx_user').hide();
						$('#following-setting-box_user').show();
						var temp_cnt = parseInt($('#comp_follow_cnt_inp_user').val());
						var cnt_up = temp_cnt + 1;
						if(parseInt(cnt_up) > 1) {
							cnt_up = cnt_up+' Followers';
						} else {
							cnt_up = cnt_up+' Follower';
						}					
						
						$('#comp_follow_cnt_inp_user').val(cnt_up);
						$('#comp_follow_cnt_user').html(cnt_up);
						// show popup
						$('#follow_setting_btn_user').click();
					}else{
						$('#following-setting-box_user').hide();
						$('#follow-company-bx_user').show();
						var temp_cnt = parseInt($('#comp_follow_cnt_inp_user').val());
						var cnt_up = temp_cnt - 1;
						if(cnt_up < 0){
							cnt_up = 0;
						}
						if(parseInt(cnt_up) > 1) {
							cnt_up = cnt_up+' Followers';
						} else {
							cnt_up = cnt_up+' Follower';
						}
						$('#comp_follow_cnt_inp_user').val(cnt_up);
						$('#comp_follow_cnt_user').html(cnt_up);
					}					
				}
			});
			
		}catch(e){
			console.log(e);
		}
	}

    $instance.UoloadUpdates = function() {
        try {
            $(function() {
                var btnUpload = $('#upload');
                var status = $('#status');
                var fileUploadPath = base_url + '/files/wall_upload/';

                groupId = (typeof groupId === "undefined") ? "" : groupId;

                new AjaxUpload(btnUpload, {
                    //action: base_url+'/upload-file.php?groupid='+groupId+'&type='+uploadType,
                    action: base_url + '/user_wall_upload-file.php?groupid=' + groupId,
                    name: 'uploadfile',
                    onSubmit: function(file, ext) {
                        var photoBlock_visibility = $('#upload_block').css('display');
                        var uploadType = '';
                        if (photoBlock_visibility == 'block') {
                            uploadType = 'photo';
                        }

                        try {
                            var uploadDataType = $('#attach_link_block_type').val();
                            //alert(uploadType+"=="+uploadDataType);
                        } catch (err) {
                            //alert(err);
                        }

                        //alert(photoBlock_visibility+'=='+ext);
                        if (uploadDataType == 'photo') {
                            if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext))) {
                                status.text('File can not be uploaded, you are allowed to upload image with only jpg,jpeg,png or gif extensions.');
                                return false;
                            }
                        } else if (uploadDataType == 'doc') {
                            if (!(ext && /^(doc|docx|xls|xlsx|pdf|ppt|pptx)$/.test(ext))) {
                                // extension is not allowed 
                                status.text('File can not be uploaded, you are allowed to upload documents with only doc,docx,xls,xlsx,pdf,ppt,pptx extensions.');
                                return false;
                            }
                        }

                        status.text('Uploading...');
                    },
                    onComplete: function(file, response) {
                        var tmpData = response.split('||');

                        //On completion clear the status
                        status.text('');
                        //Add uploaded file to list
                        if (tmpData[0] === "success") {

                            $('#url_data_loader').show();

                            if (tmpData[2] == 'photo') {
                                var filename = base_url + tmpData[1].replace(".", "");

                                $('#url_data_loader').html('<img src="' + filename + '" width="200" alt="" />');
                                isLinkBlock = true; // AB
                                photoUpload = true; // AB
                                uploadedPhotoUrl = tmpData[1]; // AB
                            } else if (tmpData[2] == 'doc') {
                                $('#url_data_loader').html(file + ' has been successfully uploaded.').addClass('success');
                                isLinkBlock = true; // AB
                                docUpload = true; // AB
                                uploadedDocUrl = tmpData[1]; // AB
                            } else {
                                //alert('I M CALLED...');
                            }
                            document.getElementById('shareList_subBtn').disabled = false;
                            $('#shareList_subBtn').removeClass('gsbmt-dis flr mrtp7').addClass('gsbmt flr mrtp7');
                        } else {
                            //alert('Failure..');
                            $('#url_data_loader').html('Error Uploading Data.');
                        }
                    }
                });
            });
        } catch (err) {
            //alert(err);
        }
    };

    $instance.unDoDocPhotoUploadFlag = function() {
        photoUpload = false;
        docUpload = false;
    };

    $instance.show_wall_video = function(cont_box, v_src, v_width, v_height, title) {

        if (typeof(v_width) === 'undefined') v_width = '400';
        if (typeof(v_height) === 'undefined') v_height = '332';

        if (v_src) {
            isIE6 = /msie|MSIE 6/.test(navigator.userAgent);

            if (isIE6) {
                var video_elt = document.createElement('embed');
                $(video_elt).attr({
                    'type': 'application/x-shockwave-flash',
                    'src': v_src,
                    'allowscriptaccess': 'never',
                    'allowfullscreen': 'false',
                    'width': v_width,
                    'height': v_height,
                    'wmode': 'transparent'
                });
                $('#' + cont_box).html(video_elt);
                $('#custom-title').html(title);
            } else {
                $('#' + cont_box).html("<iframe src='" + v_src + "' width='" + v_width + "' height='" + v_height + "' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px' allowfullscreen=''> </iframe>");
                $('#custom-title').html(title);
            }

        }
    }

    $instance.showMsgMore = function(discussionMoreId, msgId) {
        document.getElementById(discussionMoreId).style.display = 'block';
        var initId = 'show_init_msg_' + msgId;
        document.getElementById(initId).style.display = 'none';
    };
	
	$instance.companyFollowers = function() {
		 $.getScript(theme_url + "/javascript/jquery.carouFredSel-6.0.5-packed.js")
            .done(function() {
                $('#company-followers ul').carouFredSel({
					responsive: true,
					width: '100%',
					circular: true,
					infinite:false,
					auto : true,
					scroll: 2,
					prev : "#company-followers .previous-btn",
					next : "#company-followers .next-btn",
					items: {
						width: 250,
						height: 'variable',
						visible: {
							min: 1,
							max: 5
						}
					}
				});

            })
            .fail(function() {
                console.log('companyFollowers not loaded');
            })
        
    };
	
	$instance.costomPhotos = function() {
		 $.getScript(theme_url + "/javascript/jquery.cycle.all.js")
            .done(function() {
                $('.gallery .preview .slides').cycle({
					slideExpr: '.slide',
					cleartypeNoBg: ' true' ,
					fx: 'fade',
					timeout: 0,
					fit: 1,
					slideResize: 0,
					containerResize:0,
					height:'auto',
					width:null,
					pager: '.gallery .thumbnails ul',
						pagerAnchorBuilder: function(idx, slide) {
							return '.gallery .thumbnails li:eq(' + (idx) + ')';
						}
				});
            })
            .fail(function() {
                console.log('companyFollowers not loaded');
            })
        
    };

};


/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Steps Page
 * 
 * Author   : Sebin Baby
 * Created  : 29 July, 2016
 */

Tg_StepsPage = new function() {
    var $instance = this;

    $instance.init = function() {
		
        $(document).on("click", ".professional-check", function() {

            var obj = $('input[id^=professional-check]');
            var selectedSkillList = '';
            var selectedRoleList = '';

            for (i = 0; i < obj.length; i++) {
                if (obj[i].type == "checkbox" && obj[i].checked == true) {
                    var skill_id_name = obj[i].id;

                    var skill_id = skill_id_name.replace("professional-check-", "");

                    var skills = $("#professional-skills-" + skill_id).val();
                    var roles = $("#professional-check-" + skill_id).val();

                    if (skills != '') {
                        if (selectedSkillList == "") {
                            selectedSkillList = skills;
                            selectedRoleList = roles;
                        } else {
                            selectedSkillList = selectedSkillList + ',' + skills;
                            selectedRoleList = selectedRoleList + ',' + roles;
                        }
                    }
                }
            }
            $("#role_matching_skill_block").html('');

            //populate skills
            if (selectedSkillList != '') {
                var selectedSkill_array = selectedSkillList.split(',');
                $.each(selectedSkill_array, function(index, item) {
                    if (item != '') {
                        $("#role_matching_skill_block").show();
                        $("#role_matching_skill_block").append('<span class="checkbox active"><input id="check-' + item + '" type="checkbox" name="check" value="' + item + '" checked><label for="check-' + item + '">' + item + '</label></span>');
                    }
                });

                // Assign Role and Skill Values in hidden Field
                $('#role_names').val(selectedRoleList);
                $('#skill_names').val(selectedSkillList);
            }

        });

        // Calling Default Selected Skill Showing Function
        defaultskillcheck();

        function defaultskillcheck() {

            var obj = $('input[id^=professional-check]');
            var selectedSkillList = '';
            var selectedRoleList = '';

            for (i = 0; i < obj.length; i++) {
                if (obj[i].type == "checkbox" && obj[i].checked == true) {
                    var skill_id_name = obj[i].id;

                    var skill_id = skill_id_name.replace("professional-check-", "");

                    var skills = $("#professional-skills-" + skill_id).val();
                    var roles = $("#professional-check-" + skill_id).val();

                    if (skills != '') {
                        if (selectedSkillList == "") {
                            selectedSkillList = skills;
                            selectedRoleList = roles;
                        } else {
                            selectedSkillList = selectedSkillList + ',' + skills;
                            selectedRoleList = selectedRoleList + ',' + roles;
                        }
                    }
                }
            }
            $("#role_matching_skill_block").html('');

            //populate skills
            if (selectedSkillList != '') {
                var selectedSkill_array = selectedSkillList.split(',');
                $.each(selectedSkill_array, function(index, item) {
                    if (item != '') {
                        $("#role_matching_skill_block").show();
                        $("#role_matching_skill_block").append('<span class="checkbox active"><input id="check-' + item + '" type="checkbox" name="check" value="' + item + '" checked><label for="check-' + item + '">' + item + '</label></span>');
                    }
                });

                // Assign Role and Skill Values in hidden Field
                $('#role_names').val(selectedRoleList);
                $('#skill_names').val(selectedSkillList);
            }

        }

        $(document).on("click", "#professional-skills .checkboxes .checkbox label", function() {


            //$(this).parent().toggleClass("active");

            if ($(this).parent().hasClass("active")) {
                $(this).parent().removeClass("active").find(".next-btn").show();
            } else {
                $(this).parent().addClass("active").find(".next-btn").hide();
            }

            var matches = [];
            $("#professional-skills .checkboxes .checkbox.active").each(function() {
                var inputValue = $(this).closest(".checkbox").find("input[name='check']").val();
                matches.push(inputValue);
            });
            var company_ids = matches.join();
            $('#skill_names').val(company_ids);

        });

        $('#professional-role .checkboxes .checkbox label').click(function() {
            $(this).parent().toggleClass("active");

            if ($("#professional-role .checkboxes .checkbox").hasClass("active")) {
                $("#professional-role").addClass("active").find(".next-btn").show();
            } else {
                $("#professional-role").removeClass("active").find(".next-btn").hide();
            }

        });

        $(".section1").innerHeight($(window).height() - ($("#header").innerHeight() + $("#secondary-nav").innerHeight()));

        $(window).resize(function() {
            $(".section1").innerHeight($(window).height() - ($("#header").innerHeight() + $("#secondary-nav").innerHeight()));
        }); 
		
		$.getScript(theme_url + "/javascript/ajax_captcha.js")
            .done(function() {
                console.log('ajax_captcha loaded');
            })
            .fail(function() {
                console.log('ajax_captcha not loaded');
            })

    };
	
	
	$instance.SendingEmail = function(_name, _mail_id, user_message,_captcha_check, obj, from_email_id) {
		var _fw = $.trim('register_fb');
		$('.invt-error, .invt-success').remove();	
		$('#inviteCButton').attr('disabled','disabled');
		$('#inviteCButton').attr('value','Sending...'); 
		
		if(_captcha_check==undefined) {
		  _captcha_check='';
		}
		
		if(_mail_id){
			var _inv_ajax_url = base_url+'/ajax_files/send_invitation.php?action=send_external_mail';
			
			$.post(_inv_ajax_url, {'_name':_name,'_mail_id':_mail_id,'user_message':user_message,'captcha_check':_captcha_check,'sender_email_id':from_email_id}, function(data) {
				
				
				$('#inviteCButton').attr('value','Send Invites');
				$('#inviteCButton').removeAttr('disabled');
				$('.invt-success').remove();
				
				
				if(from_email_id) {
			
					if(data==4) {
						$('#'+obj+' span#invt-frnt-sent').html('<span class="invt-error invt-success">Already sent!</span>').find('.invt-frnt-btn').hide();
						$('<span class="invt-error invt-success">Already sent!</span>').insertAfter($('#sender_email_id'));
						
						//refresh_captcha();
					} else if(data==3) {
						$('#'+obj+' span#invt-frnt-sent').html('<span class="invt-error invt-success">Limit exceed!</span>').find('.invt-frnt-btn').hide();
						$('<span class="invt-error invt-success">Limit exceed!</span>').insertAfter($('#sender_email_id'));
						
					} else if(data==2) {
						$('#verificationCodeError').show();
						$('#verificationCodeError').html('<span class="invt-error" style="float: left;">Verification code you entered did not match. Please try again.</span>');
						
					} else if(data==1) {
						
						if(_captcha_check == 'gmail') {
							$('#'+obj).prepend('<span class="invt-success">Invite Sent!</span>').find('#invt-frnt-btn').hide();
							$('<span class="invt-error invt-success">Invite Sent Successfully!!</span>').insertAfter($('#sender_email_id'));
														
						} else {
							$('.msgErrortop .message-box').addClass('success-msg').find('p').text('Invite Sent Successfully!!'); 
							Tg_CommonFunction.clearMessage();
						}
						$("#sender_email_id").val("");
					}
				
				} 
				
			}); 
		}
		
	}
	
	$instance.send_custom_emails = function() {
		
		var cnt =parseInt('5');
        var sender_email_id=$.trim($('#sender_email_id').val());
		var senderEmail = $.trim($('#from_email_id').val());
		var emailArray = sender_email_id.split(',');
		var uniqueArray = $.unique(emailArray)
		var txtCaptcha = '';
		var message = '';
		$('.error_msg').remove();
		for(var i=0; i<=uniqueArray.length; i++){
			var senderEmailId = uniqueArray[i];
			senderEmailId = (typeof senderEmailId === "undefined") ? "" : senderEmailId;
			if(!$instance.is_valid_email(senderEmailId)){
				
				if(senderEmailId!=''){
					$('.msgErrortop .message-box').addClass('error-msg').find('p').text(senderEmailId+" Invalid email id"); 
					Tg_CommonFunction.clearMessage();
					$('#sender_email_id').focus();
					return false;
				}
			} else { 
				var nameArray = senderEmailId.split('@');
				var _name = nameArray[0];
				$instance.SendingEmail(_name, senderEmailId, message, txtCaptcha, 'custom', senderEmail);
				
			}
			
		}
	}
	
	$instance.is_valid_email= function(email) {
		var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
		
		if(!pattern.test(email)){
			return false;
		} else{
			return true;
		}
	}
	
	$instance.skillSet = function(prePopulate) {
		
		$.getScript(theme_url + "/javascript/jquery.tokeninput.js")
			.done(function() {
				$("#skill_set").tokenInput(base_url + "/ajax/autocomplete.php?autocomplete=tokeninput&type=technology_tags", {
					theme: "facebook",
					class: "form-control",
					width: 100,
					tabindex: 13,
					maxlength: 30,
					placeholder: 'Your skills...',
					prePopulate: [prePopulate]						
				});
				
			})
			.fail(function() {
				console.log('tokeninput not loaded');
			});
	}
	
		
	$instance.validateInviteRequest= function() {
		$('.invt-success').remove();
		$('.error_msg').remove();
		var senderEmail = '';		
		senderEmail = $("#sender_email_id").val();
		senderEmail = (typeof senderEmail === "undefined") ? "" : senderEmail;
		if($.trim(senderEmail)==""){
			$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Please enter email id\'s of your friends.'); 
			Tg_CommonFunction.clearMessage();
			return false;	
			
		} else {
			$instance.send_custom_emails();
		}
	
	}


	$instance.validateCurrentStatus= function() {
		
		var current_status = $('input[name=current_status]:checked').val();
		current_status = (typeof current_status === "undefined") ? "" : current_status;
		var action_block_name = 'update_tg_user_additional_data';
        var action_url = base_url + "/general_ajax_task.php";
		
		if(current_status == ''){
			$("#tmp_msg").css('display','none');
			$("body").prepend('<div class="msgErrortop" id="tmp_msg"><div class="error-msg">Please select your current status.</div></div>');
			return false;
		} else {
			$("#tmp_msg").css('display','none');
			$("html, body").animate({ scrollTop: 0 }, 1000);
		}
		
		$.post(action_url,{action: action_block_name, current_status: current_status},function(data){
					// Reload the window
					if(current_status=='student'){
						$(".student-icon").addClass("active");
					} else if(current_status=='professional'){
						$(".professional-icon").addClass("active");
					}
					setTimeout(function () {  location.reload() }, 100);
					
					/*$("body").addClass("signup-steps-page");
					$("#user-confirmation").hide();
					
					$("#signup-steps").show();	
					if(current_status=='student'){
						$("#profile-company-name_tab").hide();
						$("#profile-job-title_tab").hide();
						$("#profile-experience_tab").hide();
						$("#profile-company-name").hide();
						$("#profile-job-title").hide();
						$("#profile-experience").hide();
						$("#profile-institute-info_tab").addClass("active");
						$("#profile-institute-info").addClass("active");
					} else if(current_status=='professional'){
						$("#profile-company-name").addClass("active");
						$("#profile-graduation-info_tab").hide();
						$("#profile-graduation-info").hide();
						$("#profile-degree-info_tab").hide();
						$("#profile-degree-info").hide();
						
					}*/
			})
		
		
    };
	
	$instance.validateSignupSteps= function(requestType, user_category) {

		var user_profile_status;
		user_profile_status = (typeof user_category === "undefined") ? "" : user_category;
		var current_status = $("#current_status").val();
		current_status = (typeof current_status === "undefined") ? "" : current_status;
		if(requestType=='institute') {
			
			var highest_deg_institute = $('#int-institute').val();
			$("#user-confirmation .column a").removeClass('active');
			
			highest_deg_institute = (typeof highest_deg_institute === "undefined") ? "" : highest_deg_institute;
			var action_block_name = 'update_tg_user_additional_data';
			var action_url = base_url + "/general_ajax_task.php";
			
			if(highest_deg_institute == ''){
				if(current_status=='student'){
					$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Please enter your higher degree institute.'); 
				} else {
					$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Please enter your higher degree institute.'); 
				}
				
				Tg_CommonFunction.clearMessage();
				
				return false;
			} else {
				$("#tmp_msg").css('display','none');
				$("html, body").animate({ scrollTop: 0 }, 1000);
			}
			
			$.post(action_url,{action: action_block_name, highest_deg_institute: highest_deg_institute},function(data){
				$("html, body").addClass("signup-steps-page");
				if(user_profile_status == 'student') {
					$('#signup-steps .nav-tabs > li a[href="#profile-degree-info"]').tab('show');
				} else {
					$('#signup-steps .nav-tabs > li a[href="#profile-experience"]').tab('show');
				}
				$('#signup-steps .nav-tabs > li a[href="#profile-institute-info"]').parent().addClass('completed');
			})
			
		} else if(requestType=='degree') {
			
			var highest_edu_degree = $.trim($('#highest_edu_degree').val());
			$("#user-confirmation .column a").removeClass('active');
			
			highest_edu_degree = (typeof highest_edu_degree === "undefined") ? "" : highest_edu_degree;
			var action_block_name = 'update_tg_user_additional_data';
			var action_url = base_url + "/general_ajax_task.php";
			
			if(highest_edu_degree == '' || highest_edu_degree=='Highest Educational Qualification' ){
				$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Please select your education degree.'); 
				Tg_CommonFunction.clearMessage();
				return false;
			} else {
				$("#tmp_msg").css('display','none');
				$("html, body").animate({ scrollTop: 0 }, 1000);
			}
		
			$.post(action_url,{action: action_block_name, highest_edu_degree: highest_edu_degree},function(data){
				$("html, body").addClass("signup-steps-page");
				$('#signup-steps .nav-tabs > li a[href="#profile-graduation-info"]').tab('show');
				$('#signup-steps .nav-tabs > li a[href="#profile-degree-info"]').parent().addClass('completed');
			})
			
		} else if(requestType=='graduation_year') {
			
			var graduation_year = $.trim($('#graduation_year').val());
			$("#user-confirmation .column a").removeClass('active');
			
			graduation_year = (typeof graduation_year === "undefined") ? "" : graduation_year;
			var action_block_name = 'update_tg_user_additional_data';
			var action_url = base_url + "/general_ajax_task.php";
			
			if(graduation_year == '' || graduation_year == 'Select year'){
				$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Please select your year of graduation.'); 
				Tg_CommonFunction.clearMessage();
				return false;
			} else {
				$("#tmp_msg").css('display','none');
				$("html, body").animate({ scrollTop: 0 }, 1000);
			}
		
			$.post(action_url,{action: action_block_name, graduation_qualification: graduation_year},function(data){
						$("html, body").addClass("signup-steps-page");
						$('#signup-steps .nav-tabs > li a[href="#profile-location-info"]').tab('show');
						$('#signup-steps .nav-tabs > li a[href="#profile-graduation-info"]').parent().addClass('completed');
															
				})
			
		} else if(requestType=='location') {
			
			var user_city = $.trim($('#user_city').val());
			$("#user-confirmation .column a").removeClass('active');
			
			user_city = (typeof user_city === "undefined") ? "" : user_city;
			var action_block_name = 'update_tg_user_additional_data';
			var action_url = base_url + "/general_ajax_task.php";
			
			if(user_city == ''){
				$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Please enter your current location.'); 
				Tg_CommonFunction.clearMessage();
				return false;
			} else {
				$("#tmp_msg").css('display','none');
				$("html, body").animate({ scrollTop: 0 }, 1000);
			}
			
			$.post(action_url,{action: action_block_name, user_city: user_city},function(data){
						$("html, body").addClass("signup-steps-page");
						$('#signup-steps .nav-tabs > li a[href="#profile-gender-info"]').tab('show');
						$('#signup-steps .nav-tabs > li a[href="#profile-location-info"]').parent().addClass('completed');
															
				})
			
		} else if(requestType=='gender') {
			
			var gender = $('input[name=gender]:checked').val();
			$("#user-confirmation .column a").removeClass('active');
			
			gender = (typeof gender === "undefined") ? "" : gender;
			var action_block_name = 'update_tg_user_additional_data';
			var action_url = base_url + "/general_ajax_task.php";
			
			if(gender == ''){
				$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Please select your gender.'); 
				Tg_CommonFunction.clearMessage();
				return false;
			} else {
				$("#tmp_msg").css('display','none');
				$("html, body").animate({ scrollTop: 0 }, 1000);
			}
			
			$.post(action_url,{action: action_block_name, user_gender: gender},function(data){
						$("html, body").addClass("signup-steps-page");
						$('#signup-steps .nav-tabs > li a[href="#profile-skills-info"]').tab('show');
						$('#signup-steps .nav-tabs > li a[href="#profile-gender-info"]').parent().addClass('completed');
															
				})
			
		} else if(requestType=='skillSet') {
			
			var skill_set = $.trim($('#skill_set').val());
			$("#user-confirmation .column a").removeClass('active');
			
			skill_set = (typeof skill_set === "undefined") ? "" : skill_set;
			var action_block_name = 'update_tg_user_additional_data';
			var action_url = base_url + "/general_ajax_task.php";
			
			if(skill_set == ''){
				$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Please enter your skill.'); 
				Tg_CommonFunction.clearMessage();
				return false;
			} else {
				$("#tmp_msg").css('display','none');
				$("html, body").animate({ scrollTop: 0 }, 1000);
			}
			
			$.post(action_url,{action: action_block_name, user_skill: skill_set},function(data){
					$("#signup-steps").hide();
					$("html, body").removeClass("signup-steps-page");
					var event_id = $("#event_id").val();
					var user_id = $("#user_id").val();
					var event_page_url = $("#event_page_url").val();
					var company_page_url = $("#company_page_url").val();
					company_page_url = (typeof company_page_url === "undefined") ? "openparticipation" : company_page_url;
					if(event_id>0){
						$("#profile-completed").show();	
						$.ajax({
							type: "POST",
							url: base_url + '/general_ajax_task.php?action=update_event_flag',
							data: {user_id: user_id, event_id: event_id},
							dataType: 'json',
							cache: false,
							success: function (data) {
								window.location.href=base_url+'/'+event_page_url+'/'+company_page_url+'/dashboard?msg_id=24008';
							}
						});	
					} else {
						$("#profile-completed").show();		
					}
					
															
				})
			
		} else if(requestType=='currentCompany') {
			var current_company = $('#current_company').val();
			$("#user-confirmation .column a").removeClass('active');
			
			current_company = (typeof current_company === "undefined") ? "" : current_company;
			var action_block_name = 'update_tg_user_additional_data';
			var action_url = base_url + "/general_ajax_task.php";
			
			if(current_company == ''){
				$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Please enter your current company.'); 
				Tg_CommonFunction.clearMessage();
				return false;
			} else {
				$("#tmp_msg").css('display','none');
				$("html, body").animate({ scrollTop: 0 }, 1000);
			}
			
			$.post(action_url,{action: action_block_name, current_company: current_company},function(data){
					$("html, body").addClass("signup-steps-page");
					$('#signup-steps .nav-tabs > li a[href="#profile-job-title"]').tab('show');
					$('#signup-steps .nav-tabs > li a[href="#profile-company-name"]').parent().addClass('completed');
												
				})
			
		} else if(requestType=='jobTitle') {
			var job_title = $('#job_title').val();
			$("#user-confirmation .column a").removeClass('active');
			
			job_title = (typeof job_title === "undefined") ? "" : job_title;
			var action_block_name = 'update_tg_user_additional_data';
			var action_url = base_url + "/general_ajax_task.php";
			
			if(job_title == ''){
				$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Please select your current job title.'); 
				Tg_CommonFunction.clearMessage();
				return false;
			} 
			
			if(job_title.length>100){
				$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Job title should not be greater than 100 character.'); 
				Tg_CommonFunction.clearMessage();
				return false;
			}
		
			$.post(action_url,{action: action_block_name, user_role: job_title},function(data){
					$("html, body").addClass("signup-steps-page");
					$('#signup-steps .nav-tabs > li a[href="#profile-institute-info"]').tab('show');
					$('#signup-steps .nav-tabs > li a[href="#profile-job-title"]').parent().addClass('completed');
															
				})
			
		} else if(requestType=='userExp') {
			
			var exp_yr = $('#exp_yr').val();
			var exp_month = $('#exp_month').val();
			var user_job_exp_flag = $('#user_job_exp_flag').val();
			$("#user-confirmation .column a").removeClass('active');
			
			exp_yr = (typeof exp_yr === "undefined") ? "" : exp_yr;
			exp_month = (typeof exp_month === "undefined") ? "" : exp_month;
			user_job_exp_flag = (typeof user_job_exp_flag === "undefined") ? "" : user_job_exp_flag;
			var action_block_name = 'update_tg_user_additional_data';
			var action_url = base_url + "/general_ajax_task.php";
			
			if((exp_yr == '' && exp_month=='')){
				$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Please select your professional experience.'); 
				Tg_CommonFunction.clearMessage();
				return false;
			} else {
				$("#tmp_msg").css('display','none');
				$("html, body").animate({ scrollTop: 0 }, 1000);
			}
			$.post(action_url,{action: action_block_name, user_exp_yr: exp_yr, exp_month: exp_month,user_job_exp_flag:user_job_exp_flag},function(data){
					$("html, body").addClass("signup-steps-page");
						$('#signup-steps .nav-tabs > li a[href="#profile-location-info"]').tab('show');
						$('#signup-steps .nav-tabs > li a[href="#profile-experience"]').parent().addClass('completed');
															
				})
		} 
    };

	
	$instance.encryptfrm = function() {
		
        var e = $('#password').val();
			e = Base64.encode(e);
			$('#password').val(e);
			
    };

    $instance.validateUserSelectedSkill = function(calling_source) {
        var user_job_exp_flag = 'N';

        // Make ajax call to update user selected skills
        var action_block_name = 'update_tg_user_additional_data';
        var action_url = base_url + "/general_ajax_task.php";

        var profile_popup = $('#profile_popup').val();

        // Block wise execution starts here // Skill Block
        if (calling_source == 'skill') {

            var obj = document.getElementsByTagName('input');

            var checkedCounter = 0;
            for (i = 0; i < obj.length; i++) {
                if (obj[i].type == "checkbox" && obj[i].checked == true && obj[i].id != 'receive-updates' && obj[i].id != 'send-offers') {
                    checkedCounter++;
                }
            }

            var userSelectedRoles = $('#role_names').val();
            var userSelectedSkills = $('#skill_names').val();

            // Check if Additional Skill Field has been filled by user
            var other_role = $.trim($('#other_role_val').val());
            var other_skill = $.trim($('#other_skill_val').val());

            if (checkedCounter > 0 || other_role != '' || other_skill != '') {

                if (other_role) {
                    var user_role = userSelectedRoles + ',#|#|#' + other_role;
                } else {
                    var user_role = userSelectedRoles + ',#|#|#';
                }

                if (other_skill) {
                    var user_skill = userSelectedSkills + ',' + other_skill;
                } else {
                    var user_skill = userSelectedSkills;
                }

                $.post(action_url, {
                    action: action_block_name,
                    user_role: user_role,
                    user_skill: user_skill,
                    user_job_exp_flag: user_job_exp_flag
                }, function(data) {
                    //alert('Skill Data==>'+data);
                    // Trigger the movement to Next Block
                })

            }

        } else if (calling_source == 'edu') { // Education Block

            var highest_edu_degree = $('#int-degree').val();
            var highest_deg_institute = $('#int-institute').val();
            var user_exp_yr = $('#job_exp_yr').val();

            if (user_exp_yr) {
                user_job_exp_flag = 'Y';
            }

            if ($.trim(highest_edu_degree) == 'Highest Educational Qualification') {
                highest_edu_degree = '';
            }

            //alert(highest_edu_degree+'=='+highest_deg_institute+'=='+user_exp_yr);

            $.post(action_url, {
                action: action_block_name,
                highest_edu_degree: highest_edu_degree,
                highest_deg_institute: highest_deg_institute,
                user_exp_yr: user_exp_yr,
                user_job_exp_flag: user_job_exp_flag
            }, function(data) {
                //alert(data);
                // Trigger the movement to Next Block
            })

        } else if (calling_source == 'location') { // Location Block

            //var ele_id = _custom_poplayer2('Processing ...');

            //$('#complete_registration').hide();
            var user_city = $('#user_city').val();
            var check_type = $('#check_type').val();

            $.post(action_url, {
                action: action_block_name,
                user_city: user_city,
                user_job_exp_flag: user_job_exp_flag,
                type: check_type,
                profile_popup: profile_popup
            }, function(data) {
                //alert(data);
                // redirect to required Page	
                window.location = data;
            })

        }
    };

    $instance.tokenInput = function(pre_populate_roles, type_name) {
        $("#other_role .form-control, #other_skill .form-control").tokenInput(base_url + "/ajax/autocomplete.php?autocomplete=tokeninput&type=" + type_name, {
                    theme: "facebook",
                    class: "form-control",
                    width: 100,
                    tabindex: 13,
                    maxlength: 30,
                    //placeholder: 'HTML5, CSS3, Photoshop, etc.',
                    //onfocus: 'show_help("skills",document.getElementById("spanSkills"))',
                    //onblur: 'hide_help()',
                    prePopulate: [pre_populate_roles]
                });
    };

    $instance.initialize = function() {
        $.getScript("http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places")
            .done(function() {
                function initialize() {
                    var input = document.getElementById('user_city');
                    var autocomplete = new google.maps.places.Autocomplete(input);
                }
                google.maps.event.addDomListener(window, 'load', initialize);
            })
            .fail(function() {
                console.log('waitme not loaded');
            });

    };

};

/***
 * Javascript For Question Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 01 August, 2016
 */

Tg_QuestionPage = new function() {
    var $instance = this;

    $instance.init = function() {
		
		$(".comment-list").click(function () {
			$(this).parent().next('ul').toggle();
		});
		
		$(".viewAllCmmnt a").click(function () {
			 var comntxt  = $(this).text();
			 $(this).parent().parent().find('.user-comment').removeClass('hide');
			  $(".viewAllCmmnt").remove();
		});
	
        $("#shareQuestion").click(function() {
            var $shareWrap = $('.shareWrap');
            $.colorbox({
                inline: true,
                width: "350px",
                height: "150px",
                onOpen: function() {
                    $('.shareWrap').show();
                },
                onCleanup: function() {
                    $('.shareWrap').hide();
                },
                open: true,
                href: $shareWrap
            });
        });

        $(".share-toggle").click(function() {
            var effect = 'slide';
            var options = {
                direction: 'left'
            };
            var duration = 700;
            $('.secondary-shares').toggle(effect, options, duration);
        });

        if ($('.main-banner').length > 0) {
            $('html, body').animate({
                scrollTop: $('.main-banner').height()
            }, 1000);
        }

        $("body").bind('click', function() {
            if ($("#prevDiv").is(":visible")) {
                $("#prevDiv").hide();
                if (currentspan)
                    $(currentspan).removeClass("flgbdr");
            }
        });



        $('.testclass').click(function(event) {
            event.stopPropagation();
        });


        $('#prevDiv').click(function(event) {
            event.stopPropagation();
        });


        $('#prevDiv').mouseout(function() {
            //$(this).fadeOut(2000);

        });

    }
	
	$instance.questionTags = function(prePopulate) {
		// remove null value
		if(typeof prePopulate === 'undefined' || prePopulate == '') { prePopulate = null;}
	
		$.getScript(theme_url + "/javascript/jquery.tokeninput.js")
			.done(function() {
				setTimeout($("#question_tags").tokenInput(base_url + "/ajax/autocomplete.php?autocomplete=tokeninput&type=technology_tags", {
					theme: "facebook",
					class: "form-control",
					width: 100,
					tabindex: 13,
					maxlength: 30,
					placeholder: 'Please enter tags',
					prePopulate: [prePopulate]						
				}),2000);
				/* $("#question_tags").tokenInput(base_url + "/ajax/autocomplete.php?autocomplete=tokeninput&type=technology_tags", {
					theme: "facebook",
					class: "form-control",
					width: 100,
					tabindex: 13,
					maxlength: 30,
					placeholder: 'Please enter tags',
					prePopulate: [prePopulate]						
				}); */
			})
			.fail(function() {
				console.log('tokeninput not loaded');
			});
	}
	
	$instance.fbShareSocialMedia = function(id, skill, type) {
		if(typeof skill === 'undefined') {
		var skill = '';
		};
		$.colorbox({
			open: false,
			scrolling: false,
			width:'600px',
			height:'410px',
			opacity:.5,
			href:base_url +"/ajax_files/questionShare.php",
			data:{'id':id,'skill':skill,'type':type}
		});
	}
	
	$instance.qnaEdit = function(qId, skill) {
		skill = (typeof skill === "undefined") ? "" : skill;
		qId = (typeof qId === "undefined") ? "0" : qId;
			$.ajax({
				type: "POST",
				url:base_url +"/ajax_files/questionSuggestion.php",
				data:{'questionId': qId, 'skill': skill},
				success: function(data){
					$("#TechGigbootStrapModal .modal-title").html('Edit Question');
					$("#TechGigbootStrapModal .modal-body").html(data);
					$("#TechGigbootStrapModal").modal("show");
				}
			});
	}
	
	$instance.show_hide_middle_col = function(id) {
	  if ($('#'+id).is(':hidden')) {
		$('#'+id).slideDown(300);
		document[id + '_img'].src = THEME_PATH + "/images/grey_arrow.gif";
	  }
	  else {
		$('#'+id).slideUp(300);
		document[id + '_img'].src = THEME_PATH + "/images/grey_arrow_right.gif";
	  }
	}
	
	$instance.quesSuggestion = function() {
		var title = $('textarea#textarea_qna').val();
		var allowed = title.indexOf("?") == -1;
		if (document.getElementById('textarea_qna').value == '' ) {
		alert('please enter question');
		return false;
		}
		if (allowed) {
		alert('Please use single question mark is needed for a question.');
		return false;
		}  
			var objHeight=$(window).height()-100;
			var title = $('textarea#textarea_qna').val();
			var skill = $('input#skill').val();
			if(typeof skill === 'undefined') {
			var skill = '';
			};
			$.colorbox({
				open: false,
				scrolling: false,
				width:560,
				maxHeight:600,
				opacity:.5,
				href:base_url +"/ajax_files/questionSuggestion.php",
				data:{'title':title,'skill':skill}
			});
	}
	
	$instance.toggle_view_all_qna = function(obj) {
		  $(obj).prev().toggle();
		  if ($(obj).prev().is(':hidden') ) {
			$(obj).children('.test123').text('View All');
		  } else {
			$(obj).children('.test123').text('Hide');
		  }
		}
		// add by kuldeep for qna
		function check_search_keywords1() { 
		  if (document.getElementById('search_tags_main').value == '' ) {
			alert('Enter Text to Search');
			return false;
		  }
		  else {
			return true;
		  }

	}


    currentspan = '';

    $instance.postFlag = function(content_id, content_type, content_subid, content_owner, content_category, custom_field1) {
        if (content_category == '-1') {
            content_category = $.trim($("#inp_box_flag").val());
            if (!content_category.length > 0) {
                alert("Please spcify category!");
                return;
            }
        }
        $.post(base_url + "/postFlag.php", {
                content_id: content_id,
                content_type: content_type,
                content_subid: content_subid,
                content_owner: content_owner,
                content_category: content_category,
                custom_field1: custom_field1
            },
            function(data) {
                eleid = 'prevDiv_' + content_id + '_' + content_subid + '_' + custom_field1;
                $("#" + eleid).hide();
                //$("#"+eleid).html('<a href="javascript: void(0);" class="no_brdr"><img border="0" align="absmiddle" src="http://10.150.250.21/kuldeep/Themes/Release/images/'+ '/flag-gif.gif"></a>');

                eleid = 'undospn_' + content_id + '_' + content_subid + '_' + custom_field1;
                $("#" + eleid).show();

                //$("#"+eleid).html('<span style="font-size:11px;" >'+"Thanks for your feedback. You can "+'</span>'+"<b onclick=\"javascript:undoFlag(\'"+content_id+"\', \'"+content_type+"\', \'"+content_subid+"\', \'"+content_owner+"\', \'"+custom_field1+"\');\" style=\"display:inline; cursor:pointer;font-weight:normal;text-decoration:underline;color:#095CC2;\">\Undo\</b>&nbsp; this action." );

                closeFlag("prevDiv");

            });
    }

    $instance.undoFlag = function(content_id, content_type, content_subid, content_owner, custom_field1) {
        $.post(base_url + "/undoFlag.php", {
                content_id: content_id,
                content_type: content_type,
                content_subid: content_subid,
                content_owner: content_owner,
                custom_field1: custom_field1
            },
            function(data) {
                eleid = 'undospn_' + content_id + '_' + content_subid + '_' + custom_field1;
                $("#" + eleid).hide();
                //$("#"+eleid).html('');

                eleid = 'prevDiv_' + content_id + '_' + content_subid + '_' + custom_field1;
                $("#" + eleid).show();
                //$("#"+eleid).html('<a href="javascript: void(0);" class="no_brdr"><img border="0" align="absmiddle" src="http://10.150.250.21/kuldeep/Themes/Release/images/'+ '/flag-gif.gif" style="padding:0 5px;">Flag</a>');

                closeFlag("prevDiv");

            });
    }

    $instance.flag_it = function(obj, id, content_type, content_id, content_subid, content_owner, custom_field1) {
        $.post(base_url + "/checkFlag.php", {
                content_id: content_id,
                content_type: content_type,
                content_subid: content_subid,
                content_owner: content_owner,
                custom_field1: custom_field1
            },
            function(data) {
                if ($.trim(data) == '1') {
                    showUndoLi(obj, id, content_type, content_id, content_subid, content_owner, custom_field1);
                } else {
                    showFlagCat(obj, id, content_type, content_id, content_subid, content_owner, custom_field1);
                }
            });
        return;
    }

    $instance.showUndoLi = function(obj, id, content_type, content_id, content_subid, content_owner, custom_field1) {
        currentspan = obj;
        var objDim = ObjectPosition(obj);
        $("#" + id).show();
        $("#" + id).css({
            left: objDim[0] + 'px',
            top: objDim[1] + 20 + 'px'
        });
        var objlft = objDim[0];

        if (objlft > 750) {
            $(".prevBx").css({
                'margin-left': '-152px'
            });

            $(".flg-tp").css({
                'margin-left': '152px'
            });

            $(".flg-tp-br").css({
                'float': 'left'
            });
        } else {
            $(".prevBx").css({
                'margin-left': '0px'
            });

            $(".flg-tp").css({
                'margin-left': '-1px'
            });

            $(".flg-tp-br").css({
                'float': 'right'

            });
        }

        var ul = document.createElement('ul');
        var li = "<li style=\"height:auto;line-height:16px;padding:2px 8px 8px 8px;clear:right;border-top:0;\">" + "You have already marked this as flag.&nbsp;You can (&nbsp;<b onclick=\"javascript:undoFlag(\'" + content_id + "\', \'" + content_type + "\', \'" + content_subid + "\', \'" + content_owner + "\', \'" + custom_field1 + "\');\" style=\"display:inline; cursor:pointer;font-weight:normal;text-decoration:underline;color:#095CC2;\">\Undo\</b>&nbsp;)" + " this action.</li>";
        $(ul).html(li);
        $('#preDiv_in').html('');
        $('#preDiv_in').append($(ul));
    }

    $instance.showFlagCat = function(obj, id, content_type, content_id, content_subid, content_owner, custom_field1) {

        if (currentspan) {
            $(currentspan).removeClass("flgbdr");
        }

        $(obj).addClass("flgbdr")

        currentspan = obj;
        var objDim = ObjectPosition(obj);
        $("#" + id).show();
        $("#" + id).css({
            left: objDim[0] + 'px',
            top: objDim[1] + 20 + 'px'
        });


        var objlft = objDim[0];
        if (objlft > 750) {

            $(".prevBx").css({
                'margin-left': '-152px'
            });

            $(".flg-tp").css({
                'margin-left': '152px'
            });

            $(".flg-tp-br").css({
                'float': 'left'


            });

        } else {

            $(".prevBx").css({
                'margin-left': '0px'
            });

            $(".flg-tp").css({
                'margin-left': '-1px'
            });

            $(".flg-tp-br").css({
                'float': 'right'

            });

        }

        var ul = document.createElement('ul');
        var li = "<li onclick=\"javascript:postFlag('" + content_id + "', '" + content_type + "', '" + content_subid + "', '" + content_owner + "','Abusive', '" + custom_field1 + "');\" onmouseover=\"javascript:flag_hr(this);\" onmouseout=\"javascript:flag_out(this);\" >Abusive</li><li onclick=\"javascript:postFlag('" + content_id + "', '" + content_type + "', '" + content_subid + "', '" + content_owner + "','Irrelevant', '" + custom_field1 + "');\" onmouseover=\"javascript:flag_hr(this);\" onmouseout=\"javascript:flag_out(this);\" >Irrelevant</li><li onclick=\"javascript:postFlag('" + content_id + "', '" + content_type + "', '" + content_subid + "', '" + content_owner + "','Porn', '" + custom_field1 + "');\" onmouseover=\"javascript:flag_hr(this);\" onmouseout=\"javascript:flag_out(this);\" >Porn</li><li onclick=\"javascript:postFlag('" + content_id + "', '" + content_type + "', '" + content_subid + "', '" + content_owner + "','Promotional/Spamming Activity', '" + custom_field1 + "');\" onmouseover=\"javascript:flag_hr(this);\" onmouseout=\"javascript:flag_out(this);\" >Promotional/Spamming Activity</li><li onmouseover=\"javascript:flag_hr(this);\" onmouseout=\"javascript:flag_out(this);\" onclick=\"javascript:event.stopPropagation();\" class=\"nbdrs\" ><span onclick=\"show_input();\">Other</span><span id=\"inp_bx\"><input type=\"text\" value=\"\" id=\"inp_box_flag\"  onclick=\"javascript:return true;\" style=\"width:100px;_width:90px;\" /><input type=\"image\" value=\"Ok\" style=\"cursor:pointer;\" onclick=\"javascript:postFlag('" + content_id + "', '" + content_type + "', '" + content_subid + "', '" + content_owner + "','-1', '" + custom_field1 + "');\"  /></span></li>";

        $(ul).html(li);
        $('#preDiv_in').html('');
        $('#preDiv_in').append($(ul));
    }

    $instance.closeFlag = function(id) {
        $("#" + id).hide();
        if (currentspan)
            $(currentspan).removeClass("flgbdr");

    }

    $instance.show_input = function() {
        $("#inp_bx").show();
    }

    $instance.hide_input = function() {
        $("#inp_bx").hide();
    }

    $instance.flag_hr = function(obj) {
        $(obj).css({
            background: "#4478a0",
            color: "#f2dd94"
        });
    }

    $instance.flag_out = function(obj) {
        $(obj).css({
            background: "#fff",
            color: "#000"
        });
    }


    $instance.handle_submit = function() {
        $(".form1").find('.has-error').removeClass("has-error");
        $(".form1").find('.error_msg').remove();
        var x = document.forms["search"]["post_answer"].value;
        if (x == null || x == "") {
            $("textarea[name=post_answer]").closest('div').addClass("has-error");
            $("<span class='error_msg'> Answer cannot be left blank </span>").insertAfter("textarea[name=post_answer]");
            return false;
        }
        $('#addAnswer').hide();
        $('#qnaProcess').show();
        $.ajax({
            type: "POST",
            url: base_url + "/ajax_files/qna_answer_post.php",
            data: $('form').serialize(),
            async: false,
            success: function(data) {
                $('#addAnswer').show();
                $('#qnaProcess').hide();
                msgId = parseInt($.trim(data));
                if (typeof msgId == 'number') {
                    var docUrl = document.URL;
                    //qnaUrl = docUrl.substring(0, docUrl.indexOf('?'));
                    if (docUrl.indexOf('?') === -1) {
                        var url = docUrl + '?msg_id=' + msgId;
                    } else {
                        var url = docUrl + '&msg_id=' + msgId;
                    }
                    window.location.href = url;
                } else {
                    location.reload();
                }
            }
        });
    }

    $instance.handle_submit_qna = function() {
        $(".form1").find('.has-error').removeClass("has-error");
        $(".form1").find('.error_msg').remove();
        var x = document.forms["search"]["post_answer"].value;
        if (x == null || x == "") {
            $("textarea[name=post_answer]").closest('div').addClass("has-error");
            $("<span class='error_msg'> Answer cannot be left blank </span>").insertAfter("textarea[name=post_answer]");
            return false;
        }
    }

    $instance.postRating = function(id, rate) {
        eleid = 'likeitem_' + rate + '_' + id;
        $.post(base_url + "/ajax_files/qna_ajax.php", {
                data: $("#" + eleid).attr("thumbData")
            },
            function(data) {
                spanid = 'spanid_' + id;
                $("#ans_count_"+id).text(data);
                $("#" + spanid).html(data);
                $("#spanyes_" + id).toggle();
                $("#spanno_" + id).toggle();
            });
    }

    $instance.postComment = function(ansid, qid) {
        eleid = 'txtcoment_' + ansid;
        var trimmedValue = $.trim($("#" + eleid).val());
        if (!trimmedValue.length > 0) {
            alert("Please enter the comment.");
            return;
        }

        var max = parseInt($("#" + eleid).attr('maxlength'));
        if ($("#" + eleid).val().length > 1000) {
            alert("Max limit of comment is 1000 chars");
            $("#" + eleid).focus();
            return;
        }

        $.post(base_url + "/ajax_files/qna_saveAnsComment.php", {
                data: $("#" + eleid).val(),
                id: ansid,
                qid: qid
            },
            function(data) {
                if (parseInt(data) == 1) { //	Succes -- recorded					  

                    $("#imgblock_" + ansid).hide();
                    $("#commentBlock_" + ansid).slideUp();
                    $("#" + eleid).val("");
                    //window.location.reload();
                    window.location = window.location.href + '?msg_id=809';

                } else if (parseInt(data) == 2) { //	Dupicate -- 
                    // show comment saved message
                    window.location = '<?php echo $ansSucssUrl;?>&msg_id=809';
                } else if (parseInt(data) == 3) { //	Failed -- 
                    alert("Failed to post this comment due to invalid content, Please try again");
                }
            });
    }

    $instance.cancleComment = function(id) {
        eleid = 'commentBlock_' + id;
        $("#" + eleid).slideToggle();

        eleid = 'imgblock_' + id;
        $("#" + eleid).slideToggle();

    }

    $instance.toggleComment = function(id) {
        eleid = 'commentBlock_' + id;
        $("#" + eleid).slideToggle();

        eleid = 'imgblock_' + id;
        $("#" + eleid).slideToggle();
    }

    $instance.showhideTxt = function(id) {
        eleid = 'view_' + id;
        if ($("#" + eleid).attr("attopenclose") == 'S') { // change the text to hide comment
            $("#" + eleid).html("Hide Comments");
            $("#" + eleid).attr("attopenclose", 'H');
        } else {
            $("#" + eleid).html("View All Comments");
            $("#" + eleid).attr("attopenclose", 'S');

        }
        $("#anscomment_" + id).slideToggle();
    }

};

/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Profile Page
 * 
 * Author   : Sebin Baby
 * Created  : 08 August, 2016
 */

Tg_ProfilePage = new function() {
    var $instance = this;

    $instance.init = function() {
		$.getScript(theme_url + "/javascript/onepagenav.js")
            .done(function() {
                $('#profile-navigation ul').onePageNav({
                    currentClass: 'active',
                    scrollOffset: 50,
                    scrollThreshold: 0.01,
                    changeHash: false,
                    filter: ':not(.external)'
                });
            })
            .fail(function() {
                console.log('OnePageNav not loaded');
            });
			$(document).on('click','.edit_profile_save',function(){
				$('#user-info').removeClass('edit-user-info');
			});
    }
	
	$instance.validate_user_personal_data = function() {
	
		var mobileNum = document.personal_form.mobile_phone.value;
	    mobileNum = mobileNum.replace(/ /g, '');
	
		if(mobileNum != '') {
			if(document.personal_form.mobile_phone.value.length < 10 || document.personal_form.mobile_phone.value.length > 12) {
				alert('Please enter Valid Mobile no. ');
				document.personal_form.mobile_phone.focus();
				return false;
			}
			if(document.personal_form.mobile_phone.value.length != 0) {
			  var numericExpression = /^[0-9+-]+$/;
			  if(!document.personal_form.mobile_phone.value.match(numericExpression)){
				 alert('Only numbers are allowed in Mobile field. ');
				 document.personal_form.mobile_phone.focus();
				 return false;
			   }
			}
		}
		return true;
	}

    $instance.get_certificates = function(e) {
        var t = base_url + "/ajax_files/assessment_get_result.php";
        $.post(t, {
            action: "certificates",
            skill_id: e
        }, function(e) {
            if (e.length > 0 && (e.trim(), 0 != e)) {
                var t = e.split(","),
                    a = base_url + "/assessment_certificate.php?rank=" + t[0] + "&skill=" + t[1],
                    s = window.open("", "", "width=700, height=600, scrollbars=yes");
                $.get(a, function(e) {
                    s.document.write(e)
                })
            }
        })
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
            $(document).ready(function() {
                var title = popup_title;
                if (skip_authentication == 'N') {
                    Tg_CommonFunction.open_url_modal(title, base_url + '/validate_user.php?goto_action_url=' + goto_action_url);
                } else {
                    var matchFound = goto_action_url.indexOf("ajax_login_register.php");
                    if (matchFound != '-1') {
                        title = 'Register/ Login';
                    }

                    Tg_CommonFunction.open_url_modal(title, goto_action_url);
                }
            });
        } catch (e) {}
    }

    $instance.ReloadParent = function(e) {
        var t = parent.window.location.href;
        if (-1 != t.indexOf("?")) {
            qstrings = t.substr(t.indexOf("?") + 1).split("&");
            var a = 0;
            for (newqustring = Array(), i = 0; i < qstrings.length; i++) - 1 == qstrings[i].indexOf("msg_id") && (newqustring[a] = qstrings[i], a++);
            str_newquery = newqustring.join("&"), t = t.substr(0, t.indexOf("?")), t = t + "?" + str_newquery
        } else t += "?";
        var s = t + "&msg_id=" + e;
        parent.window.location.href = s
    }

    $instance.ReloadParentFormPst = function(e, t) {
        escapeparm = t.split(",");
        var a = parent.window.location.href;
        if (-1 != a.indexOf("?")) {
            qstrings = a.substr(a.indexOf("?") + 1).split("&");
            var s = 0;
            newqustring = Array();
            var r = 0;
            for (i = 0; i < qstrings.length; i++) {
                for (r = 0, k = 0; k < escapeparm.length; k++)
                    if (tmpprm = escapeparm[k] + "=", -1 != qstrings[i].indexOf(tmpprm)) {
                        r = 1;
                        break
                    }
                0 == r && (newqustring[s] = qstrings[i]), s++
            }
            str_newquery = newqustring.join("&"), a = a.substr(0, a.indexOf("?")), a = a + "?" + str_newquery
        } else a += "?";
        var o = a + e;
        parent.window.location.href = o
    }

    $instance.validateReAuthenticationPwd = function(e, t) {
        var password = $('#Loginlogin').val();
        if (password.replace(/ /g, '') == '') {
            alert("Please provide your password first!");
            $('#Loginlogin').val('');
            return false;
        }
        return true;
    }

	$instance.validateProfileInfo = function() {

	if(document.getElementById('picture').checked) {
		document.getElementById('picture_hidden').value='Y';
	} else {
		document.getElementById('picture_hidden').value='N';
	}
      if(document.getElementById('title').checked) {
		document.getElementById('title_hidden').value='Y';
	} else {
		document.getElementById('title_hidden').value='N';
	}
   	if(document.getElementById('current_company').checked) {
   		document.getElementById('current_company_hidden').value='Y';
	    	if(document.getElementById('current_company_details').checked){
	     		document.getElementById('current_company_details_hidden').value='Y';
    		}
     		else {
	       	document.getElementById('current_company_details_hidden').value='N';
     		}

     		if(document.getElementById('current_project_details').checked) {
			document.getElementById('current_project_hidden').value='Y';
		} else {
			document.getElementById('current_project_hidden').value='N';
		}
	}
  	else {
		document.getElementById('current_company_hidden').value='N';
              document.getElementById('current_company_details_hidden').value='N';
		document.getElementById('current_project_hidden').value='N';
	}

        if(document.getElementById('past_company').checked) {
   		document.getElementById('past_company_hidden').value='Y';

	    	if(document.getElementById('past_company_details').checked){
	     		document.getElementById('past_company_details_hidden').value='Y';
    		}
     		else {
	       	document.getElementById('past_company_details_hidden').value='N';
    		}
     		if(document.getElementById('past_project_details').checked) {
			document.getElementById('past_project_hidden').value='Y';
		} else {
			document.getElementById('past_project_hidden').value='N';
		}
	}
  	else {
		document.getElementById('past_company_hidden').value='N';
              document.getElementById('past_company_details_hidden').value='N';
		document.getElementById('past_project_hidden').value='N';
	}

       if(document.getElementById('education_information').checked) {
   		document.getElementById('education_information_hidden').value='Y';

	    	if(document.getElementById('education_information_details').checked){
     		document.getElementById('education_information_details_hidden').value='Y';

    		}
     		else {
       	document.getElementById('education_information_details_hidden').value='N';
		
     		}
	}
  	else {
              
		document.getElementById('education_information_hidden').value='N';
              document.getElementById('education_information_details_hidden').value='N';

	}
      	if(document.getElementById('sfa').checked) {
		document.getElementById('sfa_hidden').value='Y';
	} else {
		document.getElementById('sfa_hidden').value='N';
	}
    	if(document.getElementById('summary').checked){
    		document.getElementById('summary_hidden').value='Y';
	}
	else {
	      	document.getElementById('summary_hidden').value='N';
	}
	/*
              if(document.getElementById('wants').checked){
     		document.getElementById('wants_hidden').value='Y';
    		}
     		else {
       	document.getElementById('wants_hidden').value='N';
     		}
	*/
        if(document.getElementById('haves').checked){
     		document.getElementById('haves_hidden').value='Y';
    	} else {
			document.getElementById('haves_hidden').value='N';
     	}

		document.getElementById('wants_hidden').value='N';
		//document.getElementById('haves_hidden').value='N';

	    	if(document.getElementById('reason_perpower').checked){
     		document.getElementById('reason_perpower_hidden').value='Y';
    		}
     		else {
       	document.getElementById('reason_perpower_hidden').value='N';
     		}

             if(document.getElementById('website').checked){
     		document.getElementById('website_hidden').value='Y';
    		}
     		else {
       	document.getElementById('website_hidden').value='N';
     		}

             if(document.getElementById('web_profile').checked){
     		document.getElementById('web_profile_hidden').value='Y';
    		}
     		else {
       	document.getElementById('web_profile_hidden').value='N';
     		}

	    	if(document.getElementById('gender').checked){
     		document.getElementById('gender_hidden').value='Y';

    		}
     		else {
       	document.getElementById('gender_hidden').value='N';
		
     		}
	   if(document.getElementById('interest').checked){
     		document.getElementById('interest_hidden').value='Y';

    		}
     		else {
       	document.getElementById('interest_hidden').value='N';
		
     		}
	
     if(document.getElementById('connection').checked) {
		document.getElementById('connection_hidden').value='Y';
	} else {
		document.getElementById('connection_hidden').value='N';
	}

     	if(document.getElementById('proj_team_member').checked) {
		document.getElementById('proj_team_member_hidden').value='Y';
	} else {
		document.getElementById('proj_team_member_hidden').value='N';
	}
}
	 
	 
	 
	$instance.confirmProfileDelete = function(e, t) {
		/* var askDelete = confirm('Are you sure you want to deactivate your profile.\n Once you approve, your profile will be deactivated and you will be logged out of TechGig.com');
		if(askDelete) {
			document.location = base_url+'/user_settings.php?type=profile_settings&deactivate_profile=Y';
		} else {
			return false;
		} */
		
		$("#deactivate-popup").modal("show");
		//$("#deactivate-confirm-popup").modal("show");
		
    }
	
	// verifying user response for deactivation
	$("#save_deactivation_reason").click(function() {
		// fetch checked values
		var checkedValue = $("[name=deactive_reason]:checked").length;
		checkedValue = $.trim(checkedValue);

		$("#deactivate_warning").hide();
		$("#deactivate_error").hide();
		
		var obj = $('input[name=deactive_reason]');
		var selectedReasons = '';

		// Loop through all check boxes and prepare string for selected reasons
		for (i = 0; i < obj.length; i++) {
			if (obj[i].type == "checkbox" && obj[i].checked == true) {

				var skills = obj[i].value;
				if (skills != '') {
					if (selectedReasons == "") {
						selectedReasons = skills;
					} else {
						selectedReasons = selectedReasons + ',' + skills;
					}
				}
			}
		}
		

		if (checkedValue == 0) {
			$('#deactivate_warning').show();
		} else {
			var url = base_url + '/general_ajax_task.php?action=save_user_deactivation_reason';
			$.post(url, {
				'user_response': selectedReasons
			}, function(data) {
				data = $.trim(data);
				if (data == 'ERROR') {
					$('#deactivate_error').show();
				} else {
					$("#deactivate-popup").modal("hide");
					$("#deactivate-confirm-popup").modal("show");
				}
			});
		}
	});
	
	// deactivate user profile
	$("#confirm_account_deactivation").click(function() {
		document.location = base_url+'/user_settings.php?type=profile_settings&deactivate_profile=Y';
	});
	
	
	$instance.openAdditionalInfo = function(event_val) {
	
		var tg_event_val = event_val;
		tg_event_val = (typeof tg_event_val === "undefined") ? "" : tg_event_val;
	
       $("#editAdditionalInfo").show();
       $("#openAdditionalInfobutton").hide();
       $("#additionalBlock").hide();
	   $("#editAdditionalInfo").html('<p class="tg-loader text-center"><img src="' + THEME_PATH + '/images/TG-Loader.gif" /></p>');
	   $("#editAdditionalInfo").load(base_url+"/modals.php?module=EditAdditional&request=ajax&tg_event_val="+tg_event_val, function(e){
	   });
    }
	
	
	
	$instance.openPersonalInfo = function(event_val) {
	
		var tg_event_val = event_val;
		tg_event_val = (typeof tg_event_val === "undefined") ? "" : tg_event_val;
	
       $("#editPersonalInfo").show();
       $("#editopenPersonalInfo").hide();
       $("#personalNewInfo").hide();
	   $("#editPersonalInfo").html('<p class="tg-loader text-center"><img src="' + THEME_PATH + '/images/TG-Loader.gif" /></p>');
	   $("#editPersonalInfo").load(base_url+"/modals.php?module=EditPersonal&request=ajax&tg_event_val="+tg_event_val, function(e){
	   });
    }
	
	$instance.openEducationInfo = function(institute_id,event_val) {
	
		var tg_event_val = event_val;
		tg_event_val = (typeof tg_event_val === "undefined") ? "" : tg_event_val;
	
       $("#editEducationInfo"+institute_id).show();
       $("#eduBlock"+institute_id).hide();
	   $("#addEducationInfo").hide();
	   $("#editEducationInfo"+institute_id).html('<p class="tg-loader text-center"><img src="' + THEME_PATH + '/images/TG-Loader.gif" /></p>');
	   $("#editEducationInfo"+institute_id).load(base_url+"/modals.php?module=UserInstitute&request=ajax&institute_id="+institute_id+"&tg_event_val="+tg_event_val, function(e){
	   });
    }
	
	$instance.openAddEducationInfo = function(event_val) {
	
		var tg_event_val = event_val;
		tg_event_val = (typeof tg_event_val === "undefined") ? "" : tg_event_val;
	
       $("#addEducationInfo").show();
       $("#openAddEducationInfo").hide();
        $("#addEducationInfo").html('<p class="tg-loader text-center"><img src="' + THEME_PATH + '/images/TG-Loader.gif" /></p>');
	   $("#addEducationInfo").load(base_url+"/modals.php?module=UserInstitute&request=ajax&tg_event_val="+tg_event_val, function(e){
	   });
	   
    }
	
	$instance.openWorkExperience = function(companyId,event_val) {
	
		var tg_event_val = event_val;
		tg_event_val = (typeof tg_event_val === "undefined") ? "" : tg_event_val;
		
       $("#editWorkExperience"+companyId).show();
       $("#workExp"+companyId).hide();
	   $("#addWorkExperience").hide();
	   $("#editWorkExperience"+companyId).html('<p class="tg-loader text-center"><img src="' + THEME_PATH + '/images/TG-Loader.gif" /></p>');
	   $("#editWorkExperience"+companyId).load(base_url+"/modals.php?module=UserCompany&request=ajax&company_id="+companyId+"&tg_event_val="+tg_event_val, function(e){
	   });
	   
    }
	$instance.openAddWorkExperience = function(event_val) {
	
		var tg_event_val = event_val;
		tg_event_val = (typeof tg_event_val === "undefined") ? "" : tg_event_val;
	
       $("#addWorkExperience").show();
	   $("#openAddWorkExperience").hide();
	   $("#addWorkExperience").html('<p class="tg-loader text-center"><img src="' + THEME_PATH + '/images/TG-Loader.gif" /></p>');
	   $("#addWorkExperience").load(base_url+"/modals.php?module=UserCompany&request=ajax&tg_event_val="+tg_event_val, function(e){
	   });
    }
	
	
	$instance.openSkills = function() {
       $("#editSkills").show();
       $("#currentSkills").hide();
       $("#openSkillsButtons").hide();
	  
	   //$("#editSkills").html('<p class="tg-loader text-center"><img src="' + THEME_PATH + '/images/TG-Loader.gif" /></p>');
	   
	  // $("#editSkills").load(base_url+"/modals.php?module=EditSummary&amp", function(e){
	  // });
	    
	}
	
	
	$instance.saveUseSkills= function(event_val) {
		
		var haves = $("#haves").val();
		haves = (typeof haves === "undefined") ? "" : haves;
		$( ".alert-danger").remove();
		$("#submit_button").hide();
		
		var tg_event_val = event_val;
		tg_event_val = (typeof tg_event_val === "undefined") ? "" : tg_event_val;
		
		$('#loadinDiv').html('<img src="'+THEME_PATH+'/images/loading.gif" alt="please wait loading... " />'); 
		// Make ajax call to update user selected work experiance
		var action_block_name = 'update_user_skills';
		var action_url = base_url+"/ajax_files/ajax_save_userprofile_function.php";

		$.post(action_url,{action: action_block_name, haves: haves},function(data) {
			if(parseInt(data)){
				$('.progress-loading').hide();
				$("#submit_button").show();
				if(tg_event_val != '') {
					url = base_url+"/"+tg_event_val+"/user/"+login_uid+'?msg_id='+data;
				} else {
					url = base_url+"/profile.php?uid="+login_uid+'&msg_id='+data;
				}
				window.location	= url;	
			} else {
				var msg = $.parseJSON(data); 
				$.each(msg, function (index, value) {
					$('#loadinDiv').hide();
					$("#submit_button").show();
					$( "<p class='alert alert-danger'> "+value+" </p>" ).insertAfter("."+index);
				});	
			}	
		})
	   return false;
	}
	
	//This method used in customize recommendation for Skills
	$instance.saveCustomizeProfile= function() {
		
		var haves = $('#skills').val();
		var company = $('#company').val();
		var role = $('#role_select').val();
		var job_exp_yr = $('#job_exp_yr').val();
		var job_exp_month = $('#job_exp_month').val();

		haves = (typeof haves === "undefined") ? "" : haves;
		company = (typeof company === "undefined") ? "" : company;
		role = (typeof role === "undefined") ? "" : role;
		job_exp_yr = (typeof job_exp_yr === "undefined") ? "" : job_exp_yr;
		job_exp_month = (typeof job_exp_month === "undefined") ? "" : job_exp_month;
		
		$( ".alert-danger").remove();
		$("#submit_button").hide();
		
		$('#loadinDiv').html('<img src="'+THEME_PATH+'/images/loading.gif" alt="please wait loading... " />'); 
		// Make ajax call to update user selected work experiance
		var action_block_name = 'customize_recommendation';
		var action_url = base_url+"/ajax_files/ajax_save_userprofile_function.php";

		$.post(action_url,{action: action_block_name, haves: haves, company: company, role: role, job_exp_yr: job_exp_yr, job_exp_month: job_exp_month},function(data) {
			if(parseInt(data)){
				$('.progress-loading').hide();
				$("#submit_button").show();
				location.reload();
			} else {
				var msg = $.parseJSON(data); 
				$.each(msg, function (index, value) {
					$('#loadinDiv').hide();
					$("#submit_button").show();
					$( "<p class='alert alert-danger'> "+value+" </p>" ).insertAfter("."+index);
				});	
			}	
		})
	   return false;
	}
	
	$instance.editProfieDetails = function() {
		
	   $("#user-info").addClass('edit-user-info');
		
       $("#profilename").show();
       $("#edit_user_location").show();
       $("#profilesummary").show();
       $("#showProfileName").hide();
       $("#cityCountryName").hide();
       $("#main_usersummary").hide();
	   
  
	}
	
	$instance.addProfieDetails = function() {
      
       $("#profilesummary").show();
       $("#main_usersummary").hide();
      
  
	}
	
	$instance.skillSet = function(prePopulatestring) {
		$.getScript(theme_url + "/javascript/jquery.tokeninput.js")
			.done(function() {
				$("#haves").tokenInput(base_url + "/ajax/autocomplete.php?autocomplete=tokeninput&type=technology_tags", {
					theme: "facebook",
					class: "form-control",
					width: 100,
					//tabindex: 13,
					maxlength: 30,
					placeholder: 'Your skills...',
					prePopulate: [prePopulatestring]						
				});
				
			})
			.fail(function() {
				console.log('tokeninput not loaded');
			});
	}
	
	
	$instance.changeUserDetails = function() {
		var username = $("#username").val();
	    if (typeof username == 'undefined') {
			username = '';
		}
		
		var tg_event = $("#tg_event").val();
	    if (typeof tg_event == 'undefined') {
			tg_event = '';
		}
		
		
        $.post(base_url + "/general_ajax_task.php", {
            action: "update_tg_user_additional_data",
            register_user_name: username
        },
            function(data) {
					$("#profilename").hide();
					$("#showProfileName").show();
					if(tg_event > 0) {
						$("#showProfileName").html('<h3 class="clearfix"><span>'+username+'</span><a class="btn button2 right" id="top_edit_btn" href="javascript:void(0)" onclick="Tg_ProfilePage.editProfieDetails();$(\'#exp_block\').hide();$(\'#edit_your_exp_block\').show();">Add / Edit Profile</a></h3>');
					} else {
						$("#showProfileName").html('<h1>'+username+'</h1>');
					}
				
            });
  
	}
	
	
	$instance.changeUserCity = function() {
		var user_city = $("#user_city").val();
	    if (typeof user_city == 'undefined') {
			user_city = '';
		}
		
        $.post(base_url + "/general_ajax_task.php", {
            action: "update_tg_user_city_data",
            user_city: user_city
        },
            function(data) {
					$("#edit_user_location").hide();
					$("#cityCountryName").show();
					$("#cityCountryName").html(user_city);
				
            });
  
	}
	
	
	$instance.changeUserSummary = function() {
		var summary = $("#summary").val();
		if (typeof summary == 'undefined') {
			summary = '';
		}
		
        $.post(base_url + "/general_ajax_task.php", {
            action: "update_tg_user_additional_data",
            summary: summary
        },
            function(data) {
					$("#profilesummary").hide();
					$("#main_usersummary").show();
					$("#btnEdit").hide();
					var summaryVal = summary;
					if(summary == '') {
						var summaryVal = 'Add profile summary';
					}
					$("#changesummary").html(summaryVal);
			});
  
	}
	
	$instance.updateUserExperience = function() {
		var user_exp_yr = $("#job_exp_yr").val();
	    if (typeof user_exp_yr == 'undefined') {
			user_exp_yr = '';
		}
		
		var user_exp_month = $("#job_exp_month").val();
	    if (typeof user_exp_month == 'undefined') {
			user_exp_month = '';
		}
				
        $.post(base_url + "/general_ajax_task.php", {
            action: "update_tg_user_profile_exp",
            user_exp_yr: user_exp_yr,
            exp_month: user_exp_month
        },
            function(data) {
				$('#edit_your_exp_block').hide();
				$('#exp_block').html(user_exp_yr+ ' yrs'+' '+user_exp_month+' months').show();
            });
	}
	
	$instance.validateProfileAdditionalInput = function(field, compareWith) {
		var tmpField = field.value;
		var tmpId = field.id;
		tmpField = tmpField.replace(/ /g, '');

		if(tmpField.length == 0) {
			$('#'+tmpId).val('');
			return false;
		}

		if(compareWith == 'gmail') {
			var retValue = tmpField.search(/gmail.com/i);
			if(retValue == -1) {
				alert('You have entered an incorrect URL, please provide a Gmail url.');
				$('#'+tmpId).val('');
				$('#'+tmpId).focus();
				return false;
			} else {
				// 
			}
		}
		if(compareWith == 'linkedin') {
			var retValue = tmpField.search(/linkedin.com/i);
			if(retValue == -1) {
				alert('You have entered an incorrect URL, please provide a Linkedin url.');
				$('#'+tmpId).val('');
				$('#'+tmpId).focus();
				return false;
			} else {
				// 
			}
		}
		if(compareWith == 'blogspot') {
			var retValue = tmpField.search(/blogspot.in|blogspot.com/i);
			var wp_retValue = tmpField.search(/wordpress.com/i);
			if(retValue == -1 && wp_retValue == -1) {
				alert('You have entered an incorrect URL, please provide a BlogSpot or WordPress url.');
				$('#'+tmpId).val('');
				$('#'+tmpId).focus();
				return false;
			} else {
				// 
			}
		}
		if(compareWith == 'peerpower') {
			var retValue = tmpField.search(/peerpower.com/i);
			if(retValue == -1) {
				alert('You have entered an incorrect URL, please provide a PeerPower url.');
				$('#'+tmpId).val('');
				$('#'+tmpId).focus();
				return false;
			} else {
				// 
			}
		}
		if(compareWith == 'youtube') {
			var retValue = tmpField.search(/youtube.com/i);
			if(retValue == -1) {
				alert('You have entered an incorrect URL, please provide a YouTube url.');
				$('#'+tmpId).val('');
				$('#'+tmpId).focus();
				return false;
			} else {
				// 
			}
		}
		if(compareWith == 'slideshare') {
			var retValue = tmpField.search(/slideshare.net|slideshare.com/i);
			if(retValue == -1) {
				alert('You have entered an incorrect URL, please provide a SlideShare url.');
				$('#'+tmpId).val('');
				$('#'+tmpId).focus();
				return false;
			} else {
				// 
			}
		}
		if(compareWith == 'googledocs') {
			var retValue = tmpField.search(/googledocs.com/i);
			if(retValue == -1) {
				alert('You have entered an incorrect URL, please provide a GoogleDocs url.');
				$('#'+tmpId).val('');
				$('#'+tmpId).focus();
				return false;
			} else {
				// 
			}
		}
		if(compareWith == 'skype') {
			var retValue = tmpField.search(/skype.com|myskype.info/i);

			if(retValue == -1) {
				alert('You have entered an incorrect URL, please provide a Skype url.');
				$('#'+tmpId).val('');
				$('#'+tmpId).focus();
				return false;
			} else {
				// 
			}
		}
		if(compareWith == 'yahoo') {
			var retValue = tmpField.search(/yahoo.com|yahoo.co.in/i);
			if(retValue == -1) {
				alert('You have entered an incorrect URL, please provide a Yahoo url.');
				$('#'+tmpId).val('');
				$('#'+tmpId).focus();
				return false;
			} else {
				// 
			}
		}
		if(compareWith == 'facebook') {
			var retValue = tmpField.search(/facebook.com/i);
			if(retValue == -1) {
				alert('You have entered an incorrect URL, please provide a Facebook url.');
				$('#'+tmpId).val('');
				$('#'+tmpId).focus();
				return false;
			} else {
				// 
			}
		}
		if(compareWith == 'twitter') {
			var retValue = tmpField.search(/twitter.com/i);
			if(retValue == -1) {
				alert('You have entered an incorrect URL, please provide a Twitter url.');
				$('#'+tmpId).val('');
				$('#'+tmpId).focus();
				return false;
			} else {
				// 
			}
		}
		return true;
	}
	
	// user profile setting 
	
	$instance.getCurrentDetails = function() {
	
			if(document.getElementById('current_company').checked) {
					document.getElementById('current_company_details').disabled = false;	
					document.getElementById('current_company_details').checked = true;
					$('#image_2').show();
					$('#cc_details').show();

					document.getElementById('current_project_details').disabled = false;	
					document.getElementById('current_project_details').checked = true;
					$('#proj_image_2').show();
					$('#curr_project').show();
			} else {
					document.getElementById('current_company_details').disabled = true;
					$('#image_2').hide();
					$('#cc_details').hide();

					document.getElementById('current_project_details').disabled = true;	
					$('#proj_image_2').hide();
					$('#curr_project').hide();
			}

			if(document.getElementById('current_company').checked == false && document.getElementById('past_company').checked == false) {
				$('profile_overview').hide();
			} else {
				$('profile_overview').show();
			}
	}
	
	$instance.showHideCurrentProjectdetalis = function() {

		if(document.getElementById('current_project_details').checked) {
			$('#curr_project').show();
		} else {
			$('#curr_project').hide();
		}
  }
  $instance.active_inactive_profile_overview = function() {

	var companyObj = document.getElementById('current_company_details').checked;
	var pastcompanyObj = document.getElementById('past_company_details').checked;
	var eductionObj = document.getElementById('education_information_details').checked;
	var checkdCounter = 0;
	if(companyObj == true) {
		checkdCounter++;
	}
	if(eductionObj == true) {
		checkdCounter++;
	}
	if(pastcompanyObj == true) {
		checkdCounter++;
	}

	if(checkdCounter == 0) {
		document.getElementById('profile_overview').hide();
	} else {
		document.getElementById('profile_overview').show();
	}
   }
   
  
	$instance.getPastCompanyDetails = function() {
		
		if(document.getElementById('past_company').checked) {
				document.getElementById('past_company_details').disabled = false;
				document.getElementById('past_company_details').checked =true;
				document.getElementById('past_company_1').style.display='block';
				document.getElementById('past_details').style.display='block';	
				document.getElementById('past_project_details').disabled = false;
				document.getElementById('past_project').style.display='block';
		} else {
			document.getElementById('past_company_details').disabled = true;
			document.getElementById('past_company_1').style.display='none';
			document.getElementById('past_details').style.display='none';
			document.getElementById('past_project_details').disabled = true;
			document.getElementById('past_project').style.display='none';
		}

		if(document.getElementById('current_company').checked == false && document.getElementById('past_company').checked == false) {
			document.getElementById('profile_overview').style.display='none';
		} else {
			document.getElementById('profile_overview').style.display='block';
		}

	}
	
	$instance.getEducationDetails = function() {

		if(document.getElementById('education_information').checked) {
			document.getElementById('education_information_details').disabled = false;
			document.getElementById('education_information_details').checked = true;		
			document.getElementById('eduction_info_1').style.display='block';
			document.getElementById('education_details_1').style.display='block';
	   
		} else {
			document.getElementById('education_information_details').disabled = true;
			document.getElementById('eduction_info_1').style.display='none';
			document.getElementById('education_details_1').style.display='none';

		}
	}
	$instance.getSynopsisDetails = function() {
	
		if(document.getElementById('profile_synopsis').checked) {
		 document.getElementById('summary').disabled = false;
		 document.getElementById('wants').disabled = false;
		 document.getElementById('haves').disabled = false;

		} else {

		  document.getElementById('summary').disabled = true;
		  document.getElementById('wants').disabled = true;
		  document.getElementById('haves').disabled = true;

		}
	}
 
	$instance.getAdditionalInformatio = function() {

			if(document.getElementById('aditional_information').checked) {
			 document.getElementById('reason_perpower').disabled = false;
			 document.getElementById('website').disabled = false;
			 document.getElementById('web_profile').disabled = false;

			} else {

			  document.getElementById('reason_perpower').disabled = true;
			  document.getElementById('website').disabled = true;
			  document.getElementById('web_profile').disabled = true;

			}
	}
	$instance.getPersonalDetails = function() {

		if(document.getElementById('personal_details').checked) {
			 document.getElementById('gender').disabled = false;
			 document.getElementById('spouse').disabled = false;
			 document.getElementById('interest').disabled = false;
			
		} else {

			  document.getElementById('gender').disabled = true;
			  document.getElementById('spouse').disabled = true;
			  document.getElementById('interest').disabled = true;

		}
	}
	$instance.showHideProfileImage = function() {
		if(document.getElementById('picture').checked) {
			$('#image_32768').show();
		} else {
			$('#image_32768').hide();
		}
   }
   
	$instance.showHideTitle = function() {
		if(document.getElementById('title').checked) {
			$('image_1').show();
		} else {
			$('image_1').hide();
		}
	}
 
 
	$instance.NoneViewProfile = function(value) {
 
		if(value == "none") {
			$('#full_view_dummy_image').hide();
			$('#full_view_options').hide();
			$('#none_dummy_image').show();
			$('#picture').hide();
			$('#title').hide();
			$('#current_company').hide();
			$('#current_company_details').hide();
			$('#past_company').hide();
			$('#past_company_details').hide();
			$('#education_information').hide();
			$('#education_information_details').hide();
			$('#sfa').hide();
			$('#summary').hide();
			$('#haves').hide();
			$('#reason_perpower').hide();
			$('#website').hide();
			$('#web_profile').hide();
			$('#gender').hide();
			//$('#spouse').hide();
			$('#interest').hide();
			//$('#articles').hide(); 
			//$('#newspaper').hide();
			$('#connection').hide();
			$('#proj_team_member').hide(); 
			$('#current_project_details').hide();
			$('#past_project_details').hide();

		} else {

			$('#full_view_dummy_image').show();
			$('#full_view_options').show();
			$('#none_dummy_image').hide();
			document.getElementById('picture').disabled = false;	
			document.getElementById('title').disabled = false;
			document.getElementById('current_company').disabled = false;
			document.getElementById('current_company_details').disabled = false;
			document.getElementById('past_company').disabled = false;
			document.getElementById('past_company_details').disabled =false;
			document.getElementById('education_information').disabled =false;
			document.getElementById('education_information_details').disabled =false;
			document.getElementById('sfa').disabled = false;
			document.getElementById('summary').disabled = false;
			//document.getElementById('wants').disabled = false;
			document.getElementById('haves').disabled = false; 
			document.getElementById('reason_perpower').disabled = false;
			document.getElementById('website').disabled = false;
			document.getElementById('web_profile').disabled = false;
			document.getElementById('gender').disabled = false;
			//document.getElementById('spouse').disabled = false;
			document.getElementById('interest').disabled = false; 
			//document.getElementById('articles').disabled = false;
			//document.getElementById('newspaper').disabled = false;
			document.getElementById('connection').disabled = false;
			document.getElementById('proj_team_member').disabled = false; 
			document.getElementById('current_project_details').disabled = false;
			document.getElementById('past_project_details').disabled = false;

		}
 }
	
	
};






 
	

/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Static Pages
 * 
 * Author   : Sebin Baby
 * Created  : 09 August, 2016
 */

Tg_StaticPages = new function() {
    var $instance = this;

    $instance.init = function() {

    }

    $instance.addHiredUser = function() {
        var name = $('#name').val();
        var email = $('#email').val();
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        if (name == '' || $.trim(name).length == 0) {
            $("#name_error").html("<span class='error_msg'>Please Enter Name.</span>");
            return false;
        }
        if (email == '') {
            $("#email_error").html("<span class='error_msg'>Please Enter Email.</span>");
            return false;
        }
        if (!filter.test(email)) {
            $("#email_error").html("<span class='error_msg'>Please Enter Correct Email.</span>");
            return false;
        }
        $.ajax({
            type: 'POST',
            url: base_url + '/ajax_files/saas_corporate_function.php?action=addHiredUser',
            data: $("#hired_user").serialize(),
            async: false,
            success: function(response) {
                var msg = $.parseJSON(response);
                if (msg.status == 'success') {
                    $("#name_error").html('');
                    $("#email_error").html('');
                    $('#name').val('');
                    $('#email').val('');
                    $('#txtCaptcha').val('');
                    $('#captcha_error').html("");
                    $('#alert_success').show().text('Thanks for submiting form. We will contact you soon.');
                } else if (msg.status == 'error') {
                    $('#captcha_error').html(msg.msg);
                }
            }
        })
    }

    $instance.showExpert = function() {
        $('#create-expert').modal('show');
        $("#name_error").html("");
        $("#email_error").html("");
        $('#captcha_error').html("");
    }

    $instance.addExpert = function() {
        var name = $('#name').val();
        var email = $('#email').val();
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        if (name == '' || $.trim(name).length == 0) {
            $("#name_error").html("<span class='error_msg'>Please Enter Name.</span>");
            return false;
        }
        if (email == '') {
            $("#email_error").html("<span class='error_msg'>Please Enter Email.</span>");
            return false;
        }
        if (!filter.test(email)) {
            $("#email_error").html("<span class='error_msg'>Please Enter Correct Email.</span>");
            return false;
        }
        $.ajax({
            type: 'POST',
            url: base_url + '/ajax_files/saas_corporate_function.php?action=addExpert',
            data: $("#add_expert").serialize(),
            async: false,
            success: function(response) {
                var msg = $.parseJSON(response);
                if (msg.status == 'success') {
                    $('#alert_success').show().text('Thanks for submitting the form. We will contact you soon.');
                    setTimeout(function() {
                        window.location.reload();
                    }, 3000);
                } else if (msg.status == 'error') {
                    $('#captcha_error').html(msg.msg);
                }
            }
        })
    }


};

/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Codeplay
 * 
 * Author   : Sebin Baby
 * Created  : 09 August, 2016
 */

Tg_Codeplay = new function() {
    var $instance = this;

    $instance.init = function() {
        $.getScript(theme_url + "/javascript/chosen_jquery.min.js")
            .done(function() {
                $(".chosen-select").chosen({
                    max_selected_options: 3
                });
            })
            .fail(function() {
                console.log('chosen not loaded');
            });
    }

};

/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Challenge Details Page
 * 
 * Author   : Sebin Baby
 * Created  : 16 August, 2016
 */

Tg_ChallengeDetailPage = new function() {
    var $instance = this;
	
	var questionAreaWidth = $('#question-area').innerWidth();
	$("#maxquestion-width").val(questionAreaWidth);
	var editorBoxWidth = $('#editor-box').innerWidth();
	var resizeEditorWidth = 900;
	var resizeEditorWidth1 = 850;
	var resizeEditorWidth2 = 700;
	
	if($(window).width() > 1200){
		resizeEditorWidth = 750
		resizeEditorWidth1 = 650
		resizeEditorWidth2 = 550
	}else if($(window).width() > 992){
		resizeEditorWidth = 600
		resizeEditorWidth1 = 500
		resizeEditorWidth2 = 400
	}
	
	$(document).on('click','#refresh-custom-input' ,function(){
		$('#own_testcase_input').val('');
		$(this).html("Refreshed <i class='pass-icon'></i>");
	});
	
	//$("#editor-box header").innerWidth($('#editor-box').width() - 18);	
	
	$('#editor-box .editor-controllers > ul > li').on({
		mouseenter: function() {
			$(this).find(".tooltip").show();
		},
		mouseleave: function() {
			$(this).find(".tooltip").hide();
		}
	})
	
	$("#editor-box").addClass("first-view");
	$(document).on("click", ".expanded #editor-box.first-view #editor, .expanded #editor-box.first-view #split-editor", function() {
		$("#editor-box").removeClass("first-view"); 
		$("#full-screen-question.expanded #question-area").animate({ width : 30 + '%' }, 500);
		$("#full-screen-question.expanded #editor-box").animate({ width : 70 + '%' }, 500);
		
		$("#editor-box .editor-controllers").removeClass("dropdown-mode");	
		$("#editor-box .editor-controllers > ul, #editor-box header .play-vs").show();
		
		if($(window).width() < 767){
			setTimeout(function(){
				if($('#editor-box').width() > resizeEditorWidth){
					$("#question-area").addClass("extra-small-view");
				}else{
					$("#question-area").addClass("extra-small-view");
				}
				
			}, 500); 
		}else {
			setTimeout(function(){
				if($('#editor-box').width() > resizeEditorWidth){
					$("#question-area").addClass("extra-small-view");
					$("#editor-box").addClass("large-view");
					$("#show-tab-lists").css('display','block');
				}else{
					$("#question-area").removeClass("extra-small-view");
					$("#editor-box").removeClass("large-view");
					$("#show-tab-lists").css('display','none');
					$(".tabs1 .nav-tabs").removeAttr("style");	
				}
				
			}, 500); 
		}
		
		
		setTimeout(function(){
			//window.dispatchEvent(new Event('resize'));
			var evt = document.createEvent('UIEvents');
			evt.initUIEvent('resize', true, false, window, 0);
			window.dispatchEvent(evt);
		}, 500);

	});
	
	$("#editor-box #editor,#flex-container").css("min-height", $(window).height() - ($("#coding-platform-head").innerHeight() + $("#editor-box header").innerHeight() + $("#editor-box .editor-footer").innerHeight() + 20));
	
	$(window).resize(function() {
		$("#editor-box #editor, #flex-container").css("min-height", $(window).height() - ($("#coding-platform-head").innerHeight() + $("#editor-box header").innerHeight() + $("#editor-box .editor-footer").innerHeight() + 20));
	});  
	
	$(document).on("click", "#challenge_edit_profile", function() {
			$("#challenge_edit_profile").hide();
			$("#challenge_save_change").show();
			$("#challenge_profile_view").hide();
			$("#challenge_profile_edit").show();
	});
	
	$(document).on("click", "#studying-here", function() {
		if(document.getElementById('studying-here').checked) {
			$("#current_company_id").hide();
			$("#designation_id").hide();
			$("#salary_id").hide();
			$("#roll_number_id").show();
		} else {
			$("#current_company_id").show();
			$("#designation_id").show();
			$("#salary_id").show();
			$("#roll_number_id").hide();
			
		}
	
	});
	
	$(document).on("click", "#show-tab-lists", function() {
		if($(window).width() < 767){
			$(".normal-view .tabs1 .nav-tabs").slideToggle("fast");
		}else{
			$(".extra-small-view .tabs1 .nav-tabs").slideToggle("fast");
		}
	});
	
	$(document).on("click", ".tabs1 .nav-tabs > li a", function() {
		$("#show-tab-lists").html($(this).html());
		
		if($(window).width() < 767){
			$(".normal-view .tabs1 .nav-tabs").slideUp("fast");
		}else{
			$(".extra-small-view .tabs1 .nav-tabs").slideUp("fast");
		}	
		
	});

	if($(window).width() < 767){
		$(document).on("click", "#contest-navigation ul > li a", function() {
			$("#contest-navigation ul").slideUp("fast");
		});
	}
	
	$(document).on("click", "#challenge_save_change", function() {
		
		var season_id = $('#profile_token_form #season_id').val();
		$("#profile_token_form .error_msg").remove();
		var first_name = $('#profile_token_form #first_name').val();
		var last_name = $('#profile_token_form #last_name').val();
		var mobile_phone = $('#profile_token_form #mobile_phone').val();
		var exp_yr = $('#profile_token_form #exp_yr').val();
		var city = $('#profile_token_form #city').val();
		var exp_month = $('#profile_token_form #exp_month').val();
		var user_skills = $('#profile_token_form #user_skills').val();
		var key_skills = $('#profile_token_form #key_skills').val();
		first_name = (typeof first_name === "undefined") ? "" : first_name;
		last_name = (typeof last_name === "undefined") ? "" : last_name;
		mobile_phone = (typeof mobile_phone === "undefined") ? "" : mobile_phone;
		exp_yr = (typeof exp_yr === "undefined") ? "" : exp_yr;
		city = (typeof city === "undefined") ? "" : city;
		exp_month = (typeof exp_month === "undefined") ? "" : exp_month;
		key_skills = (typeof key_skills === "undefined") ? "" : key_skills;
		user_skills = (typeof user_skills === "undefined") ? "" : user_skills;
		$('#challenge-details').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/saas_corporate_function.php?action=save_edit_profile';
		//
		$.post(url, {'season_id':season_id,'first_name':first_name,'last_name':last_name,'mobile_phone':mobile_phone,'exp_yr':exp_yr,'city':city,'exp_month':exp_month,'key_skills':key_skills,'user_skills':user_skills}, function(data) {
			 var msg = $.parseJSON(data);
			
			 if(msg.status == 'success') {
				$("#profile_token_form").submit();
				return true;
			} else if(msg.status == 'error') {
				var result = msg;
				$.each(result, function(k, v) {
					//display the key and value pair 
					if(k=='exp_yr'){
						$("<span class='error_msg'>"+v+"</span>").insertAfter("#profile_token_form #work_experience_div");
					} else if(k=='city'){
						$("<span class='error_msg'>"+v+"</span>").insertAfter("#profile_token_form #city_div");
					} else if(k=='mobile_phone'){
						$("<span class='error_msg'>"+v+"</span>").insertAfter("#profile_token_form #mobile_error_id");
					} else {
						$("<span class='error_msg'>"+v+"</span>").insertAfter("#profile_token_form #"+k);
					}
					
				});
				return false;
			}
		});
		
	});
	
	if($('#editor-box').width() > resizeEditorWidth1 ){
		$("#editor-box .editor-controllers").removeClass("dropdown-mode");	
		$("#editor-box header .play-vs").show();
	} else {
		$("#editor-box .editor-controllers").addClass("dropdown-mode");	
		$("#editor-box header .play-vs").hide();
	}
	
	
	$('#question-area').resize(function() {
		$("#hide-question-area").removeClass("less");
		$("#question-area").removeClass("hide-contents");
		questionAreaWidth = $('#question-area').innerWidth()* 100 / $(window).innerWidth();
		editorBoxWidth = (100 - questionAreaWidth) + '%';
		questionAreaWidth = questionAreaWidth + '%';
		
		$("#editor-box .editor-controllers.dropdown-mode > ul").removeAttr("style");	
		//$("#editor-box header").innerWidth($('#editor-box').width() - 17);	
		
		//window.dispatchEvent(new Event('resize'));
		var evt = document.createEvent('UIEvents');
		evt.initUIEvent('resize', true, false, window, 0);
		window.dispatchEvent(evt);
		
		if($('#editor-box').width() > resizeEditorWidth1 ){
			$("#editor-box .editor-controllers").removeClass("dropdown-mode");	
			$("#editor-box header .play-vs").show();
			$("#editor-box .editor-controllers.dropdown-mode > ul").removeAttr("style");	
		}else{
			$("#editor-box .editor-controllers").addClass("dropdown-mode");	
			$("#editor-box .editor-controllers.dropdown-mode > ul").hide();
			$("#editor-box header .play-vs").hide();
			$("#editor-box .editor-controllers.dropdown-mode > ul > li").removeClass("open");
		}
		
		if($('#editor-box').width() > resizeEditorWidth2 ){
			$("#question-area").addClass("small-view");
		}else{
			$("#question-area").removeClass("small-view");
		}
		
		if($('#editor-box').width() > resizeEditorWidth ){
			$("#question-area").addClass("extra-small-view");
			$("#editor-box").addClass("large-view");
			$("#show-tab-lists").css('display','block');
		}else{
			$("#question-area").removeClass("extra-small-view");
			$("#editor-box").removeClass("large-view");
			$("#show-tab-lists").css('display','none');
			$(".tabs1 .nav-tabs").removeAttr("style");	
		}
		
		if($('#question-area').width() < 5 ){
			$("#hide-question-area").addClass("less");
		}else{
			$("#hide-question-area").removeClass("less");
		}

	});
	
	var selectedTab = $(".tabs1 .nav-tabs > li.active a").html();
	
	$("#show-tab-lists").text(selectedTab);
	
	$(document).on("click", "#editor-box .editor-controllers .show-editor-controllers", function() {
		$("#editor-box .editor-controllers.dropdown-mode > ul").toggle();			
	});
	
	$(document).on("click", function(event){
		var $trigger = $("#editor-box .editor-controllers");
		if($trigger !== event.target && !$trigger.has(event.target).length){
			$(this).find("#editor-box .editor-controllers.dropdown-mode > ul").hide();
		}            
	});
	
	// Challenge details
	$(document).on("click", "#challenge_details", function() {
		
		var season_id = $('#season_id').val();
		$("#leaderboard").hide();
		$("#showsubmission").hide();
		$("#challenge_details_div").show();
		season_id = (typeof season_id === "undefined") ? "" : season_id;
		$('#challenge-details').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/ajax_load_challenge_details.php';
		$.post(url, {'season_id': season_id}, function(data) {
			$("#challenge_details_div").html('');
			$("#challenge_details_div").html(data);
			return false;
			
		});	
		
	});
	
	// Challenge details
	$(document).on("click", "#challenge_winners", function() {
		
		var season_id = $('#season_id').val();
		$("#leaderboard").hide();
		$("#showsubmission").hide();
		$("#challenge_details_div").show();
		season_id = (typeof season_id === "undefined") ? "" : season_id;
		$('#challenge_details_div').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/ajax_load_challenge_details.php';
		$.post(url, {'season_id': season_id,'request_for':'winners'}, function(data) {
			$("#challenge_details_div").html('');
			$("#challenge_details_div").html(data);
			return false;
			
		});	
		
	});
	
	
		// Challenge leaderboard
	$(document).on("click", "#challenge_leaderboard", function() {
		
		leaderboard_type = 'challenge';
		
		var page = $('#page_number').val();
		var season_id = $('#season_id').val();
		var attempt_id = $('#attempt_id').val();
		$("#challenge_details_div").hide();
		$("#showsubmission").hide();
		$("#leaderboard").show();
		if(typeof attempt_id == 'undefined' || attempt_id == '') { attempt_id = ''; }
		
		$('#view_all_leaderboard').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/load_assessment_leaderboard.php?page=' + page + '&type='+ leaderboard_type + '&season_id='+ season_id + '&attempt_id='+ attempt_id+'&contest_type=coding';
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(response) {
                data = response.trim();
                if (data.indexOf("no_record") >= 0) {
					$('#view_all_leaderboard').html('');  
					$('#view_all_leaderboard').html('<p> Be the first one to ace the leaerboard.</p>');
                } else {
                    $('#view_all_leaderboard').html('');                    
                    $('#view_all_leaderboard').html(data);                    
                }
            }
        });

		
	});
	
	
	// Challenge details
	$(document).on("click", "#about_company_details", function() {
		
		var season_id = $('#season_id').val();
		$("#leaderboard").hide();
		$("#showsubmission").hide();
		$("#challenge_details_div").show();
		season_id = (typeof season_id === "undefined") ? "" : season_id;
		$('#challenge_details_div').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/ajax_load_challenge_details.php';
		$.post(url, {'season_id': season_id,'request_for':'about_company'}, function(data) {
			$("#challenge_details_div").html('');
			$("#challenge_details_div").html(data);
			return false;
			
		});	
		
	});
	
	
	
	// Challenge details
	$(document).on("click", "#challenge_help", function() {
		
		var season_id = $('#season_id').val();
		$("#view_all_leaderboard").html('');
		$("#leaderboard").hide();
		$("#showsubmission").hide();
		$("#challenge_details_div").show();
		season_id = (typeof season_id === "undefined") ? "" : season_id;
		$('#challenge_details_div').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/ajax_load_challenge_details.php';
		$.post(url, {'season_id': season_id,'request_for':'help'}, function(data) {
			$("#challenge_details_div").html('');
			$("#challenge_details_div").html(data);
			return false;
			
		});	
		
	});
	
	
	$(document).on("click", "#discussion", function() {
		
		var season_id = $('#season_id').val();
		$("#challenge_details_div").show();
		$("#leaderboard").hide();
		$("#showsubmission").hide();
		season_id = (typeof season_id === "undefined") ? "" : season_id;
		$('#challenge_details_div').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/ajax_load_challenge_details.php';
		$.post(url, {'season_id': season_id,'request_for':'discussion'}, function(data) {
			$("#challenge_details_div").html('');
			$("#challenge_details_div").html(data);
			return false;
			
		});	
		
	});
	
	
	$(document).on("click", "#show_submission", function() {
		var season_id = $("#new_season_id").val();
		$("#leaderboard").hide();
		$("#challenge_details_div").hide();
		$("#showsubmission").show();
		$("#view_all_submission").show();
		season_id = (typeof season_id === "undefined") ? "" : season_id;
		$('#view_all_submission').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/ajax_load_challenge_details.php';
		$.post(url, {'season_id': season_id,'request_for':'submission'}, function(data) {
			$("#view_all_submission").html('');
			$("#view_all_submission").html(data);
			return false;
			
		});	
	});
	
	$instance.loadDefaultSubmissionDetails = function(season_id){
	
		$("#leaderboard").hide();
		$("#challenge_details_div").hide();
		$("#showsubmission").show();
		$("#view_all_submission").show();
		season_id = (typeof season_id === "undefined") ? "" : season_id;
		$('#view_all_submission').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/ajax_load_challenge_details.php';
		$.post(url, {'season_id': season_id,'request_for':'submission'}, function(data) {
			$("#view_all_submission").html('');
			$("#view_all_submission").html(data);
			return false;
			
		});	
		
	}
	
	$(document).on("click", "#hide-question-area", function() {

		if($(this).hasClass("less")) {
			$(this).removeClass("less");
			$("#question-area").removeClass("hide-contents");
			$('#question-area').animate({ width : questionAreaWidth }, 500);
			$('#editor-box').animate({ width : editorBoxWidth }, 500);
			//$('#editor-box header').animate({ width : editorBoxWidth - 56 }, 500);
			
		} else { 
			$(this).addClass("less");
			$("#question-area").addClass("hide-contents");
			$('#question-area').animate({ width : (4 + '%') }, 500);
			$('#editor-box').animate({ width : (96 + '%') }, 500);
			//$('#editor-box header').animate ({ width : (91.9 + '%')}, 500);
		} 
		
		$("#editor-box").removeClass("first-view"); 
		
		setTimeout(function(){
			if($('#editor-box').width() > resizeEditorWidth1 ){
				$("#editor-box .editor-controllers").removeClass("dropdown-mode");	
				$("#editor-box .editor-controllers > ul, #editor-box header .play-vs").show();	
			}else{
				$("#editor-box .editor-controllers").addClass("dropdown-mode");	
				$("#editor-box header .play-vs").hide();  
			}
			if($('#editor-box').width() > resizeEditorWidth ){
				$("#question-area").addClass("extra-small-view");
				$("#editor-box").addClass("large-view");
				$("#show-tab-lists").css('display','block');
			}else{
				$("#question-area").removeClass("extra-small-view");
				$("#editor-box").removeClass("large-view");
				$("#show-tab-lists").css('display','none');
				$(".tabs1 .nav-tabs").removeAttr("style");	
			}
		}, 500);
		
		setTimeout(function(){
			//window.dispatchEvent(new Event('resize'));
			var evt = document.createEvent('UIEvents');
			evt.initUIEvent('resize', true, false, window, 0);
			window.dispatchEvent(evt);
		}, 500);
		
	
	}); 
	
	
	$instance.loadDefaultDetails = function() {
		var season_id = $('#season_id').val();
		$("#showsubmission").hide();
		season_id = (typeof season_id === "undefined") ? "" : season_id;
		$('#challenge_details_div').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/ajax_load_challenge_details.php';
		$.post(url, {'season_id': season_id}, function(data) {
			$("#challenge_details_div").html('');
			$("#challenge_details_div").html(data);
			return false;
			
		});	
		
	} 
	

	$instance.resizeEditor = function(maxQustionWidth) {
		
		var dummyquestionAreaWidth = (typeof maxQustionWidth === "undefined") ? questionAreaWidth : maxQustionWidth;

		$(".half-column").resizable({
			handles: 'e',
			maxWidth: dummyquestionAreaWidth, 
			minWidth: 250,
			resize: function () {
				$('.half-column:first-of-type').css('width', $('.half-column:first-of-type').outerWidth() * 100 / $(window).innerWidth() + '%');
				$('.half-column:nth-of-type(2)').css('width', 100 - ($('.half-column:first-of-type').outerWidth() * 100 / $(window).innerWidth()) + '%');
			}

		});

    };

    
    $instance.setOtherEditorConfig = function(){
            headditor.setOptions({
                maxLines: Infinity,
                minLines: 5,
                readOnly: true,
                highlightActiveLine: false,
                highlightGutterLine: false,
                useWorker: false,
                fontSize: '16px'
            });

            taileditor.setOptions({
                maxLines: Infinity,
                minLines: 5,
                readOnly: true,
                highlightActiveLine: false,
                highlightGutterLine: false,
                useWorker: false,
                fontSize: '16px'
                
        });
        taileditor.$blockScrolling = Infinity;
        taileditor.getSession().foldAll();
        headditor.getSession().foldAll();
        headditor.$blockScrolling = Infinity;
        taileditor.getSession().setMode("ace/mode/javascript");
        headditor.getSession().setMode("ace/mode/javascript");
        
    };
    
    
    $instance.disableCopyPaste = function(){
    
        function disableSelection(target){
            if (typeof target.onselectstart != "undefined") //IE route
                target.onselectstart = function(){return false}
            else if (typeof target.style.MozUserSelect != "undefined") //Firefox route
                target.style.MozUserSelect = "none"
            else //All other route (ie: Opera)
                target.onmousedown = function(){return false}
                target.style.cursor = "default"
        }
        
        function clickIE() {
            if (document.all) {
                $('#submit-error .modal-body').html('Right click disabled');
                $('#submit-error').modal('show');
            }
        }
    
    
        if (document.layers) {
            document.captureEvents(Event.MOUSEDOWN);
            document.onmousedown = clickNS;
        }else {
            document.onmouseup = clickNS;
            document.oncontextmenu = clickIE;
        }
        document.oncontextmenu = new Function("return false");
        disableSelection(document.body);
        
    };
    
    $instance.handleLanguageCursor = function(countDefaultHeadCodeAfterChange){
        
        var cursorPos =  editor.getCursorPosition();
        var mainEditorLength = editor.session.getLength();

        editor.setOption("firstLineNumber", countDefaultHeadCodeAfterChange + 1);
        taileditor.setOption("firstLineNumber", countDefaultHeadCodeAfterChange+mainEditorLength+1);

        $("#RowNum").text(cursorPos.row+countDefaultHeadCodeAfterChange + 1);
        $("#ColsNum").text(cursorPos.column);

        editor.getSession().selection.on('changeCursor', function(e) {
        var cursorPos =  editor.getCursorPosition();

        $("#RowNum").text(countDefaultHeadCodeAfterChange+cursorPos.row+1);
            $("#ColsNum").text(cursorPos.column);
            taileditor.setOption("firstLineNumber", countDefaultHeadCodeAfterChange+cursorPos.row + 1);
        });
    };
    
    $instance.SetEditorValuesOnCodeUpload = function(msg){
        var question_id = $('option:selected', $('.change-language-confirmation-testcase')).attr('question_id');
        var evaluationType = $('option:selected', $('.change-language-confirmation-testcase')).attr('evaluationType');
        var lang_id = $('option:selected', $('.change-language-confirmation-testcase')).attr('lang_id');   
        
        var url = base_url+'/ajax_files/saas_candidate_function.php?action=selectTemplate';
            $.post(url,{'question_id':question_id,'lang_id':lang_id,'evaluationType': evaluationType},function(data) {
                if($.trim(data.headTemplate) !=='' || $.trim(data.footTemplate) !==''){
                    
                    $instance.setOtherEditorConfig();
                    
                    headditor.setValue(data.headTemplate, 1);
                    taileditor.setValue(data.footTemplate, 1)

                    $(".tail-split-editor").show();$(".tail-split-editor").show();
                    $("#split-editor").show();
                    var headLines = data.headTemplate.split(/\r\n|\r|\n/);
                    var countDefaultHeadCodeAfterChange = headLines.length;

                    var tailLines = data.footTemplate.split(/\r\n|\r|\n/);
                    var countDefaultTailCodeAfterChange = tailLines.length;

                    } else {
                        $("#split-editor").hide();
                        $(".tail-split-editor").hide();

                    }
                    
                    editor.setValue(msg.code, 1);
                    
                    if($.trim(data.headTemplate) !=='' || $.trim(data.footTemplate) !==''){
                        $('#editor').addClass('for-split-editors');
                        var headLines = data.headTemplate.split(/\r\n|\r|\n/);
                        var countDefaultHeadCodeAfterChange = headLines.length;
                        $instance.handleLanguageCursor(countDefaultHeadCodeAfterChange);
                                
                    } else {
                        $('#editor').addClass('for-split-editors');
                        editor.setOption("firstLineNumber",  1);
                        var headLines = data.middleTemplate.split(/\r\n|\r|\n/);
                        var countDefaultMiddleCodeAfterChange = headLines.length;
                        var cursorPos =  editor.getCursorPosition();

                        $("#RowNum").text(countDefaultMiddleCodeAfterChange);
                        $("#ColsNum").text(cursorPos.column);
                        editor.getSession().selection.on('changeCursor', function(e) {
                            var cursorPos =  editor.getCursorPosition();
                            $("#RowNum").text(cursorPos.row+1);
                            $("#ColsNum").text(cursorPos.column);
                        });

                    }
                    $('#auto-complete').trigger('click');
                    updateUserCode();
                    $instance.setModeFromHash();

                        });				
            
    };
    
    $instance.init = function(default_selected_language, defaultCode, defaultLanguage, defaultHeadCode, defaultTailCode) {
        
        $(document).on('click', '.save-user-code-diff', function(){
        var encrypt_token = $('#encrypt_token').val();
        var code = editor.getValue();
        $.ajax({
                type: "POST",
                url: base_url + '/ajax_files/saas_corporate_function.php?action=save_user_code_on_click',
                data: {encrypt_token: encrypt_token, code:code},
                dataType: 'json',
                cache: false,
                success: function (data) {
                    $('.saved-code-diff').text(data.cnt)
                    $('.diff-btn').parent().show();
                 }
            });
    });
    
    $(document).on('click', '.get-user-code-diff', function(){
        var encrypt_token = $('#encrypt_token').val();
        $.ajax({
                type: "POST",
                url: base_url + '/ajax_files/saas_corporate_function.php?action=get_user_code_on_click',
                data: {encrypt_token: encrypt_token},
                dataType: 'json',
                cache: false,
                success: function (data) {
               
                    if(data.cnt != 0){
                        $('.saved-code-diff').text(data.cnt)
                        $('.code-compare-elements').find('option').remove();
                        $('.code-compare-elements').append(data.options);
                        $('.diff-btn').parent().show();
                     }else{
                        $('.diff-btn').parent().hide();
                     }
                 }
            });
    });
    
    $(document).on('change', '.code-compare-elements', function(){
        
        var encrypt_token = $('#encrypt_token').val();
        var file_name =  $(".code-compare-elements option:selected" ).val();
        
        $.ajax({
                type: "POST",
                url: base_url + '/ajax_files/saas_corporate_function.php?action=get_user_code_for_diff',
                data: {encrypt_token: encrypt_token,file_name:file_name},
                dataType: 'json',
                cache: false,
                success: function (data) {
               
                     var ace_editor2 = ace.edit('ace-editor2');
                     ace_editor2.setValue(data.code);
                 }
            });
        
    });
    
    $('.get-user-code-diff').trigger('click');
        
        
        $(document).on('click', '.save-compare-change', function(){
            
            var ace_editor1 = ace.edit('ace-editor1');
            var code =  ace_editor1.getValue();
            editor.setValue(code);
            $('.compare-code-full').removeClass('hide');
            $('.compare-code-header').addClass('hide');
            $('#flex-container').addClass('hide-compare');
			
			var maxQustionWidth = $("#maxquestion-width").val();
			Tg_ChallengeDetailPage.resizeEditor(maxQustionWidth);
            
        });
        
        $(document).on('click', '.discard-compare-change', function(){
           
            $('.compare-code-full').removeClass('hide');
            $('.compare-code-header').addClass('hide');
            $('#flex-container').addClass('hide-compare'); 

			var maxQustionWidth = $("#maxquestion-width").val();
			Tg_ChallengeDetailPage.resizeEditor(maxQustionWidth);
            
        });
        
        $(document).on('click', '.diff-btn', function(){
        
         $('.code-compare-elements').find('option').remove();
         $('.get-user-code-diff').trigger('click');
        
        setTimeout(function(){
            var encrypt_token = $('#encrypt_token').val();
            var file_name =  $(".code-compare-elements option:first").val();
            
            $.ajax({
                    type: "POST",
                    url: base_url + '/ajax_files/saas_corporate_function.php?action=get_user_code_for_diff',
                    data: {encrypt_token: encrypt_token,file_name:file_name},
                    dataType: 'json',
                    cache: false,
                    success: function (data) {
                
                        var ace_editor2 = ace.edit('ace-editor2');
                        ace_editor2.setValue(data.code);
                    }
                });
        },500);
            
        var evaluationType = $('option:selected', $('.change-language-confirmation-testcase')).attr('evaluationType');
        var editorBoxWidth = $('#editor-box').innerWidth();
		
        $('.compare-code-full').addClass('hide');
        $('.compare-code-header').removeClass('hide');
		
		$("#full-screen-question.expanded #question-area").animate({ width : 30 + '%' }, 500);
		$("#full-screen-question.expanded #editor-box").animate({ width : 70 + '%' }, 500);
           
            
         var code = editor.getValue();
        var lang = $(".change-language-confirmation-testcase option:selected" ).val();
    
         setTimeout(function(){
        var aceDiffer = new AceDiff({
                mode: "ace/mode/"+lang,
                left: {
                    id: "ace-editor1",
                    content: code
                    },
                right: {
                    id: "ace-editor2",
                    content: ''
                    },
                classes: {
                    gutterID: "gutter"
                    }
                });
         },500);
        
        $('#flex-container').removeClass('hide-compare');
       // $('#flex-container').css('postion','relative').css('top','auto');
		
		setTimeout(function(){
			if($('#editor-box').width() > resizeEditorWidth ){
				$("#question-area").addClass("extra-small-view");
				$("#editor-box").addClass("large-view");
				$("#show-tab-lists").css('display','block');
			}else{
				$("#question-area").removeClass("extra-small-view");
				$("#editor-box").removeClass("large-view");
				$("#show-tab-lists").css('display','none');
				$(".tabs1 .nav-tabs").removeAttr("style");	
			}
		}, 500);
		

        setTimeout(function(){
			var maxQustionWidth = $("#full-screen-question.expanded #question-area").innerWidth();
			//$("#maxquestion-width").val(maxQustionWidth);
			Tg_ChallengeDetailPage.resizeEditor(maxQustionWidth);
			$("#question-area").trigger('resize');
		}, 1000);
		
        });
        
        
        $(document).on('change', '.change-language-confirmation-testcase', function(){
            var question_id = $('option:selected', this).attr('question_id');
            var evaluationType = $('option:selected', this).attr('evaluationType');
            var lang_id = $('option:selected', this).attr('lang_id');
			var season_id = $("#season_id").val();            
			var attempt_id = $("#attempt_id").val();            
            var newVal = $(this).val();
			
			// Save Use Code 
			updateUserCode();
			//Warning : Existing code will be overwritten!
            bootbox.hideAll();
           /* bootbox.confirm({ 
            title: "Are you sure you wish to change language?",
            message: "<p class='alert alert-warning'></p>", 
            callback: function(result){ 
            if(result) {*/
			default_selected_language = newVal;
			$("#defaultlanguage").val(newVal);
			
            var url = base_url+'/ajax_files/saas_candidate_function.php?action=selectTemplate';
            $.post(url,{'question_id':question_id,'lang_id':lang_id,'evaluationType': evaluationType,'language':default_selected_language,'attempt_id':attempt_id,'season_id':season_id},function(data) {
                if($.trim(data.headTemplate) !=='' || $.trim(data.footTemplate) !==''){
                    $('#editor').addClass('for-split-editors');
                    $instance.setOtherEditorConfig();
                    
                    headditor.setValue(data.headTemplate, 1);
                    taileditor.setValue(data.footTemplate, 1)

                    $(".tail-split-editor").show();$(".tail-split-editor").show();
                    $("#split-editor").show();
                    var headLines = data.headTemplate.split(/\r\n|\r|\n/);
                    var countDefaultHeadCodeAfterChange = headLines.length;

                    var tailLines = data.footTemplate.split(/\r\n|\r|\n/);
                    var countDefaultTailCodeAfterChange = tailLines.length;

                    } else {
                        $("#split-editor").hide();
                        $(".tail-split-editor").hide();

                    }

                    if(data.middleTemplate !==''){
                        editor.setValue(data.middleTemplate, 1);
                    }

                    if($.trim(data.headTemplate) !=='' || $.trim(data.footTemplate) !==''){
                        $('#editor').addClass('for-split-editors');
                        var headLines = data.headTemplate.split(/\r\n|\r|\n/);
                        var countDefaultHeadCodeAfterChange = headLines.length;
                        $instance.handleLanguageCursor(countDefaultHeadCodeAfterChange);
                                
                    } else {
                        $('#editor').removeClass('for-split-editors');
                        editor.setOption("firstLineNumber",  1);
                        var headLines = data.middleTemplate.split(/\r\n|\r|\n/);
                        var countDefaultMiddleCodeAfterChange = headLines.length;
                        var cursorPos =  editor.getCursorPosition();

                        $("#RowNum").text(countDefaultMiddleCodeAfterChange);
                        $("#ColsNum").text(cursorPos.column);
                        editor.getSession().selection.on('changeCursor', function(e) {
                            var cursorPos =  editor.getCursorPosition();
                            $("#RowNum").text(cursorPos.row+1);
                            $("#ColsNum").text(cursorPos.column);
                        });

                    }
                    $instance.setModeFromHash();
                    updateUserCode();
                    $('#auto-complete').trigger('click');
                        });				
                   /* } else {
			$(".change-language-confirmation-testcase").val(default_selected_language); //set back
                            return; //abort!
            }}
		});*/

        });
        
        
    $('#uploadUserCode').click(function(){
		$('#upload-user-code-attention').modal('hide');
		$('#upload-user-code').modal('show');
	});
	
	$('#uploadUserCodeFile').click(function(){
		//$('#uploadUserCodeFile').val( "Processing..." );
		//$('#uploadUserCodeFile').addClass( "disabled" );
		var encrypt_token = $('#encrypt_token').val();
		var extension = $('#extension').val();
		var language = $('#select-language').val();
		var file_data = $('#code_upload').prop('files')[0];   
		var form_data = new FormData();                  
		form_data.append('file', file_data);
		form_data.append('encrypt_token', encrypt_token);  
		form_data.append('language', language);	
		$('#upload-user-code .alert').remove();
		$('p .alert').remove();
		$.ajax({
				url: base_url+'/ajax_files/saas_candidate_function.php?action=UploadUserCode', 
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,                         
				type: 'post',
				success: function(data){
					var msg = data; 
					if(msg.status == 'success') {
						$( "<span class='alert alert-success left'> "+msg.message+" </span>" ).insertBefore("#uploadUserCodeFile");
						
						$("#modeSelect").find('option').removeAttr("selected");
						 //editor.setValue(msg.code);
						 $('#modeSelect option[value='+msg.language+']').prop('selected', true);
						 $("#defaultlanguage").val(msg.language);
						 
                         $instance.SetEditorValuesOnCodeUpload(msg);
                         
						 //editor.session.setMode("ace/mode/" + msg.language);
						 setTimeout(function(){$('#upload-user-code').modal('hide');}, 1000);	
					} else {
						$( "<p class='alert alert-info' style='word-break:break-all;display:block;margin-top:20px;'> "+msg.message+" like ("+extension+") </p>" ).insertAfter("#upload-dialogue #uploadUserCodeFile");
						//$('#upload-user-code .alert-info').show();
					}
				}
		 });
	});
    
		$(document).on("click", ".rating1" , function() {
            
            var season_id = $(this).data('season_id');
            var question_id = $(this).data('question_id');
            var attempt_id = $(this).data('attempt_id');
            var user_id = $(this).data('user_id');
            var rating = $('#rating_area .rating1 > ul > li.active').length;
			var url = base_url+'/ajax_files/saas_corporate_function.php?action=submit_rating';
            $.post(url,{'user_id':user_id,'attempt_id':attempt_id,'feedback':'','season_id':season_id, 'question_id':question_id,'rating':rating},function(data) {
		
				});
        });
        $(document).on("click", ".submit-rating-feedback" , function() {
            
            var season_id = $(this).data('season_id');
            var question_id = $(this).data('question_id');
            var attempt_id = $(this).data('attempt_id');
            var user_id = $(this).data('user_id');
            var rating = $('.rating1 > ul > li.active').length;
            var feedback = $.trim($('.feedback-suggestion').val());
            
            var checkedValue = $("[name=improve]:checked").length; 
		checkedValue = $.trim(checkedValue);

                
		$("#deactivate_warning").hide();
		$("#deactivate_error").hide();
		
		var obj = $('input[name=improve]');
		var selectedImproves = '';

		// Loop through all check boxes and prepare string for selected reasons
		for (i = 0; i < obj.length; i++) {
			if (obj[i].type == "checkbox" && obj[i].checked == true) {

				var reason = obj[i].value; 
				if (reason != '') {
					if (selectedImproves == "") {
						selectedImproves = reason;
					} else {
						selectedImproves = selectedImproves + ',' + reason;
					}
				}
			}
            }
            
            
            var url = base_url+'/ajax_files/saas_corporate_function.php?action=submit_rating';
            $.post(url,{'selectedImproves':selectedImproves,'user_id':user_id,'attempt_id':attempt_id,'feedback':feedback,'season_id':season_id, 'question_id':question_id,'rating':rating},function(data) {
		 var data = $.parseJSON(data);
                    if(data.status == 'success'){
			$('.msgErrortop .message-box').addClass('success-msg').find('p').text(data.msg);
                        Tg_CommonFunction.clearMessage();
                        $('#how-to-improve').modal('hide');
                    }else{
                        $('.msgErrortop .message-box').addClass('error-msg').find('p').text(data.msg);
                        Tg_CommonFunction.clearMessage();
                    }
		});
        });
        
		
		$('.submit-user-feedback').on('click' ,function(){
            var feedback = $.trim($('#feedback').val());
			if(feedback==''){
				$('#feedback').next(".error_msg").show();
			}
			var matches = [];
			$("input[name='rating_criteria[]']:checked").each(function() {
				matches.push(this.value);
			});
			$('#improvement_id').hide();
			$('#feedback').next(".error_msg").hide();
	
			if(matches==''){
				$('#improvement_id').show();
			}
		
            var season_id = $.trim($("#season_id").val());
            var question_id = $.trim($("#question_id").val());
            var attempt_id = $.trim($("#attempt_id").val());
            var user_id = $.trim($("#user_id").val());
		    var rating = $('#rating_area .rating1 > ul > li.active').length;
			
	        if(feedback != '' && matches!=''){
                var url = base_url+'/ajax_files/saas_corporate_function.php?action=submit_user_suggestions';
                $.post(
                        url,{'user_id':user_id,
                            'attempt_id':attempt_id,
                            'feedback':feedback,
                            'season_id':season_id,
                            'question_id':question_id,
                            'rating_criteria':matches,
                            'rating':rating
                        },function(data) {
                    var data = $.parseJSON(data);
                    if(data.status == 'success'){
						$('#success_msg').show();
						$('#success_msg').html(data.msg);
                        $('#suggest-edits').modal('hide');
						setTimeout(function() {
                            $("#user-feedback-form").hide();
                            }, 2000);
	                 }else{
						$('#success_msg').show();
						$('#success_msg').html(data.msg);
                        $('#suggest-edits').modal('hide');
						setTimeout(function() {
                                $("#user-feedback-form").hide();
                        }, 2000);
						
	                }
		});
            }else{
				
                $('#feedback').next(".error_msg").show();
             	return false;
            }
        });
		
		
	$('.submit-feedback').on('click' ,function(){
            var feedback = $.trim($('.textarea-helpus').val());
            var season_id = $(this).attr('season_id');
            var question_id = $(this).attr('question_id');
            var attempt_id = $(this).attr('attempt_id');
            var user_id = $(this).attr('user_id');
            var rating = $('.rating1 > ul > li.active').length;
            if(feedback != ''){
                var url = base_url+'/ajax_files/saas_corporate_function.php?action=submit_suggestions';
                $.post(
                        url,{'user_id':user_id,
                            'attempt_id':attempt_id,
                            'feedback':feedback,
                            'season_id':season_id,
                            'question_id':question_id,
                            'rating':rating
                        },function(data) {
                    var data = $.parseJSON(data);
                    if(data.status == 'success'){
			$('.msgErrortop .message-box').addClass('success-msg').find('p').text(data.msg);
                        Tg_CommonFunction.clearMessage();
                        
                        $('#suggest-edits').modal('hide');
                    }else{
                        $('.msgErrortop .message-box').addClass('error-msg').find('p').text(data.msg);
                        Tg_CommonFunction.clearMessage();
                        $('#suggest-edits').modal('hide');
                    }
		});
            }else{
                $('.msgErrortop .message-box').addClass('error-msg').find('p').text("Please provide feedback!!");
                Tg_CommonFunction.clearMessage();
            }
        });
		
		$(document).on('click', '#show_owntestcase', function () {
			$("#testcase_status_heading, #code_result_heading, #testcase_status, #code_result").hide(); 
			
			
			$(".user-action-tabs").show();
			$('.user-action-tabs .nav-tabs > li a[href="#custom-input-content"]').tab('show');	
			
			if ($(this).hasClass('show')) {
                $(this).removeClass('show');
				//$('#own_testcase').hide();
            } else {
                $(this).addClass('show');
				//$('#own_testcase').show();
            }


			setTimeout(function(){ 
				var href= "#editor-bottom-move";
				var target=$(href).parents(".mCustomScrollbar"); 
				target.mCustomScrollbar("scrollTo",href);
				$('html, body').animate({scrollTop: $("#editor-main-footer").offset().top - 25}, 1000);
			}, 800);
			 
			 $("#editor-box .editor-controllers.dropdown-mode > ul").hide();
			
		});
		
		$(document).on('click', '.user-action-tabs button.close', function () {
			$(".user-action-tabs").hide();
		});
		
		$(document).on('click', '.timeline-version ul li a', function () {
			$(".timeline-version ul li").removeClass('active');
			$(this).parent().addClass('active');	
			
			if($(this).parent().hasClass("current")){
				$("#delete-buffer").hide();
			}else{
				$("#delete-buffer").show();
			}
		});
		
		var attempt_encrypt_token = $('#encrypt_token').val();
		$instance.loadBufferCode(attempt_encrypt_token);
			
		$(document).on('click', '#delete-buffer', function () {
			$("#delete-buffer-code").modal('show');
			var bufferTargetValue = $(".timeline-version ul li.active a").attr('data-target');
			$("#delete-buffer-code span.buffer-cnt").text(bufferTargetValue);
		});

			
		$(document).on('click', '#create-new-buffer', function () {
			$("#create-buffer").modal('show');
			var bufferTargetValue = $(".timeline-version ul li.active a").attr('data-target');
			$("#create-buffer span.buffer-cnt").text(bufferTargetValue);
			
		});
		
                //auto suggestion display in editor
                $(document).on('click','#auto-complete',function(){
                   
                    var autoCodeEnbaled = $('#auto-complete').is(':checked');
                    if(autoCodeEnbaled == true){
                            editor.setOptions({
                                enableBasicAutocompletion: true,
                                enableSnippets: true
                        });
                    }
                    
                });
                
                
                $(document).on('change','.tab_space',function(){
                   var tabsize =  $(".tab_space option:selected" ).val();
                   
                            editor.setOptions({
                                tabSize: tabsize,
                    });
                    
                });
                
                
		$(document).on('click','.set-original-code',function(){
                var question_id = $(this).attr("question_id");
                var lang_id = $(".change-language-confirmation-testcase option:selected" ).attr('lang_id');
                var evaluationType = $(".change-language-confirmation-testcase option:selected" ).attr('evaluationType');
                var url = base_url+'/ajax_files/saas_candidate_function.php?action=selectTemplate';
                $.post(url,{'question_id':question_id,'lang_id':lang_id, 'evaluationType':evaluationType},function(data) {
                        $("#initial_code").html('');	
                        $("#initial_code").html(data.middleTemplate);	
                        $instance.setModeFromHash();
                        
                        $('textarea').mousedown(function(event) {
                            if(event.which == 3){
                                    var THIS = $(this);
                                    THIS.focus();
                                    THIS.select();
                                    javascript:void(document.oncontextmenu=null);
                              }
                            });
                            $("#user-original-code-attention").modal('show');
                        });
                });
                
        $.getScript(theme_url + "/javascript/bootbox.min.js")
            .done(function() {	
                            
				var evaluation_type = $('#evaluation_type').val();
                                var autoCodeEnbaled = $('#auto-complete').is(':checked');
                                
				//create editor
				//#region not relevant to tern, just some deafults I prefer
				editor.setTheme("ace/theme/xcode");
				editor.getSession().setUseWrapMode(true);
				editor.getSession().setWrapLimitRange(null, null);
				editor.setShowPrintMargin(false);
				editor.$blockScrolling = Infinity;
				
                                var modeVal = "ace/mode/" + defaultLanguage;

				if(defaultLanguage == 'objc') {
                                    modeVal = "ace/mode/c";
				} else if (defaultLanguage == 'go') {
                                    modeVal = "ace/mode/golang";
				}else if (defaultLanguage == 'php7') {
                                    modeVal = "ace/mode/php";
                                }
                                editor.session.setMode(modeVal);

				ace.config.loadModule('ace/ext/tern', function () {
					editor.setOptions({
						/**
						 * Either `true` or `false` or to enable with custom options pass object that
						 * has options for tern server: http://ternjs.net/doc/manual.html#server_api
						 * If `true`, then default options will be used
						 */
						enableTern: {
							/* http://ternjs.net/doc/manual.html#option_defs */
							defs: ['browser', 'ecma5'],
							/* http://ternjs.net/doc/manual.html#plugins */
							plugins: {
								doc_comment: {
									fullDocs: true
								}
							},
                                                
                                                switchToDoc: function (name, start) {
                                                            console.log('switchToDoc called but not defined. name=' + name + '; start=', start);
                                                },
                                                startedCb: function () {
                                                        //once tern is enabled, it can be accessed via editor.ternServer
                                                        console.log('editor.ternServer:', editor.ternServer);
                                                }
						}
					});
				});
				
                                $('#auto-complete').trigger('click');
                                
				//#region not relevant to tern (custom beautify plugin) and demo loading
				ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
					editor.setOptions({
						autoBeautify: true
					});
					
					//modify beautify options as needed:
					window.beautifyOptions = beautify.options;
				});
                                
                                
                                
				editor.setOptions({
					maxLines: Infinity,
					minLines: 20,
					fontSize: '16px',
                                        tabSize: 4,
                                        useSoftTabs: true
				});
                                
                                
				editor.setValue(defaultCode, 1);

				if(evaluation_type ==2){

                    if($.trim(defaultHeadCode)) {
                        var headLines = defaultHeadCode.split(/\r\n|\r|\n/);
                        var countDefaultHeadCode = headLines.length;

                        headditor.renderer.$cursorLayer.element.style.display = "none";

                        headditor.setOptions({
                            maxLines: Infinity,
                            minLines: 5,
                            readOnly: true,
                            highlightActiveLine: false,
                            highlightGutterLine: false,
                            useWorker: false,
                            fontSize: '16px'
                        });
                        headditor.setValue(defaultHeadCode, 1);
                        headditor.getSession().foldAll();
                        $("#split-editor").show();
                    }else{
                        $("#split-editor").hide();
                    }
                    if($.trim(defaultTailCode)) {
                        var tailLines = defaultTailCode.split(/\r\n|\r|\n/);
                        var countDefaultTailCode = tailLines.length;
                        taileditor.renderer.$cursorLayer.element.style.display = "none";

                        taileditor.setOptions({
                            maxLines: Infinity,
                            minLines: 5,
                            readOnly: true,
                            highlightActiveLine: false,
                            highlightGutterLine: false,
                            useWorker: false,
                            fontSize: '16px'
                        });
                        taileditor.setValue(defaultTailCode, 1);
                        taileditor.getSession().foldAll();
                        $(".tail-split-editor").show();
                    }else{

                        $(".tail-split-editor").hide();
                    }


                }

				//Default
				var range = editor.getSelectionRange();
				var Rowscount = range.start;
                var rowscnt = Rowscount.row;
                $("#RowNum").text(rowscnt+1);
				var colscnt = Rowscount.column;
				$("#ColsNum").text(colscnt+1);
				
				//on-change cursor
				editor.getSession().selection.on('changeCursor', function(e) {
				var range = editor.getSelectionRange();
				var Rowscount = range.start;

                var rowscnt = Rowscount.row;
                $("#RowNum").text(rowscnt+1);
				var colscnt = Rowscount.column;
				
				$("#ColsNum").text(colscnt+1);
				$("#code_execute").val(1);

                    if(evaluation_type == 2) {
                        if($.trim(defaultTailCode) && $.trim(defaultHeadCode)) {
                            var cursorPos = editor.getCursorPosition();
                            var mainEditorLength = editor.session.getLength();

                            $("#RowNum").text(cursorPos.row + countDefaultHeadCode + 1);
                            $("#ColsNum").text(cursorPos.column);
                            taileditor.setOption("firstLineNumber", cursorPos.row + countDefaultHeadCode + 2);
                            taileditor.getSession().foldAll();
                            headditor.getSession().foldAll(1, 28);
                        }
                    }
				});

				
                if(evaluation_type ==2){
                    if($.trim(defaultTailCode) && $.trim(defaultHeadCode)) {
                        headditor.session.setMode(modeVal);
                        taileditor.session.setMode(modeVal);

                        headditor.setReadOnly(true);
                        taileditor.setReadOnly(true);

                        var cursorPos = editor.getCursorPosition();
                        var mainEditorLength = editor.session.getLength();

                        editor.setOption("firstLineNumber", countDefaultHeadCode + 1);
                        taileditor.setOption("firstLineNumber", countDefaultHeadCode + mainEditorLength + 1);

                        $("#RowNum").text(cursorPos.row + countDefaultHeadCode + 1);
                        $("#ColsNum").text(cursorPos.column);
                        taileditor.getSession().foldAll();
                        headditor.getSession().foldAll(1, 28);
                    }
                }
                

                //editor.setOption("firstLineNumber", headlines);

            })
            .fail(function() {
                console.log('JS not loaded');
            })
		
        
		
    }
	
	$instance.findTextInsideUrl = function(person){	
		if (window.location.toString().indexOf(person) >= 0) {
			//active tab sample problem
			$('#need-help .nav-tabs li:eq(2)').find('a').trigger('click'); // Select first tab
		} else {
			//nothing
		}
	}
	
	$instance.setModeFromHash = function(){	
		
            var available = [];
            var modeSelect = document.getElementById('modeSelect');
            var evaluation_type = $('#evaluation_type').val();
            for (var i = 0; i < modeSelect.options.length; i++) {
                available.push(modeSelect.options[i].value);
            }
           // var mode = window.location.hash.replace('#', '');
		    var mode = modeSelect.options[modeSelect.selectedIndex].value;
            if (!mode || available.indexOf(mode) === -1) {
                window.location.hash = modeSelect.value;
                $instance.setModeFromHash();
                return;
            }
			
            if (modeSelect.value != mode)
                modeSelect.options[available.indexOf(mode)].selected = true;
			
			if(mode == 'objc') {
				editor.session.setMode("ace/mode/c");
			} else if (mode == 'go') {
				editor.session.setMode("ace/mode/golang");
			} else {
				editor.session.setMode("ace/mode/" + mode);
			}
			  /*           	 	
			 var f = $("#" + mode + "_template").val();
			 editor.setValue(f);
			 //$("#own_testcase").hide();
			 $("#testcase_status_heading").hide();
			 $("#testcase_status").hide();
			 $("#code_result_heading").hide();
			 $("#code_result").hide();
			 if(evaluation_type==2){
				 
				var default_Head_Code = $("#" + mode + "_head_template").val();
			    if(default_Head_Code.replace(/\s/g,"")==''){
					 var headlines = 1;
					 editor.setOption("firstLineNumber", headlines)
				} else {
					var lines = default_Head_Code.split(/\r\n|\r|\n/); 
					var headlines = lines.length+1;
					editor.setOption("firstLineNumber", headlines)
				}	

				editor.on('change', function() { 
					var countlines = editor.session.getLength();
					$instance.setTailFirstLine(countlines);
				});	 

				 
			 } */
	}
	
	$instance.setHeadTailCode = function(countlines){	
	
			var available = [];
            var modeSelect = document.getElementById('modeSelect');
            for (var i = 0; i < modeSelect.options.length; i++) {
                available.push(modeSelect.options[i].value);
            }
        
		    var mode = modeSelect.options[modeSelect.selectedIndex].value;
                  
			var default_Head_Code = $("#" + mode + "_head_template").val();
			var default_Tail_Code = $("#" + mode + "_tail_template").val();
			 
			if(default_Head_Code.replace(/\s/g,"")==''){
				$("#split-editor").hide();
			} else {
				$("#split-editor").show();
			}
			
			if(default_Tail_Code.replace(/\s/g,"")==''){
				$(".tail-split-editor").hide();
			} else {
				$(".tail-split-editor").show();
			}
			
			// Set ace editor-box
			
			
			var headeditor = ace.edit("split-editor");
			headeditor.setTheme("ace/theme/monokai");
			headeditor.getSession().setMode("ace/mode/javascript");
			headeditor.setTheme("ace/theme/xcode");
			
			ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
				headeditor.setOptions({
					autoBeautify: true
				});
				
				//modify beautify options as needed:
				window.beautifyOptions = beautify.options;
			});
			headeditor.renderer.$cursorLayer.element.style.display = "none";
				
			headeditor.setOptions({
				maxLines: Infinity,
				minLines: 5,
				readOnly: true,
				highlightActiveLine: false,
				highlightGutterLine: false,
				useWorker: false,
				fontSize: '16px'
			});
			
			headeditor.setValue(default_Head_Code, 1);
			headeditor.getSession().foldAll(1, 28);
			headeditor.getReadOnly(true);
			var lines = default_Head_Code.split(/\r\n|\r|\n/);
			var headlines = lines.length;
			
			// Call Tail editor
			$instance.setTailFirstLine(countlines);
	}
	
	
	$instance.setTailFirstLine = function(countlines){	
	
			var available = [];
            var modeSelect = document.getElementById('modeSelect');
            for (var i = 0; i < modeSelect.options.length; i++) {
                available.push(modeSelect.options[i].value);
            }
            // var mode = window.location.hash.replace('#', '');
		    var mode = modeSelect.options[modeSelect.selectedIndex].value;
			var default_Head_Code = $("#" + mode + "_head_template").val();
			var default_Tail_Code = $("#" + mode + "_tail_template").val();
			
			var lines = default_Head_Code.split(/\r\n|\r|\n/);
			var headlines = lines.length;    
		
			
			if(default_Tail_Code.replace(/\s/g,"")==''){
				$(".tail-split-editor").hide();
			} else {
				$(".tail-split-editor").show();
			}
			
			var lineNumberTailCounter = countlines+headlines+1;
			
				var taileditor = ace.edit('split-tail-editor');
				taileditor.setTheme("ace/theme/monokai");
				taileditor.getSession().setMode("ace/mode/javascript");
				taileditor.setTheme("ace/theme/xcode");
				taileditor.setOptions({
					maxLines: Infinity,
					minLines: 5,
					readOnly: true,
					highlightActiveLine: false,
					highlightGutterLine: false,
					useWorker: false,
					fontSize: '16px'
				});
				
				ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
					taileditor.setOptions({
						autoBeautify: true
					});
					
					//modify beautify options as needed:
					window.beautifyOptions = beautify.options;
				});
				taileditor.renderer.$cursorLayer.element.style.display = "none";
				taileditor.setValue(default_Tail_Code, 1);
				taileditor.setOption("firstLineNumber", lineNumberTailCounter)
				taileditor.getReadOnly(true);
				taileditor.getSession().foldAll();
				
	
	}
	
//	$instance.setOriginalCode = function(){
//                var question_id=$("")
//                var url = base_url+'/ajax_files/saas_candidate_function.php?action=selectTemplate';
//                $.post(url,{'question_id':question_id,'lang_id':lang_id},function(data) {
//                    var data = $.parseJSON(data);
//                        $("#initial_code").html('');	
//                        $("#initial_code").html(data.middleTemplate);	
//                        
//                        $('textarea').mousedown(function(event) {
//                            if(event.which == 3){
//                                    var THIS = $(this);
//                                    THIS.focus();
//                                    THIS.select();
//                                    javascript:void(document.oncontextmenu=null);
//                              }
//                            });
//                            $("#user-original-code-attention").modal('show');
//                        });	
//                
//	}
	
	// delete current buffer code
	$instance.deleteCurrentBufferCode = function(){
		
		try {
				var save_for_language = $( "#defaultlanguage" ).val();
				var default_Code = $("#" + save_for_language + "_template").val();
				var current_buffer_id = $(".timeline-version ul li.active a").attr('id');
				var attempt_encrypt_token = $('#encrypt_token').val();
				current_buffer_id = (typeof current_buffer_id === "undefined") ? "" : current_buffer_id;
				
				if(current_buffer_id==''){
					return false;
				}
				
				var url = base_url+'/ajax_files/saas_corporate_function.php?action=delete_user_buffer';
				$.post(url,{'encrypt_token':attempt_encrypt_token,'current_buffer_id':current_buffer_id},function(data) {
					var data = $.parseJSON(data);
					if(data.status=='success'){
						$instance.loadBufferCode(attempt_encrypt_token);
						$instance.viewBufferCode();
						editor.setValue(default_Code, 1);
						editor.getReadOnly(false);
						
						// load buffer
						$instance.loadBufferCode(attempt_encrypt_token);
						$("#delete-buffer-code").modal('hide');	
						$("#delete-buffer").hide();
					}
					
				});
			
			} catch(e){
				//alert(e.description);
			}
		
	}
	
	
	/*
	* Save code buffer code
	*/
	$instance.showBufferCode = function(bufferStatus){

		try {
		
			var code  = editor.getValue();
			if(!code) {
				return false;
			}
			var save_for_language = $( "#defaultlanguage" ).val();
			var attempt_encrypt_token = $('#encrypt_token').val();
			var contest_current_link = $('#contest_current_link').val();
			var default_Code = $("#" + save_for_language + "_template").val();
			var url = base_url+'/ajax_files/saas_corporate_function.php?action=save_user_buffer';
			$.post(url,{'encrypt_token':attempt_encrypt_token,'code':code,'save_for_language':save_for_language,'contest_current_link':contest_current_link,'buffer_status':bufferStatus},function(data) {
				var data = $.parseJSON(data);
				if(data.status=='success'){
					// load buffer
					$instance.loadBufferCode(attempt_encrypt_token);
					
					if(bufferStatus=='E'){
						editor.setValue(code, 1);
						$("#create-buffer").modal('hide');			
					} else if(bufferStatus=='N'){
						editor.setValue(default_Code, 1);
						$("#create-buffer").modal('hide');					
					} else if(bufferStatus=='D'){
						("#show_confrim_delete").modal('show');
					}
				}
				
			});
		
		}catch(e){
			//alert(e.description);
		}

		
	}
	
	/*
	* Save code buffer code
	*/
	$instance.loadBufferCode = function(attempt_encrypt_token){

		try {
			
			var save_for_language = $( "#defaultlanguage" ).val();
			var contest_current_link = $('#contest_current_link').val();
			var default_Code = $("#" + save_for_language + "_template").val();
			var url = base_url+'/ajax_files/saas_corporate_function.php?action=load_buffer_snapshot';
			$.post(url,{'encrypt_token':attempt_encrypt_token,'save_for_language':save_for_language,'contest_current_link':contest_current_link},function(data) {
				var data = $.parseJSON(data);
				if(data.status=='success'){
					$('#show_buffer_div').toggle().html(data.buffer_slot);
				}
			});
		
		}catch(e){
			//alert(e.description);
		}
	}
	$instance.viewLatestBufferCode = function(encrypt_token){
        
        var url = base_url+'/ajax_files/saas_corporate_function.php?action=get_user_code';
			$.post(url,{'encrypt_token':encrypt_token},function(data) {
				var data = $.parseJSON(data);
				editor.setValue(data.code, 1);
				editor.setOptions({ readOnly: false });
			});
        
    };
	/*
	* view code buffer code
	*/
	$instance.viewBufferCode = function(bufferid){
		
		try {
			var save_for_language = $( "#defaultlanguage" ).val();
			var attempt_encrypt_token = $('#encrypt_token').val();
			var contest_current_link = $('#contest_current_link').val();
			var available = [];
            var modeSelect = document.getElementById('modeSelect');
            for (var i = 0; i < modeSelect.options.length; i++) {
                available.push(modeSelect.options[i].value);
            }
			
			var default_Code = $("#" + save_for_language + "_template").val();
			bufferid = (typeof bufferid === "undefined") ? "" : bufferid;
			if(bufferid==''){
				var code  = editor.getValue();
                $instance.viewLatestBufferCode(attempt_encrypt_token);
				$('#current_buffer_div').html('<strong>Current Buffer</strong><small> (saved locally, editable)</small>');
                $('.change-language-confirmation').prop('disabled', false);
				return false;
			}
			
			var bufferNo = $("#buffer_count_"+bufferid).val();
			bufferNo = (typeof bufferNo === "undefined") ? "" : bufferNo;
			var url = base_url+'/ajax_files/saas_corporate_function.php?action=view_buffer_snapshot_code';
			$.post(url,{'encrypt_token':attempt_encrypt_token,'save_for_language':save_for_language,'contest_current_link':contest_current_link,'buffer_id':bufferid},function(data) {
				var data = $.parseJSON(data);
				if(data.status=='success'){
                    $('.change-language-confirmation').prop('disabled', 'disabled');
					var current_language = data.language;
					current_language = (typeof current_language === "undefined") ? "" : current_language;
					if (modeSelect.value != current_language && current_language!=''){
						modeSelect.options[available.indexOf(current_language)].selected = true;
					}
					var head_default_Code = $("#" + data.language + "_head_template").val();
					var tail_default_Code = $("#" + data.language + "_tail_template").val();

					// Set head block
					if(head_default_Code){
						$("#split-editor").show();
						var headeditor = ace.edit("split-editor");
						headeditor.setValue(head_default_Code, 1);
						headeditor.setOptions({ readOnly: true });	
                        
					}
					
					// Set Body block
					editor.setValue(data.buffer_code, 1);
					editor.setOptions({ readOnly: true });

					// Set Tail block
                    if(tail_default_Code){
						$(".tail-split-editor").show();
						taileditor.setValue(tail_default_Code, 1);
						taileditor.setOptions({ readOnly: true });	
					}
					
					
					$('#current_buffer_div').html('<strong>Buffer #'+bufferNo+'</strong> (saved on cloud, read-only)');
				}
			});
		
		}catch(e){
			//alert(e.description);
		}
	}
	
	
};


/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Assesment Result Page
 * 
 * Author   : Sebin Baby
 * Created  : 16 August, 2016
 */
Tg_AssesmentResult = new function () {
    var $instance = this;
	
	$instance.init = function () {
		
		$(document).on( 'shown.bs.tab', 'a[href="#analytics-tab-content"]', function (e) {
			var attempt_id = $(this).attr('data-attempt_id');
			$instance.user_result_charts(attempt_id);
		})
		
		$(document).on( 'click', '#analytics_graph_catgeory li a', function (e) {
			var attempt_id = $(this).attr('data-attempt_id');
			$("#analytics_graph_catgeory li").removeClass('active');
			$(this).parent().addClass('active');
			$.post(base_url + '/ajax_files/load_result_analytics.php',{'attempt_id':attempt_id},function(data) {
				var data = $.parseJSON(data);
				if(data.status=='success'){
					//Marks Distribution 
					var chart = Highcharts.chart('marks-distribution', {
						
						chart: { height: 250 },
						title: { text: '' },
						subtitle: { text: '' },			
						navigation: { buttonOptions: { enabled: false } },
						yAxis: { opposite:false },
						credits: { enabled: false },			
						plotOptions: { 
							column: {
								states: {
									hover: {
										color: '#2d1846'                                                           
									}
								},
								colorByPoint: true,
								colors: data.marks_color_codes,
							}
						},
			
						yAxis: {
							title: {
									text: 'Users',
									/*"textAlign": 'right',
									"rotation": 0,
									x: 0,
									y: -10*/
								},
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								},
								align: 'right'
							},
							min: 0, 
							max: data.max_users_count,
							lineColor: '#ffffff',
							lineWidth: 1
						},
					
						tooltip: {
							useHTML: true,
							backgroundColor: null,
							borderWidth: 0,
							shadow: false,
							formatter: function () {					
								if (this.key == 'you') {							
									return '<div style="left:-35px; top:-50px;" class="tooltip top fade in" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+this.y+'</div></div>';
								} else {
									return '<div style="left:-35px; top:-32px;" class="tooltip top fade in" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+this.y+'</div></div>';
								}
							}
						},
						
						xAxis: {
							title: { text: 'Marks' },
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								}
							},
							categories: data.marks_range_keys
						},

						series: [{
							type: 'column',
							dataLabels: {
								enabled: true,
								y: 10,
								formatter: function () {console.log(data.marks_users_count);		
									if (this.key == 'you') {					
										return '<div style="line-height:18px; font-size:14px; color:#19171a; font-weight:bold; text-transform:uppercase; bottom:-10px; left:-1px; position:relative;">You</div>';
									}
								}
							},
							data: data.marks_users_count,
							showInLegend: false
						}]
					});				
		
					//Time Spent
					if(data.question_type=='MCQ'){
					var chart = Highcharts.chart('time-spent', {

						chart: { height: 350 },
						title: { text: '' },
						subtitle: { text: '' },	
						navigation: { buttonOptions: { enabled: false } }, 
						credits: { enabled: false },  
						tooltip: { shared: true, crosshairs: true },
						yAxis: {
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								}
							},
							title: { text: 'Time (min)' },
							min: 0, max: data.max_range_time
						},
						xAxis: {
							title: { text: 'Questions' },
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								}
							},
							categories: ['0 - 5', '6 - 10', '11 - 15', '16 - 20', '21 - 25']
						},
			
						legend: {
							itemStyle: {
								color: '#4a4548',
								fontWeight: 'normal',
								fontSize: '14px',
								fontFamily:'lato'
							},
							symbolPadding: 10,
							symbolWidth: 0,
							symbolRadius: 0
						},	

						series: [{
							name: 'You(min)',
							color: '#d7263d',
							marker : {symbol : 'circle'},
							data: data.user_time
						}, {
							name: 'Average(min)',
							 color: '#4c877f',
							 marker : {symbol : 'circle'},
							data: data.avg_user_time
						},  {
							name: 'Topper(min)',
							 color: '#674c87',
							 marker : {symbol : 'circle' },
							data: data.topper_time
						}]

					});
				}
				}
			});		
			
		});
		
		
		$(document).on( 'shown.bs.tab', 'a[href="#leaderboard-tab-content"], #leaderboard-tab-content .nav-tabs a', function (e) {			
			var leaderboard_type = $(this).attr('data-lbtype');
			if(typeof leaderboard_type == 'undefined' || leaderboard_type == '') { leaderboard_type = 'users'; }
			
			$('a[href="#leaderboard-tab-content"]').attr('data-lbtype', leaderboard_type);
			$instance.load_assessment_leaderboard(leaderboard_type);
		})
		
		$instance.showLeaderboardTab = function(lbtype) {
			$('a[href="#leaderboard-tab-content"]').attr('data-lbtype', lbtype).trigger("click");
			$('#leaderboard-tab-content .nav-tabs li').removeClass('active');
			$('a[href="#'+lbtype+'-content-tab"]').parent('li').addClass('active');
		};

	}

	/*$instance.LeaderboardCustomScroll = function() {
        $.getStylesheet(theme_url + "/custom_scrollbar.min.css")
        $.getScript(theme_url + "/javascript/Custom_Scrollbar.min.js")
            .done(function() {				
				 $(".scroll").mCustomScrollbar({
					theme:"dark-3",
					callbacks:{
						onScroll :function(){
							$instance.onScrollShow(this);
						},
						onTotalScroll:function(){
							$instance.onScrollHide(this);
						}
					}
				 });
            })
            .fail(function() {
                console.log('Scrollbar not loaded');
            })
    };
	
	$instance.onScrollShow = function() {
       $("#active-user-status").show();
    };
	
	$instance.onScrollHide = function() {
       $("#active-user-status").hide();
    };*/
	
	$instance.loadScoreBreakdown = function(season_id,attempt_id){
			$("#load_score_breakdown").html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();;
			$.post(base_url + '/ajax_files/load_result_scorebord.php',{'season_id':season_id,'attempt_id':attempt_id},function(data) {
				if(data){
					$("#load_score_breakdown").html(data);
				}
			});
		
	};
	
	$instance.setCountDown = function(attempt_id, event_name, company_page_url){
					seconds--;
					SD=window.setTimeout( "Tg_AssesmentResult.setCountDown(attempt_id, event_name, company_page_url)", 1000 );
					if (seconds == 0) { 
						window.clearTimeout(SD);		
						var url = base_url+"/codejudge_coding_question_result.php";
						$.post(url,{'attempt_id':attempt_id,'event_name':event_name,'company_page_url':company_page_url},function(data){
							
							data = $.trim(data);
										
							if(data == 'P') { 
								seconds = 2;
								Tg_AssesmentResult.setCountDown();
								//window.location.href = window.location.href;
							} else {
								//$('#result_box').html(data);
								window.clearTimeout(SD);
								window.location.href = window.location.href;
									
							}
						
						});
					
					} 
					
		};
	
	
	//this function is used to load contest Result charts ...Sebin 26-April-2017 

	$instance.user_result_charts = function(attempt_id){		
		$.getScript(theme_url + "/javascript/highcharts.min.js")
		.done(function() {
	
			$.post(base_url + '/ajax_files/load_result_analytics.php',{'attempt_id':attempt_id},function(data) {
				var data = $.parseJSON(data);
				if(data.status=='success'){
					//Marks Distribution 
					var chart = Highcharts.chart('marks-distribution', {
						
						chart: { height: 250 },
						title: { text: '' },
						subtitle: { text: '' },			
						navigation: { buttonOptions: { enabled: false } },
						yAxis: { opposite:false },
						credits: { enabled: false },			
						plotOptions: { 
							column: {
								states: {
									hover: {
										color: '#2d1846'                                                           
									}
								},
								colorByPoint: true,
								colors: data.marks_color_codes,
							}
						},
			
						yAxis: {
							title: {
									text: 'Users',
									/*"textAlign": 'right',
									"rotation": 0,
									x: 0,
									y: -10*/
								},
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								},
								align: 'right'
							},
							min: 0, 
							max: data.max_users_count,
							lineColor: '#ffffff',
							lineWidth: 1
						},
					
						tooltip: {
							useHTML: true,
							backgroundColor: null,
							borderWidth: 0,
							shadow: false,
							formatter: function () {					
								if (this.key == 'you') {							
									return '<div style="left:-35px; top:-50px;" class="tooltip top fade in" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+this.y+'</div></div>';
								} else {
									return '<div style="left:-35px; top:-32px;" class="tooltip top fade in" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+this.y+'</div></div>';
								}
							}
						},
						
						xAxis: {
							title: { text: 'Marks' },
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								}
							},
							categories: data.marks_range_keys
						},

						series: [{
							type: 'column',
							dataLabels: {
								enabled: true,
								y: 10,
								formatter: function () {console.log(data.marks_users_count);		
									if (this.key == 'you') {					
										return '<div style="line-height:18px; font-size:14px; color:#19171a; font-weight:bold; text-transform:uppercase; bottom:-10px; left:-1px; position:relative;">You</div>';
									}
								}
							},
							data: data.marks_users_count,
							showInLegend: false
						}]
					});				
		
					//Time Spent
					if(data.question_type=='MCQ'){
					var chart = Highcharts.chart('time-spent', {

						chart: { height: 350 },
						title: { text: '' },
						subtitle: { text: '' },	
						navigation: { buttonOptions: { enabled: false } }, 
						credits: { enabled: false },  
						tooltip: { shared: true, crosshairs: true },
						yAxis: {
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								}
							},
							title: { text: 'Time (min)' },
							min: 0, max: data.max_range_time
						},
						xAxis: {
							title: { text: 'Questions' },
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								}
							},
							categories: ['0 - 5', '6 - 10', '11 - 15', '16 - 20', '21 - 25']
						},
			
						legend: {
							itemStyle: {
								color: '#4a4548',
								fontWeight: 'normal',
								fontSize: '14px',
								fontFamily:'lato'
							},
							symbolPadding: 10,
							symbolWidth: 0,
							symbolRadius: 0
						},	

						series: [{
							name: 'You(min)',
							color: '#d7263d',
							marker : {symbol : 'circle'},
							data: data.user_time
						},  {
							name: 'Average(min)',
							 color: '#4c877f',
							 marker : {symbol : 'circle'},
							data:  data.avg_user_time
						}, {
							name: 'Topper(min)',
							 color: '#674c87',
							 marker : {symbol : 'circle' },
							data: data.topper_time
						}]

					});
				  }
				}
			});		
		})
		.fail(function() {
			console.log('highcharts not loaded');
		});
	};
	
	//this function is used to load average marks distribution chart ...Kuldeep 04-July-2016 
	$instance.avg_marks_distribution = function(average_time_taken, average_time_taken_value){
		
			$('#avg_marks_distribution').highcharts({
					chart: {
						type: 'column'
					},
					title: {
						text: 'Time Taken Analytics'
					},
					subtitle: {
						text: ''
					},
					xAxis: {
						categories: average_time_taken,
						crosshair: true
					},
					yAxis: {
						min: 0,
						title: {
							text: 'Time (Sec) '
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px;color:{series.color};padding:0">{series.name}: {point.key}</span><table>',
						pointFormat: '<td style="padding:0"><b> {point.y} Sec</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						name: 'Time',
						data: average_time_taken_value

					}],
					credits: {
						enabled: false
					},
			});
		
	};
	
	//this function is used to load company participation chart ...Kuldeep 04-July-2016
	$instance.company_participation_chart = function(company_category, comp_participation_value, comp_submission_value){
		
			 $('#company_participation').highcharts({
					chart: {
						type: 'bar'
					},
					title: {
						text: 'Top Number of Submission/Participation From Top Company'
					},
					subtitle: {
						text: ''
					},
					xAxis: {
						categories: company_category,
						title: {
							text: null
						}
					},
					yAxis: {
						min: 0,
						title: {
							text: 'Users ',
							align: 'high'
						},
						labels: {
							overflow: 'justify'
						}
					},
					tooltip: {
						valueSuffix: ' Users'
					},
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true
							}
						}
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'top',
						x: -40,
						y: 80,
						floating: true,
						borderWidth: 1,
						backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
						shadow: true
					},
					credits: {
						enabled: false
					},
					series: [{
						name: 'Company Participation',
						data: comp_participation_value
					}, {
						name: 'Company Submission',
						data: comp_submission_value
					}]
			});
		
	};
	
	//this function is used to load institute participation chart ...Kuldeep 04-July-2016
	$instance.institute_participation_chart = function(institute_category, instt_participation_value, instt_submission_value){
			
			
			$('#institute_participation').highcharts({
					chart: {
						type: 'bar'
					},
					title: {
						text: 'Top Number Of Submission/Participation From Top Institute'
					},
					subtitle: {
						text: ''
					},
					xAxis: {
						categories: institute_category,
						title: {
							text: null
						}
					},
					yAxis: {
						min: 0,
						title: {
							text: 'Users',
							align: 'high'
						},
						labels: {
							overflow: 'justify'
						}
					},
					tooltip: {
						valueSuffix: ' Users'
					},
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true
							}
						}
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'top',
						x: -40,
						y: 80,
						floating: true,
						borderWidth: 1,
						backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
						shadow: true
					},
					credits: {
						enabled: false
					},
					series: [{
						name: 'Institute Participation',
						data: instt_participation_value
					}, {
						name: 'Institute Submission',
						data: instt_submission_value
					}]
			});
	
	
	};
	$instance.showleaderboard = function(level, season_id, level_season_id) {
		if(typeof leaderboard_type == 'undefined' || leaderboard_type == '') { leaderboard_type = 'challenge'; }
		var page = $('#page_number').val();				
        var attempt_id = $('#attempt_id').val();
		var attempt_key = $('#attempt_key').val();
		if(typeof attempt_id == 'undefined' || attempt_id == '') { attempt_id = ''; }
		$('#leaderboard-tab-content').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/load_assessment_leaderboard.php?page=' + page + '&type='+ leaderboard_type + '&season_id='+ season_id +'&level='+level+'&level_season_id='+level_season_id+"&attempt_key="+attempt_key;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(response) {
                data = response.trim();
				$("#leaderboard .tabs2 .nav-tabs > li").removeClass('active');
				$("#leaderboard_"+level).parent().addClass('active');
					 
                if (data.indexOf("no_record") >= 0) {
					$('#leaderboard-tab-content').html('');
					$('#view_all_leaderboard').html('');
					$('#view_all_leaderboard').html('<p> Be the first one to ace the leaerboard </p>');
                } else {
					//alert("#leaderboard_"+level)
					 $('#view_all_leaderboard').html('');
			         $('#view_all_leaderboard').html(data);
			    }
            }
        });

    };
	
	
	$instance.load_assessment_leaderboard = function(leaderboard_type) {
		if(typeof leaderboard_type == 'undefined' || leaderboard_type == '') { leaderboard_type = 'users'; }
		
		var page = $('#page_number').val();				
        var season_id = $('#season_id').val();
        var attempt_id = $('#attempt_id').val();
		if(typeof attempt_id == 'undefined' || attempt_id == '') { attempt_id = ''; }
		$('#ajax_leaderboard_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/load_assessment_leaderboard.php?page=' + page + '&type='+ leaderboard_type + '&season_id='+ season_id + '&attempt_id='+ attempt_id;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(response) {
                data = response.trim();
				
                if (data.indexOf("no_record") >= 0) {
					$('#ajax_leaderboard_contest').html('');
					$('#leaderboard-tab-content #users-content-tab').html('<p>Be the first one to ace the leaerboard</p>');    
					//$('<tr class="no_user_display"><td colspan="4">  No users to display. </td> </tr>').insertBefore('.ajax_leaderboard_contest');
                } else {
	                $('#leaderboard-tab-content #users-content-tab').html(data);                    
                }
            }
        });

    };
	
	$instance.compile_own_testcase = function(action, contest_id, encrypt_token, testcase_type, platform_type, language,ques_no){

					try{
						$('#code_result_heading').hide();
						$('#user_compile_code_text').show();
						$('#user_compile_code').hide();
							
						$('#code_result_'+contest_id).html('');
						var code = $('#user_code_'+contest_id).html();
						var own_testcase_input = $('#own_testcase_input'+ques_no).val();
						var url = base_url+"/ajax_files/codeJudgeCompileTest.php";
						$.post(url,{'code':code,'action':action,'contest_id':contest_id, 'language':language, 'encrypt_token':encrypt_token, 'testcase_type':testcase_type,'own_testcase_input':own_testcase_input,'platform_type':platform_type,'source':'resultpage'},function(data){
							//alert(data);
							$('#code_result_heading').show();
							if($.trim(data) == '') {
								$('#code_result_'+contest_id).html('Some Error occured');
							} else {				
								var new_data = $.trim(data);
								var res = new_data.split('*||*');
								if(res[1] == 'failure') {
									$('#code_result_'+contest_id).html('Some technical error has occured.Please try again after some time.');							
								} else if(res[1] == 'timeout') {
									$('#code_result_'+contest_id).html('Contest Timeout.');
								} else {
									$('#code_result_'+contest_id).html(res[1]);							
								}					
							}
							$('#user_compile_code').show();
							$('#user_compile_code_text').hide();

						});
						
					}catch(e){
						alert(e.description);
					}
					
				};
};

/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Assessment Analytics Page
 * 
 * Author   : Sebin Baby
 * Created  : 09 August, 2016
 */

Tg_assessmentAnalytics = new function() {
    var $instance = this;

    $instance.init = function(subtitleText,submission_count,compile_count,not_compile_count,categories_val,all_score_categories,seriesData,all_score_seriesData,city_seriesData,company_seriesData) {
		
		$.getScript(theme_url + "/javascript/highcharts-v1.js")
            .done(function() {
                $('#all_submission_data').highcharts({
					chart: {
						type: 'column'
					},
					title: {
						text: 'Submissions Analytics'
					},
					subtitle: {
						text: 'Test:'+subtitleText
					},
					xAxis: {
						categories: [
							'Solutions submitted',
							'Compile Success',
							'Compile Error'
						],
						crosshair: true
					},
					yAxis: {
						min: 0,
						title: {
							text: 'number of Submissions '
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px;color:{series.color};padding:0">{series.name}: {point.key}</span><table>',
						pointFormat: '<td style="padding:0"><b> {point.y} submissions</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						name: 'Submissions Analytics',
						data: [submission_count, compile_count, not_compile_count]

					}],
					credits: {
						enabled: false
					},
				});

				
				
				
				$('#all_langauge_data').highcharts({
					chart: {
						type: 'column'
					},
					title: {
						text: 'Language Analytics'
					},
					subtitle: {
						text: 'Test:'+subtitleText
					},
					xAxis: {
						categories: categories_val,
						crosshair: true
					},
					yAxis: {
						min: 0,
						title: {
							text: 'number of Submissions '
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px;color:{series.color};padding:0">{series.name}: {point.key}</span><table>',
						pointFormat: '<td style="padding:0"><b> {point.y} submissions</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						name: 'Language',
						data: seriesData

					}],
					credits: {
						enabled: false
					},
				});
				
				
				$('#all_score_analytics').highcharts({
					chart: {
						type: 'column'
					},
					title: {
						text: 'Score Analytics'
					},
					subtitle: {
						text: 'Test:'+subtitleText
					},
					xAxis: {
						categories: all_score_categories,
						crosshair: true
					},
					yAxis: {
						min: 0,
						title: {
							text: 'number of Submissions '
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px;color:{series.color};padding:0">{series.name}: {point.key}</span><table>',
						pointFormat: '<td style="padding:0"><b> {point.y} submissions</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						name: 'Score',
						data: all_score_seriesData

					}],
					credits: {
						enabled: false
					},
				});

				
				$('#city_graph').highcharts({
					chart: {
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false,
						type: 'pie'
					},
					title: {
						  text: 'City Analytics'
					},
					 subtitle: {
						text: 'Test:'+subtitleText
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true,
								format: '<b>{point.name}</b>: {point.percentage:.1f} %',
								style: {
									color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
								}
							}
						}
					},
					series: [{
						name: 'City',
						colorByPoint: true,
						data: city_seriesData
					}], credits: {
						enabled: false
					}
				});
				
				
				
				$('#company_graph').highcharts({
					chart: {
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false,
						type: 'pie'
					},
					title: {
						  text: 'Company Analytics'
					},
					 subtitle: {
						text: 'Test:'+subtitleText
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true,
								format: '<b>{point.name}</b>: {point.percentage:.1f} %',
								style: {
									color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
								}
							}
						}
					},
					series: [{
						name: 'Company',
						colorByPoint: true,
						data: company_seriesData
					}], credits: {
						enabled: false
					}
				});
            })
            .fail(function() {
                console.log('highcharts not loaded');
            })

    }

};


/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Practice And Code Page
 * 
 * Author   : Sebin Baby
 * Created  : 22 August, 2016
 */

Tg_practiceCode = new function() {
    var $instance = this;
    $instance.seasonVal = "";
    $instance.UrlPath = '';

    $instance.init = function(url_path ,seasonurl) {
		$instance.UrlPath = seasonurl;
		$('[data-toggle="tooltip"]').tooltip();
		
		$(".practice-box  ul").each(function () {
            var LiN = $(this).find('li').length;

            if (LiN >4) {
                $('li', this).eq(3).nextAll().hide().addClass('toggleable');
                $(this).append('<div class="hide-show-buttons"><a href="javascript:void(0);" class="loadMore">View more</a></div>');
            }
        });
        $('ul.term-list').on('click', '.hide-show-buttons', function () {

            if ($(this).hasClass('showLess')) {
                $(this).removeClass('showLess').find('a').text('View more');
            } else {
                $(this).addClass('showLess').find('a').text('View less');
            }

            $(this).siblings('li.toggleable').fadeToggle();

        });
		
		
           /* var loc = window.location.href.split('/');
					var page = loc[loc.length - 1];
					$('#practice-details nav ul li').each(function (i) {
			var href = $(this).attr('id');
					if (href.indexOf(page) !== - 1) {
			$('#practice-details nav ul li.active').removeClass('active');
					$(this).addClass('active');
					return false;
			}
			});*/
//					var $thumbs = $('#practice-details nav ul li').click(function (e) {
//			e.preventDefault();
//					$('#practice-details nav ul li.active').removeClass('active');
//					$(this).addClass('active');
//			});
    };
    /*$(document).on('click','#video-tab', function(){
         $('#page-overlay1').css('display','table');
         $('.box-watch-video').hide();
        var id = $(this).attr('data-val'); 
        var parent_season = $(this).attr('data-season-val');
        var url = base_url+'/practice/' + parent_season + '/' + $instance.UrlPath+"/"+id;
        window.location.href = url;
    });*/

};

/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Client
 * 
 * Author   : Sebin Baby
 * Created  : 31 August, 2016
 */

CustomCompanyLandingPage = new function () {
    $instance = this;
    
    $instance.init = function () {
    $(document).on('click', '.custom-register', function(){
        var seasonId = $(this).attr('data-val');
        $.ajax({
            type: "POST",
            url: base_url + "/ajax_files/saas_corporate_function.php?action=customCompanyCheck",
            data: {season_id:seasonId},
            success: function (value) { 
                var value = $.parseJSON(value);
                if(value.loggedIn === 'true'){ 
                    if(value.url !== null){
                        window.location.href = value.return_url;
                    }else{
                        $('.msgErrortop .message-box').addClass('error-msg').find('p').text(value.message);
                    }
                }else{ 
                    if(value.platform_type === 'codejudge'){
                        $('.custom-register').addClass('open_modal').removeClass('custom-register');
                        var url = base_url + "/ajax_files/ajax_saas_login_register.php?is_season_url=Y&season_url="+value.season_url;
                        $('.open_modal').attr('href', url).trigger('click');
                    }else{
                        $('.custom-register').addClass('open_modal').removeClass('custom-register');
                        var url = base_url + "/ajax_files/ajax_login_register.php?season_url="+value.season_url;
                        $('.open_modal').attr('href', url).trigger('click');
                    }
                }
            }
        });
        });
    };

};

/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Client
 * 
 * Author   : Sebin Baby
 * Created  : 22 Sep, 2016
 */

Tg_ForCompanyLanding = new function () {
    $instance = this;

    $instance.init = function () {
        $("#company-banner").innerHeight($(window).height());
		
		$(".smooth-scroll").click(function() {
            var href = $(this).attr('href');
            $('html, body').animate({
				scrollTop: $(href).offset().top - 46
			}, 1000);
        });
		
		$("#container-wrap").removeClass("loggedin");
		
		$.getScript(theme_url + "/javascript/onepagenav.js")
            .done(function() {
                $('#section-controls ul, #global-navigation ul').onePageNav({
                    currentClass: 'active',
                    scrollOffset: 45,
                    scrollThreshold: 0.01,
                    changeHash: false,
                    filter: ':not(.external)'
                });
            })
            .fail(function() {
                console.log('OnePageNav not loaded');
            });
		
		$(window).scroll(function() {

            var windowScroll = $(window).scrollTop();
			var topScroll = 0;

            if (windowScroll > topScroll) {
               $('body').addClass('page-scroll');
            } else {
                $('body').removeClass('page-scroll');
            }
			
			
			if (windowScroll > $("#company-banner").innerHeight() / 2) {
				$("#section-controls").fadeIn();
			} else {
				$("#section-controls").fadeOut();
			}
			
        });
		
		$(window).resize( function(){
			$("#company-banner").css("padding-bottom",$("#companies").innerHeight()).innerHeight($(window).height());
		});
		$('#global-navigation .menu-btn').click( function(){
		$(this).parent().find('> ul').slideToggle();
});
		
    };
	
	$instance.ourCompanies = function (season_id) {
        $.getScript(theme_url + "/javascript/jquery.carouFredSel-6.0.5-packed.js")
            .done(function() {
                $('#companies ul').carouFredSel({
					responsive: true,
					width: '100%',
					circular: true,
					infinite: true,
					scroll: { 
						duration: 0.1 
					},
					items: {
						width: 185,
						visible: {
							min: 2,
							max: 6
						}
					}
				});
            })
            .fail(function() {
                console.log('carouFredSel not loaded');
            });
    };

};




Tg_QuestionList = new function() {
    var $instance = this;
    $instance.init = function () {
        setTimeout(function(){ 
            $('.list-full-module').first().trigger("click");
        }, 200);
        
        
        $(document).on('click','.list-full-module' ,function(){
            
            var question_id = $(this).data('question_id');
            var question_no = $(this).data('question_no');
            var question_category = $(this).data('question_category');
            var invitation_id = $(this).data('token');

            var params = {};
            var modules = 'ShowQuestionDescriptionModule';
            params.question_id = question_id;
            params.question_no = question_no;
            params.question_category = question_category;
            params.invitation_id = invitation_id;
            $instance.makeAjaxrequestForCoding(params, modules);
            
        });
    };
    
    $instance.makeAjaxrequestForCoding = function(parameter, modules){
        
        $.ajax({
            type: "POST",
            url: base_url + "/ajax_files/load_question_module.php",
            data: {params: parameter, modules: modules},
            dataType: 'html',
            cache: false,
            success: function (data) {
                $('#coding-content-area').html('');
                $('#coding-content-area').html(data);
            }
        });
    };
};

/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Client
 * 
 * Author   : Sebin Baby
 * Created  : 27 Jan, 2016
 */

Tg_PracticeDetail = new function () {
    $instance = this;
    var niceEditorsInstance ='';
    var editor = '';

    $instance.init = function (module_id, content_id) {
		$(document).on('click', '.more-comments', function(){
			var page = $('.page_number').val();
            for(var i=1;i<parseInt(page)+1; i++){
                $('.next_comment_link_'+i).hide();
            }
			var order = $("#change-criteria").find(":selected").val() ;
			var url = base_url + '/ajax_files/get_comment_on_change.php';
			$.ajax({
				url : url,
				data: {'order' : order, 'content_id' : content_id,'module_id' : module_id, 'page' : page},
				type: 'post',
				cache: false,
				dataType: 'html',
				success: function(data) {
					$(data).insertAfter('.next_comment_link_'+page);

					$('.page_number').val(parseInt(page)+1);

				}
			});
		});

			var editor = '';
			var ThisSection = '';
		
		$(document).on('click','#discussion-forum .code-icon', function(){
			ThisSection = $(this).parent().parent();
			$("#code-snippet").modal('show');
			$('#code-snippet').find('.modal-body').append('<p class="content-area"> <textarea class="form-control" cols="100" placeholder="Post a Comment" name="user-code-snippet" id="body_code"></textarea></p>');
			 editor = CodeMirror.fromTextArea(document.getElementById("body_code"), {
				mode: "text/html",
				lineNumbers: true,
				lineWrapping: true,
			});
		});
		
		$(document).on("click", "#discussion-forum .nicEdit-main", function() {
			$(this).parents(".editor-block, .comment-box").find(".editor-actions, .footer-links").fadeIn();
		});

		$('#code-snippet').on('hidden.bs.modal', function (e) {
					
			$('#code-snippet').find('.modal-body').html('');
			$("#code-snippet").modal('hide');
			$("#preview-editor").find('.modal-body').html('');
			$("#preview-editor").modal('hide');

		});

		$(document).on('click','.add-content-in-editor', function(){

			var notes = editor.getValue();

			$('#code-snippet').find('.modal-body').html('');
			$("#code-snippet").modal('hide');

			notes = "<br/><pre>"+ notes + "</pre>";

			var comment_content = ThisSection.find('p  .nicEdit-main').html();
			var final_content = comment_content + notes;
			ThisSection.find('p  .nicEdit-main').html(final_content);

		});

		$(document).on('click', '.post-comment', function(){

			var comment_content = $(this).parent().parent().find('p  .nicEdit-main').html()
			var This = $(this);
            var season_id = $('#season_id').val();

			if($.trim(comment_content) == ''){
				$('.post-comment-error').html('<span class="error_msg">Please Enter Content</span>').removeClass('hide');
				return false;
			}

			$.ajax({
				data: {'comment_content': comment_content, action:'insertComment', season_id:season_id},
                url : base_url + '/ajax_files/comment_new_ajax.php',
				type: 'POST',
				cache: false,
				dataType: 'html',
				success: function(data) {

					var url = base_url + '/ajax_files/get_comment_on_change.php';
					$.ajax({
						url : url,
						data: {'order' : 'recent', 'content_id' : content_id,'module_id' : module_id},
						type: 'post',
						cache: false,
						dataType: 'html',
						success: function(data) {
                            This.parent().parent().find('p  .nicEdit-main').html('');
							$('.add-comment-on-change').html('');
							$('.add-comment-on-change').append(data);
							$('.on-change-comment').addClass('hide');
						}
					});
				}
			});
		});
		
		$(document).on('click','.add-comment', function(){

			$(this).hide().parent().next('.comment-box').removeClass('hide');
			var id = $(this).parent().next('.comment-box').find('p textarea').attr('id');
            Tg_PracticeDetail.reInitialize(id);

		});


		$(document).on('click','.update-comment-txt-reply', function(){
            var This = $(this);
            var replyId = $(this).data('reply_id');
            var season_id = $('#season_id').val();
            var comment_content = $(this).parent().parent().find('p  .nicEdit-main').html();
            $.ajax({
                data: {'comment_content': comment_content, action:'UpdateReply','reply_id': replyId, season_id:season_id },
                url : base_url + '/ajax_files/comment_new_ajax.php',
                type: 'post',
                cache: false,
                dataType: 'html',
                success: function(data) {
                    var response = $.parseJSON(data);
                    This.parent().parent().find('p  .nicEdit-main').html('');
                    This.parent().closest('div').prev().html(response.reply).show();
                    This.parent().closest('div').addClass('hide');
                }
            });

        });
        $(document).on('click','#discussion-forum .user-area-comment a.edit-comment', function(){
            $(this).parent().parent().find('.user-comment-txt').hide();
            $(this).parent().parent().find('.edit-comment-box').removeClass('hide');

            var id = $(this).parent().parent().find('.edit-comment-box').find('p textarea').attr('id');

            Tg_PracticeDetail.reInitialize(id);
        });

        $(document).on('click','.edit-comment-reply', function(){
            $(this).parent().parent().find('.user-comment-txt-reply').hide();
            $(this).parent().parent().find('.edit-comment-box-reply').removeClass('hide');

            var id = $(this).parent().parent().find('.edit-comment-box-reply').find('p textarea').attr('id');

            Tg_PracticeDetail.reInitialize(id);
        });


        $(document).on('click','.edit-comment-cancel', function(){
			$(this).parent().parent().find('.user-comment-txt').show();
			$(this).parent().parent().find('.edit-comment-box').addClass('hide');
		});

        $(document).on('click','.edit-comment-cancel-reply', function(){
            $(this).parent().parent().find('.user-comment-txt-reply').show();
            $(this).parent().parent().find('.edit-comment-box-reply').addClass('hide');
        });
		$(document).on('click','.add-reply', function(){
            $(this).parent().find('.post-comment-error-reply').addClass('hide');
			var This = $(this);
			var commentId = $(this).data('comment_id');
            var season_id = $('#season_id').val();
			var comment_content = $(this).parent().parent().find('p  .nicEdit-main').html();
            if($.trim(comment_content) == ''){
                $(this).parent().find('.post-comment-error-reply').html('<span class="error_msg"> Please Enter Content</span>').removeClass('hide');
                return false;
            }
			$.ajax({
				data: {'comment_content': comment_content, action:'AddComment','comment_id': commentId , season_id:season_id},
                url : base_url + '/ajax_files/comment_new_ajax.php',
				type: 'post',
				cache: false,
				dataType: 'html',
				success: function(data) {
					var response = $.parseJSON(data);
                    This.parent().parent().find('p  .nicEdit-main').html('');
					This.parent().closest('div').prev("div.user-area-comment").append(response.htmlContent);
					This.parent().parent().addClass('hide');
				}
			});

		});
		$(document).on('click','.delete-comment', function(){

			var commentId = $(this).data('comment_id');
            var season_id = $('#season_id').val();
			var This = $(this);
			$.ajax({
				data: {'action' : 'DeleteComment','comment_id': commentId , season_id:season_id},
                url : base_url + '/ajax_files/comment_new_ajax.php',
				type: 'post',
				success: function() {
					This.parent().parent().parent().parent().addClass('hide');
				}
			});

		});

		$(document).on('click', '.update-comment-reply',function(){

			var This =  $(this);
			var comment_content = $(this).parent().find('p  .nicEdit-main').html();
			var comment_id = $(this).data('comment_id');
            var season_id = $('#season_id').val();
			$.ajax({
				data: {'comment_content': comment_content, action:'UpdateComment','comment_id': comment_id , season_id:season_id},
                url : base_url + '/ajax_files/comment_new_ajax.php',
				type: 'post',
				cache: false,
				dataType: 'html',
				success: function(data) {
					var response = $.parseJSON(data);
                    This.parent().find('p  .nicEdit-main').html('');
					This.parent().addClass('hide');
					This.parent().parent().find('.user-comment-txt').html(response.comment).show();

				}
			});


		});

		$(document).on('click','.delete-reply', function(){
			var This = $(this);
			var commentId = $(this).data('comment_id');
			var replyId = $(this).data('reply_id');
            var season_id = $('#season_id').val();

			$.ajax({
				data: {'action' : 'DeleteReply','reply_id': replyId,'comment_id' : commentId, season_id:season_id },
                url : base_url + '/ajax_files/comment_new_ajax.php',
				type: 'post',
				success: function() {
					This.parent().parent().parent().addClass('hide');
				}
			});

		});

		$(document).on('click','.cancel', function(){
            $(this).parent().parent().find('p  .nicEdit-main').html('');
			$(this).parent().parent().addClass('hide');
			$("#discussion-forum .user-area-comment a.add-comment").show();
		});

		$(document).on('click','.check-preview', function(){

			var comment_content=$(this).parent().parent().parent().find('p  .nicEdit-main').html();
			comment_content = $.trim(comment_content);

			if($.trim(comment_content) == ''){
				return false;
			}
			$("#preview-editor").find('.modal-body').html('');
			$("#preview-editor").modal('show');
			$('#preview-editor').find('.modal-body').append("<p>" +comment_content+ "</p>");

		});

		$("#change-criteria").on('change', function(){
			var order = $(this).find(":selected").val() ;
			var url = base_url + '/ajax_files/get_comment_on_change.php';
            var season_id = $('#season_id').val();
			$.ajax({
				url : url,
				data: {'order' : order, 'content_id' : content_id,'module_id' : module_id, season_id:season_id},
                url : url,
				type: 'post',
				cache: false,
				dataType: 'html',
				success: function(data) {

					$('.add-comment-on-change').html('');
					$('.add-comment-on-change').append(data);
					$('.on-change-comment').addClass('hide');
                    //$instance.PracticeJsFiles();
				}
			});
			
			
		});

		$(document).on('click','.like-comments', function(){
			var commentId = $(this).data('comment_id');
            var season_id = $('#season_id').val();
			var This = $(this);
			$.ajax({
				data: {'action' : 'LikeComment','comment_id' : commentId , season_id:season_id},
                url : base_url + '/ajax_files/comment_new_ajax.php',
				type: 'post',
				success: function(data) {
					var response = $.parseJSON(data);

					This.parent().parent().find('.total-counts').text(response.count);
                    if($.inArray( response.status, [ "updated", "inserted"] ) == -1){
                        alert(response.status);
                    }

				}
			});
		});

		$(document).on('click','.unlike-comments', function(){
			var commentId = $(this).data('comment_id');
            var season_id = $('#season_id').val();
			var This = $(this);
			$.ajax({
				data: {'action' : 'UnLikeComment','comment_id' : commentId , season_id:season_id},
                url : base_url + '/ajax_files/comment_new_ajax.php',
				type: 'post',
				success: function(data) {
					var response = $.parseJSON(data);
					This.parent().parent().find('.total-counts').text(response.count);

                    if($.inArray( response.status, [ "updated", "inserted"] ) == -1){
                        alert(response.status);
                    }
				}
			});
		});


		
		//$instance.PracticeNicEdit();

        $(document).on("click", ".discussion-root-btn", function() {
            var moretext = '<i class="fa fa-minus" aria-hidden="true"></i>';
            var lesstext = '<i class="fa fa-plus" aria-hidden="true"></i>';

            if($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html(moretext);
            } else {
                $(this).addClass("less");
                $(this).html(lesstext);
            }
            $(this).parent().toggleClass("active").find('.discussion-root-inner').slideToggle();
            return false;
        });
    };

    $instance.reInitializeEditors = function(textId){
        var textareas = document.getElementsByTagName("textarea");

        for(var i=0;i<textareas.length;i++)
        {


            var myNicEditor = new nicEditor({
                maxHeight: 150,
                buttonList: ['bold', 'italic', 'ul', 'ol']
            });
            myNicEditor.panelInstance(textareas[i]);

        }

    }
$instance.reInitialize = function(textId){

            var myNicEditor = new nicEditor({
                maxHeight: 150,
                buttonList: ['bold', 'italic', 'ul', 'ol']
            });
            myNicEditor.panelInstance(textId);

    }

	$instance.PracticeJsFiles = function() {
        $.getStylesheet(theme_url + "/codemirror.css")
        $.getScript(theme_url + "/javascript/nicEdit-latest.js")
        $.getScript(theme_url + "/javascript/codemirror.js")
            .done(function() {
                $instance.reInitializeEditors();

				console.log('Files loaded');
            })
            .fail(function() {
                console.log('Files not loaded');
            })
    };

};







function _custom_poplayer2(tit, wide, custom_function, add_class) { 
	// custom_function is the function that can be passed as a param to this function to be excecuted after calling this layer. make sure that it is defined.
	if(!tit) {
		tit='';
	}
	var l2_id='';
	l2_id = parseInt($('.l2_outer_bx').length) + 1;
	var obj_id = "_l2_id_"+l2_id;
	var hideAll="'#_l2_id_"+l2_id+",#l2_overlay_bx_"+l2_id+"'";
	
	var layer_op = "0.4";
	if(l2_id > 1) { 
		layer_op = "0";
	}
	
	var xtra_cls = '';
	if(add_class) {
		xtra_cls = add_class;
	}
	
	$("body").append('<div id="'+obj_id+'" class="l2_outer_bx '+xtra_cls+'" style="display:none;"><div class="layer-fb-cont"><div class="fb-blue-head"><span><a href="javascript:void(0);" onclick="javascript: _remove_custom_poplayer2('+hideAll+');">X Close</a></span><b id="#_l2_ttl_'+l2_id+'">'+tit+'</b></div><div class="_l2_txt_cnt fb-txt-new" id="_l2_txt_cnt_'+l2_id+'"><span class="_l2_pre_load" id="_l2_pre_load_'+l2_id+'"><span class="_l2_pre_load_img">&nbsp;</span>Loading...</span></div><div id="_l2_btm_'+l2_id+'"></div></div></div>');
	
	var divH='';
	var divW = $("#content_module").width();
	
	$("#"+obj_id).show().css({width:wide+'px'});
	divH = document.documentElement.clientHeight || document.body.clientHeight;
	divW = document.documentElement.clientWidth || document.body.clientWidth;
	var layerH = document.getElementById(obj_id).offsetHeight;
	var layerW = document.getElementById(obj_id).offsetWidth;

	$("#"+obj_id).css({top:(divH-layerH)/2+"px",left:(divW-layerW)/2+"px"});

	
	var lay = $("body").append("<div id='l2_overlay_bx_"+l2_id+"' class='l2_overlay_bx "+xtra_cls+"' style='height:100%; width:100%; background:#000000; position:fixed; top:0; left:0; z-index:900;'></div>");
	$("#l2_overlay_bx_"+l2_id).css({opacity:layer_op});
	
	//$("body").css({overflow:"hidden"}); // $(document).height();
	
	try {
		if(custom_function) custom_function(l2_id);
	} catch(e){}
	
	return l2_id;
} 

function _remove_custom_poplayer2(objs) {
	if(objs) {
		$(objs).remove();
	}
}


function add_city_by_country(selected_value, selected_city) {
get_data = "country="+escape(selected_value)+'&selected_city='+escape(selected_city)+'&select_id=city_combo';
 $.ajax({
       type: "GET",
       url: base_url+"/ajax_files/city_list.php",
       data: get_data,
       success: function(msg) { 
	   msg = msg.replace(/^\s+|\s+$/g,"");
        if(msg) { 
				 //alert(msg);
         document.getElementById('add_city').style.display = 'block';
         document.getElementById('add_city').innerHTML = msg;
         document.getElementById('add_other_city').style.display = 'none';
				 if(from_where == 'register'){
						$('#city_combo').attr({'tabindex':5});
					}
				 checkIfOtherCity('city_combo');
        } else { 
          document.getElementById('add_other_city').style.display = 'block';
          document.getElementById('add_city').innerHTML = '';
					document.getElementById('add_city').style.display = 'none';
        }
      }
    });
  // $('#available_functional_area_box').html('<div class="color">loading ...</div>').load(url);
   
}


function checkIfOtherCity(obj){
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

function change_role_by_fa(mfa_id, container_width, selected_role) {
  url = base_url + "/ajax/role_by_fa.php?mfa_id="+mfa_id + '&container_width='+container_width+ '&selected_role='+selected_role;
	//alert(selected_role);
  $('#role_by_sfa_blk p').html('<span class="color">loading ...</span>');//.load(url);
	$.get(url, function(data){
		if(trim(data)){
			$('#role_by_sfa_blk p').html(data);
			$('#add_role_by_sfa_blk').hide();
			$('#other_role_by_sfa_blk').hide();
			$('#role_by_sfa_blk').show();
			$('#role_type').val('role');
			check_role_value('role_select');
		}else{
			$('#role_by_sfa_blk').hide();
			$('#other_role_by_sfa_blk').hide();
			$('#add_role_by_sfa_blk').show();
			$('#role_type').val('add_role');
		}
	});
}

function check_role_value(obj){
	var role_val = $('#'+obj).val();
	//alert(role_val);
	//alert(role_val);
	if(role_val){
		var role_val_arr = role_val.split(' ');
		var other_val = '';
		for(var i in role_val_arr){
			if(role_val_arr[i] == 'Other' || role_val_arr[i] == 'Others'){
				other_val = 'Others';
				//alert(role_val_arr[i]);
				break;
			}
		}
		//alert(other_val);
		if(other_val == 'Others'){
			var html_txt = "<span class='star'>*</span> Role Name";
			$('#other_role_by_sfa_blk label').html(html_txt);
			$('#other_role_by_sfa_blk').show();
			$('#role_type').val('other_role');
		}else{
			$('#other_role_by_sfa_blk').hide();
			$('#other_role_by_sfa_blk input').val('');
			$('#role_type').val('role');
		}
	}
}

	function tb_remove() {
		$('#TechGigbootStrapModal').modal('hide');
		return false;
	}

	function CloseWebinarBoxNRedirect(redirectUrl) {
        parent.tb_remove();
        parent.window.location=redirectUrl;
    }
