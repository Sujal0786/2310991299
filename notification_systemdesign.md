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
