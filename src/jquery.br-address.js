/*!
 * jquery.br_address.js
 * http://zoqui.com/
 * Version: 1.0.0
 *
 * Copyright 2012 Marco Aurelio Zoqui
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
(function($) {
    "use strict"; // Start of use strict
    // jquery plugin methods
    var methods = {
        //begin method.init
        init : function(options){
            return this.each(function(){
                /**
                 * Defines the default options
                 */
                var self = this;
                var settings = {
                    onData: function($this){
                        window.console.log("onData");
                    },
                    onStart: function($this){
                        window.console.log("onStarting");
                    },
                    onStop: function($this){
                        window.console.log("onStop");
                    }
                };
            
                this.settings=$.extend(true,{}, settings, options);
                var $self = $(this);
                
                $self.keyup(function(ev){
                    var $this = $(this);        
                    ev.preventDefault();
                    window.console.log($this.val());
                    var icep=$.trim($this.val());
                    var pcep=""+parseInt(icep);
                    if ((((pcep)==icep)&&icep.length==8)){
                        self.settings.onStart(pcep);
                        var data={
                            address: pcep,
                            sensor:'false'
                        };
                        var request = $.ajax({
                            url: "http://maps.google.com/maps/api/geocode/json",
                            type: "GET",
                            data: $.param(data),
                        });
                        // Callback handler that will be called on success
                        request.done(function (response, textStatus, jqXHR){
                            if (response && 'results' in response && response.results.length>0 && 'geometry'in response.results[0]){
                                var latlng=response.results[0].geometry.location.lat+','+response.results[0].geometry.location.lng;
                                window.console.log(latlng);
                                var data={
                                    latlng:latlng
                                };
                                var request = $.ajax({
                                    url: "http://maps.google.com/maps/api/geocode/json",
                                    type: "GET",
                                    data: $.param(data),
                                });
                                request.done(function (response, textStatus, jqXHR){
                                    var data={
                                        city:'',
                                        street:'',
                                        state:'',
                                        neighborhood:'',
                                        country:'',
                                        zipcode:''
                                    };
                                    if (response && 'results' in response && response.results.length>0 && 'address_components'in response.results[0]){
                                        var address= response.results[0].address_components;
                                        for(var i in address){
                                            var address_type=address[i].types[0];
                                            if (address_type=='locality'){
                                                data.city=address[i].long_name;
                                            }
                                            else if (address_type=='political'){
                                                data.neighborhood=address[i].long_name;
                                            }
                                            else if (address_type=='route'){
                                                data.street=address[i].long_name;
                                            } 
                                            else if (address_type=='country'){
                                                data.country=address[i].long_name;
                                            }  
                                            else if (address_type=='administrative_area_level_1'){
                                                data.state=address[i].short_name;
                                            } 
                                            else if (address_type=='administrative_area_level_2'){
                                                if (data.city===""){
                                                    data.city=address[i].long_name;
                                                }
                                            }           
                                            else if (address_type=='postal_code'){
                                                data.zipcode=address[i].long_name;
                                            } 
                                        }
                                        self.settings.onData(data);
                                    }
                                });
                            }
                        });
                        request.always(function (response, textStatus, jqXHR){
                            self.settings.onStop(pcep);
                        });
                    }
                    
                });
            });
        },
    };
    /**
    * The Returns a BR Address jquery plugin 
    * @return Returns an jquery chanable object
    */    
    $.fn.br_address = function(method) {
        if (methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } 
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } 
        else {
            $.error( 'Method ' +  method + ' does not exist on usertext' );
        }       
    };  
})(jQuery); // End of use strict
