import { Globe, Sparkles } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full relative overflow-hidden animated-gradient">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-lg px-8 relative z-10">
        <div className="mb-8 flex justify-center fade-in-up">
          <div className="relative">
            {/* Animated pulsing ring */}
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/30 rounded-full blur-xl"></div>
            
            <div className="relative bg-gradient-to-br from-background to-accent/50 p-8 rounded-full border-2 border-primary/30 shadow-2xl">
              <Globe className="h-28 w-28 text-primary floating" />
              <Sparkles className="h-10 w-10 text-primary absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
        </div>
        
        <h2 className="text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent fade-in-up" style={{ animationDelay: '200ms' }}>
          Plan Your Perfect Journey
        </h2>
        
        <div className="space-y-3 fade-in-up" style={{ animationDelay: '400ms' }}>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Enter your destination and travel dates above to create a personalized 
            itinerary with an interactive map and detailed timeline.
          </p>
          
          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-muted-foreground">Interactive Map</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-chart-2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-muted-foreground">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-chart-3 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span className="text-muted-foreground">Smart Recommendations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
