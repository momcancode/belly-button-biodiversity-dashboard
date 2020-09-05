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
	sampleValuesDefault = defaultDataset[0].sample_values.slice(0, 10).reverse();
	otuIdsDefault = defaultDataset[0].otu_ids.slice(0, 10).reverse();
	otuLabelsDefault = defaultDataset[0].otu_labels.slice(0, 10).reverse();

	console.log(sampleValuesDefault);
	console.log(otuIdsDefault);
	console.log(otuLabelsDefault);

	// Add trace for the default Data
	var trace1 = {
		x: sampleValuesDefault,
		y: otuIdsDefault.map(outId => `OTU ${outId}`),
		text: otuLabelsDefault,
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

// Call updateBar() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updateBar);

// This function is called when a dropdown menu item is selected
function updateBar() {

	// Use D3 to select the dropdown menu
	var inputElement = d3.select("#selDataset");

	// Assign the value of the dropdown menu option to a variable
	var inputValue = inputElement.property("value");

	// Filter the dataset based on inputValue ID
	dataset = data.samples.filter(sample => sample.id === inputValue);
	console.log(dataset);

	// Select the top 10 OTUs for the ID with their sample_values, otu_ids and otu_labels
	// Add them into different arrays
	sampleValueDropdown = dataset[0].sample_values.slice(0, 10).reverse();
	x = sampleValueDropdown;

	otuIdDropdown = dataset[0].otu_ids.slice(0, 10).reverse();
	y = otuIdDropdown.map(outId => `OTU ${outId}`);

	otuLabelsText = dataset[0].otu_labels.slice(0, 10).reverse();
	text = otuLabelsText;

	Plotly.restyle("bar", "x", [x]);
	Plotly.restyle("bar", "y", [y]);
	Plotly.restyle("bar", "text", [text]);
}
})