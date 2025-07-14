import { Button, Navbar as BsNavbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toggleTheme } from "../features/theme/themeSlice";
import { clearNotes } from "../features/notes/notesSlice";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearNotes());
    navigate("/login");
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <BsNavbar
      bg={darkMode ? "dark" : "light"}
      variant={darkMode ? "dark" : "light"}
    >
      <Container>
        <BsNavbar.Brand href="/">Notes App</BsNavbar.Brand>
        <BsNavbar.Toggle />
        <BsNavbar.Collapse className="justify-content-end">
          {isAuth && (
            <>
              <Form.Check
                type="switch"
                id="theme-switch"
                label={darkMode ? "Dark Mode" : "Light Mode"}
                checked={darkMode}
                onChange={handleThemeToggle}
                className="me-3"
              />
              <Button
                variant={darkMode ? "outline-light" : "outline-dark"}
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </Button>
            </>
          )}
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
