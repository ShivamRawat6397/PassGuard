import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold">PassGuard</div>
        <div className="bg-slate-800 m-0">
          <a href="https://www.github.com" target="_blank">
            <img
              className="invert h-10 p-0 w-10"
              src="icons/github.png"
              alt="github"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
