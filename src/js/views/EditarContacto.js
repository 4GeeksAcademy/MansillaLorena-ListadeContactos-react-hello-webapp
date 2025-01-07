import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";


const EditarContacto = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  useEffect(() => {
    console.log(params.contactId);
    const selectedContact = store.contacts.find(contact => contact.id == params.contactId);
    if (selectedContact) {
      setContact(selectedContact); // Cargar datos en el formulario
    }
  }, [params.contactId, store.contacts]);
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.updateContact(contact); // Actualiza el contacto
    navigate("/"); 
  };
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="jumbotron p-4 shadow rounded">
        <h1 className="display-4">Editar Contacto</h1>
        <form onSubmit={handleSubmit}>
          <input
            class="form-control"
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            placeholder="Nombre Completo"
          />
          <input
            class="form-control"
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="Correo Electrónico"
          />
          <input
            class="form-control"
            type="tel"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            placeholder="Teléfono"
          />
          <input
            class="form-control"
            type="text"
            name="address"
            value={contact.address}
            onChange={handleChange}
            placeholder="Dirección"
          />
          <button type="submit" className="btn btn-success mt-3">Guardar Cambios</button>
        </form>
        <Link to="/">
          <button className="btn btn-primary mt-3">Volver a contactos</button>
        </Link>
      </div>
    </div>
  );
};
export default EditarContacto;