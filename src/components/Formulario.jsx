import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';
import Error from './Error'; // Importa el nuevo componente de Error

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 10px;
  transition: background-color .3s ease;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = () => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false); // Nuevo estado para el error

  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
  const [cripto, SelectCriptos] = useSelectMonedas('Elige tu Criptomoneda', criptos);

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        const arrayCriptos = resultado.Data.map(cripto => ({
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }));

        setCriptos(arrayCriptos);
      } catch (error) {
        console.error("Error al consultar la API:", error);
      }
    };
    consultarAPI();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if ([moneda, cripto].includes('')) {
      setError(true); // Si hay un campo vacío, cambia el estado de error a 'true'
      return;
    }
    
    setError(false); // Si no hay campos vacíos, resetea el estado de error
    console.log("Moneda:", moneda, "Cripto:", cripto);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <SelectMonedas />
      <SelectCriptos />
      <InputSubmit type="submit" value="Cotizar" />
    </form>
  );
};

export default Formulario;