export const images = import.meta.glob("../assets/nodes/*")

export function getImgUrl(fileName:string){
    const imgUrl = new URL(`/src/assets/${fileName}`, import.meta.url).href
    return imgUrl
}

export function getLogoUrl(fileName:string){
    const imgUrl = new URL(`/src/assets/logos/${fileName}`, import.meta.url).href
    return imgUrl
}