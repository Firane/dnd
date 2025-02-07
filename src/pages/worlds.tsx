function worlds() {
  return (
    <div className="worlds">
      <h1>1d20.</h1>

      <div className="worlds__container">
        <div className="worlds__container__instructions">
          Now please enter your world name and the world's password. 🏰
        </div>
        <form className="worlds__container__form">
          <label className="worlds__container__form__label">
            World name :
            <input
              className="worlds__container__form__label__text"
              type="text"
            />
          </label>
          <label className="worlds__container__form__label">
            World password :
            <input
              className="worlds__container__form__label__text"
              type="text"
            />
          </label>
          <input
            className="worlds__container__form__label__submit"
            type="submit"
            value="Join world"
          />
        </form>
      </div>
    </div>
  );
}

export default worlds;
