/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import "../src/index.css";
import Header from './Components/Header'
import Body from './HomePageContainer/Body'
import MainContainer from './HomePageContainer/MainContainer'

// Lazy load WatchPage
const WatchPage = lazy(() => import('./HomePageContainer/WatchPage'));

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Body />}>
              <Route index element={<MainContainer />} />
              <Route exact path="/watch"
                element={
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <WatchPage />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
