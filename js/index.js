//Take!按鈕的執行函數
  $("#screenshot-button").click(function(){
    $(this).prop("disabled",true);

  });
//Again!按鈕的執行函數
  $("#showvid-button").click(function(){
    $('#puzzleres').hide();
    $('#screenshot-stream').show();
  });

 $("#form1").submit(function(){
    $('#screenshot-stream').hide();

    var formData = new FormData($(this)[0]);
    $.ajax({
      url:$(this).attr("action"),
      type: 'POST',
      data: formData,
      async: false,
      success: function (data) {
        console.log(data);
        var solved_url = data.solved_url;
      
        if (solved_url) {
        // check for results to show up
          setTimeout(function show_results() {
            console.log("in setTimeout, checking " + solved_url);
            var img = new Image();
            //圖片來源設定
            img.onload = function() {
              $('#puzzleres').attr('src', solved_url);
              $('#puzzleres').show();
              $("#showvid-button").prop("disabled",false);
            };
            img.onerror = function() {
              setTimeout(show_results, 200);
            }
            img.src = solved_url;
          }, 200);
        }
      },
      cache: false,
      contentType: false,
      processData: false
    });
    return false;
});
//錯誤回傳
function errorCallback(e) {
  console.log(e);
  if (e.code == 1) {
    alert('User denied access to their camera');
  } else {
    alert('getUserMedia() not supported in your browser.');
  }
}

var sudoku = document.querySelector('#sudoku');
var videoElement = document.querySelector('#screenshot-stream');
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
  img.src = sudoku.value = canvas.toDataURL('image/png');
}

screenshot_button.addEventListener('click', function(e) {
  if (localMediaStream) {
    $('#puzzleres').hide();
    snapshot();

    return;
  }
}, false);

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

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
