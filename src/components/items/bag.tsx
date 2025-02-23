import { useEffect, useState } from "react";
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
  const [money, setMoney] = useState([2, 2, 2]);
  useEffect(() => {
    localStorage.setItem("money", JSON.stringify(money));
  }, [money]);

  const isCoinPurge = () => {
    if (bagData.isCoinPurse) {
      return (
        <div className={`inventory__content__coinpurse`}>
          <h3 className="inventory__content__coinpurse__title">
            Coin Purse 💰
          </h3>
          <ul className="inventory__content__coinpurse__content">
            <li>1 golds</li>
            <li>1 silvers</li>
            <li>1 coppers</li>
          </ul>
          <button
            className="inventory__content__coinpurse__button"
            type="button"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className="inventory__content__coinpurse__button"
            type="button"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
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
