import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LeafBackground from "./components/LeafBackground";
import BackButton from "./components/BackButton";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import BookEvent from "./pages/BookEvent";
import MyTickets from "./pages/MyTickets";
import { loadBookings, saveBookings } from "./utils/bookings";

export default function App() {
  const [bookings, setBookings] = useState(loadBookings);

  useEffect(() => {
    saveBookings(bookings);
  }, [bookings]);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const cancelBooking = (id) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled", cancelledAt: new Date().toISOString() } : b)));
  };

  const activeCount = bookings.filter((b) => b.status !== "cancelled").length;

  return (
    <div className="relative min-h-screen text-ink">
      <LeafBackground />
      <Navbar bookingCount={activeCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/book/:id" element={<BookEvent onConfirm={addBooking} />} />
        <Route path="/tickets" element={<MyTickets bookings={bookings} onCancel={cancelBooking} />} />
      </Routes>
      <BackButton />
    </div>
  );
}