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