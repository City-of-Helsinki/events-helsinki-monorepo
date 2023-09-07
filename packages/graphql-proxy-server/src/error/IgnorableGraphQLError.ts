import type { GraphQLErrorOptions } from 'graphql';
import { GraphQLError } from 'graphql';

export class IgnorableGraphQLError extends GraphQLError {
  readonly ignoredCodes: string[];

  constructor(
    message: string,
    options: GraphQLErrorOptions,
    ignoredCodes: string[]
  ) {
    super(message, options);
    this.ignoredCodes = ignoredCodes;
  }

  /** Throw a GraphQLError if the code is not included in the ignored error codes. */
  public throwConditionally() {
    const code = this.extensions.code as string;
    if (!this.ignoredCodes.includes(code)) {
      throw new GraphQLError(this.message, {
        nodes: this.nodes,
        source: this.source,
        positions: this.positions,
        path: this.path,
        originalError: this.originalError,
        extensions: this.extensions,
      });
    }
    // eslint-disable-next-line no-console
    console.warn(
      `The IgnorableGraphQLError skipped error throwing with a message: "${this.message}"`
    );
  }
}
