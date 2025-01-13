import React, { ReactNode, useState } from "react";
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
  const [stayClosed, setStayClosed] = useState(true);

  return (
    <div className={classname}>
      <button
        className={`${classname}__button`}
        onClick={(event: React.MouseEvent) =>
          isOpen ? setIsOpen(false) : setIsOpen(true)
        }
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
