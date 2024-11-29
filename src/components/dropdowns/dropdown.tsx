import React, { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faS, faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faS, faArrowRight);

export interface MyDropdownProps {
  title: string;
  children?: ReactNode | undefined;
}

function Dropdown({ title, children }: MyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [stayClosed, setStayClosed] = useState(true);
  console.log(title);
  console.log(isOpen, stayClosed);

  // function opener(): boolean{
  //   if(isOpen){
  //     setIsOpen(false);
  //   }
  // }

  return (
    <div className="dropdown">
      <button
        className="dropdown__button"
        onClick={(event: React.MouseEvent) =>
          isOpen ? setIsOpen(false) : setIsOpen(true)
        }
      >
        {title}
        <FontAwesomeIcon
          className="item__description__header__button__icon"
          icon={faArrowRight}
        />
      </button>

      <div className="dropdown__content">{children}</div>
    </div>
  );
}

export default Dropdown;
