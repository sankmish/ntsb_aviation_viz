d3.json('/coords', (err,response) => {
    var yearSubstring = response[0].date.substring(6);

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
        
    var chart = c3.generate({
        bindto: '#fig2',
        type: 'line',
        size: {
            height: 400,
        },
        data: {
            columns:  [monthsArray],

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
});