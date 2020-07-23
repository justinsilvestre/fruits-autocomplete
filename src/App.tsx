import React, { useCallback, useState } from 'react';
import styled from 'styled-components'
import FruitInput from './FruitInput';
import { Fruit } from './fruits';

const Form = styled.form`
  max-width: 15rem;
  margin: 1em auto;
`
const FruitImageWrapper = styled.div`
  max-width: 15rem;
  margin: 1em auto 2em;
`
const FruitImg = styled.img`
  max-width: 100%;
`

const SubmitButton = styled.button`
  margin-left: auto;
  display: block;
`

function App() {
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null)
  const handleChangeFruit = useCallback(
    (selection: Fruit | null) =>
      setSelectedFruit(selection)
    , [])

  const [submittedFruit, setSubmittedFruit] = useState<Fruit | null>(null)
  const handleSubmitForm = useCallback((e) => {
    e.preventDefault()
    setSubmittedFruit(selectedFruit)
  }, [selectedFruit])

  return (
    <div>
      <Form onSubmit={handleSubmitForm}>
        <FruitInput label="Favorite fruit" initialSelectedItem={selectedFruit} onChange={handleChangeFruit} />
        <br />
        <SubmitButton>Submit</SubmitButton>
      </Form>
      {submittedFruit?.value && <FruitImageWrapper><FruitImg src={`https://keywordimg.com/420x320/${submittedFruit.value}`} alt={submittedFruit.value} /></FruitImageWrapper>}
    </div>
  );
}

export default App;

