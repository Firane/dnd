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
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setcontentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setcontentHeight(contentRef.current.scrollHeight);
    }
  }, []); // S'exécute uniquement au premier rendu

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
  }

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
  }

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
  }

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
  }

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
            );
          }
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
