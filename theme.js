var bodyElement = document.getElementsByTagName("body")[0];

function applyTheme(theme) {

    if (theme == "dark") {

        if (bodyElement.className.indexOf("dark-theme") == -1) {
            bodyElement.className += " dark-theme";
        }

    } else {

        bodyElement.className =
            bodyElement.className.replace("dark-theme", "");
    }
}

// Load saved theme
var savedTheme = localStorage.getItem("theme");

if (savedTheme == "dark") {
    applyTheme("dark");
}

// Switch Theme
function switchTheme() {

    if (localStorage.getItem("theme") == "dark") {

        applyTheme("light");
        localStorage.setItem("theme", "light");

    } else {

        applyTheme("dark");
        localStorage.setItem("theme", "dark");
    }
}
