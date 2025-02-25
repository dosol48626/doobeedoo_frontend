import  {useEffect} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { redTodosState } from "../../../recoil/priorityAtom";
import { accountState } from "../../../recoil/accountAtom";
import { getTodosByPriority } from "../../../services/todoService";

const RedTodosLoader = () => {
    const [, setRedTodos] = useRecoilState(redTodosState);
    const { token } = useRecoilValue(accountState);

    useEffect(() => {
        const fetchRedTodos = async () => {
            try {
                const data = await getTodosByPriority("RED", token);
                setRedTodos(data);
            } catch (error) {
                throw error;
            }
        }
        fetchRedTodos();
    }, [token, setRedTodos]);
    return null;
}
export default RedTodosLoader;

//여기서 색깔만 바꿔서 복붙해야지...아 피곤해