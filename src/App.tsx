import './App.css';
import './globals.css'
import {Route, Routes} from "react-router-dom";
import {NavigationBar, TeachersList} from "./pages";
import {Card} from "./components/ui/card";

function App() {
  return (
      <div className="main-page bg-accent relative flex min-h-screen flex-col">
          <Card className="m-5">
              <Routes>
                  <Route path={"/list"} element={<TeachersList />} />
              </Routes>
          </Card>
          <NavigationBar currentRole={"admin"} />
      </div>
  );
}

export default App;
