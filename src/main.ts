import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { BarController, BarElement, CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement, Title } from "chart.js";

if (environment.production) {
  enableProdMode();
}
Chart.register(
  LineController, LineElement, PointElement, LinearScale, CategoryScale, Title,
  BarController, BarElement
);
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
