import type { Itinerary, ItineraryEvent } from "@shared/schema";

// TODO: remove mock functionality - replace with real API calls
export function generateMockItinerary(
  location: string,
  startDate: string,
  endDate: string
): Itinerary {
  const destinations: Record<string, { coords: [number, number]; events: Omit<ItineraryEvent, "id">[] }> = {
    "paris": {
      coords: [48.8566, 2.3522],
      events: [
        {
          title: "Arrival at Charles de Gaulle Airport",
          type: "flight",
          time: "10:30 AM",
          location: "CDG Airport, Paris",
          description: "Land at Charles de Gaulle Airport. Collect baggage and go through customs.",
          duration: "2h",
          coordinates: [49.0097, 2.5479]
        },
        {
          title: "Check-in at Hotel Le Marais",
          type: "accommodation",
          time: "2:00 PM",
          location: "Le Marais District, Paris",
          description: "Check into your boutique hotel in the historic Le Marais district. Relax and freshen up.",
          duration: "1h",
          coordinates: [48.8566, 2.3631]
        },
        {
          title: "Lunch at Café de Flore",
          type: "food",
          time: "3:30 PM",
          location: "Saint-Germain-des-Prés",
          description: "Enjoy traditional French cuisine at this iconic Parisian café, known for its literary history.",
          duration: "1.5h",
          coordinates: [48.8534, 2.3318]
        },
        {
          title: "Visit the Eiffel Tower",
          type: "activity",
          time: "6:00 PM",
          location: "Champ de Mars, 5 Avenue Anatole",
          description: "Experience breathtaking views of Paris from the iconic Eiffel Tower. Watch the sunset over the city.",
          duration: "2h",
          coordinates: [48.8584, 2.2945]
        },
        {
          title: "Seine River Cruise",
          type: "entertainment",
          time: "9:00 PM",
          location: "Port de la Bourdonnais",
          description: "Evening cruise along the Seine River with spectacular views of illuminated monuments.",
          duration: "1.5h",
          coordinates: [48.8606, 2.2978]
        },
        {
          title: "Louvre Museum Tour",
          type: "entertainment",
          time: "10:00 AM",
          location: "Rue de Rivoli, Paris",
          description: "Explore world-famous art collections including the Mona Lisa, Venus de Milo, and ancient artifacts.",
          duration: "3h",
          coordinates: [48.8606, 2.3376]
        },
        {
          title: "Lunch in Latin Quarter",
          type: "food",
          time: "2:00 PM",
          location: "Latin Quarter, Paris",
          description: "Discover charming bistros and cafés in the historic Latin Quarter.",
          duration: "1.5h",
          coordinates: [48.8529, 2.3441]
        },
        {
          title: "Notre-Dame Cathedral",
          type: "activity",
          time: "4:30 PM",
          location: "Île de la Cité, Paris",
          description: "Admire the Gothic architecture and historic significance of Notre-Dame Cathedral.",
          duration: "1h",
          coordinates: [48.8530, 2.3499]
        }
      ]
    },
    "tokyo": {
      coords: [35.6762, 139.6503],
      events: [
        {
          title: "Arrival at Narita Airport",
          type: "flight",
          time: "3:00 PM",
          location: "Narita International Airport",
          description: "Arrive at Narita Airport and take the express train to central Tokyo.",
          duration: "2.5h",
          coordinates: [35.7720, 140.3929]
        },
        {
          title: "Hotel Check-in Shibuya",
          type: "accommodation",
          time: "6:30 PM",
          location: "Shibuya, Tokyo",
          description: "Check into your modern hotel in the vibrant Shibuya district.",
          duration: "1h",
          coordinates: [35.6595, 139.7004]
        },
        {
          title: "Dinner at Izakaya",
          type: "food",
          time: "8:00 PM",
          location: "Shinjuku, Tokyo",
          description: "Experience authentic Japanese cuisine at a traditional izakaya.",
          duration: "2h",
          coordinates: [35.6938, 139.7034]
        },
        {
          title: "Senso-ji Temple Visit",
          type: "activity",
          time: "9:00 AM",
          location: "Asakusa, Tokyo",
          description: "Visit Tokyo's oldest temple and explore the traditional Nakamise shopping street.",
          duration: "2h",
          coordinates: [35.7148, 139.7967]
        },
        {
          title: "Tokyo Skytree Observation",
          type: "entertainment",
          time: "12:00 PM",
          location: "Sumida, Tokyo",
          description: "Enjoy panoramic views of Tokyo from one of the world's tallest structures.",
          duration: "2h",
          coordinates: [35.7101, 139.8107]
        },
        {
          title: "Ramen Lunch",
          type: "food",
          time: "3:00 PM",
          location: "Ikebukuro, Tokyo",
          description: "Savor authentic ramen at a renowned local shop.",
          duration: "1h",
          coordinates: [35.7295, 139.7109]
        }
      ]
    },
    "default": {
      coords: [40.7128, -74.0060],
      events: [
        {
          title: "Airport Arrival",
          type: "flight",
          time: "10:00 AM",
          location: `${location} International Airport`,
          description: "Arrive at the airport and proceed to baggage claim.",
          duration: "1.5h",
          coordinates: [40.7128, -74.0060]
        },
        {
          title: "Hotel Check-in",
          type: "accommodation",
          time: "1:00 PM",
          location: `Downtown ${location}`,
          description: "Check into your hotel and settle in.",
          duration: "1h",
          coordinates: [40.7489, -73.9680]
        },
        {
          title: "Local Restaurant",
          type: "food",
          time: "3:00 PM",
          location: `${location} City Center`,
          description: "Enjoy lunch at a highly-rated local restaurant.",
          duration: "1.5h",
          coordinates: [40.7580, -73.9855]
        },
        {
          title: "City Tour",
          type: "activity",
          time: "5:30 PM",
          location: `${location} Historic District`,
          description: "Explore the main attractions and landmarks of the city.",
          duration: "3h",
          coordinates: [40.7614, -73.9776]
        },
        {
          title: "Evening Entertainment",
          type: "entertainment",
          time: "9:00 PM",
          location: `${location} Entertainment District`,
          description: "Experience the local nightlife and entertainment scene.",
          duration: "2h",
          coordinates: [40.7590, -73.9845]
        }
      ]
    }
  };

  const locationKey = location.toLowerCase().split(",")[0].trim();
  const destination = destinations[locationKey] || destinations.default;

  const eventsWithIds: ItineraryEvent[] = destination.events.map((event, index) => ({
    ...event,
    id: `event-${index + 1}`,
  }));

  return {
    id: `itinerary-${Date.now()}`,
    location,
    startDate,
    endDate,
    events: eventsWithIds,
  };
}
