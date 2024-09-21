import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      setCart(JSON.parse(existingCartItem));
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
const useCart = () => useContext(CartContext);
export { CartProvider, useCart };

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
