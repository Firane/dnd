import React, { ReactNode, useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faS, faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faS, faArrowRight);

export interface MyDropdownProps {
  title: string;
  classname: string;
  children?: ReactNode | undefined;
}

function Dropdown({ title, classname, children }: MyDropdownProps) {
  /** 
  IsOpen me sert a savoir letat du dropdown
  contentHeight me sert a savoir la taille de la description et d'ajuster dynamiquement la taille du conteneur
  contentRef me permet de cible tout le contenu cache par le dropdown

  isOpen allow me to know the state of the dropdown
  ContentHeight allows me to know the height of the description and so i'm able to adjust dynamically the height of the container
  ContentRef allows me to target the entire content hidden by the dropdown
  **/
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setcontentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setcontentHeight(contentRef.current.scrollHeight);
    }
  }, []); // S'exécute uniquement au premier rendu // Executed at the first render

  function animationContainerShow(sibling: any) {
    sibling.animate(
      [
        {
          height: "0px",
        },
        { height: `${contentHeight}px` },
      ],
      {
        fill: "forwards",
        easing: "ease-in-out",
        duration: (contentHeight / 100) * 200,
      }
    );
  } // Ceci me permet de faire grandir l'element dans lequel est contenu le dropdown. // It's made to make the element inside the dropdown grow.

  function animationContainerHide(sibling: any) {
    sibling.animate(
      [
        {
          height: `${contentHeight}px`,
        },
        { height: "0px" },
      ],
      {
        fill: "forwards",
        easing: "ease-in-out",
        duration: (contentHeight / 100) * 200,
      }
    );
  } // Ceci me permet de faire retressir l'element dans lequel est contenu le dropdown. // It's made to shrank the parent element of the dropdown.

  function animationDropdownHide(sibling: any) {
    sibling.firstChild.animate(
      [
        {
          transform: "translateY(0)",
        },
        {
          transform: "translateY(-100%)",
        },
      ],
      {
        fill: "forwards",
        easing: "ease-in-out",
        duration: (contentHeight / 100) * 200,
      }
    );
  } // Ceci me permet de cache le contenu de mon dropdown, creer un effet defilement de texte lorsqu'il est couple a animationContainerHide()

  function animationDropdownShow(sibling: any) {
    sibling.firstChild.animate(
      [
        {
          transform: "translateY(-100%)",
        },
        {
          transform: "translateY(0)",
        },
      ],
      {
        fill: "forwards",
        easing: "ease-in-out",
        duration: (contentHeight / 100) * 200,
      }
    );
  } // Ceci me permet de montrer le contenu de mon dropdown, creer un effet defilement de texte lorsqu'il est couple a animationContainerShow()
  // It's made to show the dropdown's content. It create a scroll effect with the text when he used with animationcontainerShow()

  return (
    <div className={classname}>
      <button
        className={`${classname}__button`}
        onClick={(event: React.MouseEvent) => {
          let sibling: any = event.currentTarget.nextElementSibling!;
          setcontentHeight(
            sibling.children[0].getBoundingClientRect().height + 10
          );
          if (isOpen) {
            setIsOpen(false);
            animationContainerHide(sibling);
            animationDropdownHide(sibling);
            event.currentTarget.firstElementChild?.classList.add("enable");
            event.currentTarget.firstElementChild?.classList.remove(
              "default",
              "disable"
            );
          } else {
            setIsOpen(true);
            animationDropdownShow(sibling);
            animationContainerShow(sibling);
            event.currentTarget.firstElementChild?.classList.add("disable");
            event.currentTarget.firstElementChild?.classList.remove(
              "default",
              "enable"
            ); // sur le click, si setIsOpen est true, je cache tout en jouant les 2 animations prevues a cet effet, je reajuste mes class pour jouer mes animations css (la fleche qui tourne)
          } //Sinon si isOpen est false alors je joue mes 2 animations faites pour montrer le contenu, je reajuste egalement mes class.
          /**
           * On click : if open is true, im hiding everything by playing the 2 animation functions made for it.
           * I adjust my className to play my css animation on my little arrow.
           * Else : I show everything by playing those 2 functions made to show the content. I also adjut classNames
           */
        }}
      >
        {title}
        <FontAwesomeIcon
          className={`${classname}__button__icon default`}
          icon={faArrowRight}
        />
      </button>
      <div
        ref={contentRef}
        className={`${classname}__content ${isOpen ? "displayed" : "hidden"}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Dropdown;
