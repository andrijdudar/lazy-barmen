import React, { useState } from 'react';
import './Login.css';
import useStore from '../../../StoreZustand';
import cn from 'classnames';


export const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  // const user = useStore((state) => state.user);
  // const setUser = useStore((state) => state.setUser);
  const formLogin = useStore((state) => state.formLogin);
  const setFormLogin = useStore((state) => state.setFormLogin);

  const handleLogin = () => {
    setFormLogin(!formLogin);
  }

  return (
    <div className="section">
      <div className="container-logo">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <button
                  type='button'
                  className={cn('span', { 'active': !isChecked })}
                  onClick={() => setIsChecked(false)}

                >
                  Увійти

                </button>
                <button
                  type='button'
                  className={cn('span', { 'active': isChecked })}

                  onClick={() => setIsChecked(true)}
                >
                  Реістрація
                </button>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
                checked={isChecked}
                onClick={() => setIsChecked(!isChecked)}
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Вхід</h4>
                        <div className="form-group">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Ваш Емейл"
                            id="logemail"
                            autocomplete="off"
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Ваш Пароль"
                            id="logpass"
                            autocomplete="off"
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <a href="#/" className="btn-login mt-4">Увійти</a>
                        <a
                          href="#/"
                          className="btn-login mt-4"
                        // onClick={() => { handleLogin() }}
                        >
                          Увійти через Google
                        </a>
                        <a
                          href="#/"
                          className="btn-login mt-4"
                          onClick={() => { handleLogin() }}
                        >
                          Пропустити
                        </a>
                        {/* <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p> */}
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Реістрація</h4>
                        <div className="form-group">
                          <input type="text" name="logname" className="form-style" placeholder="Ваше Імʼя" id="logname" autocomplete="off" />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input type="text" name="logname" className="form-style" placeholder="Ваше Прізвище" id="logLastName" autocomplete="off" />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input type="email" name="logemail" className="form-style" placeholder="Ваш Емейл" id="logemail" autocomplete="off" />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input type="password" name="logpass" className="form-style" placeholder="Ваш Пароль" id="logpass" autocomplete="off" />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <a href="#/" className="btn-login mt-4">
                          Зареєструватися
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
