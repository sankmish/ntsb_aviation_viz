function buildMetadata(response) {

  //# of Accidents, Count of Both Weather Conditions, Most Common Crash Location, # of Fatal/Non-Fatal Incidents
  
      //Total Number of Accidents in the Year
      var numAccidents = response.length;

      var numFatal = 0;
      var numNonFatal = 0;
      var numVisible = 0;
      var numNotVisible = 0;
  
      //Check if Fatal or Not-Fatal for entire response and change their counts
      for (var i = 0; i < response.length; i++){
        //fatal
             // console.log("Wrong Data: " + i["inj"]);
            // console.log("Test/Right Data: " + response[i]["inj"]);
        if (response[i]["inj"].substring(0,1) == "F"){
          numFatal = numFatal + 1;
        } //not-fatal 
        else if (response[i]["inj"].substring(0,1) == "N"){
          numNonFatal = numNonFatal + 1;
        } else {
          console.log("MetaData Error in Injury Severity Substring : " + response[i]["inj"].substring(0,1));
        }
      }
  
      //Check if Visible or Not-Visible and change their counts
      for (var j = 0; j < response.length; j++){
        //not visible
        if (response[j]["wec"] == "IMC"){
          numNotVisible = numNotVisible + 1;
        }  //visible
        else if (response[j]["wec"] == "VMC"){
          numVisible = numVisible + 1;
        } else if (response[j]["wec" == "UNK"] ){
            // do nothing
          }
        else if (response[j]["wec" == "NULL"] ){
          // do nothing
        } else if (response[j]["wec" == "null"] ){
            // do nothing
          }
        else {
          console.log("MetaData Error in Weather Conditions : " + response[j]["wec"]);
        }
      }
  
      var outputMetaData = {
        "Total Number of Accidents: " : numAccidents,
        "Number of Fatal Accidents: " : numFatal,
        "Number of Non-Fatal Accidents: " : numNonFatal,
        "Number of Accidents with Visible Weather Conditions: " : numVisible,
        "Number of Accidents with Non-Visible Weather Conditions: " : numNotVisible 
      }
  
         // Use d3 to select the panel with id of `#sample-metadata`
      // Use `.html("") to clear any existing metadata
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
  
      var metaData = d3.select("#sample-metadata");
      metaData.html("");
      Object.entries(outputMetaData).forEach(function([key, value]){
        var instance = metaData.append("p");
          instance.text(key + value);
  
      });
  } //end buildMetadata
   
function buildC3Chart(response) {

    var yearSubstring = response[0].date.substring(6);
    console.log("Year Substring :" + yearSubstring);

    //get the full response and then build the list of monthly accidents in this function
    console.log("C3 Chart check user_filter response: " + response);

    //retrieve a list of count of the months from the data
    var monthsArray = [];

    var janCount = 0;
    var febCount = 0;
    var marCount = 0;
    var aprCount = 0;
    var mayCount = 0;
    var junCount = 0;
    var julCount = 0;
    var augCount = 0;
    var sepCount = 0;
    var octCount = 0;
    var novCount = 0;
    var decCount = 0;

    for (var i=0; i < response.length; i++){

        var monthSubstring = response[i].date.substring(0,2);

        console.log(monthSubstring);

        if (monthSubstring == "01"){
            janCount = janCount + 1;
        } else if (monthSubstring == "02" ) {
            febCount = febCount + 1;
        } else if (monthSubstring == "03" ) {
            marCount = marCount + 1;
        } else if (monthSubstring == "04" ) {
            aprCount = aprCount + 1;
        } else if (monthSubstring == "05" ) {
            mayCount = mayCount + 1;
        } else if (monthSubstring == "06" ) {
            junCount = junCount + 1;
        } else if (monthSubstring == "07" ) {
            julCount = julCount + 1;
        } else if (monthSubstring == "08" ) {
            augCount = augCount + 1;
        }else if (monthSubstring == "09" ) {
            sepCount = sepCount + 1;
        }else if (monthSubstring == "10" ) {
            octCount = octCount + 1;
        }else if (monthSubstring == "11" ) {
            novCount = novCount + 1;
        }else if (monthSubstring == "12" ) {
            decCount = decCount + 1;
        } else {
            console.log("month substring error : " + monthSubstring);
        }
    }

        monthsArray.push("Months");
        monthsArray.push(janCount);
        monthsArray.push(febCount);
        monthsArray.push(marCount);
        monthsArray.push(aprCount);
        monthsArray.push(mayCount);
        monthsArray.push(junCount);
        monthsArray.push(julCount);
        monthsArray.push(augCount);
        monthsArray.push(sepCount);
        monthsArray.push(octCount);
        monthsArray.push(novCount);
        monthsArray.push(decCount);
    
    console.log("Months Array Count: " + monthsArray);

    var chart = c3.generate({
        bindto: `#c3Chart`,
        type: 'line',
        size: {
                    height: 800,
                    width: 1000
                },
                data: {
                    columns:  [ monthsArray ]
                }, 
                axis: {
                    x: {
                        type: 'category',
                        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber']
                    },
                    y: {
                        label: {
                            text: 'Number Of Aviation Accidents',
                            position: 'outer-middle'
                        }
                    }
                }
    });


    setTimeout(function () {
        chart.transform('spline');
    }, 5000);
    
    setTimeout(function () {
        chart.transform('bar');
    }, 10000);
    
    setTimeout(function () {
        chart.transform('line');
    }, 15000);
    
    setTimeout(function () {
        chart.transform('spline');
    }, 20000);
    
    setTimeout(function () {
        chart.transform('bar');
    }, 25000);
    
    setTimeout(function () {
        chart.transform('line');
    }, 30000);
    
    setTimeout(function () {
        chart.transform('spline');
    }, 35000);
    
    setTimeout(function () {
        chart.transform('bar');
    }, 40000);
    
    setTimeout(function () {
        chart.transform('line');
    }, 45000);
    
    setTimeout(function () {
        chart.transform('spline');
    }, 50000);
    
    setTimeout(function () {
        chart.transform('bar');
    }, 55000);
    
    setTimeout(function () {
        chart.transform('line');
    }, 60000);
    
    
}  //end buildC3Chart
    
