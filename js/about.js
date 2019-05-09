// JavaScript Document
// JS bestand voor About pagina

$(function() { // $() is hetzelfde als  $(document).ready() 
    
    // Add classes to table rows
    $('tbody tr:odd').addClass('oneven');
    $('tbody tr:even').addClass('even');
     
    // Show message before leaving the page
    $('a[href^="http"]').on('click', function(){
        alert('U staat op het punt de pagina te verlaten');
    }); 
    
    // Add the Back to top buttons
    $('<button class="toTop ui-button ui-widget ui-corner-all">Terug naar boven</button>').insertBefore(':header:gt(1)');
    
    $('button.toTop').on('click', function(){
        $(document).scrollTop( $("#about").offset().top );
    }); 
    
    // Add team members
    var lijst = ['Roger', 'Evelyn', 'Hilde', 'Jan'];
    
    /*
    var uul = $('<ul>');
    var strDeLijst = ''; 
    
    $.each(lijst, function(n, value){
        strDeLijst += '<li>' + value + '</li>';
    })
    
    uul.html(strDeLijst);
    $('#team').after(uul);
    */
   
   var container    = $('<div id="teamboks">');
   var diefRechts   = $('<div id="teamgegevens">');
   var keuzelijst   = $('<select id="teamkeuzelijst">');
   var strDeOptions = '<option value="">--- Het team ---</option>';
   
   $.each(lijst, function(n, value) {
       strDeOptions += '<option>' + value + '</option>';
   })
   
   keuzelijst.html(strDeOptions);
   container.append(keuzelijst).prepend(diefRechts);
   $('#team').after(container);
   
    
});

var walkTree = function (root, $list, enter, exit) 
{
    var node = root;

    start: while (node) {

        $list = enter(node,$list);

        if (node.firstChild) {
            node = node.firstChild;
            continue start;
        }
        
        while (node) {
            $list = exit(node,$list);
            
            if (node.nextSibling) {
                node = node.nextSibling;
                continue start;
            }
            
            if (node == root)
                node = null;
            else
                node = node.parentNode;
        }
    }
    
    return $list;
}
