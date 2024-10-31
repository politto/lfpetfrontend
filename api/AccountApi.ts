
import axiosApi, { isAxiosError } from "@/utils/axiosApi";
import { IAccount } from "@/types/IAccount";


export const createAccount = (account: IAccount) => {
    return axiosApi.post("/createIAccount", account)
    .then(response => response.data)
    .catch(error => {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while creating an account.");
        }
    });
}

export const getAccounts = () => {
    return axiosApi.get<IAccount[]>("/getAccounts")
    .then(response => response.data)
    .catch(error => {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while getting accounts.");
        }
    });
}

export const getAccountById = (accountId: number) => {
    return axiosApi.get<IAccount>("/getAccountById?accountId=" + accountId)
    .then(response => response.data)
    .catch(error => {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while getting an account by id.");
        }
    });
}

export const getAllPresentOwnedPet = (accountId: number) => {
    return axiosApi.get("/getAllPresentOwnedPet?accountId=" + accountId)
    .then(response => response.data)
    .catch(error => {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while getting all present owned pets.");
        }
    });
}

export const authenticate = (sessionToken: string, accountId: number) => {
    return axiosApi.patch("/authenticate?sessionToken=" + sessionToken + "&accountId=" + accountId)
    .then(response => response.data)
    .catch(error => {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while authenticating.");
        }
    });
}

export const updateAccount = (account: IAccount) => {
    return axiosApi.patch("/updateAccount", account)
    .then(response => response.data)
    .catch(error => {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while updating an account.");
        }
    });
}

export const deleteAccount = (accountId: number) => {
    return axiosApi.post("/deleteAccount?accountId=" + accountId)
    .then(response => response.data)
    .catch(error => {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while deleting an account.");
        }
    });
}