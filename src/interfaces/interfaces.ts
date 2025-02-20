export interface BOMBAPI {
    name: string,
    url: string,
    payload: any,
    origin: string,
    referer: string,
    formate?: boolean,
    slice?: boolean,
};

export interface BOMBAPIS {
    APIs: Array<BOMBAPI>, 
    headers: any, 
};