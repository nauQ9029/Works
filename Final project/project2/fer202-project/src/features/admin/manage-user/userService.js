import { changeStatusUserAPI, fetchUserAPI } from "./userAPI";

export const changeStatusUser = async (id, status) => {
try {
        const res = await changeStatusUserAPI(id, status)
        return res.data;
        
    } catch (error) {
        console.error("Lỗi khi tải update status user:", error);
    }
}

export const fetchUser = async () => {
try {
        const res = await fetchUserAPI()
        return res.data;
        
    } catch (error) {
        console.error("Lỗi khi tải fetch user:", error);
    }
}