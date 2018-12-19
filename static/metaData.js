var user_filter = {
  "selYear" : "2000",
  "selBPF" : "All",
  "selACC" : "All",
  "selIS" : "All"
};
console.log(user_filter);


function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.




}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  var selector = d3.select("#selDataset");
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
 
  var Year = d3.select('#selYear').innerHTML;
  var BPF = d3.select('#selBPF').innerHTML;
  var ACC = d3.select('#selACC').innerHTML;
  var IS = d3.select('#selIS').innerHTML;

  // user_filter = {
  //   "selYear" : Year,
  //   "selBPF" : BPF,
  //   "selACC" : ACC,
  //   "selIS" : IS  
  // };
  // console.log(user_filter);

  var url = `/accident_filter/${user_filter}`;
  d3.json(url).then(
    user_filter
    
  );
  console.log(user_filter);
 

}

user_filter = {
  "selYear" : Year,
  "selBPF" : BPF,
  "selACC" : ACC,
  "selIS" : IS  
};
console.log(user_filter);



// Initialize the dashboard
init();

