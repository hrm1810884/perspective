import { atom, useAtom } from "jotai";

export type DiaryText = string[];

const diaryTextAtom = atom<DiaryText>([]);
export const useDiary = () => {
    const [diaryText, setDiaryText] = useAtom<DiaryText>(diaryTextAtom);

    return {
        diaryText,
        setDiaryText,
    };
};
