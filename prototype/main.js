function selectRecord(id, name) {
    for(let i=1; i<=6;i++){
        if(i == id){
            document.getElementById(String(i)).style.backgroundColor= '#63B8FF';
        }
        else {
            document.getElementById(String(i)).style.backgroundColor = null;
        }
    }
    document.getElementById('name').innerHTML  = name;
}
