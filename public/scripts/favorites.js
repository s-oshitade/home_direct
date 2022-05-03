//Code allowing logged in users to fav a property.
//@TODO - edit to undo fav selection and capture resulting update in the database.
$(() => {
  $(`i`).click((e) => {
    const favId = e.currentTarget.classList[2];
    e.preventDefault();
    $.post("/login/favs", {favId}).then((resp) => {
      console.log("check", $(`.${favId}`))
      $(`.${favId}`).css('color', 'tomato');
      console.log(e.currentTarget.classList[2]);
     console.log(resp);
    });
  })
});


//Ajax request
//new route (post)
//syntax to update the database - INSERT INTO