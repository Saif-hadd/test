import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(res => setData(res.data))  // Réception des données de l'API
      .catch(err => console.error('Error:', err));  // Gestion de l'erreur
  }, []);

  return (
    <div>
      <h1>React - PostgreSQL</h1>
      {data ? (
        <ul>
          {data.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun utilisateur trouvé.</p>
      )}
    </div>
  );
}

export default App;
