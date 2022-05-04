$(() => {
  function isEmpty( el ){
    return !$.trim(el.html())
}
if (isEmpty($('.feed'))) {

  if ($("#error-message").first().is(":hidden")) {
        $(".error-type").html(`Sorry - We are not able to find a matching property for your search.<br>Return to the <a href="./">Home Page</a>`);
        $("#error-message").slideDown("slow");
      } else {
        $("#error-message").hide();
      }

}


  });
