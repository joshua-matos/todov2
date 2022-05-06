// Items: Renders all Item components
import * as React from 'react';
import Item from "./Item";

const Items = (props) => {
    return (<Item text={props.text}/>)
}

export default Items;