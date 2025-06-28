// src/components/AuthModal.jsx
import { useState } from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";

const AuthModal = ({ onClose }) => {
  const [activeModal, setActiveModal] = useState("login"); // or "register"

  const switchToRegisterModal = () => setActiveModal("register");
  const switchToLoginModal = () => setActiveModal("login");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {activeModal === "login" && (
        <Login
          switchToRegisterModal={switchToRegisterModal}
          onClose={onClose}
        />
      )}
      {activeModal === "register" && (
        <Register
          switchToLoginModal={switchToLoginModal}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default AuthModal;
