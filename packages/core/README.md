<br/>

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://docs.once-ui.com/trademarks/icon-dark.svg" width="64" height="64">
    <source media="(prefers-color-scheme: light)" srcset="https://docs.once-ui.com/trademarks/icon-light.svg" width="64" height="64">
    <img alt="Once UI Logo" src="https://docs.once-ui.com/trademarks/icon-dark.svg" width="64" height="64">
  </picture><picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://docs.once-ui.com/trademarks/type-dark.svg" width="200" height="64">
    <source media="(prefers-color-scheme: light)" srcset="https://docs.once-ui.com/trademarks/type-light.svg" width="200" height="64">
    <img alt="Once UI Wordmark" src="https://docs.once-ui.com/trademarks/type-dark.svg" width="200" height="64">
  </picture>

  <br/>

  The indie design system for React apps - Compatible with Next.js, Inertia.js, and Laravel

  [![npm version](https://img.shields.io/npm/v/@once-ui-system/core.svg)](https://www.npmjs.com/package/@once-ui-system/core)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE.md)
  [![npm downloads](https://img.shields.io/npm/dm/@once-ui-system/core.svg)](https://www.npmjs.com/package/@once-ui-system/core)
  [![Discord](https://img.shields.io/discord/1083398120035074148?color=7289da&logo=discord&logoColor=white)](https://discord.com/invite/5EyAQ4eNdS)
</div>



<br/>

## Documentation

Learn how to set up and build with Once UI at [docs.once-ui.com](https://docs.once-ui.com/once-ui/quick-start).

## Installation

```bash
npm install @once-ui-system/core
```

## Framework Support

Once UI is framework-agnostic and works with:
- **Next.js** (App Router & Pages Router)
- **Inertia.js + React + Laravel**
- **Vite + React**
- Any other React-based framework

### Usage with Next.js

For Next.js projects, configure the RouterProvider with Next.js routing:

```tsx
// app/providers.tsx
"use client";

import { RouterProvider } from "@once-ui-system/core";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <RouterProvider
      config={{
        Link: Link,
        Image: Image,
        push: (url) => router.push(url),
        usePathname: () => pathname,
      }}
    >
      {children}
    </RouterProvider>
  );
}
```

### Usage with Inertia.js + Laravel

For Laravel projects using Inertia.js with React:

```tsx
// resources/js/app.tsx
import { RouterProvider } from "@once-ui-system/core";
import { Link, usePage, router } from "@inertiajs/react";

// Create a custom Link wrapper for Inertia
const InertiaLink = ({ href, children, ...props }) => (
  <Link href={href} {...props}>
    {children}
  </Link>
);

function App({ children }) {
  const { url } = usePage();

  return (
    <RouterProvider
      config={{
        Link: InertiaLink,
        push: (url) => router.visit(url),
        usePathname: () => url,
      }}
    >
      {children}
    </RouterProvider>
  );
}
```

### Basic Usage (No Framework)

Without any configuration, Once UI uses standard HTML elements:

```tsx
import { Button, Flex, Text } from "@once-ui-system/core";
import "@once-ui-system/core/css/styles.css";

function App() {
  return (
    <Flex direction="column" gap="16">
      <Text variant="heading-strong-l">Hello World</Text>
      <Button href="/about">Learn More</Button>
    </Flex>
  );
}
```

## Authors

Built and maintained by [**Lorant One**](https://lorant.one).

## Community

Join the [Design Engineers Club](https://discord.com/invite/5EyAQ4eNdS) for help, support and discussion.

Found a bug? Report it [here](https://github.com/once-ui-system/core/issues/new?labels=bug&template=bug_report.md). Got a feature request? Submit it [here](https://github.com/once-ui-system/core/issues/new?labels=feature%20request&template=feature_request.md).

## Contributing

Please read our [CONTRIBUTING.md](https://github.com/once-ui-system/core/blob/main/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to Once UI.

## Sponsors

Once UI is an indie project. [Sponsor us](https://github.com/sponsors/once-ui-system) and get featured on our site!