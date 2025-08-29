import { Analytics } from "@vercel/analytics/react";
import { ProfessionalHome } from "../components/professional-home";
import { getServerSideConfig } from "../config/server";

const serverConfig = getServerSideConfig();

export default async function ProfessionalPage() {
  return (
    <>
      <ProfessionalHome />
      {serverConfig?.isVercel && (
        <>
          <Analytics />
        </>
      )}
    </>
  );
}
