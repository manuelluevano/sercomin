import AboutView from "../features/about/components/AboutView";
import { getAboutViewModel } from "../features/about/controller/about.controller";

export default function SobreNosotros() {
  const viewModel = getAboutViewModel();

  return <AboutView viewModel={viewModel} />;
}
