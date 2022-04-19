//call ajax
var ajax = new XMLHttpRequest();
var method = "GET";
var url = "./scripts/connectiondb.php";
var asynchronous = true;
ajax.open(method, url, asynchronous);

//sending ajax request
ajax.send();

//receiving respond from connectiondb.php
ajax.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        alert(this.responseText);
        //Converting JSON to array
        // var data = JSON.parse(this.responseText);
        // console.log(data);

        // var html ="";

        // for(var a=0;a<data.length;a++){
        //     var deviceName = data[a].did;
        //     var ipName = data[a].ip;
        //     var countryName = data[a].country;
        //     var coorLat = data[a].lat;
        //     var coorLon = data[a].lon;

        //     var timestampTxt = data[a].ts;
        //     var timestamp = parseInt(timestampTxt);
        //     var date = new Date(timestamp);
        //     // console.log(date.getTime());
        //     // console.log(date);


        //     html += "<tr>";
        //     html += "<td>" + deviceName + "</td>"
        //     html += "<td>" + ipName + "</td>"
        //     html += "<td>" + countryName + "</td>"
        //     html += "<td>" + coorLat + "</td>"
        //     html += "<td>" + coorLon + "</td>"
        //     html += "<td>" + date + "</td>"
        //     html += "</tr>"

        //     document.getElementById("data").innerHTML = html;
        // }

    }
}