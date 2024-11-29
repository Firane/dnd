import React, { ReactNode } from "react";
import characterIllustration from "../../img/characters/BelloBelto.png";
import Dropdown from "../dropdowns/dropdown";
import armorIcon from "../../img/characters/armor.webp";
import Item from "../items/items";

export interface props {
  children?: ReactNode | undefined;
}

function character(children: props) {
  return (
    <div className="character">
      <div className="character__equipement">
        <div className="character__equipement__header">
          <h3>Equipement</h3>
          <img src={armorIcon} alt="armor icon" />
        </div>
        <div className="character__equipement__content">
          <div className="character__equipement__content__image">
            <img
              src={characterIllustration}
              alt="ADD LATER NAME OF THE CHARACTER"
            />
          </div>
          <div className="character__equipement__content__items">
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item>
              <Dropdown title="Description"></Dropdown>
            </Item>
          </div>
        </div>
      </div>
    </div>
  );
}

export default character;
