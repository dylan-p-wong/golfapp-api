import { authorization } from "../../../utils/authorization";
import { TierInfoType } from "../../common/types";
import { userTierResolve } from "./user-resolvers";

const userQueries = {
    userTier: {
        type: TierInfoType,
        resolve: (obj, args, context) => {
            return authorization(userTierResolve, {
                obj,
                args,
                context
            });
        }
    }
}

export { userQueries };