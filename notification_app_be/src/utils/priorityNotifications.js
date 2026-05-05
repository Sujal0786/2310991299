function getTopNotifications(notifications, n = 10) {
  const weight = {
    Placement: 3,
    Result: 2,
    Event: 1
  };

  return notifications
    .filter((notification) => notification.isRead === false)
    .sort((a, b) => {
      const priorityDiff = (weight[b.type] || 0) - (weight[a.type] || 0);

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, n);
}

const sampleNotifications = [
  {
    id: "1",
    type: "Event",
    message: "Farewell",
    isRead: false,
    createdAt: "2026-04-22T17:51:06Z"
  },
  {
    id: "2",
    type: "Placement",
    message: "CSX Corporation hiring",
    isRead: false,
    createdAt: "2026-04-22T17:51:18Z"
  },
  {
    id: "3",
    type: "Result",
    message: "Mid semester result declared",
    isRead: false,
    createdAt: "2026-04-22T17:51:30Z"
  }
];

console.log(getTopNotifications(sampleNotifications, 10));

module.exports = getTopNotifications;
