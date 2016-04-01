$(document).ready(function() {
  initClickHandler();
});
var node;

function initClickHandler() {
  $('#btn').click(function() {
    $('#image-input').trigger('click');
  });
  $('#image-input').change(submitToServer);
}

function submitToServer(event) {
  $('.spinner-backdrop').fadeIn(300);
  var file = event.target.files[0];
  readFileFromInput(file, function(base64String) {
    $('img').attr('src', base64String);
  });
  var formData = new FormData();
  formData.append('image', event.target.files[0]);
  $.ajax({
    url: '/',
    data: formData,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function(response) {
      printJSON(response);
    }
  });
}

function printJSON(data) {
  $('.text-container').empty();
  node = new PrettyJSON.view.Node({
    el: $('.text-container'),
    data: JSON.parse(data)
  });
  node.expandAll();
  $('.spinner-backdrop').fadeOut(300);
}

function readFileFromInput(file, onComplete) {
  var fr = new FileReader();
  fr.onload = function() {
    onComplete(fr.result);
  };
  fr.readAsDataURL(file);
}
