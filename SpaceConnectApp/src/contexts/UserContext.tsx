import { createContext, useContext, useEffect, useState } from "react";

import { saveUser, loadUser} from "../storage/userStorage";

type UserContextType = {
    username: string;
    treatment: string;

    saveProfile: (
        username: string,
        treatment: string
    ) => Promise<void>;

    loadProfile: () => Promise<void>;
};


export const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({children,}: {children: React.ReactNode;}) {
    
    const [username, setUsername] = useState("");

    const [treatment, setTreatment] = useState("Sr.");

    async function loadProfile() {

        const prefs =await loadUser();

        if (prefs) {
            setUsername(prefs.username);
            setTreatment(prefs.treatment);

        } else {
            setUsername("");
            setTreatment("Sr.");

        }
    }

    async function saveProfile(newUsername: string, newTreatment: string) {

        await saveUser(newUsername, newTreatment);

        setUsername(newUsername);

        setTreatment(newTreatment);
    }

    useEffect(() => {

        loadProfile();

    }, []);

    return (

        <UserContext.Provider
            value={{
                username,
                treatment,
                saveProfile,
                loadProfile,
            }}
        >

            {children}

        </UserContext.Provider>

    );
}
