import { aboutModel, type AboutModel } from "../model/about.model";

export type AboutViewModel = AboutModel & {
  primaryValues: string[];
};

// Controlador de Sobre Nosotros: deja lista la data para la capa de presentacion.
export function getAboutViewModel(): AboutViewModel {
  return {
    ...aboutModel,
    // Mostramos un subconjunto destacado para simplificar lectura en primer viewport.
    primaryValues: aboutModel.values.slice(0, 3),
  };
}
