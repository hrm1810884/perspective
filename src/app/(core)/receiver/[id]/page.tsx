"use client";

import { ReceiverPage } from "@/components/page";
import { ReceiverId } from "@/models";
import { useParams } from "next/navigation";
import { FC } from "react";

export const Page: FC = () => {
    const params = useParams();
    const id = parseInt(params.id[0], 10) as ReceiverId;

    return <ReceiverPage id={id} />;
};

export default Page;
