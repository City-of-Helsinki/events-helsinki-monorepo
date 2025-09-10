# @events-helsinki/components

This package is the central UI component library for the Events Helsinki monorepo. It contains a collection of shared React components used across all our applications, including `events-helsinki`, `hobbies-helsinki`, and `sports-helsinki`.

**Table of Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Vision and Purpose](#vision-and-purpose)
- [Role within the Monorepo](#role-within-the-monorepo)
- [External Distribution](#external-distribution)
- [Noteworthy Features](#noteworthy-features)
  - [`getSecureImage` Utility](#getsecureimage-utility)
  - [Headless CMS Integration](#headless-cms-integration)
- [Development](#development)
- [Testing](#testing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Vision and Purpose

The primary goal of this package is to establish a single source of truth for UI components. By centralizing our components, we aim to:

- **Ensure Visual and Functional Consistency:** Guarantee a cohesive and predictable user experience across all applications.
- **Boost Development Efficiency:** Write components once and reuse them everywhere, significantly reducing redundant work.
- **Simplify Maintenance:** Update a component in this one central location, and the changes will propagate across all consuming applications.
- **Promote Best Practices:** Enforce accessibility standards and consistent coding patterns from a central point.

## Role within the Monorepo

`@events-helsinki/components` acts as an internal dependency for the applications within this monorepo. It is not just a folder of components but a standalone, versionable package. This structure allows us to manage component development in isolation while ensuring that dependent applications use stable, well-defined versions of the UI components.

## External Distribution

While this package is currently consumed locally within the monorepo, it has been designed to be self-contained. This means it could be published to an external package manager like npm in the future with minimal effort. This approach gives us the flexibility to share our component library with other projects or the open-source community if we choose to do so.

## Noteworthy Features

### `getSecureImage` Utility

This package includes a utility function called `getSecureImage`. Its purpose is to ensure that all images are loaded over a secure (HTTPS) connection.

- If an image URL is already using `https://`, it is returned as is.
- If an image URL uses `http://`, the function prepends a configured image proxy URL to serve the image securely.
- The image proxy URL is optional and can be provided as an argument. If it's not provided, the function will return an empty string for insecure image URLs.

The proxy can be disabled by unsetting the environment variable `NEXT_PUBLIC_IMAGE_PROXY_URL`.

### Headless CMS Integration

Many components in this package are designed to integrate with a headless CMS via the `react-helsinki-headless-cms` library. This allows for dynamic rendering of pages and content based on data fetched from the CMS.

- **Dynamic Content Collections:** Components can render various types of content collections, such as articles, events, and locations.
- **CMS-driven UI:** The library provides UI components like `PageContentBreadcrumb`, `SecondaryLink`, and `Card` that are styled and configured to work with the CMS data.
- **Helper Utilities:** A `HeadlessCMSHelper` class provides project-specific logic for routing, URL manipulation, and transforming CMS data into props for our components.

## Development

To develop and test components in isolation, we use Storybook. It provides a visual playground that makes it easy to see and interact with your components.

To start the Storybook server, run:

```bash
yarn storybook
```

This will open Storybook in your browser at `http://localhost:6006`.

## Testing

This package uses Vitest for unit and integration testing. To run the test suite, use the following command:

```bash
yarn test
```

## License

This project is licensed under the MIT License.
