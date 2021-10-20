import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ModalContext = createContext();

const ModalProvider = (props) => {
  // state del provider

  const [idReceta, guadarIdReceta] = useState(null);
  const [infoReceta, guardarReceta] = useState({});

  // una vez que tenemos una receta llamar a la api
  useEffect(() => {
    if (!idReceta) return;
    const obtenerReceta = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
      const resultado = await axios.get(url);
      guardarReceta(resultado.data.drinks[0]);
    };
    obtenerReceta();
  }, [idReceta]);
  return (
    <ModalContext.Provider
      value={{
        infoReceta,
        guadarIdReceta,
        guardarReceta,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
