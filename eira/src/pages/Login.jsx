import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import * as authService from "../services/auth.service.js"

function LoginForm({onLogin}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
      
        authService.login(email, password)
        .then((resp) => {
            console.log(resp)
           return onLogin(resp)
        })
        .catch(err=>setError(err.message))
    }


    return (
        <section className="container py-3">
            <div className="row justify-content-center align-items-center m-3 m-lg-0">
                <div className="col-12 col-lg-4 card rounded-3 card-login">
                <div className="w-100 px-lg-5 py-lg-4 p-4 ">
                    <h1 className="font-weight-bold mb-4 text-center">Login</h1>
                    <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="password" name="password" autoComplete="on" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-form w-100">Iniciar Sesión</button>
                            <div className="text-center">
                                <Link to="/olvideContrasena">¿Olvidaste tu contraseña?</Link>
                            </div>
                        </form>
                    <div className="col-12 mt-5 justify-content-center">
                        <p>¿No tenes cuenta? <Link to="/registro">registrate</Link></p>

                    </div>

                    </div>
                        {error && <p>{error}</p>}
                </div>
            </div>
        </section>
    )
}

export default LoginForm