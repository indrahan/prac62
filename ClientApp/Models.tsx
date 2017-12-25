export type Movie ={
    id:number,
    title:string,
    genre:string,
    actors:Actor[]
}

export type Actor ={
    id:number,
    name:string,
    surname:string
}