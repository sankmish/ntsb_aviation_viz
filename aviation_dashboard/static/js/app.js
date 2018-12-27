// 
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

	triangles();

	document.getElementById('b1').disabled = true;
	document.getElementById('year').value = '2005'
	document.getElementById('month').textContent = 'January ' + document.getElementById('year').value + ", " + document.getElementById('broadPhase').value;

}

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

function initPopup() {
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    return popup;
}

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
    
    types = ['spline','bar','line'];

    counter = 0
    endHere = 0
    timer = window.setInterval(function(){
        chart.transform(types[counter])
        counter++
        endHere++
        if (counter == 3) { counter = 0 }
        if (endHere == 10) { clearInterval(timer) }
    },3000)

	return chart;

}

function updateMonth(val) {
	var months = ['January','February','March','April','May','June','July',
				'August','September','October','November','December'];

	a = document.getElementById('month').textContent.split(',')
	document.getElementById('month').textContent = months[val] + a[0].slice(-5) + ', ' + a[1];
}


function increment() {
	document.getElementById("slider").stepUp(1);
	updateMonth(parseInt(document.getElementById("slider").value,10))
}


function decrement() {
	document.getElementById("slider").stepDown(1);
	updateMonth(parseInt(document.getElementById("slider").value,10))
}


function disableButton() {
    d3.select('#hide-alert2').style("display","none");

	if (document.getElementById('slider').value == 0) {
		document.getElementById('b1').disabled = true;
		document.getElementById('b2').disabled = false;
	} else if (document.getElementById('slider').value == 11) {
		document.getElementById('b2').disabled = true;
		document.getElementById('b1').disabled = false;
	} else {
		document.getElementById('b1').disabled = false;
		document.getElementById('b2').disabled = false;
	}
}

// sets all filters to default values
function filtRefresh() {
	document.getElementById('year').value = '2000';
	document.getElementById('broadPhase').value = 'All';
	document.getElementById('atype').value = 'All';
	document.getElementById('severity').value = 'All';

	filtYear(document.getElementById('year').value)
	filtPhase(document.getElementById('broadPhase').value)
	filtAtype(document.getElementById('atype').value)
	filtSeverity(document.getElementById('severity').value)

	document.getElementById('slider').value = 0;
	updateMonth(parseInt(document.getElementById("slider").value,10))
	disableButton();
}


// hides first alert on click
// updates slider description
function filtYear(val) {
	d3.select('#hide-alert1').style("display","none");
	a = document.getElementById('month').textContent.split(',')
	document.getElementById('month').textContent = a[0].slice(0,-4) + val + "," + a[1];
}


// hides first alert on click

function filtPhase(val) {
	d3.select('#hide-alert1').style("display","none");
	a = document.getElementById('month').textContent.split(',')
	document.getElementById('month').textContent = a[0] + ", " + val
}


// hides first alert on click

function filtAtype(val) {
	d3.select('#hide-alert1').style("display","none");
	a = document.getElementById('indicator').textContent.split("Accidents Per Month");

	if (val != "All") {
		document.getElementById('indicator').textContent = val + " Accidents Per Month" + a[1]
	} else {
		document.getElementById('indicator').textContent = "Aviation Accidents Per Month" + a[1]
	}
}


// hides first alert on click

function filtSeverity(val) {
	d3.select('#hide-alert1').style("display","none");
	a = document.getElementById('indicator').textContent.split("Accidents Per Month");

	if (val != "All") {
		document.getElementById('indicator').textContent = a[0] + "Accidents Per Month (" + val + ")"
	} else {
		document.getElementById('indicator').textContent = a[0] + "Accidents Per Month"
	}
}


function buildMetadataRoute() {
	base_url = '/metadata/'
	ids = ['year','broadPhase','atype','severity']

	arr = [];
	ids.forEach(id => {
		arr.push(document.getElementById(id).value.toLowerCase())
	})

	url = base_url + arr.join('/')
	return url;
}


function buildCoordsRoute() {
	base_url = '/coords/'
	ids = ['year','broadPhase','atype','severity']

	arr = [];
	ids.forEach(id => {
		arr.push(document.getElementById(id).value.toLowerCase())
	})

	url = base_url + arr.join('/')
	return url;
}


function monthStr(val) {
    switch (val) {
    case 0:
        str = '01';
        break;
    case 1:
        str = '02';
        break;
    case 2:
        str = '03';
        break;
    case 3:
        str = '04';
        break;
    case 4:
        str = '05';
        break;
    case 5:
        str = '06';
        break;
    case 6:
        str = '07';
        break;
    case 7:
        str = '08';
        break;
    case 8:
        str = '09';
        break;
    case 9:
        str = '10';
        break;
    case 10:
        str = '11';
        break;
    case 11:
        str = '12'
    }
    return str;
}

init();
map = initMap();
popup = initPopup();
chart = initChart();