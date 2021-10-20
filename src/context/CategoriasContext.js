import axios from "axios";
import { createContext, useState, useEffect } from "react";

// crear el context

export const CategoriasCantext = createContext();

// crear el provider( de donde van a salir los datos y las funciones)
// provider es donde se encuentran las funciones y los state
const CategoriasProvider = (props) => {
  // crear el state del context
  const [categorias, guardarCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
      const categorias = await axios.get(url);
      guardarCategorias(categorias.data.drinks);
    };
    obtenerCategorias();
  }, []);
  return (
    <CategoriasCantext.Provider value={{ categorias }}>
      {props.children}
    </CategoriasCantext.Provider>
  );
};

export default CategoriasProvider;
