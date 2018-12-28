// creates canvas of triangles on resize
// use for jumbotron background
function triangles() {

	var jumbotronBg = document.getElementById('triangles');
	var dimensions = jumbotronBg.getClientRects()[0];

	var pattern = Trianglify({
		cell_size: 60,
		width: dimensions.width, 
		height: dimensions.height
	});

	url = pattern.canvas().toDataURL();
	jumbotronBg.style.background='url('+url+')'
}

// initialize dashboard with filter options
// set default descriptions and indicators
function init() {

	years = [];	for (i=2000;i<2019;i++) { years.push(String(i)) }
	phases = ['all','approach','maneuvering','descent','cruise','climb','landing','go-around'];
	types = ['all','airplane','helicopter']
	severity = ['all','fatal','non-fatal']

	arr = [years,phases,types,severity]
	ids = ['year','broadPhase','atype','severity']

	for (i=0;i<arr.length;i++) {
		d3.select('#' + ids[i])
			.selectAll('option')
			.data(arr[i])
			.enter()
			.append('option')
			.text(d => d.charAt(0).toUpperCase() + d.substring(1));
	}

	// generate jumbotron bg
	triangles();

	// default slider description
	document.getElementById('b1').disabled = true;
	document.getElementById('year').value = '2005'
	document.getElementById('month').textContent = 'January ' + document.getElementById('year').value + ", " + document.getElementById('broadPhase').value;

}

// initiatize map with empty feature layers
// add sources, modify paint properties
// return map as callable variable
function initMap() {

	mapboxgl.accessToken = API_KEY;
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/light-v9',
		center: [-95, 40],
		zoom: 3
	});

	point = {
		"type": "FeatureCollection",
		"features": []
	}

	route = {
		"type": "FeatureCollection",
		"features": []
	}

	map.on("load", function() {

		map.addSource('point', {
			 "type": "geojson",
			 "data": point
		});

		map.addSource('route', {
			 "type": "geojson",
			 "data": route
		});

		map.addLayer({
			"id": "point",
			"source": "point",
			"type": "symbol",
			"layout": {
				 "icon-image": "airport-15",
				 "icon-rotate": ["get", "bearing"],
				 "icon-rotation-alignment": "map",
				 "icon-allow-overlap": true,
				 "icon-ignore-placement": true
			},
			"paint" : {
				"icon-opacity": 1,
			}
		})

	})

	return map;

}

// intialize popup for HTML reports
// return popup as callable variable
function initPopup() {
	var popup = new mapboxgl.Popup({
		closeButton: false,
		closeOnClick: false
	});

	return popup;
}

// initialize empty c3 chart with month categories
// set interval for chart transform up to 50 times
// return chart as callable variable
function initChart() {

	var months = ['January','February','March','April','May','June','July',
					'August','September','October','November','December'];

	var chart = c3.generate({
		bindto: '#fig2',
		type: 'line',
		size: { height: 400 },
		data: { columns:  [],
				selection: { enabled: true }
		},
		title: { text: 'Accidents per Month' },
		axis: {
			x: {
				type: 'category',
				categories: months,
				label: {
					text: 'Month',
					position: 'outer-center'
				 }
			},
			y: {
				label: {
					text: 'Number Of Aviation Accidents',
					position: 'outer-middle'
				}
			}
		}
	});

	chart.legend.hide();
	
	types = ['bar','spline','step','line'];

	counter = 0
	endHere = 0
	timer = window.setInterval(function(){
		chart.transform(types[counter])
		console.log(types[counter])
		counter++
		endHere++
		if (counter == 4) { counter = 0 }
		if (endHere == 50) { clearInterval(timer) }
	},5000)

	return chart;

}

//////////////////////////
// Initialize dashboard //
//////////////////////////

init();

// callable variables
map = initMap();
popup = initPopup();
chart = initChart();