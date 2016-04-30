module.exports = {
  parse: function(data) {
    var rows = createRows(data.responses[0].textAnnotations);
    console.log(rows);
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
      // merge rows that are close to each other
      
      return rows;
    }
  }
};
