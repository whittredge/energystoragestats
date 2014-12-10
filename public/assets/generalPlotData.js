//Global variables:
var data;
var screenWidth = window.innerWidth;

//Retrieve JSON dataset, call functions to make plots.
d3.json("assets/ESSdataValpha2.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;

  makeVolRagone(data, screenWidth);
  makeVolRagoneTwo(data, screenWidth);
  makeLegend(data, screenWidth);

  //Other plot functions could go here.
});

d3.select(window).on("resize", resize);

function resize() {
  console.log(window.innerWidth);

  screenWidth=window.innerWidth;

  d3.select("svg").remove();

  makeVolRagone(data, screenWidth);
};