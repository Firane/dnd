import React, { ReactNode } from "react";
import characterIllustration from "../../img/characters/BelloBelto.png";
import armorIcon from "../../img/characters/armor.webp";
import Item, { ItemProps } from "../items/items";
import { toHaveDescription } from "@testing-library/jest-dom/matchers";

export interface props {
  items: object[];
}

function character() {
  const items = [
    {
      id: 0,
      name: "Torche",
      forHit: "+3",
      damage: ["1d8+1", "1d4"],
      damageType: ["Contendant", "Feu"],
      bonus: ["+1 Resistance au sorts", "+1 Attaque de Sort"],
      description:
        "Permet de lancer les sorts lame de flammes vertes et mot de radiance à volonté.\nDispose de 12 charge au maximum.\nVous devez tenir le bâton dans la main pour lancer un sort avec ses charges.\nRécupère 1d4 charges par long repos.\n 1 charge : Bruler déguisement / image silencieuse \n 3 Charges : Puiser Foulée brumeuse / Pyrotechnie \n 6 charges : Feu intense Contresort / Communication à distance \nSi le bâton arrive à 0 charges, lancer un dé 20 Sur un 1 le baton explose instantanément infligeant 6d6 dégâts de feu et 6d6 dégâts radiants (DD15 dextérité pour réduire les dommages par deux).\nSur 2 ou +, lancer un dé sur la table de magie sauvage. Sans indication contraire lors de l'effet du pic de magie sauvage, le bâton reste indemne. \n Bruler \n En dépensant une charge lorsque vous lancer un sort qui inflige des dégâts de feu à une créature ou un objet inflammable, il s'enflamme. Au début de son tour une créature ou un objet brulant ainsi subit 1d6 de dégâts de feu. Une créature qui peut atteindre la cible peut dépenser une action pour éteindre le feu.\n Puiser \n Si le porteur dispose de points de sorcellerie, il peut dépenser 3 charges pour récupérer 1 point de sorcellerie \n Feu intese \nEn dépensant 6 charges lorsque vous lancer un sort de feu, vous pouvez relancer chaque dés de dommages une seconde fois et choisir le meilleur résultat. \nCe bâton est signé Kahos Belto mais l'oeil d'un expert sur le travail du grand maître révèle que le bâton n'est pas terminée. Il semble évident qu'il est destinée à Belo Belto.",
    },
    {
      id: 1,
      name: "Baguette",
      damage: "1d4+1",
      damageType: ["Perçants"],
      description:
        "Vous créez trois fléchettes de force magique d'un bleu lumineux. Chaque fléchette atteint une créature de votre choix que vous pouvez voir et dans la limite de portée du sort. Chaque projectile inflige 1d4 + 1 dégâts de force à sa cible. Les fléchettes frappent simultanément, et peuvent frapper une ou plusieurs créatures.\nAux niveaux supérieurs. Lorsque vous lancez ce sort en utilisant un emplacement de sort de niveau 2 ou supérieur, il crée une fléchette additionnelle pour chaque niveau d'emplacement au-delà du niveau 1. \n\"Une baguette échangée par Marik contre la dague trouvée dans l'autel de Vecna à Osséa",
    },
    {
      id: 2,
      name: "Anneau Doré",
      bonus: "+1 Emplacement de sort",
      description:
        "Anneau de prêtre d'Arathel, trouvé dans ce qu'il restait de l'un de ses temples",
    },
    {
      id: 3,
      name: "Anneau de résistance au feu",
      bonus: "Resistance au feu",
      description: "Pour les gouverner tous",
    },
    {
      id: 4,
      name: "Amulette d'esprit guérisseur",
      description:
        "Dispose de 3 charges et récupère une charge à long repos.\n 1 charge : mot de guérison\n3 charges: Esprit guérisseur (un papillon)\n Cette amulette sertie d'un papillon apporte un sentiment de sérénité quand on le porte au cou.",
    },
    {
      id: 5,
      name: "Robe de l'hiver",
      Bonus: "Resistance au froid",
      description:
        "Robe de mage, qui prend la forme souhaité par son porteur, ce qui est sûr c'est qu'elle tient chaud.",
    },
    {
      id: 6,
      name: "Dague",
      forHit: "+5",
      damage: "1d4",
      damageType: "Perçants",
      description:
        "Une dague offerte à Belo par son père Kahos lors de sa remise de diplôme de l'Université de Dyrmantyr. Elle a été faite avec beaucoup de soin et de minutie",
    },
    {
      id: 7,
      name: "Dague",
      forHit: "+5",
      damage: "1d4",
      damageType: "Perçants",
      description:
        "Une dague fabriquée par Belo. Selon Falst, elle est même d'une très bonne qualité",
    },
  ];

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
            {items?.map((element) => {
              return <Item key={element.id} itemData={element}></Item>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default character;
