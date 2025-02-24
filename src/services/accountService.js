import axios from 'axios';

const API_URL = "http://localhost:8000/api/accounts";


// 회원가이이이이입!!!!!!!!!
export const register = async (username, nickname, password) => {
    try {
        const response = await axios.post(`${API_URL}/register/`, 
            {username, nickname, password},
            {headers: {"Content-Type": "application/json"}
            },
        );
        return response.data;
    } catch(error){
            throw error;
        }
    };

// 이거 자동 생성해주는거 코파일럿인건가.. 아닌가;;
// 이거 어떻게 끄는거지..
// 아무튼 이건 로그인
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, {
            username,
            password,
        });
        return response.data;
    }
    catch(error){
        throw error;
    }
};

// 서버 만들때 엔드포인트에 마지막에 / 이거 해줘서 이거 안해주면 에러 날걸. 아마도;;?
//그리고 이제 회원가입 로그인 빼고는 전부 토큰 넣어줘야하는데 이거 좀 어떻게 못하나;;
// 하나로 만들어서 쓸때 그냥 함수처럼 못쓰는건가??? 안그러면 저 헤더만 20번은 넘게 쳐야하는데;;
// 로그아웃
export const logout = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/logout/`,{
            Headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch(error){
        throw error;
    }
};

//명세서 내가 만드니까 헷갈릴 경우는 없겠네.
//비번 변경경
export const changePassword = async (old_password, new_password, token) => {
    try {
        const response = await axios.put(`${API_URL}/password_change/`, {
            old_password,
            new_password,
        },{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch(error){
        throw error;
    }
};

//회원탈퇴인데 주소가 저게 맞던가;;
//와...이래서 명세서 쓰는구나...
//회원탈퇴
export const deleteAccount = async (token) => {
    try {
        const response = await axios.delete(`${API_URL}/delete_account/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch(error){
        throw error;
    }
}

//회원정보 조회 코파일럿이 정보 조회도 하라고 그냥 뜨네ㅋㅋㅋㅋ
//api 안만들었는데.... 아 근데 투두 인데 조회가...필요하나;; 그냥 쓰자

//토큰 유효성 검증
export const validateToken = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/token/verify/`, {
            token,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch(error){
        throw error;
    }
}
//자동완성하다가 response가 respomse로 되어있네;;

//아 어카운트 서비스 끝.
//만드는 김에 그냥 다른것도 서비스 다 만들어버리자.
//근데 테스트 하면서 하나씩 넘어가고 싶은데 이렇게하면 테스트를 어케 하지...
//나중에 화면 그릴때 그때 테스트 하는건가;;
//그리고 콘솔창 보는것도 공부해야하는데...프론트 포스트맨 같은거 없나나