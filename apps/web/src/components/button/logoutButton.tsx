"use client";
import { signOut } from "@/services/authService";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

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
    <Button onClick={handleLogout} className="px-3 py-1 text-base hover:text-neutral-700">
      로그아웃
    </Button>
  );
}