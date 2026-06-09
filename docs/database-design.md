# CareerFlow Database Design

## Overview

CareerFlow is a platform for tracking internships, jobs, and interviews.

The system consists of four main entities:

- Users
- Companies
- Applications
- Notes

---

## Users

Stores user accounts.

| Field | Type | Description |
|---------|---------|---------|
| id | UUID | Primary key |
| name | String | User's name |
| email | String | User email |
| password_hash | String | Hashed password |
| created_at | Timestamp | Account creation date |

---

## Companies

Stores companies that users are applying to.

| Field | Type | Description |
|---------|---------|---------|
| id | UUID | Primary key |
| name | String | Company name |
| website | String | Company website |
| location | String | Company location |
| industry | String | Industry |
| notes | Text | User notes |

---

## Applications

Stores job applications.

| Field | Type | Description |
|---------|---------|---------|
| id | UUID | Primary key |
| user_id | UUID | References User |
| company_id | UUID | References Company |
| position | String | Job title |
| status | String | Current application status |
| date_applied | Date | Application date |

### Status Values

- Wishlist
- Applied
- Online Assessment
- Interview
- Final Interview
- Offer
- Rejected

---

## Notes

Stores notes related to an application.

| Field | Type | Description |
|---------|---------|---------|
| id | UUID | Primary key |
| application_id | UUID | References Application |
| content | Text | Note content |
| created_at | Timestamp | Creation date |

---

## Relationships

User
├── Applications

Company
├── Applications

Application
├── Notes

---

## MVP Scope

Version 1 will include:

- User authentication
- Company management
- Application tracking
- Notes
- Dashboard statistics

Future versions may include:

- Calendar integration
- Email reminders
- CV storage
- Interview preparation tools