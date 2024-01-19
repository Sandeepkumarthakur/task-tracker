import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Website from "./components/Website.jsx";
import Layout from "./components/Layout/Layout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Website />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
