(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
     activate_page("#uib_page_login");
    
 }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
