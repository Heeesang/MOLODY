"use client";
import { signOut } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.refresh();
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="px-3">
      로그아웃
    </button>
  );
}