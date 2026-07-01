const hotelImages = {
  valleyOfRocks: [
    "Valley of Rocks Hotel/Capture-2569-06-30-185731.png",
    "Valley of Rocks Hotel/Capture-2569-06-30-185811.png",
    "Valley of Rocks Hotel/Capture-2569-06-30-185823.png",
    "Valley of Rocks Hotel/Capture-2569-06-30-185832.png",
    "Valley of Rocks Hotel/Capture-2569-06-30-185840.png",
    "Valley of Rocks Hotel/Capture-2569-06-30-185848.png",
    "Valley of Rocks Hotel/Capture-2569-06-30-185910.png"
  ],
  beresford: [
    "Beresford/WhatsApp Image 2026-06-30 at 7.04.00 PM.jpeg",
    "Beresford/WhatsApp Image 2026-06-30 at 7.04.00 PM (1).jpeg",
    "Beresford/WhatsApp Image 2026-06-30 at 7.04.00 PM (2).jpeg",
    "Beresford/WhatsApp Image 2026-06-30 at 7.04.00 PM (3).jpeg"
  ],
  sun: [
    "Sun/Capture-2569-06-30-194914.png",
    "Sun/Capture-2569-06-30-194926.png",
    "Sun/Capture-2569-06-30-194936.png",
    "Sun/Capture-2569-06-30-194951.png",
    "Sun/Capture-2569-06-30-195003.png",
    "Sun/WhatsApp Image 2026-06-30 at 7.06.45 PM (2).jpeg",
    "Sun/WhatsApp Image 2026-06-30 at 7.06.45 PM (3).jpeg"
  ],
  wembar: [
    "Wembar Hotel/Capture-2569-06-30-190157.png",
    "Wembar Hotel/Capture-2569-06-30-190215.png",
    "Wembar Hotel/Capture-2569-06-30-190230.png",
    "Wembar Hotel/Capture-2569-06-30-190238.png",
    "Wembar Hotel/Capture-2569-06-30-190259.png",
    "Wembar Hotel/Capture-2569-06-30-190315.png"
  ],
  amsterdam: [
    "Amsterdam Hotel/WhatsApp Image 2026-06-30 at 7.04.42 PM.jpeg",
    "Amsterdam Hotel/WhatsApp Image 2026-06-30 at 7.04.42 PM (1).jpeg",
    "Amsterdam Hotel/WhatsApp Image 2026-06-30 at 7.04.42 PM (2).jpeg",
    "Amsterdam Hotel/WhatsApp Image 2026-06-30 at 7.04.42 PM (3).jpeg",
    "Amsterdam Hotel/WhatsApp Image 2026-06-30 at 7.04.42 PM (4).jpeg",
    "Amsterdam Hotel/WhatsApp Image 2026-06-30 at 7.04.43 PM.jpeg"
  ],
  savoy: [
    "Savoy Hotel/Capture-2569-06-30-191638.png",
    "Savoy Hotel/Capture-2569-06-30-191701.png",
    "Savoy Hotel/Capture-2569-06-30-191709.png",
    "Savoy Hotel/Capture-2569-06-30-191718.png",
    "Savoy Hotel/Capture-2569-06-30-191727.png",
    "Savoy Hotel/Capture-2569-06-30-191737.png",
    "Savoy Hotel/Capture-2569-06-30-191757.png",
    "Savoy Hotel/Capture-2569-06-30-191818.png"
  ],
  greenGables: [
    "Green gables/WhatsApp Image 2026-06-30 at 7.02.27 PM (2).jpeg",
    "Green gables/WhatsApp Image 2026-06-30 at 7.02.27 PM (3).jpeg",
    "Green gables/WhatsApp Image 2026-06-30 at 7.02.27 PM (4).jpeg",
    "Green gables/WhatsApp Image 2026-06-30 at 7.02.28 PM.jpeg",
    "Green gables/WhatsApp Image 2026-06-30 at 7.02.29 PM.jpeg"
  ],
  villaRose: [
    "Villa Rose Hotel/Capture-2569-06-30-192842.png",
    "Villa Rose Hotel/Capture-2569-06-30-192904.png",
    "Villa Rose Hotel/Capture-2569-06-30-192913.png",
    "Villa Rose Hotel/Capture-2569-06-30-192923.png",
    "Villa Rose Hotel/Capture-2569-06-30-192931.png",
    "Villa Rose Hotel/Capture-2569-06-30-192942.png",
    "Villa Rose Hotel/Capture-2569-06-30-192950.png",
    "Villa Rose Hotel/Capture-2569-06-30-193001.png",
    "Villa Rose Hotel/Capture-2569-06-30-193014.png",
    "Villa Rose Hotel/Capture-2569-06-30-193042.png"
  ],
  marineParade: [
    "Marine Parade Hotel/Capture-2569-06-30-192249.png",
    "Marine Parade Hotel/Capture-2569-06-30-192302.png",
    "Marine Parade Hotel/Capture-2569-06-30-192320.png",
    "Marine Parade Hotel/Capture-2569-06-30-192330.png",
    "Marine Parade Hotel/Capture-2569-06-30-192351.png",
    "Marine Parade Hotel/Capture-2569-06-30-192416.png",
    "Marine Parade Hotel/Capture-2569-06-30-192433.png",
    "Marine Parade Hotel/Capture-2569-06-30-192442.png",
    "Marine Parade Hotel/Capture-2569-06-30-192453.png"
  ],
  alumhurst: [
    "Alumhurst Hotel/Capture-2569-06-30-191934.png",
    "Alumhurst Hotel/Capture-2569-06-30-192013.png",
    "Alumhurst Hotel/Capture-2569-06-30-192022.png",
    "Alumhurst Hotel/Capture-2569-06-30-192030.png",
    "Alumhurst Hotel/Capture-2569-06-30-192050.png",
    "Alumhurst Hotel/Capture-2569-06-30-192059.png"
  ],
  granby: [
    "Granby/WhatsApp Image 2026-06-30 at 7.10.40 PM.jpeg",
    "Granby/WhatsApp Image 2026-06-30 at 7.10.41 PM.jpeg",
    "Granby/WhatsApp Image 2026-06-30 at 7.10.42 PM.jpeg",
    "Granby/WhatsApp Image 2026-06-30 at 7.10.42 PM (1).jpeg"
  ],
  limes: [
    "Limes /WhatsApp Image 2026-06-30 at 7.03.14 PM.jpeg",
    "Limes /WhatsApp Image 2026-06-30 at 7.03.14 PM (1).jpeg"
  ]
};

