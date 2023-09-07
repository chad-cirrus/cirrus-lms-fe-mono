import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for managing the return path after authentication.
 * The return path is stored in localStorage and can be retrieved or set using the `returnPath` property.
 * An identical implementation of this service exists in the legacy JavaScript application and should be kept in sync with any changes.
 */
export class ReturnPathService {
  private _returnPath: string | null = localStorage.getItem('cirrus-return-to');
  private defaultReturnPath = '/recent-activity';

  /**
   * Getter for the returnPath property. Gets the value of the property and removes it from memory and localStorage.
   * @returns The return path, or null if it does not exist.
   */
  get returnPath(): string {
    const returnPath = this._returnPath || this.defaultReturnPath;
    this._returnPath = null;
    localStorage.removeItem('cirrus-return-to');
    return returnPath;
  }

  /**
   * Setter for the returnPath property. Sets the value of the property and stores it in localStorage.
   * If the property has already been set, does nothing.
   * @param value The value to set the returnPath property to.
   */
  set returnPath(value: string) {
    if (this.isReturnPathSet()) {
      return;
    }

    this._returnPath = value;
    localStorage.setItem('cirrus-return-to', value);
  }

  private isReturnPathSet(): boolean {
    return this._returnPath !== null;
  }
}
