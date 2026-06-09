import { createContext, useContext, useEffect, useState } from "react";

import { saveUser, loadUser } from "../storage/userStorage";

type UserContextType = {
    username: string;
    treatment: string;

    saveProfile: (
        username: string,
        treatment: string
    ) => Promise<void>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({children,}: {children: React.ReactNode;}) {

    const [username, setUsername] = useState("");
    const [treatment, setTreatment] = useState("Sr.");

    useEffect(() => {

        async function load() {

            const prefs = await loadUser();

            if(prefs){
                setUsername(prefs.username);
    
                setTreatment(prefs.treatment);
            }

        }

        load();

    }, []);

    async function saveProfile(newUsername: string, newTreatment: string) {

        await saveUser( username, treatment);

        setUsername(newUsername);
        setTreatment(newTreatment);
    }

    return (
        <UserContext.Provider
            value={{
                username,
                treatment,
                saveProfile,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}