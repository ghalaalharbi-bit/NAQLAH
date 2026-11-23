/* Home AND OFFERINGS Page JavaScript */

/* 1. Back to Top Button */

function checkScroll() {

    var topButton = document.getElementById("backToTop");

    if (document.documentElement.scrollTop > 200) {
        topButton.style.display = "block";
    }
    else {
        topButton.style.display = "none";
    }
}

function backToTop() {
    document.documentElement.scrollTop = 0;
}

/* 2. Real-Time Clock */

function updateClock() {

    var now = new Date();

    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    document.getElementById("clock").innerHTML =
        hours + ":" + minutes + ":" + seconds;
}

function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

/* 3. Sort Offerings */

function sortOfferings() {

    var sortType = document.getElementById("sort-offerings").value;

    if (sortType == "") {
        return;
    }

    var offerings = document.getElementsByClassName("offering-card");
    var titles = document.querySelectorAll(".offering-card h2");
    var priceTags = document.getElementsByClassName("offering-price");

    var cards = [];
    var sortValues = [];

    for (var i = 0; i < offerings.length; i++) {

        cards.push(offerings[i]);

        var key;

        if (sortType == "name-az" || sortType == "name-za") {
            key = titles[i].innerHTML.toLowerCase();
        }
        else {
            
            var price = parseInt(priceTags[i].innerHTML.split(" ")[1]);

            key = "" + price;

            while (key.length < 6) {
                key = "0" + key;
            }
        }

        sortValues.push(key + "|" + i);
    }

    sortValues.sort();

    if (sortType == "name-za" || sortType == "price-high") {
        sortValues.reverse();
    }

    var container = document.getElementsByClassName("offerings-container")[0];

    for (var i = 0; i < sortValues.length; i++) {

        var parts = sortValues[i].split("|");
        var index = parseInt(parts[1]);

        container.appendChild(cards[index]);
    }
}

/* 4. Random Order on Offerings Page */

function randomOrder() {

    var cards = document.getElementsByClassName("offering-card");
    var randomList = [];

    for (var i = 0; i < cards.length; i++) {
        randomList.push(cards[i]);
    }

    var container = document.getElementsByClassName("offerings-container")[0];

    while (randomList.length > 0) {

        var r = Math.floor(Math.random() * randomList.length);

        container.appendChild(randomList[r]);
        randomList.splice(r, 1);
    }
}