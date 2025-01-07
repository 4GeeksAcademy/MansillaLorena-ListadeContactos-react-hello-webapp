import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
const NuevoContacto = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  // Enviar el nuevo contacto a la API (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando contacto:", contact);
    const response = await actions.addContact(contact)
    if (response) {
      navigate("/")
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="jumbotron p-4 shadow rounded" style={{ width: '100%', maxWidth: '500px' }}>
        <h1 className="display-4">Nuevo contacto</h1>
        <form onSubmit={handleSubmit}>
          <input
            class="form-control"
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            class="form-control"
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
          <input
            class="form-control"
            type="tel"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            placeholder="Enter phone"
          />
          <input
            class="form-control"
            type="text"
            name="address"
            value={contact.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
          <button type="submit" className="btn btn-primary mt-3">Guardar</button>
        </form>
        <Link to="/">
          <button className="btn btn-secondary mt-3">Volver a contactos</button>
        </Link>
        {/* Mostrar los contactos obtenidos */}
      </div>
    </div>
  );
};
export default NuevoContacto;