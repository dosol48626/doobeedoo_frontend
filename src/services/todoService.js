import axios from "axios";

const API_URL = "http://localhost:8000/api/todos";


//근데 왜왜 토큰을 두번 검사 받는거지..??아 토큰을 받고 그 토큰을 헤더에 같이 넣어준거구나나 ㅇㅎ!
//오늘 투두 가져오기기
export const getTodayTodos = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/today/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error){
        throw error;
    }
}

//이제 서비스 만드는거 감이 오네
//오늘 말고 전부 가져오기기
export const getNextTodos = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/next/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error){
        throw error;
    }
}

//셀렉터에 넣을 투두 다 가져오기
export const getAllTodos = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("전체데이터", response.data)
        return response.data;
    } catch (error){
        throw error;
    }
}
//완료 투두 가져오는게 안되는 이유가 뭐지 여기를 찾아봐야지
//찾았다 true가 아니고 디비에 저장된게 1 이잖슴! 1 로 가져와야지 


// ; 이거 안붙여서 나중에 안되는거 아니겠지...
// 투두 쓰기기
export const createTodo = async (title, dueDate, priority, token) => {
    try {
        const response = await axios.post(`${API_URL}/`,
            {title,dueDate,priority},
            {
               headers: {
                     Authorization: `Bearer ${token}`,
                     "Content-Type": "application/json",
               }
            }
        );
        return response.data;
    } catch (error){
        throw error;
    }
}

//투두 상세보기
export const getTodoDetail = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error){
        throw error;
    }
}

//어?? 여기서 타이틀...아 다 받아야하네
//아 이거 data로 받아오는거 맞나....????? 아닌거 같은데;;;;;;;;;;;;;;;;
//이거 뭔가 이상한데;; data로 받아오면 안될거같은데.. 그럼 어떻게 받아와야하지??
//수정이니까 아이디랑 토큰 받을테고, 아 잠만 아이디 아 아이디 ㅇㅇ
//수정하기...를 나중에 폼 그런걸 전체를 data로 묶어서 주고 id도 userId = id 이렇게해서 넣어서 주면 되잖슴!
export const udateTodo = async (id, data, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error){
        throw error
    }
}

//삭제하기
export const deleteTodo = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error){
        throw error;
    }
}

//중요도 별 조회하기
//중요도를 빨강 파랑 노랑 검정 으로 했는데 이것도 아까 생각한거처럼 pri~~ = black 이거 넣으면 되겠네네
export const getTodosByPriority = async (priority, token) => {
    try {
        const response = await axios.get(`${API_URL}/`, {
            params: { priority },
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

//검색하기
export const searchTodos = async (query, token) => {
    try {
        const response = await axios.get(`${API_URL}/`, {
            params: { query },
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

//어?? null 넣어줘야해??? 왜????????????????
//그리고 나는 변경하는거 post 메서드 써서 이렇게 했음. put 아님
export const toggleTodo = async (id, token) => {
    try {
        const response = await axios.post(`${API_URL}/${id}/toggle/`,
             {} , {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error){
        throw error;
    }
}


//투두 점수 조회 하기!!
//이걸로 점수에 따라서 성장 이미지 제공. 근데 실시간으로 점수가 잘 반영될지는 의문ㅎㅎ
export const getTodoScore = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/score/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error
    }
}

//투두 서비스까지 완료.