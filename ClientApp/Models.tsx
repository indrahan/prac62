export type Course ={
    id:number,
    courseCode:string,
    subject:string,
    lectures:Lecture[]
}

export type Lecture ={
    id:number,
    teacher:string,
    lectureCode:string
}