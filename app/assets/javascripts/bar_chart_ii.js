var data = [4, 8, 15, 16, 23, 42];

var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

var chart = d3.select("svg.chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = chart.selectAll("svg:g")
    .data(data)
  .enter().append("svg:g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("svg:rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("svg:text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });

    // debugger;