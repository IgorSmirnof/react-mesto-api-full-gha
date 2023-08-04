import { useState } from 'react';

function AuthForm({
  title,
  children,
  handleSubmit,
  textOfButton
}) {
  
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });

  function onSubmit(e) {
    const { email, password } = formValue;
    handleSubmit(e, password, email)
  }
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormValue({
      ...formValue,
      [name]: value
    })
  };

  return (
    <div className="entry-form" >

      <h2 className="entry-form__title"> {title} </h2>

      <form className="entry-form__form" onSubmit={onSubmit}>
        <input
          required
          type="email"
          name="email"
          minLength={5}
          id="email-input"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          className="entry-form__input"
        />
        <input
          required
          minLength={6}
          // type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          className="entry-form__input"
        />
        <button className="entry-form__submit button" type="submit"> {textOfButton} </button>
      </form>
      {children}

    </div>
  );
};

export default AuthForm;
