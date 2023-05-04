export type Organization = {
    id: string,
    name: string,
    category: "BERATUNG" | "ANGEBOTE",
    topic: {searchTerms : string[], name: string},
    description: string,
    contact: Contact
}

export type Address = {
    street_and_number: string,
    postal_code: string,
    location: string,
    maps: string
}

export type Contact = {
    address: Address,
    e_mail: string,
    phone: string,
    mailto: string,
    website: string
}

export const dummyOrganization: Organization = {
    id: "",
    name: "",
    category: "BERATUNG",
    topic: {searchTerms: ["ARMUT"], name: "ARMUT"},
    description: "",
    contact: {
        address: {
            street_and_number: "",
            postal_code: "",
            location: "",
            maps: ""
        },
        e_mail: "",
        phone: "",
        mailto: "",
        website: ""
    }
}

export type NewOrganization = {
    name: string,
    category: "BERATUNG" | "ANGEBOTE",
    topic: string,
    description: string,
    contact: Contact
}

export const newDummyOrganization: NewOrganization = {
    name: "",
    category: "BERATUNG",
    topic: "ARMUT",
    description: "",
    contact: {
        address: {
            street_and_number: "",
            postal_code: "",
            location: "",
            maps: ""
        },
        e_mail: "",
        phone: "",
        mailto: "",
        website: ""
    }


}
