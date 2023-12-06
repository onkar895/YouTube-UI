import "../src/index.css"
import Body from "./Components/Body"
import Header from "./Components/Header"
import { Provider } from "react-redux"
import store from "./utils/store"


function App() {

  return (
    <>
      <Provider store={store}
      >
        <div>
          <Header />
          <Body />

          {
            /* HEADER
            BODY
              Sidebar
                MenuItems
            MainContainer
              ButtonList
              VideoContainer
                VideoCard */
          }
        </div>
      </Provider>

    </>
  )
}

export default App
