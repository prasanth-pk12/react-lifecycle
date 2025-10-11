# 📘 React Hooks Lifecycle & Logging Demo

## 🎯 Purpose

This demo is built to help you **visualize how React hooks execute over time** — when they run, in what order, and how cleanup functions work. Use it to deepen your understanding of hooks like `useState`, `useEffect`, `useLayoutEffect`, `useMemo`, `useCallback`, `useRef`, `useReducer`, `useContext`, and more.

---

## 🔧 Hooks Covered & Behavior Summary

Below is a list of the primary built-in React hooks, what they do, when they run, and useful references & articles for each.

| Hook              | What It Does                                                                             | When / How It Runs                                                        | Example Log Messages                                                       | References / Articles                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useState`        | Holds local state in a functional component                                              | Runs during render. Updating it triggers re-render.                       | `useState -> count: X`                                                     | Official: **Built-in React Hooks** ([React][1]) <br> Article: *React Hooks: Learn about the most commonly used hooks* ([Medium][2])                                                      |
| `useReducer`      | Similar to state but with reducer (action dispatch) pattern                              | During render and when dispatch is called                                 | `useReducer -> state: Y` <br> `⚙️ useReducer running -> action: …`         | Official: Hooks API Reference ([React][3]) <br> Article: *React Hooks : What to use when ?* ([Medium][4])                                                                                |
| `useRef`          | Holds a mutable reference that persists across renders (does not cause re-renders)       | Always available; updates to `.current` don’t re-render                   | `useRef -> renderCount: Z`                                                 | StackOverflow: *Production use cases for useRef/useMemo/useCallback* ([Stack Overflow][5]) <br> Article: *React Hooks 2: useMemo, useCallback, useLayoutEffect …* ([Medium][6])          |
| `useMemo`         | Memoizes a computed value, recomputing only when dependencies change                     | During render (just before painting)                                      | `🧮 useMemo calculating doubleCount`                                       | Article: *React Hooks : Learn about the most commonly used hooks* ([Medium][2]) <br> Dev post: *How to Use useEffect, useContext, useRef, useCallback, and useMemo* ([DEV Community][7]) |
| `useCallback`     | Memoizes a callback function, so it doesn’t get redefined unless its dependencies change | During render                                                             | `🖱 useCallback triggered -> count: …`                                     | Article: *React Hooks 2: useMemo, useCallback…* ([Medium][6]) <br> Article: *React Hooks cheat sheet* ([LogRocket Blog][8])                                                              |
| `useLayoutEffect` | Runs synchronously *before painting* (after DOM mutations)                               | After render, before browser paints                                       | `🏗 useLayoutEffect (runs BEFORE paint)` <br> `🧹 useLayoutEffect cleanup` | Official: Legacy API reference (hooks) ([React][3]) <br> Article: *React Hooks 2: useMemo, useCallback, useLayoutEffect …* ([Medium][6])                                                 |
| `useEffect`       | Runs asynchronously *after the browser paints* and handles side effects                  | After render / after paint; cleanup runs before next effect or on unmount | `⚡ useEffect (runs AFTER paint)` <br> `🧼 useEffect cleanup`               | Official: Built-in React Hooks ([React][1]) <br> Article: *React Hooks: Learn about the most commonly used hooks* ([Medium][2])                                                          |
| `useContext`      | Subscribes to React Context and provides its current value                               | During render                                                             | `🎨 useContext -> theme: …`                                                | Official: Built-in React Hooks ([React][1]) <br> Article: *React Hooks : What to use when ?* ([Medium][4])                                                                               |

> ℹ️ In newer React versions, there are additional hooks (e.g. `useTransition`, `useDeferredValue`, `useId`, etc.). But the above are the most common and foundational ones. See the Hooks documentation for the full list. ([React][1])

---

## 🧾 Example Logs (When Running Demo)

Here’s a sample of what your console might show in a lifecycle, when you click a button to update `count`:

```
🧠 [Render Start] App Component  
useState -> count: 0  
useReducer -> state: 0  
useRef -> renderCount: 1  
🧮 useMemo calculating doubleCount  
🏁 [Render End] App Component  

