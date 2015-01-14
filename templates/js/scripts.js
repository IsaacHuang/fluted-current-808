/***************** Waypoints ******************/

$(document).ready(function() {

	$('.wp1').waypoint(function() {
		$('.wp1').addClass('animated fadeInLeft');
	}, {
		offset: '75%'
	});
	$('.wp2').waypoint(function() {
		$('.wp2').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp3').waypoint(function() {
		$('.wp3').addClass('animated fadeInDown');
	}, {
		offset: '55%'
	});
	$('.wp4').waypoint(function() {
		$('.wp4').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});
	$('.wp5').waypoint(function() {
		$('.wp5').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp6').waypoint(function() {
		$('.wp6').addClass('animated fadeInDown');
	}, {
		offset: '75%'
	});

});

/***************** Slide-In Nav ******************/

$(window).load(function() {

	$('.nav_slide_button').click(function() {
		$('.pull').slideToggle();
	});

});

/***************** Smooth Scrolling ******************/

$(function() {

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 2000);
				return false;
			}
		}
	});

});

/***************** Nav Transformicon ******************/

document.querySelector("#nav-toggle").addEventListener("click", function() {
	this.classList.toggle("active");
});

/***************** Overlays ******************/

$(document).ready(function(){
    if (Modernizr.touch) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $(".img").click(function(e){
            if (!$(this).hasClass("hover")) {
                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img").hasClass("hover")) {
                $(this).closest(".img").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $(".img").mouseenter(function(){
            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
        .mouseleave(function(){
            $(this).removeClass("hover");
        });
    }
});

/***************** Flexsliders ******************/

$(window).load(function() {

	$('#portfolioSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: false,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

	$('#servicesSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

	$('#teamSlider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: true,
		touch: true,
		pauseOnHover: true,
		start: function() {
			$.waypoints('refresh');
		}
	});

});
/********Photo machines and take picture !**************/
//控制按鈕的顯示方式
$(document).ready(function(){
	$("#screenshot-button").click(function(){
		$("#videoscreen").hide();
    $("#screenshot").show();
	});
	$("#showvid-button").click(function(){
		$("#videoscreen").show();
		$("#screenshot").show();
	});
});
//Again!按鈕的執行函數
$("#showvid-button").click(
  function(){
    $("#screenshot-button").prop("disabled",false);
  });
  //取得css設定
  var custom_pic = document.querySelector('#custom_pic');
  var videoElement = document.querySelector('#videoscreen');
  var button = document.querySelector('#screenshot-start-stop');
  var screenshot_button = document.querySelector('#screenshot-button');
  var canvas = document.querySelector('#screenshot-canvas');
  var img = document.querySelector('#screenshot');
  var ctx = canvas.getContext('2d');
  var localMediaStream = null;
  var videoSelect = document.querySelector("select#videoSource");

              //設定呈現大小
              function sizeCanvas() {
              // video.onloadedmetadata not firing in Chrome so we have to hack.
              // See crbug.com/110938.
                setTimeout(function() {
                  canvas.width = videoElement.videoWidth;
                  canvas.height = videoElement.videoHeight;
                  img.height = videoElement.offsetHeight;
                  img.width = videoElement.offsetWidth;
                }, 1000);
              }

              //執行拍照的函數
              function snapshot() {
                console.log("in snapshot");
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // make canvas size equal to the video source
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                // for some reason img height is smaller than the video
                // but I think it's unrelated problem. this adjustment is
                // only for a visual aspect as the canvas data URL won't change.
                img.height = videoElement.offsetHeight;
                img.width = videoElement.offsetWidth;
                ctx.drawImage(videoElement, 0, 0);
                img.src = custom_pic.value = canvas.toDataURL('image/png');
              }

              //按下拍照鍵
              screenshot_button.addEventListener('click', function(e) {
                if (localMediaStream) {
                  $(this).prop("disabled",true);
                  $('#screen-stream').hide();
                  $('#screenshot').show();
                  snapshot();
                  return;
                }
              }, false);

              //瀏覽器取得媒體方式
              navigator.getUserMedia = navigator.getUserMedia ||
              navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

              //鏡頭擷取
              function gotSources(sourceInfos) {
                for (var i = 0; i != sourceInfos.length; ++i) {
                  var sourceInfo = sourceInfos[i];
                  var option = document.createElement("option");
                  option.value = sourceInfo.id;
                  if (sourceInfo.kind === 'audio') {
                  }
                  else if (sourceInfo.kind === 'video') {
                    option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
                    videoSelect.appendChild(option);
                  } else {
                    console.log('Some other kind of source: ', sourceInfo);
                  }
                }
              }

              if (typeof MediaStreamTrack === 'undefined'){
                alert('This browser does not support MediaStreamTrack.');
              } else {
                MediaStreamTrack.getSources(gotSources);
              }


              function successCallback(stream) {
                window.stream = stream; // make stream available to console
                videoElement.src = window.URL.createObjectURL(stream);
                localMediaStream = stream;
                sizeCanvas();
                videoElement.play();
              }

              //錯誤回傳
              function errorCallback(error){
                console.log("navigator.getUserMedia error: ", error);
              }

              //開始函數
              function start(){
                if (!!window.stream) {
                  videoElement.src = null;
                  window.stream.stop();
                }
                var videoSource = videoSelect.value;
                var constraints = {
                  video: {
                    optional: [{sourceId: videoSource}]
                  }
                };
                navigator.getUserMedia(constraints, successCallback, errorCallback);
              }

              videoSelect.onchange = start;

              start();