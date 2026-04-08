import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import LinkAnalysisPage from "./pages/analyst/link/LinkAnalysisPage";
import ImageAnalysisPage from "./pages/analyst/image/ImageAnalysisPage";
import FeedPage from "./pages/feed/FeedPage";
import ThemeToggleButton from "./pages/main/ThemeToggleButton";
import MainPage from "./pages/main/MainPage";
import { LINK_ANALYSIS_RESULT } from "./data/data";

type Page = 1 | 2 | 3 | 4;

function App() {
  const [page, setPage] = useState<Page>(1);
  const [analyzedUrl, setAnalyzedUrl] = useState(LINK_ANALYSIS_RESULT.analyzedUrl);

  return (
    <div className="min-h-screen bg-base text-text">
      <Navbar page={page} setPage={setPage} />

      {page === 1 && (
        <MainPage
          onAnalyzeDone={(url) => {
            setAnalyzedUrl(url);
            setPage(2);
          }}
          onGoFeed={() => setPage(3)}
        />
      )}
      {page === 2 && (
        <LinkAnalysisPage analyzedUrl={analyzedUrl} onGoMain={() => setPage(1)} />
      )}
      {page === 3 && <FeedPage />}
      {page === 4 && <ImageAnalysisPage onAnalyzeDone={() => setPage(2)} />}

      <ThemeToggleButton />
    </div>
  );
}

export default App;
