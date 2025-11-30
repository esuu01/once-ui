"use client";

import React, { createContext, useContext, ReactNode, ComponentType, forwardRef } from "react";

// Router configuration interface
export interface RouterConfig {
  // Link component - can be Inertia Link, React Router Link, or default anchor
  Link: ComponentType<LinkProps>;
  // Router navigation function
  push?: (url: string) => void;
  // Get current pathname
  usePathname?: () => string;
  // Image component (optional - defaults to standard img)
  Image?: ComponentType<ImageProps>;
}

// Props for the Link component
export interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  [key: string]: any;
}

// Props for the Image component
export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: any;
}

// Default Link component (standard anchor tag)
const DefaultLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => (
    <a ref={ref} href={href} {...props}>
      {children}
    </a>
  )
);
DefaultLink.displayName = "DefaultLink";

// Default Image component (standard img tag)
const DefaultImage = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, fill, sizes, priority, unoptimized, style, ...props }, ref) => {
    const imgStyle: React.CSSProperties = fill
      ? { position: "absolute", width: "100%", height: "100%", objectFit: "cover", ...style }
      : style || {};

    return <img ref={ref} src={src} alt={alt} style={imgStyle} {...props} />;
  }
);
DefaultImage.displayName = "DefaultImage";

// Default pathname hook
const defaultUsePathname = () => {
  if (typeof window !== "undefined") {
    return window.location.pathname;
  }
  return "/";
};

// Default router push
const defaultPush = (url: string) => {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
};

// Default configuration
const defaultRouterConfig: RouterConfig = {
  Link: DefaultLink,
  push: defaultPush,
  usePathname: defaultUsePathname,
  Image: DefaultImage,
};

// Context
const RouterContext = createContext<RouterConfig>(defaultRouterConfig);

// Provider props
interface RouterProviderProps {
  children: ReactNode;
  config?: Partial<RouterConfig>;
}

// Provider component
export const RouterProvider: React.FC<RouterProviderProps> = ({ children, config }) => {
  const mergedConfig: RouterConfig = {
    ...defaultRouterConfig,
    ...config,
  };

  return <RouterContext.Provider value={mergedConfig}>{children}</RouterContext.Provider>;
};

// Hook to use router config
export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
};

// Hook to get Link component
export const useLink = () => {
  const { Link } = useRouter();
  return Link;
};

// Hook to get Image component
export const useImage = () => {
  const { Image } = useRouter();
  return Image || DefaultImage;
};

// Hook to get pathname
export const usePathname = () => {
  const { usePathname: getPathname } = useRouter();
  return getPathname ? getPathname() : defaultUsePathname();
};

// Hook to get router push function
export const useRouterPush = () => {
  const { push } = useRouter();
  return push || defaultPush;
};

RouterProvider.displayName = "RouterProvider";
