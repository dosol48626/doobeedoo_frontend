import  {useEffect} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState } from "../../../recoil/accountAtom";
import { getTodosByPriority } from "../../../services/todoService";
import { blackTodosState } from "../../../recoil/priorityAtom";

const BlackTodosLoader = () => {
    const [, setBlackTodos] = useRecoilState(blackTodosState);
    const { token } = useRecoilValue(accountState);

    useEffect(() => {
        const fetchBlackTodos = async () => {
            try {
                const data = await getTodosByPriority("BLACK", token);
                setBlackTodos(data);
            } catch (error) {
                throw error;
            }
        }
        fetchBlackTodos();
    }, [token, setBlackTodos]);
    return null;
}
export default BlackTodosLoader;