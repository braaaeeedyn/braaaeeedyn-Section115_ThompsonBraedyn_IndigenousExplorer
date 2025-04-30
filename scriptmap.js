const map = L.map('map-container', {
    center: [50, 0],
    zoom: 3,
    minZoom: 2,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    noWrap: true
}).addTo(map);

const indigenousLocations = [
    {
        name: "Sentinelese",
        coords: [11.5504, 92.2335],
        description: "The Sentinelese people inhabit North Sentinel Island in the Andaman Islands and are one of the most isolated groups in the world."
    },
    {
        name: "Yanomami",
        coords: [1.433, -65.325],
        description: "The Yanomami are an Indigenous group living in the Amazon rainforest near the border of Venezuela and Brazil."
    },
    {
        name: "Sami",
        coords: [68.000, 23.500],
        description: "The Sami are Indigenous to the Arctic area of Sápmi, which today encompasses parts of Norway, Sweden, Finland, and Russia."
    },
    {
        name: "Hadza",
        coords: [-3.570, 35.000],
        description: "The Hadza people of Tanzania are among the last remaining hunter-gatherers in Africa."
    },
    {
        name: "Tibetan Highlanders",
        coords: [33, 88],
        description: "Tibetan Highlanders are native to the Tibetan Plateau and have adapted to some of the world's highest altitudes."
    }
];

indigenousLocations.forEach(location => {
    const marker = L.marker(location.coords).addTo(map);
    const popupContent = `<b>${location.name}</b><br>${location.description}`;
    marker.bindPopup(popupContent);
    marker.on('click', function () {
        map.setView(location.coords, 8); // Zoom in when marker is clicked
        marker.openPopup();
    });
});

// Legend drag and toggle logic
const legend = document.getElementById('legend');
let isDragging = false;
let offsetX, offsetY;
const toggleButton = document.getElementById('legend-toggle');
const legendContent = document.getElementById('legend-content');

legend.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - legend.getBoundingClientRect().left;
    offsetY = e.clientY - legend.getBoundingClientRect().top;
    legend.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const left = e.clientX - offsetX;
    const top = e.clientY - offsetY;

    legend.style.left = `${left}px`;
    legend.style.top = `${top}px`;
    legend.style.right = 'auto';
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    legend.style.cursor = 'grab';
});

toggleButton.addEventListener('click', () => {
    legend.classList.toggle('minimized');
    toggleButton.textContent = legend.classList.contains('minimized') ? '+' : '−';
});
