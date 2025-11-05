import Image from "next/image";
import LoginModalContainer from "../../modal/login/loginModalContainer";
import Modal from "../../modal/modal";
import Button from "@/components/button/button";
import Link from "next/link";
import { getUser } from "@/lib/supabase/server";

export default async function MainContent() {
  const user = await getUser()

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-dvh flex flex-col items-center pt-44 max-w-[1140px] px-4">
        <div className="box-border flex flex-col items-center animate-fadeIn opacity-0 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">morning melody를 메일로 보내드립니다!</h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mt-3 text-stone-400">음악으로 기분 좋은 하루를 시작하세요</h2>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 mt-9">
            <Modal
              trigger={<Button text="무료구독하기" className="bg-black text-white"/>}
              modalTitle="이메일 등록"
            >
              <LoginModalContainer user={user} />
            </Modal>
            <Link href="/recommend">
              <Button text="음악추천하기" className="bg-black text-white"/>
            </Link>
          </div>
          <Image
            src="/molody3D.svg"
            alt="Profile"
            width={1350}
            height={1}
            className="mt-44 md:mt-40 w-full max-w-xl md:max-w-3xl lg:max-w-full"
          />
        </div>
      </div>
      <section className="w-full py-48 px-4 bg-neutral-100 text-center mb-40">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Molody, 당신의 아침을 위한 음악 큐레이션</h2>
        <p className="whitespace-pre-wrap text-lg md:text-2xl text-black leading-relaxed mx-auto">
          {`매일 아침, 당신의 취향에 맞는 음악을 메일로 받아보세요.
Molody의 섬세한 큐레이션으로 하루를 특별하게 시작하세요.`}
        </p>
      </section>

      <section className="w-full max-w-[1140px] py-16 px-4 rounded-lg mb-40">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-12 text-center">Molody, 이렇게 사용하세요</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md border-2 border-green-500">
            <div className="text-5xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">1. 무료 구독하기</h3>
            <p className="text-neutral-600">간단한 이메일 등록으로 Molody의 특별한 음악 큐레이션을 시작하세요.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md border-2 border-purple-500">
            <div className="text-5xl text-green-500 mb-4">✨</div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">2. 취향에 맞는 장르 선택</h3>
            <p className="text-neutral-600">다양한 장르 중에서 당신의 기분과 취향에 맞는 음악을 탐색하고 선택하세요.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md border-2 border-pink-500">
            <div className="text-5xl text-purple-500 mb-4">💌</div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">3. 매일 아침 음악 감상</h3>
            <p className="text-neutral-600">선택한 장르 기반의 음악을 매일 아침 메일로 받아보고 하루를 활기차게 시작하세요.</p>
          </div>
        </div>
      </section>

      <section className="w-full mt-12 py-16 px-4 bg-black rounded-lg text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">지금 바로 Molody와 함께하세요!</h2>
        <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          지루한 아침은 이제 그만, Molody가 선사하는 새로운 음악 경험으로 
        </p>
        <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
          당신의 일상을 더욱 풍요롭게 만들어 드립니다.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5">
          <Modal
            trigger={<Button text="무료구독하기" className="bg-white text-black hover:bg-gray-100" />}
            modalTitle="이메일 등록"
          >
            <LoginModalContainer user={user} />
          </Modal>
          <Link href="/recommend">
            <Button text="음악추천 페이지로 이동" className="bg-transparent border border-white hover:bg-white hover:text-blue-600" />
          </Link>
        </div>
      </section>
    </div>
  );
} 