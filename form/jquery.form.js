(function ( $ ) {
$.fn.extend({ 
fancy_formbuilder_form: function(options) {

      var defaults = {
          nav_bars: false,
          reset: true,
          required_default: true,
          required_message: "",
          validation: true,
          error_message: "",
          licence: false,
          licence_path: "",
          terms: false,
          form_width: "100%",
          form_margin: "15px auto",
          button_bgcolor: "#5bc0de",
          button_border_color: "#46b8da",
          button_color: "#fff"
      }
       
      var papa = "#" + this.prop("id");
      
      var required_fields_no_date = $(papa + " .required:not('.custom-date')").find("input, select, textarea");
      var required_date = $(papa + " .required.custom-date").find("select");
      var required_fields = $(papa +" .required").find("input, select, textarea");
      var all_fields = $( papa ).find("input:text, input:checkbox, input:radio, select, textarea");
      var error_class = "";
      var error_content;
      var reset_class = "";
      var options =  $.extend(defaults, options);

      $(papa + " .cms_submit").addClass("btn btn-info");
      required_fields.prop("required", true);

      return this.each(function() {
   
          var o = options;

          if( o.required_default == true ){

              if( o.required_message == "" ){

                   $("<span class='required_message glyphicon glyphicon-exclamation-sign'></span>").insertAfter( required_fields_no_date );
                   $("<span class='required_message glyphicon glyphicon-exclamation-sign'></span>").insertAfter( required_date[2] );

              }else{

                   $("<span class='required_message'>"+ o.required_message +"</span>").insertAfter( required_fields_no_date );
              }
          }// if required symbol ends

          if( o.reset == true){

               reset_class = "on_reset";
               $(papa + " .financeSubmitNov8").append("<input type='button' name='reset' value='Reset' class='btn btn-info reset' />");

               $(papa + " .reset").on("click", function(){
                  
                    all_fields.val("");
                    $(papa + " :checkbox").removeAttr('checked');
                    $(papa + " .on_reset").remove();

               });  
          }// if true ends

          if( o.validation == true ){
                
                  var the_form = $(this);

                  $.getScript( "http://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.9.0/jquery.validate.js" ).done(function(){ 

                        the_form.validate({
                           ignore: [], 
                           onkeyup: false,
                           onclick: false
                        });

                        if( o.error_message == "" ){

                            error_class = "glyphicon glyphicon-remove-sign";
                            error_content =  "<span class='" + error_class + " " + reset_class + "' >" + o.error_message + "</span>";

                         }else{

                            error_content = "<span class='" + reset_class + "' >" + o.error_message + "</span>";
                         }

                         jQuery.extend(jQuery.validator.messages, {
                            required: error_content
                         });

                        // required_fields.each(function() {
                        //     $(this).rules('add', {
                        //         required: true,
                        //         messages: {
                        //             required:  error_content
                        //         }
                        //     });
                        // });
                   });

                   required_fields.each(function(index){

                          if ( $(this).is(":checkbox") ){

                             $(this).on("change", function(){
                                   
                                   if(this.checked){

                                        $(this).siblings(".glyphicon:not(.required_message), .error").remove();
                                        $("<span class='glyphicon glyphicon-ok " + reset_class + "'></span>").insertAfter( $(this) );

                                   }else{

                                          $(this).siblings(".glyphicon:not(.required_message), .error").remove();
                                   }
                              });

                           }else{

                                  $(this).on("focusin", function(){
                                      
                                    $(this).siblings(".glyphicon-ok").remove();
                                  });

                                  $(this).on("focusout", function(){
                                         if($(this).val() != ""){

                                                if($(this).siblings(".glyphicon-ok").length == 0){

                                                    if($(this).closest(".custom-date").length > 0){
                                                      
                                                      $(this).parent(".custom-date").append("<span class='glyphicon glyphicon-ok " + reset_class + "'></span>");

                                                    }else{

                                                        $("<span class='glyphicon glyphicon-ok " + reset_class + "'></span>").insertAfter($(this));
                                                    }
                                                }

                                         }else{
                                        
                                              $(this).siblings(".glyphicon:not(.required_message)").remove();
                                        }
                                  });
                          }
                  });
                  /* input required icon  end*/
          }// if validation ends

          if( o.licence == true ){


                if ( o.licence_path == ""){
                      
                      o.licence_path = "license.jpg";
                }

                /* drive licence image */
                $(papa + " .licence-img").append("<span class='glyphicon glyphicon-question-sign show-img'></span>");
                $(papa + " .licence-img").append("<img src='" + o.licence_path + "' alt='responsive-image'>");
                        
                $(papa + " .show-img").each(function(index){

                        $(this).on("click", function(){
                      
                          $(this).next().toggle("fast");
                          $(this).next().on("click", function(){ $(this).hide("fast"); });

                       });
                });
                /* drive licence image  end */
          }// if licence ends

          if( o.terms == true){
              /* toggle terms */
              $(papa + " .show-terms").on("click", function(){

                  $(papa + " .terms-text").toggle("slow");
              });
               /* toggle terms end */
          }else{

               if( $(papa + " .show-terms") ){
                  $(papa + " .show-terms").parent().remove();
               }
          }

          if(o.nav_bars == true){

               $(papa + " .btn_nav_form").each(function(index) {

                var icon = $(this).find('span');

                    $(this).on("click", function(e) {
                      
                            e.preventDefault();

                            var string = $(this).prop("href").split('#')[1];
                            var toggled_container = $("." + string + "_container");

                              toggled_container.toggle(function(){

                              if(icon.attr('class') == "glyphicon glyphicon-plus" ){

                                  icon.removeClass("glyphicon glyphicon-plus");
                                  icon.addClass("glyphicon glyphicon-minus");

                              }else{

                                  icon.removeClass( "glyphicon glyphicon-minus");
                                  icon.addClass("glyphicon glyphicon-plus");
                              } 
                            });
                          });
                    });
          }else{  

            $(papa + " .btn_nav_form").each(function(index) {

                 $(this).removeClass("btn btn-info");
                 $(this).children("span").remove();

                 $(this).css({"display":"block", "font-size":"32px", "color": "#fff", "text-align":"center" });

                 $(this).on("click", function(e) {
                      
                      e.preventDefault();

                      var string = $(this).prop("href").split('#')[1];
                      var toggled_container = $("." + string + "_container");
                          toggled_container.toggle();
                });


            });
          }


          $(papa + " .btn-info").css({
            "background": o.button_bgcolor,
            "border-color": o.button_border_color,
            "color": o.button_color
          });

           $(papa + " .show-terms").css({
            "color": o.button_bgcolor
          });

          $(this).css({
              width:  o.form_width,
              "margin": o.form_margin 
          });

         
          
      });
} // fancy_formbuilder_form ends   

});      
}( jQuery ));          

