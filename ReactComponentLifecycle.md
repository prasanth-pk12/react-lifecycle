## 🧭 **React Component Lifecycle (Functional Components)**

```
┌────────────────────────────────────────────────────────────────────────────┐
│                            🧠 RENDER PHASE                                 │
│────────────────────────────────────────────────────────────────────────────│
│ React calls your component function.                                       │
│ → Should be PURE (same inputs → same output).                              │
│                                                                            │
│ ✅ Allowed:                                                               │
│   - Read props / state                                                     │
│   - Initialize state with pure logic                                       │
│   - Call useRef() (ref.current = null initially)                           │
│                                                                            │
│ ⚠️ Avoid:                                                                  │
│   - localStorage.getItem() (side effect)                                   │
│   - DOM access (document.querySelector, getBoundingClientRect, etc.)       │
│   - API calls / mutations                                                  │
│                                                                            │
│ 💡 If you need localStorage value here → use lazy initializer:             │
│   const [theme, setTheme] = useState(() => localStorage.getItem("theme")); │
└────────────────────────────────────────────────────────────────────────────┘
                      ↓
                      ↓  (React builds the virtual DOM)
                      ↓
┌────────────────────────────────────────────────────────────────────────────┐
│                           ⚙️ COMMIT PHASE                                  │
│────────────────────────────────────────────────────────────────────────────│
│ React compares Virtual DOM → Real DOM (Reconciliation).                    │
│ React updates real DOM and attaches refs.                                  │
│                                                                            │
│ ✅ At this point:                                                          │
│   - ref.current now points to DOM nodes                                    │
│                                                                            │
│ 🔹 Then React runs useLayoutEffect (synchronously, before paint)           │
│   |→ Perfect for:                                                          │
│     - Measuring DOM sizes                                                  │
│     - Reading layout or scroll                                             │
│     - DOM adjustments before paint (avoid flicker)                         │
│                                                                            │
│ Example:                                                                   │
│ useLayoutEffect(() => {                                                    │
│   const rect = ref.current.getBoundingClientRect();                        │
│   console.log("Width:", rect.width);                                       │
│ }, []);                                                                    │
└────────────────────────────────────────────────────────────────────────────┘
                      ↓
                      ↓  (Browser paints screen 🖼️)
                      ↓
┌────────────────────────────────────────────────────────────────────────────┐
│                           🌿 EFFECT PHASE                                  │
│────────────────────────────────────────────────────────────────────────────│
│ Browser has painted the UI — now React runs passive effects asynchronously │
│                                                                            │
│ ✅ useEffect runs now:                                                     │
│   |→ Safe for:                                                             │
│     - Reading/writing localStorage                                         │
│     - Fetching APIs                                                        │
│     - DOM interactions (focus, scroll)                                     │
│     - Subscriptions / timers                                               │
│                                                                            │
│ Examples:                                                                  │
│ useEffect(() => {                                                          │
│   localStorage.setItem("theme", theme); // save value                      │
│ }, [theme]);                                                               │
│                                                                            │
│ useEffect(() => {                                                          │
│   ref.current.focus(); // focus after paint                                │
│ }, []);                                                                    │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧠 Summary — When & What to Use

| Stage           | React Hook            | Timing                                 | Typical Use                                     | Notes                            |
| --------------- | --------------------- | -------------------------------------- | ----------------------------------------------- | -------------------------------- |
| 🧠 Render Phase | `useState(() => ...)` | Before first render                    | Read localStorage (initial)                     | Pure + avoids flicker            |
| ⚙️ Commit Phase | `useRef`              | During render → populated after commit | DOM handle                                      | `ref.current` valid after commit |
| ⚡ Before Paint  | `useLayoutEffect`     | After DOM update, before paint         | Measure DOM, layout reads/writes                | Prevents flicker                 |
| 🖼️ After Paint | `useEffect`           | After paint                            | LocalStorage write, API fetch, DOM focus/scroll | Async & safe                     |

---

### 💬 Mnemonic to remember:

> **“Ref → Layout → Effect”**
> Get a handle → Measure before paint → Work after paint

