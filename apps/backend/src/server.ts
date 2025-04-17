import { app } from ".";
import { PORT } from "./config/env";
import os from "os"
import cluster from "cluster";

const totalCpus = os.cpus().length

if (cluster.isPrimary) {
    console.log(`Totals cores: ${totalCpus}`)
    console.log(`Process ID: ${process.pid}`)
    for (let i = 1; i < totalCpus; i++) {
        cluster.fork()
    }
} else {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}