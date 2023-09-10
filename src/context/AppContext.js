import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const addToWishlist = (item) => {
        setWishlist((prevState) => [...prevState, item]);
    };

    const removeFromWishlist = (item) => {
        setWishlist((prevState) => prevState.filter((i) => i !== item));
    };

    return (
        <AppContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "useAppContext doit être utilisé à l'intérieur du AppContextProvider"
        );
    }

    return context;
};
