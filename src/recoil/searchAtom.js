//원래라면 아톰 만드는것도 이렇게 많이 안만들고
//그냥 하나로 할텐데;;

import { atom } from 'recoil';

export const searchQueryState = atom({
    key: 'searchQueryState',
    default: '',
});

export const searchResultState = atom({
    key: 'searchResultState',
    default: [],
});