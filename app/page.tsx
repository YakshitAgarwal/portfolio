import Portfolio from "@/components/Portfolio";
import { profile } from "./profile";

export default function Page() {
  return <Portfolio {...profile} />;
}
