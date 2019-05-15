$(function() {
    if (jQuery().validate) {
        console.log("validate geladen");
    } else {
        console.log("validate niet geladen");
    }
    
    //$("#regForm").submit(function(e) {e.preventDefault() })
    $("#regForm").validate({
        //debug: true,
        rules:{
            vnaam: "required",
            username : {
                required : true,
                minlength : 5
            },
            postnr : {
                required : true,
                digits : true,
                minlength: 4,
                maxlength: 4
            },
            geboren: {
                required: true,
                dateISO: true
            }
        },
        messages:{
            vnaam: "voornaam is verplicht",
            username : {
                required : "gebruikersnaam is verplicht",
                minlength: "gebruikersnaam moet minstens 5 karakters bevatten"
            },
            postnr: {
                required: "postcode is verplicht",
                digits: "een postcode bestaat enkel uit getallen",
                minlength: "een postcodenummer bestaat uit exact 4 getallen",
                maxlength: "een postcodenummer bestaat uit exact 4 getallen"
            },
            geboren: {
                required: "geef uw geboortedatum in, aub",
                dateISO: "de datum moet het formaat YYYY-MM-DD hebben"
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
});