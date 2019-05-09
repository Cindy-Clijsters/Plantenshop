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
   
   // Maak de inhoudsopgave
   var root = $('article')[0];
   var list = $('<ol>');
   
   $('#toc').empty().append(walkTree(root, list, enterNode, exitNode));
   
});

var arrKoppen   = ["h1", "h2", "h3", "h4", "h5", "h6"];
var arrSections = ["article", "section", "aside", "nav"];
var getal       = 1;

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
            
            if (node === root) {
                node = null;
            } else {
                node = node.parentNode;
            }
        }
    }
    
    console.log($list);
    return $list;
}

var checkNode = function(node) {
    // controleert of deze node in aanmerking komt voor de inhoudsopgave
    var strNotoc = "no-toc";
    
    return (node.nodeType == 1 && arrSections.indexOf(node.tagName.toLowerCase()) >= 0 && node.className.indexOf(strNotoc) == -1);
}

function enterNode(node, list) {
    
    //console.log('ENTER NODE');
    
    //console.log(node);
    //console.log(list);
    
    // bouwt list op ij het binnengaan van een node
    if (checkNode(node)) {
        var nieuw = $('<li>').attr("tabindex", getal.toString());
        var a     = $('<a>').attr({
            "href" : "#" + getal.toString(),
            "id"   : "o" + getal.toString()
        });
        
        node.setAttribute("id", getal.toString());
        getal++;
        
        a.text(zoekKoppen(node));
        nieuw.append(a);      
        
        if (list[0].tagName === "LI") {
            //console.log(1);
            var nieuweLijst = $('<ol>').append(nieuw);
            list.append(nieuweLijst);
            list = nieuw;
        } else {
            //console.log(2);
            list.append(nieuw);
            list = nieuw;
        }
        
        //console.log(list);
        
        
    }
    
    return list;
}

var exitNode = function(node, list) {
    
    // bij het verlaten van de node
    if (checkNode(node)) {
        if(list[0].tagName = "OL") {
            list = list.parent();
        }
        
        list = list.parent();
    }
    
    return list;
}

var zoekKoppen = function(node) {
    
    var node     = $(node);
    var koptekst = "";
    
    
    // Zoek de hoogste kop, return zijn tekst
    $.each(arrKoppen, function(i, v) {
        var kop = $(v, node);
        
        if (kop.length > 0) {
            koptekst = kop.first().text();
            return false;
        }  
    })
    
    return koptekst;
}
