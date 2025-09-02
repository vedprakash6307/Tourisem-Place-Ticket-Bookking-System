const sampleListings = [
   
  {
    title: "Luxury Beach House",
    description: "Beautiful view of the sea with modern amenities.",
    image: "https://thebeachhousegoa.com/wp-content/uploads/2020/01/overview4-768x614.jpg",
    price: 4500,
    location: "Goa",
    country: "India"
  },
  {
    title: "Hilltop Cabin",
    description: "Quiet and cozy place in the hills.",
    image: "https://www.bing.com/th/id/OIP.WHokBlQaHrZrP5z3bdf_eAHaE_?w=240&h=211&c=8&rs=1&qlt=90&o=6&cb=thwsc4&dpr=1.6&pid=3.1&rm=2",
    price: 2800,
    location: "Banff",
    country: "Canada"
  },
  {
    title: "City Center Apartment",
    description: "Right in the heart of the city with all conveniences.",
    image: "https://www.bing.com/th/id/OIP.hDNL-e1-oqGhBLO4PpGTmQHaE1?w=240&h=211&c=8&rs=1&qlt=90&o=6&cb=thwsc4&dpr=1.6&pid=3.1&rm=2",
    price: 3200,
    location: "New York",
    country: "USA"
  },
  {
    title: "Desert Retreat",
    description: "Stay in a peaceful desert location with unique vibes.",
    image: "https://www.bing.com/th/id/OIP.gUfob45TL8kUAQtf9mRLmgHaE7?w=244&h=211&c=8&rs=1&qlt=90&o=6&cb=thwsc4&dpr=1.6&pid=3.1&rm=2",
    price: 1500,
    location: "Marrakech",
    country: "Morocco"
  },
  {
    title: "Jungle Treehouse",
    description: "Live with nature in this jungle getaway.",
    image:"https://tse2.mm.bing.net/th/id/OIP.AntGFtV981I4vDsvxPZtpgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    price:2500,
    location: "Kathmandu",
    country: "Nepal"
  },
  {
    title: "Lakefront Villa",
    description: "Peaceful stay beside a beautiful lake.",
    image: "https://tse2.mm.bing.net/th/id/OIP.ae1I2mJUe5gas50a-8ro7QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 3000,
    location: "Lucerne",
    country: "Switzerland"
  },
  {
    title: "Studio Apartment",
    description: "Compact and modern space for solo travelers.",
    image: "https://tse1.mm.bing.net/th/id/OIP.SAj4pQoRlVcsplZocDJYPQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 1500,
    location: "Tokyo",
    country: "Japan"
  },
  {
    title: "Desert Camp",
    description: "Experience desert life with style.",
    image: "https://tse1.mm.bing.net/th/id/OIP.nPVUcUCT_bZ6JMl6-XkDPQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 1200,
    location: "Dubai",
    country: "UAE"
  },
  {
    title: "Royal Palace Room",
    description: "Live like a king in a heritage haveli.",
    image: "https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/20190116170017/Mysore-Palace-Int.jpeg",
    price: 5000,
    location: "Jaipur",
    country: "India"
  },
  {
    title: "Countryside Farmhouse",
    description: "Reconnect with nature in peaceful surroundings.",
    image: "https://i.pinimg.com/736x/b2/3b/c7/b23bc72e166c16011b7e7e2acdb89df7.jpg",
    price: 2000,
    location: "Tuscany",
    country: "Italy"
  },
  {
    title: "Luxury Business Hotel",
    description: "Perfect for corporate stays and meetings.",
    image: "https://th.bing.com/th/id/R.f41df4833aab94b36f5af695ef5b6371?rik=B5NlISPgEmrSww&riu=http%3a%2f%2fwww.asiaone.com%2fsites%2fdefault%2ffiles%2foriginal_images%2fApr2016%2f1_1.jpg&ehk=7btwas7UYsDrxjrP%2fIDtXYzArFVhhl3tbaE8UhDCr5Q%3d&risl=&pid=ImgRaw&r=0",
    price: 4200,
    location: "Singapore",
    country: "Singapore"
  },
  {
    title: "Island Cottage",
    description: "Remote island stay with boat access.",
    image:" https://c8.alamy.com/comp/F3WTRT/house-on-island-in-indonesia-F3WTRT.jpg",
    price: 3500,
    location: "Bali",
    country: "Indonesia"
  },
  {
    title: "Tea Estate Bungalow",
    description: "Stay amidst tea gardens.",
    image: "https://www.theluxevoyager.com/wp-content/uploads/2020/04/Ceylon-Tea-Trails-Dunkeld-Bungalow.jpg",
    price: 2700,
    location: "Kandy",
    country: "Sri Lanka"
  },
  {
    title: "Backwater Houseboat",
    description: "Traditional boat stay with full amenities.",
    image: "https://c8.alamy.com/comp/F51DT8/houseboat-on-kerala-backwaters-india-F51DT8.jpg",
    price: 3200,
    location: "Kerala",
    country: "India"
  },
  {
    title: "Snow Lodge",
    description: "Enjoy snow and comfort together.",
    image: "https://tse4.mm.bing.net/th/id/OIP.677VK5TUyRRT93Hjodh86wHaDf?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 2300,
    location: "Zermatt",
    country: "Switzerland"
  },
  {
    title: "Eco Jungle Hut",
    description: "Eco-stay in the forest with solar power.",
    image: "https://img.freepik.com/premium-photo/hut-jungle-with-thatched-roof_954226-63083.jpg?w=2000",
    price: 1800,
    location: "Sabah",
    country: "Malaysia"
  },
  {
    title: "Riverfront Home",
    description: "Relaxing river view stay.",
    image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/houses-in-laos-kendrix-thomas.jpg",
    price: 2100,
    location: "Luang Prabang",
    country: "Laos"
  },
  {
    title: "Artistic Heritage Inn",
    description: "For art lovers and heritage seekers.",
    image: "https://tse1.mm.bing.net/th/id/OIP.cGkfqinCvAYRT89xSlyi6gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 2600,
    location: "Prague",
    country: "Czech Republic"
  },
  {
    title: "Budget Traveler's Hostel",
    description: "Affordable and safe stay for backpackers.",
    image: "https://tse2.mm.bing.net/th/id/OIP.gIKheYd5FDzKJ36vQeEeNwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 800,
    location: "Hanoi",
    country: "Vietnam"
  }

  ];
  module.exports= {data:sampleListings};