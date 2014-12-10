function makeLegend(data, screenWidth) {
  var color = d3.scale.category10();

  var width = 160;

  var height = 458;

  d3.select(".legend")
    .style("padding-left", 0)
    .style("padding-right", 0)

  d3.select(".sticky-wrapper")
    .style("padding-left", 0)
    .style("padding-right", 0)

  d3.select(".legendContainer")
    .style("padding-left", 0)
    .style("padding-right", 0)

  var legend = d3.select(".legend").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "white")
    .style("outline", "thin solid #A7D7F9")

svg.selectAll(".rect")
    .data(data)
  .enter().append("rect")
    .attr("x", width)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

  legend.append("text")
    .attr("x", width)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d.deviceType; });
};