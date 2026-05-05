# Notification System Design

## Stage 1: API Design
- GET /notifications
- POST /notifications
- PUT /notifications/:id/read
- DELETE /notifications/:id

Response:
{
  "notifications": [
    {
      "id": "uuid",
      "type": "Result",
      "message": "Exam Result Declared",
      "timestamp": "2026-04-22T17:51:30Z"
    }
  ]
}

Real-time: Socket.io used to push notifications instantly.

## Stage 2: Database Design
Using MongoDB for scalability.

Schema:
- userId
- message
- type
- isRead
- createdAt

## Stage 3: Query Optimization
Problem: Full table scan.

Solution:
CREATE INDEX idx_user_read_time 
ON notifications(userId, isRead, createdAt);

Optimized Query:
SELECT * FROM notifications 
WHERE userId = 1042 AND isRead = false 
ORDER BY createdAt DESC;

## Stage 4: Performance Improvement
- Use pagination
- Cache using Redis
- Lazy loading notifications

## Stage 5: Notify All (50k users)
Use Queue (Kafka/SQS):
- Push tasks to queue
- Worker sends email + DB insert
- Retry mechanism for failure

## Stage 6: Top Notifications
Priority:
Placement > Result > Event

Logic:
Sort by priority + timestamp
Return top N unread notifications.

## Logging Middleware Design

### Why Centralized Logging?

Centralized logging provides a unified way to track application behavior across both backend and frontend. It enables:

- Structured log data sent to a remote evaluation service
- Consistent log format across the entire application
- Easy debugging and monitoring
- Security through token-based authentication

### Where Logs Are Added

**Backend:**
- `server.js`: Server startup, database connection status
- `middlewares/logger.js`: HTTP request completion tracking
- `controllers/`: Request received, validation errors, success/failure
- `services/`: Database operations, business logic execution

**Frontend:**
- `App.jsx`: Page load, API calls, socket connection, user interactions

### Error Handling

The logging utility includes robust error handling:

- **Validation**: Invalid stack, level, or package values trigger console warnings and skip API calls
- **API Failures**: Network errors are caught and logged locally without breaking application flow
- **Normalization**: All values are converted to lowercase before validation to ensure consistency

### Security Note

The access token for the logging API is stored in environment variables:

- Backend: `ACCESS_TOKEN` in `.env`
- Frontend: `VITE_ACCESS_TOKEN` in `.env`

This prevents token exposure in source code. The `.env` files are never committed to version control. Only `.env.example` templates are included in the repository.