function buildD3Chart(response){

    var approachCount = 0;
    var climbCount = 0;
    var cruiseCount = 0;
    var descentCount = 0;
    var goAroundCount = 0;
    var landingCount = 0;
    var maneuveringCount = 0;
    
    for (var i=0; i< response.length;i++){
    //approach
    if (response[i]["bpf"] == "APPROACH"){
        approachCount = approachCount + 1;
    } //climb
    else if (response[i]["bpf"] == "CLIMB"){
        climbCount = climbCount + 1;
    } //cruise
    else if (response[i]["bpf"] == "CRUISE"){
        cruiseCount = cruiseCount + 1;
    } //descent 
    else if (response[i]["bpf"] == "DESCENT"){
        descentCount = descentCount + 1;
    } //go-around
    else if (response[i]["bpf"] == "GO-AROUND"){
        goAroundCount = goAroundCount + 1;
    } //landing
    else if (response[i]["bpf"] == "LANDING"){
        landingCount = landingCount + 1;
    } //maneuvering
    else if (response[i]["bpf"] == "MANEUVERING"){
        maneuveringCount = maneuveringCount + 1;
    } //error
    else {
        console.log("D3 Pie Chart Error in Broad Phase of Flight : " + response[i]["bpf"]);
    }
    
    } // end for
    
    BPFArray = [];
    BPFArray.push(approachCount);
    BPFArray.push(climbCount);
    BPFArray.push(cruiseCount);
    BPFArray.push(descentCount);
    BPFArray.push(goAroundCount);
    BPFArray.push(landingCount);
    BPFArray.push(maneuveringCount);

    console.log("Broad Phase Of Flight Array Values: " + BPFArray);

    BPFLabelsArray = ["Approach", "Climb", "Cruise", "Descent", "Go-Around", "Landing", "Maneuvering"];
    
    var pieChartColors = ['rgb(0, 57, 230)', 'rgb(255, 102, 0)', 'rgb(0, 179, 60)', 'rgb(153, 0, 0)', 'rgb(102, 102, 255)', 'rgb(116, 37, 77)',
                        'rgb(204, 102, 255)']
    
    var trace = {
    values: BPFArray,
    labels: BPFLabelsArray,
    hoverinfo: BPFLabelsArray,
    type: 'pie',
    marker: {
        colors: pieChartColors
    }
    };

    var layout2 = {
    title: '% of Accidents by Broad Phase Of Flight'
    }

    Plotly.newPlot("d3Chart", [trace], layout2);
    
} //end buildD3Chart

function init() {

    const initURL = "/user_filter/2008/All/All/All";

    // Use the first sample from the list to build the initial plots
    d3.json(initURL).then(function(response){
        console.log(response);
        buildMetadata(response);
        buildC3Chart(response);
        buildD3Chart(response);
    });
}
  
function optionChanged() {
    
    // User clicks button to filter. Take filter query and go to user_filter. Grab json, build metadata, 
    //  plot c3 chart, plot d3 chart, plot aviation map.

    // Prevent the page from refreshing
    d3.event.preventDefault();

    //list of divs to loop through
    var inputsArray = ["selYear", "selBPF", "selACC", "selIS"];

    //initial url that will be appended to
    var url =`/user_filter`;

    for (var j = 0; j < inputsArray.length; j++) {
        // Select the input element and get the raw HTML node
        var inputElement = d3.select("#" + inputsArray[j]);
        console.log(inputElement);

        // Get the value property of the input element
        var inputValue = inputElement.property("value");

        if (inputValue == ""){
        inputValue = 2008;
        }

        url += "/" + inputValue;
    }
  
    // go to user_filtered url, grab filteredJSON, return and fill metaData, C3Chart, D3Chart, and aviationMap
    d3.json(url).then(function(response){
    buildMetadata(response);
    buildC3Chart(response);
    buildD3Chart(response);
    });
}

// Set event listener to refresh page
var button = d3.select("#filterDataset");
button.on("click", optionChanged);

// Initialize the dashboard
init();