🏗 useLayoutEffect (runs BEFORE paint)  
⚡ useEffect (runs AFTER paint)  

🎨 useContext -> theme: 🌙 Dark  
```

Then, when clicking a button to increment:

```
🖱 useCallback triggered -> count: 0  
🧹 useLayoutEffect cleanup  
🧼 useEffect cleanup  

🧠 [Render Start] App Component  
useState -> count: 1  
useReducer -> state: 0  
useRef -> renderCount: 2  
🧮 useMemo calculating doubleCount  
🏁 [Render End] App Component  

🏗 useLayoutEffect (runs BEFORE paint)  
⚡ useEffect (runs AFTER paint)  
```

And on unmount:

```
🧹 useLayoutEffect cleanup  
🧼 useEffect cleanup  
```

---

## 🛠 How to Use This Demo / Setup

1. Clone or download the repo containing this demo.
2. Inspect `App.js` (or similar) — it will be instrumented with `console.log` statements around each hook.
3. Run the app via `npm start` or `yarn start`.
4. Open the browser’s console and observe logs as the component mounts, updates, and unmounts.
5. Use the buttons to trigger state changes and see hook behavior in action.

---

## 📚 Helpful Links & Further Reading

* **React Official Hooks Reference** — the authoritative API docs for built-in hooks ([React][1])
* **Hooks API Reference (legacy)** — older React docs with broader context ([React][3])
* *React Hooks: Learn about the most commonly used hooks* (Medium article) ([Medium][2])
* *React Hooks cheat sheet: Best practices with examples* (LogRocket) ([LogRocket Blog][8])
* *Explaining all React Hooks with examples* (DEV Community) ([DEV Community][9])
* *How to Use useEffect, useContext, useRef, useCallback, and useMemo* (dev.to) ([DEV Community][7])

---

[1]: https://react.dev/reference/react/hooks?utm_source=chatgpt.com "Built-in React Hooks"
[2]: https://medium.com/%40piyushsingh0992/react-hooks-learn-about-the-most-commonly-used-hooks-like-usestate-useeffect-usecontext-fd300669e18f?utm_source=chatgpt.com "React Hooks: Learn about the most commonly used hooks ... - Medium"
[3]: https://legacy.reactjs.org/docs/hooks-reference.html?utm_source=chatgpt.com "Hooks API Reference - React"
[4]: https://medium.com/%40riyaroy2086/react-hooks-what-to-use-when-part-3-usecontext-useref-usereducer-usecallback-usememo-197982234946?utm_source=chatgpt.com "React Hooks : What to use when ? (Part-3 : useContext , useRef ..."
[5]: https://stackoverflow.com/questions/66429202/what-are-production-use-cases-for-the-useref-usememo-usecallback-hooks?utm_source=chatgpt.com "What are production use cases for the useRef, useMemo ..."
[6]: https://ccobo.medium.com/react-hooks-2-usememo-usecallback-uselayouteffect-useimperativehandle-usedebugvalue-custom-2bce548c034b?utm_source=chatgpt.com "React Hooks 2: useMemo, useCallback, useLayoutEffect ..."
[7]: https://dev.to/adii9/how-to-use-useeffect-usecontext-useref-usecallback-and-usememo-in-react-3an8?utm_source=chatgpt.com "How to Use useEffect, useContext, useRef, useCallback, and ..."
[8]: https://blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems/?utm_source=chatgpt.com "React Hooks cheat sheet: Best practices with examples"
[9]: https://dev.to/sergioamjr/explaining-all-react-hooks-with-examples-4jl1?utm_source=chatgpt.com "Explaining all React Hooks with examples - DEV Community"
