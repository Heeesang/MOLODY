import Image from "next/image";
import LoginModalContainer from "../../modal/login/loginModalContainer";
import Modal from "../../modal/modal";
import Button from "@/components/button/button";
import Link from "next/link";
import { getUser } from "@/lib/supabase/server";

export default async function MainContent() {
    const user = await getUser()
    
    return (
      <div className="h-dvh flex justify-center">
        <div className="flex flex-col items-center pt-44 max-w-[1140px]">
          <div className="flex flex-col items-center animate-fadeIn opacity-0">
            <h1 className="text-6xl font-bold">morning melody를 메일로 보내드립니다!</h1>
            <h2 className="text-3xl font-medium mt-3 text-stone-400">음악으로 기분 좋은 하루를 시작하세요</h2>
            <div className="flex space-x-5 mt-9">
              <Modal 
                trigger={<Button text="무료구독하기"/>}
                modalTitle="이메일 등록" 
              >
               <LoginModalContainer user={user} /> 
              </Modal>
              <Link href="/recommend">
                <Button text="음악 추천하기"/>
              </Link>
            </div>
          </div>
          <Image
            src="/molody3D.svg"
            alt="Profile"
            width={1350}
            height={310}
            className="mt-36"
          />
        </div>
      </div>
    );
  } 