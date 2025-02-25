import  {useEffect} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState } from "../../../recoil/accountAtom";
import { getTodosByPriority } from "../../../services/todoService";
import { blueTodosState } from "../../../recoil/priorityAtom";

const BlueTodosLoader = () => {
    const [, setBlueTodos] = useRecoilState(blueTodosState);
    const { token } = useRecoilValue(accountState);

    useEffect(() => {
        const fetchBlueTodos = async () => {
            try {
                const data = await getTodosByPriority("Blue", token);
                setBlueTodos(data);
            } catch (error) {
                throw error;
            }
        }
        fetchBlueTodos();
    }, [token, setBlueTodos]);
    return null;
}
export default BlueTodosLoader;
