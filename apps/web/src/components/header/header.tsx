import { getUser } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "../button/logoutButton";
import LoginButton from "../button/loginButton";
import Modal from "../modal/modal";
import LoginModalContainer from "../modal/login/loginModalContainer";

export default async function Header() {
  const user = await getUser();

  return (
    <nav className="fixed w-full h-16 bg-white px-5">
      <div className="max-w-[1140px] h-full m-auto flex">
        <div className="flex h-full w-full items-center justify-between">
          <div>
            <Link href="/">
              <Image
                src="/molody_logo.svg"
                alt="Molody Logo"
                width={90}
                height={30}
              />
            </Link>
          </div>
          <div className="flex items-center text-neutral-500">
            <div className="mx-6">
              <Link href="/recommend">
                음악 추천
              </Link>
            </div>
            {user ? (
              <div className="flex items-center">
                <LogoutButton/>
                <Link href="/mypage" className="pl-2">
                  <Image
                    src={user?.user_metadata.avatar_url}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </Link>
              </div>
            ) : (
              <div className="flex items-center">
                <Modal
                  trigger={<LoginButton />}
                  modalTitle="로그인"
                >
                  <LoginModalContainer user={user} />
                </Modal>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}