import Image from "next/image";

export default function RecommendContent() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-dvh">
            <div className="flex max-w-[1140px] w-full h-full justify-between items-center">
                <div className="h-9/12 flex flex-col">
                    <h1 className="text-2xl font-bold mb-3">최근 추천 음악</h1>
                </div>
                <div className="border border-gray-200 rounded-lg w-96 h-9/12 flex flex-col justify-end items-center">
                    <Image
                        src="/molody_logo.svg"
                        alt="Molody Logo"
                        width={100}
                        height={40}
                        className="mb-14"
                    />
                </div>
            </div>
        </div>
    );
}