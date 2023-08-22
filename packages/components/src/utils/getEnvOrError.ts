/**
 * Accept both variable and name so that variable can be correctly replaced
 * by build.
 * process.env.VAR => value
 * process.env["VAR"] => no value
 * Name is used to make debugging easier.
 */
export default function getEnvOrError(variable?: string, name?: string) {
  if (!variable) {
    throw Error(`Environment variable with name ${name} was not found`);
  }

  return variable;
}
