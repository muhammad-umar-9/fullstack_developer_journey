# Introduction to React and Building Static Pages

## 1. Getting Started with React Rendering

First, learn how to import the `createRoot` function from `react-dom/client`. This is used to create a root for rendering React elements into the DOM.

- Pass a DOM element to `createRoot` (e.g., using `document.querySelector("#root")` or `document.getElementById("root")`).
- Use `root.render()` to display content on the screen.

**Example: Rendering Simple Text**
```jsx
import { createRoot } from "react-dom/client";

const root = createRoot(document.querySelector("#root"));
root.render(<p>Hello from the world of React!</p>);
```

**Example: Rendering an Unordered List**
```jsx
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <ul>
    <li>Super popular JS library</li>
    <li>Will help me be even more employable</li>
    <li>React has a pretty cool logo</li>
  </ul>
);
```

## 2. Local Setup with Vite

- Visit the Vite website (vitejs.dev) for setup instructions.
- Ensure Node.js and npm are installed. Check versions with:
  ```
  node -v
  npm -v
  ```
- Create a new project:
  ```
  npm create vite@latest
  ```
- Follow prompts for project name, framework (select React), and variant (e.g., JavaScript or TypeScript).

This sets up a modern React project with fast bundling via Vite.

## 3. Libraries vs. Frameworks

- **Libraries**: Collections of reusable code that reduce rewriting from scratch. You control the flow (e.g., React).
- **Frameworks**: Provide a predetermined architecture with specific patterns and boundaries (e.g., Next.js, which is a framework built on React).

React is a **library** for building web and native user interfaces. Next.js is a **framework** for React.

## 4. Why Choose React?

- Highest job demand.
- Largest ecosystem and community.
- Composable (build complex UIs from small pieces) and declarative (describe what the UI should look like).
- Active development by Meta and the open-source community.

## 5. Early Days of React: Using `React.createElement()`

In React's early versions, elements were created manually with `React.createElement()`. It takes three parameters:
1. Type of element (e.g., `"h1"`).
2. Props (attributes, e.g., `null` for none).
3. Children (content or nested elements).

**Example:**
```jsx
import { createElement } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(
  createElement("h1", null, "Hello from createElement!")
);
```

- Logging the element:
  ```jsx
  const reactElement = createElement("h1", null, "Hello from createElement!");
  console.log(reactElement);
  ```
  Output: An object like `{ type: 'h1', key: null, props: { children: 'Hello from createElement!' }, ... }`.

- Nested elements (can get messy):
  ```jsx
  const reactElement = createElement("h1", null, createElement("span", null, "I'm inside the span"));
  ```

## 6. Introduction to JSX

JSX simplifies creating elements by allowing HTML-like syntax in JavaScript. It's transpiled to `React.createElement()` calls under the hood.

**Example:**
```jsx
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
const reactElement = <h1>Hello from JSX!</h1>;

console.log(reactElement); // Still logs a React element object

root.render(reactElement);
```

## 7. Declarative vs. Imperative Programming

- **Imperative**: Step-by-step instructions (e.g., vanilla JS DOM manipulation).
  ```js
  const h1 = document.createElement("h1");
  h1.textContent = "This is imperative coding";
  h1.className = "header";
  document.getElementById("root").appendChild(h1);
  ```

- **Declarative**: Describe the desired outcome; React handles the "how".
  ```jsx
  root.render(<h1 className="header">Hello, React!</h1>);
  ```

## 8. Housekeeping: Rendering Multiple Elements

React requires a single parent element in `render()`. Use a wrapper like `<div>` if needed.

**Error-Prone Example (Multiple Siblings):**
```jsx
root.render(
  <img src="/src/assets/react-logo.png" />
  // Error: Cannot render multiple top-level elements
);
```

**Fixed with Wrapper:**
```jsx
root.render(
  <div>
    <img src="/src/assets/react-logo.png" />
    <h1>This is another element</h1>
  </div>
);
```
- Wrapper can be `<div>`, `<main>`, `<section>`, etc., based on semantics.

## 9. Building a Simple List: Fun Facts About React

**Example:**
```jsx
import { createRoot } from "react-dom/client";

const root = createRoot(document.querySelector("#root"));

root.render(
  <div>
    <img src="react-logo.png" width="40" alt="React logo" />
    <h1>Fun Facts About React</h1>
    <ul>
      <li>Was first released in 2013</li>
      <li>Was originally created by Jordan Walke</li>
      <li>Has well over 100K stars on GitHub</li>
      <li>Is maintained by Meta</li>
      <li>Powers thousands of enterprise apps, including mobile apps</li>
    </ul>
  </div>
);
```

## 10. Quiz on Basics

1. **Where does React put elements created in JSX when calling `root.render()`?**  
   Inside the DOM element selected (e.g., `<div id="root">`).

2. **What shows in console for `console.log(<h1>Hello world!</h1>)`?**  
   A JavaScript object representing the React element.

3. **Issue with rendering multiple parents?**  
   You can only render one parent element at a time (but it can have many children).

4. **Declarative vs. Imperative?**  
   Imperative: Step-by-step instructions. Declarative: Describe the end result.

5. **What does "composable" mean?**  
   Small pieces (components) combine to form larger UIs.

## 11. React Components

Components are functions returning JSX (UI elements). They make code reusable.

