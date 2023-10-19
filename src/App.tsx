import './App.css';
import './globals.css'
import {Route, Routes, Navigate} from "react-router-dom";
import {LoginPage, NavigationBar, RegisterPage, SubjectList, TeachersList} from "./pages";
import {Card} from "./components/ui";
import {HometaskList} from "./pages/student/HometaskList";
import {StudyList} from "./pages/teacher/StudyList";
import {GroupList} from "./pages/admin/GroupList";
import {useContext} from "react";
import {LogoutPage} from "./pages/login/LogoutPage";
import GlobalContext from "./context/GlobalContext";


function App() {
    const { currentUser } = useContext(GlobalContext);
    return (
      <div className="main-page bg-accent relative flex min-h-screen flex-col">
          {currentUser.token ?
              <>
                  <Card className="m-5 h-full">
                      <Routes>
                          <Route path="/" element={getDefaultPage(currentUser.data.role)} />
                          <Route path={"teacher/list"} element={<TeachersList />} />
                          <Route path={"group/list"} element={<GroupList />} />
                          <Route path={"subject/list"} element={<SubjectList />} />
                          <Route path={"hometask/list"} element={<HometaskList />} />
                          <Route path={"study/list"} element={<StudyList />} />
                          <Route path={"logout"} element={<LogoutPage />} />
                      </Routes>
                  </Card>
                  <NavigationBar currentRole={currentUser.data.role} />
              </>
              : <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path={"login"} element={<LoginPage />} />
                  <Route path={"register"} element={<RegisterPage />} />
              </Routes>
          }

      </div>
  );
}

const getDefaultPage = (role: string) => {
    switch (role) {
        case "admin":
            return <Navigate to="teacher/list" />
        case "student":
            return <Navigate to="hometask/list" />
        case "teacher":
            return <Navigate to="subject/list" />
        default:
            return <Navigate to='logout' />
    }
}

export default App;
