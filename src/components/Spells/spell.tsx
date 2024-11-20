import spellIcon from "../../img/spell_logos/Blade_Ward.webp";

function spell() {
  return (
    <div className="spell">
      <h2>Sort Mineur</h2>
      <div className="spell__type">Transmutation</div>
      <img src={spellIcon} alt="un spell" />
      <h3>Mending</h3>
      <div className="spell__attributes">
        <div className="spell__attributes__duo">
          <div>Temps d'incantation</div>
          <div className="spell__attributes__duo__value">1 action</div>
        </div>
        <div className="spell__attributes__duo">
          <div>Composants</div>
          <div className="spell__attributes__duo__value">V,S</div>
        </div>
        <div className="spell__attributes__duo">
          <div>Portée</div>
          <div className="spell__attributes__duo__value">9 m</div>
        </div>
        <div className="spell__attributes__duo">
          <div>Durée</div>
          <div className="spell__attributes__duo__value">10 minutes</div>
        </div>
      </div>
      <p>
        A flickering flame appears in your hand. The flame remains there for the
        duration and harms neither you nor your equipment. The flame sheds
        bright light in a{" "}
        <span className="range__indicator">10 foot radius</span> and dim light
        for an additional <span className="range__indicator">10 feet</span>.
        <br />
        <br /> The spell ends if you dismiss it as an action or if you cast it
        again. You can also attack with the flame, although doing so ends the
        spell. When you cast this spell, or as an action on a later turn, you
        can hurl the flame at a creature within 30 feet of you. Make a ranged
        spell attack. On a hit, the target takes{" "}
        <span className="fire__dmg">1d8 fire damage</span>.
        <br />
        <br />
        <span className="specific">At Higher Levels</span> : This spell’s damage
        increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and
        17th level (4d8).
      </p>
    </div>
  );
}

export default spell;
