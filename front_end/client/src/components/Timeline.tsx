import { TimelineEvent } from "./TimelineEvent";
import type { ItineraryEvent } from "@shared/schema";

interface TimelineProps {
  events: ItineraryEvent[];
  onEventHover?: (eventId: string | null) => void;
}

export function Timeline({ events, onEventHover }: TimelineProps) {
  return (
    <div className="p-4 space-y-2">
      <div className="mb-6 fade-in-up">
        <div className="relative inline-block">
          <h2 className="text-2xl font-bold font-serif bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent" data-testid="text-timeline-title">
            Your Itinerary
          </h2>
          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          {events.length} activities planned
        </p>
      </div>
      
      <div className="space-y-1 stagger-animation">
        {events.map((event, index) => (
          <TimelineEvent
            key={event.id}
            title={event.title}
            type={event.type}
            time={event.time}
            location={event.location}
            description={event.description}
            duration={event.duration}
            isLast={index === events.length - 1}
            onHover={(isHovering) => 
              onEventHover?.(isHovering ? event.id : null)
            }
          />
        ))}
      </div>
    </div>
  );
}
