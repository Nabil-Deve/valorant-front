import React, { useState } from "react";

function createAbility() {
  // useState : on met les variables qui peuvent changer.
  const [name, setName] = useState(""); // Chaque fois, on change de nom.
  const [description, setDescription] = useState("");
  const [typeAbility, setTypeAbility] = useState("");

  // Fonction qui va envoyer les données à notre backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // on utilise un formulaire pour envoyer des données. quand on clique sur le submit d'un formulaire, il recharge la page. Il prévient la recharge de la page.
    try {
      // Là où on envoie les doonées
      const response = await fetch(
        "http://localhost:2110/ability/createability",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description, typeAbility }),
        }
      );
      const data = await response.json(); // Dans la const data, on stocke la réponse de notre fetch.
      console.log(data); // On affiche dans la console, les datas envoyées
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/*Quand user tape une chose dans cet input, notre state va garder ce que le user a écrit */}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        value={typeAbility}
        onChange={(e) => setTypeAbility(e.target.value)}
      />
      <button type="submit">Create ability</button>
    </form>
  );
}
export default createAbility;
