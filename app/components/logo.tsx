// app/components/logo.tsx
import React from "react";
import Image from "next/image";

export const ApplicationInfo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-5 ${className}`}> 
      {/* 1. Logo Circle on the Left */}
      <div className="relative w-8 h-8">
  <Image
    src="/assets/gdsc_logo.gif"
    alt="GDSC Logo"
    fill
    className="object-contain"
    unoptimized
  />
</div>



      {/* 2. Stacked Text on the Right */}
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground leading-none mb-1">
          GDG NITH
        </h1>
        <p className="text-sm font-medium text-muted-foreground/80">
          GOOGLE DEVELOPER GROUPS
        </p>
      </div>
    </div>
  );
};