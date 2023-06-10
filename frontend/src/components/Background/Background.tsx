import "./Background.css";
import React from "react";


interface Props {
    children: React.ReactNode;
}

const Background: React.FC<Props> = (props) => {

    return (
        <div className={"background"}>
            {props.children}
        </div>
    );
};
export default Background;
