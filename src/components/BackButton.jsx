import { useNavigate, useLocation } from "react-router-dom";
import { IconArrowLeft } from "./Icons";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  const handleClick = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Go back"
      className="fixed bottom-6 left-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/95 text-ink shadow-lg shadow-black/10 backdrop-blur transition hover:-translate-x-0.5 hover:bg-sage hover:text-white hover:border-sage active:scale-90 dark:border-white/10 dark:bg-[#242019]/95 dark:text-paper"
    >
      <IconArrowLeft className="h-5 w-5" />
    </button>
  );
}