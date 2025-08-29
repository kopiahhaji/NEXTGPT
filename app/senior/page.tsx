import { Analytics } from "@vercel/analytics/react";
import { SeniorHome } from "../components/senior-home";
import { getServerSideConfig } from "../config/server";

const serverConfig = getServerSideConfig();

export default async function SeniorPage() {
  return (
    <>
      <SeniorHome />
      {serverConfig?.isVercel && (
        <>
          <Analytics />
        </>
      )}
    </>
  );
}
