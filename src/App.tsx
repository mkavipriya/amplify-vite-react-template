import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>Blockchain PoC</h1>
      <label>Enter CO2 Emission Value:
        <input type="text" />
      </label>
      <label>Enter Company Name:
        <input type="text" />
      </label>
      <button onClick={createTodo}>Add transaction to Blockchain</button>

    </main>
  );
}

export default App;
