"use client";

import { ReceiverPage } from "@/components/page";
import { receiverId, ReceiverId } from "@/models";
import { NextPage } from "next";

const Page: NextPage<{
    params: {
        id: number;
    };
}> = ({ params: { id } }) => {
    const validatedId = getReceiverIdFromParams(id);
    return <ReceiverPage id={validatedId} />;
};

export default Page;

const getReceiverIdFromParams = (id: number): ReceiverId => {
    return receiverId.includes(id as ReceiverId) ? (id as ReceiverId) : 1;
};
