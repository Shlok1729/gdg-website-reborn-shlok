"use client";

import { Button, ButtonProps } from "@/app/components/ui/button";
import Link from "next/link";

interface ButtonLinkProps
  extends Omit<ButtonProps, "asChild">,
    React.ComponentProps<typeof Link> {
  children?: React.ReactNode;
}

export function ButtonLink({
  href,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Button asChild {...props}>
      <Link href={href}>
        {children}
      </Link>
    </Button>
  );
}
