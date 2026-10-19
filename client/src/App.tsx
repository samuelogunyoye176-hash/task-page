// ============================================================
// App.tsx - DECIDES WHICH PAGE TO SHOW FOR EACH URL
// ------------------------------------------------------------
//   URL          Page
//   ----------   ------------
//   /            CoverPage
//   /tasks       MyTask      (list)
//   /new         NewTask     (create)
//   /edit/:id    EditTask    (update)  - :id is the task's MongoDB _id
//   anything     NotFound    (404)
// The Navbar sits outside <Routes>, so it shows on every page.
// ============================================================

import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import CoverPage from "./pages/CoverPage";
import MyTask from "./pages/MyTask";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/tasks" element={<MyTask />} />
        <Route path="/new" element={<NewTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
