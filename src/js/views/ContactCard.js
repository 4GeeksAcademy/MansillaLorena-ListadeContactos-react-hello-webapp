import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";


const ContactCard = ({ contact }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const handleDelete = () => {
    actions.deleteContact(contact.id); // Elimina el contacto por ID
  };
  const handleEdit = () => {
    navigate(`/editar-contacto/${contact.id}`); // Redirige a editar
  };
  return (
    <li className="list-group-item d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <img
          src="https://thispersondoesnotexist.com/"
          className="rounded-circle mr-3"
          style={{ width: "90px", height: "90px", marginRight: "15px" }}
        />
        <div>
          <h5>{contact.name}</h5>
          <p><FontAwesomeIcon icon={faPhone} /> {contact.phone}</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> {contact.email}</p>
          <p><FontAwesomeIcon icon={faLocationDot} /> {contact.address}</p>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <button onClick={handleEdit} className="btn btn-outline-dark mr-2" ><FontAwesomeIcon icon={faPenToSquare} /></button>
        <button type="button" className="btn btn-outline-dark mr-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <div className="modal fade" id={"exampleModal"} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">¿Estás seguro?</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                ¿Deseas eliminar este contacto?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>Si</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default ContactCard;