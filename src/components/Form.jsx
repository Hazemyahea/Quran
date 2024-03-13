import { useEffect, useRef, useState, useReducer } from "react";
import Audio from "./Audio";
import Loading from "./Loading";
import { useContext } from "react";
import { LightContext } from "../LightContext";
function Form() {
  const { mode } = useContext(LightContext);
  const [reciter, setReciter] = useState([]);
  const [narration, setNarration] = useState("");
  const [sura, setSura] = useState([]);
  const [media, setMedia] = useState("j");
  const [server, setServer] = useState("");

  function LoadingReducer(loadingState, action) {
    switch (action.type) {
      case "reciter":
        return { text: action.payload, status: true };
      case "narration":
        return { text: action.payload, status: true };
      case "loadingDone":
        return { status: false };
      default:
        return loadingState;
    }
  }
  const [loadingState, dispatch] = useReducer(LoadingReducer, "");
  const reciterID = useRef();
  const suraID = useRef();
  useEffect(() => {
    async function getreciter() {
      dispatch({ type: "reciter", payload: "جاري تحميل بيانات القاريء" });
      const response = await fetch(
        "https://www.mp3quran.net/api/v3/reciters?language=Ar"
      );
      const data = await response.json();
      if (response.ok) {
        setReciter(data);
        dispatch({ type: "loadingDone" });
      }
    }
    getreciter();
  }, []);

  const handleReciterChange = async (event) => {
    dispatch({
      type: "narration",
      payload: "جاري تحميل الروايات الخاصه بالقاري",
    });
    const response = await fetch(
      `https://www.mp3quran.net/api/v3/reciters?language=Ar&reciter=${event.target.value}`
    );
    const data = await response.json();
    if (response.ok) {
      setNarration(data);
      dispatch({ type: "loadingDone" });
    }
  };

  const getSuraID = () => {
    let newID = suraID.current.value.padStart(3, 0);
    setMedia(`${server}${newID}.mp3`);
  };

  const handleNarrationChange = async (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const serverData = selectedOption.getAttribute("data-server"); //data-sever
    const surah_list = selectedOption.getAttribute("data-sor").split(","); //data-sever

    const response = await fetch(`https://mp3quran.net/api/v3/suwar`);
    const data = await response.json();
    const updatedArr = [];
    surah_list.forEach((surah_id) => {
      const surah = data.suwar.find((s) => s.id == surah_id);
      if (surah) {
        updatedArr.push(surah);
      }
    });

    if (response.ok) {
      setSura((pre) => updatedArr);
      setServer(serverData);
      setSuraList(surah_list);
    }
  };

  return (
    <div
      className={` p-4 rounded w-full max-w-4xl   mx-auto my-4 sm:my-8 md:my-12 lg:my-16 xl:my-20 ${
        mode == "dark" ? "bg-slate-950 " : "bg-white"
      }`}
    >
      {loadingState.status && <Loading text={loadingState.text} />}
      <form className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:justify-between items-center">
        {/* <label
          htmlFor="reciter"
          className="font-bold self-start sm:self-center"
        >
          اسم القاري
        </label> */}
        <select
          id="reciter"
          name="reciter"
          className="rounded-lg border-gray-300 border p-2 w-full sm:w-auto flex-grow"
          onChange={handleReciterChange}
          ref={reciterID}
        >
          <option>إختار القاري</option>
          {reciter.reciters &&
            reciter.reciters.map((reciter) => (
              <option key={reciter.id} value={reciter.id}>
                {reciter.name}
              </option>
            ))}
        </select>
        {/* <label
          htmlFor="narration"
          className="font-bold self-start sm:self-center"
        >
          الرواية
        </label> */}
        <select
          id="narration"
          name="narration"
          className="rounded-lg border-gray-300 border p-2 w-full sm:w-auto flex-grow"
          onChange={handleNarrationChange}
        >
          <option>اختار الرواية</option>
          {narration &&
            narration.reciters[0].moshaf.map((mos) => (
              <option
                key={mos.id}
                value={mos.id}
                data-server={mos.server}
                data-sor={mos.surah_list}
              >
                {mos.name}
              </option>
            ))}
        </select>
        {/* <label htmlFor="sura" className="font-bold self-start sm:self-center">
          السوره
        </label> */}
        <select
          id="sura"
          name="sura"
          ref={suraID}
          className="rounded-lg border-gray-300 border p-2 w-full sm:w-auto flex-grow"
        >
          <option>اختار السوره</option>
          {sura.map(
            (
              sur // استخدم sura مباشرةً
            ) => (
              <option key={sur.id} value={sur.id}>
                {sur.name}
              </option>
            )
          )}
        </select>
      </form>
      <button
        type="button"
        className="bg-blue-500  w-full text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-7"
        onClick={getSuraID}
      >
        أستمع
      </button>

      <div className="mt-4">
        <Audio media={media} />
      </div>
    </div>
  );
}

export default Form;
