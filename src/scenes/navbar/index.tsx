import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMedia";
import ActionButton from "@/shared/ActionButton";

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const NavBar = (props: Props) => {
  const flexBetween = "flex items-center justify-between";
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const navBarBackground = props.isTopOfPage ? "" : "bg-neutral-200 drop-shadow";

  return (
    <nav>
      <div className={`${navBarBackground} ${flexBetween} fixed top-0 z-40 w-screen py-6`}>
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            <h2 className="text-black">Sport Complex</h2>
            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : "text-black"
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/benefits"
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : "text-black"
                    }
                  >
                    Benefits
                  </NavLink>
                  <NavLink
                    to="/our-classes"
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : "text-black"
                    }
                  >
                    Our Classes
                  </NavLink>
                </div>
                <div className={`${flexBetween} gap-8`}>
                  <ActionButton>Become a Member</ActionButton>
                </div>
              </div>
            ) : (
              <button
                className="rounded-full bg-secondary-500 p-2"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Bars3Icon className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="ml-[33%] flex flex-col gap-10 text-2xl">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-green-500" : "text-black"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/benefits"
              className={({ isActive }) =>
                isActive ? "text-green-500" : "text-black"
              }
            >
              Benefits
            </NavLink>
            <NavLink
              to="/our-classes"
              className={({ isActive }) =>
                isActive ? "text-green-500" : "text-black"
              }
            >
              Our Classes
            </NavLink>
          <NavLink to="/auth"
           className={({ isActive }) =>
            isActive ? "text-green-500" : "text-black"
          }>
          Become a member
          </NavLink>
                  
                
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
