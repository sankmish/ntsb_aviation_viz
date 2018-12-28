function buildAviationMap(map,popup) {

    d3.json(buildCoordsRoute(), (err,coordinates) => {
        
        if (err) throw err;

        console.log('full year: ', coordinates.length)

        str = monthStr(parseInt(document.getElementById("slider").value,10))
        coordinates = coordinates.filter(coord => coord.month == str);

        console.log('on month: ', coordinates.length)

        routes = coordinates.map(coord => [[coord.lon1,coord.lat1],[coord.lon2,coord.lat2]]);
        points = coordinates.map(coord => [coord.lon1,coord.lat1]);
        details = coordinates.map(coord => coord.url);

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
            })

            point.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": points[i]
                },
                "properties": {
                    'description': `<a href=${details[i]} target="_blank">Click to view NTSB report</a>`
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

        map.on('click', 'point', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });

        map.on('mouseenter', 'point', function(e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });

        map.on('mouseleave', 'point', function() {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

        for (var i=1; i<points.length; i++) {
            animate(i,0);
        }

    });
}