import { ToastContainer } from "react-toastify";
import MainRouter from "./components/MainRouter";

function App() {

  return (
    <>
      <MainRouter />

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </>
  );

}

export default App;