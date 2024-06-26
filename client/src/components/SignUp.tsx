import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendSignUpData = async () => {
    // const singUpData = await fetch("http://localhost:5000/api/v1/user", {
    const singUpData = await fetch("https://pedalstart.onrender.com/api/v1/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const receivedData = await singUpData.json();
    if (receivedData.message === "User data added successfully") {
      toast.success("Sign Up successful!");
      window.location.href = "/";
    } else if (receivedData.message === "UserAlready") {
      toast.error("User already exists, Please sign in");
    } else if (receivedData.message === "Data missing") {
      toast.error("Email name or password is missing");
    } else {
      toast.error("Error: Sign Up failed!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-950 h-[91vh] lg:w-full flex items-center justify-center border-0 signUpDiv">
        <div className="lg:w-[60vw] mainDivSignUp2 md:flex items-center justify-center border-0">
          <div className="bg-gray-900 lg:w-[80%] mainDivSignUp h-full shadow-lg rounded py-6 px-10">
            <p
              tabIndex={0}
              className="focus:outline-none account tracking-widest lg:text-2xl font-bold leading-6 text-gray-300"
            >
              Create your account
            </p>
            <p
              tabIndex={0}
              className="focus:outline-none flex items-center justify-between text-xs mt-4 font-medium leading-none text-gray-500"
            >
              Already have an account?
              <Link
                to="/signIn"
                className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-xs ml-2 font-medium leading-none text-gray-500 cursor-pointer"
              >
                Sign In
              </Link>
            </p>
            <div className="flex items-center justify-between">
              {/* name email pass */}
              <div className="w-full">
                <div className="mt-2 w-full">
                  <label
                    htmlFor="Name"
                    className="text-sm font-medium leading-none text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    id="Name"
                    aria-labelledby="Name"
                    type="text"
                    className="bg-transparent border rounded text-xs font-medium leading-none placeholder-gray-400 text-gray-300 py-3 w-full pl-3 mt-2"
                    placeholder="your name"
                    onChange={(e) => { setName(e.target.value) }}
                  />
                </div>

                <div className="mt-4 w-full">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    aria-labelledby="email"
                    type="email"
                    className="bg-transparent border rounded text-xs font-medium leading-none placeholder-gray-400 text-gray-300 py-3 w-full pl-3 mt-2"
                    placeholder="e.g: abc@gmail.com "
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                <div className="mt-4 w-full">
                  <label
                    htmlFor="pass"
                    className="text-sm font-medium leading-none text-gray-300"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center justify-center">
                    <input
                      id="pass"
                      type={showPass ? "text" : "password"}
                      className="bg-transparent border rounded text-xs font-medium leading-none text-gray-300 py-4 w-full pl-3 mt-2"
                      placeholder="unique password must be 8 digit"
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <div
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-0 mt-2 mr-3 cursor-pointer"
                    >
                      <div id="show">
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                            fill="#71717A"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                role="button"
                className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-900 border-0 rounded hover:bg-indigo-900 py-4 w-full"
                onClick={sendSignUpData}
              >
                Create my account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
