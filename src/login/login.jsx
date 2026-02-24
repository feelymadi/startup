import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim() !== '') {
      onLogin({ email });
      navigate('/profile'); // redirect after login
    }
  }

return (
  <main className="container-fluid text-center py-4">
    <h1>Welcome to TuneChart</h1>
    <form
      className="p-4 border rounded shadow-sm mx-auto" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}
    >
      <div className="mb-3">
        <span>Email</span>
        <input
          type="text" name="email" placeholder="Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <span>Password</span>
        <input
          type="password" name="password" placeholder="Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center gap-3">
        <button type="submit" className="btn btn-login">Login</button>
        <button type="button" className="btn btn-create">Create</button>
      </div>
    </form>
  </main>
);
}
