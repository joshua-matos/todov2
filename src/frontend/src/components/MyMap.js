import React from 'react';
import { Scene } from '@esri/react-arcgis';
import BermudaTriangle from "./BermudaTriangle";

export default (props) => (
    <Scene
        style={{ width: '80vw', height: '100vh' }}
        mapProperties={{ basemap: 'satellite' }}
        viewProperties={{
            center: [-122.4443, 47.2529],
            zoom: 6
        }}
        >
        <BermudaTriangle  graphics={props.graphic} pointA={props.pointA} pointB={props.pointB} pointC={props.pointC} pointD={props.pointD} setTheGraphic={props.setTheGraphic}/>
    </Scene>

)
