import React, { useEffect,useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border:none;
    width:100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor:pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //State del listado de criptomonedas
    const [ listacripto,guardarCriptomonedas ] = useState([]);
    const [ error,guardarError ] = useState(false);


    const MONEDAS = [
        { codigo: 'USD', nombre:'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre:'Peso Mexicano' },
        { codigo: 'EUR', nombre:'Euro' },
        { codigo: 'GBP', nombre:'Libra Esterlina' }, 
        
    ]

    //Utilizar hook useMoneda
    const [ moneda,SelectMonedas] = useMoneda('Elige tu Moneda: ','',MONEDAS);

    //Utilizar hook useCriptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda: ','',listacripto);

    //Ejecutar llamado a la API
    useEffect(()=>{
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado= await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    },[])

    const cotizarMoneda = e =>{
        e.preventDefault();
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }
        //Pasar datos al componente principal
        guardarError(false);

        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >

            {
                error ? <Error mensaje='Todos los campos son obligatorios' /> : null
            }
            <SelectMonedas />
            <SelectCripto />
            <Boton 
                type="Submit"
                value="Calcular"
                onChange={ e => null}
            />

        </form> 
    );
}
 
export default Formulario;