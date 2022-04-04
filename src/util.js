import * as React from "react";
import Slab from './assets/icons/brick-wall-100.png'
import Compass from './assets/icons/compass-north-80.png'
import WetLoose from './assets/icons/icons8-wet-100.png'
import WindSlab from './assets/icons/icons8-wind-90.png'
import Cornice from './assets/icons/ocean-wave-100.png'
import PersistentSlab from './assets/icons/reinforced-concrete-100.png'

export function determineRiskColor(risk){
    switch(risk) {
        case 1:
            return "bg-green-500"
            break;
        case 2:
            return "bg-yellow-400"
            break;
        case 3:
            return "bg-orange-500"
            break;
        case 4:
            return "bg-red-700"
            break;
        case 5:
            return "bg-black"
            break;
        default:
            return "bg-white"
    }
}

export function determineRiskImage(risk){
    switch(risk) {
        case "Storm Slab":
            return <img className={"w-12 mx-2 drop-shadow-sm"} src={Slab} />
            break;
        case "Wet Loose":
            return <img className={"w-12 mx-2 drop-shadow-sm"} src={WetLoose} />
            break;
        case "Wind Slab":
            return <img className={"w-12 mx-4 drop-shadow-sm"} src={WindSlab} />
            break;
        case "Cornice":
            return <img className={"w-12 mx-4 drop-shadow-sm"} src={Cornice} />
            break;
        case "Persistent Slab":
            return <img className={"w-12 mx-4 drop-shadow-sm"} src={PersistentSlab} />
            break;
        default:
            return <div className={"w-12 mx-4"}/>


    }
}
