import { Analytics } from "@vercel/analytics/react";
import { KidsHome } from "../components/kids-home";
import { getServerSideConfig } from "../config/server";

const serverConfig = getServerSideConfig();

export default async function KidsPage() {
  return (
    <>
      <KidsHome />
      {serverConfig?.isVercel && (
        <>
          <Analytics />
        </>
      )}
    </>
  );
}
