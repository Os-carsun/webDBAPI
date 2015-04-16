	html5rocks.webdb.sqlGenerator={};
	html5rocks.webdb.sqlGenerator.sqlString="";
	html5rocks.webdb.sqlGenerator.sqlResult=[];
	var sql =html5rocks.webdb.sqlGenerator;
	html5rocks.webdb.sqlGenerator.select=function(stats) {
		
		html5rocks.webdb.sqlGenerator.sqlString=""
		html5rocks.webdb.sqlGenerator.sqlString="SELECT";
		for(var stat in stats)
			html5rocks.webdb.sqlGenerator.sqlString+= " "+stats[stat]+","
		sql.sqlString=sql.sqlString.substring(0,sql.sqlString.length-1);
		return html5rocks.webdb.sqlGenerator;
	}
	html5rocks.webdb.sqlGenerator.update=function(table) {
		
		html5rocks.webdb.sqlGenerator.sqlString=""
		html5rocks.webdb.sqlGenerator.sqlString="UPDATE "+table+" ";
		return html5rocks.webdb.sqlGenerator;
	}
	html5rocks.webdb.sqlGenerator.set=function(stats) {
		
		html5rocks.webdb.sqlGenerator.sqlString+="SET";
		for(var stat in stats)
			html5rocks.webdb.sqlGenerator.sqlString+= " "+stats[stat].key+"="+stats[stat].val+","
		sql.sqlString=sql.sqlString.substring(0,sql.sqlString.length-1);
		return html5rocks.webdb.sqlGenerator;
	}
	html5rocks.webdb.sqlGenerator.delete=function() {
		
		html5rocks.webdb.sqlGenerator.sqlString=""
		html5rocks.webdb.sqlGenerator.sqlString="DELETE";
		// for(var stat in stats)
		// 	html5rocks.webdb.sqlGenerator.sqlString+= " "+stats[stat]+","
		// sql.sqlString=sql.sqlString.substring(0,sql.sqlString.length-1);
		return html5rocks.webdb.sqlGenerator;
	}
	html5rocks.webdb.sqlGenerator.insert=function(table,stats) {
		
		html5rocks.webdb.sqlGenerator.sqlString=""
		html5rocks.webdb.sqlGenerator.sqlString="INSERT INTO "+table+"(";
		for(var stat in stats)
			html5rocks.webdb.sqlGenerator.sqlString+= " "+stats[stat]+","
		sql.sqlString=sql.sqlString.substring(0,sql.sqlString.length-1);
		sql.sqlString+=")"
		return html5rocks.webdb.sqlGenerator;
	}
	html5rocks.webdb.sqlGenerator.values=function(stats) {
		
		
		html5rocks.webdb.sqlGenerator.sqlString+="VALUES"+"(";
		for(var stat in stats)
			html5rocks.webdb.sqlGenerator.sqlString+= " "+stats[stat]+","
		sql.sqlString=sql.sqlString.substring(0,sql.sqlString.length-1);
		sql.sqlString+=")"
		return html5rocks.webdb.sqlGenerator;
	}
	html5rocks.webdb.sqlGenerator.from=function(stats) {
		
		html5rocks.webdb.sqlGenerator.sqlString+=" FROM";
		for(var stat in stats)
			html5rocks.webdb.sqlGenerator.sqlString+= " "+stats[stat]+","
		sql.sqlString=sql.sqlString.substring(0,sql.sqlString.length-1);
		return html5rocks.webdb.sqlGenerator;
	}
	html5rocks.webdb.sqlGenerator.where=function(stats) {
		
		html5rocks.webdb.sqlGenerator.sqlString+=" WHERE";
		for(var stat in stats)
			html5rocks.webdb.sqlGenerator.sqlString+= " "+stats[stat].key+stats[stat].op+stats[stat].val+","
		sql.sqlString=sql.sqlString.substring(0,sql.sqlString.length-1);
		return html5rocks.webdb.sqlGenerator;
	}
	html5rocks.webdb.sqlGenerator.other=function(stats) {
		
		html5rocks.webdb.sqlGenerator.sqlString=stats;
		
		return html5rocks.webdb.sqlGenerator;
	}
	html5rocks.webdb.sqlGenerator.onError = function(tx, e) {
	  console.log(e);
	}
	html5rocks.webdb.sqlGenerator.onSuccess = function(tx, r) {
		console.log(r);
	}
	html5rocks.webdb.sqlGenerator.exec=function() {
		var db = html5rocks.webdb.db;
		var cb =[];
  	for (var i = 0; i < arguments.length; i++) {
      // console.log(arguments[i]);
      cb.push(arguments[i]);
  	}

		db.transaction(function(tx) {
	    
	    tx.executeSql(sql.sqlString, [],function(tx,rs) {
	    	html5rocks.webdb.sqlGenerator.sqlResult=[];
	    	for (var i=0; i < rs.rows.length; i++) {
	    		html5rocks.webdb.sqlGenerator.sqlResult.push(rs.rows.item(i));
	  		}
	  		sql.sqlString="";
	  		for (var i = 0; i < cb.length; i++) {
		      cb[i]();
	  		}
	    },html5rocks.webdb.sqlGenerator.onError,
	    html5rocks.webdb.sqlGenerator.onSuccess);
	  });

	}

	// html5rocks.webdb.sqlGenerator.select(['*']).from(["test"]).exec();
	// html5rocks.webdb.sqlGenerator.insert('test',['todo']).values(['1.0']).exec()
	// html5rocks.webdb.sqlGenerator.update('test').set([{"key":"todo","val":"0.0"}]).where([{"key":"ID","val":"140"}]).exec()
	// html5rocks.webdb.sqlGenerator.other("SELECT COUNT(ID) AS c").from(['test']).exec();