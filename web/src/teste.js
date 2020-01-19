import React, {Fragment, useState} from 'react';

// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Estado: Informações mantidas eplo componente (lembrar: imutalidade)
// Propriedade: Informações que um Componente PAI passa para um componente FILHO


function App() {
  //estado(variável e função)
  const [counter, setCounter] = useState(0)

  function increment(){

    //sempre que chamar a função setCounter, ele criará mais um contador
     setCounter(counter + 1)
  }

  return (
    //tag sem nomenclatura
    <Fragment>
      <h1>Contador: {counter}</h1>
      <button onClick={increment}>Incrementar</button>
    </Fragment>
  );
}

export default App;
