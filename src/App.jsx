import "./App.css";
import { LightContextProvider } from "./LightContext";
import Header from "./components/Header";
import MainNav from "./components/MainNav";

export default function App() {
  return (
    <LightContextProvider>
      <div className=" mx-5">
        <MainNav />
        <Header />
      </div>
    </LightContextProvider>
  );
}
