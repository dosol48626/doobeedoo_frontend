import { atom } from "recoil";

export const todoDetailFormState = atom({
    key: "todoDetailFormState", 
  default: {
    todoId: null,     
    user_id: null,    
    title: "",        
    description: "",  
    dueDate: "",      
    complete: false,  
    createDate: "",   
    todoImage: "",    
    priority: "BLACK",
    routine_id: null, 
  },
});

//이거 괜히 한거 같은데;;
//이걸로 상세내용 담아서 줄라 했는데..
//이거 문제점이 있음. 이거는 아톰으로 전역관리해버리니까 수정되는거,
//그니까 이미지를 추가해서 수정하면 다른 투두에도 들어가면 그 이미지 있음.