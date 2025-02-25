import { selector } from "recoil";
import { allTodosState } from "./todoAtom";

export const completedTodosState = selector({
    key: "completedTodosState",
    get: ({ get }) => {
        const allTodos = get(allTodosState);
        console.log(allTodos);
        return allTodos.filter((todo) => todo.complete === true);
    },
});

//나중에 헷갈리지않게 적어야겠네..
//이게 그 그거임. 서버에서 완료 투두 가져오기 안만들었잖슴.
//그래서 서버에서 다시 만들려 했는데, 서버에서 가져오는 방법 말고,
//셀렉터로 짤라서 쓰기로 함.
//그 어차피 서버에서 DRF썻으니까 그냥 겟 해서 가져오면 투두 다 가져와지니까
//서비스에서 전부 가져오는 api 만들고 그거임 올투두 스테이트에서 받은거임
//그리고 그거 들고와서 셀렉터로 쓸거 짤라가지고 컴플릿트 트루 해서 짤라쓴거지.
//과제 내줄때 왠지 이런걸 생각하셨을텐데...서버에서 다 짤라서 줘버려서
//셀렉터 쓸게 이거 밖에 없을듯....ㅎㅎ;;

//여기가 뭐 잘못된거같은데...키가 듀필리케이트하다는데 겹친다는 말인가