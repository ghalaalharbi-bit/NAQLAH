/* About Us Page */

function isEmptyText(text) {
    return text.search(/\S/) == -1;}

function submitJoinTeam() {
    let name = document.getElementById("name").value;
    let birth = document.getElementById("birth").value;
    let email = document.getElementById("email").value;
    let photo = document.getElementById("photo").value;
    let expertise = document.getElementById("expertise").value;
    let skills = document.getElementById("skills").value;
    let education = document.getElementById("education").value;
    let errors = "";

    if (isEmptyText(name)) {errors += "- The Name field is empty.\n";}
    if (isEmptyText(birth)) {errors += "- The Date of Birth field is empty.\n";}
    if (isEmptyText(email)) {errors += "- The Email field is empty.\n"; }
    if (isEmptyText(photo)) {errors += "- The Personal Photo field is empty.\n";}
    if (isEmptyText(expertise)) {errors += "- The Area of Expertise field is empty.\n";}
    if (isEmptyText(skills)) {errors += "- The Skills field is empty.\n";}
    if (isEmptyText(education)) {errors += "- The Education field is empty.\n";}

    if (!isEmptyText(name) && name.search(/^\s*\d/) != -1) {errors += "- The name cannot start with a number.\n";}

    if (!isEmptyText(photo) && photo.search(/\.(jpg|jpeg|png|gif|webp)$/i) == -1) {errors += "- The photo must be an image (jpg, jpeg, png, gif or webp).\n";}

    if (!isEmptyText(birth)) {
        let year = parseInt(birth.substring(0, 4));
        if (year > 2008) {errors += "- The year of birth must be 2008 or earlier.\n";}}

    if (!isEmptyText(email) && email.search(/^\S+@\S+\.\S+$/) == -1) {errors += "- Please enter a valid email address.\n";}

    // if there is any error: show it and stop
    if (errors != "") {
        alert(errors);
        return false;}

    alert("Thank you, " + name + "! Your request to join our team has been sent successfully.");
    document.getElementById("joinTeamForm").reset();
    return false;
}