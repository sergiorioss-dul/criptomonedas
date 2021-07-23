import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';


const Label = styled.label`
    font-family: 'Bebas Neue',cursive;
    color: #FFFF;
    text-transform: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display:block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    --webkit-appearance:none;
    border: none;
    font-size: 1.2rem;
`;


const useMoneda = (label,stateInicial,opciones) => {

    //States del hook

    const [ state, updateState ] = useState(stateInicial);

    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={ e => updateState(e.target.value)}
                value={state}
            >
                <option value=''>--Seleccione--</option>
                {
                    opciones.map(opcion =>(
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                    ))
                }
            </Select>
        </Fragment>
    );

    // retornar state, interfaz y func que modifica el state
    return [ state, Seleccionar, updateState];

}

export default useMoneda;