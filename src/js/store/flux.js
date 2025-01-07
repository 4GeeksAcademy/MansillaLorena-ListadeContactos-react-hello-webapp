const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
        },
        actions: {
            // Acción para obtener los contactos desde la API (GET)
            getContacts: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/agendas/MansillaLorena/contacts`);
                    const data = await response.json();
                    if (response.ok) {
                        setStore({ contacts: data.contacts });
                    } else {
                        if (response.status === 404) {
                            getActions().createAgenda();
                        }
                        console.error("Error al obtener los contactos");
                    }
                } catch (error) {
                    console.error("Error al obtener los contactos", error);
                }
            },

            // Crear (POST)
            createAgenda: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/contact/agendas/MansillaLorena`, {
                        method: "POST",
                    });
                    if (response.ok) {
                        console.log("Se creó la agenda");
                    } else {
                        console.error("Error al crear la agenda");
                    }
                } catch (error) {
                    console.error("Error al crear la agenda", error);
                }
            },

            // Agregar (POST)
            addContact: async (contact) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/agendas/MansillaLorena/contacts`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: contact.name,
                            email: contact.email,
                            phone: contact.phone,
                            address: contact.address,
                        })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setStore({ contacts: [...getStore().contacts, data] });
                        return true;
                    } else {
                        console.error("Error al crear el contacto");
                        return false;
                    }
                } catch (error) {
                    console.error("Error al crear el contacto", error);
                    return false;
                }
            },

            // Modificar contacto existente (PUT)
            updateContact: async (updatedContact) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/agendas/MansillaLorena/contacts/${updatedContact.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: updatedContact.name,
                            email: updatedContact.email,
                            phone: updatedContact.phone,
                            address: updatedContact.address,
                        })
                    });
                    if (response.ok) {
                        // Recarga la lista de contactos
                        getActions().getContacts();
                    } else {
                        console.error("Error al actualizar el contacto");
                    }
                } catch (error) {
                    console.error("Error al actualizar el contacto", error);
                }
            },

            // Eliminar contacto (DELETE)
            deleteContact: async (id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/agendas/MansillaLorena/contacts/${id}`, {
                        method: "DELETE"
                    });
                    if (response.ok) {
                        getActions().getContacts();
                    } else {
                        console.error("Error al eliminar el contacto");
                    }
                } catch (error) {
                    console.error("Error al eliminar el contacto", error);
                }
            }
        }
    };
};

export default getState;
