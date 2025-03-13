// index.js
const menuImages = document.querySelectorAll('#ramen-menu img');
menuImages.forEach(image => {
  image.addEventListener('click', (event) => {
    const ramenId = event.target.dataset.id;
    const ramen = testResponseData.find(r => r.id === ramenId);
    handleClick(ramen);
  });
});

// Callbacks
const handleClick = (ramen) => {
  const { image, name, restaurant, rating, comment } = ramen;

  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailImg.src = image;
  detailName.textContent = name;
  detailRestaurant.textContent = restaurant;
  detailsRating.textContent = rating;
  detailsComment.textContent = comment;

};



const addSubmitListener = () => {
  const submitButton = document.getElementById('submit-button');
  const ramen = document.getElementById('ramen-menu');
  const getForm = document.getElementById('new-ramen');
  getForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const ramenMenuDivBefore = document.querySelectorAll('#ramen-menu img');
    const ramenFormName = document.querySelector("#new-ramen #new-name");
    const ramenFormRestaurant = document.querySelector("#new-ramen #new-restaurant");
    const ramenFormImage = document.querySelector("#new-ramen #new-image");
    const ramenFormRating = document.querySelector("#new-ramen #new-rating");
    const ramenFormComment = document.querySelector("#new-ramen #new-comment");

    const newRamen = {
      name: ramenFormName.value,
      restaurant: ramenFormRestaurant.value,
      image: ramenFormImage.value,
      rating: ramenFormRating.value,
      comment: ramenFormComment.value,
    };

    const newImage = document.createElement('img');
    newImage.src = newRamen.image;
    ramen.appendChild(newImage);
    getForm.reset();

    newImage.addEventListener('click', (event) => {
      const newDetailImg = document.querySelector("#ramen-detail > .detail-image");
      const newDetailName = document.querySelector("#ramen-detail > .name");
      const newDetailRestaurant = document.querySelector("#ramen-detail > .restaurant");
      const newDetailsRating = document.getElementById("rating-display");
      const newDetailsComment = document.getElementById("comment-display");

      newDetailImg.src = newRamen.image;
      newDetailName.textContent = newRamen.name;
      newDetailRestaurant.textContent = newRamen.restaurant;
      newDetailsRating.textContent = newRamen.rating;
      newDetailsComment.textContent = newRamen.comment;
    })

  })

}

const displayRamens = async () => {
  try {
    const ramenMenu = document.getElementById("ramen-menu");
    const response = await fetch("http://localhost:3000/ramens");
    const data = await response.json();

    data.forEach(ramen => {
      const ramenImg = document.createElement('img');
      ramenImg.src = ramen.image;
      ramenImg.alt = ramen.name;
      ramenMenu.appendChild(ramenImg);
    });
  }
  catch (error) {
    console.error('Error fetching data:', error);
  }
};

const main = () => {
  displayRamens();
  addSubmitListener();
}
document.addEventListener('DOMContentLoaded', () => {
  main()
})


// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
