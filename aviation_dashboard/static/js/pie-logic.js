// build pie charts for specified keys on call
function buildPieCharts(chart) {

	d3.json(buildMetadataRoute(), (err,response) => {

		// return only distinct values
		function distinct(value, index, self) { 
				return self.indexOf(value) === index;
		}

		keys = ['phase','amateur','purpose','damage','weather']

		data = [];
		keys.forEach(key => {
			trace = {
				labels: {},
				values: {},
				hoverinfo: "label+percent",
				type: "pie",
				marker: {
					colors: ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"]
				},
				// colorscale: 'YIOrRd',        // can anyone get this working :'(
				textfont: { size: 10 }
			};

			// response for current key
			arr = response[key];

			// filter response for distinct labels
			// store count for each returned label
			labels = arr.filter(distinct);
			values = labels.map((item,idx) => arr.filter(x => { return x === labels[idx]}).length);

			trace.labels = labels
			trace.values = values

			data.push([trace])

		})

		// all use same layout
		var layout = {
			showlegend: false,
			autosize: true,
			height: 150,
			paper_bgcolor: 'rgba(0,0,0,0)',
			plot_bgcolor: 'rgba(0,0,0,0)',
			margin: { l: 0, r: 0, b: 10, t: 10 }
		}

		// plot and bind to corresponding div ids
		Plotly.newPlot("fig3", data[0], layout, {displayModeBar: false});
		Plotly.newPlot("fig4", data[1], layout, {displayModeBar: false});
		Plotly.newPlot("fig5", data[2], layout, {displayModeBar: false});
		Plotly.newPlot("fig6", data[3], layout, {displayModeBar: false});
		Plotly.newPlot("fig7", data[4], layout, {displayModeBar: false});
			
	});

}