import { Analytics } from "@vercel/analytics/react";
import { BeginnerHome } from "../components/beginner-home";
import { getServerSideConfig } from "../config/server";

const serverConfig = getServerSideConfig();

export default async function BeginnerPage() {
  return (
    <>
      <BeginnerHome />
      {serverConfig?.isVercel && (
        <>
          <Analytics />
        </>
      )}
    </>
  );
}
