import './App.css';
import './globals.css'
import {Route, Routes} from "react-router-dom";
import {NavigationBar, TeachersList} from "./pages";

function App() {
  return (
      <div className="main-page bg-accent relative flex min-h-screen flex-col">
          <Routes>
              <Route path={"/list"} element={<TeachersList />} />
          </Routes>
          <NavigationBar currentRole={"admin"} />
      </div>
  );
}

export default App;
