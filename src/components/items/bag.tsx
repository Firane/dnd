import { useEffect, useState, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [warningText, setWarningText] = useState<JSX.Element | null>(null);
  // Il faudrait mettre un style dans un useState pour modifier la bordure du champ ou l'on renseigne la valeur ajoutee ou perdue
  // const [valueStyle, setValueStyle] = useState<StandardShorthandProperties<string | number, string & {}>.textDecoration?: Property.TextDecoration<string | number> | undefined

  useEffect(() => {
    localStorage.setItem("money", JSON.stringify(money));
  }, [money]);

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
    console.log(money);
    return [gold, silver, copper];
  };

  const howManyGoldsILost = (
    golds: number,
    silvers: number,
    coppers: number
  ) => {
    let gold = money[0];
    let silver = money[1];
    let copper = money[2];

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
    console.log(money);
    return [gold, silver, copper];
  };

  const formatHandler = () => {
    setWarningText(
      <div
        style={{
          color: "white",
          fontStyle: "italic",
          fontSize: ".8rem",
          textDecoration: "underline",
        }}
      >
        Wrong format, please consider using : golds,silver,copper
      </div>
    );

    setTimeout(() => {
      setWarningText(null);
    }, 5000);
  };

  const isCoinPurge = () => {
    if (bagData.isCoinPurse) {
      return (
        <div className={`inventory__content__coinpurse`}>
          <h3 className="inventory__content__coinpurse__title">
            Coin Purse 💰
          </h3>
          <ul className="inventory__content__coinpurse__content">
            <li>{money[0]} golds</li>
            <li>{money[1]} silvers</li>
            <li>{money[2]} coppers</li>
          </ul>
          <form className="inventory__content__coinpurse__form">
            <label className="inventory__content__coinpurse__form__label">
              Value :
              <input
                className="inventory__content__coinpurse__form__label__number"
                ref={inputRef}
                type="text"
                placeholder="Gold,Silver,Copper"
              />
            </label>

            <button
              className="inventory__content__coinpurse__form__button"
              type="button"
              onClick={(event: React.MouseEvent) => {
                let valueArray = inputRef.current?.value.split(",").map(Number);
                if (
                  valueArray &&
                  valueArray.every(Number.isFinite) &&
                  valueArray.length === 3
                ) {
                  howManyGoldsIWon(valueArray[0], valueArray[1], valueArray[2]);
                } else {
                  console.log("error valueArray undefined");
                  formatHandler();
                }
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              className="inventory__content__coinpurse__form__button"
              type="button"
              onClick={(event: React.MouseEvent) => {
                let valueArray = inputRef.current?.value.split(",").map(Number);
                if (
                  valueArray &&
                  valueArray.every(Number.isFinite) &&
                  valueArray.length === 3
                ) {
                  howManyGoldsILost(
                    valueArray[0],
                    valueArray[1],
                    valueArray[2]
                  );
                } else {
                  formatHandler();
                  console.log("error valueArray undefined");
                  console.log(event.target);
                }
              }}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
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
