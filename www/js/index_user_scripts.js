(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    $("#loading").ajaxStart(function(){
        $(this).show();
        $('#btnEnviar').attr('disabled', 'disabled');
    });
    $("#loading").ajaxStop(function(){
        $(this).hide();
        $('#btnEnviar').removeAttr('disabled');
    });
     /* button  Enviar */
    $(document).on("click", ".uib_w_5", function(evt)
    {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
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
    
    var url = 'http://jupitertec.com.br/recicla/servico.php?nome=' + nome + '&email=' + email + '&logradouro=' + logradouro + '&numero=' + numero + '&bairro=' + bairro + '&tipoLixo=' + tipoLixo + '&latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude;
    
    alert(url);
    
    // Docs: http://api.jquery.com/jquery.get/
    apiCall = $.get(url);
    
    // Runs reviewsCallback if get call is successful.
    apiCall.success(function(data) 
    {
        console.log('success: ' + apiCall.status);
        if (apiCall.readyState == 4) 
        {
            if (apiCall.status == 200)
                reviewsCallback(data);
            else
                alert('Error: ' + apiCall.status);
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
    alert('Salvo com sucesso!');
}