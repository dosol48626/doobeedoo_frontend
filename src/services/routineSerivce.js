import axios from "axios";

const API_URL = "http://localhost:8000/api/routines";


//루틴 만들기! 인데 왜 name 적을때 밑줄 쳐진거지??? 혹시 name이라고 쓰면 안되나;;; 혼동되나? 터지나?
export const createRoutine = async (name, token) => {
    try {
        const response = await axios.post(`${API_URL}/`,
            name,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error){
        throw error;
    }
}

//루틴 전부 보기
export const getRoutines = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

//루틴 상세보기 ㅇㅇ 근데 이것도 조금 헷갈리는게 상세보기 들어가서 투두 쓰면 그 상세보기 id가
//투두에 같이 들어가야하는건데;; 일단 포스트맨은 테스트 성공했는데 프론트에서 이걸 어떻게 구현해야하는거지
export const getRoutineDetail = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error){
        throw error;
    }
}

//루틴 수정하기
//등유 다 썻나보다 난로가 꺼지려고 하네...
//나가서 등유 사와야지지
export const udateRoutine = async (id, name, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/`, 
            {name,},
            {
            headers: { Authorization: `Bearer ${token}` },
            });
        return response.data;
    } catch (error){
        throw error;
    }
}

//루틴 삭제하기
export const deleteRoutine = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error){
        throw error;
    }
}

//루틴에 투두 추가하기..이거 내가 만들었던가?? 이런거 안만든거 같은데
//아 이게 있어야 루틴에 투두를 끼울수 있나??? 그냥 루틴에 들어가서 그 루틴 페이지에서
//투두 쓰면 되는거 아닌가...?? ??????????? 이거 뭔가 이상한데;;;;
// export const 

//루틴 투두 조회하기...는 만들었는데
// export const getTodosByRoutine = async (routineId, token) => {
//     try {
//         const..
//     }
    //이거는 투두에 있어야하는거 아닌가?? 투두 서비스 잖슴. 투두를 가져오는거니까

//일단 그러면 todo host 불러다가 그냥 여기다가 박아두고 어찌할지 나중에 생각해보자.

export const getTodosByRoutine = async (routineId, token) => {
    try {
        const TODO_API_URL = "http://localhost:8000/api/todos";
        const response = await axios.get(`${TODO_API_URL}/`, {
            params: { routineId },
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error){
        throw error;
    }
}

//루틴 서비스도 다 만들었다. 근데 루틴 서비스 좀 불안하다....이거 사용하기가 좀..
//어찌 쓸지 생각을 해봐야하겠는데;; 일단 만들었긴한데
//하다가 꼬이거나 어찌 쓸지 모르겠으면 그냥 명언 api 가져와서 누르면 명언이나 팝업으로 뜨게
//해주던가 해야지... 동기부여 잖슴 ㅎㅎ
//일단 루틴은 제일 마지막에 하자.