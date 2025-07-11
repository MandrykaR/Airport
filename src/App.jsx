import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import BoardAir from './components/boardAir/BoardAir';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/login/Login';
import ResetLinkEmail from './components/login/components/resetLinkEmail/ResetLinkEmail';
import AdminPanel from './components/adminPanel/AdminPanel.jsx';
import PostTable from './components/adminPanel/components/PostTable/PostTable.jsx';
import ProfileUser from './components/adminPanel/components/ProfileUser/ProfileUser.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import LastNews from './components/lastNews/LastNews.jsx';
import PageNews from './components/lastNews/components/pageNews/PageNews.jsx';
import AppLayout from './components/appLayout/AppLayout.jsx';
import EditUsers from './components/adminPanel/components/EditUser/EditUser.jsx';
import TablePostsAdmin from './components/adminPanel/components/tableAdmin/TableAdmin.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/auth/reset-password" element={<ResetLinkEmail />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPanel type="admin" />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="list-posts" replace />} />

              <Route path="create-news" element={<PostTable />} />
              <Route path="create-news/:id" element={<PostTable />} />

              <Route path="edit-user" element={<EditUsers />} />
              <Route path="profile-user" element={<ProfileUser />} />
              <Route path="list-posts" element={<TablePostsAdmin />} />
            </Route>

            <Route
              path="/posts"
              element={
                <PrivateRoute>
                  <PostTable />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileUser />
                </PrivateRoute>
              }
              type="profile"
            />

            <Route path="/" element={<BoardAir />} />
            <Route path="/arrivals" element={<BoardAir type="arrivals" />} />
            <Route
              path="/departures"
              element={<BoardAir type="departures" />}
            />
            <Route path="/lastNews" element={<LastNews type="lastNews" />} />
            <Route path="/news/:id" element={<PageNews type="pageNews" />} />
            <Route
              path="/arrivals/:date"
              element={<BoardAir type="arrivals" />}
            />
            <Route
              path="/departures/:date"
              element={<BoardAir type="departures" />}
            />
          </Routes>
        </AppLayout>
      </Router>
    </Provider>
  );
};

export default App;
