import { createContext, useState } from "react";

export const FeedContext = createContext({});

function FeedProvider({ children }) { 

    const [feed, setFeed] = useState();
    console.log(feed)

    return (
        <FeedContext.Provider value={{ feed, setFeed }}>
            {children}
        </FeedContext.Provider>
    );

}

export { FeedProvider };