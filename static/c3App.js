var chart = c3.generate({
    bindto: `#c3Chart`,
    size: {
        height: 600,
        width: 800
    },
    data: {
        columns: [
            ['AmateurPilots', 30, 200, 100, 400, 150, 250],
            ['Professional/MilitaryPilots', 130, 100, 140, 200, 150, 50]
        ],
    axis: {
        x: {
            text: 'X Label',  
            type: 'category',
            categories: ['category1', 'category2', 'category3', 'category4', 'category5', 'category6'],  
            position: 'outer-center'
        },
        y: {
            text: 'Y Label',
            position: 'outer-middle'
        }
    },

        type: 'bar'
    }
});

setTimeout(function () {
    chart.transform('spline', 'AmateurPilots');
}, 5000);

setTimeout(function () {
    chart.transform('spline', 'Professional/MilitaryPilots');
}, 7000);

setTimeout(function () {
    chart.transform('bar');
}, 10000);

setTimeout(function () {
    chart.transform('spline');
}, 15000);

setTimeout(function () {
    chart.transform('bar');
}, 20000);

setTimeout(function () {
    chart.transform('spline');
}, 25000);

setTimeout(function () {
    chart.transform('bar');
}, 30000);

setTimeout(function () {
    chart.transform('spline');
}, 35000);

setTimeout(function () {
    chart.transform('bar');
}, 40000);

setTimeout(function () {
    chart.transform('spline');
}, 45000);

setTimeout(function () {
    chart.transform('bar');
}, 50000);

setTimeout(function () {
    chart.transform('spline');
}, 55000);

setTimeout(function () {
    chart.transform('bar');
}, 60000);