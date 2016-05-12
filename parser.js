module.exports = {
  parse: function(data) {
    var rows = createRows(data.responses[0].textAnnotations);
    //console.log(rows);
    rows = arrangeItems(rows);
    console.log(rows);
    var items = getItems(rows);
    console.log(items);
    function createRows(textAnnotations) {
      var rows = {};
      for (var i = 1; i < textAnnotations.length; i++) {
        var annotation = textAnnotations[i];
        var top = annotation.boundingPoly.vertices[0].y;
        var bottom = annotation.boundingPoly.vertices[2].y;
        var position = Math.round((top + bottom) / 2);
        if (!rows[position]) {
          rows[position] = [];
        }
        rows[position].push(annotation.description);
      }
      //console.log(rows);
      // merge rows that are close to each other
      var keys = [];
      for (var p in rows) {
        if (rows.hasOwnProperty(p)) {
          keys.push(p);
        }
      }
      var j = 0;
      while (keys[j]) {
        var k = j + 1;
        while ((keys[k] - keys[j]) < 5) {
          var q = 0;
          while (rows[keys[k]][q]) {
            rows[keys[j]].push((rows[keys[k]][q]).toString());
            q++;
          }
          delete rows[keys[k]];
          keys.splice(k, 1);
        }
        j++;
      }
      return rows;
    }
    function arrangeItems(rows) {
      var arrangedRows = {};
      for (var p in rows) {
        if (rows.hasOwnProperty(p)) {
          var array = rows[p];
          var temp = [];
          temp[2] = '';
          temp[1] = 1;
          for (var t in array) {
            if (array.hasOwnProperty(t)) {
              var m = (/[\d]+(\.[\d]+)?/).exec(array[t]);
              if (m) {
                // Check if there is a decimal place
                if (m[1]) {
                  temp[0] = array[t];
                } else if (array[t] % 1 === 0) {
                  temp[1] = array[t];
                }
              } else {
                temp[2] += array[t] + ' ';
              }
            }
          }
          arrangedRows[p] = temp;
        }
      }
      return arrangedRows;
    }

    function getItems(rows) {
      var billObj = {};
      var items = {};
      for (var i in rows) {
        if (rows.hasOwnProperty(i)) {
          var m = (/[\d]+(\.[\d]+)?/).exec(rows[i][0]);
          if (rows[i][2].match(/subtotal/i)){
            billObj.subtotal = rows[i][0];
            continue;
          }
          if (rows[i][2].match(/tax/i)){
            billObj.tax = rows[i][0];
            continue;
          }
          if (rows[i][2].match(/discount/i)){
            billObj.discount = rows[i][0];
            continue;
          }
          if (rows[i][2].match(/total/i)){
            billObj.total = rows[i][0];
            billObj.items = items;
            return billObj;
          }
          if (m && !billObj.subtotal) {
            // Check if there is a decimal place
            if (m[1]) {
              items[i] = rows[i];
            }
          }
        }
      }
      billObj.items = items;
      return billObj;
    }
  }
};
