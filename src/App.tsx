import './App.css';
import './globals.css'
import {Route, Routes, Navigate} from "react-router-dom";
import {LoginPage, NavigationBar, SubjectList, TeachersList} from "./pages";
import {Card} from "./components/ui";
import {HometaskList} from "./pages/teacher/HometaskList";
import {StudyList} from "./pages/teacher/StudyList";
import {GroupList} from "./pages/admin/GroupList";
import {useEffect, useState} from "react";
import {LogoutPage} from "./pages/login/LogoutPage";
import {isUserType, IUser, IUserData} from "./types";


function App() {
    const [currentUser, setCurrentUser] = useState<IUserData>({
        data: {
            role: "",
            fullname: "",
            email: ""
        },
        token: ""
    });

    useEffect(() => {
        if(currentUser.token && Object.keys(currentUser.data)) return;
        const token = localStorage.getItem("token");
        const data = localStorage.getItem("data");
        let parsedData:IUser;
        if(token && data && isUserType(JSON.parse(data))) {
            parsedData = JSON.parse(data);
            setCurrentUser({
                token, data: {
                    role: parsedData.role,
                    fullname: parsedData.fullname,
                    email: parsedData.email
                }
            })
        }
    }, [currentUser])
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
                          <Route path={"logout"} element={<LogoutPage setCurrentUser={setCurrentUser} />} />
                      </Routes>
                  </Card>
                  <NavigationBar currentRole={"admin"} />
              </>
              : <LoginPage setCurrentUser={setCurrentUser} />
          }

      </div>
  );
}

const getDefaultPage = (role: string) => {
    switch (role) {
        case "admin":
            return <Navigate to="teacher/list" />
        case "student":
            return <Navigate to="subject/list" />
        case "teacher":
            return <Navigate to="subject/list" />
        default:
            return <Navigate to='logout' />
    }
}

export default App;
