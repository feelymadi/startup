import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // if an email is submitted navigate to profile
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Login failed');
      return;
    }

    onLogin(data);
    navigate('/profile');
  }

  // same as submit but for create button
  async function handleCreate() {
    setError('');

    const response = await fetch('/api/auth/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Account creation failed');
      return;
    }

    onLogin(data);
    navigate('/profile');
  }

  return (
    <main className="container-fluid text-center py-4">
      <h1>Welcome to TuneChart</h1>
      {error && <p className="text-danger">{error}</p>}
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
          <button type="button" className="btn btn-create" onClick={handleCreate}>Create</button>
        </div>
      </form>
    </main>
  );
}
