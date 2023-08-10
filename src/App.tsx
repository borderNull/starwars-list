import { BrowserRouter, Route, Routes } from "react-router-dom";

import PersonList from "./components/PersonList";
import PersonCard from "./components/PersonCard";

import "./App.css";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.DEV ? "/" : "/starwars-list/"}>
      <Routes>
        <Route path="/" element={<PersonList />} />
        <Route path="/person/:personId" element={<PersonCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
