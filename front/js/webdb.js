var html5rocks = {};
html5rocks.webdb = {};
html5rocks.webdb.db = null;
html5rocks.webdb.result=[];
html5rocks.webdb.count=[];
var dbConfig = {
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
html5rocks.webdb.open = function() {
  html5rocks.webdb.db = openDatabase(dbConfig.name,dbConfig.version, 
    dbConfig.description, dbConfig.dbSize);
  html5rocks.webdb.db.dbConfig = dbConfig;
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
	sql.insert(data.table,data.col).values(data.value).exec(function (tx,rs) {
		html5rocks.webdb.selectData(loadItems,["test"]);
	});

}

html5rocks.webdb.selectData = function(renderFunc,table){
  sql.select(['*']).from(table).exec(renderFunc);
}
html5rocks.webdb.delete = function(item,table) {
  // var db = html5rocks.webdb.db;
  // db.transaction(function(tx){
  //   tx.executeSql("DELETE FROM "+table+" WHERE "+item.col+"=?", [item.value],
  //       html5rocks.webdb.onSuccess,
  //       html5rocks.webdb.onError);
  //   });
}
html5rocks.webdb.calCount = function (table,col,where,cb,cbP) {
	if(where!=null)
		whereS = " WHERE"+where;
	else
		whereS ="";
	sql.other("SELECT COUNT("+col+") As c FROM "+table+whereS).exec(function(tx,r){
		html5rocks.webdb.count[col]=r.rows.item(0).c;
		if(cb!=null&&cbP!=null)
			cb.apply(this,cbP);
	});
}
function loadItems(tx,rs) {
  for (var i=0; i < rs.rows.length; i++) {
    console.log(rs.rows.item(i));
  }
  // html5rocks.webdb.calCount("test","ID",null)
}
function putResultInArray(tx, rs) {
  var rowOutput = "";
  for (var i=0; i < rs.rows.length; i++) {
    html5rocks.webdb.result.push(rs.rows.item(i));
  }
}
function init(){
  html5rocks.webdb.open();
  html5rocks.webdb.createTable(dbConfig);
  html5rocks.webdb.calCount("test","ID",null,html5rocks.webdb.calCount,["test","todo"," todo=1.0 "]);
}
