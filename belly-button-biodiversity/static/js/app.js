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
	defaultDataset = data.samples.filter(sample => sample.id === "940")[0];
	console.log(defaultDataset);

	// Select all sample_values, otu_ids and otu_labels of the selected test ID
	allSampleValuesDefault = defaultDataset.sample_values;
	allOtuIdsDefault = defaultDataset.otu_ids;
	allOtuLabelsDefault = defaultDataset.otu_labels;

	// Select the top 10 OTUs for the ID with their sample_values, otu_ids and otu_labels
	sampleValuesDefault = allSampleValuesDefault.slice(0, 10).reverse();
	otuIdsDefault = allOtuIdsDefault.slice(0, 10).reverse();
	otuLabelsDefault = allOtuLabelsDefault.slice(0, 10).reverse();

	console.log(sampleValuesDefault);
	console.log(otuIdsDefault);
	console.log(otuLabelsDefault);

	// BAR CHART
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
			title: `Top 10 OTUs found in selected Test Subject ID No`,
		}

		// Render the plot to the div tag with id "bar"
		Plotly.newPlot("bar", barData, barlayout);

	// BUBBLE CHART
		var trace2 = {
			x: allOtuIdsDefault,
			y: allSampleValuesDefault,
			text: allOtuLabelsDefault,
			mode: 'markers',
			marker: {
				color: allOtuIdsDefault,
				size: allSampleValuesDefault
			}
		};
		
		var bubbleData = [trace2];
		
		var bubbleLayout = {
			title: 'Bubble Chart displaying sample values of OTU IDs of the selected individual',
			showlegend: false,
		};
		
		Plotly.newPlot('bubble', bubbleData, bubbleLayout);

	// // DEMOGRAPHIC INFO
	// 	demoDefault = data.metadata.filter(sample => sample.id === 940)[0];
	// 	console.log(demoDefault);

	// 	// Display each key-value pair from the metadata JSON object
		
	// 	Object.entries(demoDefault).forEach(([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`));

}

init();

// Call updateBar() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlot);

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// This function is called when a dropdown menu item is selected
function updatePlot() {

	// Use D3 to select the dropdown menu
		var inputElement = d3.select("#selDataset");

	// Assign the value of the dropdown menu option to a variable
		var inputValue = inputElement.property("value");

	// Filter the dataset based on inputValue ID
		dataset = data.samples.filter(sample => sample.id === inputValue)[0];
		console.log(dataset);

	// Select all sample_values, otu_ids and otu_labels of the selected test ID
		allSampleValues = dataset.sample_values;
		allOtuIds = dataset.otu_ids;
		allOtuLabels = dataset.otu_labels;

	// Select the top 10 OTUs for the ID with their sample_values, otu_ids and otu_labels
		top10Values = allSampleValues.slice(0, 10).reverse();
		top10Ids = allOtuIds.slice(0, 10).reverse();
		top10Labels = allOtuLabels.slice(0, 10).reverse();

	// BAR CHART
		Plotly.restyle("bar", "x", [top10Values]);
		Plotly.restyle("bar", "y", [top10Ids.map(outId => `OTU ${outId}`)]);
		Plotly.restyle("bar", "text", [top10Labels]);

	// BUBBLE CHART
		Plotly.restyle('bubble', "x", [allOtuIds]);
		Plotly.restyle('bubble', "y", [allSampleValues]);
		Plotly.restyle('bubble', "text", [allOtuLabels]);
		Plotly.restyle('bubble', "marker.color", [allOtuIds]);
		Plotly.restyle('bubble', "marker.size", [allSampleValues]);
	}

	// DEMOGRAPHIC INFO
		metainfo = data.metadata.filter(sample => sample.id == inputValue)[0];

	// Clear out current contents in the panel
		d3.select("#sample-metadata").html("");

	// Display each key-value pair from the metadata JSON object
		Object.entries(metainfo).forEach(([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)); 
})