//Global variables:
var data;
var screenWidth = window.innerWidth;

//Retrieve JSON dataset, call functions to make plots.
d3.json("assets/ESSdataValpha2.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;

  makeVolRagone(data, screenWidth);
  makeLegend(data, screenWidth);
  makeVolRagoneTwo(data, screenWidth);
  //Other plot functions could go here.
});

function makeVolRagone(data, screenWidth) {
  
  // d3.select("#plotsContainer")
  // 	.append("div")
  // 	.attr("class", "volRagone");

  if (screenWidth>=1200) {
  	var margin = {top: 100, right: 30, bottom: 45, left: 60},
      width = 490 - margin.left - margin.right,
      // height = 490 - margin.top - margin.bottom;
      height = width;
  } else if (screenWidth<1200 && screenWidth>=992) {
  	var margin = {top: 100, right: 30, bottom: 45, left: 60},
      width = 403 - margin.left - margin.right,
      // height = 406 - margin.top - margin.bottom;
      height = width;
  } else if (screenWidth<992 && screenWidth>=768) {
  	var margin = {top: 100, right: 30, bottom: 45, left: 60},
      width = 490 - margin.left - margin.right,
      height = 490 - margin.top - margin.bottom;
  } else if (screenWidth<768) {
  	var margin = {top: 100, right: 30, bottom: 45, left: 60},
      width = screenWidth - 64 - margin.left - margin.right,
      height = 255 - margin.top - margin.bottom;
  }

  // var margin = {top: 110, right: 80, bottom: 68, left: 120},
  //     width = 900 - margin.left - margin.right,
  //     height = 510 - margin.top - margin.bottom;

  var x = d3.scale.log()
      .range([0, width]);

  // console.log(x);

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

  // Set div padding to zero:
  d3.select("div.volRagone")
    .style("padding-left", 0)
    .style("padding-right", 0);

  // http://bl.ocks.org/Caged/6476579 //
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "E = " + d.volEnergyDen + " Wh/cm3<br> </br>P = " +d.volPowerDen + 
      " W/cm3<br> </br>" + d.citationShort + "<br> </br>" + d.deviceType;
    });
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

x.domain(d3.extent(data, function(d) { return d.volPowerDen; })).nice();
y.domain(d3.extent(data, function(d) { return d.volEnergyDen; })).nice();

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis
      .tickFormat(function (d) {
        return x.tickFormat(6,d3.format(",g"))(d)
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
    .attr("class", function(d, i) { return "pt" + i; })
    .attr("r", 5)
    .attr("cx", function(d) { return x(d.volPowerDen); })
    .attr("cy", function(d) { return y(d.volEnergyDen); })
    .style("fill", function(d) { return color(d.deviceType); })
    // .on("mouseover",  function(d, i) { return svg.selectAll("circle.pt" + i).attr("r", 10);} )
    // .on("mouseout", function(d, i) { return svg.selectAll("circle.pt" + i).attr("r", 5);} )
    // http://bl.ocks.org/Caged/6476579 //
    // .on('mouseover', tip.show)
    // .on('mouseout', tip.hide)
    //
    .on({
      mouseenter: function(d, i) {
        return d3.selectAll("circle.pt" + i).attr("r", 10);
      }, mouseover: tip.show
      , mouseleave: function(d, i) {
        return d3.selectAll("circle.pt" + i).attr("r", 5);
      }, mouseout: tip.hide
    })
    .on('click', function(d,i) { var text = d3.select("div.volRagone").append("div").append("text")
      .data(data)
      .style("fill", "black")
      .attr("x", 0)
      .attr("y", 0)
      .text(function() { return d.citationLong; })
      })
  // .append("svg:title")
  //   .text(function(d, i) { return d.deviceType; });

// var legend = svg.selectAll(".legend")
//     .data(color.domain())
//   .enter().append("g")
//     .attr("class", "legend")
//     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// legend.append("rect")
//     .attr("x", width + margin.right - 36)
//     .attr("width", 18)
//     .attr("height", 18)
//     .style("fill", color);

// legend.append("text")
//     .attr("x", width + margin.right - 42)
//     .attr("y", 9)
//     .attr("dy", ".35em")
//     .style("text-anchor", "end")
//     .text(function(d) { return d; });

svg.append("text")
    .attr("x", 0)
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "start")
    .style("font-size", "2em")
    .style("font-family", "Georgia")
    .text("Volumetric Ragone Chart");

};

function makeLegend(data, screenWidth) {
  var color = d3.scale.category10();

  var width = 160;

  var height = 458;

  d3.select(".legend")
    .style("padding-left", 0)
    .style("padding-right", 0);

  var legend = d3.select(".legend").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "white")
    .style("outline", "thin solid #A7D7F9")
    .data(color.domain())
  .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
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

