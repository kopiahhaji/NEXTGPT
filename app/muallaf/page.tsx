import { Analytics } from "@vercel/analytics/react";
import { MuallafHome } from "../components/muallaf-home";
import { getServerSideConfig } from "../config/server";

const serverConfig = getServerSideConfig();

export default async function MuallafPage() {
  return (
    <>
      <MuallafHome />
      {serverConfig?.isVercel && (
        <>
          <Analytics />
        </>
      )}
    </>
  );
}
