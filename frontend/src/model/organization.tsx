export type Organization = {
    id: string,
    name: string,
    category: "BERATUNG" | "ANGEBOTE",
    topic: "ARMUT" | "WOHNUNG" | "EINSAMKEIT" | "KULTUR" | "ARBEIT" | "AUSBILDUNG" | "BEZIEHUNG" | "ERKRANKUNG" | "PFLEGE" | "MISSBRAUCH",
    description: string,
    contact: {
        address: {
            street_and_number: string,
            postal_code: string,
            location: string,
            maps: string
        },
        e_mail: string,
        phone: string,
        mailto: string,
        website: string
    }

}