import { homeModel, type HomeModel } from "../model/home.model";

export type HomeViewModel = HomeModel & {
  highlightedServices: HomeModel["services"];
};

// Controlador del inicio: prepara el modelo para ser consumido por la vista.
export function getHomeViewModel(): HomeViewModel {
  return {
    ...homeModel,
    // Regla de presentacion: priorizamos servicios con mas bullets de valor.
    highlightedServices: [...homeModel.services].sort(
      (a, b) => b.bullets.length - a.bullets.length,
    ),
  };
}
