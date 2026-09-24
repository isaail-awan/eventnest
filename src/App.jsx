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
import AuthPage from "./pages/AuthPage";
import useAuth from "./hooks/useAuth";
import useTheme from "./hooks/useTheme";
import { loadBookings, saveBookings } from "./utils/bookings";

export default function App() {
  const [bookings, setBookings] = useState(loadBookings);
  const { user } = useAuth();
  const [dark, toggleTheme] = useTheme();

  useEffect(() => {
    saveBookings(bookings);
  }, [bookings]);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const cancelBooking = (id) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled", cancelledAt: new Date().toISOString() } : b)));
  };

  const myActiveCount = user ? bookings.filter((b) => b.userId === user.id && b.status !== "cancelled").length : 0;

  return (
    <div className="relative min-h-screen bg-paper text-ink transition-colors duration-300 dark:bg-[#1A1712] dark:text-[#EDE7D9]">
      <LeafBackground />
      <Navbar bookingCount={myActiveCount} dark={dark} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/book/:id" element={<BookEvent onConfirm={addBooking} />} />
        <Route path="/tickets" element={<MyTickets bookings={bookings} onCancel={cancelBooking} />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
      </Routes>
      <BackButton />
    </div>
  );
}