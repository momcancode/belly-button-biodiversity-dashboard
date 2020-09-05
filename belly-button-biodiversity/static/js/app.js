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

	// Select the top 10 OTUs for the ID with their sample_values, otu_ids and otu_labels
	sampleValuesToPlot = defaultDataset[0].sample_values.slice(0, 10).reverse();
	otuIdsToPlot = defaultDataset[0].otu_ids.slice(0, 10).reverse();
	otuLabelsToPlot = defaultDataset[0].otu_labels.slice(0, 10).reverse();

	console.log(sampleValuesToPlot);
	console.log(otuIdsToPlot);
	console.log(otuLabelsToPlot);

	// // Slice the first 10 objects for plotting
	// defaultDataset = defaultDataset.slice(0, 10);

	// // Reverse the array due to Plotly's defaults
	// defaultDataset = defaultDataset.reverse();

	// Trace1 for the default Data
	var trace1 = {
		x: sampleValuesToPlot,
		y: otuIdsToPlot.map(outId => `OTU ${outId}`),
		text: otuLabelsToPlot,
		name: "id940",
		type: "bar",
		orientation: "h"
	};

	// data
	var barData = [trace1];

	// Apply the group bar mode to the layout
	var barlayout = {
		title: "Top 10 OTUs found in that individual",
	}

	// Render the plot to the div tag with id "bar"
	Plotly.newPlot("bar", barData, barlayout);
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