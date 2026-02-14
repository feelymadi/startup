import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div>    <h1>Welcome to TuneChart</h1>
    <form className="p-4 border rounded shadow-sm" style={{ maxWidth: '400px' }}>          <div className="mb-3">
            <span>Email</span>
            <input type="text" name="email" placeholder="Email" className="form-control" />
          </div>
          <div className="mb-3">
            <span>Password</span>
            <input type="password" name="password" placeholder="Password" className="form-control" />
          </div>
          <div className="d-flex justify-content-center gap-3">
            <button type="submit" className="btn btn-login">Login</button>
            <button type="submit" className="btn btn-create">Create</button>
          </div>
        </form>
        </div>
    </main>
  );
}