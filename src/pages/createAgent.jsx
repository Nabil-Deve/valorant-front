import React, { useEffect, useState } from "react"; // rfce avec ES7 , alt shift arrow down, cntr D, échap !important
import axios from "axios";

function createAgent() {
  const [nomAgent, setNomAgent] = useState("");
  const [descriptionAgent, setDescriptionAgent] = useState("");
  const [abilite, setAbilite] = useState(""); // On stocke le nom de nos abilités pour les afficher dans le FE
  const [imageAgent, setImageAgent] = useState("");
  const [abilities, setAbilities] = useState([]); // On stocke toutes les abilités de nos agents pour sélectionner les abilités dont on a besoin quand on créé un agent.

  // On utilise le useEffect car on a besoin que le fetch soit effectué juste une seule fois.
  useEffect(() => {
    // On va avoir toutes nos abilites
    const fetchAbilities = async () => {
      try {
        const response = await axios.get("http://localhost:2110/ability/all");
        setAbilities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAbilities(); // Il faut appeler cette fonction à la fin pour le useEffect.
  }, []); // Le useEffect va être effectué juste 1 fois car il y a le tableau vide. Il n'a pas de dépendances.

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Il va regarder notre LS et s'il y a un token, il va le stocker dans la const token.

    console.log(token);
    const response = await axios.post(
      "http://localhost:2110/agent/createagent",
      { nomAgent, descriptionAgent, abilite, imageAgent },
      { headers: { Authorization: `Bearer ${token}` } } // Dans les headers(paramètres de notre fetch), on envoie notre token pour que le BE sache qu'on est connecté.
    );
    console.log(response.data);
  };
  return (
    <div>
      <h2>Create Agent</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nom Agent:
          <input
            type="text"
            value={nomAgent}
            onChange={(e) => setNomAgent(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description Agent:
          <input
            type="text"
            value={descriptionAgent}
            onChange={(e) => setDescriptionAgent(e.target.value)}
          />
        </label>
        <br />
        <label>
          Abilite:
          {/*On fait une map sur toutes nos abilités pour donner au user la possiblité de sélectionner une abilité dont il a besoin*/}
          <select value={abilite} onChange={(e) => setAbilite(e.target.value)}>
            <option value="">Select an ability</option>
            {abilities.map((ability) => (
              <option key={ability._id} value={ability._id}>
                {ability.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Image Agent:
          <input
            type="text"
            value={imageAgent}
            onChange={(e) => setImageAgent(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Agent</button>
      </form>
    </div>
  );
}

export default createAgent;
