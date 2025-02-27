import React from "react";
import styles from "../header/HeaderLayout.module.scss";
import { Outlet } from "react-router-dom";
import Logo from "./logo/Logo";
import Navbar from "./navbar/Navbar";
import AuthStatus from "./auth-state/AuthStatus";
import { AiOutlineMenu } from "react-icons/ai";

const Header: React.FC<{
  isMenuOpen: boolean;
  toggleMenu: () => void;
}> = React.memo(({ isMenuOpen, toggleMenu }) => {
  return (
    <header className={`container ${styles.header} py-3`}>
      <div className={`row ${styles["flex-center"]}`}>
        <div className="col-5">
          <Logo />
        </div>

        {/* Menu smart phone */}
        <div className="col-7 d-block d-lg-none text-end">
          <div className={styles.mobileMenuToggle} onClick={toggleMenu}>
            <span className="icon">
              <AiOutlineMenu />
            </span>
          </div>

          <div
            className={`${styles.mobileMenu} row ${
              isMenuOpen ? styles.active : ""
            }`}
          >
            <div className="col-12">
              <div className={styles.mobileMenuContent}>
                <Navbar />
                <div className={styles.mobileAuth}>
                  <AuthStatus />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu desktop */}
        <div className="col-7 d-none d-lg-block d-md-none d-xl-block">
          <div className={`row ${styles["flex-around"]}`}>
            <div className="col-7 text-center">
              <Navbar />
            </div>
            <div className="col-5 text-end">
              <AuthStatus />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

const HeaderLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main className={`container mt-4 ${isMenuOpen ? styles.blur : ""}`}>
        <Outlet />
      </main>
    </>
  );
};

export default HeaderLayout;
