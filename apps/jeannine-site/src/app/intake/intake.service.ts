import { Injectable } from '@angular/core';

export interface IntakeRequest {
  name: string;
  phone: string;
  email: string;
  issue: string;
}

/**
 * Sends a prospective client's intake request to the office.
 *
 * TODO(backend): this is a stub. Nothing is sent anywhere yet. Before launch,
 * wire this to a secure endpoint (e.g. an API that emails or files the request
 * in a case-management system) over HTTPS. Do not log request contents: they
 * may contain confidential information.
 */
@Injectable({ providedIn: 'root' })
export class IntakeService {
  async submit(request: IntakeRequest): Promise<void> {
    void request;
    console.warn('IntakeService is a stub: the intake request was not sent.');
    await new Promise((resolve) => setTimeout(resolve, 600));
  }
}
