import {useContext} from "react";
import {UserProvider} from "../context/UserContext";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import QRCode from "react-qr-code";


export default function QRCodePage () {
    const userContext = useContext(UserProvider)


return (
    <div>
        <QRCode value={"localhost:3000/question" + userContext.userId}/>
    </div>
);

}