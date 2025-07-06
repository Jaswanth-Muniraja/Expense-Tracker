// import React, {createContext, useState} from 'react';

// export const UserContext = createContext();
// const UserProvider = ({children}) => {
//     const [user, setUser] = useState(null);

//     const updateUser = (userData) => {
//         setUser(userData)
//     }

//     const clearUser = () => {
//         setUser(null);
//     }

//     return(
//         <UserContext.Provider
//             value={{
//                 user,
//                 updateUser,
//                 clearUser
//             }}>
//                 {children}
//         </UserContext.Provider>
//     );
// }

// export default UserProvider;

import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // loading flag

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoadingUser(false);
  }, []);

  const updateUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const clearUser = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
