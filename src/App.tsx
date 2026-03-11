import { useState } from "react";
import Navbar from "./components/Navbar";
import Page1  from "./components/Page1";
import Page2  from "./components/Page2";
import Page3  from "./components/Page3";
import "./index.css";

function App() {
  const [page, setPage] = useState(1);

  return (
    <>
      <Navbar page={page} setPage={setPage} />

      {page === 1 && (
        <Page1
          onGoFeed={() => setPage(3)}
          onAnalyzeDone={() => setPage(2)}
        />
      )}
      {page === 2 && <Page2 />}
      {page === 3 && <Page3 />}
    </>
  )
}

export default App
