export interface weatherResponse{
    name:string;
    main:{
        temp:number;
temp_min:number;
temp_max:number;
humidity:number;
    }


    weather:Array<{description:string}>;
    wind:{
        speed:number;
    }
    visiblity:number;
}

export interface GeoLOcation{
    lat:number;
    lon:number;
}

export  interface ErrorResponse{
    message:string;
    cod:number;
}