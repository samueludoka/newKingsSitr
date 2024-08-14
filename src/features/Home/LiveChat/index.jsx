import styles from "./index.module.css";
import React, {useEffect} from "react";

const LiveChat = () =>{
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://app.jivosite.com/join.html?token=bd10d385925940ce8a2e5d9eb336956f.2493266';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div className={styles.Only}>
            <h1>Welcome to My Website</h1>
        </div>
    );
}
export default LiveChat;