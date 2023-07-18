import React from 'react'
import './styles.css'

const Spinner = ({ error, statusCodeValidation }) => {

  return (
    <div className="spiner-container">
      {!error ?
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
        : error && statusCodeValidation(error && error.status)
          ? <section className="loader-container err">
            <h2 className='error-msg'>O servidor falhou em responder, tente recarregar a página.</h2>
            <h3 className='error-status'>{error && error.status}</h3>
            <p className='error-text'>{error && error.statusText}</p>
            <button className='reload-btn' onClick={() => window.location.reload()}>Recarregar a página</button>
          </section>
          : error && error.ok
            ? <section className="loader-container err">
              <h2 className='error-msg'>O servidor não conseguirá responder por agora, tente voltar novamente mais tarde.</h2>
              <h3 className='error-status'>{error && error.status}</h3>
              <p className='error-text'>{error && error.statusText}</p>
              <button className='reload-btn' onClick={() => window.location.reload()}>Recarregar a página</button>
            </section>
            : null

      }
    </div>
  )
}

export default Spinner