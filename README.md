"# jquery.br-address" 
## Synopsis

A simple jquery plugin that translates zipcode in a easy to use brazilian standard address

## Code Example
```
 (document).ready(function(){
     $('input[name=txt_zip_code').br_address({
        onStart: function(){
           $('input[name=txt_city').prop("disabled",true);
           $('input[name=txt_street').prop("disabled",true);
           $('input[name=txt_state').prop("disabled",true);
           $('input[name=txt_zip_code').prop("disabled",true);
           $('input[name=txt_neighborhood').prop("disabled",true);
           $('input[name=txt_country').prop("disabled",true);
        },
        onStop: function(){
           $('input[name=txt_city').prop("disabled",false);
           $('input[name=txt_street').prop("disabled",false);
           $('input[name=txt_state').prop("disabled",false);
           $('input[name=txt_neighborhood').prop("disabled",false);
           $('input[name=txt_zip_code').prop("disabled",false);
           $('input[name=txt_country').prop("disabled",false);
           $('input[name=txt_fat_endereco_numero').focus();
        },
        onData: function(data){
           $('input[name=txt_city').val(data.city);
           $('input[name=txt_street').val(data.street);
           $('input[name=txt_state').val(data.state);
           $('input[name=txt_neighborhood').val(data.neighborhood);
           $('input[name=txt_zip_code').val(data.zipcode);                            
           $('input[name=txt_country').val(data.country);
        }
     });    
 });    
```
## Motivation


## Installation
```
<script src="/static/plugins/jQuery/jQuery-2.1.4.min.js" type="text/javascript"></script>
<script src="jquery.br-address.js" type="text/javascript" charset="utf-8"></script>
```
## Released under the MIT license

## License
Released under the MIT license
