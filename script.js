const gallery = document.getElementById('gallery');
const imageInfo = document.getElementById('image-info');
let imageData = [];

// Function to fetch 100 dummy images
function fetchImages() {
    const images = [];
    for (let i = 1; i <= 100; i++) {
        images.push({
            id: i,
            src: `https://via.placeholder.com/150?text=Image+${i}`,
            title: `Image ${i}`,
            description: `This is Image ${i}`
        });
    }
    return images;
}

// Function to render images in the gallery
function renderGallery(images) {
    gallery.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.title;
        imgElement.className = 'image-item';
        imgElement.dataset.id = image.id;
        gallery.appendChild(imgElement);
    });
}

// Event listener for image click
gallery.addEventListener('click', (event) => {
    const imageId = event.target.dataset.id;
    const image = imageData.find(img => img.id == imageId);
    if (image) {
        displayImageInfo(image);
    }
});

// Function to display image info
function displayImageInfo(image) {
    imageInfo.innerHTML = `
        <h3>${image.title}</h3>
        <p>${image.description}</p>
    `;
    saveMetadata(image);
}

// Function to save metadata to a JSON file (simulation)
function saveMetadata(image) {
    const metadata = JSON.stringify(image, null, 2);
    console.log('Saving metadata:', metadata);
    // Code to save metadata in a file (requires server-side implementation)
}

// Event listener for column selector
document.getElementById('columns').addEventListener('change', (event) => {
    const columns = event.target.value;
    gallery.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
});

// Event listener for search button
document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredImages = imageData.filter(image => image.title.toLowerCase().includes(searchTerm));
    renderGallery(filteredImages);
});

// Initialize gallery with images
imageData = fetchImages();
renderGallery(imageData);
