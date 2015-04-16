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

html5rocks.webdb.open = function(dbConfig) {
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
  html5rocks.webdb.sqlGenerator.insert(data.table,data.col).values(data.value).exec()
  html5rocks.webdb.calCount("test","ID",null)
}

html5rocks.webdb.selectData = function(renderFunc,tables){
	html5rocks.webdb.sqlGenerator.select(['*']).from(tables).exec(renderFunc);
}
html5rocks.webdb.delete = function(table,stat) {
	html5rocks.webdb.sqlGenerator.delete().from(table).where(stat).exec();
}
html5rocks.webdb.calCount = function (table,col,where) {
	var db = html5rocks.webdb.db;
  db.transaction(function(tx){
  	if(where!=null)
  		whereS = " WHERE"+where;
  	else
  		whereS ="";
  	// console.log(whereS);
    tx.executeSql("SELECT COUNT("+col+") As c FROM "+table+whereS,
    	[],function (tx, r) {
      		html5rocks.webdb.count[col]=r.rows.item(0).c;
    			}
        )
    });

}
function loadItems() {
  for (var i=0; i < html5rocks.webdb.sqlGenerator.sqlResult.length; i++) {
    console.log(html5rocks.webdb.sqlGenerator.sqlResult[i]);
  }
}
function putResultInArray(tx, rs) {
  var rowOutput = "";
  html5rocks.webdb.result=[];
  for (var i=0; i < rs.rows.length; i++) {
    html5rocks.webdb.result.push(rs.rows.item(i));
  }
}
function init(){
  html5rocks.webdb.open(dbConfig);
  html5rocks.webdb.createTable(dbConfig);
}
init();
