import { createContext, useContext, useEffect, useRef, useState } from "react";

const SliderNavContext = createContext();

export const SliderNavProvider = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef(null);

  const openNav = () => setNavOpen(true);
  const closeNav = () => setNavOpen(false);
  const toggleNav = () => setNavOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navOpen && navRef.current && !navRef.current.contains(e.target)) {
        setNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navOpen]);

  return (
    <SliderNavContext.Provider
      value={{ navOpen, openNav, closeNav, toggleNav, navRef }}
    >
      {children}
    </SliderNavContext.Provider>
  );
};

export const useSliderNav = () => useContext(SliderNavContext);