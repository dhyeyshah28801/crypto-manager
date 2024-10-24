import { userData } from "@/assets/data/userData";
import constants from "@/constants";
import {
  User,
  UserFetchRequest,
  UserRole,
} from "@/models/userModel";

export const getUsers = (
  params: UserFetchRequest
): Array<User> => {
    //   return apiService.get("/users", {}, params);
    console.log(params)
    const finalUsers = userData.filter((user) => {
        if( params.searchString && params.searchString !== '' && !user.name.includes(params.searchString)){
            return false
        }

        if(params.status && params.status !== user.status){
            return false
        }

        if( params.userRole && params.userRole !== user.userRoleId){
            return false
        }
        return true
    })
    return finalUsers;
};

export const roleConvertor = (roleName: string): UserRole => {
    return constants.ROLE_MAP[roleName as keyof typeof constants.ROLE_MAP] as UserRole
}

export const statusConvertor = (roleName: string): 0 | 1 => {
    return constants.USER_STATUS_MAP[roleName as keyof typeof constants.USER_STATUS_MAP] as 0 | 1
}

export const addUser = (body: User): void => {
    //   return apiService.post("baseUrl/user", body);
};

