// Map configuration and state
const mapConfig = {
  center: { lat: 40.7128, lng: -74.0060 }, // NYC center
  zoom: 12,
  styles: [
    {
      "stylers": [
        { "saturation": -100 },
        { "lightness": -20 }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        { "color": "#1a1a1a" }
      ]
    }
  ]
};

// Haunted locations data
const hauntedLocations = {
  "The Dakota": {
    position: { lat: 40.7767, lng: -73.9762 },
    story: "The famous apartment building where John Lennon lived and died. Many residents and visitors have reported seeing his ghost, and some claim to hear piano music late at night.",
    type: "Residential",
    year: "Modern"
  },
  "Merchant's House Museum": {
    position: { lat: 40.7277, lng: -73.9919 },
    story: "Built in 1832, this house is considered one of NYC's most haunted locations. The ghost of Gertrude Tredwell, the last family member to live there, is said to still roam the halls.",
    type: "Museum",
    year: "Modern"
  },
  "One if by Land, Two if by Sea": {
    position: { lat: 40.7337, lng: -74.0007 },
    story: "This restaurant was once Aaron Burr's carriage house. Staff and diners have reported seeing a ghostly woman in white and experiencing unexplained cold spots.",
    type: "Restaurant",
    year: "Modern"
  },
  "The Algonquin Hotel": {
    position: { lat: 40.7614, lng: -73.9807 },
    story: "The ghost of a man in a top hat is often seen in the lobby, and some guests have reported their room keys mysteriously moving on their own.",
    type: "Hotel",
    year: "Modern"
  },
  "The White Horse Tavern": {
    position: { lat: 40.7357, lng: -74.0077 },
    story: "Dylan Thomas's favorite bar, where he had his last drink. His ghost is said to still visit, and some claim to see him at his favorite table.",
    type: "Bar",
    year: "Modern"
  },
  "The New Amsterdam Theatre": {
    position: { lat: 40.7564, lng: -73.9861 },
    story: "The ghost of Olive Thomas, a Ziegfeld Follies performer, is said to haunt the theater. She's often seen in her dressing room or on the catwalk.",
    type: "Theater",
    year: "Modern"
  },
  "The House of Death": {
    position: { lat: 40.7337, lng: -73.9997 },
    story: "Mark Twain once lived here, and his ghost is said to still reside in the building. Other spirits have also been reported, including a woman in a white dress.",
    type: "Residential",
    year: "Modern"
  },
  "The Ear Inn": {
    position: { lat: 40.7197, lng: -74.0077 },
    story: "Built in 1817, this bar is haunted by a former resident named Mickey. Staff and customers have reported seeing his ghost and hearing unexplained noises.",
    type: "Bar",
    year: "Modern"
  },
  "Harlem's Oldest House": {
    position: { lat: 40.8097, lng: -73.9477 },
    story: "Built in 1790 by Johann Hermann Raub, this is reputed to be the oldest house in Harlem. It has been the site of numerous ghostly encounters and unexplained phenomena.",
    type: "Residential",
    year: "1924"
  },
  "West 14th Street Boarding House": {
    position: { lat: 40.7377, lng: -74.0007 },
    story: "In 1881, two spectral lodgers were reported at No. 131 West Fourteenth Street, causing disturbances in the boarding house.",
    type: "Residential",
    year: "1881"
  },
  "Flatbush Ghost House": {
    position: { lat: 40.6217, lng: -73.9577 },
    story: "In 1896, a ghost returned to Mr. Norton's house in Flatbush, reportedly searching for its hand that had been dug up.",
    type: "Residential",
    year: "1896"
  },
  "Long Island City Haunting": {
    position: { lat: 40.7617, lng: -73.9477 },
    story: "In 1874, a ghost was reported in Long Island City, causing disturbances in the neighborhood.",
    type: "Residential",
    year: "1874"
  }
};

// Global variables
let map;
let markers = [];
let isNightMode = false;
let showHistoricalOnly = false;

// Initialize the map
function initMap() {
  try {
    map = new google.maps.Map(document.getElementById('map'), mapConfig);
    addHauntedLocations();
  } catch (error) {
    console.error('Error initializing map:', error);
    alert('Failed to load the map. Please try refreshing the page.');
  }
}

// Add all haunted locations to the map
function addHauntedLocations() {
  clearMarkers();
  Object.entries(hauntedLocations).forEach(([name, data]) => {
    if (!showHistoricalOnly || data.year !== "Modern") {
      addHauntedMarker(data.position.lat, data.position.lng, name, data.type, data.year);
    }
  });
}

// Clear all markers from the map
function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

// Add a single haunted location marker
function addHauntedMarker(lat, lng, name, type, year) {
  const marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
    title: name,
    icon: {
      url: getIconForType(type),
      scaledSize: new google.maps.Size(32, 32)
    }
  });

  marker.addListener("click", () => {
    showHauntedInfo(name);
  });

  markers.push(marker);
}

// Get icon based on location type
function getIconForType(type) {
  const icons = {
    'Residential': 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    'Museum': 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    'Restaurant': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    'Hotel': 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    'Bar': 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
    'Theater': 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
  };
  return icons[type] || 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
}

// Show haunted location information
function showHauntedInfo(name) {
  const infoDiv = document.getElementById("hauntedInfo");
  const description = document.getElementById("hauntedDescription");
  const location = hauntedLocations[name];
  
  if (location) {
    const info = `
      <strong>Type:</strong> ${location.type}<br>
      <strong>Year:</strong> ${location.year}<br>
      <strong>Story:</strong> ${location.story}
    `;
    description.innerHTML = info;
    infoDiv.style.display = "block";
  }
}

// Close the information modal
function closeHauntedInfo() {
  document.getElementById("hauntedInfo").style.display = "none";
}

// Toggle night mode
function toggleNightMode() {
  isNightMode = !isNightMode;
  document.body.style.backgroundColor = isNightMode ? "#000" : "#1a1a1a";
  
  // Update map style based on mode
  const newStyles = isNightMode ? 
    [...mapConfig.styles, { "elementType": "labels", "stylers": [{ "visibility": "off" }] }] :
    mapConfig.styles;
  
  map.setOptions({ styles: newStyles });
}

// Toggle between modern and historical locations
function toggleHauntedStories() {
  showHistoricalOnly = !showHistoricalOnly;
  addHauntedLocations();
}
