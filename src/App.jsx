/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import "../src/index.css";
import Header from './Components/Header'
import Body from './HomePageContainer/Body'
import MainContainer from './HomePageContainer/MainContainer'
import WatchPage from './HomePageContainer/WatchPage'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Body />}>
              <Route index element={<MainContainer />} />
              <Route exact path="/watch" element={<WatchPage />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
