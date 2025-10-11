import {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
  useRef,
  useReducer,
  useContext,
  createContext,
} from "react";
import "./App.css";

// --------------- Context Setup ----------------
const ThemeContext = createContext();

function App() {
  console.log("🧠 [Render Start] App Component");

  // ---------------- useState -------------------
  const [count, setCount] = useState(0);
  console.log("🎯 useState -> count:", count);

  // ---------------- useReducer ----------------
  const reducer = (state, action) => {
    console.log("⚙️ useReducer running -> action:", action);
    if (action.type === "inc") return state + 1;
    if (action.type === "dec") return state - 1;
    return state;
  };
  const [state, dispatch] = useReducer(reducer, 0);
  console.log("🎯 useReducer -> state:", state);

  // ---------------- useRef --------------------
  const renderCount = useRef(0);
  renderCount.current++;
  console.log("🔗 useRef -> renderCount:", renderCount.current);

  // ---------------- useMemo -------------------
  const doubleCount = useMemo(() => {
    console.log("🧮 useMemo calculating doubleCount");
    return count * 2;
  }, [count]);

  // ---------------- useCallback ----------------
  const handleClick = useCallback(() => {
    console.log("🖱 useCallback triggered -> count:", count);
    setCount((c) => c + 1);
  }, [count]);

  // ---------------- useLayoutEffect ----------------
  useLayoutEffect(() => {
    console.log("🏗 useLayoutEffect (runs BEFORE paint)");
    return () => console.log("🧹 useLayoutEffect cleanup");
  }, [count]);

  // ---------------- useEffect ----------------
  useEffect(() => {
    console.log("⚡ useEffect (runs AFTER paint)");
    return () => console.log("🧼 useEffect cleanup");
  }, [count, state]);

  console.log("🏁 [Render End] App Component");

  return (
    <ThemeContext.Provider value="🌙 Dark">
      <div style={{ padding: 20 }}>
        <h2>React Hooks Lifecycle Tracker</h2>
        <p>Count: {count}</p>
        <p>Double (useMemo): {doubleCount}</p>
        <p>Reducer State: {state}</p>

        <button onClick={handleClick}>Increment Count</button>
        <button onClick={() => dispatch({ type: "inc" })}>
          Increment Reducer
        </button>

        <Child />
      </div>
    </ThemeContext.Provider>
  );
}

// ---------------- useContext Example ----------------
function Child() {
  const theme = useContext(ThemeContext);
  console.log("🎨 useContext -> theme:", theme);
  return <p>Theme from Context: {theme}</p>;
}

export default App;
