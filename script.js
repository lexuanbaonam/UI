const images_holder = document.querySelectorAll(".image_holder img");
const input = document.getElementById("input");
const popup = document.getElementById("pop_up");
const popup_p = popup.querySelector("p");

fetch("data.json")
    .then(Response =>{
        return Response.json();
    })

function ShowDataImage(Clicked){
    popup.style.display = "block";
    popup_p.textContent = 'This is the data of image ' + Clicked.dataset.imageIndex;
}

function escape(){
    popup.style.display = "none";
}
