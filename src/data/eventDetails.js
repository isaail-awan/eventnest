const details = {
  1: {
    description: "Ali Zafar returns to the stage with a night full of his greatest hits, from soulful ballads to high-energy anthems. Expect a full live band, stunning visuals and a crowd singing along to every word.",
    organizer: { name: "Sonic Vibe Productions", email: "info@sonicvibe.pk" },
    schedule: [
      { time: "18:00", label: "Gates open" },
      { time: "19:00", label: "Opening act" },
      { time: "20:00", label: "Ali Zafar takes the stage" },
      { time: "22:30", label: "Event ends" },
    ],
    tiers: [
      { id: "general", name: "General", price: 4500 },
      { id: "vip", name: "VIP (front row + meet & greet)", price: 12000 },
    ],
  },
  2: {
    description: "An intimate evening of Sufi qawali with Abida Parveen, one of the most powerful voices in South Asian music. A night of devotion, poetry and soul-stirring rhythm.",
    organizer: { name: "Alhamra Arts Council", email: "events@alhamra.pk" },
    schedule: [
      { time: "20:00", label: "Doors open" },
      { time: "21:00", label: "Performance begins" },
      { time: "23:00", label: "Event ends" },
    ],
    tiers: [
      { id: "general", name: "General", price: 3000 },
      { id: "premium", name: "Premium seating", price: 6000 },
    ],
  },
  3: {
    description: "Pakistan's largest wedding expo, bringing together top designers, photographers, decorators and venues under one roof. Perfect for couples planning their big day.",
    organizer: { name: "Karachi Events Co.", email: "hello@karachievents.pk" },
    schedule: [
      { time: "11:00", label: "Expo opens" },
      { time: "14:00", label: "Bridal fashion walk" },
      { time: "18:00", label: "Expo closes" },
    ],
    tiers: [{ id: "general", name: "Entry pass", price: 1500 }],
  },
  4: {
    description: "Welcome spring with live music, food trucks, art installations and games for the whole family. A full day of outdoor celebration in the heart of Islamabad.",
    organizer: { name: "F-9 Park Events", email: "info@f9events.pk" },
    schedule: [
      { time: "16:00", label: "Festival opens" },
      { time: "18:00", label: "Live music begins" },
      { time: "22:00", label: "Festival closes" },
    ],
    tiers: [{ id: "general", name: "General entry", price: 2000 }],
  },
};

export function getEventDetails(event) {
  return (
    details[event.id] || {
      description: event.name + " is a " + event.category.toLowerCase() + " event. Full details will be updated soon.",
      organizer: { name: "EventNest Partner", email: "partners@eventnest.com" },
      schedule: [{ time: event.time, label: "Event begins" }],
      tiers: [{ id: "general", name: "General", price: event.price }],
    }
  );
}