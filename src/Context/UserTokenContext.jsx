import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let UserTokenContext = createContext(null)

export default function UserTokenContextProvider({children}) {
    let [token, setToken] = useState(null)
    let [userId, setUserId] = useState()

    function convertToken() {
        let data = jwtDecode(localStorage.getItem("token"))
        setUserId(data.id)
        console.log(data, data.id, "dafjdfjhdjfhakljdfhadjhfbh");
    }

    useEffect(() => { //Because, الصفحة لما يتعملها ريفراش تفضل زي ما هي محتفظة باللوجين والشروط اللي معاه زي اظهار اشياء محددة
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            convertToken()
        }
    }, [])

    return <UserTokenContext.Provider value={{token, setToken, convertToken, userId}}>
        {children}
    </UserTokenContext.Provider>
}