import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "@user";

export async function saveUser(username: string,treatment: string) {

    await AsyncStorage.setItem(
        USER_KEY,
        JSON.stringify({
            username,
            treatment,
        })
    );
}

export async function loadUser() {

    const user = await AsyncStorage.getItem(USER_KEY);

    return user
        ? JSON.parse(user)
        : null;
}