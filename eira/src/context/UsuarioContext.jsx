import { createContext } from "react"

export const usuario = JSON.parse(localStorage.getItem('usuario') || null) 

export const UsuarioContext = createContext(usuario)

