import useConfig from './useConfig';

/**
 * @deprecated After the monorepo rework and Apollo-Router changes,
 * the events configuration holder has not much use.
 */
export default function useRouterFromConfig() {
  const { router } = useConfig();

  if (!router) {
    throw Error(
      // eslint-disable-next-line max-len
      'When using components that needs a router, you must include a compatible router in the router field of the config object you provide with ConfigProvider'
    );
  }

  return router;
}
