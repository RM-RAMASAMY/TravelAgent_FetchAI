import { TripForm } from '../TripForm';

export default function TripFormExample() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <TripForm 
        onGenerate={(location, startDate, endDate) => {
          console.log('Generate itinerary:', { location, startDate, endDate });
        }}
      />
    </div>
  );
}
