import { Plane, Home, UtensilsCrossed, Music, Car, MapPin, Clock, DollarSign, Star } from "lucide-react";
import type { EventType } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface TimelineEventProps {
  title: string;
  type: EventType;
  time: string;
  location: string;
  description: string;
  duration: string;
  isLast?: boolean;
  onHover?: (isHovering: boolean) => void;
}

const iconMap: Record<EventType, React.ComponentType<{ className?: string }>> = {
  flight: Plane,
  accommodation: Home,
  food: UtensilsCrossed,
  entertainment: Music,
  transit: Car,
  activity: MapPin,
};

const typeColors: Record<EventType, string> = {
  flight: "bg-primary/10 text-primary border-primary/20",
  accommodation: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  food: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  entertainment: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  transit: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  activity: "bg-chart-1/10 text-chart-1 border-chart-1/20",
};

export function TimelineEvent({
  title,
  type,
  time,
  location,
  description,
  duration,
  isLast = false,
  onHover,
}: TimelineEventProps) {
  const Icon = iconMap[type];
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  // Mock additional options that appear on hover
  const getAdditionalOptions = () => {
    if (type === "food") {
      return [
        { icon: Star, label: "Rating: 4.5/5", value: "245 reviews" },
        { icon: DollarSign, label: "Price Range", value: "$$-$$$" },
        { icon: Clock, label: "Open Hours", value: "11am - 10pm" },
      ];
    } else if (type === "accommodation") {
      return [
        { icon: Star, label: "Rating: 4.7/5", value: "1,234 reviews" },
        { icon: DollarSign, label: "Price", value: "$120/night" },
        { icon: Home, label: "Type", value: "Boutique Hotel" },
      ];
    } else if (type === "activity") {
      return [
        { icon: Clock, label: "Best Time", value: "Morning/Evening" },
        { icon: DollarSign, label: "Entry Fee", value: "$15-25" },
        { icon: Star, label: "Rating", value: "4.8/5" },
      ];
    }
    return [];
  };

  // Alternative location recommendations based on type
  const getAlternatives = () => {
    if (type === "food") {
      return [
        { name: "Le Petit Bistro", rating: "4.6", price: "$$", distance: "0.3 km" },
        { name: "Chez Pierre", rating: "4.4", price: "$$$", distance: "0.5 km" },
        { name: "Café Lumière", rating: "4.7", price: "$$", distance: "0.4 km" },
      ];
    } else if (type === "accommodation") {
      return [
        { name: "City View Hotel", rating: "4.5", price: "$110/night", distance: "0.2 km" },
        { name: "Luxury Suites", rating: "4.8", price: "$180/night", distance: "0.6 km" },
        { name: "Comfort Inn", rating: "4.3", price: "$85/night", distance: "0.4 km" },
      ];
    } else if (type === "activity") {
      return [
        { name: "Alternative Tour", rating: "4.6", price: "$20", distance: "0.3 km" },
        { name: "Similar Attraction", rating: "4.5", price: "$18", distance: "0.7 km" },
      ];
    } else if (type === "flight" || type === "transit") {
      return [
        { name: "Alternative Route", rating: "4.4", price: "Same price", distance: "0.5 km" },
      ];
    } else if (type === "entertainment") {
      return [
        { name: "Alternative Venue", rating: "4.7", price: "$25", distance: "0.4 km" },
        { name: "Similar Event", rating: "4.5", price: "$22", distance: "0.6 km" },
      ];
    }
    return [];
  };

  const additionalOptions = getAdditionalOptions();
  const alternatives = getAlternatives();

  return (
    <div 
      className={`relative pl-8 pb-5 group transition-all duration-700 ease-out ${isHovered ? 'pb-6' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={`event-${type}`}
    >
      {/* Animated connecting line with gradient */}
      {!isLast && (
        <div className="absolute left-[19px] top-10 bottom-0 w-[2px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-border via-border/50 to-transparent"></div>
        </div>
      )}
      
      {/* Enhanced icon with glow effect */}
      <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center ${typeColors[type]} border-2 transition-all duration-700 ease-out ${
        isHovered 
          ? 'scale-125 shadow-xl ring-2 ring-primary/20 ring-offset-2 ring-offset-background' 
          : 'shadow-md'
      }`}>
        <Icon className={`transition-all duration-700 ease-out ${isHovered ? 'h-5 w-5' : 'h-4 w-4'}`} />
        {isHovered && (
          <div className="absolute inset-0 rounded-full bg-current opacity-20 animate-ping"></div>
        )}
      </div>
      
      {/* Card with glassmorphism effect */}
      <div className={`ml-6 transition-all duration-700 ease-out rounded-xl ${
        isHovered 
          ? 'bg-gradient-to-br from-accent/80 to-accent/40 backdrop-blur-sm -mx-3 px-4 py-3 shadow-lg border border-border/50' 
          : 'hover:bg-accent/30 px-1 py-1'
      }`}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className={`font-semibold leading-tight smooth-text-transition ${
              isHovered ? 'text-lg' : 'text-sm'
            }`} data-testid="text-event-title">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
              <MapPin className="h-3 w-3" />
              {location}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs font-semibold flex items-center gap-1" data-testid="text-event-time">
              <Clock className="h-3 w-3" />
              {time}
            </p>
            <Badge variant="secondary" className={`mt-1 text-xs px-2 py-0.5 transition-all duration-500 ease-out ${
              isHovered ? 'shadow-md' : ''
            }`}>
              {duration}
            </Badge>
          </div>
        </div>
        
        <p className="text-xs text-foreground/90 leading-relaxed" data-testid="text-event-description">
          {description}
        </p>

        {/* Additional options that appear on hover with stagger animation */}
        {isHovered && additionalOptions.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border/50 space-y-2 animate-in fade-in-up duration-500">
            {additionalOptions.map((option, index) => {
              const OptionIcon = option.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-center justify-between text-xs p-2 rounded-lg bg-background/50 hover:bg-background transition-all duration-300 ease-out scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <OptionIcon className="h-4 w-4" />
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <span className="font-semibold text-foreground">{option.value}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Alternative locations with enhanced styling */}
        {isHovered && alternatives.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border/50 animate-in fade-in-up duration-500" style={{ animationDelay: '200ms' }}>
            <p className="text-xs font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="inline-block w-1 h-1 rounded-full bg-primary"></span>
              Other Options Nearby
            </p>
            <div className="space-y-2">
              {alternatives.map((alt, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-br from-muted/60 to-muted/40 hover:from-muted hover:to-muted/60 transition-all duration-500 ease-out cursor-pointer border border-transparent hover:border-border/50 shimmer-effect group/alt scale-in"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground group-hover/alt:text-primary transition-colors duration-300">{alt.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{alt.rating}</span>
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {alt.distance}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary ml-3">{alt.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
