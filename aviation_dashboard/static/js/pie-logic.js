function buildPieCharts() {

  d3.json(buildRoute(), (err,response) => {

    function distinct(value, index, self) { 
        return self.indexOf(value) === index;
    }

    keys = ['amateur','purpose','weather','damage']

    data = [];
    keys.forEach(key => {
      trace = {
        labels: {},
        values: {},
        hoverinfo: "label+percent",
        type: "pie",
        // colorscale: 'YIOrRd',        // can anyone get this working :'(
        textfont: { size: 10 }
      };

      arr = response[key];
      labels = arr.filter(distinct);
      values = labels.map((item,idx) => arr.filter(x => { return x === labels[idx]}).length);

      trace.labels = labels
      trace.values = values

      data.push([trace])
    })

    var layout = {
      showlegend: false,
      autosize: true,
      height:100,
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: { l: 0, r: 0, b: 0, t: 0 }
    }

    Plotly.newPlot("fig3", data[0], layout, {displayModeBar: false});
    Plotly.newPlot("fig4", data[1], layout, {displayModeBar: false});
    Plotly.newPlot("fig5", data[2], layout, {displayModeBar: false});
    Plotly.newPlot("fig6", data[3], layout, {displayModeBar: false});
      
  });

}