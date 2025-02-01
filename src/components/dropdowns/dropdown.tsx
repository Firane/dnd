import React, { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faS, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { displayPartsToString, getDefaultFormatCodeSettings } from "typescript";
import { getActiveElement } from "@testing-library/user-event/dist/utils";

library.add(faS, faArrowRight);

export interface MyDropdownProps {
  title: string;
  classname: string;
  children?: ReactNode | undefined;
}

function Dropdown({ title, classname, children }: MyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setcontentHeight] = useState(0);

  function animationContainerShow(sibling: any) {
    console.log("show");
    console.log(contentHeight);
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
        duration: 2000,
      }
    );
  }

  function animationContainerHide(sibling: any) {
    console.log("hide");
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
        duration: 2000,
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
          isOpen ? setIsOpen(false) : setIsOpen(true);

          console.log(sibling.children[0]);
          isOpen
            ? animationContainerHide(sibling)
            : animationContainerShow(sibling);
        }}
      >
        {title}
        <FontAwesomeIcon
          className={`${classname}__button__icon ${
            isOpen ? "enable" : "disable"
          }`}
          icon={faArrowRight}
        />
      </button>

      <div
        className={`${classname}__content ${isOpen ? "displayed" : "hidden"}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Dropdown;
