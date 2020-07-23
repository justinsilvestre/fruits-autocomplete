import React, { useCallback, useState } from 'react';
import styled from 'styled-components'
import FruitInput from './FruitInput';
import { Fruit } from './fruits';

const Form = styled.form`
  max-width: 15rem;
  margin: 5em auto;
`
const FruitImg = styled.img`
  max-width: 100%;
  height: auto;
`

function App() {
  const [fruit, setFruit] = useState<Fruit | null>(null)
  const handleChangeFruit = useCallback(
    (selection: Fruit | null) =>
      setFruit(selection)
    , [])

  const handleSubmitForm = useCallback((e) => { e.preventDefault() }, [])

  return (
    <div>
      <Form onSubmit={handleSubmitForm}>
        <FruitInput label="Favorite fruit" initialSelectedItem={fruit} onChange={handleChangeFruit} />
        <br />
        {fruit && <FruitImg src={`https://keywordimg.com/420x320/${fruit.value}`} />}
      </Form>
    </div>
  );
}

export default App;

