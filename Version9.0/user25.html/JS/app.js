function updateClock() {

    let now = new Date();

    let time = now.toLocaleTimeString();
    let date = now.toLocaleDateString();

    let clock = document.getElementById("clock");

    if (clock) {
        clock.innerHTML = date + " | " + time;
    }
}

setInterval(updateClock, 1000);



function validateForm() {

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let service = document.getElementById("service");

    if (!name || !email || !service) {
        return true;
    }

    if (
        name.value == "" ||
        email.value == "" ||
        service.value == "Select A Service"
    ) {
        alert("Please fill out all required fields.");
        return false;
    }

    return true;
}



function submitMessage() {

    if (validateForm()) {
        alert("Thank you! Your estimate request has been submitted.");
    }
}



function calculateEstimate() {

    let sqft = document.getElementById("sqft").value;
    let service = document.getElementById("estimateService").value;

    let total = 0;

    if (service == "Landscaping") {
        total = sqft * 2;
    }

    else if (service == "Snow Removal") {
        total = sqft * 1;
    }

    else {
        total = 300;
    }

    document.getElementById("estimateResult").innerHTML =
        "Estimated Cost: $" + total;
}



function getZipInfo() {

    let zip = document.getElementById("zipcode").value;

    fetch("https://api.zippopotam.us/us/" + zip)

    .then(response => response.json())

    .then(data => {

        let city = data.places[0]["place name"];
        let state = data.places[0]["state"];

        document.getElementById("zipResult").innerHTML =
            "City: " + city + ", " + state;
    })

    .catch(() => {
        document.getElementById("zipResult").innerHTML =
            "Zip code not found.";
    });
}



function showReview() {

    let reviews = [

        "★★★★★ Great work and fair pricing! - Rylan",

        "★★★★★ Fast snow removal and professional service. - Dima",

        "★★★★★ Yard looked amazing after landscaping. - Dom",

        "★★★★★ Highly recommend Ries Restoration! - Jennifer"
    ];

    let random =
        Math.floor(Math.random() * reviews.length);

    document.getElementById("reviewText").innerHTML =
        reviews[random];
}


function submitMessage() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let service = document.getElementById("service").value;
    if (name == "" || email == "" || service == "Select A Service") {
        alert("Error! Please fill out all required fields.");
        return false;
    }
    alert("Submitted!");
    return false;
}






function recommendService() {
    let condition =
        document.getElementById("yardCondition").value;
    let result = "";
    if (condition == "Overgrown trees") {
        alert("Recommended Service: Tree Trimming");
    }
    else if (condition == "Long grass") {
        alert("Recommended Service: Landscaping");
    }
    else if (condition == "Snowy driveway") {
        alert("Recommended Service: Snow Removal");
    }
    else {
        alert("Recommended Service: Land Clearing");
    }
    document.getElementById("recommendResult").innerHTML =
        result;
}