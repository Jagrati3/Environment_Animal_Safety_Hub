// Sample data for Urban Green Space Finder
const greenSpaces = [
  {
    id: 1,
    name: "Central City Park",
    location: { lat: 40.7128, lng: -74.006 },
    address: "123 Main St, Cityville",
    amenities: ["Playground", "Walking Trails", "Restrooms", "Picnic Area"],
    reviews: [
      { user: "Ayaan", rating: 5, comment: "Beautiful park with lots of space!" },
      { user: "Priya", rating: 4, comment: "Great for jogging and family picnics." }
    ],
    activities: ["Yoga in the Park - Sundays 8am", "Eco Clean-up Drive - 1st Saturday"]
  },
  {
    id: 2,
    name: "Riverside Gardens",
    location: { lat: 40.715, lng: -74.01 },
    address: "456 River Rd, Cityville",
    amenities: ["Botanical Garden", "Cafe", "Bike Paths"],
    reviews: [
      { user: "Samir", rating: 5, comment: "Amazing flowers and peaceful atmosphere." }
    ],
    activities: ["Guided Nature Walks - Saturdays 10am"]
  },
  {
    id: 3,
    name: "Greenway Community Space",
    location: { lat: 40.718, lng: -74.012 },
    address: "789 Greenway Ave, Cityville",
    amenities: ["Dog Park", "Community Garden", "Outdoor Gym"],
    reviews: [
      { user: "Leah", rating: 4, comment: "Love the community garden!" }
    ],
    activities: ["Composting Workshop - 2nd Sunday"]
  }
];

// Export for use in UI
window.greenSpaces = greenSpaces;
