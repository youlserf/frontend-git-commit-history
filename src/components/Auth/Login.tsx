import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import {
  ErrorMessage,
} from "../CustomElements";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await instance.post("/auth/login", {
        username,
        password,
      });

      if (response.status === 201) {
        const token = response.data.access_token;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        navigate("/commit-history");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <section>
      <div className="bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
        <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
          <div className="flex justify-center items-center">
            <div>
              <h2 className="text-4xl text-black">Login</h2>
            </div>
          </div>

          <input
            value="https://jamstacker.studio/thankyou"
            type="hidden"
            name="_redirect"
          />
          <div className="mt-4 space-y-6">
            <div className="col-span-full">
              <label className="block mb-3 text-sm font-medium text-gray-600">
                {" "}
                Username{" "}
              </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="col-span-full">
              <label className="block mb-3 text-sm font-medium text-gray-600">
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="col-span-full">
              <button
                onClick={handleLogin}
                className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
              >
                {" "}
                Send{" "}
              </button>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
