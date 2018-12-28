function buildFreqChart(chart) {

    d3.json(buildCoordsRoute(), (err,response) => {

        var months = ['January','February','March','April','May','June','July',
                        'August','September','October','November','December'];

        data = ['Frequency'];
        months.forEach((month,idx) => {
            str = monthStr(idx)
            count = response.filter(coord => { return coord.month === str }).length
            data.push(count)
        })
            
        chart.load({columns: [data]})

        n = parseInt(document.getElementById("slider").value,10)
        chart.regions([{axis: 'x', start: n - 0.5, end: n + 0.5, class: 'regionX'}]);

    });
}

function buildMetadata() {

    var metadata = d3.select('#sample-metadata');
    metadata.text('')

    d3.json(buildMetadataRoute(), (err,response) => {

        function distinct(value, index, self) { 
            return self.indexOf(value) === index && value != null;
        }

        arr1 = [];
        arr2 = [];

        desc = ['Number of Regulation Aircrafts', 'Number of Amateur-Built Aircrafts']
        labels = ['No','Yes'];
        counts = labels.map((item,idx) => response['amateur'].filter(x => { return x === labels[idx]}).length);

        arr1.push(desc)
        arr2.push(counts)

        desc = ['Number of Aircrafts with Minor Damage', 'Number of Aircrafts with Substantial Damage', 'Number of Aircrafts Destroyed']
        labels = ['Minor','Substantial','Destroyed'];
        counts = labels.map((item,idx) => response['damage'].filter(x => { return x === labels[idx]}).length);

        arr1.push(desc)
        arr2.push(counts)

        desc = ['Number of Accidents in Visible Weather Conditions', 'Number of Accidents in Instrument Weather Conditions']
        labels = ['VMC','IMC'];
        counts = labels.map((item,idx) => response['weather'].filter(x => { return x === labels[idx]}).length);

        arr1.push(desc)
        arr2.push(counts)

        desc = ['Number of Fatal Accidents', 'Number of Non-Fatal Accidents']
        labels = ['Fatal','Non-Fatal'];
        counts = labels.map((item,idx) => response['fatal'].filter(x => { return x.startsWith(labels[idx])}).length);

        arr1.push(desc)
        arr2.push(counts)

        arr1 = arr1.flat()
        arr2 = arr2.flat()

        arr2.forEach((count,i) => {
            var instance = metadata.append('p');
            instance.text(arr1[i] + ': ' + count)
        })
    })
}