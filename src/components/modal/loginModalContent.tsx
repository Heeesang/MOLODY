"use client";

import { useState } from "react";

export default function LoginModalContent() {
    const [email, setEmail] = useState("");
  
    return (
      <form className="">
        <div className="flex flex-col space-y-5">
            <input className="w-full h-11 border-2 p-3 rounded-lg"></input>
            <button className="w-full h-12 rounded-lg bg-black text-white">확인</button>
        </div>
      </form>
    );
  }