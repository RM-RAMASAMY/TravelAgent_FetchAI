import { TravelMap } from '../TravelMap';
import type { ItineraryEvent } from '@shared/schema';

const mockEvents: ItineraryEvent[] = [
  {
    id: "1",
    title: "Eiffel Tower",
    type: "activity",
    time: "9:00 AM",
    location: "Champ de Mars, Paris",
    description: "Visit the iconic Eiffel Tower and enjoy panoramic views of Paris.",
    duration: "2h",
    coordinates: [48.8584, 2.2945]
  },
  {
    id: "2",
    title: "Louvre Museum",
    type: "entertainment",
    time: "12:00 PM",
    location: "Rue de Rivoli, Paris",
    description: "Explore world-famous art collections including the Mona Lisa.",
    duration: "3h",
    coordinates: [48.8606, 2.3376]
  },
  {
    id: "3",
    title: "Notre-Dame Cathedral",
    type: "activity",
    time: "4:00 PM",
    location: "Île de la Cité, Paris",
    description: "Admire the Gothic architecture of this historic cathedral.",
    duration: "1h",
    coordinates: [48.8530, 2.3499]
  },
];

export default function TravelMapExample() {
  return (
    <div className="h-screen w-full">
      <TravelMap events={mockEvents} />
    </div>
  );
}
