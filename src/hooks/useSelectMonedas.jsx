import { useState } from "react"
import styled from "@emotion/styled";
import React from "react";

const Label = styled.label`
  color: #fff;
  font-family: "Lato", sans-serif;
  font-size: 24px;
  text-align: center;
  display: block;
  font-weight: 700;
  margin: 25px 0;
`;

const Select = styled.select`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 18px;
`;

function useSelectMonedas(label, opciones) {

    const [state, setState] = useState(' ')

  const SelectMonedas = () => (
    <>
      <Label>{label}</Label>
      <Select value = {state} onChange={e => setState(e.target.value)}>
        <option value="">Seleccione</option>
        {opciones.map((opcion) => (
          <option key={opcion.id} value={opcion.id}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </>
  );
  return [SelectMonedas];
}

export default useSelectMonedas;
