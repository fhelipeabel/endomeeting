import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite conexões de outros computadores e celulares na rede local sem bloquear HMR/WebSocket
  serverExternalPackages: [],
  allowedDevOrigins: ["192.168.100.52", "192.168.100.52:3000", "localhost:3000"],
};

export default nextConfig;
