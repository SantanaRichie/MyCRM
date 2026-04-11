# Google Calendar Integration Plan

## Overview
The objective is to provide seamless two-way synchronization between an artist's Google Calendar and their ArtistCRM schedule. This allows artists to manage gigs and events efficiently across both platforms.

---

## 1. User Authentication & Authorization
*   **Connect/Disconnect:** Artists must be able to securely connect their Google Account and revoke access at any time via the CRM settings.
*   **OAuth 2.0:** Use Google's OAuth 2.0 flow, requesting minimal scopes required for calendar management.
*   **Secure Token Management:** Access and refresh tokens must be stored securely on the **server-side** and never exposed to the client.

## 2. Two-Way Event Synchronization

### CRM → Google Calendar
*   **Create:** New gigs in ArtistCRM can optionally create a corresponding Google Calendar event.
*   **Update:** Changes to date, time, venue, or description in the CRM must reflect in Google Calendar.
*   **Delete:** Deleting a gig in the CRM should optionally remove it from Google Calendar.

### Google Calendar → CRM
*   **Import:** Events created in a selected Google Calendar should automatically appear in the ArtistCRM schedule.
*   **Sync Updates:** External modifications in Google Calendar (location, time, etc.) must update the linked CRM record.
*   **Cleanup:** Deletions in Google Calendar should be reflected in the CRM schedule.

### Conflict Resolution
*   Establish a "Last Write Wins" strategy or prompt the user if an event is modified simultaneously in both systems.

## 3. Data Mapping
| ArtistCRM Field | Google Calendar Field |
| :--- | :--- |
| Gig Name | Summary |
| Date/Time | start.dateTime / end.dateTime |
| Venue | Location |
| Notes | Description |
| Artist List | Attendees (optional) |

*Note: CRM-specific metadata (e.g., Payment Status, Client PII) remains strictly within the CRM and is not synced to Google.*

## 4. UI/UX Requirements
*   **Settings View:** A dedicated "Integrations" page to manage connections and select specific calendars for syncing.
*   **Visual Indicators:** Distinguish between CRM-only events and synced events in the schedule view using icons or badges.
*   **Sync Controls:** Toggle switches within the "Add Gig" form to enable/disable syncing for specific events.
*   **Notifications:** User-friendly alerts for sync status or re-authentication requirements.

## 5. Performance & Reliability
*   **Webhooks:** Use Google Calendar Push Notifications for real-time synchronization.
*   **Fallback Polling:** Implement a background job (e.g., cron) to perform a full sync daily to ensure data integrity.
*   **Rate Limiting:** Implement exponential backoff for API requests to stay within Google’s quotas.

## 6. Implementation Approach

### Backend (Node.js/Express)
1.  **OAuth Management:** Handle the callback and store encrypted `refresh_tokens`.
2.  **API Gateway:** All Google Calendar API interactions must occur server-side.
3.  **Webhook Handler:** Receive and process incoming change notifications from Google.

### Frontend (React)
1.  **Settings UI:** Views for account linking and calendar selection.
2.  **Schedule UI:** Displaying synced events with appropriate metadata.
3.  **Feedback:** Handling loading states and sync error reporting.

---

## 7. Security Guardrails
*   **PII Protection:** Strictly follow the guidelines in `PROJECT_CONTEXT.md`. Never transmit OAuth tokens to the browser.
*   **Encryption:** Encrypt tokens at rest in the database.
*   **Consent:** Provide clear descriptions of requested scopes during the OAuth "Consent" screen.

---

## 8. Implementation Prompt

**Copy and paste this prompt to begin coding:**

> "Act as a Senior Full Stack Engineer. We are implementing the Google Calendar integration for ArtistCRM based on the GOOGLE_CALENDAR_INTEGRATION.md plan. 
> 
> 1. Outline the database schema for storing OAuth tokens and synced event IDs.
> 2. Provide the Express.js routes for the OAuth 2.0 flow (Auth URL generation and Callback handling).
> 3. Ensure the implementation keeps tokens server-side to satisfy PII security requirements."

---
_This file serves as the source of truth for the Google Calendar feature integration._