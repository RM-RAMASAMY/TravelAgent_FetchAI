import { useState } from "react";
import { TripForm } from "@/components/TripForm";
import { Timeline } from "@/components/Timeline";
import { TravelMap } from "@/components/TravelMap";
import { EmptyState } from "@/components/EmptyState";
import { generateMockItinerary } from "@/lib/mockData";
import type { Itinerary } from "@shared/schema";

export default function Home() {
  // Initialize with a default itinerary (Paris trip)
  const [itinerary, setItinerary] = useState<Itinerary | null>(() => 
    generateMockItinerary("Paris", "2025-11-01", "2025-11-05")
  );
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);

  const handleGenerate = (location: string, startDate: string, endDate: string) => {
    // TODO: remove mock functionality - replace with API call
    const mockItinerary = generateMockItinerary(location, startDate, endDate);
    setItinerary(mockItinerary);
  };

  const hoveredEvent = hoveredEventId 
    ? itinerary?.events.find(e => e.id === hoveredEventId) 
    : null;

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      {/* Full screen map background */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        {itinerary ? (
          <>
            {/* Map takes full screen - behind all panels */}
            <main className="absolute inset-0 bg-muted overflow-hidden z-0">
              <TravelMap 
                events={itinerary.events}
                hoveredEvent={hoveredEvent}
              />
            </main>

            {/* Floating top search panel with enhanced glassmorphism - right aligned */}
            <div className="absolute top-3 right-4 z-50 w-full max-w-4xl pointer-events-none">
              <div className="bg-card/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-border/50 pointer-events-auto scale-in floating">
                <TripForm onGenerate={handleGenerate} />
              </div>
            </div>

            {/* Floating left panel with enhanced styling */}
            <div className="absolute left-4 top-20 bottom-4 z-40 w-full max-w-[340px] lg:max-w-[380px] pointer-events-none">
              <div className="h-full bg-card/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-border/50 overflow-hidden pointer-events-auto scale-in">
                {/* Gradient overlay at top */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-10"></div>
                
                <div className="h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
                  <Timeline 
                    events={itinerary.events}
                    onEventHover={setHoveredEventId}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <main className="flex-1 overflow-hidden">
            <EmptyState />
          </main>
        )}
      </div>
    </div>
  );
}
