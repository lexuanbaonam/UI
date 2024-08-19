const gallery = document.getElementById('gallery');
const imageInfo = document.getElementById('image-info');
const questionInput = document.getElementById('question-input');
const questionImageContainer = document.getElementById('question-image-container');
const quizResult = document.getElementById('quiz-result');
let imageData = [];
let totalImages = 0; // Track the total number of images

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
    totalImages = images.length; // Update total number of images
    updateQuizQuestion(); // Update the quiz question when gallery is updated
}

// Function to update quiz question
function updateQuizQuestion() {
    document.getElementById('quiz-question').textContent = `How many images are displayed? (Total: ${totalImages})`;
}

// Event listener for question input (handle Enter key)
questionInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default action of Enter key
        const questionValue = questionInput.value.trim();
        const questionNumber = parseInt(questionValue, 10);
        const selectedImage = imageData.find(img => img.id === questionNumber);
        if (selectedImage) {
            displayQuestionImage(selectedImage);
            document.getElementById('quiz-question').textContent = `Question ${questionNumber}:`;
        } else {
            questionImageContainer.innerHTML = 'No image found for the entered question number.';
        }
    }
});

// Function to display the selected question's image
function displayQuestionImage(image) {
    questionImageContainer.innerHTML = `<img src="${image.src}" alt="${image.title}" class="image-item">`;
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
    renderGallery(imageData); // Re-render gallery to reflect column change
});

// Event listener for search button
document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredImages = imageData.filter(image => image.title.toLowerCase().includes(searchTerm));
    renderGallery(filteredImages);
});

// Event listener for quiz answer submission
document.getElementById('submit-answer').addEventListener('click', () => {
    const answer = parseInt(document.getElementById('quiz-answer').value, 10);
    if (isNaN(answer)) {
        quizResult.textContent = 'Please enter a valid number.';
        return;
    }
    if (answer >= 35 && answer <= 50) {
        quizResult.textContent = 'Correct! Well done.';
    } else {
        quizResult.textContent = 'Incorrect. Try again.';
    }
});

// Initialize gallery with images
imageData = fetchImages();
renderGallery(imageData);

// Function to retrieve information from data using a key name
function get_info(data, key_name) {
    if (data.hasOwnProperty(key_name)) {
        return data[key_name]; 
    }
    return null;
}

// Fetch metadata from JSON file and process it
fetch("MetaData.json")
    .then(response => response.json())
    .then(Mydata => {
        console.log(Mydata);

        const key_name = "L07_V027"; 
        const DataInfo = get_info(Mydata, key_name);
        const DataInfoDiv = document.getElementById("DataInfo");

        if (DataInfo) {
            DataInfo.forEach(video => {
                console.log(video.author);
                console.log(video.length);
                console.log(video.title);
                console.log(video.publish_date);
                console.log("-----"); 
            });
        } else {
            console.log(`Key "${key_name}" not found.`);
        }
    });
