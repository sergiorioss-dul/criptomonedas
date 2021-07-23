import React, { useState,useEffect }from 'react';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px){
    display:grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2 rem;
  }
`;

const Footer = styled.footer`
  text-align:center;
  color: white;
  font-family: 'Bebas Neue',cursive;
  font-size: 20px;
`;

const Div = styled.div`
    padding-top:200px;
    padding-left:60px;
    text-align: center;
`;

  const Heading = styled.h1`
    font-family: 'Bebas Neue',cursive;
    color: #FFFF;
    text-align: left;
    font-weight: 700;
    font-size: 50px;
    margin-bottom: 50px;
    margin-top:80px;

    &::after{
      content:'';
      width: 100px;
      height: 6px;
      background-color: #66A2FE;
      display:block;
    }

  `;


function App() {

  //States

  const [ moneda,guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptomoneda] = useState('');
  const [ resultado,guardarResultado ] = useState({});
  const [ cargando,guardarCargando ] = useState(false);

  useEffect(()=> {

    const cotizarCripto = async () =>{
      if(moneda === '')return;
      //consultar API
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);
      //mostrar spinner
      guardarCargando(true);
      setTimeout(()=>{
        guardarCargando(false);
        //GuardarCotizacion
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      },3000)

    }
    cotizarCripto();
    
  },[moneda,criptomoneda]);

  //Mostrar spinner o resultado

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado = {resultado}/>

  return (
    <>
      <Contenedor>
        <div>
          <Heading>Cotiza Criptomonedas en tiempo real</Heading>
          <Formulario
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
          />
         
        </div>
        <Div>
            {
              componente
            }
        </Div>
      </Contenedor>
              <Footer>
              <p>Sergio Rios 2020 @ Todos los derechos reservados</p>
            </Footer>
      </>
  );
}

export default App;
