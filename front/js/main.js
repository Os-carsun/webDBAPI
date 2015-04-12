function addValue (value) {
  var data = {"table":"test","col":["todo"],"value":[]};
  data.value.push(value)
  html5rocks.webdb.insertData(data);
}