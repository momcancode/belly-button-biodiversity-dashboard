// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("../../samples.json").then((importedData) => {

console.log(importedData);

var data = importedData;

// Dynamically add test Subject ID No. to the dropdown menus
var names = data.names;

names.forEach((name) => {
	d3.select("#selDataset").append("option").text(name);
})

// Initializes the page with a default plot
function init() {
	
	// Choose data for test ID No. 940 plotted as default
	defaultDataset = data.samples.filter(sample => sample.id === "940");
	console.log(defaultDataset);

	// Sort the data array using the greekSearchResults value
	data.sort(function(a, b) {
		return parseFloat(b.greekSearchResults) - parseFloat(a.greekSearchResults);
	});

	// Slice the first 10 objects for plotting
	data = data.slice(0, 10);

	// Reverse the array due to Plotly's defaults
	data = data.reverse();

	// Trace1 for the Greek Data
	var trace1 = {
		x: data.map(row => row.greekSearchResults),
		y: data.map(row => row.greekName),
		text: data.map(row => row.greekName),
		name: "Greek",
		type: "bar",
		orientation: "h"
	};

	// data
	var chartData = [trace1];

	// Apply the group bar mode to the layout
	var layout = {
		title: "Greek gods search results",
		margin: {
			l: 100,
			r: 100,
			t: 100,
			b: 100
		}
	};

	// Render the plot to the div tag with id "plot"
	Plotly.newPlot("plot", chartData, layout);
	Plotly.newPlot("plot", [defaultDataset]);
}

init();

// // Call updateBar() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updateBar);

// // This function is called when a dropdown menu item is selected
// function updateBar() {

// 	// Use D3 to select the dropdown menu
// 	var dropdownMenu = d3.select("#selDataset");

// 	// Assign the value of the dropdown menu option to a variable
// 	var dataset = dropdownMenu.property("value");

// 	// Initialize x and y arrays
// 	var x = [];
// 	var y = [];

// 	switch(dataset) {
// 		case "dataset1":
// 			x = dataset1.x;
// 			y = dataset1.y;
// 			break;
// 		case "dataset2":
// 			x = dataset2.x;
// 			y = dataset2.y;
// 			break;
// 		case "dataset3":
// 			x = dataset3.x;
// 			y = dataset3.y;
// 			break;
// 		default:
// 			x = defaultDataset.x;
// 			y = defaultDataset.y;
// 			break;
// 	}

// 	Plotly.restyle("plot", "x", [x]);
// 	Plotly.restyle("plot", "x", [y]);
// }
})