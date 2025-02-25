import { atom } from "recoil";

export const todoDetailFormState = atom({
    key: "todoDetailFormState", // 고유 키
  default: {
    todoId: null,      // 투두 ID (BIGINT, PK)
    user_id: null,     // 사용자 ID (FK)
    title: "",         // 투두 제목
    description: "",   // 투두 설명
    dueDate: "",       // 마감 기한 (YYYY-MM-DD 형식)
    complete: false,   // 완료 여부 (BOOLEAN)
    createDate: "",    // 생성 날짜 (YYYY-MM-DD 등)
    todoImage: "",     // 투두 이미지 (URL 문자열 등)
    priority: "BLACK", // 우선 순 (ENUM, 기본: BLACK)
    routine_id: null,  // 루틴 ID (FK)
  },
});

//이거 괜히 한거 같은데;;
//이걸로 상세내용 담아서 줄라 했는데..
//이거 문제점이 있음. 이거는 아톰으로 전역관리해버리니까 수정되는거,
//그니까 이미지를 추가해서 수정하면 다른 투두에도 들어가면 그 이미지 있음.