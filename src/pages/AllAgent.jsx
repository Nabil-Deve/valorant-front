import React, { useState, useEffect } from "react";
import axios from "axios";

function AllAgent() {
  const [agents, setAgents] = useState([]); // On stocke tous nos agents.

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:2110/agent/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  // On affiche notre agent
  return (
    <div>
      <h2>All Agents</h2>
      {agents.map((agent) => (
        <div key={agent._id}>
          <h3>{agent.nomAgent}</h3>
          <p>Description: {agent.descriptionAgent}</p>
          <img src={agent.imageAgent} alt={`Image of ${agent.nomAgent}`} />
          <p>
            Abilities:{" "}
            {/*Si l'agent abilité est un array, on va faire un map sur toutes les abilités et on l'affiche comme string, Si l'agent n'a pas d'abilités, on affiche 'No abilities' */}
            {Array.isArray(agent.abilite)
              ? agent.abilite.map((ability) => ability.name).join(", ")
              : "No abilities"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AllAgent;
