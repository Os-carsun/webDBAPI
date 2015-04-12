var html5rocks = {};
html5rocks.webdb = {};
html5rocks.webdb.db = null;
dbConfig = {
  "name":"Test",
  "version":1,
  "description":"blahblah",
  "dbSize": 5 * 1024 * 1024, // 5MB
  "tables":[
    {
      "name":"test",
      "row":[
        {"name":"ID","type":"INTEGER","setting":"PRIMARY KEY ASC"},
        {"name":"todo","type":"TEXT","setting":""},
        {"name":"date","type":"DATETIME","setting":""},
      ]
    },
    {
      "name":"test2",
      "row":[
        {"name":"ID","type":"INTEGER","setting":"PRIMARY KEY ASC"},
        {"name":"todo","type":"TEXT","setting":""},
        {"name":"date","type":"DATETIME","setting":""},
      ]
    }
  ]
}


var testData={"table":"test","col":["todo"],"value":["aaaaaa"]};
html5rocks.webdb.open = function(dbConfig) {
  html5rocks.webdb.db = openDatabase(dbConfig.name,dbConfig.version, 
    dbConfig.description, dbConfig.dbSize);
  html5rocks.webdb.db.dbConfig = dbConfig;
}
html5rocks.webdb.onError = function(tx, e) {
  alert("There has been an error: " + e.message);
}
html5rocks.webdb.onSuccess = function(tx, r) {
  // re-render the data.
  // loadTodoItems is defined in Step 4a
  // html5rocks.webdb.getAllTodoItems(loadTodoItems);
   html5rocks.webdb.selectData(loadTodoItems,"test");
}
html5rocks.webdb.createTable = function(dbConfig) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    var s="";
    for(k=db.dbConfig.tables.length-1;k>=0;k--){
      s=db.dbConfig.tables[k].name+"(";
      [].forEach.call(db.dbConfig.tables[k].row,function(a){s+=a.name+" "+a.type+" "+a.setting+","})
      s=s.substring(0,s.length-1);
      s+= ")";
      console.log(s);
      tx.executeSql("CREATE TABLE IF NOT EXISTS "+s,[]);
    }
  })
}

html5rocks.webdb.insertData = function(data) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx){
    var addedOn = new Date();
    s="INSERT INTO "+data.table+"(";
    for (var i = 0; i < data.col.length; i++) {
      s+=data.col[i];
      if(i!=data.col.length-1)
        s+=",";
    };
    s+=") ";
    if(data.value.length>0){
      s+="VALUES ("
      for(var i = 0; i<data.value.length; i++){
        s+="?";
        if(i!=data.value.length-1)
          s+=",";
      }
      s+=")";
    }
    console.log(s);
    tx.executeSql(s,
        data.value,
        html5rocks.webdb.onSuccess,
        html5rocks.webdb.onError);
   });
}

html5rocks.webdb.selectData = function(renderFunc,from){
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    var s = "SELECT * FROM "+from;
    console.log(s);
    tx.executeSql(s, [], renderFunc,html5rocks.webdb.onError);
  });
}
html5rocks.webdb.deleteTodo = function(item,table) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM "+table+" WHERE "+item.col+"=?", [item.value],
        html5rocks.webdb.onSuccess,
        html5rocks.webdb.onError);
    });
}

function loadTodoItems(tx, rs) {
  var rowOutput = "";
  // var todoItems = document.getElementById("todoItems");
  // console.log(rs.rows.item(2));
  for (var i=0; i < rs.rows.length; i++) {
    console.log(rs.rows.item(i));
  }

  // todoItems.innerHTML = rowOutput;
}

function init(){
  html5rocks.webdb.open(dbConfig);
  html5rocks.webdb.createTable(dbConfig);
  // html5rocks.webdb.insertData(testData);
  html5rocks.webdb.selectData(loadTodoItems,"test");
}
init();