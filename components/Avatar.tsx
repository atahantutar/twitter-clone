import React, { FC, useCallback } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import useUser from "@/hooks/useUser";

import { AvatarSize } from "@/utils/enums";

interface AvatarProps {
  username: string;
  size?: "small" | "medium" | "large";
  hasBorder?: boolean;
}

const Avatar: FC<AvatarProps> = ({
  username,
  size = "medium",
  hasBorder = false,
}) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(username);

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      const response = await fetch(`/api/users/${username}`);
      const data = await response.json();

      const _username: string = data.username;

      const url = `/users/${_username}`;
      router.push(url);
    },
    [router, username]
  );

  return (
    <div onClick={handleClick} className="shrink-0 ">
      <Image
        alt={`${fetchedUser?.name} profile image`}
        src={fetchedUser?.profileImage || "/default_doge_coin.png"}
        width={
          size === "large"
            ? AvatarSize.large
            : size === "medium"
            ? AvatarSize.medium
            : AvatarSize.small
        }
        height={
          size === "large"
            ? AvatarSize.large
            : size === "medium"
            ? AvatarSize.medium
            : AvatarSize.small
        }
        className={`
        bg-white
        rounded-full
        object-cover
     ${
       size === "large"
         ? `max-h-large`
         : size === "medium"
         ? `max-h-medium `
         : `max-h-small `
     }
        ${hasBorder ? "border-neutral-900 border-4 rounded-full" : ""}
        `}
      />
    </div>
  );
};

export default Avatar;
