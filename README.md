# 🧠 React Hooks Lifecycle & Logging Demo

### 🌐 Live Demo

🔗 **[https://react-lifecycle-virid.vercel.app/](https://react-lifecycle-virid.vercel.app/)**

---

## 🎯 Purpose

This project visualizes **how React hooks work and when they run** during the component lifecycle.
Each hook is instrumented with `console.log()` messages so you can clearly see the **execution order**, **cleanup timing**, and **dependencies** in action.

---

## ⚙️ Hooks Covered

| Hook                  | Description                                            | Lifecycle Timing                               | Example Logs                             | References                                                                                                                                                                                                            |
| --------------------- | ------------------------------------------------------ | ---------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`useState`**        | Manage local component state                           | Runs during render. Updates trigger re-render. | `🎯 useState -> count: 0`                | [React Docs](https://react.dev/reference/react/useState) · [Medium Article](https://medium.com/@piyushsingh0992/react-hooks-learn-about-the-most-commonly-used-hooks-like-usestate-useeffect-usecontext-fd300669e18f) |
| **`useReducer`**      | State management with reducer pattern                  | Runs on render and on `dispatch()`             | `⚙️ useReducer running -> action: inc`   | [React Docs](https://react.dev/reference/react/useReducer) · [Medium Guide](https://medium.com/@riyaroy2086/react-hooks-what-to-use-when-part-3-usecontext-useref-usereducer-usecallback-usememo-197982234946)        |
| **`useRef`**          | Stores mutable values across renders (no re-render)    | Always accessible                              | `🔗 useRef -> renderCount: 3`            | [React Docs](https://react.dev/reference/react/useRef)                                                                                                                                                                |
| **`useMemo`**         | Memoizes computed values                               | Runs when dependencies change                  | `🧮 useMemo calculating doubleCount`     | [React Docs](https://react.dev/reference/react/useMemo)                                                                                                                                                               |
| **`useCallback`**     | Memoizes callback functions                            | Runs when dependencies change                  | `🖱 useCallback triggered -> count: 2`   | [React Docs](https://react.dev/reference/react/useCallback)                                                                                                                                                           |
| **`useLayoutEffect`** | Runs *before paint* (synchronously after DOM mutation) | After render, before paint                     | `🏗 useLayoutEffect (runs BEFORE paint)` | [React Docs](https://react.dev/reference/react/useLayoutEffect)                                                                                                                                                       |
| **`useEffect`**       | Runs *after paint* for side effects                    | After render / after paint                     | `⚡ useEffect (runs AFTER paint)`         | [React Docs](https://react.dev/reference/react/useEffect)                                                                                                                                                             |
| **`useContext`**      | Access context values                                  | During render                                  | `🎨 useContext -> theme: 🌙 Dark`        | [React Docs](https://react.dev/reference/react/useContext)                                                                                                                                                            |

> 💡 Tip: You can open your **browser console** while interacting with the demo to see these logs in real time.

---

## 🧾 Example Console Output

### ▶️ On Mount

```
🧠 [Render Start] App Component
🎯 useState -> count: 0
🎯 useReducer -> state: 0
🔗 useRef -> renderCount: 1
🧮 useMemo calculating doubleCount
🏁 [Render End] App Component
🏗 useLayoutEffect (runs BEFORE paint)
⚡ useEffect (runs AFTER paint)
🎨 useContext -> theme: 🌙 Dark
```

### 🔁 On State Update

```
🖱 useCallback triggered -> count: 0
🧹 useLayoutEffect cleanup
🧼 useEffect cleanup
🧠 [Render Start] App Component
🎯 useState -> count: 1
🔗 useRef -> renderCount: 2
🧮 useMemo calculating doubleCount
🏁 [Render End] App Component
🏗 useLayoutEffect (runs BEFORE paint)
⚡ useEffect (runs AFTER paint)
```

### 🧹 On Unmount

```
🧹 useLayoutEffect cleanup
🧼 useEffect cleanup
```

---

## 🛠 Setup Instructions

1. Clone this repository:

   ```bash
   git clone https://github.com/prasanth-pk12/react-lifecycle.git
   ```
2. Navigate inside the project:

   ```bash
   cd react-lifecycle
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Run the app locally:

   ```bash
   npm run dev
   ```
5. Open your browser console and interact with the UI to watch hook logs in action.

---

## 📚 Recommended Reading

* [React Official Hooks Reference](https://react.dev/reference/react/hooks)
* [React Hooks Cheat Sheet (LogRocket)](https://blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems)
* [Explaining All React Hooks with Examples (DEV)](https://dev.to/sergioamjr/explaining-all-react-hooks-with-examples-4jl1)
* [How to Use useEffect, useContext, useRef, useCallback, and useMemo (DEV)](https://dev.to/adii9/how-to-use-useeffect-usecontext-useref-usecallback-and-usememo-in-react-3an8)
* [React Hooks: Learn About the Most Commonly Used Hooks (Medium)](https://medium.com/@piyushsingh0992/react-hooks-learn-about-the-most-commonly-used-hooks-like-usestate-useeffect-usecontext-fd300669e18f)

---

## 👨‍💻 Author

Built by **Prasanth P** — passionate fullstack developer exploring React internals & lifecycle behavior.

🌐 Live project: [https://react-lifecycle-virid.vercel.app/](https://react-lifecycle-virid.vercel.app/)

---