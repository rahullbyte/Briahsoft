import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/github/users/:username", async (req, res) => {
    try {
      const { username } = req.params;
      
      if (!username || typeof username !== "string") {
        return res.status(400).json({ message: "Invalid username parameter" });
      }
      
      res.json({ message: "Use client-side GitHub API" });
    } catch (error: any) {
      console.error("Error fetching GitHub user:", error);
      res.status(500).json({ message: error.message || "Internal server error" });
    }
  });

  app.get("/api/github/users/:username/commits", async (req, res) => {
    try {
      const { username } = req.params;
      
      if (!username || typeof username !== "string") {
        return res.status(400).json({ message: "Invalid username parameter" });
      }
      
      res.json({ message: "Use client-side GitHub API" });
    } catch (error: any) {
      console.error("Error fetching commit data:", error);
      res.status(500).json({ message: error.message || "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
