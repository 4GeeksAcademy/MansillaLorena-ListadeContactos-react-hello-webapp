import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ContactCard from "./ContactCard";


export const Home = () => {
  const { store, actions } = useContext(Context); // Accede al store y las acciones
  return (
    <div className="container p-3">
      <h1 className="text-center">Lista de Contactos</h1>
      <Link to="/nuevo-contacto">
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-primary mb-3">Agregar contacto</button> </div>
      </Link>
      <ul className="list-group">
        {store.contacts && store.contacts.length > 0 ? (
          store.contacts.map((contact, index) => (
            <ContactCard key={index} contact={contact} />
          ))
        ) : (
          <p>No hay contactos disponibles</p>
        )}
      </ul>
    </div>
  );
};
export default Home;