import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AirportHeader from './components/headerAirport/AirportHeader';
import BoardAir from './components/boardAir/BoardAir';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AirportHeader />
        <Routes>
          <Route path="/flights" element={<BoardAir />} />
          <Route path="/flights/:type" element={<BoardAir />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
