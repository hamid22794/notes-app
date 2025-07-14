import { Table, Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, setSearchTerm } from '../features/notes/notesSlice';

const NotesTable = ({ handleEdit, showToast }) => {
  const dispatch = useDispatch();
  const { notes, searchTerm } = useSelector((state) => state.notes);
  const { darkMode } = useSelector((state) => state.theme);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (noteId) => {
    dispatch(deleteNote(noteId));
    showToast('Note deleted successfully!');
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search notes"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </Form.Group>

      {searchTerm && filteredNotes.length === 0 ? (
        <Alert variant="info" className="text-center">
          No results found.
        </Alert>
      ) : (
        <Table striped bordered hover variant={darkMode ? 'dark' : 'light'} className="notes-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Content</th>
              <th style={{ width: '150px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.map((note, index) => (
              <tr key={note.id}>
                <td>{index + 1}</td>
                <td style={{ 
                  maxWidth: '500px',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}>
                  {note.title}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(note)}
                      className="flex-grow-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(note.id)}
                      className="flex-grow-1"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default NotesTable;