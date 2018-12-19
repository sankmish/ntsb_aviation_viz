var submit = d3.select("#filterDataset");

submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  var inputsArray = ["selYear", "selBPF", "selACC", "selIS"];

  // Use `d3.json` to fetch the metadata for a sample
  var url =`/accident_filter/${user_filter}`;

  var user_filter = {}

  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.

  for (var j = 0; j < inputsArray.length; j++) {
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#" + inputsArray[j]);

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    user_filter[inputsArray[j]] = inputValue;
  }

  d3.json(url).then(user_filter);

  console.log(user_filter);

});