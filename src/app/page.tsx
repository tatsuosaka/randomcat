"use client";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
const URL = `https://api.thecatapi.com/v1/images/search`;

export default function Home() {
    const fetchData = async () => {
        try {
            const result = await fetch(URL);
            await result.json().then((json) => {
                let catUrl = JSON.stringify(json[0].url);
                console.log(json);
                setCat(json[0].url);
                setLoading(false);
                console.log(result);
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [cat, setCat] = useState("cat");
    const [loading, setLoading] = useState(true);
    return (
        <div>
            {loading ? (
                <div className="flex items-center justify-center h-svh">
                    <BeatLoader color="#fff" />
                </div>
            ) : (
                <div className="flex items-center justify-center h-svh flex-col gap-8 p-4">
                    <img
                        className="rounded"
                        src={cat}
                        alt="Random cat 🐱"
                        width={400}
                        height={400}
                    />
                    <button
                        className="rounded fixed bottom-4 bg-zinc-600 p-2 hover:bg-zinc-400 hover:cursor-pointer active:bg-green-500"
                        onClick={fetchData}
                    >
                        Another Cat 😽
                    </button>
                </div>
            )}
        </div>
    );
}
