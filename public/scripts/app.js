// Client facing scripts here
$(() => {
  $("#burger").click(() => {
    $('.nav-right').toggleClass("nav-right-visible");
  })
  $('a').attr('target', '_blank'); /*Get all anchor elements to open on new tab */
})