function makeVolRagoneTwo(data, screenWidth) {
  
  // d3.select("#plotsContainer")
  //  .append("div")
  //  .attr("class", "volRagoneTwo");

  if (screenWidth>=1200) {
    var margin = {top: 100, right: 30, bottom: 45, left: 60},
      width = 490 - margin.left - margin.right,
      // height = 490 - margin.top - margin.bottom;
      height = width;
  } else if (screenWidth<1200 && screenWidth>=992) {
    var margin = {top: 100, right: 30, bottom: 45, left: 60},
      width = 403 - margin.left - margin.right,
      // height = 406 - margin.top - margin.bottom;
      height = width;
  } else if (screenWidth<992 && screenWidth>=768) {
    var margin = {top: 100, right: 30, bottom: 45, left: 60},
      width = 490 - margin.left - margin.right,
      height = 490 - margin.top - margin.bottom;
  } else if (screenWidth<768) {
    var margin = {top: 100, right: 30, bottom: 45, left: 60},
      width = screenWidth - 64 - margin.left - margin.right,
      height = 255 - margin.top - margin.bottom;
  }

  // var margin = {top: 110, right: 80, bottom: 68, left: 120},
  //     width = 900 - margin.left - margin.right,
  //     height = 510 - margin.top - margin.bottom;

  var x = d3.scale.log()
      .range([0, width]);

  // console.log(x);

  var y = d3.scale.log()
      .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var tooltip = d3.select(".volRagoneTwo").append("div") 
      .attr("class", "tooltip")       
      .style("opacity", 0);

  // Set div padding to zero:
  d3.select("div.volRagoneTwo")
    .style("padding-left", 0)
    .style("padding-right", 0);

  // http://bl.ocks.org/Caged/6476579 //
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "E = " + d.volEnergyDen + " Wh/cm3<br> </br>P = " +d.volPowerDen + 
      " W/cm3<br> </br>" + d.citationShort + "<br> </br>" + d.deviceType;
    });
    //

  var svg = d3.select("div.volRagoneTwo").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background", "white")
      .style("outline", "thin solid #A7D7F9")
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // http://bl.ocks.org/Caged/6476579 //
  svg.call(tip);
  //

x.domain(d3.extent(data, function(d) { return d.volPowerDen; })).nice();
y.domain(d3.extent(data, function(d) { return d.volEnergyDen; })).nice();

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis
      .tickFormat(function (d) {
        return x.tickFormat(6,d3.format(",g"))(d)
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
    .attr("class", function(d, i) { return "pt" + i; })
    .attr("r", 5)
    .attr("cx", function(d) { return x(d.volPowerDen); })
    .attr("cy", function(d) { return y(d.volEnergyDen); })
    .style("fill", function(d) { return color(d.deviceType); })
    // .on("mouseover",  function(d, i) { return svg.selectAll("circle.pt" + i).attr("r", 10);} )
    // .on("mouseout", function(d, i) { return svg.selectAll("circle.pt" + i).attr("r", 5);} )
    // http://bl.ocks.org/Caged/6476579 //
    // .on('mouseover', tip.show)
    // .on('mouseout', tip.hide)
    //
    .on({
      mouseenter: function(d, i) {
        return svg.selectAll("circle.pt" + i).attr("r", 10);
      }, mouseover: tip.show
      , mouseleave: function(d, i) {
        return svg.selectAll("circle.pt" + i).attr("r", 5);
      }, mouseout: tip.hide
    })
    .on('click', function(d,i) { var text = d3.select("div.volRagoneTwo").append("div").append("text")
      .data(data)
      .style("fill", "black")
      .attr("x", 0)
      .attr("y", 0)
      .text(function() { return d.citationLong; })
      })
  // .append("svg:title")
  //   .text(function(d, i) { return d.deviceType; });

// var legend = svg.selectAll(".legend")
//     .data(color.domain())
//   .enter().append("g")
//     .attr("class", "legend")
//     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// legend.append("rect")
//     .attr("x", width + margin.right - 36)
//     .attr("width", 18)
//     .attr("height", 18)
//     .style("fill", color);

// legend.append("text")
//     .attr("x", width + margin.right - 42)
//     .attr("y", 9)
//     .attr("dy", ".35em")
//     .style("text-anchor", "end")
//     .text(function(d) { return d; });

svg.append("text")
    .attr("x", 0)
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "start")
    .style("font-size", "2em")
    .style("font-family", "Georgia")
    .text("Volumetric Ragone Chart");
    
};


d3.select(window).on("resize", resize);

function resize() {
  console.log(window.innerWidth);

  screenWidth=window.innerWidth;

  d3.select("svg").remove();

  makeVolRagone(data, screenWidth);
};