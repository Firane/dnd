import React, { useEffect, useState, useRef, ReactEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faS, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

library.add(faS, faPlus, faMinus);

export interface BagProps {
  bagData: {
    id: number;
    name: string;
    maxmiumload?: number;
    htmlClass?: string;
    isCoinPurse: boolean;
  };
}

function Bag({ bagData }: BagProps) {
  const [money, setMoney] = useState<number[]>([0, 0, 0]);
  const goldRef = useRef<HTMLInputElement | null>(null);
  const silverRef = useRef<HTMLInputElement | null>(null);
  const copperRef = useRef<HTMLInputElement | null>(null);
  const [incom, setIncom] = useState<number[]>([0, 0, 0]);
  const [warningText, setWarningText] = useState<JSX.Element | null>(null);
  const [inputWarning, setInputWarning] = useState<string | null>(null);

  /*
Ces deux fonctions sont faites pour calculer les pertes ou gain de golds.
Ca doit incrementer ou decrementer l'or ou l'argent lorsque l'argent ou le bronze atteigne la centaine.

Both of those 2 functions are made to calculate the golds i lose or win
it need to decrement or increment gold or silver when silver or copper reach the number of >=100
because you can't have like 434243copper for 2golds
!!! important, i need to correct the fact that it cant show a value between 0 and -1 golds.
*/

  const howManyGoldsIWon = (
    golds: number,
    silvers: number,
    coppers: number
  ) => {
    let gold = money[0];
    let silver = money[1];
    let copper = money[2];
    if (
      window.confirm(
        `You're about to add ${golds}gold(s) ${silvers}silver(s) and ${coppers}copper(s)`
      )
    ) {
      if (coppers + copper >= 100) {
        copper = coppers + copper - 100;
        silver++;
      } else {
        copper = copper + coppers;
      }
      if (silvers + silver >= 100) {
        silver = silvers + silver - 100;
        gold++;
      } else {
        silver = silver + silvers;
      }
      gold = gold + golds;
      setMoney([gold, silver, copper]);
      return [gold, silver, copper];
    } else {
      return;
    }
  };

  const howManyGoldsILost = (
    golds: number,
    silvers: number,
    coppers: number
  ) => {
    let gold = money[0];
    let silver = money[1];
    let copper = money[2];
    if (
      window.confirm(
        `You're about to delete ${golds}gold(s) ${silvers}silver(s) and ${coppers}copper(s)`
      )
    ) {
      if (copper - coppers < 0) {
        copper = 100 + (copper - coppers);
        silver = silver - 1;
      } else {
        copper = copper - coppers;
      }
      if (silver - silvers < 0) {
        silver = 100 + (silver - silvers);
        gold = gold - 1;
      } else {
        silver = silver - silvers;
      }
      gold = gold - golds;
      setMoney([gold, silver, copper]);
      return [gold, silver, copper];
    } else {
      return;
    }
  };

  const formatHandler = () => {
    /**
     * Me permet de faire un retour a l'utilisateur via un message, un effet de bordure, en cas de format incorrect. Que je retire via le settimeout après.
     * Allow me to send to the user that he send incorrect data. Using text and border effect for that, i also delete this effect later with settimeout.
     */
    setWarningText(
      <div
        style={{
          color: "black",
          fontStyle: "italic",
          fontSize: ".8rem",
          textAlign: "left",
        }}
      >
        Wrong format <br />
        Silver and copper can't be higher than 99
      </div>
    );
    setInputWarning("warning");
    setTimeout(() => {
      setWarningText(null);
      setInputWarning(null);
    }, 5000);
  };

  const changeHandler = (
    /**
     * Je cherche a faire un nouveau tableau de valeur a incrementer, representant dans l'ordre : or, argent, bronze.
     * le parametre number sert, a cible sur quelle monnaie j'interragis. Si je manipule l'or le number correspondra donc a l'indexation de l'or, le 0.
     * Si j'ai, sur le changement, la ref de sur quelle monnaie je manipule alors je me sert de setIncom pour lui mettre un nouveau de tableau avec les toutes dernieres valeurs changees.
     * c'est ce tableau la mis a jour a chaque changement qui sera introduit lorsqu'on press l'un des deux boutons prevus pour.
     * sinon je retourne un tableau qui incrementera de 0.
     *
     * The objective here is to create a new array that includes all the value to increment or decrement depending the button the user press, the order : gold, silver, copper
     * the number parameter is here to be used a reference later to target the type of money i'm interacting with, 0 for gold, 1 for silver, 3 for copper
     * First i need to be sure that i have my moneyType defined, then i use setIncom to set a new array with new value that replace the previous one.
     * It's that array that will be pushed when the user use one of the 2 buttons.
     * else i'm giving an array that will add 0 everywhere. It avoid bad manipulation to reset the entire array or things like that
     */
    moneyTypeRef: React.MutableRefObject<HTMLInputElement | null>,
    number: number
  ) => {
    if (
      moneyTypeRef &&
      moneyTypeRef.current
      // && silverRef.current &&
      // copperRef.current
    ) {
      setIncom((prev) => {
        if (prev) {
          const newArray = [...prev];
          newArray[number] = moneyTypeRef.current!.valueAsNumber;
          return newArray;
        } else {
          return [0, 0, 0];
        }
      });
    } else {
      console.log("champs incomplets");
    }
  };

  const clickHandler = (event: React.MouseEvent) => {
    /**
     * Si j'ai, une incom prete et qu'elle correspond au bon format et que le bouton sur lequel l'utilisateur est le plus alors je l'ajoute
     * Si le bouton est moins, alors je joue la fonction de retrait
     * sinon c'est que le format n'est pas le bon alors je joue la fonction correspondant au erreur de format
     * Je remet systematiquement chaque valeur a 0 pour eviter les doubles click ou les manipulations non voulues.
     * Je remet egalement le tableau d'incom a 0 pour correspondre avec ce que vois l'utilisateur
     *
     * If if have a ready incom, that the format is correct, and that my button is a 'plus', then i play functions to add those values to my coinpurse.
     * If the exact same but my button is the minusm i play every functions to subtract those values to my coinpurse.
     * Else the form format aint correct and i play the function to warn the user.
     * i also set every input to 0 to avoid any type of double clicking or unwanted manipulations.
     * I also set the incom array to 0 to match with what the user sees.
     */
    if (
      incom &&
      incom.every(Number.isFinite) &&
      incom.length === 3 &&
      incom[1] < 100 &&
      incom[2] < 100 &&
      event.currentTarget.id === "plusButton"
    ) {
      howManyGoldsIWon(incom[0], incom[1], incom[2]);
    } else if (
      incom &&
      incom.every(Number.isFinite) &&
      incom.length === 3 &&
      incom[1] < 100 &&
      incom[2] < 100 &&
      event.currentTarget.id === "minusButton"
    ) {
      howManyGoldsILost(incom[0], incom[1], incom[2]);
    } else {
      formatHandler();
    }
    goldRef.current!.value = "0";
    silverRef.current!.value = "0";
    copperRef.current!.value = "0";
    setIncom([0, 0, 0]);
  };

  const isCoinPurge = () => {
    if (bagData.isCoinPurse) {
      return (
        <div className={`inventory__content__coinpurse`}>
          <h3 className="inventory__content__coinpurse__title">
            Coin Purse 💰
          </h3>
          <ul className="inventory__content__coinpurse__list">
            <li>{money[0]} golds</li>
            <li>{money[1]} silvers</li>
            <li>{money[2]} coppers</li>
          </ul>
          <div className="inventory__content__coinpurse__instruction">
            ⬇️ Add value bellow ⬇️
          </div>
          <form className="inventory__content__coinpurse__form">
            <div className="inventory__content__coinpurse__form__labels">
              <label className="inventory__content__coinpurse__form__labels__goldLabel">
                Gold
                <input
                  className={`inventory__content__coinpurse__form__labels__goldLabel__number ${inputWarning}`}
                  ref={goldRef}
                  type="number"
                  onChange={() => {
                    changeHandler(goldRef, 0);
                  }}
                />
              </label>
              <label className="inventory__content__coinpurse__form__labels__silverLabel">
                Silver
                <input
                  className={`inventory__content__coinpurse__form__labels__silverLabel__number ${inputWarning}`}
                  ref={silverRef}
                  type="number"
                  max={99}
                  min={0}
                  onChange={() => {
                    changeHandler(silverRef, 1);
                  }}
                />
              </label>
              <label className="inventory__content__coinpurse__form__labels__copperLabel">
                Copper
                <input
                  className={`inventory__content__coinpurse__form__labels__copperLabel__number ${inputWarning}`}
                  ref={copperRef}
                  type="number"
                  max={99}
                  min={0}
                  onChange={() => {
                    changeHandler(copperRef, 2);
                  }}
                />
              </label>
            </div>
            <div className="inventory__content__coinpurse__form__buttons">
              <button
                className="inventory__content__coinpurse__form__buttons__button"
                type="button"
                id="plusButton"
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault();
                  clickHandler(event);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                id="minusButton"
                className="inventory__content__coinpurse__form__buttons__button"
                type="button"
                onClick={(event: React.MouseEvent) => {
                  clickHandler(event);
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </form>
          {warningText}
        </div>
      );
    } else {
      return (
        <div className={`inventory__content__bag${bagData.id}`}>
          <h3>{bagData.name}</h3>
          <div>Il y'en a des choses la dedans</div>
        </div>
      );
    }
  };
  return isCoinPurge();
}

export default Bag;
