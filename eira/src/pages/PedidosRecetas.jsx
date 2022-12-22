import { Card, Container, Row, Col, Table } from 'react-bootstrap'
import * as ProfesionalesService from '../services/profesionales.service.js'
import { useState, useEffect, useContext } from 'react'
import { UsuarioContext } from "../context/UsuarioContext";

function PedidosRecetas() {
    const [pedidos, setPedidos] = useState({})
    const {usuarioLogueado} = useContext(UsuarioContext)

    useEffect(() => {
        ProfesionalesService.traerPedidosRecetas(usuarioLogueado._id)
        .then((resp) => setPedidos(resp))
    }, [])

    return(
        <main className='fondo-generico'>
            <section>
                <Container>
                    <Row>
                        <Col>
                            <Card className='shadow my-5'>
                                <Card.Body className='mx-3'>
                                    <h1 className='titulo mt-3'>Pedidos</h1>
                                    <Table hover responsive className="mt-4">
                                        <thead>
                                            <tr>
                                                <th>Paciente</th>
                                                <th>Obra Social</th>
                                                <th>N° de Afiliado</th>
                                                <th>Medicamento</th>
                                                {/* <th className='d-none d-md-table-cell'>Acciones</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {pedidos.recetas && pedidos.recetas.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado pedidos de recetas</td></tr>}
                                        {pedidos.recetas && pedidos.recetas.map((receta, i) =>
                                            <tr key={i}>
                                                <td>{receta.paciente}</td>
                                                <td>{receta.obraSocial}</td>
                                                <td>{receta.afiliado}</td>
                                                <td>{receta.medicamento}</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default PedidosRecetas