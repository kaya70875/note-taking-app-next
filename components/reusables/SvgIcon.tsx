'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

type SvgIconProps = {
  path:
    | "archive"
    | "arrow-left"
    | "checkmark"
    | "chevron-right"
    | "clock"
    | "cross"
    | "delete"
    | "font-monospace"
    | "font-sans-serif"
    | "font-serif"
    | "font"
    | "google"
    | "hide-password"
    | "home"
    | "info"
    | "lock"
    | "logout"
    | "menu"
    | "moon"
    | "plus"
    | "restore"
    | "search"
    | "settings"
    | "show-password"
    | "status"
    | "sun"
    | "tag"
    | "system-theme"
    | "logo"
};

function SvgIcon({ path }: SvgIconProps) {
  const [Svg, setSvg] = useState<null | string>(null);

  useEffect(() => {
    import(`@public/images/icon-${path}.svg`).then((m) => setSvg(m.default));
  }, [path]);

  if (!Svg) return null;
  return <Image src={Svg} alt={path} />
}

export default SvgIcon;