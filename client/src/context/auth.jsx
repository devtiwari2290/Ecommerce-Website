import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedata = JSON.parse(data);
      setAuth({
        ...auth,
        user: parsedata.user,
        token: parsedata.token,
      });
    }
    // eslint-disable-next-line
  }, [auth && auth.token]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };

// import { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     user: null,
//     token: "",
//   });

//   // Set default axios header when token is available
//   useEffect(() => {
//     if (auth?.token) {
//       axios.defaults.headers.common["Authorization"] = auth.token;
//     }
//   }, [auth.token]);

//   useEffect(() => {
//     const data = localStorage.getItem("auth");
//     if (data) {
//       const parsedata = JSON.parse(data);
//       setAuth({
//         user: parsedata.user,
//         token: parsedata.token,
//       });
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={[auth, setAuth]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { AuthProvider, useAuth };
