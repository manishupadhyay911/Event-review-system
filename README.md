
---
# Event Review System

## Features Implemented : 

1. **Review Submission**:
   - Allowed authorized users to submit reviews for events they have attended.

2. **Rating System**:
   - Enabled users to rate specific criteria:
     - Registration experience
     - Event experience
     - Breakfast experience
   - Provided an option for users to give an overall rating/review for the event.

3. **Authentication**:
   - Implemented authentication mechanisms to ensure only authorized users can submit reviews.

4. **Interaction with Reviews**:
   - Included endpoints for users to like and report reviews.
   - Automatically flag reviews if reported more than five times.

5. **Organizer Interaction**:
   - Allowed organizers to respond to reviews.

6. **Summary Generation**:
   - Generated a summary of reviews for a specific event.

7. **Rating Retrieval**:
   - Retrieved ratings for each criterion mentioned above.

8. **Pagination**:
   - Enabled cursor/token based pagination for browsing through ratings and events, ensuring efficient handling of large datasets.


## API Documentation

### Event Routes

#### Create Event
- **URL:** `/api/event/create`
- **Method:** `POST`
- **Description:** Creates a new event.
- **Authentication Required:** Yes
- **Request Body:**
  - `name`: Name of the event (String)
  - `date`: Date of the event (Date)
  - `location`: Location of the event (String)
  - `price`: Price of the event (Number)
- **Response:** Returns the details of the created event.

#### Attend Event
- **URL:** `/api/event/attend`
- **Method:** `POST`
- **Description:** Allows a user to attend an event.
- **Authentication Required:** Yes
- **Request Body:**
  - `id`: ID of the event to attend (String)
- **Response:** Returns the status of the attendance.

#### Fetch All Events
- **URL:** `/api/event/all-events`
- **Method:** `GET`
- **Description:** Retrieves all events.
- **Authentication Required:** Yes
- **Response:** Returns an array of events.

#### Fetch Event
- **URL:** `/api/event/`
- **Method:** `GET`
- **Description:** Retrieves details of a specific event.
- **Authentication Required:** Yes
- **Query Parameters:**
  - `id`: ID of the event to fetch (String)
- **Response:** Returns details of the requested event.

### Authentication Routes

#### Register User
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  - `name`: Name of the user (String)
  - `email`: Email of the user (String)
  - `password`: Password of the user (String)
- **Response:** Returns user details and authentication token upon successful registration.

#### Login User
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user.
- **Request Body:**
  - `email`: Email of the user (String)
  - `password`: Password of the user (String)
- **Response:** Returns user details and authentication token upon successful login.

#### Fetch User
- **URL:** `/api/auth/user`
- **Method:** `POST`
- **Description:** Retrieves details of a user.
- **Authentication Required:** Yes
- **Request Body:**
  - `name`: Name of the user to fetch (String)
- **Response:** Returns details of the requested user.

### Rating Routes

#### Give Rating
- **URL:** `/api/rating/`
- **Method:** `POST`
- **Description:** Allows a user to give a rating to an event.
- **Authentication Required:** Yes
- **Request Body:**
  - `overall`: Overall rating (Number)
  - `registrationExp`: Registration experience rating (Number)
  - `eventExp`: Event experience rating (Number)
  - `breakfastExp`: Breakfast experience rating (Number)
- **Response:** Returns the rating details upon successful submission.

#### Like Review
- **URL:** `/api/rating/like`
- **Method:** `POST`
- **Description:** Allows a user to like a review.
- **Authentication Required:** Yes
- **Query Parameters:**
  - `id`: ID of the review to like (String)
- **Response:** Indicates success or failure of the operation.

#### Report Review
- **URL:** `/api/rating/report`
- **Method:** `POST`
- **Description:** Allows a user to report a review.
- **Authentication Required:** Yes
- **Query Parameters:**
  - `id`: ID of the review to report (String)
- **Response:** Indicates success or failure of the operation.

#### Respond to Review
- **URL:** `/api/rating/respond-review`
- **Method:** `POST`
- **Description:** Allows a user to respond to a review.
- **Authentication Required:** Yes
- **Request Body:**
  - `reviewId`: ID of the review to respond to (String)
  - `description`: Response description (String)
- **Response:** Indicates success or failure of the operation.

#### Fetch All Reviews
- **URL:** `/api/rating/all-review`
- **Method:** `GET`
- **Description:** Retrieves all reviews for an event.
- **Authentication Required:** Yes
- **Response:** Returns an array of reviews.

#### Fetch Review Summary
- **URL:** `/api/rating/review-summary`
- **Method:** `GET`
- **Description:** Retrieves summary of reviews for an event.
- **Authentication Required:** Yes
- **Query Parameters:**
  - `eventId`: ID of the event to fetch reviews for (String)
- **Response:** Returns the summary of reviews.

---

