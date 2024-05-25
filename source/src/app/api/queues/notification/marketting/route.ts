import { Queue } from "quirrel/next-app"

export const emailQueue = Queue(
  "api/queues/notication/marketting", // 👈 the route it's reachable on
  async job => {
    console.log('Notification')
  }
)

export const POST = emailQueue