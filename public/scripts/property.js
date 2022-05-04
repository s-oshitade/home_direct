$(() => {
  $('.open-property').click((e) => {
    const propertyID = e.currentTarget.classList[0].slice(2,6);
    window.open(`http://localhost:8080/properties/${propertyID}`, '_blank');
  })
});
