# @events-helsinki/graphql-proxy-server

This package provides a generic, reusable GraphQL proxy server. It is the core foundation for creating specific GraphQL proxy instances within the Events Helsinki monorepo.

**Table of Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Vision and Purpose](#vision-and-purpose)
- [Role within the Monorepo](#role-within-the-monorepo)
- [Core Features](#core-features)
- [Development](#development)
- [Available Scripts](#available-scripts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Vision and Purpose

## Role within the Monorepo

This package is not intended to be run directly. Instead, it acts as a shared library for the proxy servers located in the `/proxies` directory, such as:

- `proxies/events-graphql-proxy`
- `proxies/venue-graphql-proxy`

These specific proxy implementations use this package for the core server setup and then provide their own GraphQL schemas, resolvers, and data sources.

## Core Features

- **Apollo Server:** Built on top of Apollo Server for a robust and feature-rich GraphQL experience.
- **Express.js:** Uses Express.js as the underlying HTTP server.
- **Data Sources:** Includes a data source management system for connecting to various APIs and services.
- **Error Handling:** Provides a centralized error handling mechanism.
- **Plugins:** Supports Apollo Server plugins for extending server functionality.

## Development

To develop and test this package, you should work within one of the proxy implementations that use it (e.g., `proxies/events-graphql-proxy`).

However, you can run the tests for this package directly.

## Available Scripts

In the project directory, you can run:

- `yarn test`: Runs the test suite.
- `yarn lint`: Lints the code using ESLint.
- `yarn typecheck`: Runs the TypeScript compiler to check for type errors.
