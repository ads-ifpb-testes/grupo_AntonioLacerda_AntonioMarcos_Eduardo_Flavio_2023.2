export type Ocurrency = {
    id: string
    idUser: string
    title: string
    type: OcurrencyType
    date: Date
    location: string
}

enum OcurrencyType {
    theft,
    robbery,
    sexualHarassment,
    kidnapping,
    vandalism,
    other
}