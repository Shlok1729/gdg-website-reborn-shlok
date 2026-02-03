import { ApplicationInfo } from "./components/logo";
import "./loading.css";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background text-foreground">

      {/* Background Dots */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 flex flex-col items-center gap-12">

        {/* Horizontal Brand Section */}
        <div className="fade-in-up">
          <ApplicationInfo />
        </div>

        {/* Progress Section centered below */}
        <div className="fade-in-up flex flex-col items-center gap-5" style={{ animationDelay: "0.2s" }}>

          {/* The thin line from your screenshot */}
          <div className="relative h-[1.5px] w-64 overflow-hidden rounded-full bg-muted/30">
            <div className="absolute inset-y-0 left-0 h-full w-full bg-linear-to-r from-transparent via-primary/60 to-transparent animate-loader-smooth" />
          </div>

          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-muted-foreground/40">
            Initializing Environment
          </p>
        </div>

      </div>

      {/* Version at the very bottom */}
      <div className="absolute bottom-10 text-[10px] text-muted-foreground/30 font-mono tracking-[0.2em]">
        v2.0.0
      </div>
    </div>
  );
}