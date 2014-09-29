//Copied from http://www.recursion.org/d3-for-mere-mortals/

console.log(d3.version);

var rectDemo = d3.select("svg.chart").
  append("svg:svg").
  attr("width", 400).
  attr("height", 300);

rectDemo.append("svg:rect").
  attr("x", 100).
  attr("y", 100).
  attr("height", 100).
  attr("width", 200);