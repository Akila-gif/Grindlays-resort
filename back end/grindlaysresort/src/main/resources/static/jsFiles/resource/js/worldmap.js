let heatLayer;

async function fetchCoordinates(location) {
    const query = location;
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            return [parseFloat(lat), parseFloat(lon)];
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);


// Function to populate map with markers
async function populateHeatmap(data, locationName,locationCount) {
    const heatMapData = [];
    for (let item of data) {
        const location = locationName(item);
        const coordinates = await fetchCoordinates(location);
        if (coordinates) {
            heatMapData.push([...coordinates, locationCount(item) + 600]);
        }
        if (heatLayer) {
            map.removeLayer(heatLayer);
        }
        heatLayer = L.heatLayer(heatMapData, {
            radius: 25,
            gradient: {
                0.1: "blue",
                0.2: "cyan",
                0.4: "lime",
                0.6: "yellow",
                0.8: "orange",
                1: "red",
            },
        }).addTo(map);
    }
}

// Function to populate map with markers
async function populateMap(data, locationName) {
    map.eachLayer((layer) => {
        if (!!layer.toGeoJSON) {
            map.removeLayer(layer);
        }
    });
    for (let item of data) {
        const location = await locationName(item);
        const coordinates = await fetchCoordinates(location);

        if (coordinates) {
            L.marker(coordinates)
                .addTo(map)
                .bindPopup(`<b>${location}</b><br>${item.guest || item.count} guests`);
        }
    }
}
