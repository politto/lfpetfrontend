import { IFindPetsThatAlike } from "@/types/IfindPetsThatAlike";
import { IPet } from "@/types/IPet";
import axiosApi, { isAxiosError } from "@/utils/axiosApi";

export const createPet = async (pet: IPet) => {
    try {
        const response = await axiosApi.post<IPet>("/createPet", pet);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while creating a pet.");
        }
    }
};

export const updatePet = async (pet: IPet) => {
    try {
        const response = await axiosApi.patch<IPet>("/updatePet", pet);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while updating a pet.");
        }
    }
};

export const getPets = async () => {
    try {
        const response = await axiosApi.get<IPet[]>("/getPets");
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while getting pets.");
        }
    }
};

export const getPetById = async (petId: number) => {
    try {
        const response = await axiosApi.get<IPet>("/getPetById?petId=" + petId);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while getting a pet by id.");
        }
    }
};

export const findPetsThatAlike = async (findPetsThatAlike: IFindPetsThatAlike) => {
    try {
        const response = await axiosApi.get<IPet[]>("/findPetsThatAlike", {
            data:findPetsThatAlike
        });
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while finding pets that alike.");
        }
    }
};

export const setIsAdopted = async (isAdopted: boolean, petId: number) => {
    try {
        const response = await axiosApi.patch<number>("/setIsAdopted?isAdopted=" + isAdopted + "&petId=" + petId);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while setting is adopted.");
        }
    }
};

export const deletePet = async (petId: number) => {
    try {
        const response = await axiosApi.post("/deletePet?petId=" + petId);
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while deleting a pet.");
        }
    }
};