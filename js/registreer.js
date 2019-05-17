$(function() {
    if (jQuery().validate) {
        console.log("validate geladen");
    } else {
        console.log("validate niet geladen");
    }
    
    $.validator.addMethod("wwCheck", function(value, element) {
        return value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/);
    });
    
    $('#promos').on('click', function() {
        if ($(this).is(':checked')) {
            $('#email').removeAttr('disabled')[0].focus();
        } else {
            $('#email').attr('disabled', true).val("");
        }
    });

    var $foutBoksen = $('div.foutBox');
        
    //$("#regForm").submit(function(e) {e.preventDefault() })   
    $("#regForm").validate({
        //debug: true,
        rules:{
            vnaam: "required",
            postnr : {
                required : true,
                digits : true,
                minlength: 4,
                maxlength: 4
            },
            geboren: {
                required: true,
                dateISO: true
            },
            sexe: "required",
            "ruimte[]":"required",
            "soort_id[]" : {
                required: true,
                rangelength: [1, 4]
            },
            username: {
                required: true,
                minlength: 8
            },
            ww1: {
                wwCheck: true
            },
            ww2: {
                equalTo: "#ww1"
            },
            email: {
                required: "#promos:checked",
                email: true
            }
        },
        messages:{
            vnaam: "voornaam is verplicht",
            postnr: {
                required: "postcode is verplicht",
                digits: "een postcode bestaat enkel uit getallen",
                minlength: "een postcodenummer bestaat uit exact 4 getallen",
                maxlength: "een postcodenummer bestaat uit exact 4 getallen"
            },
            geboren: {
                required: "geef uw geboortedatum in, aub",
                dateISO: "de datum moet het formaat YYYY-MM-DD hebben"
            },
            sexe: "kies uw geslacht",
            "ruimte[]":"kies minstens &eacute;&eacute;n optie",
            "soort_id[]" : "kies minstens &eacute;&eacute;n soort maar niet meer dan 4",
            username : {
                required : "gebruikersnaam is verplicht",
                minlength: "gebruikersnaam moet minstens 5 karakters bevatten"
            },
            ww1: "het wachtwoord moet min 8 karakters lang zijn en moet minstens &eacute;&eacute;nkleine letter, 1 Hoofdletter, 1 getal en 1 speciaal karakter (@#$%^&+=) bevatten" ,
            ww2: "wachtwoord niet identiek",
            email: {
                required: "Een emailadres is nodig om u te kunnen contacteren",
                email: "het emailadres is ongeldig"
            }
        },
        /*
        errorPlacement: function(error,element){
            var $ctrlbx = element.parents("div.controlbox");
            if ($ctrlbx.length != 0) {
                error.insertAfter($ctrlbx); 
            } else {
                error.insertAfter(element);
            }
        },
         */
        errorContainer: $foutBoksen,
        errorLabelContainer: $("ul", $foutBoksen),
        wrapper: "li",
        submitHandler: function(form) {
            form.submit();
        }
    });
    
    $.datepicker.setDefaults($.datepicker.regional['nl-BE']); 
    $("#geboren").datepicker({
        dateFormat: "yy-mm-dd",
        yearRange: '-80:+00',
        changeMonth: true,
        changeYear: true
    });
    
    // alle dialoogvensters: instellingen
    $(".dialoogvenster").dialog({
        autoOpen: false,
        buttons: {
            "Ok": function() { 
                $(this).dialog("close");
            }
        },
        modal:true,
        width: 600
    });
    
    // dialoog button
    $('#dialog_link_username')
        .button({icons: {secondary: "ui-icon-help"}})
        .click(function(e){
            e.preventDefault();
            $('#dialog_username').dialog('open');
        }); 
});