import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import LinkAnalysisPage from "./pages/analyst/link/LinkAnalysisPage";
import ImageAnalysisPage from "./pages/analyst/image/ImageAnalysisPage";
import FeedPage from "./pages/feed/FeedPage";
import ThemeToggleButton from "./pages/main/ThemeToggleButton";
import MainPage from "./pages/main/MainPage";
import Page404 from "./share/errorPage/Page404";

function App() {
  return (
    <div className="min-h-screen bg-base text-text">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/result" element={<LinkAnalysisPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/image" element={<ImageAnalysisPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ThemeToggleButton />
    </div>
  );
}

export default App;
