import UseBroadcast from "shared/hooks/use-broadcast";
import { useOutletContext } from "react-router-dom";

export type ContextType = {
  reloadDistPage: ReturnType<typeof UseBroadcast<string>> | null;
};

export function UsePageReload() {
  return useOutletContext<ContextType>();
}
