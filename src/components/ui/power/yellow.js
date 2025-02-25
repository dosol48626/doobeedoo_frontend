import  {useEffect} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState } from "../../../recoil/accountAtom";
import { getTodosByPriority } from "../../../services/todoService";
import { yellowTodosState } from "../../../recoil/priorityAtom";


const YellowTodosLoader = () => {
    const [, setYellowTodos] = useRecoilState(yellowTodosState);
    const { token } = useRecoilValue(accountState);

    

    useEffect(() => {
        const fetchYellowTodos = async () => {
            try {
                const data = await getTodosByPriority("Yellow", token);
                setYellowTodos(data);
            } catch (error) {
                throw error;
            }
        }
        fetchYellowTodos();
    }, [token, setYellowTodos]);
    return null;
}
export default YellowTodosLoader;
