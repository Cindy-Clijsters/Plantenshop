$(function() {
   
   var $advZoeken     = $('#adv_zoeken');
   var $advZoekenLink = $('#adv_zoeken_link');
   
   // $advZoeken.hide();
   
   // Lees localStorage
   var zoek    = localStorage.getItem("advZoeken");
   var setting = (zoek != 0 && zoek != 1) ? 0 : zoek;
   
   toggleZoeken(setting, $advZoekenLink, $advZoeken);
   
   $advZoekenLink.on('click', function(e) {
       e.preventDefault();
       setting = 1 - setting; // bitwise Xor
       
       toggleZoeken(setting, $(this), $advZoeken);
       localStorage.setItem("advZoeken", setting);
   });
   
   // Show slider
   $("#slider-range-hoogte").slider({
         range: true,
         values: [100, 500],
         min: 0,
         max: 5000,
         step: 10,
         slide: function(event, ui) {
            $("#hoogte_min").val($(this).slider("values", 0));
            $("#hoogte_max").val($(this).slider("values", 1));
        },
        stop: function(event, ui) {
            $("#hoogte_min").val($(this).slider("values", 0));
            $("#hoogte_max").val($(this).slider("values", 1));
        }

    });
    
    //initialiseren van de startwaarden
    $("#hoogte_min").val($("#slider-range-hoogte").slider("values", 0));
    $("#hoogte_max").val($("#slider-range-hoogte").slider("values", 1));  
    
    // toevoegen van een title text aan de slideknoppen
    $(".ui-slider-handle", "#slider-range-hoogte")
        .first().attr({'title' : 'Minimum hoogte'})
        .end()
        .last().attr({'title' : 'Maximum hoogte'})
    
});

function toggleZoeken(toon, $lienk, $el) {
    //$el.toggle('slow', function() {
    //    tekst = ($el.css('display') === 'none') ? "geavanceerd zoeken" : "eenvoudig zoeken";
    //    $lienk.text(tekst);
    //});
    
    var txt_een = "eenvoudig zoeken";
    var txt_adv = "geavanceerd zoeken";
    
    if (toon == 1) {
        
        $el.show('slow');
        $lienk.text(txt_een);
        
    } else if (toon == 0) {
        
        $el.hide('fast');
        $lienk.text(txt_adv);
        
    } else {
        
        throw new Error("arg toon verkeerd");
        
    }
}