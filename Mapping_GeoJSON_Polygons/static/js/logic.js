// Add console.log to check to see if our code is working
console.log("working");

// Create map object with a center and zoom level
// let map = L.map('mapid').setView([30, 30], 2);

// Add GeoJSON data
let sanFranAirport =
{"type": "FeatureCollection", "features":[{
    "type": "Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry": {
            "type":"Point",
            "coordinates":[-122.375, 37.6189994812]}}
]};

// Grab GeoJSON data -- pointToLayer function
// L.geoJSON(sanFranAirport, {
//     // Turn each feature into marker on the map
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.city + "</h2>");
//     }
// }).addTo(map);

// Grab GeoJSON data -- onEachFeature function
// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer){
//         console.log(layer);
//         layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2>", "<h3>" + "Airport name: " + feature.properties.name + "</h3>");
//     }
// }).addTo(map);

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
    "Satellite Streets": satelliteStreets
};

// Create map opject with center, zoom level, default layer
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
})

// Pass map layer into our layers control and add layers control to map
L.control.layers(baseMaps).addTo(map);

// Access toronto neighborhoods GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/Ryoichi2022/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Grab GeoJSON data
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    // Create GeoJSON layer with retrieved data
    L.geoJSON(data).addTo(map);
});


// {
//     color: "#ffffa1",
//     weight: 2,
//     onEachFeature: function(feature, layer) {
//         layer.bindPopup("<h3>Airline: " + feature.properties.airline + "</h3><hr><h3>Destination: "
//         + feature.properties.dst + "</h3>");
//     }
// }



// Add 'graymap' tile layer to map
// streets.addTo(map);
