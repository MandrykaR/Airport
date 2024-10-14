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
          <Route path="/" element={<BoardAir />} />
          <Route path="/arrivals" element={<BoardAir type="arrivals" />} />
          <Route path="/departures" element={<BoardAir type="departures" />} />
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
