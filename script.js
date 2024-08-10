const image_holder = document.querySelectorAll(".image_holder img");
const input = document.getElementById("input");

fetch("data.json")
    .then(respone =>{
        return Response.json();
    })
