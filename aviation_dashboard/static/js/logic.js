// build jsonified metadata route
// generate on specified filters
function buildMetadataRoute() {
	base_url = '/metadata/'
	ids = ['year','broadPhase','atype','severity']

	arr = [];
	ids.forEach(id => {
		arr.push(document.getElementById(id).value.toLowerCase())
	})

	url = base_url + arr.join('/')
	// console.log(url)
	return url;
}

// build jsonified coords route
// generate on specified filters
function buildCoordsRoute() {
	base_url = '/coords/'
	ids = ['year','broadPhase','atype','severity']

	arr = [];
	ids.forEach(id => {
		arr.push(document.getElementById(id).value.toLowerCase())
	})

	url = base_url + arr.join('/')
	// console.log(url)
	return url;
}

// switch case to return month string
// val is taken from slider value
function monthStr(val) {
    switch (val) {
	    case 0: str = '01';
	        break;
	    case 1: str = '02';
	        break;
	    case 2: str = '03';
	        break;
	    case 3: str = '04';
	        break;
	    case 4: str = '05';
	        break;
	    case 5: str = '06';
	        break;
	    case 6: str = '07';
	        break;
	    case 7: str = '08';
	        break;
	    case 8: str = '09';
	        break;
	    case 9: str = '10';
	        break;
	    case 10: str = '11';
	        break;
	    case 11: str = '12';
    }
    return str;
}

// update slider description with month
function updateMonth(val) {
	var months = ['January','February','March','April','May','June','July',
				'August','September','October','November','December'];

	a = document.getElementById('month').textContent.split(',')
	document.getElementById('month').textContent = months[val] + a[0].slice(-5) + ', ' + a[1];
}

// increment slider value
function increment() {
	document.getElementById("slider").stepUp(1);
	updateMonth(parseInt(document.getElementById("slider").value,10))
}

// decrement slider value
function decrement() {
	document.getElementById("slider").stepDown(1);
	updateMonth(parseInt(document.getElementById("slider").value,10))
}

// disable slider buttons at extent of range
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

// hide first blue alert on click
// update slider description with year
function filtYear(val) {
	d3.select('#hide-alert1').style("display","none");
	a = document.getElementById('month').textContent.split(',')
	document.getElementById('month').textContent = a[0].slice(0,-4) + val + "," + a[1];
}

// hide first blue alert on click
// update slider description with broad phase
function filtPhase(val) {
	d3.select('#hide-alert1').style("display","none");
	a = document.getElementById('month').textContent.split(',')
	document.getElementById('month').textContent = a[0] + ", " + val
}

// hide first blue alert on click
// update slider description with aircraft type
function filtAtype(val) {
	d3.select('#hide-alert1').style("display","none");
	a = document.getElementById('indicator').textContent.split("Accidents Per Month");

	if (val != "All") {
		document.getElementById('indicator').textContent = val + " Accidents Per Month" + a[1]
	} else {
		document.getElementById('indicator').textContent = "Aviation Accidents Per Month" + a[1]
	}
}

// hide first blue alert on click
// update slider description with severity
function filtSeverity(val) {
	d3.select('#hide-alert1').style("display","none");
	a = document.getElementById('indicator').textContent.split("Accidents Per Month");

	if (val != "All") {
		document.getElementById('indicator').textContent = a[0] + "Accidents Per Month (" + val + ")"
	} else {
		document.getElementById('indicator').textContent = a[0] + "Accidents Per Month"
	}
}