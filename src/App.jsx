import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AirportHeader from './components/headerAirport/AirportHeader';
import BoardAir from './components/boardAir/BoardAir';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/login/Login';
import ResetLinkEmail from './components/login/components/resetLinkEmail/ResetLinkEmail';
import AdminPanel from './components/adminPanel/AdminPanel.jsx';
import PostTable from './components/adminPanel/components/PostTabele/PostTable.jsx';
import ProfileUser from './components/adminPanel/components/ProfileUser/ProfileUser.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AirportHeader />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/reset-password" element={<ResetLinkEmail />} />
          <Route path="/" element={<BoardAir />} />
          <Route path="/arrivals" element={<BoardAir type="arrivals" />} />
          <Route path="/departures" element={<BoardAir type="departures" />} />
          <Route path="/admin" element={<AdminPanel type="admin" />} />
          <Route path="/posts" element={<PostTable />} />
          <Route path="/profile" element={<ProfileUser />} type="profile" />
          <Route
            path="/arrivals/:date"
            element={<BoardAir type="arrivals" />}
          />
          <Route
            path="/departures/:date"
            element={<BoardAir type="departures" />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
