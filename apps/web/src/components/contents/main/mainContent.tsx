import LoginModalContainer from "../../modal/login/loginModalContainer";
import Modal from "../../modal/modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUser } from "@/lib/supabase/server";

export default async function MainContent() {
  const user = await getUser()

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Main Section */}
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden from-background to-gray-900">
        {/* Glowing Blobs */}
        <div className="absolute top-1/5 left-1/5 w-72 h-72 bg-primary rounded-full filter blur-3xl opacity-50 animate-blob z-0"></div>
        <div className="absolute bottom-1/5 right-1/5 w-80 h-80 bg-accent rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000 z-0"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000 -translate-x-1/2 -translate-y-1/2 z-0"></div>

        <div className="h-dvh flex flex-col items-center pt-44 max-w-[1140px] px-4 z-10">
          <div className="box-border flex flex-col items-center animate-fadeIn opacity-0 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl h-16 font-bold text-white">morning melody를 메일로 보내드립니다!</h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mt-3 text-muted-foreground">음악으로 기분 좋은 하루를 시작하세요</h2>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 mt-9">
              <Modal
                trigger={<Button className="bg-black text-white hover:bg-primary/80 text-lg px-6 py-6">무료구독하기</Button>}
                modalTitle="이메일 등록"
              >
                <LoginModalContainer user={user} />
              </Modal>
              <Link href="/recommend">
                <Button className="bg-black text-white hover:bg-primary/80 text-lg px-6 py-6">음악추천하기</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1 */}
      <section className="w-full py-48 px-4 bg-gray-900 text-center mb-40">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Molody, 당신의 아침을 위한 음악 큐레이션</h2>
        <p className="whitespace-pre-wrap text-lg md:text-2xl text-foreground leading-relaxed mx-auto">
          {`매일 아침, 당신의 취향에 맞는 음악을 메일로 받아보세요.
Molody의 섬세한 큐레이션으로 하루를 특별하게 시작하세요.`}
        </p>
      </section>

      {/* Section 2 */}
      <section className="w-full max-w-[1140px] py-16 px-4 rounded-lg mb-40">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Molody, 이렇게 사용하세요</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md border-2 border-primary">
            <div className="text-5xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">1. 무료 구독하기</h3>
            <p className="text-muted-foreground">간단한 이메일 등록으로 Molody의 특별한 음악 큐레이션을 시작하세요.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md border-2 border-secondary">
            <div className="text-5xl text-green-500 mb-4">✨</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">2. 취향에 맞는 장르 선택</h3>
            <p className="text-muted-foreground">다양한 장르 중에서 당신의 기분과 취향에 맞는 음악을 탐색하고 선택하세요.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md border-2 border-accent">
            <div className="text-5xl text-purple-500 mb-4">💌</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">3. 매일 아침 음악 감상</h3>
            <p className="text-muted-foreground">선택한 장르 기반의 음악을 매일 아침 메일로 받아보고 하루를 활기차게 시작하세요.</p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="w-full mt-12 py-16 px-4 bg-primary rounded-lg text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">지금 바로 Molody와 함께하세요!</h2>
        <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          지루한 아침은 이제 그만, Molody가 선사하는 새로운 음악 경험으로 
        </p>
        <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
          당신의 일상을 더욱 풍요롭게 만들어 드립니다.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5">
          <Modal
            trigger={<Button className="bg-black text-white hover:bg-black/60 text-lg px-6 py-3">무료구독하기</Button>}
            modalTitle="이메일 등록"
          >
            <LoginModalContainer user={user} />
          </Modal>
          <Link href="/recommend">
            <Button className="bg-white border-0 text-black hover:bg-white/70 text-lg px-6 py-3">음악추천 페이지로 이동</Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 