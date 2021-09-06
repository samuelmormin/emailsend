$(document).scroll(function() {

    // Get Rappel Element
    var rappel = document.querySelector('.rappel');

    // Get offset of section to display Rappel after
    var element = $( ".div2" );
    var offset = element.offset().top;

    // Get Body Scroll position
    var scrollPosition = $("html").scrollTop();

    // Display Rappel element
    if( scrollPosition >= offset ) {
        rappel.classList.add("rappel-displayed")
    } 
    // Hide Rappel element
    else if ( scrollPosition < offset ) {
        rappel.classList.remove("rappel-displayed")
    }

});

$( ".rappel__switch" ).click(function() {
    //var button = document.querySelector('.rappel__switch');
    var rappel = document.querySelector('.rappel');

    if ( rappel.classList.contains("rappel-up")) {
        rappel.classList.add("rappel-down")
        rappel.classList.remove("rappel-up")
        $(".rappel__arrow").css("transform", "rotate(180deg)" );

    } else {
        rappel.classList.add("rappel-up")
        rappel.classList.remove("rappel-down")
        $(".rappel__arrow").css("transform", "rotate(0)" );
    }

});

// Send email
$(document).ready(function() {
 
    var form = $('#rappel-form'),
        name = $('#rappel-name'),
        phone = $('#rappel-phone'),
        email = $('#rappel-email'),
        info = $('#info'),
        submit = $("#rappel-submit");
    
    form.on('input', '#rappel-name, #rappel-phone, #rappel-email', function() {
      $(this).css('border-color', '');
      info.html('').slideUp();
    });
    
    submit.on('click', function(e) {
      info.html('Veuillez remplir tous les champs').css('color', 'red').slideDown();
      e.preventDefault();
      if(validate()) {
        $.ajax({
          type: "POST",
          url: "mailer-rappel.php",
          data: form.serialize(),
          dataType: "json"
        }).done(function(data) {
          if(data.success) {
            name.val('');
            phone.val('');
            email.val('');
            info.html('Message envoyé!').css('color', 'green').slideDown();
          } else {
            info.html('Message non envoyé!').css('color', 'red').slideDown();
          }
        });
      }
    });
    
    function validate() {
      var valid = true;
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      
      if(!regex.test(email.val())) {
        name.css('border-color', 'red');
        valid = false;
      }
      if($.trim(subject.val()) === "") {
        phone.css('border-color', 'red');
        valid = false;
      }
      if($.trim(message.val()) === "") {
        email.css('border-color', 'red');
        valid = false;
      }
      
      return valid;
    }
   
  });