function mapSearch(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function cleanBookingUrl(url) {
  if (!url) return url;

  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url;
  }
}

function makeHotel(data) {
  const gallery = data.gallery.length ? data.gallery : ["Logo/Logo.jpeg"];

  return {
    ...data,
    mainImage: data.mainImage || gallery[0],
    gallery,
    locationText: data.locationText || data.location,
    mapUrl: data.mapUrl || mapSearch(`${data.name}, ${data.location}`),
    bookingUrl: cleanBookingUrl(data.bookingUrl)
  };
}

// TODO: Replace descriptions, amenities and location text with verified hotel copy as official content becomes available.
const hotels = [
  makeHotel({
    slug: "valley-of-rocks-hotel",
    name: "Valley of Rocks Hotel",
    location: "Lynton, North Devon",
    category: "Coastal",
    shortDescription: "A characterful North Devon stay close to the dramatic Valley of Rocks, with easy access to coastal walks, sea views and the atmosphere of Lynton.",
    fullDescription: "Valley of Rocks Hotel is a classic coastal retreat for guests who want scenery, history and simple access to one of Devon's most memorable landscapes. The experience is built around relaxed stays, nearby walks and the charm of a traditional hotel setting.",
    locationText: "Set in Lynton on the North Devon coast, with the Valley of Rocks, coastal paths and Exmoor within easy reach.",
    gallery: hotelImages.valleyOfRocks,
    amenities: ["Near the Valley of Rocks", "Coastal walking routes", "Classic hotel character", "En-suite rooms"],
    bookingUrl: "https://www.booking.com/hotel/gb/the-valley-of-rocks.en-gb.html"
  }),
  makeHotel({
    slug: "beresford-hotel",
    name: "Beresford Hotel",
    location: "Newquay, Cornwall",
    category: "Coastal",
    shortDescription: "A Newquay base for beach days, town-centre convenience and relaxed Cornish breaks, with bright rooms and simple access to the coast.",
    fullDescription: "Beresford Hotel suits guests who want Newquay within reach: beaches, local dining, shopping streets and Cornwall's surf-town energy. It works well for short breaks, practical stays and guests looking for a straightforward coastal hotel.",
    locationText: "In Newquay, Cornwall, close to beaches, the town centre and the coast.",
    gallery: hotelImages.beresford,
    amenities: ["Newquay location", "Beach break setting", "Town-centre access", "En-suite rooms"],
    bookingUrl: "https://www.booking.com/hotel/gb/the-beresford.en-gb.html"
  }),
  makeHotel({
    slug: "sun-hotel",
    name: "Sun Hotel",
    location: "Skegness, Lincolnshire",
    category: "Coastal",
    shortDescription: "A bright seaside stay on North Parade, steps from Skegness Pier, with relaxed rooms and a welcoming harbour-side feel.",
    fullDescription: "Sun Hotel offers an easy-going coastal stay in the heart of Skegness. Guests are within walking distance of the pier, beach and local attractions, with comfortable rooms and a practical base for Lincolnshire seaside breaks.",
    locationText: "On North Parade in Skegness, Lincolnshire, close to Skegness Pier, the beach and the town centre.",
    gallery: hotelImages.sun,
    amenities: ["North Parade location", "Near Skegness Pier", "Relaxed rooms", "Coastal access"],
    // TODO: Confirm the preferred live booking partner URL for Sun Hotel.
    bookingUrl: "https://www.booking.com/hotel/gb/the-sun-2.en-gb.html"
  }),
  makeHotel({
    slug: "wembar-hotel",
    name: "Wembar Hotel",
    location: "London",
    category: "City",
    shortDescription: "A compact London stay for guests who want city convenience, transport access and a comfortable base between appointments or sightseeing.",
    fullDescription: "Wembar Hotel is a practical London base for short leisure trips and business travel. The focus is on convenience, straightforward rooms and access to the capital's neighbourhoods and transport links.",
    locationText: "In London, with good access to public transport and the city's main districts.",
    gallery: hotelImages.wembar,
    amenities: ["London location", "Short-stay friendly", "Urban access", "En-suite rooms"],
    bookingUrl: "https://www.booking.com/hotel/gb/wembar.html"
  }),
  makeHotel({
    slug: "amsterdam-hotel",
    name: "Amsterdam Hotel",
    location: "London",
    category: "City",
    shortDescription: "A London hotel with a townhouse character, designed for guests who want a central-feeling stay with simple links across the city.",
    fullDescription: "Amsterdam Hotel gives H&H a refined city option for guests visiting London for work, events or leisure. Its appeal is practical comfort, classic building character and access to the capital's transport network.",
    locationText: "In London, offering a townhouse-style stay with links across the city.",
    gallery: hotelImages.amsterdam,
    amenities: ["City links", "Townhouse character", "Business and leisure stays", "En-suite rooms"],
    bookingUrl: "https://www.booking.com/hotel/gb/amsterdamhotel.html"
  }),
  makeHotel({
    slug: "savoy-hotel",
    name: "Savoy Hotel",
    location: "Weston-super-Mare, Somerset",
    category: "Coastal",
    shortDescription: "A welcoming seaside guesthouse-style stay with simple rooms, practical amenities and a relaxed base for exploring the Somerset coast.",
    fullDescription: "Savoy Hotel is designed for uncomplicated breaks on the Somerset coast: comfortable rooms, a friendly arrival and a location that keeps guests close to Weston-super-Mare's seafront and local attractions.",
    locationText: "On Birnbeck Road in Weston-super-Mare, Somerset, with sea views and access to the town's beaches and promenade.",
    gallery: hotelImages.savoy,
    amenities: ["Seafront setting", "Coastal breaks", "Comfortable essentials", "En-suite rooms"],
    bookingUrl: "https://www.booking.com/hotel/gb/savoy-b-amp-b.html"
  }),
  makeHotel({
    slug: "green-gables-hotel",
    name: "Green Gables Hotel",
    location: "Scarborough",
    category: "Coastal",
    shortDescription: "A Scarborough hotel for seaside escapes, group visits and family-friendly stays, with generous spaces and access to the town's attractions.",
    fullDescription: "Green Gables Hotel gives guests a comfortable Scarborough base with the scale and flexibility suited to families, groups and longer coastal visits. It is a practical choice for exploring the town, beaches and surrounding Yorkshire coast.",
    locationText: "In Scarborough, North Yorkshire, close to the coast, town centre and local attractions.",
    gallery: hotelImages.greenGables,
    amenities: ["Scarborough base", "Family-friendly stays", "Nearby coast and attractions", "En-suite rooms"],
    bookingUrl: "https://www.booking.com/hotel/gb/green-gables-scarborough.en-gb.html"
  }),
  makeHotel({
    slug: "villa-rose-hotel",
    name: "Villa Rose Hotel",
    location: "Great Yarmouth",
    category: "Coastal",
    shortDescription: "A seaside stay close to Great Yarmouth's visitor attractions, with an easy-going style made for short breaks and coastal weekends.",
    fullDescription: "Villa Rose Hotel is a straightforward coastal option for guests who want to be near the energy of Great Yarmouth. The stay is simple, accessible and focused on giving travellers a convenient base near the seafront.",
    locationText: "In Great Yarmouth, Norfolk, close to the seafront, attractions and the town centre.",
    gallery: hotelImages.villaRose,
    amenities: ["Great Yarmouth access", "Seaside weekends", "Simple short stays", "En-suite rooms"],
    bookingUrl: "https://www.booking.com/hotel/gb/villa-rose.html"
  }),
  makeHotel({
    slug: "marine-parade-hotel",
    name: "Marine Parade Hotel",
    location: "Eastbourne, East Sussex",
    category: "Coastal",
    shortDescription: "A seafront hotel on Marine Parade, ideal for guests who want direct coastal atmosphere, practical rooms and a relaxed place to return after days out.",
    fullDescription: "Marine Parade Hotel brings a classic promenade mood to Eastbourne. It suits guests who value an easy coastal setting, clear booking and simple comfort close to the beach, pier and town centre.",
    locationText: "On Marine Parade in Eastbourne, East Sussex, opposite the pebble beach and close to Eastbourne Pier.",
    gallery: hotelImages.marineParade,
    amenities: ["Seafront location", "Promenade setting", "Relaxed stays", "En-suite rooms"],
    bookingUrl: "https://www.booking.com/hotel/gb/marineparade.html"
  }),
  makeHotel({
    slug: "alumhurst-hotel",
    name: "Alumhurst Hotel",
    location: "Blackpool",
    category: "Coastal",
    shortDescription: "A Blackpool base close to the town's entertainment, promenade and visitor attractions, designed for simple, convenient short stays.",
    fullDescription: "Alumhurst Hotel is positioned for guests visiting Blackpool for leisure, events and classic seaside entertainment. The focus is central access, practical comfort and a stay that keeps the town within easy reach.",
    locationText: "In Blackpool, Lancashire, close to the promenade, entertainment and visitor attractions.",
    gallery: hotelImages.alumhurst,
    amenities: ["Blackpool access", "Entertainment nearby", "Convenient short breaks", "En-suite rooms"],
    bookingUrl: "https://www.booking.com/hotel/gb/alumhurst-blackpool.en-gb.html"
  }),
  makeHotel({
    slug: "granby-hotel",
    name: "Granby Hotel",
    location: "Scarborough",
    category: "Coastal",
    shortDescription: "A Scarborough hotel with straightforward comfort, close to the town's coastal character and well placed for relaxed Yorkshire breaks.",
    fullDescription: "Granby Hotel offers a practical Scarborough stay for guests who want town access, nearby seaside walks and a dependable base for exploring the Yorkshire coast.",
    locationText: "In Scarborough, North Yorkshire, with easy access to the coast, town centre and local walks.",
    gallery: hotelImages.granby,
    amenities: ["Scarborough location", "Town access", "Yorkshire coast breaks", "En-suite rooms"],
    bookingUrl: "https://www.booking.com/hotel/gb/granby-scarborough.html"
  }),
  makeHotel({
    slug: "limes-hotel",
    name: "Limes Hotel",
    location: "Market Rasen, Lincolnshire",
    category: "Country Town",
    shortDescription: "A calm Market Rasen stay with a country-town feel, suited to guests looking for comfort, quiet and access to Lincolnshire surroundings.",
    fullDescription: "Limes Hotel adds a softer country-town note to the H&H portfolio. It suits guests looking for a relaxed stay away from the larger resort towns, with simple access to local routes and nearby countryside.",
    locationText: "In Market Rasen, Lincolnshire, with access to the town centre and surrounding countryside.",
    gallery: hotelImages.limes,
    amenities: ["Market Rasen setting", "Calmer stays", "Lincolnshire access", "En-suite rooms"],
    bookingUrl: "https://www.booking.com/hotel/gb/limeshotelmrasen.en-gb.html"
  })
];

const categories = ["Coastal", "City", "Country Town"];

if (typeof module !== "undefined") {
  module.exports = { hotels, categories };
}

if (typeof window !== "undefined") {
  window.HHHotels = { hotels, categories };
}
