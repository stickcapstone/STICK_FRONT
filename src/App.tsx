import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import LinkAnalysisPage from "./pages/analyst/link/LinkAnalysisPage";
import ImageAnalysisPage from "./pages/analyst/image/ImageAnalysisPage";
import FeedPage from "./pages/feed/FeedPage";
import ThemeToggleButton from "./pages/main/ThemeToggleButton";
import MainPage from "./pages/main/MainPage";

function App() {
  return (
    <div className="min-h-screen bg-base text-text">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/result" element={<LinkAnalysisPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/image" element={<ImageAnalysisPage />} />
      </Routes>
      <ThemeToggleButton />
    </div>
  );
}

export default App;
