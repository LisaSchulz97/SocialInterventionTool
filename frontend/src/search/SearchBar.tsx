import {ChangeEvent} from "react";
import TextField from "@mui/material/TextField";

type SearchBarProps = {

    text: string,
    onTextChange: (value: string) => void
}

export default function SearchBar (props: SearchBarProps) {


    function onTextChange(event: ChangeEvent<HTMLInputElement>) {
        props.onTextChange(event.target.value)
    }



    return (
        <div>

            <TextField value={props.text} onChange={onTextChange} label="Beratungsstelle suchen" id="outlined-basic" color="primary" sx={{width: "60%"}} variant="outlined"/>

        </div>
    )
}


