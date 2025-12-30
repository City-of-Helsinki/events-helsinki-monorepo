import {
  HtmlToReact,
  usePageContext,
} from '@city-of-helsinki/react-helsinki-headless-cms';

type CmsPageContentProps = {
  /**
   * An optional CSS class name to apply to the wrapping `div` element.
   */
  className?: string;
};

/**
 * Loads the 'content' field from the current CMS page (via `usePageContext`)
 * and renders the HTML content as React components using `<HtmlToReact>`.
 *
 * This component automatically handles:
 * - Safely accessing `page.content`.
 * - Trimming whitespace from the content.
 * - Rendering `null` (nothing) if the content is empty, just whitespace, or undefined.
 *
 * The rendered content is wrapped in a `div` that accepts a `className` for styling.
 */
const CmsPageContent = ({ className }: CmsPageContentProps) => {
  const { page } = usePageContext();

  // Safely access and trim the content.
  // This will be `undefined` if `page` or `content` is missing.
  // It will be `""` (a falsy value) if the content is just whitespace.
  const pageContent = page?.content?.trim();

  // If there's no content, render nothing.
  if (!pageContent) {
    return null;
  }

  // Render the content inside the styled div
  return (
    <div className={className}>
      <HtmlToReact>{pageContent}</HtmlToReact>
    </div>
  );
};

export default CmsPageContent;
