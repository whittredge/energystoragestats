function makeLegend(data, screenWidth) {
  var color = d3.scale.category10();

  var width = 160;

  var height = 160;

  var color = d3.scale.category10()
      .domain(function(data) { return data.deviceType; });

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

  legend.selectAll(".legend")
      .data(data)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d,i) { return data[i].deviceType; });
};