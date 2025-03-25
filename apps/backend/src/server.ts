import { app } from ".";
import { PORT } from "./config/env";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))