**Example:**
```jsx
function Page() {
  return (
    <ol>
      <li>React is popular, so I'll fit in with cool devs! 😎</li>
      <li>Knowing React boosts job prospects as a front-end dev.</li>
    </ol>
  );
}

root.render(<Page />);
```

**Challenge Solution: Full Page Structure**
```jsx
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

/**
 * Challenge: Add header with image, main with h1 and list, and footer.
 */
function Page() {
  return (
    <div>
      <header>
        <img src="react-logo.png" width="40" alt="React logo" />
      </header>
      <main>
        <h1>Reasons I'm excited to learn React</h1>
        <ol>
          <li>React is popular, so I'll fit in with cool devs! 😎</li>
          <li>Knowing React boosts job prospects as a front-end dev.</li>
        </ol>
      </main>
      <footer>
        <p>© 20xx stackdevExpert development. All rights reserved.</p>
      </footer>
    </div>
  );
}

root.render(<Page />);
```

## 12. Component Quiz

1. **What is a React component?**  
   A function returning React elements (UI).

2. **Issue with this code?**  
   ```jsx
   function MyComponent() {
     return <small>I'm tiny text!</small>;
   }
   ```
   Nothing wrong—it's valid.

3. **Issue with this code?**  
   ```jsx
   function Header() {
     return (
       <header>
         <img src="./react-logo.png" width="40px" alt="React logo" />
       </header>
     );
   }
   root.render(Header()); // Wrong: Should be <Header />
   ```
   Use JSX syntax: `<Header />`, not function call.

## 13. React Fragments

Fragments (`<Fragment>` or `<> </>`) wrap elements without adding extra DOM nodes.

**Example with Fragment:**
```jsx
import { Fragment } from "react";

function Page() {
  return (
    <Fragment>
      <header>
        <img src="react-logo.png" width="40px" alt="React logo" />
      </header>
      <main>
        <h1>Reasons I'm excited to learn React</h1>
        <ol>
          <li>React is popular, so I'll fit in with cool devs! 😎</li>
          <li>Knowing React boosts job prospects.</li>
        </ol>
      </main>
      <footer>
        <small>© 2024 Ziroll development. All rights reserved.</small>
      </footer>
    </Fragment>
  );
}
```
- Shorthand: Use `<> </>` instead of importing `Fragment`.

Without Fragment, wrappers like `<div>` add unnecessary nesting in the DOM.

## 14. Parent/Child Components

Break UI into reusable child components, composed in a parent.

**Child Components:**
```jsx
function Header() {
  return (
    <header>
      <img src="react-logo.png" width="40px" alt="React logo" />
    </header>
  );
}

function Main() {
  return (
    <main>
      <h1>Reasons I'm excited to learn React</h1>
      <ol>
        <li>React is popular, so I'll fit in with cool devs! 😎</li>
        <li>Knowing React boosts job prospects.</li>
      </ol>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <small>© 2024 Ziroll development. All rights reserved.</small>
    </footer>
  );
}
```

**Parent Component:**
```jsx
function Page() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

root.render(<Page />);
```
This improves readability and modularity.

## 15. Styling with Classes

Use `className` in JSX (instead of `class`).

**Challenge: Add Navigation**
```jsx
<nav>
  <ul>
    <li>Pricing</li>
    <li>About</li>
    <li>Contact</li>
  </ul>
</nav>
```
- Emmet shortcut: `nav>ul>li*3`.

React converts JSX to DOM elements. Style with CSS classes.

**Example with Classes:**
```jsx
<ul className="nav-list">
  <li className="nav-list-item">Pricing</li>
  <li className="nav-list-item">About</li>
  <li className="nav-list-item">Contact</li>
</ul>
```

**CSS (in index.css):**
```css
.header {
  display: flex;
  align-items: center;
}

.nav-list {
  list-style: none;
  display: flex;
}

.nav-list-item {
  margin-right: 10px;
  font-size: 1.1rem;
}
```

## 16. Organizing Components into Files

Move components to separate files (e.g., `Header.jsx`, `MainContent.jsx`, `Footer.jsx`) in a `components` folder, then import them.

**Example Structure:**
- `Header.jsx`: Export `Header` component.
- `Footer.jsx`: Export `Footer` component.
- `Main.jsx`: Export `Main` component.

**Main File (e.g., App.jsx):**
```jsx
import Header from "./Header";
import Footer from "./Footer";
import MainContent from "./Main";

function Page() {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  );
}
```

## 17. Project Setup Example: Fun Facts Page

Create `Main.jsx` and `Navbar.jsx` in `components/`, import into `App.jsx`.

**Main.jsx:**
```jsx
export default function Main() {
  return (
    <main>
      <h1>Fun facts about React</h1>
      <ul className="facts-list">
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 200K stars on GitHub</li>
        <li>Is maintained by Meta</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
    </main>
  );
}
```

**Navbar.jsx:**
```jsx
export default function Navbar() {
  return <nav>Navbar component here</nav>;
}
```

**App.jsx:**
```jsx
import Main from "./components/Main";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}
```

```

## Summary: Key Takeaways from the Lesson

- **Why React?** High demand, composable, declarative, active community.
- **Setup:** Use Vite for quick projects.
- **JSX:** Simplifies UI creation over `createElement()`.
- **Components:** Reusable functions for building UIs.
- **Styling:** Use `className` and CSS files.
- **Organization:** Split into files for modularity.
