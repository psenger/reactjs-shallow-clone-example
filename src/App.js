import "./styles.css";
import React from "react";

const Child = ({ doSomething, value }) => (
  <button onClick={() => doSomething(value)}>Click Me</button>
);

function Parent({ children }) {
  function doSomething(value) {
    console.log("doSomething called by child with value:", value);
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (
      child &&
      typeof child.type !== "string" &&
      React.isValidElement(child)
    ) {
      return React.cloneElement(child, { doSomething });
    }
    return child;
  });

  return <div>{childrenWithProps}</div>;
}

export default function App() {
  return (
    <div className="App">
      <Parent>
        <Child value={1} />
        <Child value={2} />
        <div>
          <div>
            <Parent>
              <Child value={3} />
            </Parent>
          </div>
        </div>
      </Parent>
    </div>
  );
}
