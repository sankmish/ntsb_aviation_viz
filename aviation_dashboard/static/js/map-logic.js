mapboxgl.accessToken = API_KEY;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/basic-v9',
    center: [0, 40],
    zoom: 1
});

var months = ['January','February','March','April','May','June','July',
                'August','September','October','November','December'];

var month_str = ['01','02','03','04','05','06','07','08','09','10','11','12'];


map.on('load', function () {

    var route = {
        "type": "FeatureCollection",
        "features": []
    };

    var point = {
        "type": "FeatureCollection",
        "features": []
    }

    map.addSource('route', {
        "type": "geojson",
        "data": route
    });

    map.addSource('point', {
        "type": "geojson",
        "data": point
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
    });

    d3.json('/coords', (err,coordinates) => {
        
        if (err) throw err;

        function sliiiide(e) {
            
            d3.select('#hide-alert2').style("display","none");

            var route = {
                "type": "FeatureCollection",
                "features": []
            };

            var point = {
                "type": "FeatureCollection",
                "features": []
            }

            map.getSource('point').setData(point);
            map.getSource('route').setData(route);

            var month = parseInt(document.getElementById('slider').value, 10);

            document.getElementById('month').textContent = months[month] + ' ' + document.getElementById('year').value + ", " + document.getElementById('broadPhase').value;
            
            routes = [];
            points = [];

            coordinates.forEach(coord => {
                if (coord.date.startsWith(month_str[month])) {
                    routes.push([[coord.lon1,coord.lat1],[coord.lon2,coord.lat2]])
                    points.push([coord.lon1,coord.lat1])
                }
            })

            // console.log(routes)
            // console.log(points)

            for (i=0;i<points.length;i++) {

                route.features.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": routes[i]
                    },
                    "properties": {
                        "id": i
                    }
                })

                point.features.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": points[i]
                    },
                    "properties": {
                        "id": i
                    }
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

            // console.log(point)
            // console.log(route)

            map.getSource('point').setData(point);
            map.getSource('route').setData(route);

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

            function replay() {

                for (var i=1; i<points.length; i++) {
                    animate(i,0);
                }
            }

            document.getElementById('replay').addEventListener('click', replay);
            
            for (var i=1; i<points.length; i++) {
                animate(i,0);
            }
            
        }

        document.getElementById('b1').addEventListener('click', sliiiide);
        document.getElementById('b2').addEventListener('click', sliiiide);
        document.getElementById('slider').addEventListener('change', sliiiide);

    })

})
