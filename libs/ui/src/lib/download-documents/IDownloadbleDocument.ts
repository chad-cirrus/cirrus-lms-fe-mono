import { DOWNLOADABLE_DOCUMENT_TYPE } from "./DOWNLOADABLE_DOCUMENT_TYPE";

/**
 * Represents a downloadable document such as a course transcript, stage certificate, or course completion certificate.
 */
export interface IDownloadableDocument {
  /**
   * The type of the document.
   */
  documentType: DOWNLOADABLE_DOCUMENT_TYPE;
  /**
   * The ID of the document, used to retrieve from the api.
   */
  id: number;
  /**
   * The display text of the document (e.g. "Air Frame Course Transcript") to be shown to the user.
   */
  displayText: string;
}
