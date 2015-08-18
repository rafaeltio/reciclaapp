(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    alert('Não esqueça de ligar o serviço de localização.');
     /* button  Enviar */
    $(document).on("click", ".uib_w_5", function(evt)
    {
        $("#loading").show();
        $(this).attr('disabled', 'disabled')
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    });
    
     /* button  #btnImagemLixo */
    $(document).on("click", "#btnImagemLixo", function(evt)
    {
        capturePhoto();
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
var options = {
    timeout: 10000,
    maximumAge: 11000,
    enableHighAccuracy: true
};
// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function(position) 
{
    var nome = $('#txtNome').val();
    var email = $('#txtEmail').val();
    var logradouro = $('#txtLogradouro').val();
    var numero = $('#txtNumero').val();
    var bairro = $('#txtBairro').val();
    var tipoLixo = $('#cboTipoLixo').val();
    
    nome = nome.toUpperCase();
    logradouro = logradouro.toUpperCase();
    bairro = bairro.toUpperCase();
    tipoLixo = tipoLixo.toUpperCase();
    
    if (!nome || !email || !logradouro || !numero || !bairro || !tipoLixo) 
    {
        alert('Por gentileza preencha todos os campos.');
        return false;
    }
    
    var url = 'http://reciclaapp.ml/service/servico.php?nome=' + nome + '&email=' + email + '&logradouro=' + logradouro + '&numero=' + numero + '&bairro=' + bairro + '&tipoLixo=' + tipoLixo + '&latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude;
    
    // Docs: http://api.jquery.com/jquery.get/
    apiCall = $.get(url);
    
    // Runs reviewsCallback if get call is successful.
    apiCall.success(function(data) 
    {
        $('#btnEnviar').removeAttr('disabled');
        $("#loading").hide();
        
        console.log('success: ' + apiCall.status);
        
        if (apiCall.readyState == 4) 
        {
            if (apiCall.status == 200)
            {
                reviewsCallback(data);
                alert('Salvo com sucesso!');
            }
            else
            {
                alert('Error: ' + apiCall.status);
            }
        }
    });
    
    // If the get call throws an error, alerts the user. 
    apiCall.error(function() 
    {
        if (apiCall.status == 400)
            alert('Bad request');
        else if (apiCall.status == 403)
            alert('403: Erro');
        else if (apiCall.status == 404)
            alert('404: Erro');
        else if (apiCall.status == 408) 
            alert('Servidor não responde, tente mais tarde.');
        else
            alert('Error: ' + apiCall.status);
    });

};

// onError Callback receives a PositionError object
//
function onError(error) 
{
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

// The callback function that's executed after the API call is made above.
// Displays results on #review subpage.
function reviewsCallback(data) 
{
    navigator.vibrate(1000);
}

//camera

 function onErr(message) {
     alert('Failed to get the picture: ' + message);
 }

function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('imgLixo');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    alert(smallImage.src);
    }

function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
  // console.log(imageURI);

  // Get image handle
  //
  var largeImage = document.getElementById('img');

  // Unhide image elements
  //
  largeImage.style.display = 'block';

  // Show the captured photo
  // The in-line CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}

function capturePhoto() {
    $('#imgLixo').show();
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onErr, { quality: 50,
    destinationType: Camera.DestinationType.DATA_URL });
}

function capturePhotoEdit() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onErr, { quality: 20, allowEdit: true,
    destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onErr, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}