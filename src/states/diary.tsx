import { DiaryText } from "@/models";
import { atom, useAtom } from "jotai";

const diaryTextAtom = atom<DiaryText>([]);
export const useDiary = () => {
    const [diaryText, setDiaryText] = useAtom<DiaryText>(diaryTextAtom);

    return {
        diaryText,
        setDiaryText,
    };
};
