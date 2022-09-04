// Add console.log to check to see if our code is working
console.log("working");

// Create tile layer that will be background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create dark view tile layer that will be an option for our map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create base layer that holds both maps
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// Create earthquake layer for map
let earthquakes = new L.layerGroup();

// Define object containing overlays, visible all the time
let overlays = {
    Earthquakes: earthquakes
};

// Create map opject with center, zoom level, default layer
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
})

// Pass map layer into our layers control and add layers control to map
L.control.layers(baseMaps, overlays).addTo(map);

// Access toronto airline routes GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/Ryoichi2022/Mapping_Earthquakes/main/torontoRoutes.json";

// Grab GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    console.log(data);
    // Create GeoJSON layer with retrieved data
    L.geoJSON(data, {

    // Turn each feature into circleMarker on map
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
    },

    // Set style for circleMarker using styleInfo function
    style: styleInfo,
    // Create popup for circleMarker to display magnitude and location
    onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
    }).addTo(earthquakes);

    // Then add earthquake layer to map
    earthquakes.addTo(map);
});

// Function returns the style data for each earthquake plot on map.
// Pass magnitude into function to calculate radius
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

// Function determines radius of earthquake marker based on magnitude
// Earthquakes with magnitude 0 will be plotted with radius 1
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude *4;
}

// Function determines circle color based on magnitude
function getColor(magnitude) {
    if (magnitude > 5) {
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea822c";
    }
    if (magnitude > 3) {
        return "#ee9c00";
    }
    if (magnitude > 2) {
        return "#eecc00";
    }
    if (magnitude > 1) {
        return "#d4ee00";
    }
    return "#98ee00";
}

/* 
, {
    color: "#ffffa1",
    weight: 2,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>Airline: " + feature.properties.airline + "</h3><hr><h3>Destination: "
        + feature.properties.dst + "</h3>");
    }
} */


// Add 'graymap' tile layer to map
// streets.addTo(map);
