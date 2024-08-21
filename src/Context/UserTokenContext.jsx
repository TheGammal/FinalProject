import { createContext, useEffect, useState } from "react";

export let UserTokenContext = createContext(null)

export default function UserTokenContextProvider({children}) {
    let [token, setToken] = useState(null)

    useEffect(() => { //Because, الصفحة لما يتعملها ريفراش تفضل زي ما هي محتفظة باللوجين والشروط اللي معاه زي اظهار اشياء محددة
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        }
    }, [])

    return <UserTokenContext.Provider value={{token, setToken}}>
        {children}
    </UserTokenContext.Provider>
}