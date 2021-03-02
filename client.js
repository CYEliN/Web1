document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("button").addEventListener("click", submit);
});

function submit() {
    if (checkX()) {
        let xText = document.getElementById("x");
        let form = new FormData();
        let x = xText.value;
        form.append("x", x);
        let rSelect = document.getElementById("r");
        let r = rSelect.value;
        let y = document.getElementById("y").value;
        form.append("y", y.replace(',', '.'));
        form.append("r", r);
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                document.querySelector(".not-main-table").innerHTML = request.responseText;
            }
        }
        request.send(form);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cleaningbutton").addEventListener("click", clean);
});

function clean() {
    let cleaningform = new FormData();
    let cleaningrequest = new XMLHttpRequest();
    cleaningrequest.open('POST', 'clean.php');
    cleaningrequest.onreadystatechange = function () {
        if (cleaningrequest.readyState === 4 && cleaningrequest.status === 200) {
            document.querySelector(".not-main-table").innerHTML = cleaningrequest.responseText;
        }
    }
    cleaningrequest.send(cleaningform);
}

function checkX() {
    let x = document.getElementById("x");
    if (x.value.trim() === "") {
        alert("X не должен быть пустым!");
        return false;
    } else if (!isFinite(x.value.replace(',', '.'))) {
        alert("X должен быть числом!");
    } else if (x.value.replace(',', '.') > 5 || x.value.replace(',', '.') < -5) {
        alert("X должен быть в диапазоне (-5; 5)");
        return false;
    } else return true;
}