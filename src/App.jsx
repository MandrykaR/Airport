import React from 'react';
import AirportHeader from './components/headerAirport/AirportHeader';
import BoardAir from './components/boardAir/BoardAir';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <AirportHeader />
      <BoardAir />
    </Provider>
  );
};

export default App;
