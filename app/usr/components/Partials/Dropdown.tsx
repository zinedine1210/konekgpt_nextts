'use client'

import { DropdownOptions } from "@@/src/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";

export default function Dropdown({ button, options, id }: {
    button?: React.ReactNode,
    options: DropdownOptions[],
    id: string | number
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fungsi untuk menutup dropdown jika klik di luar
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        }
    };

    // Menggunakan useEffect untuk mendeteksi klik di luar
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-fit">
            <button onClick={() => setIsOpen(!isOpen)}>
                {button ?? (
                    <div className="w-8 h-8 rounded-md bg-zinc-100 hover:bg-zinc-200 duration-300 flex items-center justify-center">
                        <Icon icon={`fe:elipsis-v`} className="text-xl"/>
                    </div>
                )}
            </button>
            
            {isOpen && (
                <div className="absolute top-full right-0 backdrop-blur-md border shadow-lg rounded z-50 min-w-32 max-w-full w-full">
                    {
                        options.map((opt, index) => {
                            return (
                                <button key={index} onClick={() => opt.action(id, index)} className="p-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2 w-full text-start">
                                    <Icon icon={opt.icon} className="text-zinc-500 text-lg"/>
                                    {opt.name}
                                </button>
                            )
                        })
                    }
                </div>
            )}
        </div>
    );
}
