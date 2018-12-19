var submit = d3.select("#filterDataset");

submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  //list of divs to loop through
  var inputsArray = ["selYear", "selBPF", "selACC", "selIS"];

  //initial url that will be appended to
  var url =`/user_filter`;

  for (var j = 0; j < inputsArray.length; j++) {
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#" + inputsArray[j]);

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    url += "/" + inputValue;
  }

  //d3.json(url);

  console.log(url);

});