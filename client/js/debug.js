$(document).ready(function() {
  initClickHandler();
});

function initClickHandler() {
  $('#btn').click(function() {
    $('#image-input').trigger('click');
  });
  $('#image-input').change(submitToServer);
}

function submitToServer(event) {
  var file = event.target.files[0];
  readFileFromInput(file, function(base64String) {
    console.log(base64String);
    $('img').attr('src', base64String);
  });
}

function readFileFromInput(file, onComplete) {
  var fr = new FileReader();
  fr.onload = function() {
    onComplete(fr.result);
  };
  fr.readAsDataURL(file);
}
