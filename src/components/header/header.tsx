export default function Header() {
  return (
    <nav className="fixed w-full text-white h-16">
      <div className="max-w-[1140px] h-full m-auto flex">
        <div className="flex h-full w-full items-center justify-between">
            <div>
              <img src="./molody_logo.svg" className=""/>
            </div>
            <div className="flex items-center text-[#4E5968]">
              <div className="px-3">
                <a>무료 구독</a>
              </div>
              <div className="px-3">
                <a>음악 추천</a>
              </div>
            </div>
        </div>
      </div>
    </nav>
  );
} 