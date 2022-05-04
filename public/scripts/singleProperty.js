$(() => {
  $('.open-property').click((e) => {
    const propertyID = e.currentTarget.classList[0]
    window.open(`http://localhost:8080/properties/${propertyID}`, '_blank');
  })
});
