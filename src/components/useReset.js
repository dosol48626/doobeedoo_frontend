import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { selectedTodoState } from "../recoil/selectedTodoAtom";

const useReset = () => {
    const location = useLocation();
    const setSelectedTodo = useSetRecoilState(selectedTodoState);

    useEffect(() => {
        setSelectedTodo(null);
    }, [location, setSelectedTodo]);
}

export default useReset;

//이게 지금 페이지 이동하면 셀렉트 초기화해서 상세보기 안보이게 할라고 훅 커스텀한건데;;
//잘 되려나;;
//이거만 하면 안되네;;;