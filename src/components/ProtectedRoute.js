import React from "react";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { accountState } from "../recoil/accountAtom";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useRecoilValue(accountState);
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;

//여기서도 의문인게 로그인 인증 그런거 아톰으로 확인 받으면 칠드런. 그러니까 그 밑에 있는거 실행한다는거
//이해 완료

//근데 로그인을 어떻게 확인 하는거지???????????????????????????
//뭐지... 더 찾아봐야하나;;

//그니까 api로 결과를 어디서 받아서 오는거지?? 결과를 어떻게 받아서 아톰에 업데이트 한다는거지..
//아 설마...반환을 저기 아톰으로 가게 해야하나;; 서비스 다 바꿔야하는건가...
//어 잠만 나 토큰이...토큰이 맞나?? 나 access로 반환해주잖슴;;