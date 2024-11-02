export interface IPet {
    petId: number | null;
    petName: string;
    petType: string;
    breed: string;
    birthDate: Date | null | string;
    gender: string;
    isAdopted: boolean;
    detail: string;
    lastLat: number;
    lastLng: number;
    isLost: boolean;
    isDeceased: boolean;
    lastPicLink: string;
    isDeleted: boolean;
}