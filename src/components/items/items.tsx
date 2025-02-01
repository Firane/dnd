import React, { ReactNode } from "react";
import titleIcon from "../../img/characters/44898.png";
import Dropdown from "../dropdowns/dropdown";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faS, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// library.add(faS, faArrowRight);

export interface ItemProps {
  itemData: {
    id: number;
    damage?: string | string[];
    damageType?: string | string[];
    description?: string;
    forHit?: string | undefined;
    name: string;
    bonus?: string | string[];
  };
}

function item({ itemData }: ItemProps) {
  const isEmptyOrFilled = (data: any, categorie: string) => {
    switch (typeof data) {
      case "object":
        return [
          <div className={`item__stats__` + categorie + `__title`}>
            {categorie}
          </div>,
          data.map((element: string, number: number) => {
            return (
              <div className={`item__stats__` + categorie + `__value` + number}>
                {element}
              </div>
            );
          }),
        ];
      case "string":
        console.log("string");
        return [
          <div className={`item__stats__` + categorie + `__title`}>
            {categorie}
          </div>,
          <div className={`item__stats__` + categorie + `__value1`}>
            {data}
          </div>,
        ];
      default:
        return [
          <div className={`item__stats__` + categorie + `__title`}>
            {categorie}
          </div>,
          <div className={`item__stats__` + categorie + `__value1`}> ❌ </div>,
        ];
    }
  };

  return (
    <div className={`item ` + itemData.id}>
      <div className="item__title">
        <h4 className="item__title__name">{itemData.name}</h4>
        <img className="item__title__icon" src={titleIcon} alt="ADD LATER" />
      </div>
      <div className="item__stats">
        <div className="item__stats__hit">
          {isEmptyOrFilled(itemData.forHit, "hit")}
        </div>
        <div className="item__stats__dmg">
          {isEmptyOrFilled(itemData.damage, "dmg")}
        </div>
        <div className="item__stats__type">
          {isEmptyOrFilled(itemData.damageType, "type")}
        </div>
      </div>
      <Dropdown title="Description" classname="item__description__container">
        <p>{itemData.description}</p>
      </Dropdown>
    </div>
  );
}

export default item;
