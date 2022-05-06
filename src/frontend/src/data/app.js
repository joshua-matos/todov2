import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Search from "@arcgis/core/webdoc/applicationProperties/Search";


const noop = () => {};

export const webmap = new WebMap({
    portalItem: {
        id:  "AAPKb77b6d703ks6x9_AbAnNYyt1ZsQthwY4ebB"
    }
});

export const view = new MapView({
    map: webmap
});

// export const search = new Search({view});
// view.ui.add(search, "top-right");

export const initialize = (container) => {
    view.container = container;
    view.when()
        .then(() => {
            console.log("Map and View are ready");
        })
        .catch(noop);
    return () => {
        view.container = null;
    }
}