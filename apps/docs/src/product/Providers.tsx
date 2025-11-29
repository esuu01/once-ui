"use client";

import { BorderStyle, ChartMode, ChartVariant, DataThemeProvider, IconProvider, LayoutProvider, NeutralColor, RouterProvider, ScalingSize, Schemes, SolidStyle, SolidType, SurfaceStyle, Theme, ThemeProvider, ToastProvider, TransitionStyle } from "@once-ui-system/core";
import { style, dataStyle } from "@/resources/once-ui.config";
import { iconLibrary } from "@/resources/icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <LayoutProvider>
      <ThemeProvider
        theme={style.theme as Theme}
        brand={style.brand as Schemes}
        accent={style.accent as Schemes}
        neutral={style.neutral as NeutralColor}
        solid={style.solid as SolidType}
        solidStyle={style.solidStyle as SolidStyle}
        border={style.border as BorderStyle}
        surface={style.surface as SurfaceStyle}
        transition={style.transition as TransitionStyle}
        scaling={style.scaling as ScalingSize}
      >
        <DataThemeProvider
          variant={dataStyle.variant as ChartVariant}
          mode={dataStyle.mode as ChartMode}
          height={dataStyle.height}
          axis={{
            stroke: dataStyle.axis.stroke
          }}
          tick={{
            fill: dataStyle.tick.fill,
            fontSize: dataStyle.tick.fontSize,
            line: dataStyle.tick.line
          }}
          >
          <ToastProvider>
            <IconProvider icons={iconLibrary}>
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
      </ThemeProvider>
    </LayoutProvider>
  );
}