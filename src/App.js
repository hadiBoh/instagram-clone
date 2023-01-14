import { Routes, Route } from "react-router-dom";
import Layout from './Layout'
import Public from "./components/Public";
import DashboardLayout from "./components/DashboardLayout";
import PersistLogin from "./features/auth/PersistLogin";
import Path from "./Path";
import Profile from "./features/profile/Profile";
import Prefetch from "./components/Prefetch";
import PreventSigns from "./PreventSigns";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route element={<PreventSigns/>}>
              <Route index element={<Public />} />
            </Route>
          
            <Route path="/:username" element={<Path />}>
              
              <Route index element={<DashboardLayout />} />
              <Route path="/:username/:person" element={<Profile />} />
              <Route path="/:username/:profile" element={<Profile />} />
              <Route path="/:username/:profile/*" element={<h2>404 page does not exists!</h2>} />
              
            </Route>
            </Route>
          </Route>

        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
