import { TimelineEvent } from '../TimelineEvent';

export default function TimelineEventExample() {
  return (
    <div className="p-8 max-w-lg bg-background">
      <TimelineEvent
        title="Arrival at Charles de Gaulle Airport"
        type="flight"
        time="10:30 AM"
        location="CDG Airport, Paris"
        description="Land at Charles de Gaulle Airport. Collect baggage and go through customs."
        duration="2h"
        onHover={(isHovering) => console.log('Hovering:', isHovering)}
      />
      <TimelineEvent
        title="Check-in at Hotel Le Marais"
        type="accommodation"
        time="2:00 PM"
        location="Le Marais District, Paris"
        description="Check into your boutique hotel in the historic Le Marais district."
        duration="30min"
        onHover={(isHovering) => console.log('Hovering:', isHovering)}
      />
      <TimelineEvent
        title="Lunch at Café de Flore"
        type="food"
        time="3:00 PM"
        location="Saint-Germain-des-Prés"
        description="Enjoy traditional French cuisine at this iconic Parisian café."
        duration="1.5h"
        isLast={true}
        onHover={(isHovering) => console.log('Hovering:', isHovering)}
      />
    </div>
  );
}
