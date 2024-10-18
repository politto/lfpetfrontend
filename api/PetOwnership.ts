import axiosApi, { isAxiosError } from "@/utils/axiosApi";
import { IPetOwnerShip } from "@/types/IpetOwnerShip";

/*    @PostMapping("/createPetOwnership")
    fun createPetOwnership(@RequestBody petOwnershipEntityIEntity):ResponseEntity<String>{
        val createdPetInfo =  petOwnershipService.createPetOwnership(petOwnershipEntity)
        return ResponseEntity.ok("PetOwnership Created")
    }

    @GetMapping("/getPetsByAccountId")
    fun getPetsByAccountId(@RequestParam accountId: Long):ResponseEntity<List<PetInfoEntity>>{
        return ResponseEntity.ok(petOwnershipService.getPetsByAccountId(accountId))
    }

    @GetMapping("/getCurrentPetsByAccountId")
    fun getCurrentPetsByAccountId(@RequestParam accountId: Long):ResponseEntity<List<PetInfoEntity>>{
        return ResponseEntity.ok(petOwnershipService.getCurrentPetsByAccountId(accountId))
    }
    
    
    
    */
// must fetch for these baxkend apis

export const createPetOwnershipService = (petOwnership: IPetOwnerShip) => {
   
    return axiosApi.post("/createPetOwnership", petOwnership)
    .then(response => response.data)
    .catch(error => {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data);
        } else {
            throw new Error("An error occurred while getting accounts.");
        }
    });
};

export const getPetsByAccountId = (accountId: string) => {
    return axiosApi.get(`/getPetsByAccountId?accountId=${accountId}`)
   .then(response => response.data)
   .catch(error => {
       if (isAxiosError(error)) {
           throw new Error(error.response?.data);
       } else {
           throw new Error("An error occurred while getting accounts.");
       }
   });
}

export const getCurrentPetsByAccountId = (accountId: string) => {
    return axiosApi.get(`/getCurrentPetsByAccountId?accountId=${accountId}`)
   .then(response => response.data)
   .catch(error => {
       if (isAxiosError(error)) {
           throw new Error(error.response?.data);
       } else {
           throw new Error("An error occurred while getting accounts.");    

       }
    });
}