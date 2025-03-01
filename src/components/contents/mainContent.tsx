import Button from "../button/mainButton";

export default function MainContent() {
    return (
      <div className="h-dvh flex justify-center">
        <div className="flex flex-col items-center pt-48">
          <h1 className="text-6xl font-bold">morning melody를 메일로 보내드립니다!</h1>
          <h2 className="text-3xl font-medium mt-3 text-stone-400">음악으로 기분 좋은 하루를 시작하세요</h2>
          <div className="flex space-x-5 mt-7">
            <Button text="무료 구독하기" href="#" />
            <Button text="음악 추천하기" href="#" />
          </div>
        </div>
      </div>
    );
  } 