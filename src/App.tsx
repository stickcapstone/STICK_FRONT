import { useState } from "react";
import Navbar from "./components/Navbar";
import Page1  from "./components/main/Page1";
import Page2  from "./components/analyst/Page2";
import Page3  from "./components/Page3";
import "./index.css";
import Page1Button from "./components/main/Page1.button";
import Page4 from "./components/Page4";

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
      {page === 2 && <Page2 onGoMain={() => setPage(1)}/>}
      {page === 3 && <Page3 />}
      {page === 4 && <Page4 onAnalyzeDone={() => setPage(2)}/>}
      <Page1Button />
    </>
  )
}

export default App
