import { useState } from 'react'
import './styles/index.css';
import Button from './components/ui/Button';
import Select from './components/ui/Select';
import Input from './components/forms/Input';
import RegistroForm from './components/forms/RegistroForm';

function App() {
  // Puedes comentar lo de abajo si solo quieres ver el registro:
  // const [inputValue, setInputValue] = useState("");

  return (
    <>
      {/* Formulario de registro principal */}
      <RegistroForm />

      {/* Si quieres seguir probando los otros componentes, descomenta esto:
      <div style={{ display: 'flex', gap: '16px', background: '#171717', padding: '32px' }}>
        <Button variant="secondary">Registrarse</Button>
        <Button variant="primary">Iniciar Sesión</Button>
      </div>
      <div style={{ marginTop: '32px', background: '#171717', padding: '32px' }}>
        <Select
          options={[
            { value: 'opcion1', label: 'Opción 1' },
            { value: 'opcion2', label: 'Opción 2' },
            { value: 'opcion3', label: 'Opción 3' },
          ]}
        />
      </div>
      <div style={{ marginTop: '32px', background: '#171717', padding: '32px', maxWidth: '400px' }}>
        <Input
          label="Nombre"
          name="nombre"
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          error={inputValue.length < 3 ? "El nombre debe tener al menos 3 caracteres" : undefined}
        />
      </div>
      */}
    </>
  )
}

export default App
