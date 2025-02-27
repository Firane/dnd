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
Both of those 2 functions are made to calculate the golds i lose or win
it need to decrement or increment gold or silver when silver or copper reach the number of >=100
because you can't have like 434243copper for 2golds
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
    moneyTypeRef: React.MutableRefObject<HTMLInputElement | null>,
    number: number
  ) => {
    if (
      moneyTypeRef &&
      moneyTypeRef.current &&
      silverRef.current &&
      copperRef.current
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
