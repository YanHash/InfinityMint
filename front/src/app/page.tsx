"use client"
import {MainMenubar} from "@/components/ui/menubar";
import React, { useEffect, useState } from "react";

export default function Home() {
    const [nfts, setNfts] = useState<NftData[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("/data.json");
        const data = await response.json();
        setNfts(data.nfts);
      };
      fetchData();
    }, []);
    return (
        <main className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Galerie des NFTs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfts.map((nft, index) => {
            const key = Object.keys(nft)[0];
            const values = nft[key];
            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-4 hover:scale-105 transition-transform"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{key}</h3>
                <ul className="text-gray-600">
                  {values.map((item, idx) => (
                    <li
                      key={idx}
                      className="bg-indigo-100 rounded-md px-2 py-1 mb-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </main>
    );
}
