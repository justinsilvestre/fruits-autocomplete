import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import FruitInput from './FruitInput';
import { useSelect } from 'downshift';
import { Fruit } from './fruits';

function App() {
  const [fruit, setFruit] = useState<Fruit | null>(null)
  const handleChangeFruit = useCallback(
    (selection: Fruit | null) =>
      setFruit(selection)
    , [])

  const handleSubmitForm = useCallback((e) => { e.preventDefault() }, [])

  return (
    <div className="App">
      <form onSubmit={handleSubmitForm}>
        <FruitInput label="Favorite fruit" initialSelectedItem={fruit} onChange={handleChangeFruit} />
        <br />
        {fruit ? `You selected "${fruit.value}".` : 'Please make a selection.'}
      </form>
    </div>
  );
}

export default App;

