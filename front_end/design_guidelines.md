# Travel Itinerary Planning Interface - Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based (Airbnb + Google Travel)

Drawing inspiration from Airbnb's approachable, clean aesthetic and Google Travel's functional timeline design. This approach prioritizes visual storytelling, clarity, and emotional engagement with travel planning while maintaining excellent usability for the split-screen interface paradigm.

**Core Design Principles:**
1. Visual hierarchy through whitespace and typography scale
2. Rounded, friendly geometric shapes that evoke exploration
3. Content-first design with purposeful use of interactive elements
4. Seamless integration between timeline narrative and spatial visualization

---

## Typography System

**Primary Font:** Inter (Google Fonts)
- Widely readable, modern sans-serif perfect for data-dense interfaces
- Excellent at small sizes for map labels and timeline details

**Secondary Font:** Merriweather (Google Fonts)
- For destination names and special headings to add warmth

**Type Scale:**
- Hero/Location Title: 32px, weight 700
- Section Headers: 24px, weight 600
- Event Titles: 18px, weight 600
- Body/Details: 14px, weight 400
- Small Labels/Time: 12px, weight 500

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8
- Micro spacing (icons, inline elements): p-2, gap-2
- Component internal spacing: p-4, gap-4
- Section spacing: p-6, gap-6
- Major layout divisions: p-8, gap-8

**Grid Structure:**
- Desktop: Split 35% (timeline) / 65% (map)
- Tablet: Split 40% (timeline) / 60% (map)
- Timeline panel: Fixed width with vertical scroll
- Map section: Fills remaining viewport height

**Container Behavior:**
- Left panel: max-w-md with overflow-y-auto
- Right section: Sticky positioning to maintain map visibility during timeline scroll
- Both sections: min-h-screen to establish full-height experience

---

## Component Library

### 1. Input Form Section (Top of Interface)
**Location & Date Selector:**
- Horizontal layout with search input and date picker side-by-side
- Rounded-lg containers (border-radius: 12px)
- Generous padding (p-6) for touch-friendly targets
- Search icon positioned inside input field (left side)
- Floating label design for modern feel
- Generate button: Prominent, rounded-full style (pill shape)

### 2. Timeline Panel (Left Section)

**Timeline Container:**
- Vertical scrolling list with connected line visualization
- Left-side vertical line (2px width) connecting all events
- Rounded timeline dots at each event node (12px diameter)

**Event Cards:**
- Rounded-xl containers (border-radius: 16px)
- Soft shadow for subtle depth (shadow-md)
- Padding: p-6 for comfortable reading
- Margin between cards: mb-6
- Hover state: Slight scale transform (scale-105) with shadow-lg

**Event Card Content Structure:**
- Icon container: Rounded-full background (48px diameter) positioned left
- Event time: Small label positioned top-right
- Event title: Bold, 18px below icon
- Location/venue name: 14px with slight opacity
- Description: 14px body text with line-height 1.6
- Duration indicator: Small badge at bottom

**Icon System:**
- Use Heroicons (outline style) via CDN
- Icon categories with consistent sizing (24px):
  - Accommodation: HomeIcon
  - Food: CakeIcon or restaurant
  - Entertainment: TicketIcon
  - Flight: PaperAirplaneIcon
  - Transit: TruckIcon or car
  - Activity: MapPinIcon

### 3. Interactive Map (Right Section)

**Map Container:**
- Full height of viewport (h-screen)
- Rounded corners on left edge only (rounded-l-xl) to blend with timeline
- Use Leaflet.js for map implementation
- Default zoom level that shows entire route
- Custom map markers with rounded styling

**Map Markers:**
- Circular markers with numbered sequence (start: 1, end: final number)
- Size: 40px diameter for primary destinations
- Smaller markers (28px) for waypoints/activities
- Pulsing animation on active/hovered marker

**Route Visualization:**
- Connected path between destinations (3px stroke width)
- Curved/bezier paths for visual interest
- Subtle drop shadow on route line for depth

**Tooltip/Callout Design:**
- Rounded-lg container (border-radius: 12px)
- Padding: p-4
- Max-width: 280px for readability
- Pointer/arrow aligned to marker position
- Content structure:
  - Location name: 16px, weight 600
  - Activity type badge: Small rounded-full pill
  - Timing details: 12px
  - Brief description: 14px, 2-line clamp

### 4. Header Section

**Top Navigation Bar:**
- Sticky positioning for persistent access
- Height: h-16 to h-20
- Logo/Brand: Left-aligned
- Action buttons: Right-aligned (Save Itinerary, Share, Print)
- Subtle bottom border for separation

### 5. Empty State (Before Generation)

**Centered Welcome Content:**
- Large map illustration or travel-themed graphic
- Headline: "Plan Your Perfect Journey"
- Subtext explaining the service
- Primary CTA button directing to input form
- Soft gradient background suggestion for depth

---

## Interaction & Animation Guidelines

**Use Animations Sparingly - Strategic Placement Only:**

1. **Timeline Scroll:** Fade-in animation for events as they enter viewport (subtle, 200ms)
2. **Map Marker Hover:** Scale transform (1.1x) with 150ms ease
3. **Timeline Event Hover:** Gentle lift effect (translateY -2px) with shadow increase
4. **Route Drawing:** Optional animated line drawing when itinerary loads (can be skipped for simplicity)
5. **Tooltip Appearance:** Fade + slide (100ms) when hovering markers

**NO animations for:**
- Background elements
- Decorative graphics
- Continuous/looping effects

---

## Responsive Behavior

**Desktop (1024px+):**
- Full split-screen layout maintained
- Timeline: Fixed 35% width
- Map: Fills remaining space

**Tablet (768px - 1023px):**
- Maintain split layout with adjusted ratio (40/60)
- Slightly reduced padding (p-4 instead of p-6)
- Smaller timeline cards

**Mobile (< 768px) - Future Consideration:**
- Stack layout: Timeline on top, collapsible map below
- Tab-based navigation between timeline and map views

---

## Images

**Hero/Header Background Image:**
- NO large hero image for this interface - focus is on functional split-screen
- Optional: Small brand logo or travel icon in header (32px height)

**Map Imagery:**
- Leaflet map tiles provide the visual foundation
- NO additional background images needed

**Timeline Event Images (Optional Enhancement):**
- Small thumbnail images (64px x 64px, rounded-lg) for accommodation/restaurant entries
- Positioned beside event icon
- Lazy-loaded to maintain performance

---

## Accessibility Considerations

- Timeline scrollable region: Clear focus indicators for keyboard navigation
- Map markers: keyboard accessible with tab navigation
- Tooltips: Triggered by both hover and focus states
- Color contrast: Ensure text readability throughout
- ARIA labels for icon-only elements
- Semantic HTML structure for timeline (ordered list recommended)

---

## Key Layout Specifications

**Timeline Event Vertical Rhythm:**
- Event card height: Auto (content-dependent), minimum 120px
- Spacing between events: mb-6 (24px)
- Timeline connector line: Positioned absolute, left-side, 2px width

**Map Section:**
- Position: Sticky top-0 for desktop
- Z-index management: Map base layer, markers middle, tooltips top
- Padding around map edges: p-4 for breathing room

**Form Input Section:**
- Positioned above split-screen layout
- Horizontal centering with max-w-4xl
- Padding: py-8 for vertical separation
- Background: Distinct from timeline/map (subtle variation)

This comprehensive design creates a polished, production-ready travel planning interface that balances aesthetic appeal with functional excellence.