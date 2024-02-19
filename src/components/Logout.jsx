import React from "react";

// C'est pour supprimer notre token de localstorage (mémoire du browser où on stocke toutes les infos du user : token, toutes nos infos sont déjà dans le token)
function Logout() {
  const handlelogout = () => {
    localStorage.removeItem("token");
  };
  return <button onClick={handlelogout}>Log out </button>;
}

export default Logout;
