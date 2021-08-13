function selectRow(id) {
    for (let i = 1; i <= 8; i++) {
        if (i == id) {
            document.getElementById(i).style.backgroundColor = "#63B8FF";
        } else {
            document.getElementById(i).style.backgroundColor = null;
        }
    }
}

function getData(id) {
    if (id == 1) {
        document.getElementById('code').value = "NT001";
        document.getElementById('name').value = "An Thần";
    }
    if (id == 2) {
        document.getElementById('code').value = "NT002";
        document.getElementById('name').value = "Bổ";
    }
    if (id == 3) {
        document.getElementById('code').value = "NT003";
        document.getElementById('name').value = "Bổ Gan";
    }
    if (id == 4) {
        document.getElementById('code').value = "NT004";
        document.getElementById('name').value = "Bổ Canxi";
    }
    if (id == 5) {
        document.getElementById('code').value = "NT005";
        document.getElementById('name').value = "Bổ Khớp";
    }
    if (id == 6) {
        document.getElementById('code').value = "NT006";
        document.getElementById('name').value = "Bổ Thần Kinh";
    }
    if (id == 7) {
        document.getElementById('code').value = "NT007";
        document.getElementById('name').value = "Cảm Cúm";
    }
    if (id == 8) {
        document.getElementById('code').value = "NT008";
        document.getElementById('name').value = "Bổ Dày";
    }


}
