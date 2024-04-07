const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready=false;
let imagesLoaded=0;
let totalimages=0; 
let photosArray = [];


// Unsplash API
let count = 4;
const apiKey = 'Y4e1DugFGDCt4zURJSghp1jhSYMtWJDe6f7bErk3Dzw';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesloaded);
  if(imagesLoaded===totalimages){
    ready=true;
    loader.hidden=true;
   count=30;
   apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

  }
}

// Helper function to set attributes on a DOM element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links & photos, add to DOM
function displayPhotos() {
  imagesLoaded=0;
  totalimages=photosArray.length;
  // Hide loader when images are loaded
  loader.hidden = true;
  photosArray.forEach((photo) => {
    // Create <a> element to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event listener to check when each image is finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {
     // Optionally, you can also display an error message to the user.
  }
}

// Infinite Scroll
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On page load
getPhotos();
