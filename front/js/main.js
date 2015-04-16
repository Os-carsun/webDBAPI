function addValue (value) {
  var data = {"table":"test","col":["todo"],"value":[]};

  data.value.push(value)
  html5rocks.webdb.insertData(data);

  if( html5rocks.webdb.count.ID >= 100 ){
    html5rocks.webdb.calCount("test","id",null);
    html5rocks.webdb.calCount("test","todo"," todo=1.0 ");
    setTimeout(function(){
      doajax({"ip":myip,"rate":html5rocks.webdb.count.todo/html5rocks.webdb.count.ID,"times":html5rocks.webdb.count.ID});
    }, 1000);
  }
}
function doajax (object) {
  if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }
  else{// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        //do something?
        console.log(xmlhttp.responseText);
      }
  }
  xmlhttp.open("POST", "../backend/save.php");
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send("data="+JSON.stringify(object));
  // console.log("message");
}
