import { useState } from 'react'
import './index.css'
import Button from './components/ui/Button';
import Select from './components/ui/Select';

function App() {

  return (
    <>
      {/* Aquí puedes probar los botones */}
      <div style={{ display: 'flex', gap: '16px', background: '#171717', padding: '32px' }}>
        <Button variant="secondary">Registrarse</Button>
        <Button variant="primary">Iniciar Sesión</Button>
      </div>

      {/* Aquí puedes probar el Select */}
      <div style={{ marginTop: '32px', background: '#171717', padding: '32px' }}>
        <Select
          options={[
            { value: 'opcion1', label: 'Opción 1' },
            { value: 'opcion2', label: 'Opción 2' },
            { value: 'opcion3', label: 'Opción 3' },
          ]}
        />
      </div>
    </>
  )
}

export default App
