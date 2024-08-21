import { createContext, useState } from "react";

export let CounterContext = createContext()

export default function CounterContextProvider({children}) {
    let [counter, setCounter] = useState(10)
    let [name, setName] = useState("Nour")

    return <CounterContext.Provider value={{counter, name}}>
        {children}
    </CounterContext.Provider>
}