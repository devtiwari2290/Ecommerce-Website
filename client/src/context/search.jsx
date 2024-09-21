import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};
const useSearch = () => useContext(SearchContext);
export { SearchProvider, useSearch };

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
