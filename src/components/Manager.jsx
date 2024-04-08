import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ sites: "", usernames: "", passwords: "" });
  const [passwordsArray, setPasswordsArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordsArray(passwords);
    console.log(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);
  const copyText = (text) => {
    toast("Copied To Clipboard 👍", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eye.png")) {
      ref.current.src = "icons/eye1.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    }
  };
  const savePassword = async () => {
    if (
      form.sites.length > 3 &&
      form.usernames.length > 3 &&
      form.passwords.length > 3
    ) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });
      setPasswordsArray([...passwordsArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      setForm({ sites: "", usernames: "", passwords: "" });
    } else {
      toast("Password Not Saved");
    }
  };
  const deletePassword = async (id) => {
    let c = confirm("Do you really want to delete this password ?");
    if (c) {
      setPasswordsArray(passwordsArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    }
  };
  const editPassword = (id) => {
    setForm({ ...passwordsArray.filter((item) => item.id === id)[0], id: id });
    setPasswordsArray(passwordsArray.filter((item) => item.id !== id));
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="p-2 pt-3 md:mycontainer min-h-[88.3vh]">
        <h1 className="text-4xl font-bold text-center">PassGuard</h1>
        <p className="text-lg text-center">Your own Password Manager</p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            placeholder="Enter website url"
            value={form.sites}
            onChange={handleChange}
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="sites"
            id="sites"
          />
          <div className="flex flex-col md:flex-row  w-full justify-between gap-8">
            <input
              placeholder="Enter username"
              value={form.usernames}
              onChange={handleChange}
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="usernames"
              id="usernames"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                placeholder="Enter password"
                value={form.passwords}
                onChange={handleChange}
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="text"
                name="passwords"
                id="passwords"
              />
              <span
                className="absolute right-[3px] top-[3px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center item-center bg-green-600 hover:bg-green-400 rounded-full px-8 py-2 border-1 border-black w-fit gap-2"
          >
            {" "}
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordsArray.length === 0 && <div>No Password To Show</div>}
          {passwordsArray.length != 0 && (
            <table className="table-auto w-full bg-blue-100 rounded-md overflow-hidden mb-10">
              <thead className="bg-blue-300">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordsArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border border-white py-2 text-center">
                        <div
                          className="lordiconcopy flex justify-center items-center"
                          onClick={() => {
                            copyText(item.sites);
                          }}
                        >
                          <a
                            href={item.sites}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.sites}
                          </a>
                          <div className="cursor-pointer w-5">
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "6px",
                              }}
                              src="https://cdn.lordicon.com/lomfljuq.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="border border-white py-2 text-center">
                        <div
                          className="flex justify-center items-center"
                          onClick={() => {
                            copyText(item.usernames);
                          }}
                        >
                          {item.usernames}
                          <div className="lordiconcopy cursor-pointer w-5">
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "6px",
                              }}
                              src="https://cdn.lordicon.com/lomfljuq.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="flex justify-center items-center border border-white py-2 text-center">
                        <div
                          className="lordiconcopy flex justify-center items-center"
                          onClick={() => {
                            copyText(item.passwords);
                          }}
                        >
                          <span>
                            {item.passwords
                              ? "*".repeat(item.passwords.length)
                              : ""}
                          </span>
                          <div className="cursor-pointer w-5">
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "6px",
                              }}
                              src="https://cdn.lordicon.com/lomfljuq.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" border border-white py-2 text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default Manager;
