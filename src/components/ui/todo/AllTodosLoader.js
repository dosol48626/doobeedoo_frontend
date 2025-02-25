import { useEffect } from "react";
import { getAllTodos } from "../../../services/todoService";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState } from "../../../recoil/accountAtom";
import { allTodosState } from "../../../recoil/todoAtom";


const AllTodosLoader = () => {
    const [, setAllTodos] = useRecoilState(allTodosState);
    const { token } = useRecoilValue(accountState);

    useEffect(() => {
        async function fetchAllTodos(){
            try {
                const todos = await getAllTodos(token);
                setAllTodos(todos);
            } catch (error){
                console.error("전체 투두 가져오기 실패", error);
            }
        }
        fetchAllTodos();
    }, [token, setAllTodos]);
    return null;
};

export default AllTodosLoader;