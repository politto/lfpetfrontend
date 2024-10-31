import axiosApi, { isAxiosError } from "@/utils/axiosApi";
import { IAccount } from "@/types/IAccount";

export const uploadImage = (image: File, displayName: string) => {
    return axiosApi.post("/uploadImg", {
        img: image,
        displayName: displayName,
      },
      {
        headers: {
            'Content-Type': 'multipart/form-data', // Set the correct content type
        }
      }
    )
    .then(response => response.data)
    .catch(error => {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while updating an account.");
        }
    });
}

export const deleteImage = (imgurl: string) => {
    return axiosApi.delete("/deleteImg?imgName=" + imgurl).then(response => response.data)
    .catch(error => {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while updating an account.");
        }
    });
}