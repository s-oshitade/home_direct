
$(document).ready(function () {

  let interval;
  const image = $('.slides img');

  let imageArray = [];

  image.each(function () {
    imageArray.push($(this).attr('src'));

  })

  let imagePosition = 0;
  image.attr("src", imageArray[imagePosition]);

  function startSliding(counter) {


    interval = setInterval(function () {
      image.attr("src", imageArray[counter]);
      imagePosition = counter;
      counter++


      if (counter > imageArray.length - 1) {
        counter = 0;
      }
    }, 1000);
  }

  startSliding(imagePosition);


  $(".prev").click(function () {
    clearInterval(interval);

    imagePosition = imagePosition - 1

    if (imagePosition < 0) {

      imagePosition = imageArray.length - 1;
    }
    image.attr("src", imageArray[imagePosition]);
    startSliding(imagePosition + 1);

  })


  $(".next").click(function () {
    clearInterval(interval);

    imagePosition = imagePosition + 1;

    if (imagePosition > imagePosition.length - 1) {

      imagePosition = 0;
    }
    image.attr("src", imageArray[imagePosition])
    startSliding(imagePosition + 1);

  });



});
