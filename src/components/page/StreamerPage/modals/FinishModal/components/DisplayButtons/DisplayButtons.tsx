import { Button, Group, Text } from "@mantine/core";
import { useCallback } from "react";

import { ReceiverId } from "@/models";
import { useSaveStates } from "@/states/save";

import { buttonList } from "../../consts";

import { buttonContainer, displayButtonStyle, groupStyle } from "./DisplayButtons.css";

export const DisplayButtons = () => {
    const {
        saveItem,
        mutator: { saveFavoriteId },
    } = useSaveStates();

    const handleDisplayClick = useCallback(
        (regionId: ReceiverId) => {
            saveFavoriteId(regionId);
        },
        [saveFavoriteId]
    );

    return (
        <Group mt="4rem" classNames={{ root: groupStyle }}>
            <div className={buttonContainer}>
                {buttonList.map((info, index) => (
                    <Button
                        key={index}
                        className={displayButtonStyle({ isCenter: info.id === -1 })}
                        style={{
                            top: info.position.top,
                            left: info.position.left,
                            width: info.position.width,
                            height: info.position.height,
                        }}
                        onClick={() => handleDisplayClick(index as ReceiverId)}
                        disabled={info.id === -1}
                    />
                ))}
            </div>
            <Text>{`${saveItem.favoriteId}`}</Text>
        </Group>
    );
};
