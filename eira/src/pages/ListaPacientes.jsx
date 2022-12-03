import {  useState } from 'react'

import ListadoPacientes from '../components/ListadoPacientes'

function ListaPacientes({activarMensajes}) {
    return (
        <main>
            <button onClick={() => activarMensajes()}>token</button>
            <ListadoPacientes />
        </main>
    )
}

export default ListaPacientes