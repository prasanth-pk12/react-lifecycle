## 🧠 React’s Full Lifecycle (Functional Components)

When a React update happens (like state change or prop change), React goes through these **five phases**:

1. **Render Phase** — Compute the new virtual tree
2. **Reconciliation Phase** — Diff the old and new virtual trees
3. **Commit Phase** — Update the real DOM
4. **Layout Effects (`useLayoutEffect`)** — Run synchronously before paint
5. **Passive Effects (`useEffect`)** — Run asynchronously after paint

---

## 🔍 Step-by-Step Explanation

### 1️⃣ Render Phase (Virtual DOM Creation)

React calls your component functions to **create a new Virtual DOM tree**.

* It builds an *in-memory representation* (plain JS objects)
* No changes happen to the screen yet
* Components must be **pure functions**

```jsx
function Profile({ name }) {
  console.log("🧠 Render phase");
  return <h1>Hello, {name}</h1>;
}
```

This happens **every time state or props change.**

---

### 2️⃣ Reconciliation Phase (Diffing)

React compares:

* The **previous Virtual DOM tree**
* The **new Virtual DOM tree**

Then React calculates a **diff** — the minimal set of changes required to make the real DOM match the new tree.

For example:

| Old VDOM               | New VDOM               | Action           |
| ---------------------- | ---------------------- | ---------------- |
| `<h1>Hello, John</h1>` | `<h1>Hello, Jane</h1>` | Update text only |

This diffing algorithm is called **“Reconciliation.”**

> 🧩 Still virtual — the real DOM has not changed yet.

---

### 3️⃣ Commit Phase (Real DOM Update)

Now React takes the diff and **applies it to the actual browser DOM.**

* Updates or replaces elements
* Removes or adds nodes
* Updates attributes and text

After this step, the **DOM in memory = DOM on screen** (but paint hasn’t occurred yet).

During commit:

* React first runs **cleanup functions** of previous layout effects
* Then updates the real DOM
* Then runs new **`useLayoutEffect` setups**

---

### 4️⃣ Layout Effect Phase (`useLayoutEffect`)

Once the DOM is updated but *before the browser paints*, React runs all layout effects.

This is synchronous — React blocks the paint until your code finishes.
Good for reading or adjusting layout before the user sees it.

Example:

```jsx
useLayoutEffect(() => {
  console.log("⚡ useLayoutEffect (before paint)");
  console.log("div height:", ref.current.offsetHeight);
  ref.current.style.background = "yellow"; // change before paint
});
```

---

### 5️⃣ Paint + Passive Effect Phase (`useEffect`)

After React finishes layout effects and allows the browser to **paint the screen**,
it runs **passive effects** (`useEffect`) asynchronously.

Use this for:

* Fetching data
* Logging
* Setting up subscriptions
* Anything not layout-related

```jsx
useEffect(() => {
  console.log("🌿 useEffect (after paint)");
});
```

---

## 🧩 Full Example with Logs

```jsx
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";

export default function FullCycle() {
  const [count, setCount] = useState(0);
  const ref = useRef();

  console.log("🧠 Render phase");

  useLayoutEffect(() => {
    console.log("⚡ useLayoutEffect (before paint)");
    console.log("DOM text before paint:", ref.current.textContent);
    return () => console.log("⚡ cleanup useLayoutEffect");
  });

  useEffect(() => {
    console.log("🌿 useEffect (after paint)");
    return () => console.log("🌿 cleanup useEffect");
  });

  return (
    <div>
      <h1 ref={ref}>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

---

### 🪄 When You Click “Increment”:

Console log order:

```
🧠 Render phase                ← new Virtual DOM built
⚡ cleanup useLayoutEffect     ← old layout effect cleanup
🌿 cleanup useEffect           ← old passive effect cleanup
⚙️ (Reconciliation happens internally - diff old vs new VDOM)
⚡ useLayoutEffect (before paint)  ← DOM updated but before paint
🌿 useEffect (after paint)         ← after paint, async side effects
```

---

## 🧱 Full Phase Summary Table

| Phase               | What Happens                                         | Operates On | Can Run Side Effects?   | Hooks Involved        |
| ------------------- | ---------------------------------------------------- | ----------- | ----------------------- | --------------------- |
| **Render**          | React calls components, builds new Virtual DOM       | Virtual DOM | ❌ No                    | —                     |
| **Reconciliation**  | Compare old and new Virtual DOM to find minimal diff | Virtual DOM | ❌ No                    | —                     |
| **Commit**          | Apply diff to Real DOM                               | Real DOM    | ⚠️ Only cleanup allowed | Layout effect cleanup |
| **Layout Effects**  | Run synchronously before paint                       | Real DOM    | ✅ Yes (blocking)        | `useLayoutEffect`     |
| **Paint**           | Browser paints to screen                             | Browser UI  | —                       | —                     |
| **Passive Effects** | Run asynchronously after paint                       | —           | ✅ Yes (non-blocking)    | `useEffect`           |

---

### 🔁 Strict Mode Double Invocations (Dev Only)

In development, React Strict Mode will **run Render + Effects twice** to detect impure logic.

So you might see logs twice — that’s intentional to surface side effects.

---

### ✅ In Short

> **React’s full render lifecycle:**
>
> 🧠 **Render** → 🔍 **Reconcile (VDOM diff)** → ⚙️ **Commit (Real DOM update)** → ⚡ **useLayoutEffect (before paint)** → 🎨 **Browser paint** → 🌿 **useEffect (after paint)**

---
