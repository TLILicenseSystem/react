import React, { useState, useEffect } from "react";
import AppRoute from "./routes";
import { Row, Col } from "reactstrap";
import "./App.css";
import MainSidebar from "./themes/Sidebar/MainSidebar";
import Layout from "./themes/Layout";
import Login from "./themes/Login";
import { useHistory } from "react-router-dom";

import moment from "moment-timezone";
moment.tz.setDefault("Asia/Bangkok");

const App = (props) => {
  const [login, setLogin] = useState(sessionStorage.getItem("login"));

  const [locationKeys, setLocationKeys] = useState([]);
  const history = useHistory();

  useEffect(() => {
    console.log(history, "history");
  }, [history]);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          // Handle forward event
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);

          // Handle back event
        }
      }
    });
  }, [locationKeys]);
  return (
    // แบ่ง layout เป็น 2 คอลั่ม Sidebar กับ content ที่จะเปลี่ยนหน้าตาม Route ที่เรียก
    <div>{login === "Y" ? <Layout /> : <Login />}</div>
  );
};

export default App;

// const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => (
//       <Layout>
//         <Component {...props}></Component>
//       </Layout>
//     )}
//   ></Route>
// );

// import React from "react";
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// //import LoginPage from "./pages/Login/Login.searchURL";
// //import ExamRoundPage from "./pages/ExamRound/ExamRound";
// //  import HomePage from "./pages/Home/Home";
//   import CovidPage from "./pages/Covid/Covid";
// //  import UserPage from "./pages/User/User";
// //  import UserDetailPage from "./pages/User/UserDetail";
// import "./App.css";
// import {Spinner, Popup} from "./components/shared";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Spinner />
//       <Popup />
//       <Switch>

//       <Route path="/covid" render={(props) => <CovidPage {...props} />} />

//         { <Redirect from="*" to="/covid" /> }

//       </Switch>
//     </BrowserRouter>
//   );
// };

// export default App;

// import Header from './components/Header/Header'

// function App() {
//   return (
//     <div className="App">
//         <Header />
//     </div>
//   );
// }

// export default App;

//---------------------------HAVE SIDEBAR----------------------------
// import ExamRoundPage from "./pages/ExamRound/ExamRound";
// import './App.css';
// import Sidebar from './components/Sidebar/Sidebar';

// import Overview from './pages/License/Overview';
// import { Setting, ExamRound, ExamOrganier, ExamRegion, ExamLocation,  ExamSchedule} from './pages/License/Setting';
// // import Team from './pages/License/Team';
// import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// function App() {
//   return (
//     <BrowserRouter>
//       <Sidebar />
//       <Switch>
//         <Route path='/overview' exact component={Overview} />
//         <Route path='/setting' exact component={Setting} />
//         <Route path='/setting/examRound' exact component={ExamRound} />
//         <Route path='/setting/examOrganier' exact component={ExamOrganier} />
//         <Route path='/setting/examRegion' exact component={ExamRegion} />
//         <Route path='/setting/examLocation' exact component={ExamLocation} />
//         <Route path='/setting/examSchedule' exact component={ExamSchedule} />

//       </Switch>
//     </BrowserRouter>
//   );
// }

// export default App;

// import React from 'react';
// // import logo from './logo.svg';
// import './App.css';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import ListExamroundComponent from './components/ListUserComponent';
// import HeaderComponent from './components/HeaderComponent';
// import FooterComponent from './components/FooterComponent';
// import CreateExamroundComponent from './components/CreateExamroundComponent';
// import ViewExamroundComponent from './components/ViewExamroundComponent';

// function App() {
//   return (
//     <div>
//         <Router>
//               <HeaderComponent />
//                 <div className="container">
//                     <Switch>
//                           <Route path = "/" exact component = {ListExamroundComponent}></Route>
//                           <Route path = "/employees" component = {ListExamroundComponent}></Route>
//                           <Route path = "/add-employee/:id" component = {CreateExamroundComponent}></Route>
//                           <Route path = "/view-employee/:id" component = {ViewExamroundComponent}></Route>
//                           {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
//                     </Switch>
//                 </div>
//               <FooterComponent />
//         </Router>
//     </div>

//   );
// }

// export default App;
