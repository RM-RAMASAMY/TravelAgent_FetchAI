import { useState } from "react";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface TripFormProps {
  onGenerate: (location: string, startDate: string, endDate: string) => void;
}

export function TripForm({ onGenerate }: TripFormProps) {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location && startDate && endDate) {
      onGenerate(location, startDate, endDate);
    }
  };

  return (
    <Card className="p-3 shadow-xl border shimmer-effect relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 animated-gradient opacity-30 pointer-events-none"></div>
      
      <form onSubmit={handleSubmit} className="space-y-3 relative z-10">        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <div className="space-y-1 scale-in">
            <Label htmlFor="location" className="text-xs font-semibold flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-primary" />
              Destination
            </Label>
            <div className="relative group">
              <Input
                id="location"
                data-testid="input-location"
                type="text"
                placeholder="e.g., Paris, France"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-9 text-sm border-2 focus:border-primary transition-all duration-300"
                required
              />
            </div>
          </div>
          
          <div className="space-y-1 scale-in" style={{ animationDelay: '50ms' }}>
            <Label htmlFor="start-date" className="text-xs font-semibold flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-primary" />
              Start
            </Label>
            <div className="relative group">
              <Input
                id="start-date"
                data-testid="input-start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9 text-sm border-2 focus:border-primary transition-all duration-300"
                required
              />
            </div>
          </div>
          
          <div className="space-y-1 scale-in" style={{ animationDelay: '100ms' }}>
            <Label htmlFor="end-date" className="text-xs font-semibold flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-primary" />
              End
            </Label>
            <div className="relative group">
              <Input
                id="end-date"
                data-testid="input-end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9 text-sm border-2 focus:border-primary transition-all duration-300"
                required
              />
            </div>
          </div>
          
          <div className="scale-in" style={{ animationDelay: '150ms' }}>
            <Button 
              type="submit" 
              data-testid="button-generate"
              className="w-full h-9 rounded-full px-6 text-sm font-bold bg-gradient-to-r from-primary via-blue-600 to-primary bg-size-200 hover:bg-pos-100 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                Generate
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
