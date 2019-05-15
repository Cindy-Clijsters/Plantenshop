$(function(){

    var $tabs = $('#verzorging');
    
    $('#verzorging').tabs({
        active: 1,
        disabled: [3]
    });
    
    $('#toonWaterplanten').on('change', function() {
        
        var wpI= $('.ui-tabs-nav a').index($('a[href="#waterplanten"]')); 
        
        if (this.checked) {
            
            $('#verzorging')
                .tabs('enable', wpI)
                .tabs('option', 'active', wpI);
        
        } else {
            
            $('#verzorging')
                .tabs("option", "active", 0)
                .tabs('disable', wpI);
        
        }
    })
    
    $('#toonZiektes').on('click', function(e) {
        
        e.preventDefault();
        
        var aantalTabs          = $('.ui-tabs-nav a').length;
        var tekst               = "Ziektes"
        var eInh                = "<div id='" + tekst + "'>";
        var eLink               = "<li><a href='#" + tekst + "'>" + tekst + "</a></li>";
        var $nieuweTabInhoud    = $(eInh).load("inc/ziektes.html");
        
        $tabs.append($nieuweTabInhoud);  //inhoud toevoegen  
        $tabs.find("ul").append(eLink);  //navigatie item toevoegen
        $tabs.tabs("refresh");
        $tabs.tabs("option", "active", aantalTabs);  
        
        $(this).remove();
        
    });
    
});