  // Use `d3.json` to fetch the metadata for a sample
  var url =`/metadata/${sample}`;

  d3.json(url).then(function(sample){
    //console.log(sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    var sampleMetadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleMetadata.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(sample).forEach(function ([key,value]) {
      var row = sampleMetadata.append("p");
      row.text(`${key}: ${value}`);
    });

  });