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
if (i["bpf"] == "APPROACH"){
    approachCount = approachCount + 1;
} //climb
else if (i["bpf"] == "CLIMB"){
    climbCount = climbCount + 1;
} //cruise
else if (i["bpf"] == "CRUISE"){
    cruiseCount = cruiseCount + 1;
} //descent 
else if (i["bpf"] == "DESCENT"){
    descentCount = descentCount + 1;
} //go-around
else if (i["bpf"] == "GO-AROUND"){
    goAroundCount = goAroundCount + 1;
} //landing
else if (i["bpf"] == "LANDING"){
    landingCount = landingCount + 1;
} //maneuvering
else if (i["bpf"] == "MANEUVERING"){
    maneuveringCount = maneuveringCount + 1;
} //error
else {
    console.log("D3 Pie Chart Error in Broad Phase of Flight : " + i["bpf"]);
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

    Plotly.newPlot("c3Chart", [trace], layout2);
  

}