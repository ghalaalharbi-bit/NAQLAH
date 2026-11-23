/* Manager Pages */

function isEmptyText(text) {
    return text.search(/\S/) == -1;
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function getFileName(path) {
    return path.substring(path.lastIndexOf("\\") + 1);
}

function isImageFile(path) {
    return path.search(/\.(jpg|jpeg|png|gif|webp)$/i) != -1;
}

/* Manager Dashboard Page */

function getManagerOfferings() {
    let storedOfferings = localStorage.getItem("managerOfferings");

    if (storedOfferings == null) {
        return [];
    }

    return JSON.parse(storedOfferings);
}

function displayManagerOfferings() {
    let offeringsArea = document.getElementById("newOfferingsList");
    let offerings = getManagerOfferings();
    let html = "";

    for (let i = 0; i < offerings.length; i++) {
        let name = escapeHtml(offerings[i].name);

        html += "<div class=\"manager-offering-item\">" +
                "<img src=\"images/" + escapeHtml(offerings[i].image) + "\" alt=\"" + name + "\">" +
                name + "</div>";
    }

    offeringsArea.innerHTML = html;
}


/* Add a New Offering Page */

function addOffering() {
    let name = document.getElementById("offering-name").value;
    let image = document.getElementById("offering-image").value;
    let price = document.getElementById("offering-price").value;
    let description = document.getElementById("offering-description").value;
    let errors = "";

    if (isEmptyText(name)) {
        errors += "- The Offering Name field is empty.\n";
    } else if (name.search(/^\s*\d/) != -1) {
        errors += "- The Offering Name cannot start with a number.\n";
    }

    if (isEmptyText(image)) {
        errors += "- The Image field is empty.\n";
    } else if (!isImageFile(image)) {
        errors += "- The Image must be an image file (jpg, jpeg, png, gif or webp).\n";
    }

    if (isEmptyText(price)) {
        errors += "- The Price field is empty.\n";
        errors += "- The Price must be a number.\n";
    } else if (price.search(/^\d+(\.\d+)?$/) == -1) {
        errors += "- The Price must be a number (0 or more).\n";
    }

    if (isEmptyText(description)) {
        errors += "- The Description field is empty.\n";
    }

    if (errors != "") {
        alert(errors);
        return false;
    }

    let offerings = getManagerOfferings();

    offerings.push({
        name: name,
        image: getFileName(image),
        price: parseFloat(price),
        description: description
    });

    localStorage.setItem("managerOfferings", JSON.stringify(offerings));

    alert("The offering \"" + name + "\" has been added successfully.");
    document.getElementById("addOfferingForm").reset();
    return false;
}


/* Manage Activity Leaders and Instructors Page */

let teamMembers = [
    { name: "Ahmed Al-Harbi", photo: "instructor1_photo.jpg" },
    { name: "Omar Al-Qahtani", photo: "instructor2_photo.jpg" },
    { name: "Sara Al-Ghamdi", photo: "instructor3_photo.jpg" },
    { name: "Khalid Al-Mutairi", photo: "instructor4_photo.jpg" },
    { name: "Noor Al-Zahrani", photo: "instructor5_photo.jpg" },
    { name: "Reem Al-Otaibi", photo: "instructor6_photo.jpg" }
];

function displayTeam() {
    let teamList = document.getElementById("teamList");
    let html = "";

    for (let i = 0; i < teamMembers.length; i++) {
        let name = escapeHtml(teamMembers[i].name);

        html += "<label class=\"manager-team-row\">" +
                "<img src=\"images/" + escapeHtml(teamMembers[i].photo) + "\" alt=\"" + name + " photo\">" +
                "<span class=\"member-name\">" + name + "</span>" +
                "<input type=\"checkbox\" name=\"selected_members[]\" value=\"" + i + "\">" +
                "</label>";
    }

    teamList.innerHTML = html;
}

function deleteMembers() {
    let checkboxes = document.querySelectorAll("#teamList input");
    let selectedCount = 0;

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedCount++;
        }
    }

    if (selectedCount == 0) {
        alert("Please select at least one activity leader or instructor to delete.");
        return false;
    }

    let confirmDelete = confirm("Are you sure you want to delete the selected activity leader(s) / instructor(s)?");

    if (confirmDelete) {
        for (let j = checkboxes.length - 1; j >= 0; j--) {
            if (checkboxes[j].checked) {
                teamMembers.splice(parseInt(checkboxes[j].value), 1);
            }
        }

        displayTeam();
    }

    return false;
}

function addTeamMember() {
    let name = document.getElementById("name").value;
    let birth = document.getElementById("birth").value;
    let email = document.getElementById("email").value;
    let photo = document.getElementById("photo").value;
    let expertise = document.getElementById("expertise").value;
    let skills = document.getElementById("skills").value;
    let education = document.getElementById("education").value;
    let errors = "";

    if (isEmptyText(name)) {
        errors += "- The Name field is empty.\n";
    } else if (name.search(/^\s*[A-Za-z][A-Za-z\s-]*$/) == -1) {
        errors += "- The Name must contain letters only and cannot start with a number.\n";
    }

    if (isEmptyText(birth)) {
        errors += "- The Date of Birth field is empty.\n";
    } else if (parseInt(birth.substring(0, 4)) > 2008) {
        errors += "- The year of birth must be 2008 or earlier.\n";
    }

    if (isEmptyText(email)) {
        errors += "- The Email field is empty.\n";
    } else if (email.search(/^\S+@\S+\.\S+$/) == -1) {
        errors += "- Please enter a valid email address.\n";
    }

    if (isEmptyText(photo)) {
        errors += "- The Personal Photo field is empty.\n";
    } else if (!isImageFile(photo)) {
        errors += "- The photo must be an image (jpg, jpeg, png, gif or webp).\n";
    }

    if (isEmptyText(expertise)) {
        errors += "- The Area of Expertise field is empty.\n";
    } else if (expertise.search(/[A-Za-z]/) == -1) {
        errors += "- The Area of Expertise must be text, not numbers or symbols only.\n";
    }

    if (isEmptyText(skills)) {
        errors += "- The Skills field is empty.\n";
    } else if (skills.search(/[A-Za-z]/) == -1) {
        errors += "- The Skills must be text, not numbers or symbols only.\n";
    }

    if (isEmptyText(education)) {
        errors += "- The Education field is empty.\n";
    } else if (education.search(/[A-Za-z]/) == -1) {
        errors += "- The Education must be text, not numbers or symbols only.\n";
    }

    if (errors != "") {
        alert(errors);
        return false;
    }

    teamMembers.push({
        name: name,
        photo: getFileName(photo)
    });

    displayTeam();
    document.getElementById("addTeamForm").reset();
    return false;
}
