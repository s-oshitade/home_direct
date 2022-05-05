//Code allowing logged in users to fav a property.
//@TODO - edit to undo fav selection and capture resulting update in the database.

$(() => {
  $(`i`).click((e) => {
    const favId = e.currentTarget.classList[2];
    $.post("/login/favs", {favId}).then((resp) => {
      console.log("check", $(`.${favId}`))
      $(`.${favId}`).css('color', 'tomato');
      $(`.${favId}`).addClass('#liked');
      console.log(e.currentTarget.classList[2]);
     console.log(resp);
    });
  })
  
//   const smileArray = [...document.querySelectorAll(".smile")];
//   console.log(smileArray);
//   smileArray.forEach(item => {
//     item.addEventListener("click", () => {
//       let dataSmile1 = item.getAttribute("data-laugh");
//       let dataSmile2 = item.dataset.laugh;
//       console.log("dataSmile1", dataSmile1)
//       console.log("dataSmile2", dataSmile2)
//       if(item.classList.contains("liked")){
//         console.log("abc")
//         item.classList.remove("liked")
//       } else {
//         console.log("def")
//         item.classList.add("liked")
//       } 
//     })
//   })
});

// $(() => {
//   const likeArray = [...document.querySelectorAll(".fa-heart")];
//   console.log(likeArray);
//   likeArray.forEach(item => {
//     item.addEeventListener("click", (e) => {
//       console.log("ClassList: ", e.currentTarget.classList)
//       let dataFavs = item.dataset;
//       console.log(dataFavs);
//     })
//   })
// });

