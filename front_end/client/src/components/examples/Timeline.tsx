import { Timeline } from '../Timeline';
import type { ItineraryEvent } from '@shared/schema';

const mockEvents: ItineraryEvent[] = [
  {
    id: "1",
    title: "Arrival at CDG Airport",
    type: "flight",
    time: "10:30 AM",
    location: "Charles de Gaulle Airport",
    description: "International flight arrival. Collect baggage and proceed through customs.",
    duration: "2h",
    coordinates: [48.8584, 2.3470]
  },
  {
    id: "2",
    title: "Hotel Check-in",
    type: "accommodation",
    time: "2:00 PM",
    location: "Le Marais, Paris",
    description: "Check into boutique hotel in the historic Le Marais district.",
    duration: "30min",
    coordinates: [48.8566, 2.3522]
  },
  {
    id: "3",
    title: "Lunch at Local Bistro",
    type: "food",
    time: "3:00 PM",
    location: "Saint-Germain-des-Prés",
    description: "Enjoy authentic French cuisine at a charming local bistro.",
    duration: "1.5h",
    coordinates: [48.8534, 2.3318]
  },
];

export default function TimelineExample() {
  return (
    <div className="h-screen bg-card">
      <Timeline 
        events={mockEvents}
        onEventHover={(eventId) => console.log('Hovering event:', eventId)}
      />
    </div>
  );
}
