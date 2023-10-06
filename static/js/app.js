// Use the D3 library to read in samples.json from given URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


function init() {
    let dropDownMenu = d3.select("#selDataset");
    // Fetch the JSON data 
    d3.json(url).then(function(data) {
        let samples = data.names;
        samples.forEach(sample =>{
            dropDownMenu.append("option").text(sample).property("value", sample);
        });

        // get first value from list
        let firstSample = samples[0];

        // Initiate Plots
        buildBarChart(firstSample, data);
        buildBubbleChart(firstSample), data;
        buildMetadata(firstSample, data);

    });
};

// Function to build the bar chart
function buildBarChart(sample, data) {
    let selectedSample = data.samples.find(entry => entry.id === sample);
    let otuIds = selectedSample.otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
    let otuLabels = selectedSample.otu_labels.slice(0, 10).reverse();
    let sampleValues = selectedSample.sample_values.slice(0, 10).reverse();
  
    let trace = {
      x: sampleValues,
      y: otuIds,
      text: otuLabels,
      type: "bar",
      orientation: "h",
    };

    let layout = {
        title: "Top Ten Operational Taxonomic Units",
        margin: {t:30, l:150}
    };

    Plotly.newPlot("bar",[trace], layout);

};

// Function to build bubble chart
function buildBubbleChart(sample, data) {
    let selectedSample = data.samples.find(entry => entry.id === sample);
    let otuIds = selectedSample.otu_ids;
    let otuLabels = selectedSample.otu_labels;
    let sampleValues = selectedSample.sample_values;
  
    let trace = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds
      }
    };
  
    let layout = {
      title: "OTU per Sample",
      margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      hovermode: "closest"
    };
  
    Plotly.newPlot("bubble", [trace], layout);
  };

// Function to build metadata
function buildMetadata(sample, data) {
    let selectedSample = data.metadata.find(entry => entry.id === sample);
    let PANEL = d3.select("#sample-metadata");
    PANEL.html("");
  
    Object.entries(selectedSample).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  };

init();
  


  