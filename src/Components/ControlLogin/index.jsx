import React, { useContext, useRef, useState, useEffect } from 'react'
import PlayMastersLogo from '../../assets/assetsComponents/PlayMastersLogo'
import { MyContext } from '../../Contexts/GetGameList'
import { AuthContext } from '../../Contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getDocs } from 'firebase/firestore'
import './styles.css'

const ControlLogin = () => {
  const { doLogin, setDoLogin, listFavorite, listCurrent, listWishlist, rate } = useContext(MyContext)
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signin, signup, createUser, setRefName, setRefEmail, setUserIsLogged, setSpinner } = useContext(AuthContext)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmitSignUp = async e => {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("A senha não confere. Tente novamente.")
    }

    if (passwordRef.current.value.length < 5) {
      return setError("A sua senha deve possuir no mínimo 6 digitos.")
    }

    try {
      setError('')
      createUser(nameRef.current.value, emailRef.current.value, listFavorite, listCurrent, listWishlist, rate)
      await signup(emailRef.current.value, passwordRef.current.value)
      await signin(emailRef.current.value, passwordRef.current.value)
      setUserIsLogged(true)
      setSpinner(true)
      setTimeout(() => {
        navigate('/')
        window.location.reload()
        setSpinner(false)
      }, 1500)
      setRefName(nameRef.current.value)
    } catch {
      setError("Falha na criação da conta.")
    }

  }

  const handleSubmitSignIn = async e => {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await signin(emailRef.current.value, passwordRef.current.value)
      setUserIsLogged(true)
      setSpinner(true)
      setTimeout(() => {
        navigate('/')
        setSpinner(false)
        window.location.reload()
      }, 2000)
    } catch {
      setError("Falha no login. Verifique seu e-mail ou senha")
    }
    setLoading(false)
  }

  const handleSwitchScreen = () => {
    emailRef.current.value = ''
    passwordRef.current.value = ''
    setDoLogin(!doLogin)
    setError('')
  }

  const SignIn = () => {
    return (
      <section className="signin-form__container">
        <PlayMastersLogo />

        <p className='signin-form-title'>Login</p>
        <div className="signin-form-wrapper">
          {error
            ? <span className="form-error-msg">{error}</span>
            : <p className="sub-greenting">Bem-vindo de volta!</p>}
          <form onSubmit={(e) => {
            handleSubmitSignIn(e)
          }} action="" className="signin-form">
            <div className="form-field-wrapper">
              <div className="form-field">
                <label htmlFor="email">E-mail</label>
                <input ref={emailRef} onChange={(e) => {
                  setRefEmail(e.target.value)
                }} type="email" name='email' placeholder='Digite seu e-mail' required />
              </div>

              <div className="form-field">
                <label htmlFor="password">Senha</label>
                <input ref={passwordRef} type="password" name='password' placeholder='Digite sua senha' required />
              </div>

              <div className="options-form">
                <p className='opt-forget'>Esqueceu sua senha?</p>
              </div>
            </div>

            <input disabled={loading} type="submit" value="Entrar" className='form-button' />
          </form>
        </div>

        <p className='signup-cta'>Não possui conta? <Link onClick={handleSwitchScreen} className='span ' to="/auth">Cadastre-se</Link></p>
      </section>
    )
  }

  const SignUp = () => {
    return (
      <section className="signin-form__container">
        <PlayMastersLogo />

        <p className='signin-form-title'>Cadastre-se</p>
        <div className="signin-form-wrapper">
          {error
            ? <span className="form-error-msg">{error}</span>
            : <p className="sub-greenting">Faça o seu cadastro</p>}
          <form onSubmit={handleSubmitSignUp} action="" className="signin-form">
            <div className="form-field-wrapper">

              <div className="form-field">
                <label htmlFor="name">Nome</label>
                <input ref={nameRef} type="text" name='name' placeholder='Digite o seu nome' />
              </div>

              <div className="form-field">
                <label htmlFor="email">E-mail</label>
                <input ref={emailRef} onChange={(e) => {
                  setRefEmail(e.target.value)
                }} type="email" name='email' placeholder='Digite seu e-mail' required />
              </div>

              <div className="form-field">
                <label htmlFor="password">Senha</label>
                <input ref={passwordRef} type="password" className={error ? `input-alert` : null} name='password' placeholder='Digite uma senha' required />
              </div>

              <div className="form-field">
                <label htmlFor="confirm-password">Confirme a sua senha</label>
                <input ref={passwordConfirmRef} type="password" className={error ? `input-alert` : null} name='confirm-password' placeholder='Repita a mesma senha' required />
              </div>

            </div>

            <input disabled={loading} type="submit" value="Cadastrar" className='form-button' />
          </form>
          <p className='signup-cta signup'>Já possui uma conta? <span onClick={handleSwitchScreen} className='span'>Clique para entrar</span></p>

        </div>

      </section>
    )
  }


  return doLogin ? SignIn() : SignUp()
}

export default ControlLogin