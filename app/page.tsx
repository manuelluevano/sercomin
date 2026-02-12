import HomeView from "./features/home/components/HomeView";
import { getHomeViewModel } from "./features/home/controller/home.controller";

export default function Home() {
  const viewModel = getHomeViewModel();

  return <HomeView viewModel={viewModel} />;
}
