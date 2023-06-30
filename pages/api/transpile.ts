import type { NextApiRequest, NextApiResponse } from "next";
import * as openai from "openai";
import * as fs from "fs";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { Configuration, OpenAIApi } = openai;

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openaiApi = new OpenAIApi(configuration);

    const { method } = req;

    if (method === "POST") {
        console.log(typeof req.body.file);
        const response = await openaiApi.createTranscription(
            req.body.file,
            "whisper-1"
        );
        const data =  response;
        console.log(data);
        // return res.status(200).json(data);
    }
    return res.status(400).json({ name: "Bad Request" });
}
