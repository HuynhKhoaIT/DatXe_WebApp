import { NextRequest } from "next/server";
import { emailQueue } from "./notification/marketting/route"


export async function GET(request: NextRequest) {
    // const booking = await createBooking(...);
}

// could be some API route / getServerSideProps / ...
// export default async (req, res) => {

//   await emailQueue.enqueue(
//     ..., // job to be enqueued
//     { delay: "24h" } // scheduling options
//   )

// }