import "../src/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./Components/Body";
import Header from "./Components/Header";
import { Provider } from "react-redux";
import store from "./utils/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Header />
          <Body />
          <Routes>
            <Route />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
