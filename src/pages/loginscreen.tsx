function loginscreen() {
  return (
    <div className="loginscreen">
      <h1>1d20.</h1>
      <div className="loginscreen__content">
        <div className="loginscreen__content__welcome">
          Hello and welcome on 1d20, login or create a new account below.
        </div>
        <form className="loginscreen__content__form">
          <label className="loginscreen__content__form__label">
            Account name :
            <input
              className="loginscreen__content__form__label__text"
              type="text"
            />
          </label>
          <label className="loginscreen__content__form__label">
            Password :
            <input
              className="loginscreen__content__form__label__text"
              type="text"
            />
          </label>
          <input
            className="loginscreen__content__form__label__submit"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}

export default loginscreen;
