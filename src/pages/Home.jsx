import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import AddEditNoteModal from "../components/AddEditNoteModal";
import NotesTable from "../components/NotesTable";
import ToastNotification from "../components/ToastNotify";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { darkMode } = useSelector((state) => state.theme);

  const addNoteClick = () => {
    setNoteToEdit(null);
    setShowModal(true);
  };

  const editNote = (note) => {
    setNoteToEdit(note);
    setShowModal(true);
  };

  const noteSaved = (isEdit) => {
    setToastMessage(`Note ${isEdit ? "updated" : "added"} successfully.`);
    setShowToast(true);
    setShowModal(false);
  };

  return (
    <Container
      className={`py-4 ${darkMode ? "bg-dark text-white" : "bg-light"}`}
      style={{ minHeight: "90vh" }}
    >
      <h1 className="mb-3">Welcome to Notes App</h1>

      <Button variant="primary" onClick={addNoteClick} className="mb-4">
        Add Note
      </Button>

      <NotesTable
        handleEdit={editNote}
        showToast={(msg) => {
          setToastMessage(msg);
          setShowToast(true);
        }}
      />

      <AddEditNoteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        noteToEdit={noteToEdit}
        onSave={noteSaved}
      />

      <ToastNotification
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </Container>
  );
};

export default Home;
