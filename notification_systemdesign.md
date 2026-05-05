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

## Stage 7: Logging Middleware Integration

### Why Centralized Logging?

Centralized logging provides a unified way to track application behavior across both backend and frontend. It enables:

- Structured log data sent to a remote evaluation service
- Consistent log format across the entire application
- Easy debugging and monitoring
- Security through token-based authentication
- Industry-grade observability for production systems

### Logging Architecture

**Log Service Provider:** AffordMed Evaluation Service
**Endpoint:** `http://20.207.122.201/evaluation-service/logs`
**Authentication:** Bearer Token (OAuth 2.0 style)

### Log Data Structure

```json
{
  "stack": "backend|frontend",
  "level": "debug|info|warn|error|fatal",
  "package": "component_identifier",
  "message": "log_message_content"
}
```

### Component Classification

**Backend Packages:**
- `cache`: Redis, in-memory caching operations
- `controller`: HTTP request handlers, business logic entry points
- `cron_job`: Scheduled tasks, background jobs
- `db`: Database operations, connection management
- `domain`: Business entities, core domain logic
- `handler`: Event handlers, message processors
- `repository`: Data access layer, query builders
- `route`: Route definitions, middleware composition
- `service`: Business logic, use cases

**Frontend Packages:**
- `api`: HTTP client, API calls
- `component`: React components, UI elements
- `hook`: Custom React hooks, state management
- `page`: Page-level components, routing
- `state`: Global state, context providers
- `style`: CSS, styling utilities

**Common Packages:**
- `auth`: Authentication, authorization
- `config`: Configuration management
- `middleware`: Express middleware, cross-cutting concerns
- `utils`: Utility functions, helpers

### Token-Based Authentication

**Registration Flow:**
1. Register with AffordMed evaluation service
2. Receive client credentials (clientID, clientSecret)
3. Generate access token using credentials
4. Use token for logging API calls

**Token Management:**
- Tokens have expiration time
- Automatic token refresh mechanism recommended
- Secure storage in environment variables
- No token exposure in client-side code

### Industry Best Practices Implemented

1. **Structured Logging**
   - Consistent JSON format
   - Standardized field names
   - Machine-readable log entries

2. **Log Levels**
   - Debug: Detailed development information
   - Info: General application flow
   - Warn: Potential issues that don't stop execution
   - Error: Application errors that need attention
   - Fatal: Critical errors requiring immediate action

3. **Error Handling**
   - Graceful degradation when logging service unavailable
   - Local fallback logging
   - No impact on core application functionality

4. **Security Measures**
   - Token-based authentication
   - HTTPS communication
   - Environment variable storage
   - No sensitive data in log messages

5. **Performance Considerations**
   - Asynchronous logging (non-blocking)
   - Batch log transmission (future enhancement)
   - Local buffering for network resilience

### Where Logs Are Added

**Backend:**
- `server.js`: Server startup, database connection status, system health
- `middlewares/logger.js`: HTTP request completion tracking, response times
- `controllers/`: Request received, validation errors, success/failure states
- `services/`: Database operations, business logic execution, performance metrics

**Frontend:**
- `App.jsx`: Page load, API calls, socket connection, user interactions
- Component lifecycle events, error boundaries, performance metrics

### Production Deployment Considerations

1. **Log Aggregation**
   - Centralized log collection
   - Real-time log streaming
   - Log retention policies

2. **Monitoring & Alerting**
   - Error rate thresholds
   - Performance anomaly detection
   - Automated incident response

3. **Compliance & Auditing**
   - Immutable log storage
   - Access logging for audit trails
   - Data privacy compliance

4. **Scalability**
   - Horizontal scaling of log infrastructure
   - Load balancing for log ingestion
   - Geographic distribution for global applications

### Security Note

The access token for logging API is stored in environment variables:

- Backend: `ACCESS_TOKEN` in `.env`
- Frontend: `VITE_ACCESS_TOKEN` in `.env`

This prevents token exposure in source code. The `.env` files are never committed to version control. Only `.env.example` templates are included in the repository.

### Future Enhancements

1. **Advanced Log Analysis**
   - Machine learning for anomaly detection
   - Predictive error analysis
   - Automated root cause analysis

2. **Real-time Dashboard**
   - Live log streaming interface
   - Interactive log filtering
   - Performance metrics visualization

3. **Integration with Monitoring Tools**
   - Prometheus metrics export
   - Grafana dashboard integration
   - PagerDuty alerting

4. **Compliance Features**
   - GDPR compliance tools
   - Data retention policies
   - Audit trail generation
