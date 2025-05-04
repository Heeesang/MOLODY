"use client";

import { useState } from "react";
import LoginModalContent from "./loginModalContent";
import { useAuth } from "@/lib/context/authContext";
import { signInWithGoogle, subscribeUser } from "@/services/authService";

export default function LoginModalContainer() {
  const { user, loading } = useAuth();
  const [message, setMessage] = useState<string>("");

  const handleLogin = async (): Promise<void> => {
    try {
      const url = await signInWithGoogle();
      window.location.href = url;
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  const handleSubscribe = async (): Promise<void> => {
    try {
      if (!user) throw new Error("로그인이 필요합니다.");
      await subscribeUser(user);
      setMessage("구독 성공! 아침마다 음악을 보내드릴게요.");
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  return (
    <LoginModalContent
      user={user}
      loading={loading}
      message={message}
      onLogin={handleLogin}
      onSubscribe={handleSubscribe}
    />
  );
}