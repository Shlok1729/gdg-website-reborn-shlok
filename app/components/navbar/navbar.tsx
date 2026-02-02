"use client";
import { useState } from "react";
import { ThemeSwitcher } from "../common/theme-switcher";
import { appConfig } from "@/app/project.config";
import { Button } from "../ui/button";
import { NavbarLeft } from "./navbar-left";
import { MobileMenu } from "./mobile-menu";
import { ButtonLink } from "../utils/button-link";
import { Icon, type IconType } from "../icons/icon";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "./resizable-navbar";

export default function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLeft
          logo={appConfig.clubLogo}
          badgeText={appConfig.shortName}
          href="/"
        />

        {/* Middle section: Social Media Links */}
        <div className="hidden lg:flex items-center gap-3 absolute left-1/2 transform -translate-x-1/2">
          {appConfig?.socialLinks &&
            Object.entries(appConfig?.socialLinks).map(([key, value]) => {
              if (!value) return null;
              return (
                <ButtonLink
                  key={key}
                  variant="ghost"
                  size="icon_sm"
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={key}
                >
                  <Icon name={key as IconType} className="h-5 w-5" />
                </ButtonLink>
              );
            })}
        </div>

        {/* Right section: Theme Switcher + Menu */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <MobileMenu />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLeft
            logo={appConfig.clubLogo}
            badgeText={appConfig.shortName}
            href="/"
          />
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {/* Mobile Social Links */}
          <div className="flex flex-col gap-2 mb-4 pb-4 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Follow Us
            </span>
            {appConfig?.socialLinks &&
              Object.entries(appConfig?.socialLinks).map(([key, value]) => {
                if (!value) return null;
                return (
                  <ButtonLink
                    key={key}
                    variant="outline"
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full justify-start gap-2 capitalize"
                  >
                    <Icon name={key as IconType} className="h-4 w-4" />
                    {key}
                  </ButtonLink>
                );
              })}
          </div>

          {/* Mobile Nav Links */}
          {appConfig.navLinks.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              asChild
              className="w-full justify-start"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <a href={item.type === "link" ? item.href : "#"}>
                {item.title}
              </a>
            </Button>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}