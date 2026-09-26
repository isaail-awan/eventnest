import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LeafBackground from "./components/LeafBackground";
import BackButton from "./components/BackButton";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Categories from "./pages/Categories";
import EventDetails from "./pages/EventDetails";
import BookEvent from "./pages/BookEvent";
import MyTickets from "./pages/MyTickets";
import AuthPage from "./pages/AuthPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import useAuth from "./hooks/useAuth";
import useTheme from "./hooks/useTheme";
import { loadBookings, saveBookings } from "./utils/bookings";

export default function App() {
  const [bookings, setBookings] = useState(loadBookings);
  const { user, isAdmin } = useAuth();
  const [dark, toggleTheme] = useTheme();
  const location = useLocation();

  useEffect(() => {
    saveBookings(bookings);
  }, [bookings]);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, { ...booking, status: "pending" }]);
  };

  const cancelBooking = (id) => {
    if (!user) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id && b.userId === user.id && b.status !== "cancelled"
          ? { ...b, status: "cancelled", cancelledAt: new Date().toISOString(), cancelledBy: { userId: user.id, name: user.name, role: "customer" } }
          : b
      )
    );
  };

  const confirmBooking = (id) => {
    if (!isAdmin) return;
    setBookings((prev) =>
      prev.map((b) => (b.id === id && b.status === "pending" ? { ...b, status: "confirmed", confirmedAt: new Date().toISOString() } : b))
    );
  };

  const adminCancelBooking = (id) => {
    if (!isAdmin) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id && b.status !== "cancelled"
          ? { ...b, status: "cancelled", cancelledAt: new Date().toISOString(), cancelledBy: { userId: user.id, name: user.name, role: "admin" } }
          : b
      )
    );
  };

  const myActiveCount = user ? bookings.filter((b) => b.userId === user.id && b.status !== "cancelled").length : 0;

  return (
    <div className="relative flex min-h-screen flex-col bg-paper text-ink transition-colors duration-300 dark:bg-[#1A1712] dark:text-[#EDE7D9]">
      <LeafBackground />
      <Navbar bookingCount={myActiveCount} dark={dark} onToggleTheme={toggleTheme} />
      <div key={location.pathname} className="page-enter flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/book/:id" element={<BookEvent onConfirm={addBooking} />} />
          <Route path="/tickets" element={<MyTickets bookings={bookings} onCancel={cancelBooking} />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin bookings={bookings} onConfirm={confirmBooking} onCancel={adminCancelBooking} />} />
        </Routes>
      </div>
      <Footer />
      <BackButton />
    </div>
  );
}