export type AddBookRequest = {
    name: string
    genre: string
    author: string
    dateOfWritten: Date
}

export type ChangeBookRequest = {
    id: string
    name: string
    genre: string
    author: string
    dateOfWritten: Date
}