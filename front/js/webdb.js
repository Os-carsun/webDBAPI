var html5rocks = {};
html5rocks.webdb = {};
html5rocks.webdb.db = null;
var dbSize = 5 * 1024 * 1024;// 5MB
html5rocks.webdb.open = function(dbSize) {
   
  html5rocks.webdb.db = openDatabase("Todo", "1", "Todo manager", dbSize);
}