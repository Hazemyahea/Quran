import { useContext } from "react";
import { LightContext } from "../LightContext";
function MainNav() {
  const { mode, ChangeTheme } = useContext(LightContext);
  return (
    <nav
      className={`p-5 shadow-lg w-full flex justify-between ${
        mode == "dark" ? "dark" : null
      }`}
    >
      <div>
        <span>إستمع الى القران الكريم</span>
      </div>
      <div>
        <span onClick={ChangeTheme} className=" cursor-pointer">
          {mode == "light" ? (
            <img className=" w-8" src="images/idea.png" alt="" srcset="" />
          ) : (
            <img
              className=" w-8"
              src="images/light-bulb.png"
              alt=""
              srcset=""
            />
          )}
        </span>
      </div>
    </nav>
  );
}

export default MainNav;
