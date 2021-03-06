// <script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>

function makeVolRagone() { 
  var margin = {top: 110, right: 80, bottom: 68, left: 120},
      width = 900 - margin.left - margin.right,
      height = 510 - margin.top - margin.bottom;

  var x = d3.scale.log()
      .range([0, width]);

  console.log(x);

  var y = d3.scale.log()
      .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var tooltip = d3.select(".volRagone").append("div") 
      .attr("class", "tooltip")       
      .style("opacity", 0);

  // http://bl.ocks.org/Caged/6476579 //
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "E = " + d.volEnergyDen + " Wh/cm3<br> </br>P = " +d.volPowerDen + 
      " W/cm3<br> </br>" + d.citationShort + "<br> </br>" + d.deviceType;
    })
    //

  var svg = d3.select("div.volRagone").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background", "white")
      .style("outline", "thin solid #A7D7F9")
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // http://bl.ocks.org/Caged/6476579 //
  svg.call(tip);
  //

  // var s = d3.scale.log().domain([0.001, 10]).range([0.001, 10]);

  d3.json("assets/ESSdataValpha2.json", function(error, data) {  
    // data.forEach(function(d) {
    //   d.volEnergyDen = +d.volEnergyDen;
    //   d.volPowerDen = +d.volPowerDen;
    // });

    x.domain(d3.extent(data, function(d) { return d.volPowerDen; })).nice();
    y.domain(d3.extent(data, function(d) { return d.volEnergyDen; })).nice();

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis
          .tickFormat(function (d) {
            return x.tickFormat(4,d3.format(",g"))(d)
          }))
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", 40)
        .style("text-anchor", "end")
        .text("Volumetric Power Density (W/cm3)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis
          .tickFormat(function (d) {
            return y.tickFormat(4,d3.format(",g"))(d)
          }))
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Volumetric Energy Density (Wh/cm3)");

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.volPowerDen); })
        .attr("cy", function(d) { return y(d.volEnergyDen); })
        .style("fill", function(d) { return color(d.deviceType); })
        // http://bl.ocks.org/Caged/6476579 //
        .on('mouseover', 
          // d3.select("circle.dot")
          //   .attr("r", 10),
          tip.show)
        .on('mouseout', tip.hide)
        //
        .on('click', function(d,i) { var text = d3.select("div.volRagone").append("div").append("text")
          .data(data)
          .style("fill", "black")
          .attr("x", 0)
          .attr("y", 0)
          .text(function() { return d.citationLong; })
          })
      // .append("svg:title")
      //   .text(function(d, i) { return d.deviceType; });

    var legend = svg.selectAll(".legend")
        .data(color.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width + margin.right - 36)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width + margin.right - 42)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

    svg.append("text")
        .attr("x", 0)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "start")
        .style("font-size", "2em")
        .style("font-family", "Georgia")
        .text("Volumetric Ragone Chart");
        
  d3.select(window).on("resize", resize); 

  });
  }



var instructions = d3.select("div.volRagone")
    .append("div")
    .append("text")
        // .append("svg")
    .attr("x", 100)
    .attr("y", 100)
    .style("font-style", "italic")
    .text("Click data points to add their citations here.");


//the below code is from https://blog.safaribooksonline.com/2014/02/17/building-responsible-visualizations-d3-js/
// function resize() {
  console.log(window.innerWidth);
  /* Find the new window dimensions */
  var //oldWidth = parseInt(d3.select(".volRagone").style("width")) - margin.left - margin.right,
  //oldHeight = parseInt(d3.select(".volRagone").style("height")) - margin.top - margin.bottom,
  newWidth = window.innerWidth / 2,
  newHeight = window.innerHeight / 2;

  console.log(newWidth);


  /* Update the range of the scale with new width/height */
  var x = d3.scale.log()
    .range([0, newWidth]);

  var y = d3.scale.log()
    .range([newHeight, 0]);

  x.domain(d3.extent(data, function(d) { return d.volPowerDen; })).nice();
  y.domain(d3.extent(data, function(d) { return d.volEnergyDen; })).nice();


  /*PBW edit: select var "svg" and modify its height and width.*/
  d3.select("svg")
    .attr("width", newWidth + margin.left + margin.right)
    .attr("height", newHeight + margin.top + margin.bottom);

  /* Update the axis with the new scale */
  svg.select(".x.axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis
      .tickFormat(function (d) {
        return x.tickFormat(4,d3.format(",g"))(d)
      }));

  svg.select(".y.axis")
    .call(yAxis
      .tickFormat(function (d) {
        return y.tickFormat(4,d3.format(",g"))(d)
      }));
}


