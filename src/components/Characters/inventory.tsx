import React, { ReactNode } from "react";
import Bag from "../items/bag";
import inventoryIcon from "../../img/characters/bag.png";
import { idText } from "typescript";
import { groupCollapsed } from "console";

export interface props {
  bags: object[];
}

function Inventory() {
  const bags = [
    {
      id: 0,
      name: "Bourse",
      isCoinPurse: true,
      golds: 99,
      silvers: 99,
      coppers: 99,
    },
    {
      id: 1,
      name: "\nSac d'aventurier",
      maximumload: 20,
      isCoinPurse: false,
    },
    {
      id: 2,
      name: "Sac sans fond",
      isCoinPurse: false,
    },
  ];

  return (
    <div className="inventory">
      <div className="inventory__header">
        <h2>Inventory</h2>
        <img src={inventoryIcon} alt="inventory icon" />
      </div>
      <div className="inventory__content">
        {bags?.map((element) => {
          return <Bag key={element.id} bagData={element}></Bag>;
        })}
      </div>
    </div>
  );
}

export default Inventory;
