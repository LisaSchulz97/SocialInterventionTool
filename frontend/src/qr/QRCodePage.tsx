import {useContext} from "react";
import {UserProvider} from "../context/UserContext";
import QRCode from "react-qr-code";


export default function QRCodePage () {
    const userContext = useContext(UserProvider)


return (
    <div>
        <QRCode value={"socialinterventiontool.fly.dev/question/" + userContext.userId.id}/>
    </div>
);

}