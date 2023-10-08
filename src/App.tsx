import './App.css';
import './globals.css'
import {Route, Routes} from "react-router-dom";
import {NavigationBar, SubjectList, TeachersList} from "./pages";
import {Card} from "./components/ui";
import {HometaskList} from "./pages/teacher/HometaskList";
import {StudyList} from "./pages/teacher/StudyList";

function App() {
  return (
      <div className="main-page bg-accent relative flex min-h-screen flex-col">
          <Card className="m-5">
              <Routes>
                  <Route path={"teacher/list"} element={<TeachersList />} />
                  <Route path={"subject/list"} element={<SubjectList />} />
                  <Route path={"hometask/list"} element={<HometaskList />} />
                  <Route path={"study/list"} element={<StudyList />} />
              </Routes>
          </Card>
          <NavigationBar currentRole={"teacher"} />
      </div>
  );
}

export default App;
