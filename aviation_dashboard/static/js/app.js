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


function handleSlider(month) {
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	document.getElementById('month').textContent = months[month] + ' ' + document.getElementById('year').value + ", " + document.getElementById('broadPhase').value;

	document.getElementById('b1').disabled = true;
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
	handleSlider(document.getElementById('slider').value)

}



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
	handleSlider(document.getElementById('slider').value)
}


function filtYear(val) {
	a = document.getElementById('month').textContent.split(',')
	document.getElementById('month').textContent = a[0].slice(0,-4) + val + "," + a[1];
	d3.select('#hide-alert1').style("display","none");
}



function filtPhase(val) {
	a = document.getElementById('month').textContent.split(',')
	document.getElementById('month').textContent = a[0] + ", " + val
	d3.select('#hide-alert1').style("display","none");
}



function filtAtype(val) {
	a = document.getElementById('indicator').textContent.split("Accidents Per Month");
	d3.select('#hide-alert1').style("display","none");

	if (val != "All") {
		document.getElementById('indicator').textContent = val + " Accidents Per Month" + a[1]
	} else {
		document.getElementById('indicator').textContent = "Aviation Accidents Per Month" + a[1]
	}
}



function filtSeverity(val) {
	a = document.getElementById('indicator').textContent.split("Accidents Per Month");
	d3.select('#hide-alert1').style("display","none");

	if (val != "All") {
		document.getElementById('indicator').textContent = a[0] + "Accidents Per Month (" + val + ")"
	} else {
		document.getElementById('indicator').textContent = a[0] + "Accidents Per Month"
	}
}



function increment() {
	document.getElementById("slider").stepUp(1);
}



function decrement() {
	document.getElementById("slider").stepDown(1);
}



function disableButton() {
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



function buildRoute() {
	base_url = '/metadata/'
	ids = ['year','broadPhase','atype','severity']

	arr = [];
	ids.forEach(id => {
		arr.push(document.getElementById(id).value.toLowerCase())
	})

	url = base_url + arr.join('/')
	console.log(url)

	return url;
}



init();