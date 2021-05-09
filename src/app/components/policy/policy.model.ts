export interface Policy {
    id?: string
    policyNumber?: number
    startOfTerm: Date
    endOfTerm: Date
    vehicleLicensePlate: string
    policyValue: number
}