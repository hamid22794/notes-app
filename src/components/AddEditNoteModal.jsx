import { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addNote, editNote } from "../features/notes/notesSlice";

const AddEditNoteModal = ({ show, onClose, noteToEdit, onSave }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (show) {
      setTitle(noteToEdit?.title || "");
    }
  }, [show, noteToEdit]);

  useEffect(() => {
    if (show && textareaRef.current) {
      textareaRef.current.focus();
      const len = title.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [show, title]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (noteToEdit) {
        dispatch(editNote({ id: noteToEdit.id, title }));
        onSave(true);
      } else {
        dispatch(addNote({ title }));
        onSave(false);
      }
      setTitle("");
      onClose();
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Note Content</Form.Label>
            <Form.Control
              ref={textareaRef}
              as="textarea"
              rows={5}
              placeholder="Enter your note here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {noteToEdit ? "Update" : "Save"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditNoteModal;
