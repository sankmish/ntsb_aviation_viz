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

function buildAviationMap(map) {

    d3.json(buildCoordsRoute(), (err,coordinates) => {
        
        if (err) throw err;

        console.log('full year: ', coordinates.length)

        str = monthStr(parseInt(document.getElementById("slider").value,10))
        coordinates = coordinates.filter(coord => coord.month == str);

        console.log('on month: ', coordinates.length)

        routes = coordinates.map(coord => [[coord.lon1,coord.lat1],[coord.lon2,coord.lat2]]);
        points = coordinates.map(coord => [coord.lon1,coord.lat1]);

        // can replace for
        // points = routes.map(pair => pair[0]);

        var route = {
            "type": "FeatureCollection",
            "features": []
        };

        var point = {
            "type": "FeatureCollection",
            "features": []
        }

        for (i=0;i<points.length;i++) {

            route.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": routes[i]
                },
                "properties": {}
            })

            point.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": points[i]
                },
                "properties": {}
            })

            var lineDistance = turf.lineDistance(route.features[i], 'kilometers');

            var arc = [];
            var steps = 50;

            for (var j = 0; j < lineDistance; j += lineDistance / steps) {
                var segment = turf.along(route.features[i], j, 'kilometers');
                arc.push(segment.geometry.coordinates);
            }

            route.features[i].geometry.coordinates = arc;

        }

        map.getSource('point').setData(point)
        map.getSource('route').setData(route)

        function animate(i, counter) {

            if (counter >= route.features[i].geometry.coordinates.length-1){
                map.setPaintProperty('point', 'icon-opacity', .3)
                return;
            }

            point.features[i].geometry.coordinates = route.features[i].geometry.coordinates[counter];

            point.features[i].properties.bearing = turf.bearing(
                turf.point(route.features[i].geometry.coordinates[counter >= steps ? counter - 1 : counter]),
                turf.point(route.features[i].geometry.coordinates[counter >= steps ? counter : counter + 1])
            );  

            map.getSource('point').setData(point);

            if (counter < steps) {
                requestAnimationFrame(function(){animate(i, counter+1);});
                map.setPaintProperty('point', 'icon-opacity', 1)
            }

        }

        for (var i=1; i<points.length; i++) {
            animate(i,0);
        }

    });
}