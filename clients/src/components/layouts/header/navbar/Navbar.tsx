import React, { JSX, useState } from "react";
import { Link } from "react-router-dom";
import style from "./_navbar.module.scss";
type NavbarType = {
  readonly name: string;
  readonly link: string;
  active: boolean;
};

const NavbarItems: NavbarType[] = [
  { name: "Home", link: "/", active: true },
  { name: "Flashcards", link: "/flashcards", active: false },
  { name: "Words", link: "/words", active: false },
];

const Navbar = (): JSX.Element => {
  const [items, setItems] = useState<NavbarType[]>(NavbarItems);
  const handleClick = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) => ({ ...item, active: i === index }))
    );
  };

  return (
    <nav>
      <ul className={style["navbar_item"]}>
        {items &&
          items.map((item, index) => (
            <li
              className={` ${style["navbar_item-link"]}`}
              key={item.name + index}
              onClick={() => handleClick(index)}
            >
              <Link
                to={item.link}
                className={`${item.active ? `${style["active"]}` : ""} ${
                  style["href"]
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Navbar;
