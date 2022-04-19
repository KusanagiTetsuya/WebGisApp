$.ajax({
    url: "http://localhost:4000/getdata",
    type: 'GET',
    dataType: 'jsonp',
    cors: true ,
    contentType:'application/json',
    secure: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa(""));
    },
    success: function (data){
      console.log(data.organizations[0].name);
      var organisation = data.organizations[0].name;
      $("#company").text(organisation);
    }
})