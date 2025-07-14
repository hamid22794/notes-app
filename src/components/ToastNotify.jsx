import { Toast } from "react-bootstrap";
import { useEffect, useState } from "react";

const ToastNotify = ({ show, message, onClose, variant = "success" }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
      <Toast
        show={visible}
        onClose={() => {
          setVisible(false);
          onClose();
        }}
        bg={variant}
      >
        <Toast.Header closeButton>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastNotify;
