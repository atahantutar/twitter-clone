import { useCallback } from "react";
import Image from "next/image";

import { RiMoreFill } from "react-icons/ri";

import ColorUtils from "@/base/colors";
import SpaceUtils from "@/base/spaces";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

import SidebarLogo from "@/components/SidebarLogo";
import SidebarItem from "@/components/SidebarItem";
import Button from "@/components/shared/Button";

import { SidebarItems } from "@/utils/@fake.db";
import { useRouter } from "next/router";
import Avatar from "./Avatar";

const Sidebar = () => {
  const { onOpen } = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const handleShareClick = useCallback(() => {
    if (!currentUser?.email) {
      return onOpen();
    }

    // TODO:: Share Popup
  }, [currentUser?.email, onOpen]);

  const RenderSidebarItems = useCallback(() => {
    const sideBarItems = currentUser?.email
      ? [...SidebarItems]
      : [...SidebarItems].filter((item) => item.public);
    return (
      <div className="space-y-1">
        {sideBarItems.map((item, index) => (
          <SidebarItem
            label={item.label}
            icon={item.icon}
            secondaryIcon={item.secondaryIcon}
            href={item.href}
            onClick={item.onClick}
            key={index}
          />
        ))}
      </div>
    );
  }, [currentUser?.email]);
  return (
    <div className="mt-[0.875rem] px-1 h-full col-span-1 sm:px-4 md:px-6 flex items-start justify-center">
      <div className="absolute flex flex-col items-center md:items-start h-full">
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-2.5 lg:w-[230px] self-center">
            <SidebarLogo />
            <RenderSidebarItems />
            <Button
              label="Tweet"
              fullWidth
              size="md"
              bgColor={ColorUtils.colors.main}
              color={ColorUtils.colors.white}
              marginVertical={SpaceUtils.spaces.lg}
              showShareButton
              onClick={handleShareClick}
            />
          </div>
          {currentUser && (
            <div
              className="bottom-0 flex gap-5 items-center justify-center rounded-full cursor-pointer hover:bg-neutral-800 hover:bg-opacity-70 mb-5 transition-colors p-2"
              onClick={() => router.push("/users/" + currentUser?.username)}
            >
              <div>
                <Avatar username={currentUser?.username} size="small" />
              </div>
              <>
                <div className="flex flex-col items-start justify-center">
                  <div className="text-white font-bold text-sm text-ellipsis whitespace-nowrap max-w-full w-full overflow-hidden">
                    {currentUser?.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    @{currentUser?.username}
                  </div>
                </div>
                <div>
                  <RiMoreFill size={24} color="#fff" />
                </div>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
