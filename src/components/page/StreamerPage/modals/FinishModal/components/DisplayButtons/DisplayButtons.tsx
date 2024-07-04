import { Button, Group, Tooltip } from "@mantine/core";
import { useCallback } from "react";

import { ReceiverId } from "@/models";
import { useSaveStates } from "@/states/save";

import { buttonList, isCenter } from "../../consts";

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
                    <Tooltip label={info.prompt} key={index} disabled={isCenter(info.id)}>
                        <Button
                            className={displayButtonStyle({
                                isCenter: isCenter(info.id),
                                isSelected: info.id === saveItem.favoriteId,
                            })}
                            style={{
                                top: info.position.top,
                                left: info.position.left,
                                width: info.position.width,
                                height: info.position.height,
                            }}
                            onClick={() => handleDisplayClick(info.id as ReceiverId)}
                            disabled={isCenter(info.id)}
                        />
                    </Tooltip>
                ))}
            </div>
        </Group>
    );
};
