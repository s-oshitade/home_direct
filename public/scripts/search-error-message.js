$(() => {
  const foundProperties = $(".main-image").is(':empty');
  if(!foundProperties){
    if ($(".error-message").first().is(":hidden")) {
      $(".error-type").html(`We're sorry. We were not able to find the much.<br>Return to the <a href="./">Home Page</a>`);
      $(".error-message").slideDown("slow");
    } else {
      $(".error-message").hide();
    }
  };

  });
