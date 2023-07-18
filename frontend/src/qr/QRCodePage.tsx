import {useContext} from "react";
import {UserProvider} from "../context/UserContext";
import QRCode from "react-qr-code";


export default function QRCodePage () {
    const userContext = useContext(UserProvider)


    return (
        <div>
            <p>{"socialinterventiontool.fly.dev/question/" + userContext.userId.id}</p>
            <QRCode value={"socialinterventiontool.fly.dev/question/" + userContext.userId.id}/>
        </div>
    );
}