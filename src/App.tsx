import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ThemeToggleButton from "./pages/main/ThemeToggleButton";
import MainPage from "./pages/main/MainPage";

const LinkAnalysisPage = lazy(() => import("./pages/analyst/link/LinkAnalysisPage"));
const ImageAnalysisPage = lazy(() => import("./pages/analyst/image/ImageAnalysisPage"));
const FeedPage = lazy(() => import("./pages/feed/FeedPage"));
const Page404 = lazy(() => import("./share/errorPage/Page404"));

function App() {
  return (
    <div className="min-h-screen bg-base text-text">
      <Navbar />
      <Suspense>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/result" element={<LinkAnalysisPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/image" element={<ImageAnalysisPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
      <ThemeToggleButton />
    </div>
  );
}

export default App;
