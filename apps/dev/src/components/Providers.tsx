"use client";

import { DataThemeProvider, IconProvider, LayoutProvider, RouterProvider, ThemeProvider, ToastProvider } from "@once-ui-system/core";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ThemeProvider>
      <LayoutProvider breakpoints={{xs: 420, s: 560, m: 960, l: 1280, xl: 1600}}>
        <DataThemeProvider>
          <ToastProvider>
            <IconProvider>
              <RouterProvider
                config={{
                  Link: Link as any,
                  Image: Image as any,
                  push: (url) => router.push(url),
                  usePathname: () => pathname,
                }}
              >
                {children}
              </RouterProvider>
            </IconProvider>
          </ToastProvider>
        </DataThemeProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
}