import React, { ReactNode } from "react";
import titleIcon from "../../img/characters/44898.png";
import Dropdown from "../dropdowns/dropdown";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faS, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// library.add(faS, faArrowRight);

export interface ItemProps {
  children?: ReactNode | undefined;
}

function item({ children }: ItemProps) {
  return (
    <div className="item">
      <div className="item__title">
        <h4 className="item__title__name">Torche</h4>
        <img className="item__title__icon" src={titleIcon} alt="ADD LATER" />
      </div>
      <div className="item__stats">
        <div className="item__stats__hit">
          <div className="item__stats__hit__title">Pour toucher</div>
          <div className="item__stats__hit__value">+3</div>
        </div>
        <div className="item__stats__dmg">
          <div className="item__stats__dmg__title">Damage</div>
          <div className="item__stats__dmg__value1">1d8+1</div>
          <div className="item__stats__dmg__value2">1d4</div>
        </div>
        <div className="item__stats__type">
          <div className="item__stats__type__title">Damage type</div>
          <div className="item__stats__type__value1">Blunt</div>
          <div className="item__stats__type__value2">Fire</div>
        </div>
      </div>
      <Dropdown title="Description" classname="item__description">
        <p className="item__description__content">
          Permet de lancer les sorts lame de flammes vertes et mot de radiance à
          volonté. Dispose de 12 charges au maximum. Vous devez tenir le bâton
          dans la main pour lancer un sort avec ses charges. Récupère 1d4
          charges par long repos. Récupère 1d4 charges par long repos. 1 Charge:
          Bruler Déguisement / image silencieuse 3 Charges: Puiser Foulée
          brumeuse / Pyrotechnie 6 Charges: Feu Intense Contresort /
          Communication à distance Si le bâton arrive à 0 charges, lancer un dé
          20 Sur un 1 le baton explose instantanément infligeant 6d6 dégâts de
          feu et 6d6 dégâts radiants (DD15 dextérité pour réduire les dommages
          par deux) Sur 2 ou +, lancer un dé sur la table de magie sauvage. Sans
          indication contraire lors de l'effet du pic de magie sauvage, le bâton
          reste indemne. Bruler En dépensant une charge lorsque vous lancer un
          sort qui inflige des dégâts de feu à une créature ou un objet
          inflammable, il s'enflamme. Au début de son tour une créature ou un
          objet brulant ainsi subit 1d6 de dégâts de feu. Une créature qui peut
          atteindre la cible peut dépenser une action pour éteindre le feu.
          Puiser Si le porteur dispose de points de sorcellerie, il peut
          dépenser 3 charges pour récupérer 1 point de sorcellerie Feu Intense
          En dépensant 6 charges lorsque vous lancer un sort de feu, vous pouvez
          relancer chaque dés de dommages une seconde fois et choisir le
          meilleur résultat. Ce bâton est signé Kahos Belto mais l'oeil d'un
          expert sur le travail du grand maître révèle que le bâton n'est pas
          terminée. Il semble évident qu'il est destinée à Belo Belto. Ce bâton
          est signé Kahos Belto mais l'oeil d'un expert sur le travail du grand
          maître révèle que le bâton n'est pas terminée. Il semble évident qu'il
          est destinée à Belo Belto.
        </p>
      </Dropdown>
      {/* <div className="item__description"> */}
      {/* <div className="item__description__header"> */}
      {/* <h5 className="item__description__header__title">Description</h5> */}
      {/* <button className="item__description__header__button"> */}
      {/* <FontAwesomeIcon
              className="item__description__header__button__icon"
              icon={faArrowRight}
            /> */}
      {/* </button> */}
      {/* </div> */}
    </div>
    // </div>
  );
}

export default item;
