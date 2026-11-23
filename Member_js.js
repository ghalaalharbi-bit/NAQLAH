/* JavaScript for the Join an Offering and Evaluate Offering pages */ 

let joinRequests = [];

function hasOnlyLetters(name) {
    let allowedCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZابتثجحخدذرزسشصضطظعغفقكلمنهويءأإآؤئىة ";

    for (let i = 0; i < name.length; i++) {
        if (allowedCharacters.indexOf(name.charAt(i)) == -1) {
            return false;
        }
    }

    return true;
}

// Counts the words in the name
function countWords(name) {
    let wordCount = 0;
    let previousWasSpace = true;

    for (let i = 0; i < name.length; i++) {
        let currentCharacter = name.charAt(i);

        if (currentCharacter != " " && previousWasSpace) {
            wordCount++;
        }

        previousWasSpace = (currentCharacter == " ");
    }

    return wordCount;
}

// Returns today's date in YYYY-MM-DD format
function getTodayString() {
    let now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day; }

    return now.getFullYear() + "-" + month + "-" + day;
}

// Returns true only if the selected date is after today
function isFutureDate(dateValue) {
    return dateValue > getTodayString();
}

function submitJoinRequest() {
    let offeringSelect = document.getElementById("offeringSelect");
    let nameInput = document.getElementById("fullName");
    let dateInput = document.getElementById("preferredDate");

    let offeringName = offeringSelect.value;
    let memberName = nameInput.value;
    let preferredDate = dateInput.value;
    let errors = "";

    // 1) Offering must be selected
    if (offeringName == "") {
        errors += "- Please select an offering.\n";
    }

    // 2) Name must be a full name with letters only
    if (memberName == "") {
        errors += "- Please enter your full name.\n";
    } else if (!hasOnlyLetters(memberName)) {
        errors += "- The name must contain letters only (no numbers or symbols such as ? ! @).\n";
    } else if (countWords(memberName) < 2) {
        errors += "- Please enter your full name (first name and last name).\n";
    }

    // 3) Date must be selected and must be in the future
    if (preferredDate == "") {
        errors += "- Please select a preferred date.\n";
    } else if (!isFutureDate(preferredDate)) {
        errors += "- The preferred date must be a future date.\n";
    }

    // Stop the process if there are errors
    if (errors != "") {
        alert(errors);
        return false;
    }

    // Ask the member whether to stay on this page or leave
    let stayOnPage = confirm(
        "Your request for " + offeringName + " has been sent successfully.\n\n" +
        "Click OK to stay on this page and add another request, or Cancel to return to the Club Member Dashboard."
    );

    if (stayOnPage) {
        joinRequests.push({
            offeringName: offeringName,
            memberName: memberName,
            preferredDate: preferredDate
        });

        displayJoinRequests();
        offeringSelect.value = "";
        nameInput.value = "";
        dateInput.value = "";
    } else {
        window.location.href = "member_dashboard.html";
    }

    return false;
}

// Builds a table with all the requests
function displayJoinRequests() {
    let requestsArea = document.getElementById("joinRequestList");

    if (joinRequests.length == 0) {
        requestsArea.innerHTML = "";
        return;
    }

    let rows = "";

    for (let i = 0; i < joinRequests.length; i++) {
        rows += "<tr><td>" + joinRequests[i].offeringName + "</td>" +
                "<td>" + joinRequests[i].memberName + "</td>" +
                "<td>" + joinRequests[i].preferredDate + "</td></tr>";
    }

    requestsArea.innerHTML =
        "<h2 class=\"section-subtitle\">New Offering requested</h2>" +
        "<div class=\"new-requests-table-wrap\"><table class=\"new-requests-table\">" +
        "<thead><tr><th>Offering Name</th><th>Member Name</th><th>Preferred Date</th></tr></thead>" +
        "<tbody>" + rows + "</tbody></table></div>";
}

function evaluateOffering() {
    let offeringName = document.getElementById("evalOfferingSelect").value;
    let feedback = document.getElementById("feedbackText").value;
    let ratingInputs = document.querySelectorAll("input[name=rating]");
    let rating = 0;

    // Find the selected rating
    for (let i = 0; i < ratingInputs.length; i++) {
        if (ratingInputs[i].checked) {
            rating = parseInt(ratingInputs[i].value);
        }
    }

    if (feedback.search(/\S/) == -1) {
        alert("- Please enter your feedback.\n");
        return false;
    }

    if (rating >= 4) {
        alert("Thank you for your positive evaluation of " + offeringName + ".");
    } else {
        alert("We are sorry that your experience did not meet your expectations.");
    }

    window.location.href = "member_dashboard.html";
    return false;
}