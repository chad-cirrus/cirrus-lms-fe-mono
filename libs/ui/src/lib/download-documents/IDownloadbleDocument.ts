import { DOWNLOADABLE_DOCUMENT_TYPE } from "./DOWNLOADABLE_DOCUMENT_TYPE";

/**
 * Represents a downloadable document.
 */
export interface IDownloadableDocument {
  /**
   * The type of the document.
   */
  documentType: DOWNLOADABLE_DOCUMENT_TYPE;
  /**
   * The ID of the document.
   */
  id: number;
  /**
   * The display text of the document.
   */
  displayText: string;
}
