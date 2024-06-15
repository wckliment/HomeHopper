import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors({ credentials: "The provided credentials were invalid" });
        }
      });
  };

  const handleDemoLogin = () => {
    return dispatch(sessionActions.login({ credential: 'DemoUser', password: 'password' }))
      .then(closeModal);
  };

  const isDisabled = credential.length < 4 || password.length < 6;

  return (
    <div id="modal-content">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credentials && (
          <p className="error">{errors.credentials}</p>
        )}
        <button type="submit" disabled={isDisabled}>Log In</button>
        <button type="button" onClick={handleDemoLogin}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
