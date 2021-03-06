/**
 * Invocar el mostrar/ocultar los tooltips dentro del mapa
 * @param {Map} map objeto mapa de Open Layers
 * @param {*} e evento
 */
 
 export const invoke_clicks = (map, e, component) => {
    
    const hightlight_on_click = (feature) => {
        if (feature !== component.highlight_feature) {
            if (component.highlight_feature) {
                component.highlight_feature.set("_hightlight", false);
            }
            if (feature) {
                feature.set("_hightlight", true);
            }
            component.highlight_feature = feature;
        }
    }

    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);

    //let capas_con_tooltip = map.getLayers().getArray().filter(item=>item.get("_tooltip")!=undefined).map(item2=>item2.get("id"))
    
    //let tooltip_overlay = map.getOverlayById("tooltip")
    //let tooltipelement = document.getElementById("fixed-tooltip-content");
    if (hit) {
        var f_l = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
            return [feature, layer];
        });

        if (f_l) {
            var layer = f_l[1];
            var feature = f_l[0];

            let id = layer.get("id")
            component.layers[id].$emit("click_feature",f_l)
            hightlight_on_click(feature)
            map.getView().fit(feature.getGeometry(),{duration:500})

            //lo demas que pasa si es que si ahy tooltip para esta capa
            /** 
            if (capas_con_tooltip.includes(layer.get("id")) ) {
                //hightlight_on_hover(f_l[0]);
                //if (layers[layer.get("name")].highlight_accessor != undefined) {
                //    layers[layer.get("name")].highlight_accessor(f_l[0])
                //}

                let contenido = layer.get("_tooltip")
                if(typeof contenido == "function"){
                    contenido = contenido(feature.getProperties())
                }

                //console.log(contenido,"es lo que acaba de pasar, este es el contenido a mandar en el tooltip")

                let ext = map.getView().calculateExtent();
                let x3 = (ext[0] + ext[2]) / 2;
                let y3 = (ext[1] + ext[3]) / 2;
                tooltip_overlay.setPosition([e.coordinate[0], e.coordinate[1]])
                        //console.log(x3,e.coordinate[0])
                if (e.coordinate[0] > x3) {
                        tooltip_overlay.getElement().classList.remove("ol-tooltip-right");
                        tooltip_overlay.getElement().classList.add("ol-tooltip-left");
                } else {
                        tooltip_overlay.getElement().classList.remove("ol-tooltip-left");
                        tooltip_overlay.getElement().classList.add("ol-tooltip-right");
                }
                if (e.coordinate[1] > y3) {
                        tooltip_overlay.getElement().classList.remove("ol-tooltip-top");
                        tooltip_overlay.getElement().classList.add("ol-tooltip-bottom");
                } else {
                        tooltip_overlay.getElement().classList.remove("ol-tooltip-bottom");
                        tooltip_overlay.getElement().classList.add("ol-tooltip-top");
                }
                tooltip_overlay.getElement().querySelector(".content").innerHTML = contenido

                //componente.toltipcontent = componente._fn_tooltip(f_l[0].getProperties());
            } else {
                tooltip_overlay.setPosition(undefined)
                //tooltipelement.classList.remove("show")
            }
            **/
        } else {

            //tooltip_overlay.setPosition(undefined)
            //tooltipelement.classList.remove("show")
        }
    } else {
        //tooltip_overlay.setPosition(undefined)
        //tooltipelement.classList.remove("show")
    }
}